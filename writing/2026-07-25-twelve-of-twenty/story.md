---
title: "twelve of twenty findings were wrong"
slug: 2026-07-25-twelve-of-twenty
date: 2026-07-25
description: "I built a tool over Pittsburgh's published hospital price files, then made every published number re-execute against the engine. Most of them failed. Here is the whole list of what almost shipped."
tags: healthcare, data, go, vue, testing
og_title: "twelve of twenty findings were wrong"
og_description: "A hospital price tool, and everything it caught me getting wrong before anyone read it."
cover_image: TODO.webp
lead: "Every published figure had to re-execute from its own stored query. That check caught the sentence I wrote, and then it caught the machine that wrote the rest."
---

Aetna pays $2,848.00 for a knee MRI at UPMC Magee. Across town at AHN West Penn, the same scan under the same insurer is $397.67. UnitedHealthcare goes the other direction and pays more at West Penn. Hospitals publish these numbers because federal law requires it. Reading them is straightforward enough, and the tool I built generates findings like that one across five Pittsburgh hospital files. Every published number then has to re-execute from its own stored query against the live database before it counts.

Twelve of the twenty failed.

Here is the whole list of what almost shipped, including one I found last week while writing this post.

## what the tool is

Every US hospital has been required since 2021 to publish a machine readable file listing its standard charges. Gross charge, discounted cash price, and the payer-specific negotiated rate, which is the one that means anything. These files are a business to business data artifact rather than a consumer tool, which is why the audience for anything built on them is analysts and journalists.

Five Pittsburgh files, from UPMC, AHN, St. Clair and Heritage Valley. 4,553,421 rows normalized into Postgres across two explicitly labeled snapshots, because a price without a date attached is a rumour.

On top of that sits a small query grammar instead of a REST API. You send a question, and the answer comes back with its provenance attached: which hospitals and payers contributed rows, how many, from which file, plus a canonical hash so the exact question runs again. The thing being served is a citable answer. REST would have been easier and would have said less.

Here is the sort of thing it says. One knee MRI, HCPCS 73721, outpatient. Aetna pays $2,848.00 at UPMC Magee and $397.67 at AHN West Penn. Same scan, same city, same insurer. UnitedHealthcare runs the other way and pays more at West Penn. Of 24 payers that disclose a rate at either hospital, only 6 disclose at both.

## the rule that made the rest of this post possible

One rule, and everything below follows from it: **every published figure has to re-execute from its own stored query against the live engine.** Not a snapshot of a number. The actual query, run again, compared to the sentence.

That rule is annoying to honor and it is the only reason I know what follows.

## the sentence it caught

The flagship finding originally quoted a median that its own stored query could not produce.

There are two different medians in this data. One is the per-payer median, taken for each payer and then compared across hospitals. The other pools every disclosed row regardless of payer. They answer different questions and they are different numbers: $2,421.99 against $241.84 for the pooled version, versus Aetna's $2,848.00 against $397.67.

The prose quoted one and the chart drew the other. Both numbers were real. The sentence was still false, because it claimed the chart showed something it did not.

## then it caught the machine

The first corpus was three findings I wrote by hand. Fine. Three sentences is a thing a person can check.

Then I replaced it with a scout that sweeps a candidate set of two dozen shoppable procedures, scores every hospital pair, and generates the findings itself. Suddenly the prose was templated from arithmetic, at twenty times the volume, and nobody was reading each sentence.

The re-execution check found that **twelve of the twenty generated findings stated a dollar figure that no row in the database could return.**

The cause is a nice small thing. The headline was a median across the paired payers, and Postgres has two of those. `percentile_cont` is continuous: over an even number of payers it averages the two middle values. That average is nobody's actual rate. It is an arithmetic ghost that appears in no contract and on no bill, and the finding's own query, which returns rows, could never surface it.

`percentile_disc` returns an actual member of the set. Switching to it means every published headline is now some real payer's real disclosed rate.

One bad sentence is an editing mistake. Twelve bad sentences out of twenty is a correctness problem, and the same check caught both.

## the list price that nobody published

This one turned up last week, while writing this post, which is the part I like.

The charts carry a dashed tick marking each hospital's chargemaster price, the list price almost nobody pays. Magee's knee MRI lists at $7,120. West Penn's tick read $1,540.50.

West Penn does not list a knee MRI at $1,540.50. It publishes two chargemaster lines for that same billing code, "CHG MRI ANY JT LOWER EXTREM W/O CONTRAST MATRL" at $180.00 and "HC MRI LE JNT WO CNTRST" at $2,901.00, at 55 rows each. The anchor asked for the median across them and got the midpoint. A number no hospital ever published, drawn on a public chart, labeled as that hospital's list price.

The obvious fix is wrong, which is why it is worth telling. Swapping to the discrete percentile picks $180.00, and $180.00 sits below almost every negotiated rate at that hospital, which would flip a claim the chart makes elsewhere about rates sitting below list. The aggregate was never the question. There is no single list price to draw, so now the chart draws a tick only where a hospital publishes exactly one, and West Penn simply has none. Showing nothing is the honest answer when the source has no answer.

The negotiated rates were fine, and I checked rather than assumed: the two chargemaster lines carry near-identical negotiated medians, $239.98 and $257.88.

## the rest of the list

Shorter, because the shape repeats.

**A sort order that told the story backwards.** The findings ranked by signed gap rather than absolute gap, so UnitedHealthcare's small reversal outranked Aetna's large one. The page would have led with the counter-example as though it were the argument.

**A caption the data contradicted.** "Every negotiated rate sits below both list prices," when five of six rates on one side went the other way. A sentence that reads perfectly and is simply untrue against the fixture underneath it.

**Money that had already crossed a float.** Ingestion parsed source amounts through `float64` before reaching Postgres `NUMERIC`. In price data a rounding artifact is not a rounding artifact, it is a wrong claim about what somebody charges. Fixed by moving the parse boundary to strict decimal text and re-ingesting all five files.

**A feature that did not ship.** Stable pagination over raw distributions looked like a query-compiler problem. Tracing it backward found unstable source identifiers across re-ingest, no durable corpus revision behind the cursors, and a first page that could pass for the whole distribution. The plan went back to design instead of shipping under guarantees it could not keep.

**A test command that lied.** `go test ./...` compiles none of the integration suites and prints a confident green over 81 tests it never ran, including the re-execution check this whole post rests on. That silence cost a day of "it's green" that had never run the thing that mattered.

**A launch gate that stopped a build that was already green.** Tests, audit, Lighthouse, restore, responsive, replay and export all passing, and a final pass still found comparisons rendering their sides as `hospital_1` and `hospital_2`, a cached response that later requests mutated, and a procedure picker a keyboard user could search but not select.

**Two alarms that were false.** The same round produced a path traversal report and a missing-source-identity report, both dramatic, both wrong. One depended on path-join behavior Go does not have, the other ignored normalization happening server side. Reproducing them took an afternoon and saved a week. Review is an input, not an authority.

## what I actually think this shows

None of these look like bugs while you are making them. That is the whole point. There is no stack trace for a caption that reads well and is false, or for a median that is arithmetically correct and refers to nothing. Every one of them produces a plausible sentence, and plausible is exactly what a language model is good at.

The tooling wrote a lot of this code and I am not precious about that. What made the difference was deciding, before any of it existed, that a published number has to survive re-execution against the thing it describes. Everything above is that one decision paying out.

If I had shipped fast and trusted the output, all of it would be live right now. Reading well and being true are different properties, and only one of them shows up in a screenshot.

## why this exists at all

Seven years of my career were medical billing. Universal SmartComp, 2009 to 2016, later consumed by One Call Medical, where the EDI framework was mine to own while the company went from about fifty people to national reach. Payer portal, ACH transmission, ERP integration, recovery analytics, HIPAA and HITECH. X12 again recently and in public: a couple of patches upstream in stupidedi re-enabling the 4010 PO850, AR943 and RE944 transaction sets, merged this month.

A job listing supplied the shape of this one. Its interview process included a pricing data visualization exercise, and building that ahead of time beats building it under a clock. The stack came from the same listing, which is why this is Go, Vue and Postgres. The same work would look much the same in Rust or Python or C#, and the language was never the interesting part.

## the tool

It runs at [prices.georgelarson.me](https://prices.georgelarson.me). Bounded on purpose: one metro, two labeled snapshots, no freshness pipeline and no SLA. It ingests the real files and answers real questions, and if people find it useful I keep it up within reason.

The findings, the methodology, the coverage limits and the accepted gaps are all in the tool rather than in a footnote here, including the things it declines to answer.

If you are hiring in healthcare data and this is the kind of care you want taken with numbers that describe real prices, I am looking. Seven years of billing and EDI, twenty-five in software, and a fairly stubborn habit of checking my own work.
