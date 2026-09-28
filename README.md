# Grant Writing Starter (checklist + skeleton + budget, three files)

Most small nonprofits don't lose grants on prose — they lose them on
readiness: a lapsed registration, a budget that doesn't add up, a deadline
nobody tracked. This starter is the readiness floor, as **working files**: a
grant readiness checklist, a one-page mini-application skeleton, and a budget
template with a zero-dependency script that checks the arithmetic before a
reviewer does it for you.

**This is the free starter.** The full
[Grant Writing Kit](https://grant-writing-kit.zicula.trade/?utm_source=github&utm_medium=repo)
($79 one-time) is the grants operating system around them: the weighted
Go/No-Go screen, the pipeline tracker with fiscal-year and deadline views, the
funder-research SOP (990s and grantee lists — the method, not a database),
a boilerplate library, 10 LOI templates, 6 full proposal skeletons, the budget
pack with narrative and NOFO checklist, reporting and stewardship templates, a
12-month calendar, and an AI prompt pack — one payment, no subscription.

## Run

```bash
node src/budget-check.mjs budget-example.csv    # see it pass on a worked example
node src/budget-check.mjs budget-template.csv   # run it on your own numbers
```

- checks every row's `total = funder + other` and the TOTAL row against the
  sum of all rows; exit code 1 when the math breaks — so it can sit in your
  pre-submission checklist
- accepts plain numbers, `$1,234.00`, whatever your spreadsheet exports

## Files

- `grant-readiness-checklist.md` — six sections from legal registrations to
  red flags, drawn from common grantmaking practice. Fix these before you
  pick a funder.
- `mini-grant-application-skeleton.md` — one skeleton sized for small program
  grants (community foundations, corporate giving), section by section with
  word-count guidance and a `[prompt]` at every blank.
- `budget-template.csv` — the standard categories (personnel through indirect)
  with a `basis_of_estimate` column so every number has a defensible source.
- `budget-example.csv` — the same table filled in with consistent numbers
  ($24,770 requested of a $30,470 program) so you can see one done right.
- `src/budget-check.mjs` — the arithmetic checker.

## Honestly

The checklist encodes common practice, not rules — every funder's guidelines
override it, and nothing here is legal advice. The skeleton gives structure,
not sentences; reviewers can smell boilerplate, so every `[prompt]` needs your
numbers and your words. And a template that balances can't balance a program
plan for you — the costs have to come out of your real operations.

## License

MIT.
