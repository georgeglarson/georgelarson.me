"""
Generate a clean PDF resume from resume.txt using WeasyPrint.

Usage:
    python scripts/generate_pdf.py
    python scripts/generate_pdf.py --output custom-name.pdf

Reads resume.txt from the repo root, parses it into semantic HTML,
applies a print-optimized stylesheet, and writes the PDF.
"""

from __future__ import annotations

import argparse
import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESUME_PATH = ROOT / "resume.txt"
DEFAULT_OUTPUT = ROOT / "george-larson-resume.pdf"

STYLESHEET = """
@page {
    size: letter;
    margin: 0.6in 0.7in;
}
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.4;
    color: #1a1a1a;
}
h1 {
    font-size: 18pt;
    margin: 0 0 2pt 0;
    letter-spacing: 0.04em;
}
.contact {
    font-size: 9pt;
    color: #444;
    margin: 0 0 10pt 0;
}
h2 {
    font-size: 11pt;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    border-bottom: 1.5pt solid #1a1a1a;
    padding-bottom: 2pt;
    margin: 14pt 0 6pt 0;
}
h3 {
    font-size: 10pt;
    margin: 8pt 0 2pt 0;
}
p {
    margin: 0 0 4pt 0;
}
ul {
    margin: 2pt 0 6pt 0;
    padding-left: 16pt;
}
li {
    margin: 0 0 2pt 0;
}
.summary {
    margin: 0 0 6pt 0;
}
.skills-line {
    margin: 0 0 2pt 0;
}
.skills-label {
    font-weight: 600;
}
.job-header {
    margin: 8pt 0 2pt 0;
    font-weight: 600;
}
"""


def parse_resume(text: str) -> str:
    """Convert resume.txt into semantic HTML."""
    lines = text.strip().split("\n")
    parts: list[str] = []
    i = 0

    # Line 1: Name
    if i < len(lines):
        parts.append(f"<h1>{html.escape(lines[i])}</h1>")
        i += 1

    # Contact lines until blank
    contact_lines: list[str] = []
    while i < len(lines) and lines[i].strip():
        contact_lines.append(html.escape(lines[i].strip()))
        i += 1
    if contact_lines:
        parts.append(f'<p class="contact">{" &middot; ".join(contact_lines)}</p>')

    # Skip blank lines
    while i < len(lines) and not lines[i].strip():
        i += 1

    # Process remaining content
    in_list = False
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Blank line
        if not stripped:
            if in_list:
                parts.append("</ul>")
                in_list = False
            i += 1
            continue

        # Section header: ALL CAPS line, no leading dash, length > 3
        if (
            stripped == stripped.upper()
            and len(stripped) > 3
            and not stripped.startswith("-")
            and re.search(r"[A-Z]", stripped)
            and not stripped.startswith("(")
        ):
            if in_list:
                parts.append("</ul>")
                in_list = False

            # Check if this is a subsection header (next line is a dash or
            # the line contains a comma-separated skills list)
            if stripped == "SUMMARY":
                i += 1
                # Collect the summary paragraph
                summary_lines: list[str] = []
                while i < len(lines) and lines[i].strip():
                    summary_lines.append(lines[i].strip())
                    i += 1
                parts.append(
                    f'<p class="summary">{html.escape(" ".join(summary_lines))}</p>'
                )
                continue

            parts.append(f"<h2>{html.escape(stripped)}</h2>")
            i += 1
            continue

        # Job/project header: line with a comma and date pattern
        if re.search(
            r"\(\d{4}s?\s+to\s+(Present|\d{4})\)", stripped
        ) and not stripped.startswith("-"):
            if in_list:
                parts.append("</ul>")
                in_list = False
            parts.append(f'<p class="job-header">{html.escape(stripped)}</p>')
            i += 1
            continue

        # Sub-section header within core strengths (mixed case, no dash, no date)
        if (
            not stripped.startswith("-")
            and stripped != stripped.upper()
            and not re.search(r"\(\d{4}", stripped)
            and i + 1 < len(lines)
            and lines[i + 1].strip().startswith("-")
        ):
            if in_list:
                parts.append("</ul>")
                in_list = False
            parts.append(f"<h3>{html.escape(stripped)}</h3>")
            i += 1
            continue

        # Bullet point
        if stripped.startswith("- "):
            if not in_list:
                parts.append("<ul>")
                in_list = True
            parts.append(f"<li>{html.escape(stripped[2:])}</li>")
            i += 1
            continue

        # Skills line (Label: value)
        if ":" in stripped and i > 5:
            label, _, value = stripped.partition(":")
            if label.replace(" ", "").replace("&", "").isalpha() and len(label) < 30:
                if in_list:
                    parts.append("</ul>")
                    in_list = False
                parts.append(
                    f'<p class="skills-line"><span class="skills-label">'
                    f"{html.escape(label)}:</span> {html.escape(value.strip())}</p>"
                )
                i += 1
                continue

        # Generic paragraph
        if in_list:
            parts.append("</ul>")
            in_list = False
        parts.append(f"<p>{html.escape(stripped)}</p>")
        i += 1

    if in_list:
        parts.append("</ul>")

    return "\n".join(parts)


def generate_pdf(output_path: Path) -> None:
    try:
        from weasyprint import CSS, HTML
    except ImportError:
        raise SystemExit(
            "weasyprint is not installed. Install it with: pip install weasyprint"
        )

    if not RESUME_PATH.exists():
        raise FileNotFoundError(f"Missing resume source: {RESUME_PATH}")

    text = RESUME_PATH.read_text(encoding="utf-8")
    body_html = parse_resume(text)

    full_html = f"""<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>George Larson - Resume</title></head>
<body>
{body_html}
</body>
</html>"""

    doc = HTML(string=full_html)
    doc.write_pdf(str(output_path), stylesheets=[CSS(string=STYLESHEET)])
    print(f"Wrote {output_path} ({output_path.stat().st_size:,} bytes)")


def main():
    parser = argparse.ArgumentParser(description="Generate PDF resume from resume.txt")
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help=f"Output PDF path (default: {DEFAULT_OUTPUT.name})",
    )
    args = parser.parse_args()
    generate_pdf(args.output)


if __name__ == "__main__":
    main()
