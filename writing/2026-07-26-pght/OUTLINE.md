# Outline + detail bank — "problems this software does not have"

Working notes for the article. Every number verified against the live corpus
2026-07-25. Sources: vault projects/serif-article-material.md (trial index),
vk #907/#917/#918/#919/#920/#921, live queries. Nothing here names tooling,
models, or process — safe to lift prose from.

## Spine (non-chronological, escalation of subtlety)

1. **Lede: the $2,848.00 knee MRI.** Right the whole time; what it MEANT was
   wrong three times. Sets the thesis: an answer can be right while the
   reasoning is broken.
2. **The number** — ghost medians (arithmetic correctness, no referent).
3. **The anchor** — the list price nobody published (a statistic presented as
   a fact about a named hospital).
4. **The identity** — payers filed under parents/subsidiaries/wrong names
   (the source data itself mislabeled).
5. **The grain** — cross-product comparisons that pass every correctness
   check (correctness vs comparability). Deepest trap, lands last.
6. **Return to the knee MRI** — it survived; its meaning was rebuilt 3x.
7. **One-touch close** — the absence is the evidence; "this is what that
   list costs." Do not state the process twice.

## Detail bank per section

### 1. Lede / through-line (knee MRI, HCPCS 73721, outpatient, Jan snapshot)
- Current truth: CIGNA commercial $2,848.00 at UPMC Magee / $323.46 at AHN
  West Penn. 13 commercial payers at either hospital, 4 at both.
- Its three lives: (a) flagship finding attributed to AETNA; (b) exposed as
  cross-product (Aetna's $397.67 side was CHIP, not commercial); (c) after
  payer re-canonicalization + per-class pairing, the same dollar figure is
  CIGNA commercial. Same number, three meanings.
- 4,553,421 rows, 5 hospital files, 2 labeled snapshots (Jan + Mar 2026).

### 2. Ghost medians (vk #918, plan-scout Task 7)
- percentile_cont averages the two middle rows on an even count; the result
  appears in no contract and no bill.
- West Penn UHC figure $344.82 existed in NO row. CIGNA's Magee figure was
  the average of its two rows.
- 12 of 20 generated findings stated figures the engine could never return.
- Fix: percentile_disc everywhere (always an actual filed rate) + tripwire
  that re-executes every published figure against the live DB.

### 3. The anchor nobody published (vk #907, upgraded by vk #933 2026-07-26)
- West Penn lists 73721 twice: $180.00 and $2,901.00, 55 rows each. Midpoint
  $1,540.50 was drawn as the chargemaster tick. Magee lists one: $7,120.
- The naive fix (discrete median = $180.00) is ALSO wrong: it flips the
  "rates below list" claim elsewhere.
- SHIPPED BEHAVIOR after #933: the envelope reports the cohort's sticker set
  per cohort — none / sole(value) / multiple(all values, cap 12) / many
  (min,max,count) — and the chart draws one tick per published sticker.
  West Penn now shows BOTH ticks with a "2 list prices published" caption.
  The disagreement is rendered as data, not converted to absence.
- The payoff fact for the article: the two lines carry the SAME negotiated
  median, $257.88 — stickers 16x apart, real rates ignoring both. The list
  price is theater at that hospital; the negotiated rate is the only honest
  number. (Pre-#920 it was $239.98 / $257.88; they converged.)
- Bonus honesty beat (renderer): the "every negotiated rate sits below list"
  claim is now stated only when every cohort has a sole sticker — against a
  split sticker the sentence has no single referent, so it is withheld.

### 4. The payer identity repairs (vk #917/#919/#920)
- 145,004 rows re-canonicalized. The three shapes: subsidiary filed under
  parent (UPMC Work Partners, 33,098 rows), pre-acquisition name (Highmark
  Wholecare as "GATEWAY HEALTH PLAN", 21,819 + 64,278), a payer literally
  filed as MEDICARE (Devoted, 25,809).
- The anti-rule: United Healthcare Community Plan must NOT split — St. Clair
  files it plan-level, so splitting guarantees the two hospitals never pair.
  A correction can manufacture the bug it is fixing.
- Related humility beat: the task documenting this claimed plan_name was
  100% populated; it is NULL on 185,199 rows (all payerless chargemaster
  lines). Two task bodies in a row had factual claims that did not survive
  a query.

### 5. The grain (vk #919/#921)
- Symptom: comparisons passed prose==result AND result==row-truth while the
  two sides were different products (commercial vs CHIP, same payer).
- Fix: plan_class column (4,368,222 rows classified; closed set of 6
  classes), sweep pairs within class only, loader refuses a finding whose
  query does not pin exactly one class, live tripwire asserts executed
  provenance spans exactly one class.
- Consequence: corpus is 20 findings, all commercial (29 stories survived,
  3 Medicaid rank below the top-20 cutoff). Hero is now the commercial
  metabolic panel: $693.20 vs $10.07, 4 payers, 68.8x.
- Hero scoring is stated on the page: ln(ratio) x ln(1 + higher median) x
  sqrt(paired payers); dollar magnitude dominates by design.

### 6+7. Close
- The knee MRI lede resolves: $2,848.00 / $323.46, Cigna, commercial.
- One touch: the list of absent problems is the only visible evidence of
  the process. "This is what that list costs." Stop there.
- Final line: tool link + "every figure re-executes from its own stored
  query" (the reader can check; the offer to check IS the confidence).

## Deliberately excluded (do not reintroduce)
- Tooling, harnesses, models, panels, agents. Not even "review caught this."
  The process appears once, at the end, as "checked until it held."
- Chronology. Sections escalate by subtlety, not by date.
- "SOTA said it was fine." The reader infers difficulty from trap depth.
- The employer's name; twelve-of-twenty's full list (that post links, not
  repeats); the launch-gate/UX material (a different article).

## Tone checks for the write pass
- No em dashes. Banned-word list per aiscrub.
- Let the reader walk into each trap: present the plausible version first,
  let them nod, then the crack. "I would have shipped that" is the sale.
- Vary the triads. Short sentences between long ones.
