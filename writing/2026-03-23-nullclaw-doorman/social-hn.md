Show HN: I put an AI agent on a $7/month VPS with IRC as its transport layer

https://georgelarson.me/writing/2026-03-23-nullclaw-doorman/

---

First comment:

Most portfolio AI chatbots just rephrase the resume. I wanted mine to back up claims with code — ask it about test coverage and it clones the repo, reads the files, and reports what it finds.

The stack: two agents on separate boxes. The public one (nullclaw) is a 678 KB Zig binary using ~1 MB RAM, connected to an Ergo IRC server. Visitors talk to it via a gamja web client embedded in my site. The private one (ironclaw) handles email and scheduling, reachable only over Tailscale via Google's A2A protocol.

Tiered inference: Haiku 4.5 for conversation (sub-second, cheap), Sonnet 4.6 for tool use (only when needed). Hard cap at $2/day.

The part I'm most proud of is the A2A passthrough — the private-side agent borrows the gateway's own inference pipeline, so there's one API key and one billing relationship regardless of who initiated the request.

You can talk to nully at https://georgelarson.me/chat/ or connect with any IRC client to irc.georgelarson.me:6697 (TLS), channel #lobby.

Happy to answer questions about the architecture, security model, or the A2A implementation.
