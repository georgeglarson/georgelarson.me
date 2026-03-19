In 2012, Mozilla released BrowserQuest, an HTML5 multiplayer demo. No types, no tests, no persistence. One massive Player class handling everything from combat to chat. It proved browsers could handle games, then was abandoned.

I turned it into a production MMO.

Fracture has 3,161 tests across 65 files. TypeScript strict mode. SRP decomposition that dropped the Player class from 1,742 to 726 lines. Event-driven architecture where combat doesn't know about achievements and the narrator doesn't know about inventory. OpenTelemetry distributed tracing on every message handler, database call, and AI request. Self-hosted SigNoz with public Grafana dashboards.

AI is both the development partner and the product feature: NPCs generate contextual dialogue via Venice AI, mobs display thought bubbles, and a narrator system describes events with zone-specific vocabulary. Circuit breaker pattern ensures the game runs even if the AI provider goes down.

Same methodology I've applied to manufacturing systems and enterprise platforms for 25 years: type safety first, test before you refactor, decompose by responsibility, add observability, ship continuously.

AI didn't make the architectural decisions. 25 years of legacy modernization did. AI let one engineer execute at a pace that would've required a team.

Play it: https://fracture.georgelarson.me
Full writeup: https://georgelarson.me/writing/2026-03-25-fracture-legacy-modernization/

#LegacyModernization #AI #GameDev #TypeScript #OpenTelemetry
