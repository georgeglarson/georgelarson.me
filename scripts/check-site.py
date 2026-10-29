#!/usr/bin/env python3
"""check-site: crawl the published site before sending the portfolio to anyone.

Follows every internal link from the home page, reports any page that is
not a 200, HEADs every external link and reports the ones that fail, and
lists every contact-shaped href (mailto:, cal.com, tel:) so a wrong contact
path is seen before a reader sees it. Read-only; no dependencies.

    scripts/check-site.py                     # https://georgelarson.me/
    scripts/check-site.py http://localhost:8000/

A 403 or 405 on an external HEAD is usually a bot wall, not a dead link;
the report says which status it got so the reader can decide.
"""
import collections
import html
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (check-site; georgelarson.me)"}


def fetch(url, method="GET"):
    req = urllib.request.Request(url, method=method, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            body = r.read().decode("utf-8", "replace") if method == "GET" else ""
            return r.status, body, r.headers.get("content-type", "")
    except urllib.error.HTTPError as e:
        return e.code, "", ""
    except Exception as e:  # noqa: BLE001
        return -1, str(e), ""


def main(base):
    if not base.endswith("/"):
        base += "/"
    seen, queue, bad, external = set(), [base], [], set()
    contact = collections.Counter()
    while queue:
        url = queue.pop(0)
        if url in seen:
            continue
        seen.add(url)
        status, body, ctype = fetch(url)
        if status == 404 and "." not in url.rsplit("/", 1)[-1] and url != base:
            # Cloudflare Pages serves /resume as resume.html; a plain local
            # file server does not, so retry the way Pages would resolve it.
            status, body, ctype = fetch(url + ".html")
        if status != 200:
            bad.append((status, url))
            continue
        if "html" not in ctype:
            continue
        for href in re.findall(r'href="([^"]+)"', body):
            href = html.unescape(href).split("#")[0]
            if href.startswith(("mailto:", "tel:")) or "cal.com" in href or "email-protection" in href:
                contact[href] += 1
            full = urllib.parse.urljoin(url, href)
            if full.startswith(base):
                queue.append(full.split("?")[0])
            elif full.startswith("http"):
                external.add(full)
    print(f"{len(seen)} internal pages, {len(bad)} not 200")
    for status, url in bad:
        print(f"  {status}  {url}")
    ext_bad = []
    for url in sorted(external):
        status, _, _ = fetch(url, "HEAD")
        if status not in (200, 301, 302, 303, 307, 308):
            ext_bad.append((status, url))
    print(f"{len(external)} external links, {len(ext_bad)} not OK")
    for status, url in ext_bad:
        print(f"  {status}  {url}")
    print("contact hrefs:")
    for href, n in contact.most_common():
        print(f"  {n:3}  {href}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "https://georgelarson.me/"))
