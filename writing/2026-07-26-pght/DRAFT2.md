---
title: "the most corrected number in my portfolio"
slug: 2026-07-26-most-corrected-number
date: 2026-07-26
description: "A knee MRI that was right the whole time, and everything it almost meant. Three ways hospital price data lies, and what it costs to not be lied to."
tags: healthcare, data, go, verification
og_title: "the most corrected number in my portfolio"
og_description: "Three ways hospital price data lies, and what it costs to not be lied to."
cover_image: TODO.webp
lead: "The figure never changed. What it was changed three times. That is the difference between an answer that is right and an answer that is true."
---

The most corrected number in my portfolio is $2,848.00.

That's the price of a knee MRI at UPMC Magee, and it has been the headline figure of my hospital price tool since the first version. 
It has never been incorrect, but what it meant has been wrong three times.

The tool reads the standard-charge files US hospitals publish under federal law, uaing five Pittsburgh files, 4.5 million rows.
The data lies in three quiet ways, and each one survives a casual read. None of it is secret inside the industry. Prices filed for services a hospital does not provide made the literature as ["ghost codes"](https://pmc.ncbi.nlm.nih.gov/articles/PMC11363865/), and the Peterson-KFF Health System Tracker keeps a [running catalog](https://www.healthsystemtracker.org/brief/ongoing-challenges-with-hospital-price-transparency/) of the ways these files confound anyone who opens them. What follows is the same territory, seen from the build side, in files from January and March 2026. The tool is built to not have these problems. Here is what that costs.

**Invented numbers.** Postgres offers two medians. The continuous one, over an even number of values, averages the two middle rows. That average is nobody's rate. It appears in no contract, on no bill, and it renders beautifully. A dashboard full of interpolated medians looks identical to a dashboard full of real prices, and the only way to tell them apart is to make each number prove it exists in a row. This failure is not rare. The first time that check ran against generated findings, twelve of twenty stated a dollar figure the data could never return. The tool computes only the discrete median, which is always a rate somebody actually filed, and every published figure re-executes against the live database before it counts.

**Mislabeled rows.** One payer is not one payer in this data. An insurer's rates turn up filed under its parent company. Another files a Medicaid product under a subsidiary's old name, from before the acquisition. A third arrives as, on paper, just "Medicare." Every one of these is a legal, real filing pattern, and every row passes a schema check. Nothing in the files tells you anything is wrong. But each misfiled identity quietly moves tens of thousands of rows to the wrong side of a comparison, and you cannot pair rates across hospitals until the identities are true. Correcting them moved 145,004 rows. There is no version of this you can skim your way to. You have to know the payers, or you have to go looking. The market agrees on the difficulty. One vendor's engineering blog describes reconciling [roughly 170,000 raw payer and plan name strings into 553 canonical plans](https://www.serifhealth.com/blog/payer-name-matching-price-transparency), and their answer, like everyone else's, is proprietary. Schema parsers are free and plentiful. Nobody publishes the identity layer.

**Corrections that manufacture the bug.** And then the rule that runs the other way: sometimes the right correction is to not correct. One product looked just like the mislabeled cases above, same payer, two names. Splitting it was the obvious move, and it would have guaranteed that two hospitals never compare at all, because the second hospital files that product under a plan name rather than a payer name. So it stays together, deliberately, with a comment saying why. Every repair in this data has to be checked against the repairs before it. A fix that ignores the last fix is just the next bug.

**Invalid comparisons.** This is the one I think about most. The tool compares hospitals per payer, and the checks were passing: the prose matched the engine, the engine matched the rows. The comparison was still wrong, because the two sides were different insurance products. Aetna sells a commercial plan and a children's Medicaid plan, and both were in the pairing as though they were one thing. A commercial rate and a Medicaid rate are prices of different products, negotiated by different people under different rules, and the difference is not a nuance: the same insurer's commercial rates run [about twice its Medicare Advantage rates](https://doi.org/10.1377/hlthaff.2023.00039) at the same hospital for the same service. Mixing the classes averages a real twofold difference. No correctness check can see that, because correctness is not the property being violated. Comparability is. Every comparison in the tool is now confined to a single product line, and the loader refuses to publish one that could cross.

The knee MRI survived all of it. It is still the headline: $2,848.00 at Magee, $323.46 at West Penn, Cigna, commercial. The number was right the entire time. It was published as Aetna's rate, then it was an artifact of two product lines averaged together, and now it is what it always should have been, one insurer's commercial price at one hospital. The answer stayed put while the reasoning underneath it was demolished and rebuilt three times.

None of these problems is visible in the software, and that is the point. You cannot tell from the outside whether a number was checked once or checked until it held. The only evidence is the list of things that are not wrong with it. This is what that list costs.

Like so many, the last chapter ended and I have been trying to find the next chapter of my career. This tool is part of how I look for it. It runs at [prices.georgelarson.me](https://prices.georgelarson.me), and every figure on it re-executes from its own stored query, so you do not have to take any of this on my word.
