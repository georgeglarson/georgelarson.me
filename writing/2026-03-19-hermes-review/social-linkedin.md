I spent $10 and a month testing NousResearch's Hermes Agent, the one with the ASCII art landing page promising "an agent that grows with you."

Here's what I found under the hood:

The model (Hermes-4-405B) is a Llama 3.1 fine-tune. Not a secret (it's on the HuggingFace card) but the branding doesn't exactly advertise it.

The "grows with you" feature is markdown files saved to disk. The "skills" system is structured prompt injection. The web tools wrap Firecrawl and Tavily.

What IS genuinely impressive: the multi-platform gateway. 12 messaging integrations: Discord, Telegram, Slack, Signal, WhatsApp, Home Assistant, and more. The Discord adapter alone is 2,085 lines. This is real, substantial engineering. I haven't found an equivalent elsewhere.

My take: if you need an AI agent on messaging platforms, Hermes is the most complete option available. If you're a software engineer working in a terminal, the coding tools are wrappers around things you already use.

Full writeup with the technical breakdown: https://georgelarson.me/writing/2026-03-19-hermes-review/

#AI #OpenSource #DevTools #LLM
