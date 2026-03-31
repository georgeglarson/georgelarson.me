---
title: "Network Tools Trilogy"
slug: 2026-04-network-tools
date: 2026-04-01
description: "Three tools for understanding network traffic, built in Rust and Go. netgrep, termshark, and wiregraph."
tags: rust, go, networking, security, open-source
og_title: "Network Tools Trilogy"
og_description: "netgrep, termshark, wiregraph. Three tools for understanding network traffic."
cover_image:
lead: "25 years of network debugging. The tooling still has gaps. So I built what I wanted."
---

<!-- social:mastodon -->

Built three network analysis tools over the past year. All FOSS.

netgrep. Rust packet analyzer. TLS decryption, stream reassembly, interactive TUI.
termshark. Go. Forked the terminal Wireshark UI, refactored, added a web interface.
wiregraph. Real-time network traffic visualizer. Rust backend reuses netgrep's parser. Embedded web dashboard with connection matrix, protocol breakdown, activity timeline. One binary.

Three tools. Each one built because the previous one wasn't enough.

https://georgelarson.me/network-tools.html

<!-- /social:mastodon -->

<!-- social:linkedin -->

25 years of network debugging. The tooling still has gaps. So I built what I wanted.

netgrep. Modern packet analyzer in Rust. TCP stream reassembly, TLS 1.2/1.3 decryption, HTTP/2 and DNS parsing, interactive TUI. The tool I always wanted when I was SSHed into a production box trying to figure out why traffic wasn't flowing.

termshark. Forked the terminal Wireshark UI. Refactored the architecture, expanded test coverage, ran a security audit, added an experimental browser-based interface. Go.

wiregraph. This is the one I'm most excited about. Real-time network traffic visualization. Top talkers, connection matrix, protocol breakdown, activity timeline. Color-coded by protocol. Load a pcap or point it at a live interface and watch traffic patterns emerge. One Rust binary with an embedded web dashboard.

wiregraph's backend reuses netgrep's packet parsing modules. One binary, no dependencies beyond libpcap. Everything connects.

Three tools. Two languages. One problem domain. Each one built because the previous one wasn't enough.

All open source.

https://georgelarson.me/network-tools.html

<!-- /social:linkedin -->

<!-- social:hn -->

Network Tools Trilogy — three open-source tools for understanding network traffic (Rust + Go)

Show HN: https://georgelarson.me/network-tools.html

<!-- /social:hn -->

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
