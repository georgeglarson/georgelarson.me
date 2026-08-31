---
title: "the $25 AI lab"
slug: 2026-04-03-25-dollar-ai-lab
date: 2026-04-03
description: "I tested 15 AI models at building real software on a $25/year VPS. 8 passed. Most of the failures were infrastructure problems, not capability gaps."
tags: ai, benchmarking, llm, testing
og_title: "the $25 AI lab"
og_description: "15 AI models, a $25 VPS, a URL shortener challenge. Here's what happened."
cover_image: sumo.webp
lead: "Can free LLMs actually build software, or just chat about it? I spent $25 to find out."
---

<!-- social:mastodon -->
tested 15 AI models at building real software. $25/year VPS, a URL shortener challenge, 15 models across 4 providers. none of them cost me anything to run.

8 passed. 7 failed. most of the failures were the providers, not the models.

then I audited the code and found that "passing tests" doesn't mean the same thing for every model.

https://georgelarson.me/writing/2026-04-03-25-dollar-ai-lab/
<!-- /social:mastodon -->

<!-- social:linkedin -->

Can free AI models actually build software? I tested 15 of them to find out.

Setup: a $25/year RackNerd VPS (2.5GB RAM, 3 cores). One challenge: build a URL shortener from scratch with Express, SQLite, and 5 integration tests. Same prompt, same environment, 15 models.

8 passed. The spread was dramatic. Two models tied at 1m43s, one-shot, perfect code. Others limped across in 30 minutes after multiple retries. Seven models failed entirely, and most of those failures were infrastructure, not intelligence.

The fun part: I audited all the passing code and found tiers within "pass." One model passed by writing tests that validated its own broken API. Another left .backup, .backup2, .bak, and .orig files scattered around like a crime scene. The best model produced production-quality code with collision-resistant short codes and proper module separation.

$25 total. 15 models. Real results. Provider reliability matters as much as model benchmarks.

https://georgelarson.me/writing/2026-04-03-25-dollar-ai-lab/

#AI #LLM #Benchmarking #SoftwareEngineering
<!-- /social:linkedin -->

<!-- social:hn -->

Show HN: I tested 15 free AI models at building real software on a $25/year VPS

https://georgelarson.me/writing/2026-04-03-25-dollar-ai-lab/

<!-- /social:hn -->

## the question

![two computers sumo wrestling](sumo.webp)

Can free LLMs do real agentic work? Not chat. Not autocomplete. Actually build and debug software, autonomously, without a human typing anything after the initial prompt?

I spun up a $25/year RackNerd VPS (2.5GB RAM, 3 cores), wrote a URL shortener challenge spec (Express backend, SQLite, HTML frontend, rate limiting, 5 integration tests), and pointed 15 models at it. Same prompt, same environment, up to 15 iterations each with a 10-minute timeout per iteration. I called it the showdown loop. Run the agent, check if it said it's done, repeat.

15 models across 4 providers. OpenCode's built-in free models, Venice, Groq, OpenRouter's free tier. None of them cost me anything to run. I held Venice's DIEM token at the time, which came with daily inference credits, and the rest were free-tier models.

8 out of 15 passed. Two models tied at 1 minute 43 seconds, one iteration each. At the other end, nemotron-3-super-free needed 3 iterations and 30 minutes. Seven models failed entirely.

## the failures

6 out of 7 OpenRouter models failed. Deepseek-r1-zero hit "no endpoints found." GPT-OSS-120b and minimax-M2.5 were advertised as free but unavailable. Llama-3.3-70b got intermittent API errors. Mistral-small-3.1 timed out repeatedly. These models never had a chance to show what they could do because they couldn't connect.

To be fair to OpenRouter: this was one overnight run. Free-tier infrastructure is volatile, and a 10-minute timeout per iteration with a 15-iteration cap is aggressive. Some of these models might have passed with a longer timeout or on a different night. A timeout is a test parameter, not a measure of intelligence. If you're running your own tests on free infrastructure, expect some amount of "well, try it again tomorrow."

OpenCode's built-in free models went 5 for 5. OpenRouter went 1 for 7. The failure mode wasn't "model is dumb." It was "model is unavailable."

Only two failures were genuine capability issues: qwen3-coder on OpenRouter couldn't navigate files despite connecting, and llama-3.3-70b-versatile on Groq attempted work but couldn't pass the tests.

## the code audit

Passing tests and writing good code turned out to be different things. I went through every passing model's server.js and compared them.

### Tier 1: clean, correct, first try

**mimo-v2-flash-free** (1 iteration, 1m 43s) built the best architecture of any model in the test. Separated database module. Collision-resistant short code generation with a retry loop, so if two requests generate the same random code simultaneously, it tries again instead of serving a collision. Deduplicated existing URLs, so pasting the same long URL twice gives you back the same short code. Dynamic host in short URLs instead of hardcoded localhost, so the links work behind a proxy. Proper `require.main` guard for testability. Used `crypto.randomBytes` for short code generation instead of `Math.random`, which is more appropriate when predictability could be a security issue.

Production-quality code from a free model in under 2 minutes.

**GLM-5** (via Venice, 1 iteration, 1m 43s) wrote clean code with one notable tradeoff: it used an in-memory SQLite database (`:memory:`), so all the shortened URLs vanish on restart. Data persistence wasn't in the test spec, so the tests didn't catch it. On the plus side, it implemented a sliding-window rate limiter that filters out expired timestamps instead of doing a simple counter reset. Most other models used a naive counter approach, which can allow burst traffic at window boundaries. GLM-5's approach is more correct.

GLM-5 was also the only model to get Express route ordering right. Express matches routes top-to-bottom, so if you define `/:code` before `/api/stats/:code`, the wildcard swallows the stats endpoint. Every model that put the wildcard first got lucky because their tests didn't expose the bug. GLM-5 put the stats route first and the wildcard second.

**big-pickle** (1 iteration, 3m 54s) was solid. ESM imports, proper URL validation that actually checks for http/https protocol (most models didn't bother), clean rate limiter. The one issue: hardcoded `localhost:3000` in short URLs. Works locally, breaks behind a proxy. No DB module separation. It works, but it's less structured than mimo or GLM-5. Also used `crypto.randomBytes` for short codes.

### Tier 2: passed with caveats

**minimax-m2.5-free** (1 iteration, 8m 32s) produced similar quality to big-pickle. Single file, clean structure. Slower but correct on the first try. Nothing especially notable, good or bad.

**gpt-5-nano** (2 iterations, 12m 43s) wrote a minimal 67-line server.js. Functional but bare. It needed a second iteration to fix whatever went wrong on the first pass. No frills.

**nemotron-3-super-120b** (2 iterations, 17m 41s) was the most verbose of the passing models at 155 lines. Clean enough, but slow. Needed one debug cycle to converge.

**nemotron-3-super-free** (3 iterations, 29m 49s) had the most enterprise-looking code. It used the `express-rate-limit` npm package instead of hand-rolling, and separated the database into its own module with named exports. Good choices.

It also left `.backup`, `.backup2`, `.bak`, and `.orig` files scattered around the repo. That's a pretty good archaeological record of how hard it struggled across its 3 iterations. Each backup file represents a failed approach that it couldn't cleanly undo.

My favorite detail: nemotron implemented a test/prod rate limit split where `NODE_ENV === 'test'` gets 100 requests per minute versus 10 in production. Instead of fixing the rate limiter that was blocking its own tests, it patched the environment detection. That's enterprise development in a nutshell.

### Tier 3: passed tests, failed the spec

**qwen3-32b** (2 iterations, 10m 51s) used wrong endpoint paths (`/shorten` instead of `/api/shorten`), skipped the stats endpoint entirely, implemented no clicks tracking, added no rate limiting, and built no frontend. No HTML page, no static file serving, nothing the spec asked for beyond "accept a URL and return a short code."

It passed because it wrote tests that validated its own broken API instead of the spec. The challenge says "build a URL shortener with these endpoints." qwen3-32b built something different and wrote tests to match what it built. From the test runner's perspective, green is green. From the spec's perspective, it never built the thing that was asked for.

Going through every passing model's server.js is what made this visible. Green tests, move on. Only by looking at the actual code could you see that the model built the wrong thing and then wrote tests to prove itself right.

## the total bill

- VPS: $25/year
- API costs: $0
- Total: $25

Every model I tested was free in some form: free-tier, included with a token I already held, or available through a provider's no-cost plan. I'm not going to tell you which specific models are free right now, because free tiers change and this was a research project, not a shopping guide. The point is that running a meaningful AI benchmark is cheap. You can do this.

Source code: [GitHub](https://github.com/georgeglarson/llm-showdown-data)

## what's next

This was round 1 of a project that grew into something much bigger: 33 models, a 6-level difficulty ladder, and some genuinely surprising findings about prompt engineering, provider infrastructure, and orchestration. The origin story is here. The rest is coming.
