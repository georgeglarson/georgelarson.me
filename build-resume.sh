#!/usr/bin/env bash
# Build a resume PDF from a plain-text resume (.txt).
# The .txt is the canonical source (tailoring agents read it); this renders it.
# Deterministic txt->markdown: first ALL-CAPS line -> H1 (name); other ALL-CAPS
# header lines -> H2 (sections); "- " lines -> bullet lists (blank line inserted
# before a list so CommonMark parses it). Everything else stays a paragraph.
#
# usage: ./build-resume.sh active/resume-ic-ai-engineer.txt [out.pdf]
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
src="${1:?usage: ./build-resume.sh <resume.txt> [out.pdf]}"
out="${2:-${src%.txt}.pdf}"

md="$(mktemp --suffix=.md)"
html="$(mktemp --suffix=.html)"
css="$(mktemp --suffix=.css)"
trap 'rm -f "$md" "$html" "$css"' EXIT

awk '
  NR==1 && /^[A-Z][A-Z &\/-]+$/ { print "# " $0; prev=$0; next }
  /^[A-Z][A-Z &\/-]+$/          { print ""; print "## " $0; prev=$0; next }
  /^- / && prev !~ /^- / && prev != "" { print ""; print $0; prev=$0; next }
  { print; prev=$0 }
' "$src" > "$md"

cat > "$css" <<'CSS'
body { font-family: "Helvetica Neue", Arial, sans-serif; font-size: 10pt; line-height: 1.26; color: #1a1a1a; }
h1 { font-size: 19pt; margin: 0 0 1px 0; letter-spacing: 0.5px; }
h2 { font-size: 10pt; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #999; padding-bottom: 2px; margin: 11px 0 4px 0; }
ul { margin: 2px 0; padding-left: 16px; }
li { margin: 0.5px 0; }
p { margin: 1.5px 0; }
CSS

pandoc "$md" --from markdown --to html5 --standalone --metadata title="" --css "$css" -o "$html"
wkhtmltopdf --quiet --enable-local-file-access \
  --margin-top 11mm --margin-bottom 11mm --margin-left 14mm --margin-right 14mm \
  --page-size Letter "$html" "$out"
echo "built: $out"
