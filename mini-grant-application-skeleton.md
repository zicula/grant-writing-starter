# Mini-Grant Application Skeleton

One page-to-three-page skeleton for small program grants (community
foundations, corporate giving programs, family foundations). Structure first,
sentences second — paste this into your docs tool and answer every `[prompt]`
in order. Typical total length for this class of grant: 1,000–1,500 words;
**stay inside whatever the funder states**, always.

> Common practice for small grants, written fresh for this starter. Every
> funder's application form and scoring rubric overrides this skeleton —
> mirror their section names and order whenever they give you one.

## 1. Cover summary (50–75 words)

> `[Organization name] requests $[amount] over [timeframe] to [verb + program
> name] for [population] in [place]. The grant will fund [one line: what the
> money buys], contributing to [headline outcome]. Organization point of
> contact: [name, title, email, phone].`

Write this **last**. If you can't, sections 2–7 aren't sharp enough yet.

## 2. Organization background (75–100 words)

- `[Year founded, mission in one sentence, legal status (501(c)(3) EIN XX-XXXXXXX).]`
- `[Scale in numbers: participants served last full year, budget size, staff count.]`
- `[One sentence of relevant credibility: years running THIS program, prior funders, results.]`

## 3. Statement of need (150–200 words)

- `[The problem for a specific population in a specific place — 2–3 sentences.]`
- `[Two or three cited data points with source and year: "X% of [population] in [county] … ([Source], [year])."]`
- `[One sentence on why existing services don't close the gap — and what you add.]`
- `[One sentence: the consequence if nothing changes.]`

## 4. Program description (200–300 words)

- `[What happens: activities, frequency, duration, site — concrete enough to picture.]`
- `[Who: eligibility, recruitment, how many participants per cycle.]`
- `[Who runs it: named roles and their qualifications — not job ads, people.]`
- `[Partners: named organizations and what each contributes (space, referrals, staff).]`
- `[Timeline: months 1–3 / 4–9 / 10–12 milestones.]`

## 5. Goals, outcomes, and evaluation (100–150 words)

- `[Goal: one sentence, directional.]`
- `[Outcome 1: "By [month 12], X% of participants will [measurable change], measured by [instrument/method]."]`
- `[Outcome 2: same shape — two or three outcomes, no more.]`
- `[Evaluation: who collects data, when, and who sees it. Name the tool if participants complete one.]`

## 6. Organizational capacity (75–100 words)

- `[Why YOUR org can deliver this: staff experience, track record, systems.]`
- `[Financial stewardship in one line: who manages grant funds and how restricted funds are tracked.]`

## 7. Budget summary and sustainability (75–100 words)

- `[Total program cost $X; amount requested $Y; other funders/income $Z — numbers must reconcile with the budget attachment.]`
- `[One line per major budget line: what and why.]`
- `[Sustainability: what continues after this grant, funded how.]`

## 8. Attachments checklist (typical — confirm against the funder's list)

- [ ] Operating or program budget (see `budget-template.csv`)
- [ ] Board of directors list
- [ ] IRS determination letter
- [ ] Most recent Form 990
- [ ] Letter(s) of support from named partners (draft them yourself; make them easy to sign)
- [ ] W-9

---

**Before you submit, run the arithmetic:** `node src/budget-check.mjs
budget-template.csv` — a budget that doesn't add up is the fastest way to lose
a reviewer's trust.
