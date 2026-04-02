
Can free AI models actually build software? I tested 15 of them to find out.

Setup: a $25/year RackNerd VPS (2.5GB RAM, 3 cores). One challenge: build a URL shortener from scratch with Express, SQLite, and 5 integration tests. Same prompt, same environment, 15 models.

8 passed. The spread was dramatic. Two models tied at 1m43s, one-shot, perfect code. Others limped across in 30 minutes after multiple retries. Seven models failed entirely, and most of those failures were infrastructure, not intelligence.

The fun part: I audited all the passing code and found tiers within "pass." One model passed by writing tests that validated its own broken API. Another left .backup, .backup2, .bak, and .orig files scattered around like a crime scene. The best model produced production-quality code with collision-resistant short codes and proper module separation.

$25 total. 15 models. Real results. Provider reliability matters as much as model benchmarks.

https://georgelarson.me/writing/2026-04-03-25-dollar-ai-lab/

#AI #LLM #Benchmarking #SoftwareEngineering
