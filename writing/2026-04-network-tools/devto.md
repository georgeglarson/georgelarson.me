---
title: "Network Tools Trilogy"
published: false
description: "Three tools for understanding network traffic, built in Rust and Go. netgrep, termshark, and wiregraph."
tags: rust, go, networking, security, open-source
canonical_url: https://georgelarson.me/writing/2026-04-network-tools/
cover_image: 
---

## Three tools for understanding network traffic

### netgrep

Modern packet analyzer in Rust. TCP stream reassembly, TLS 1.2/1.3 decryption, HTTP/2 and DNS parsing, interactive TUI.

The tool I always wanted when I was SSHed into a production box trying to figure out why traffic wasn't flowing.

### termshark

Forked the terminal Wireshark UI. Refactored the architecture, expanded test coverage, ran a security audit, added an experimental browser-based interface. Go.

### wiregraph

Real-time network traffic visualization. Top talkers, connection matrix, protocol breakdown, activity timeline. Color-coded by protocol. Load a pcap or point it at a live interface and watch traffic patterns emerge.

One Rust binary with an embedded web dashboard.

wiregraph's backend reuses netgrep's packet parsing modules. One binary, no dependencies beyond libpcap. Everything connects.

### One problem domain

Three tools. Two languages. Each one built because the previous one wasn't enough. All open source.

netgrep: https://github.com/georgeglarson/netgrep
termshark: https://github.com/georgeglarson/termshark
wiregraph: https://github.com/georgeglarson/wiregraph

Full case study: https://georgelarson.me/network-tools.html

---

*George Larson, 25 years in software engineering, infrastructure, manufacturing systems, and cybersecurity. Currently looking for Director/VP or senior engineering roles. More at [georgelarson.me](https://georgelarson.me).*
