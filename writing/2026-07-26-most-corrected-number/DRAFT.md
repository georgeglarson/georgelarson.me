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

The most corrected number in my portfolio is $2,848.00. It is the price of a knee MRI at UPMC Magee, and it has been the headline figure of my hospital price tool since the first version. It has never once been wrong. What it meant has been wrong three times.

That distinction is the whole story, so let me tell it as what it actually is: a catalog of problems this software does not have.

**A median can be arithmetically correct and refer to nothing.** The first generated findings quoted each hospital's median negotiated rate per payer. Postgres offers two medians. The continuous one, over an even number of values, averages the two middle rows. That average is nobody's rate. It appears in no contract, on no bill, and one published figure, $344.82, existed in no file at all. Every sentence was grammatically fine, every chart rendered, and twelve of twenty findings stated dollar figures the data could never return. The tool now computes only the discrete median, which is always a rate somebody actually filed, and a check re-executes every published figure against the live database before it counts. The first version did not have this problem in any visible way. That is the problem.

**A hospital's list price can be a number the hospital never published.** The charts mark each hospital's chargemaster sticker with a dashed tick. West Penn's tick once read $1,540.50. West Penn does not list a knee MRI at $1,540.50. It lists the same billing code twice, at $180.00 and at $2,901.00, fifty-five rows each, and the tick was the midpoint of the two. A number no source states, drawn where a reader would trust it most. The fix was not a better average. The chart now draws a tick only where a hospital publishes a single price, and West Penn simply has none. Showing nothing is the honest answer when the source has no answer, and it is a harder answer to ship than the wrong number was.

**A payer can be someone else.** One insurer's rates were filed under its parent company. Another filed its Medicaid product under its subsidiary's old name, from before the acquisition. A third was, on paper, just "Medicare." Every one of these is a real filing pattern in real hospital data, and each one quietly moves tens of thousands of rows to the wrong side of a comparison. Correcting the identities moved 145,004 rows. It also produced a rule that runs the other way: one product had to be deliberately kept together, because a hospital forty minutes away files it under a different name, and splitting it would have guaranteed those two hospitals never compare at all.

**Two things can be equal in every check and still not be comparable.** This is the one I think about most. The tool compares hospitals per payer, and the checks were passing: the prose matched the engine, the engine matched the rows. And the comparison was still wrong, because the two sides were different insurance products. Aetna sells a commercial plan and a children's Medicaid plan, and both were in the pairing as though they were the same thing. A commercial rate and a Medicaid rate are prices of different products, negotiated by different people under different rules. No correctness check can see that, because correctness is not the property being violated. Comparability is. Every comparison in the tool is now confined to a single product line, and the loader refuses to publish one that could cross.

You will notice the knee MRI survived all of this. It is still the headline: $2,848.00 at Magee, $323.46 at West Penn, Cigna, commercial. The number was right the entire time. It was Aetna's rate, then it was an artifact of two product lines averaged together, and now it is what it always should have been, one insurer's commercial price at one hospital. The answer stayed put while the reasoning underneath it was demolished and rebuilt three times.

None of these problems is visible in the software, and that is the point. You cannot tell from the outside whether a number was checked once or checked until it held. The only evidence is the list of things that are not wrong with it. This is what that list costs.

The tool is at [prices.georgelarson.me](https://prices.georgelarson.me). Every figure on it re-executes from its own stored query, so you do not have to take any of this on my word.
