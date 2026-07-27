US hospitals have to publish their prices. What they publish is a minefield: prices filed for services a hospital doesn't provide, placeholder rates CMS had to ban, one procedure described 490 different ways. The schema parsers are free. Nobody publishes the layer that reconciles what's inside.

I built that layer for one metro: five Pittsburgh hospital files, 4.5 million rows, and a tool that compares what hospitals charge for the same procedure. Every published figure re-executes from its own stored query against the live data before it counts.

Building it meant surviving four traps:

Invented numbers. Postgres's default median averages the two middle rows, a rate that appears in no contract and on no bill. The first time a re-execution check ran against my generated findings, twelve of twenty stated a dollar figure the data could never return.

Mislabeled rows. One payer is not one payer in this data. Subsidiaries file under parents, acquired products file under old names. Correcting the identities moved 145,004 rows.

Corrections that manufacture the bug. Sometimes the right correction is to not correct. One "duplicate" payer, split, would have guaranteed two hospitals never compare at all. Every repair has to be checked against the repairs before it.

Invalid comparisons. A commercial rate and a children's Medicaid rate from the same insurer are prices of different products, about a twofold difference at the same hospital. Every comparison in the tool is now confined to one product line, and the loader refuses to publish one that could cross.

None of this is visible in the software. The only evidence is the list of things that are not wrong with it.

Tool: https://prices.georgelarson.me
Full writeup: https://georgelarson.me/writing/2026-07-26-pght/

#Healthcare #DataEngineering #Go #DataQuality #PriceTransparency
