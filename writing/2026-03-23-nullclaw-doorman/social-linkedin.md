Every portfolio site with an AI chatbot does the same thing: feed the resume into a model and let visitors rephrase it. I wanted mine to clone repos and show its work.

So I built nullclaw — a public-facing AI agent running on a $7/month VPS, connected to my own IRC server, answering questions about my projects by reading actual code. Ask it how I handle test coverage, and it clones the repo, counts the tests, reads the CI config, and comes back with specifics.

The architecture: two agents, two security boundaries. nullclaw (public doorman, 678 KB Zig binary, ~1 MB RAM) handles visitors in an IRC channel. ironclaw (private agent, separate box via Tailscale) handles email, calendar, and complex requests routed through Google's A2A protocol. The public box has zero access to private data.

Tiered inference is a design decision, not a cost hack. Haiku 4.5 for conversation — sub-second, pennies per chat. Sonnet 4.6 for tool use — you pay for reasoning only when reasoning is needed. Using Opus for a concierge would signal the opposite of model understanding.

Total footprint: under 10 MB of binaries, under 5 MB of RAM. Ergo IRC server, gamja web client, nullclaw agent — all self-hosted on infrastructure I own. A protocol from 1988 turned out to be the perfect transport for an AI agent. No SDK, no API versioning, no vendor lock-in.

Nully doesn't just relay messages — it decides what's worth escalating and what isn't.

Chat with nully: https://georgelarson.me/chat/
Full writeup: https://georgelarson.me/writing/2026-03-23-nullclaw-doorman/

#AI #Agents #IRC #Security #A2A #Infrastructure
