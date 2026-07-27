US hospitals must publish their prices. What's inside those files: ghost codes, placeholder rates, one procedure described 490 ways. The parsers are free; nobody reconciles the payers.

I built the reconciliation layer for Pittsburgh — 4.5M rows, five hospital files — and every published figure re-executes from its own stored query before it counts.

Four traps it survived: interpolated medians that are nobody's rate (12 of 20 findings failed this on the first check), payer identities that moved 145,004 rows when corrected, corrections that manufacture the next bug, and commercial-vs-Medicaid comparisons that no correctness check can see.

Tool: https://prices.georgelarson.me
Writeup: https://georgelarson.me/writing/2026-07-26-pght/
