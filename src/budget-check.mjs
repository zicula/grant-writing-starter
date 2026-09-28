#!/usr/bin/env node
// Arithmetic check for a grant budget CSV.
// Zero dependencies. Node 18+.
//
//   node src/budget-check.mjs budget-template.csv
//   node src/budget-check.mjs budget-example.csv
//
// Expects columns: funder_request_usd, other_income_usd, total_usd.
// A row whose category is TOTAL (case-insensitive) is treated as the grand
// total; every other row must satisfy total = funder_request + other_income,
// and the TOTAL row must equal the sum of all other rows.
//
// Exit codes: 0 = all math checks out, 1 = broken math, 2 = usage/format error.

import { readFileSync } from "node:fs";

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

const EPS = 0.005;
const money = (s) => {
  const n = Number(String(s).replace(/[$,\s]/g, ""));
  return Number.isFinite(n) ? n : NaN;
};
const near = (a, b) => Math.abs(a - b) < EPS;

const path = process.argv[2];
if (!path) {
  console.error("Usage: node src/budget-check.mjs <budget.csv>");
  process.exit(2);
}

const rows = parseCSV(readFileSync(path, "utf8"));
const header = rows[0].map((h) => h.trim().toLowerCase());
const colIdx = (name) => header.indexOf(name);
for (const col of ["category", "funder_request_usd", "other_income_usd", "total_usd"]) {
  if (colIdx(col) === -1) {
    console.error(`Missing required column "${col}" in ${path}`);
    process.exit(2);
  }
}

let failures = 0;
let directFunder = 0, directOther = 0, directTotal = 0;
let grandRow = null;

for (const r of rows.slice(1)) {
  if (r.length !== header.length) {
    console.log(
      `FAIL  row with ${r.length} fields (expected ${header.length}) starting "${r[0]}": an unquoted comma probably split a cell — wrap the field in double quotes`
    );
    failures++;
    continue;
  }
  const category = r[colIdx("category")].trim();
  const lineItem = (header.includes("line_item") ? r[colIdx("line_item")] : "").trim();
  const funder = money(r[colIdx("funder_request_usd")]);
  const other = money(r[colIdx("other_income_usd")]);
  const total = money(r[colIdx("total_usd")]);
  if (Number.isNaN(funder) || Number.isNaN(other) || Number.isNaN(total)) {
    console.log(`FAIL  "${category} / ${lineItem}": non-numeric amount`);
    failures++;
    continue;
  }
  const isGrand = category.toLowerCase() === "total";
  if (isGrand) {
    if (grandRow) { console.log('FAIL  more than one "TOTAL" row'); failures++; }
    grandRow = { funder, other, total };
    continue;
  }
  if (near(total, funder + other)) {
    console.log(`ok    ${category} — ${lineItem || "(unnamed)"}: ${total.toFixed(2)}`);
  } else {
    console.log(
      `FAIL  ${category} — ${lineItem || "(unnamed)"}: total ${total.toFixed(2)} != funder ${funder.toFixed(2)} + other ${other.toFixed(2)}`
    );
    failures++;
  }
  directFunder += funder;
  directOther += other;
  directTotal += total;
}

if (!grandRow) {
  console.log("FAIL  no TOTAL row found");
  process.exit(1);
}

if (!near(grandRow.total, grandRow.funder + grandRow.other)) {
  console.log(
    `FAIL  TOTAL row: program total ${grandRow.total.toFixed(2)} != funder ${grandRow.funder.toFixed(2)} + other ${grandRow.other.toFixed(2)}`
  );
  failures++;
}
for (const [label, sum, got] of [
  ["funder request", directFunder, grandRow.funder],
  ["other income", directOther, grandRow.other],
  ["program total", directTotal, grandRow.total],
]) {
  if (!near(sum, got)) {
    console.log(`FAIL  TOTAL row ${label}: ${got.toFixed(2)} != sum of rows ${sum.toFixed(2)}`);
    failures++;
  }
}

if (failures === 0) {
  console.log(
    `\nPASS  ${path}: row math and TOTAL check out — funder request $${grandRow.funder.toFixed(2)} of a $${grandRow.total.toFixed(2)} program.`
  );
} else {
  console.log(`\n${failures} problem(s) in ${path}. Reviewers do this math too.`);
  process.exit(1);
}
