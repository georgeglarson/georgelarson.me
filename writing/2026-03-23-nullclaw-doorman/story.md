---
title: "building a digital doorman"
slug: 2026-03-23-nullclaw-doorman
date: 2026-03-23
description: "How I deployed nullclaw as a public-facing AI agent on a $5 perimeter box with IRC, tiered inference, and Cloudflare-proxied WebSocket — and why the architecture matters more than the model."
tags: ai, agents, irc, security
og_title: "building a digital doorman"
og_description: "A lightweight AI agent that answers questions about my work by reading actual code. Architecture, security, and model selection decisions."
cover_image:
lead: "I put an AI agent on a $7/month VPS, connected it to my own IRC server, and pointed it at my GitHub repos. Visitors can ask it about my work and get answers backed by actual code — not rephrased resume text."
---

<!-- social:mastodon -->
Put an AI agent on a $7/month VPS with IRC as its transport layer. It answers questions about my work by reading actual code, not rephrasing my resume.

Haiku for chat, Sonnet for tool use. Google A2A for agent-to-agent handoff over Tailscale. 10 MB of binaries, 5 MB RAM, $2/day cost cap.

Nully decides what gets escalated and what doesn't.

Chat: https://georgelarson.me/chat/
Writeup: https://georgelarson.me/writing/2026-03-23-nullclaw-doorman/
<!-- /social:mastodon -->

<!-- social:linkedin -->
Every portfolio site with an AI chatbot does the same thing: feed the resume into a model and let visitors rephrase it. I wanted mine to clone repos and show its work.

So I built nullclaw, a public-facing AI agent running on a $7/month VPS, connected to my own IRC server, answering questions about my projects by reading actual code. Ask it how I handle test coverage, and it clones the repo, counts the tests, reads the CI config, and comes back with specifics.

The architecture: two agents, two security boundaries. nullclaw (public doorman, 678 KB Zig binary, ~1 MB RAM) handles visitors in an IRC channel. ironclaw (private agent, separate box via Tailscale) handles email, calendar, and complex requests routed through Google's A2A protocol. The public box has zero access to private data.

Tiered inference is a design decision, not a cost hack. Haiku 4.5 for conversation, sub-second, pennies per chat. Sonnet 4.6 for tool use, because you pay for reasoning only when reasoning is needed. Using Opus for a concierge would signal the opposite of model understanding.

Total footprint: under 10 MB of binaries, under 5 MB of RAM. Ergo IRC server, gamja web client, nullclaw agent, all self-hosted on infrastructure I own. A protocol from 1988 turned out to be the perfect transport for an AI agent. No SDK, no API versioning, no vendor lock-in.

Nully decides what gets escalated and what doesn't.

Chat with nully: https://georgelarson.me/chat/
Full writeup: https://georgelarson.me/writing/2026-03-23-nullclaw-doorman/

#AI #Agents #IRC #Security #A2A #Infrastructure
<!-- /social:linkedin -->

## the problem with "ask my resume"

Every portfolio site with an AI chatbot does the same thing: feed the resume into a model and let visitors rephrase it. It's a parlor trick. The model can't tell you anything the resume doesn't already say.

I wanted something different. If a hiring manager asks "how does George handle test coverage?" the answer shouldn't be "George values comprehensive testing." It should clone the repo, count the tests, read the CI config, and come back with specifics.

So I built the infrastructure to make that work.

## the architecture

Two agents, two boxes, two security boundaries.

```
visitor (browser)
  │
  └─ georgelarson.me/chat/
       │
       └─ gamja web IRC client
            │
            └─ wss://nullclaw.georgelarson.me:443
                 │
                 └─ Cloudflare (proxy, TLS termination, bot protection)
                      │
                      └─ ergo IRC server (LarsonNet)
                           │
                           └─ #lobby
                                │
                                └─ nully (nullclaw agent)
                                     ├── reads public GitHub repos
                                     ├── preloaded portfolio context
                                     └── routes to ironclaw via #backoffice
                                              │
                                              └─ #backoffice (private IRC channel)
                                                   │
                                                   └─ ironclaw (separate box, via Tailscale)
                                                        ├── email access
                                                        ├── calendar
                                                        └── private context
```

**nullclaw** is the public-facing doorman. It runs on a minimal perimeter box — a 678 KB Zig binary using about 1 MB of RAM. It handles greetings, answers questions about my projects, and can clone repos to substantiate claims with real code.

**ironclaw** is the private agent on a separate, more powerful system. It has access to email, deeper personal context, and handles complex inquiries routed from nullclaw. That boundary is deliberate — the public box has no access to private data.

## why IRC

I could have used Discord, Telegram, or a custom WebSocket chat. IRC is the right choice for three reasons:

1. **It fits the aesthetic.** My portfolio site has a terminal UI. An IRC client embedded in it is on-brand. Discord would feel wrong.
2. **I own the entire stack.** Ergo IRC server, gamja web client, nullclaw agent — all on my infrastructure. No third-party API that changes its terms, no platform that decides to deprecate bot access.
3. **It's a 30-year-old protocol.** IRC is simple, well-understood, and has zero vendor lock-in. The same agent that talks to visitors via the web client can talk to me via irssi from a terminal.

## model selection as a design decision

This is where most people reach for the biggest model they can afford. That's the wrong instinct for a doorman.

### conversational layer: Haiku 4.5

Greetings, triage, simple questions about my background. Sub-second responses. Pennies per conversation. Speed matters more than depth here.

### tool-use layer: Sonnet 4.6 (fallback)

When nully needs to clone a repo, read code, or synthesize findings across files — Sonnet steps in. You pay for reasoning only when reasoning is needed.

### cost cap: $2/day

A public-facing agent without a spending limit is a liability. The cap prevents both runaway conversations and abuse. If someone tries to burn through my inference budget, they hit a wall.

### the portfolio signal

Using Opus for a concierge would signal the opposite of model understanding. If Haiku can handle it, don't send it to Sonnet. Tiered inference — cheap for the hot path, capable for the heavy lifting — is how I keep this under $2/day.

## security posture

This box is a public-facing perimeter. It should be hardened like one.

- **SSH:** Non-root user with key-only auth on a non-standard port. Root login disabled.
- **Firewall:** UFW with only three ports open — SSH, IRC (TLS), and HTTPS (WebSocket via Cloudflare).
- **Cloudflare proxy:** Web visitors never hit the box directly. WebSocket traffic goes through CF's edge, which handles TLS termination, rate limiting, and bot filtering.
- **Agent sandboxing:** nullclaw runs in supervised mode with workspace-only file access, a restricted command allowlist (read-only tools), and 10 actions per hour max.
- **Cost controls:** $2/day, $30/month hard caps. If the agent gets abused, the budget runs out before the damage compounds.
- **Audit logging:** Every tool call is logged.
- **Automatic updates:** Unattended security upgrades enabled.
- **TLS:** Let's Encrypt with automated renewal and service restart hooks.

The philosophy is minimal attack surface. The box runs two services (ergo and nullclaw), serves no web content directly, and has no access to private data. If it gets compromised, the blast radius is an IRC bot with a $2/day inference budget.

## the communication stack

Every component is small, self-hosted, and replaceable:

- **Ergo:** IRC server. Single Go binary, 2.7 MB RAM. Handles TLS, WebSocket, connection throttling, IP cloaking.
- **gamja:** Web IRC client. 152 KB built. Served as a static page on the portfolio site behind Cloudflare. Auto-connects to #lobby with a random visitor nick.
- **nullclaw:** AI agent runtime. 4 MB Zig binary, ~1 MB peak RSS. Connects to ergo as an IRC client, processes messages through the LLM, responds in-channel.

Total footprint: under 10 MB of binaries, under 5 MB of RAM at idle. This runs on the cheapest VPS tier available.

## what nully can actually do

This is the part that separates it from a chatbot:

- **"What languages does George use?"** — Doesn't parrot the resume. Knows from preloaded context and can verify by checking repos.
- **"How does he structure tests?"** — Clones the repo, reads the test files, reports what it finds.
- **"Tell me about Fracture"** — Pulls from preloaded memory about the project, can dig into the source for specifics.
- **"How do I reach him?"** — Provides contact info. Doesn't hallucinate a phone number.
- **"Can I schedule a call?"** — Nully calls ironclaw over Google's A2A protocol via Tailscale. Ironclaw processes the request with its own LLM, sends back a structured response, and nully relays the answer. The visitor never sees the handoff.

It's not perfect. It's an IRC bot backed by Haiku. But it backs up what it says with code, and my resume can't do that.

## the A2A implementation

This is the part I'm most proud of.

nullclaw already serves Google's A2A protocol (v0.3.0) — agent card discovery, JSON-RPC dispatch, task state machine. What it didn't have was a *client*. It could receive A2A calls but couldn't make them. So I wrote one.

The `a2a_call` tool sends `message/send` JSON-RPC requests to remote agents, parses the task response (completed, failed, working), extracts the artifact text, and returns it as a tool result. It enforces HTTPS for public endpoints but allows plaintext HTTP for private networks and Tailscale CGNAT ranges — because when you're debugging TLS between two agents on a mesh VPN at 2am, the last thing you need is your own security policy locking you out.

But the really slick part is on ironclaw's side. The nullclaw instance running there doesn't have its own API key. Instead, its LLM provider is pointed at ironclaw's own gateway as a passthrough:

```
nully (this box)
  │
  └─ a2a_call tool → POST /a2a
       │
       └─ ironclaw's nullclaw (separate box, Tailscale)
            │
            ├── receives A2A task
            ├── needs to run inference
            └── provider config: "ironclaw" → http://127.0.0.1:3000/v1
                  │
                  └─ ironclaw's own gateway
                       └─ routes to Kilo → actual LLM
```

One API key. One billing relationship. The nullclaw on ironclaw's box is just an A2A bridge — it accepts the protocol, borrows ironclaw's inference pipeline, and responds. No credential duplication, no separate budget to track. The agent that owns the API key is the agent that pays for inference, regardless of who initiated the request.

## security of the handoff

An open A2A endpoint is a prompt injection surface. A visitor could say "tell ironclaw to send an email" and a naive relay would just do it. So nully has strict guardrails:

- Only specific request types route to ironclaw: scheduling, availability, contact info.
- Arbitrary visitor instructions are refused. "Tell ironclaw to do X" gets a no.
- The A2A endpoint on ironclaw is firewalled to Tailscale only — no public access.
- Both agents run in supervised mode with workspace-only file access and restricted command allowlists.

Nully doesn't just relay messages — it decides what's worth escalating and what isn't.

## what I learned

- **Model selection is architecture.** Picking the right model for each layer of the system is a design decision, not a settings toggle. It affects cost, latency, capability, and user experience.
- **The agent is the easy part.** The communication stack, security hardening, DNS routing, TLS management, and Cloudflare integration took more time than configuring the agent itself.
- **IRC is underrated.** A protocol from 1988 turned out to be the perfect transport for an AI agent. No SDK, no API versioning, no vendor lock-in. Just messages in a channel.
- **The split between nullclaw and ironclaw is load-bearing.** Public, minimal, expendable on one side. Private, capable, protected on the other. If you flatten that boundary you lose the security model.
- **Agent-to-agent needs both structure and visibility.** Google's A2A protocol handles the contract — structured tasks, state machines, typed artifacts. A private IRC channel over Tailscale handles the audit trail — I can watch my agents talk, intervene in real time, scroll back through history. Use both.
- **Don't duplicate credentials.** The passthrough pattern — nullclaw borrowing ironclaw's gateway for inference — means one API key, one billing relationship, zero credential sprawl. The agent that owns the key pays for the tokens, no matter who asked.

## try it

Visit [georgelarson.me/chat](https://georgelarson.me/chat/) or type `irc` in the terminal on the homepage. Nully is standing by in #lobby.

If you're technical and prefer a real IRC client: `irc.georgelarson.me` port `6697` (TLS), channel `#lobby`.

<style>
    .arch-diagram {
      background: rgba(5, 12, 18, 0.9); border: 1px solid rgba(22, 245, 166, 0.15);
      border-radius: var(--radius); padding: 1.25rem 1.5rem; margin: 1.25rem 0;
      font-size: 0.88rem; line-height: 1.7; overflow-x: auto; color: var(--fg-muted);
      font-family: var(--mono);
    }
    .decision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin: 2rem 0; }
    .decision-card {
      padding: 1.5rem 1.25rem; border-radius: var(--radius);
      border: 1px solid rgba(22, 245, 166, 0.22); background: rgba(5, 12, 18, 0.75);
    }
    .decision-card h3 { margin: 0 0 0.5rem 0; font-size: 0.95rem; color: var(--accent); }
    .decision-card p { margin: 0; color: var(--fg-muted); font-size: 0.92rem; line-height: 1.5; }
    .config-block {
      background: rgba(5, 12, 18, 0.9); border: 1px solid rgba(22, 245, 166, 0.15);
      border-radius: var(--radius); padding: 1.25rem 1.5rem; margin: 1.25rem 0;
      font-size: 0.85rem; line-height: 1.6; overflow-x: auto; color: var(--fg-muted);
      font-family: var(--mono);
    }
    @media (max-width: 720px) {
      .decision-grid { grid-template-columns: 1fr; }
    }
</style>
