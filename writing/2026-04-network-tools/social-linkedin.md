
25 years of network debugging. The tooling still has gaps. So I built what I wanted.

netgrep. Modern packet analyzer in Rust. TCP stream reassembly, TLS 1.2/1.3 decryption, HTTP/2 and DNS parsing, interactive TUI. The tool I always wanted when I was SSHed into a production box trying to figure out why traffic wasn't flowing.

termshark. Forked the terminal Wireshark UI. Refactored the architecture, expanded test coverage, ran a security audit, added an experimental browser-based interface. Go.

wiregraph. This is the one I'm most excited about. Real-time network traffic visualization. Top talkers, connection matrix, protocol breakdown, activity timeline. Color-coded by protocol. Load a pcap or point it at a live interface and watch traffic patterns emerge. One Rust binary with an embedded web dashboard.

wiregraph's backend reuses netgrep's packet parsing modules. One binary, no dependencies beyond libpcap. Everything connects.

Three tools. Two languages. One problem domain. Each one built because the previous one wasn't enough.

All open source.

https://georgelarson.me/network-tools.html
https://georgelarson.me/writing/2026-04-network-tools/
