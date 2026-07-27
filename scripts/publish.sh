#!/usr/bin/env bash
set -euo pipefail

# publish.sh - Generate publishing variants from story.md
# Usage: ./scripts/publish.sh <story-directory>

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <story-directory>"
  echo "  e.g. $0 writing/2026-03-28-my-story/"
  exit 1
fi

STORY_DIR="${1%/}"
STORY_FILE="$STORY_DIR/story.md"

if [[ ! -f "$STORY_FILE" ]]; then
  echo "Error: $STORY_FILE not found"
  exit 1
fi

# ---------------------------------------------------------------------------
# Parse frontmatter
# ---------------------------------------------------------------------------
in_frontmatter=0
frontmatter_count=0
FRONTMATTER=""
BODY=""

while IFS= read -r line || [[ -n "$line" ]]; do
  if [[ "$line" == "---" ]]; then
    frontmatter_count=$((frontmatter_count + 1))
    if [[ $frontmatter_count -eq 1 ]]; then
      in_frontmatter=1
      continue
    elif [[ $frontmatter_count -eq 2 ]]; then
      in_frontmatter=0
      continue
    fi
  fi
  if [[ $in_frontmatter -eq 1 ]]; then
    FRONTMATTER+="$line"$'\n'
  elif [[ $frontmatter_count -ge 2 ]]; then
    BODY+="$line"$'\n'
  fi
done < "$STORY_FILE"

get_fm() {
  local key="$1"
  local val
  val=$(echo "$FRONTMATTER" | grep "^${key}:" | head -1 | sed "s/^${key}:[[:space:]]*//" | sed 's/^"\(.*\)"$/\1/')
  echo "$val"
}

FM_TITLE=$(get_fm title)
FM_SLUG=$(get_fm slug)
FM_DATE=$(get_fm date)
FM_DESCRIPTION=$(get_fm description)
FM_TAGS=$(get_fm tags)
FM_OG_TITLE=$(get_fm og_title)
FM_OG_DESCRIPTION=$(get_fm og_description)
FM_COVER_IMAGE=$(get_fm cover_image)
FM_LEAD=$(get_fm lead)

[[ -z "$FM_OG_TITLE" ]] && FM_OG_TITLE="$FM_TITLE"
[[ -z "$FM_OG_DESCRIPTION" ]] && FM_OG_DESCRIPTION="$FM_DESCRIPTION"

CANONICAL="https://georgelarson.me/writing/${FM_SLUG}/"

# ---------------------------------------------------------------------------
# Extract social blocks from body
# ---------------------------------------------------------------------------
extract_social() {
  local tag="$1"
  local content=""
  local in_block=0
  while IFS= read -r line; do
    if echo "$line" | grep -qE "^[[:space:]]*<!-- social:${tag} -->[[:space:]]*$"; then
      in_block=1
      continue
    fi
    if echo "$line" | grep -qE "^[[:space:]]*<!-- /social:${tag} -->[[:space:]]*$"; then
      in_block=0
      continue
    fi
    if [[ $in_block -eq 1 ]]; then
      content+="$line"$'\n'
    fi
  done <<< "$BODY"
  # Trim trailing whitespace/newlines
  echo -n "$content" | sed -e 's/[[:space:]]*$//'
}

SOCIAL_MASTODON=$(extract_social "mastodon")
SOCIAL_LINKEDIN=$(extract_social "linkedin")
SOCIAL_HN=$(extract_social "hn")

# ---------------------------------------------------------------------------
# Strip social blocks and comments from body for article content
# ---------------------------------------------------------------------------
strip_social_and_comments() {
  local result=""
  local skip=0
  while IFS= read -r line; do
    if echo "$line" | grep -q '<!-- social:'; then
      skip=1
      continue
    fi
    if echo "$line" | grep -q '<!-- /social:'; then
      skip=0
      continue
    fi
    if [[ $skip -eq 1 ]]; then
      continue
    fi
    # Strip standalone HTML comments
    if echo "$line" | grep -qE '^[[:space:]]*<!--.*-->[[:space:]]*$'; then
      continue
    fi
    result+="$line"$'\n'
  done <<< "$BODY"
  echo "$result"
}

ARTICLE_BODY=$(strip_social_and_comments)

# ---------------------------------------------------------------------------
# Extract <style> blocks from body
# ---------------------------------------------------------------------------
extract_styles() {
  local styles=""
  local in_style=0
  local current_style=""
  while IFS= read -r line; do
    if echo "$line" | grep -q '<style'; then
      if [[ $in_style -eq 0 ]]; then
        in_style=1
        current_style="$line"$'\n'
        if echo "$line" | grep -q '</style>'; then
          styles+="$current_style"
          in_style=0
          current_style=""
        fi
        continue
      fi
    fi
    if [[ $in_style -eq 1 ]]; then
      current_style+="$line"$'\n'
      if echo "$line" | grep -q '</style>'; then
        styles+="$current_style"
        in_style=0
        current_style=""
      fi
    fi
  done <<< "$ARTICLE_BODY"
  echo -n "$styles"
}

STYLE_BLOCK=$(extract_styles)

# Strip <style> blocks from article body for HTML generation
strip_styles() {
  local result=""
  local in_style=0
  while IFS= read -r line; do
    if echo "$line" | grep -q '<style'; then
      in_style=1
      if echo "$line" | grep -q '</style>'; then
        in_style=0
      fi
      continue
    fi
    if [[ $in_style -eq 1 ]]; then
      if echo "$line" | grep -q '</style>'; then
        in_style=0
      fi
      continue
    fi
    result+="$line"$'\n'
  done <<< "$ARTICLE_BODY"
  echo "$result"
}

ARTICLE_BODY_NO_STYLE=$(strip_styles)

# ---------------------------------------------------------------------------
# HTML escape helper
# ---------------------------------------------------------------------------
html_escape() {
  printf '%s' "$1" | sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g' -e 's/"/\&quot;/g'
}

# ---------------------------------------------------------------------------
# Inline markdown formatting via sed
# ---------------------------------------------------------------------------
apply_inline_sed() {
  echo "$1" | sed -E \
    -e 's/!\[([^]]*)\]\(([^)]+)\)/<div class="screenshot"><img src="\2" alt="\1" loading="lazy" \/><\/div>/g' \
    -e 's/\[([^]]+)\]\((https?:[^)]+)\)/<a href="\2" target="_blank" rel="noopener">\1<\/a>/g' \
    -e 's/\[([^]]+)\]\(([^)]+)\)/<a href="\2">\1<\/a>/g' \
    -e 's/\*\*([^*]+)\*\*/<strong>\1<\/strong>/g' \
    -e 's/\*([^*]+)\*/<em>\1<\/em>/g' \
    -e 's/`([^`]+)`/<code>\1<\/code>/g'
}

# ---------------------------------------------------------------------------
# Markdown to HTML conversion
# ---------------------------------------------------------------------------
md_to_html() {
  local input="$1"
  local output=""
  local in_code_block=0
  local code_content=""
  local in_ul=0
  local in_ol=0
  local in_section=0
  local paragraph=""
  local table_buf=()

  flush_paragraph() {
    if [[ -n "$paragraph" ]]; then
      local p
      p=$(apply_inline_sed "$paragraph")
      # Check if this paragraph is entirely a screenshot div
      if echo "$p" | grep -q '^<div class="screenshot"'; then
        output+="    ${p}"$'\n'
      else
        output+="    <p>${p}</p>"$'\n'
      fi
      paragraph=""
    fi
  }

  close_list() {
    if [[ $in_ul -eq 1 ]]; then
      output+="    </ul>"$'\n'
      in_ul=0
    fi
    if [[ $in_ol -eq 1 ]]; then
      output+="    </ol>"$'\n'
      in_ol=0
    fi
  }

  # Split one "| a | b |" row into "<tag>a</tag><tag>b</tag>" (cells run through inline md)
  emit_table_cells() {
    local row="$1" tag="$2" out=""
    row="${row#"${row%%[![:space:]]*}"}"; row="${row%"${row##*[![:space:]]}"}"
    row="${row#|}"; row="${row%|}"
    local oldifs="$IFS"; IFS='|'; local -a parts=(); read -ra parts <<< "$row"; IFS="$oldifs"
    local cell
    for cell in "${parts[@]}"; do
      cell="${cell#"${cell%%[![:space:]]*}"}"; cell="${cell%"${cell##*[![:space:]]}"}"
      cell=$(apply_inline_sed "$cell")
      out+="<${tag}>${cell}</${tag}>"
    done
    printf '%s' "$out"
  }

  # Emit an accumulated GFM table; fall back to paragraph if it isn't a valid table
  flush_table() {
    local n=${#table_buf[@]}
    [[ $n -eq 0 ]] && return
    if [[ $n -ge 2 ]] \
       && echo "${table_buf[1]}" | grep -qE '^[[:space:]]*\|?[-:|[:space:]]+\|?[[:space:]]*$' \
       && echo "${table_buf[1]}" | grep -q -- '-'; then
      local cells i
      output+="    <table>"$'\n'
      cells=$(emit_table_cells "${table_buf[0]}" "th")
      output+="      <thead><tr>${cells}</tr></thead>"$'\n'
      output+="      <tbody>"$'\n'
      for ((i = 2; i < n; i++)); do
        cells=$(emit_table_cells "${table_buf[i]}" "td")
        output+="        <tr>${cells}</tr>"$'\n'
      done
      output+="      </tbody>"$'\n'
      output+="    </table>"$'\n'
    else
      local l
      for l in "${table_buf[@]}"; do
        if [[ -n "$paragraph" ]]; then paragraph+=" $l"; else paragraph="$l"; fi
      done
      flush_paragraph
    fi
    table_buf=()
  }

  # Trim leading blank lines
  input=$(echo "$input" | sed '/./,$!d')

  while IFS= read -r line; do
    # Code blocks
    if echo "$line" | grep -q '^```'; then
      if [[ $in_code_block -eq 0 ]]; then
        flush_table
        flush_paragraph
        close_list
        in_code_block=1
        code_content=""
        continue
      else
        local escaped
        escaped=$(html_escape "$code_content")
        escaped=$(echo -n "$escaped" | sed -e 's/[[:space:]]*$//')
        output+="    <div class=\"code-block\"><pre><code>${escaped}</code></pre></div>"$'\n'
        in_code_block=0
        continue
      fi
    fi

    if [[ $in_code_block -eq 1 ]]; then
      code_content+="$line"$'\n'
      continue
    fi

    # Table row: accumulate consecutive pipe-delimited lines
    if echo "$line" | grep -qE '^[[:space:]]*\|.*\|[[:space:]]*$'; then
      flush_paragraph
      close_list
      table_buf+=("$line")
      continue
    fi
    # A non-table line ends any table currently accumulating
    if [[ ${#table_buf[@]} -gt 0 ]]; then
      flush_table
    fi

    # Horizontal rule (markdown ---) -> section break
    if echo "$line" | grep -qE '^[[:space:]]*---[[:space:]]*$'; then
      flush_paragraph
      close_list
      if [[ $in_section -eq 1 ]]; then
        output+="    </section>"$'\n\n'
        in_section=0
      fi
      output+="    <hr />"$'\n\n'
      continue
    fi

    # Raw HTML blocks (lines starting with <, but not comments)
    if echo "$line" | grep -qE '^[[:space:]]*<' && ! echo "$line" | grep -q '^[[:space:]]*<!--'; then
      flush_paragraph
      close_list
      output+="    ${line}"$'\n'
      continue
    fi

    # Blank line
    if [[ -z "$line" ]] || echo "$line" | grep -qE '^[[:space:]]*$'; then
      flush_paragraph
      close_list
      continue
    fi

    # H3 (check before H2 since ### starts with ##)
    if echo "$line" | grep -qE '^###[[:space:]]+'; then
      flush_paragraph
      close_list
      local heading
      heading=$(echo "$line" | sed -E 's/^###[[:space:]]+(.*)/\1/')
      heading=$(apply_inline_sed "$heading")
      output+="    <h3>${heading}</h3>"$'\n'
      continue
    fi

    # H2
    if echo "$line" | grep -qE '^##[[:space:]]+'; then
      flush_paragraph
      close_list
      local heading
      heading=$(echo "$line" | sed -E 's/^##[[:space:]]+(.*)/\1/')
      if [[ $in_section -eq 1 ]]; then
        output+="    </section>"$'\n\n'
      fi
      output+="    <section>"$'\n'
      in_section=1
      heading=$(apply_inline_sed "$heading")
      output+="    <h2>${heading}</h2>"$'\n'
      continue
    fi

    # Unordered list item
    if echo "$line" | grep -qE '^[[:space:]]*[-*][[:space:]]+'; then
      flush_paragraph
      local item
      item=$(echo "$line" | sed -E 's/^[[:space:]]*[-*][[:space:]]+(.*)/\1/')
      item=$(apply_inline_sed "$item")
      if [[ $in_ol -eq 1 ]]; then
        output+="    </ol>"$'\n'
        in_ol=0
      fi
      if [[ $in_ul -eq 0 ]]; then
        output+="    <ul>"$'\n'
        in_ul=1
      fi
      output+="      <li>${item}</li>"$'\n'
      continue
    fi

    # Ordered list item
    if echo "$line" | grep -qE '^[[:space:]]*[0-9]+\.[[:space:]]+'; then
      flush_paragraph
      local item
      item=$(echo "$line" | sed -E 's/^[[:space:]]*[0-9]+\.[[:space:]]+(.*)/\1/')
      item=$(apply_inline_sed "$item")
      if [[ $in_ul -eq 1 ]]; then
        output+="    </ul>"$'\n'
        in_ul=0
      fi
      if [[ $in_ol -eq 0 ]]; then
        output+="    <ol>"$'\n'
        in_ol=1
      fi
      output+="      <li>${item}</li>"$'\n'
      continue
    fi

    # Regular text -> accumulate for paragraph
    close_list
    if [[ -n "$paragraph" ]]; then
      paragraph+=" $line"
    else
      paragraph="$line"
    fi

  done <<< "$input"

  flush_table
  flush_paragraph
  close_list

  if [[ $in_section -eq 1 ]]; then
    output+="    </section>"$'\n'
  fi

  echo "$output"
}

HTML_BODY=$(md_to_html "$ARTICLE_BODY_NO_STYLE")

# ---------------------------------------------------------------------------
# Generate index.html
# ---------------------------------------------------------------------------
STYLE_IN_HEAD=""
if [[ -n "$STYLE_BLOCK" ]]; then
  STYLE_IN_HEAD="  ${STYLE_BLOCK}"
fi

cat > "$STORY_DIR/index.html" << HTMLEOF
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${FM_TITLE} · George Larson</title>
<meta name="description" content="${FM_DESCRIPTION}" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${FM_OG_TITLE}" />
<meta property="og:description" content="${FM_OG_DESCRIPTION}" />
<meta property="og:url" content="${CANONICAL}" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="${FM_OG_TITLE}" />
<meta name="twitter:description" content="${FM_OG_DESCRIPTION}" />
<link rel="preload" href="/fonts/ibm-plex-serif-400.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/ibm-plex-mono-600.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="/css/site.css" />
${STYLE_IN_HEAD}</head>
<body>

<header class="shell site-head">
  <a class="wordmark" href="/">george larson</a>
  <nav class="site-nav" aria-label="primary">
    <a href="/who-is-george">who</a>
    <a href="/projects">projects</a>
    <a href="/writing">writing</a>
    <a href="mailto:george.g.larson@gmail.com">contact</a>
  </nav>
</header>

<main class="shell">
  <article class="measure">

    <p class="reveal"><a class="back" href="/writing"><span class="caret">←</span> writing</a></p>

    <p class="kicker reveal">Writing · ${FM_DATE}</p>
    <h1 class="title reveal">${FM_TITLE}</h1>
    <p class="dek reveal">${FM_LEAD}</p>

    <div class="article-body reveal">
${HTML_BODY}
    </div>

  </article>
</main>

<div class="shell rule rule--mono" role="separator"></div>
<footer class="shell site-foot">
  <span>george larson · director of technology</span>
  <span><a href="https://github.com/georgeglarson">github</a> · <a href="https://www.linkedin.com/in/georgelarson/">linkedin</a> · <a href="/resume">resume</a></span>
</footer>

</body>
</html>
HTMLEOF

echo "  Created: $STORY_DIR/index.html"

# ---------------------------------------------------------------------------
# Generate devto.md
# ---------------------------------------------------------------------------
DEVTO_BODY="$ARTICLE_BODY"

# Strip <style> blocks from devto body
devto_strip_styles() {
  local result=""
  local in_style=0
  while IFS= read -r line; do
    if echo "$line" | grep -q '<style'; then
      in_style=1
      if echo "$line" | grep -q '</style>'; then
        in_style=0
      fi
      continue
    fi
    if [[ $in_style -eq 1 ]]; then
      if echo "$line" | grep -q '</style>'; then
        in_style=0
      fi
      continue
    fi
    result+="$line"$'\n'
  done <<< "$DEVTO_BODY"
  echo "$result"
}

DEVTO_BODY=$(devto_strip_styles)

# Rewrite relative image paths for Dev.to
DEVTO_BODY=$(echo "$DEVTO_BODY" | sed -E "s|!\[([^]]*)\]\(([^/h][^)]*)\)|![\1](https://georgelarson.me/writing/${FM_SLUG}/\2)|g")

# Trim leading/trailing blank lines
DEVTO_BODY=$(echo "$DEVTO_BODY" | sed '/./,$!d' | sed -e :a -e '/^[[:space:]]*$/{ $d; N; ba; }')

cat > "$STORY_DIR/devto.md" << DEVTOEOF
---
title: "${FM_TITLE}"
published: false
description: "${FM_DESCRIPTION}"
tags: ${FM_TAGS}
canonical_url: ${CANONICAL}
cover_image: ${FM_COVER_IMAGE}
---

${DEVTO_BODY}

---

*George Larson, 25 years in software engineering, infrastructure, manufacturing systems, and cybersecurity. Currently looking for Director/VP or senior engineering roles. More at [georgelarson.me](https://georgelarson.me).*
DEVTOEOF

echo "  Created: $STORY_DIR/devto.md"

# ---------------------------------------------------------------------------
# Generate social-mastodon.md
# ---------------------------------------------------------------------------
if [[ -n "$SOCIAL_MASTODON" ]]; then
  MASTODON_CONTENT="$SOCIAL_MASTODON"
  if ! echo "$MASTODON_CONTENT" | grep -qF "$CANONICAL"; then
    MASTODON_CONTENT="${MASTODON_CONTENT}"$'\n'"${CANONICAL}"
  fi
  echo "$MASTODON_CONTENT" > "$STORY_DIR/social-mastodon.md"
  echo "  Created: $STORY_DIR/social-mastodon.md"
  CHAR_COUNT=${#MASTODON_CONTENT}
  if [[ $CHAR_COUNT -gt 500 ]]; then
    echo "  WARNING: Mastodon post is ${CHAR_COUNT} chars (limit 500)"
  fi
else
  echo "  WARNING: No <!-- social:mastodon --> block found"
fi

# ---------------------------------------------------------------------------
# Generate social-linkedin.md
# ---------------------------------------------------------------------------
if [[ -n "$SOCIAL_LINKEDIN" ]]; then
  LINKEDIN_CONTENT="$SOCIAL_LINKEDIN"
  if ! echo "$LINKEDIN_CONTENT" | grep -qF "$CANONICAL"; then
    LINKEDIN_CONTENT="${LINKEDIN_CONTENT}"$'\n'"${CANONICAL}"
  fi
  echo "$LINKEDIN_CONTENT" > "$STORY_DIR/social-linkedin.md"
  echo "  Created: $STORY_DIR/social-linkedin.md"
else
  echo "  WARNING: No <!-- social:linkedin --> block found"
fi

# ---------------------------------------------------------------------------
# Generate social-hn.md (optional)
# ---------------------------------------------------------------------------
if [[ -n "$SOCIAL_HN" ]]; then
  echo "$SOCIAL_HN" > "$STORY_DIR/social-hn.md"
  echo "  Created: $STORY_DIR/social-hn.md"
fi

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
echo ""
echo "Publishing artifacts generated for: ${FM_TITLE}"
echo "  Slug: ${FM_SLUG}"
echo "  Canonical: ${CANONICAL}"
echo "  Date: ${FM_DATE}"
