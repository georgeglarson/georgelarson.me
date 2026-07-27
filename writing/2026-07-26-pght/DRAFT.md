---
title: "the most corrected number in my portfolio"
slug: 2026-07-26-most-corrected-number
date: 2026-07-26
description: "A knee MRI that was right the whole time, and everything it almost meant. A catalog of problems this software does not have, and what not-having them costs."
tags: healthcare, data, go, verification
og_title: "the most corrected number in my portfolio"
og_description: "A catalog of problems this software does not have, and what not-having them costs."
cover_image: TODO.webp
lead: "The figure never changed. What it was changed three times. That is the difference between an answer that is right and an answer that is true."
---

The most corrected number in my portfolio is $2,848.00.

Like so many, the last chapter ended and I've been trying to find the next chapter of my career.

It is the price of a knee MRI at UPMC Magee, and it has been the headline figure of my hospital price tool since the first version. 
It has never once been incorrect, although what it meant has been wrong three times.

Problems this software does not have:
**A median can be arithmetically correct and refer to nothing.** 
Postgres offers two medians. The continuous one, over an even number of values, averages the two middle rows. That average is nobody's rate: it appears in no contract, on no bill, and it renders beautifully. A dashboard full of interpolated medians looks identical to a dashboard full of real prices, and the only way to tell them apart is to make each number prove it exists in a row. This failure is not rare. The first time that check ran against generated findings, twelve of twenty stated a dollar figure the data could never return. The tool computes only the discrete median, which is always a rate somebody actually filed, and every published figure re-executes against the live database before it counts.

**A payer can be someone else.** One insurer's rates were filed under its parent company. Another filed its Medicaid product under its subsidiary's old name, from before the acquisition. A third was, on paper, just "Medicare." 
Every one of these is a real filing pattern in real hospital data. Each one could quietly move tens of thousands of rows to the wrong side of a comparison.Correcting the identities moved 145,004 rows. 
It also produced a rule that runs the other way: one product had to be deliberately kept together, because a hospital forty minutes away files it under a different name, and splitting it would have guaranteed those two hospitals never compare at all. Nothing in the files tells you any of this. The filings are legal, the names are real, and every row passes a schema check. You have to know the payers, or you have to go looking.

**Two things can be equal in every check and still not be comparable.** The tool compares hospitals per payer, and the checks were passing: the prose matched the engine, the engine matched the rows. And the comparison was still wrong, because the two sides were different insurance products. Aetna sells a commercial plan and a children's Medicaid plan, and both were in the pairing as though they were the same thing. A commercial rate and a Medicaid rate are prices of different products, negotiated by different people under different rules. No correctness check can see that, because correctness is not the property being violated. Comparability is. Every comparison in the tool is now confined to a single product line, and the loader refuses to publish one that could cross.

You will notice the knee MRI survived all of this. It is still the headline: $2,848.00 at Magee, $323.46 at West Penn, Cigna, commercial. The number was right the entire time. It was Aetna's rate, then it was an artifact of two product lines averaged together, and now it is what it always should have been, one insurer's commercial price at one hospital. The answer stayed put while the reasoning underneath it was demolished and rebuilt three times.

None of these problems is visible in the software, and that is the point. You cannot tell from the outside whether a number was checked once or checked until it held. The only evidence is the list of things that are not wrong with it. This is what that list costs.

The tool is at [prices.georgelarson.me](https://prices.georgelarson.me). Every figure on it re-executes from its own stored query, so you do not have to take any of this on my word.
