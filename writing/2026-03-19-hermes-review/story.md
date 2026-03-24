---
title: "Hermes Agent: Honest Review"
slug: 2026-03-19-hermes-review
date: 2026-03-19
description: "I paid $10 to test NousResearch's Hermes Agent. The multi-platform gateway is real engineering. The model is a Llama fine-tune. Software engineers can skip."
tags: ai, review, agents, llm
og_title: "hermes agent: honest review"
og_description: "I paid $10 to test Hermes Agent. Here's what I found under the bonnet."
cover_image:
lead: "I paid $10 to test NousResearch's Hermes Agent. The marketing is excellent. The engineering is real. The value proposition depends entirely on who you are."
---

<!-- social:mastodon -->
I tested NousResearch's Hermes Agent.

The model is a Llama 3.1 fine-tune. The memory and skills systems are markdown on disk, but well-engineered. Atomic writes, file locking, progressive token management. Better than most agent frameworks doing the same thing.

What's real: 12-platform messaging gateway. Discord, Telegram, Signal, Slack, WhatsApp. 2,085 lines just for Discord. No equivalent elsewhere.

If you coordinate across messaging platforms, worth a serious look.

https://georgelarson.me/writing/2026-03-19-hermes-review/
<!-- /social:mastodon -->

<!-- social:linkedin -->
I tested Hermes Agent, "an agent that grows with you".
Here's what I found under the bonnet.

The model (Hermes-4-405B) is a supervised fine-tune of Llama 3.1 405B. About 5 million training samples, tool-calling baked in. The HuggingFace card is upfront about this. If you've used Llama 3.1 through any other provider, you already know roughly what to expect.

The memory system writes structured markdown to disk. The skills system injects context into the model's prompt. Both are well-engineered. Hermes actually does these better than most agent frameworks I've looked at, with atomic writes, file locking, and progressive disclosure for token management. The naming conventions (skills, memory, growth) are industry-standard at this point; every agent framework from Claude Code to custom GPTs uses similar language.

What genuinely impressed me: the multi-platform gateway. 12 messaging integrations. Discord, Telegram, Slack, Signal, WhatsApp, Home Assistant, and more. The Discord adapter alone is 2,085 lines. I haven't found an equivalent elsewhere. If you need an AI agent that lives on messaging platforms, Hermes is the most complete option available.

If you're a software engineer working in a terminal, the coding tools probably overlap with what you already use. But for community managers, team leads, or anyone coordinating across multiple platforms, this is worth a serious look.

Full writeup with the technical breakdown: https://georgelarson.me/writing/2026-03-19-hermes-review/

#AI #OpenSource #DevTools #LLM
<!-- /social:linkedin -->

Hermes Agent. An agent that grows with you.

I paid $10 to find out what's actually under the bonnet.

## The short version

Hermes is an autonomous agent framework with genuine multi-platform integration: Telegram, Discord, WhatsApp, Slack, Signal, Home Assistant, and more. If you need an AI agent that lives on messaging platforms, Hermes is the most complete option available.

If you're a software engineer working in a terminal, the coding tools will overlap with what you already use. The gateway is where the real value is.

## The model

Hermes-4-405B is a supervised fine-tune of Meta's Llama 3.1 405B. The [HuggingFace model card](https://huggingface.co/NousResearch/Hermes-4-405B) lists the base model explicitly. Every Hermes model since version 1 has been a Llama fine-tune. NousResearch is fundamentally a Llama fine-tuning shop.

The fine-tuning is competent: ~5 million training samples, ~60 billion tokens, tool-calling format baked in. But the moment you interact with it, you feel Llama. If you've used Llama 3.1 405B through any other provider, you already know what Hermes-4 feels like.

The agent itself is model-agnostic. You can point it at Claude, GPT, Gemini, or anything via OpenRouter. Oddly, the default configuration ships pointed at Claude Opus via OpenRouter, not their own model. Getting Hermes-4 running on their own inference portal took some troubleshooting. The portal is the actual business model (free agent, paid inference) but the onboarding doesn't make it easy.

## "Grows with you"

The marketing implies something approaching learning. The reality: Hermes writes markdown files to `~/.hermes/memories/`. A `MEMORY.md` (and optionally a `USER.md`) with section delimiters, loaded into context at the start of each session.

This is the same pattern used by Claude Code, OpenCode, and every other tool with a config file. The implementation is well-engineered: atomic writes via temp files, file locking, injection scanning, character budgets, frozen snapshots for cache stability. But "grows with you" is a stretch for what amounts to structured note-taking.

## Skills are system prompts

Hermes has a skills system. Skills are markdown files with YAML frontmatter. When activated, their content is injected into the model's context. That's it.

I asked Hermes to critique my resume. It created a "portfolio analysis skill," which was a markdown file describing how to analyze portfolios. This is structured prompt injection with a CRUD layer, not a capability. The progressive disclosure design (metadata loaded first, full content on demand) is genuinely good token management.

To be fair, calling these "skills" is an industry-wide convention, not something Hermes invented. Claude Code, OpenAI's custom GPTs, and most agent frameworks use similar language for what amounts to structured context injection. Hermes's implementation is actually better-engineered than most.

## What's real vs. what's a wrapper

### Real engineering

**Multi-platform gateway.** 12 messaging platform integrations, each with hundreds to thousands of lines of adapter code. Discord alone is 2,085 lines. Telegram, Slack, Signal, WhatsApp, Matrix, Home Assistant, email, SMS. These are real, substantial integrations with media handling, threading, and typing indicators. This is the genuinely unique thing Hermes offers.

**Terminal tool.** Six execution backends: local subprocess, Docker, Singularity, Modal (cloud), SSH, and Daytona. Persistent shell that preserves state across calls. Dangerous command approval system. Environment variable isolation to prevent API key leakage. Real engineering on top of subprocess.

**Memory system.** Flat files with atomic writes, file locking, injection/exfiltration scanning, and frozen snapshots for prefix cache stability. Well-thought-out engineering for what is fundamentally markdown on disk.

### Wrapper layer

**Web tools.** Configurable wrapper around Firecrawl, Parallel, or Tavily. The value-add is an LLM post-processing layer that summarizes results to reduce token usage. Functional but not novel.

**Mixture of Agents.** Sends the same prompt to four frontier models (Claude, Gemini, GPT, DeepSeek) in parallel, then aggregates with a fifth. ~550 lines implementing a [published paper](https://arxiv.org/abs/2406.04692). Works, but expensive: five frontier model calls per query.

**Browser tool.** Uses accessibility tree snapshots for text-based page interaction, a better pattern than DOM selectors for LLM agents. Supports local Chromium, Browserbase, and Browser Use as backends. Solid design, but the same approach is available via Vercel's [agent-browser](https://github.com/vercel-labs/agent-browser) as a standalone tool.

## Who this is for

If you manage a community, run a Discord server, coordinate a team on Slack, or want an AI assistant on Signal/WhatsApp/Telegram, Hermes is the most complete agent framework for that. I haven't found anything else with this level of multi-platform gateway support. The engineering is real.

If you're a software engineer working in a terminal, the coding tools probably overlap with what you already use. But if you coordinate across messaging platforms, this is worth a serious look.

## The business model

The agent is MIT-licensed and free. You bring your own API keys: OpenRouter, Anthropic, OpenAI, whatever you prefer. The monetization is [Nous Portal](https://portal.nousresearch.com), their inference service that hosts Hermes-4. You get $5 in free credits and the agent has first-class OAuth integration with Nous as a provider.

The strategy: give away the agent, sell the inference. Smart model, and the free tier makes it easy to evaluate.

## Bottom line

Hermes Agent is real software with real engineering effort: 40 tool modules, 12 platform adapters, active development. The multi-platform gateway is genuinely impressive and has no equivalent in the ecosystem.

The "grows with you" and "gets more capable" framing is a stretch for what amounts to structured note-taking, but the underlying implementation is solid. The naming conventions are the same ones the whole industry uses.

If your use case is "AI agent accessible on messaging platforms," Hermes is the best option I've found. If you primarily work in a terminal, the coding tools will feel familiar, but the gateway alone may be worth exploring.

<style>
    .verdict {
      padding: 2rem 1.75rem; margin: 2rem 0; border-radius: var(--radius);
      border: 1px solid rgba(22, 245, 166, 0.3); background: rgba(5, 12, 18, 0.75);
    }
    .verdict h3 { margin: 0 0 0.75rem 0; }
    .verdict p { margin: 0.4rem 0; color: var(--fg-muted); }
    .breakdown { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2rem; }
    .breakdown-card {
      padding: 1.5rem 1.25rem; border-radius: var(--radius);
      border: 1px solid rgba(22, 245, 166, 0.22); background: rgba(5, 12, 18, 0.75);
    }
    .breakdown-card h3 { margin: 0 0 0.5rem 0; font-size: 0.95rem; }
    .breakdown-card p { margin: 0; color: var(--fg-muted); font-size: 0.92rem; line-height: 1.5; }
    .breakdown-card.real { border-color: rgba(22, 245, 166, 0.35); }
    .breakdown-card.real h3 { color: var(--accent); }
    .breakdown-card.wrapper { border-color: rgba(255, 200, 100, 0.25); }
    .breakdown-card.wrapper h3 { color: rgba(255, 200, 100, 0.85); }
    .code-block {
      background: rgba(5, 12, 18, 0.9); border: 1px solid rgba(22, 245, 166, 0.15);
      border-radius: var(--radius); padding: 1.25rem 1.5rem; margin: 1.25rem 0;
      font-size: 0.88rem; line-height: 1.7; overflow-x: auto; color: var(--fg-muted);
    }
    .code-block .cmd { color: var(--accent); }
    .code-block .comment { color: rgba(146, 203, 180, 0.5); }
    .stack-list { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.5rem; }
    .stack-tag {
      padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.82rem;
      background: rgba(22, 245, 166, 0.1); border: 1px solid rgba(22, 245, 166, 0.2); color: var(--accent);
    }
    .screenshot { margin: 2rem 0; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); }
    .screenshot img { width: 100%; display: block; }
    @media (max-width: 720px) {
      .breakdown { grid-template-columns: 1fr; }
    }
</style>
