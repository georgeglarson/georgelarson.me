---
title: "Four traps in hospital price data"
published: false
description: "US hospital price data has been documented as hostile for years. The schema parsers are free. Nobody publishes the layer that reconciles what is inside. What building that layer over one metro actually required."
tags: healthcare, data, go, verification
canonical_url: https://georgelarson.me/writing/2026-07-26-pght/
cover_image: https://georgelarson.me/writing/2026-07-26-pght/cover.webp
---

US hospitals are required by federal law to publish what they charge. I built a tool over those files for Pittsburgh — five hospital files, 4.5 million rows, from January and March 2026 snapshots — that compares what hospitals charge for the same procedure. Every published figure re-executes from its own stored query against the live database before it counts.

The data has been known hostile territory for years. Prices filed for services a hospital does not provide made the literature as ["ghost codes"](https://pmc.ncbi.nlm.nih.gov/articles/PMC11363865/). The Peterson-KFF Health System Tracker keeps a [running catalog](https://www.healthsystemtracker.org/brief/ongoing-challenges-with-hospital-price-transparency/) of the ways these files confound anyone who opens them: percent-of-charge values sitting in dollar columns, placeholder rates CMS has since had to ban outright, one procedure described 490 different ways.

Schema parsers are free and plentiful. Reconciling what is inside is the part nobody publishes. Here is what building that layer over one metro actually required, and the four traps it survived.

![The tool's hero finding: a metabolic panel priced $10.07 at one Pittsburgh hospital and $693.20 at another, per payer, with the provenance footer visible](https://georgelarson.me/writing/2026-07-26-pght/cover.webp)

## 1. Invented numbers

Postgres offers two medians. The continuous one, over an even number of values, averages the two middle rows. That average is nobody's rate. It appears in no contract, on no bill, and it renders beautifully. A dashboard full of interpolated medians looks identical to a dashboard full of real prices.

This is not rare. The first time a re-execution check ran against my generated findings, **twelve of twenty** stated a dollar figure the data could never return.

The findings corpus now computes only the discrete median, which is always a rate somebody actually filed. The interactive query grammar offers both medians deliberately, because the middle of a distribution is a fair question and the continuous median is its honest answer. The corpus is also audited against the field's documented artifacts — no placeholder rates, no non-positive prices — and the sub-dollar and seven-figure rates that do exist are examined, documented, and kept out of the analytical surface by a tested sweep floor.

## 2. Mislabeled rows

One payer is not one payer in this data. An insurer's rates turn up filed under its parent company. Another files a Medicaid product under a subsidiary's old name, from before the acquisition. A third arrives as, on paper, just "Medicare."

Every one of these is a legal, real filing pattern, and every row passes a schema check. Nothing in the files tells you anything is wrong. But each misfiled identity quietly moves tens of thousands of rows to the wrong side of a comparison, and you cannot pair rates across hospitals until the identities are true. Correcting them moved **145,004 rows**.

The market agrees on the difficulty: one vendor's engineering blog describes reconciling [roughly 170,000 raw payer and plan name strings into 553 canonical plans](https://www.serifhealth.com/blog/payer-name-matching-price-transparency), and their answer, like every vendor's, is proprietary. There is no version of this you can skim your way to. You have to know the payers, or you have to go looking.

## 3. Corrections that manufacture the bug

Sometimes the right correction is to not correct. One product looked just like the mislabeled cases above — same payer, two names. Splitting it was the obvious move, and it would have guaranteed that two hospitals never compare at all, because the second hospital files that product under a plan name rather than a payer name.

This one stays together, with a comment saying why. Every repair layered in has to be checked against the antecedent repairs. An apparent fix in isolation is often just the next bug.

## 4. Invalid comparisons

The tool compares hospitals per payer, and the checks were passing: the prose matched the engine, the engine matched the rows. The comparison was still wrong, because the two sides were different insurance products. Aetna sells a commercial plan and a children's Medicaid plan, and both were in the pairing as though they were one thing.

The difference is not a labeling nuance: the same insurer's commercial rates run [about twice its Medicare Advantage rates](https://doi.org/10.1377/hlthaff.2023.00039) at the same hospital for the same service, so mixing the classes averages a real twofold difference. No correctness check can see that, because correctness is not the property being violated. Comparability is.

Every comparison in the tool is now confined to a single product line, and the loader refuses to publish one that could cross.

## One number carried all four

The knee MRI at UPMC Magee, $2,848.00, was the headline figure of the tool from the first version until the corrections finished. It was a real, filed rate the whole time. It was also published under the wrong payer, paired against a rate from a different product line, and surrounded by headline figures that existed in no file.

Every correction landed: the attribution is now Cigna commercial, the pairing is like-for-like, and the figure itself never changed. You will not find it on the page today. Once the math was finally honest, its median pair — $2,848.00 against $246.49 — turned out identical to another procedure's, and the corpus keeps one story per pair of amounts. The top slot now belongs to a $693.20 lab panel that outscored it.

The machinery has no favorites.

---

None of these problems is visible in the software, and that is the point. You cannot tell from the outside whether a number was checked once or checked until it held. The only evidence is the list of things that are not wrong with it.

The tool runs at [prices.georgelarson.me](https://prices.georgelarson.me), and every figure on it re-executes from its own stored query, so you do not have to take any of this on my word.
