#!/usr/bin/env bash
set -euo pipefail

# distribute.sh - Push a story to all platforms and record the links
# Usage: ./scripts/distribute.sh <story-directory>
#
# Requires ~/.ironclaw/.env with:
#   DEVTO_API_KEY, MASTODON_ACCESS_TOKEN, MASTODON_INSTANCE,
#   HASHNODE_API_TOKEN, BLUESKY_HANDLE, BLUESKY_APP_PASSWORD
#
# Reads from the story directory:
#   devto.md, social-mastodon.md, social-linkedin.md (manual), story.md (frontmatter)
#
# Writes: published.md (link log)

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <story-directory>"
  echo "  e.g. $0 writing/2026-03-23-nullclaw-doorman/"
  exit 1
fi

STORY_DIR="${1%/}"
ENV_FILE="$HOME/.ironclaw/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: $ENV_FILE not found"
  exit 1
fi
source "$ENV_FILE"

if [[ ! -f "$STORY_DIR/story.md" ]]; then
  echo "Error: $STORY_DIR/story.md not found"
  exit 1
fi

# ---------------------------------------------------------------------------
# Parse frontmatter from story.md
# ---------------------------------------------------------------------------
get_fm() {
  local key="$1"
  sed -n '/^---$/,/^---$/p' "$STORY_DIR/story.md" \
    | grep "^${key}:" | head -1 \
    | sed "s/^${key}:[[:space:]]*//" | sed 's/^"\(.*\)"$/\1/'
}

TITLE=$(get_fm title)
SLUG=$(get_fm slug)
DESCRIPTION=$(get_fm description)
TAGS=$(get_fm tags)
COVER_IMAGE=$(get_fm cover_image)

# Fallback: use first image file in story directory if cover_image not set
if [[ -z "$COVER_IMAGE" ]]; then
  for img in "$STORY_DIR"/*.{png,jpg,jpeg,webp,gif}; do
    if [[ -f "$img" ]]; then
      COVER_IMAGE=$(basename "$img")
      break
    fi
  done
fi

CANONICAL="https://georgelarson.me/writing/${SLUG}/"
if [[ -n "$COVER_IMAGE" ]]; then
  COVER_URL="https://georgelarson.me/writing/${SLUG}/${COVER_IMAGE}"
else
  COVER_URL=""
fi
TODAY=$(date +%Y-%m-%d)

echo "Distributing: $TITLE"
echo "  Canonical: $CANONICAL"
echo ""

PUBLISHED_LOG="$STORY_DIR/published.md"

# Which platforms this run touches. Declared here because the log-merge below
# needs it; the dispatch at the bottom uses the same value.
PLATFORMS="${PLATFORMS:-devto hashnode mastodon bluesky linkedin}"

# Carry forward rows for platforms this run isn't touching. The log used to be
# truncated on every invocation, which was harmless when one run did all
# platforms and destructive the moment PLATFORMS allowed partial runs: finishing
# a half-completed distribution wiped the URLs the earlier run had recorded, so
# the only record of where a post actually landed was terminal scrollback.
PRIOR_ROWS=""
if [[ -f "$PUBLISHED_LOG" ]]; then
  PRIOR_ROWS=$(grep -E '^\| [A-Za-z]' "$PUBLISHED_LOG" \
    | grep -vE '^\| (Platform|Canonical) ' || true)
fi

cat > "$PUBLISHED_LOG" << EOF
# Published: $TITLE

**Date:** $TODAY

| Platform  | URL |
|-----------|-----|
| Canonical | $CANONICAL |
EOF

# Replay only the platforms this run will not write a fresh row for.
if [[ -n "$PRIOR_ROWS" ]]; then
  while IFS= read -r row; do
    [[ -z "$row" ]] && continue
    local_plat=$(printf '%s' "$row" | sed -E 's/^\| *([A-Za-z.]+) *\|.*/\1/' | tr '[:upper:]' '[:lower:]')
    case "$local_plat" in
      dev.to) local_plat="devto" ;;
    esac
    if [[ " $PLATFORMS " != *" $local_plat "* ]]; then
      echo "$row" >> "$PUBLISHED_LOG"
    fi
  done <<< "$PRIOR_ROWS"
fi

ERRORS=""

# ---------------------------------------------------------------------------
# Dev.to
# ---------------------------------------------------------------------------
publish_devto() {
  if [[ ! -f "$STORY_DIR/devto.md" ]]; then
    echo "  SKIP: devto.md not found"
    return
  fi
  echo -n "  Dev.to... "

  local body
  body=$(cat "$STORY_DIR/devto.md")

  # Fix cover_image path if present and non-empty
  if [[ -n "$COVER_IMAGE" ]]; then
    body=$(echo "$body" | sed "s|^cover_image: ${COVER_IMAGE}$|cover_image: ${COVER_URL}|")
  fi

  # Remove empty cover_image line (Dev.to chokes on it)
  body=$(echo "$body" | sed '/^cover_image:[[:space:]]*$/d')

  # Front matter inside body_markdown BEATS the API's own `published` flag, so a
  # file carrying `published: false` produced a draft no matter what we sent.
  # Every article distributed before 2026-08-08 sat unpublished for this reason,
  # while published.md recorded the draft's temp-slug URL as if it had shipped.
  # Force it true here rather than editing each story file.
  body=$(echo "$body" | sed '0,/^---$/!{0,/^published:[[:space:]]*false[[:space:]]*$/s//published: true/}')

  local response
  response=$(curl -s -X POST https://dev.to/api/articles \
    -H "Content-Type: application/json" \
    -H "api-key: $DEVTO_API_KEY" \
    -d "$(jq -n --arg body "$body" '{article: {body_markdown: $body, published: true}}')")

  local url
  url=$(echo "$response" | jq -r '.url // empty')
  local error
  error=$(echo "$response" | jq -r '.error // empty')

  if [[ -n "$url" ]]; then
    local published_at
    published_at=$(echo "$response" | jq -r '.published_at // empty')
    if [[ -n "$published_at" ]]; then
      echo "$url"
      echo "| Dev.to    | $url |" >> "$PUBLISHED_LOG"
    else
      echo "PENDING (account moderation): $url"
      echo "| Dev.to    | $url (pending moderation) |" >> "$PUBLISHED_LOG"
    fi
  else
    echo "FAILED: $error"
    ERRORS="${ERRORS}Dev.to: ${error}\n"
  fi
}

# ---------------------------------------------------------------------------
# Hashnode
# ---------------------------------------------------------------------------
publish_hashnode() {
  echo -n "  Hashnode... "

  # Get publication ID.
  #
  # Hashnode retired free GraphQL API access on 2026-05-13: reads and writes
  # both require a Pro plan on the publication now, and gql.hashnode.com
  # 301-redirects unauthenticated traffic to the changelog announcing it. The
  # redirect body is HTML, so the old code fed a "<html>" page to jq and killed
  # the whole run. Detect it and skip cleanly instead.
  #   https://hashnode.com/changelog/2026-05-13-graphql-api-paid-access
  local pub_response http_code
  pub_response=$(curl -s -w "\n%{http_code}" -X POST https://gql.hashnode.com \
    -H "Content-Type: application/json" \
    -H "Authorization: $HASHNODE_API_TOKEN" \
    -d '{"query": "{ me { publications(first: 1) { edges { node { id } } } } }"}')
  http_code=$(printf '%s' "$pub_response" | tail -n1)
  pub_response=$(printf '%s' "$pub_response" | sed '$d')

  if [[ "$http_code" == 3* ]]; then
    echo "SKIP: free GraphQL API retired 2026-05-13, needs a paid Pro plan"
    echo "| Hashnode  | (skipped — API requires a paid plan since 2026-05-13) |" >> "$PUBLISHED_LOG"
    return
  fi

  local pub_id
  pub_id=$(printf '%s' "$pub_response" | jq -r '.data.me.publications.edges[0].node.id // empty' 2>/dev/null || true)

  if [[ -z "$pub_id" ]]; then
    echo "FAILED: could not get publication ID (HTTP $http_code)"
    echo "  Raw response: $pub_response" >&2
    ERRORS="${ERRORS}Hashnode: could not get publication ID (HTTP ${http_code})\n"
    return
  fi

  # Extract content: strip YAML frontmatter (first --- to second ---)
  # then strip the trailing Dev.to footer ("---" onwards at end of file)
  local content
  content=$(awk '
    BEGIN { fm_count=0; in_footer=0 }
    /^---$/ { fm_count++; next }
    fm_count < 2 { next }
    fm_count >= 3 { in_footer=1; next }
    in_footer { next }
    { print }
  ' "$STORY_DIR/devto.md")

  # Trim leading/trailing blank lines
  content=$(echo "$content" | sed '/./,$!d' | sed -e :a -e '/^[[:space:]]*$/{ $d; N; ba; }')

  local query
  if [[ -n "$COVER_IMAGE" ]]; then
    query=$(jq -n \
      --arg content "$content" \
      --arg title "$TITLE" \
      --arg pubId "$pub_id" \
      --arg coverUrl "$COVER_URL" \
      --arg canonical "$CANONICAL" \
      '{
        query: "mutation PublishPost($input: PublishPostInput!) { publishPost(input: $input) { post { id url } } }",
        variables: {
          input: {
            title: $title,
            contentMarkdown: $content,
            publicationId: $pubId,
            coverImageOptions: { coverImageURL: $coverUrl },
            originalArticleURL: $canonical,
            tags: []
          }
        }
      }')
  else
    query=$(jq -n \
      --arg content "$content" \
      --arg title "$TITLE" \
      --arg pubId "$pub_id" \
      --arg canonical "$CANONICAL" \
      '{
        query: "mutation PublishPost($input: PublishPostInput!) { publishPost(input: $input) { post { id url } } }",
        variables: {
          input: {
            title: $title,
            contentMarkdown: $content,
            publicationId: $pubId,
            originalArticleURL: $canonical,
            tags: []
          }
        }
      }')
  fi

  local response
  response=$(curl -s -X POST https://gql.hashnode.com \
    -H "Content-Type: application/json" \
    -H "Authorization: $HASHNODE_API_TOKEN" \
    -d "$query")

  local url
  url=$(echo "$response" | jq -r '.data.publishPost.post.url // empty')

  if [[ -n "$url" ]]; then
    echo "$url"
    echo "| Hashnode  | $url |" >> "$PUBLISHED_LOG"
  else
    local error
    error=$(echo "$response" | jq -r '.errors[0].message // "unknown error"')
    echo "FAILED: $error"
    echo "  Raw response: $response" >&2
    ERRORS="${ERRORS}Hashnode: ${error}\n"
  fi
}

# ---------------------------------------------------------------------------
# Mastodon
# ---------------------------------------------------------------------------
publish_mastodon() {
  if [[ ! -f "$STORY_DIR/social-mastodon.md" ]]; then
    echo "  SKIP: social-mastodon.md not found"
    return
  fi
  echo -n "  Mastodon... "

  local status_text
  status_text=$(cat "$STORY_DIR/social-mastodon.md")

  local response
  response=$(curl -s -X POST "$MASTODON_INSTANCE/api/v1/statuses" \
    -H "Authorization: Bearer $MASTODON_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg status "$status_text" '{status: $status, visibility: "public"}')")

  local url
  url=$(echo "$response" | jq -r '.url // empty')

  if [[ -n "$url" ]]; then
    echo "$url"
    echo "| Mastodon  | $url |" >> "$PUBLISHED_LOG"
  else
    local error
    error=$(echo "$response" | jq -r '.error // "unknown error"')
    echo "FAILED: $error"
    ERRORS="${ERRORS}Mastodon: ${error}\n"
  fi
}

# ---------------------------------------------------------------------------
# Bluesky
# ---------------------------------------------------------------------------
publish_bluesky() {
  echo -n "  Bluesky... "

  # Bluesky has a 300 grapheme limit. Prefer hand-written copy for this platform;
  # fall back to the Mastodon text, trimmed to whole paragraphs.
  local post_text
  if [[ -f "$STORY_DIR/social-bluesky.md" ]]; then
    post_text=$(cat "$STORY_DIR/social-bluesky.md")
  elif [[ -f "$STORY_DIR/social-mastodon.md" ]]; then
    post_text=$(cat "$STORY_DIR/social-mastodon.md")
  else
    post_text="$TITLE $CANONICAL"
  fi

  local char_count
  char_count=$(printf '%s' "$post_text" | wc -m)
  if [[ $char_count -gt 300 ]]; then
    # The old arithmetic trimmed the body to a flat 280 and THEN appended the
    # canonical URL plus a blank line, so anything long landed near 330 and
    # Bluesky rejected the whole post with InvalidRequest. Every over-length
    # post silently failed this way. Budget the URL first, and drop whole
    # paragraphs rather than cutting mid-word.
    local url_len budget body
    url_len=$(printf '%s' "$CANONICAL" | wc -m)
    budget=$((300 - url_len - 2))
    body=$(printf '%s' "$post_text" | sed "s|${CANONICAL}||" | sed -e 's/[[:space:]]*$//')
    local kept="" para
    while IFS= read -r para; do
      [[ -z "$para" ]] && continue
      local candidate
      if [[ -z "$kept" ]]; then candidate="$para"; else candidate="$kept

$para"; fi
      [[ $(printf '%s' "$candidate" | wc -m) -gt $budget ]] && break
      kept="$candidate"
    done < <(printf '%s\n' "$body" | awk 'BEGIN{RS="\n\n+"} {gsub(/\n+$/,""); print; print ""}')
    if [[ -z "$kept" ]]; then
      echo "FAILED: no paragraph fits Bluesky's limit; add ${STORY_DIR}/social-bluesky.md"
      ERRORS="${ERRORS}Bluesky: no paragraph fits 300 graphemes; needs social-bluesky.md\n"
      return
    fi
    post_text="${kept}

${CANONICAL}"
  fi

  # Authenticate
  local session
  session=$(curl -s -X POST https://bsky.social/xrpc/com.atproto.server.createSession \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg h "$BLUESKY_HANDLE" --arg p "$BLUESKY_APP_PASSWORD" \
      '{identifier: $h, password: $p}')")

  local did access_jwt
  did=$(echo "$session" | jq -r '.did // empty')
  access_jwt=$(echo "$session" | jq -r '.accessJwt // empty')

  if [[ -z "$did" ]]; then
    echo "FAILED: authentication failed"
    ERRORS="${ERRORS}Bluesky: auth failed\n"
    return
  fi

  # Find canonical URL position for link facet
  local now
  now=$(date -u +%Y-%m-%dT%H:%M:%S.000Z)

  local link_start link_end
  link_start=$(echo -n "$post_text" | grep -bo "$CANONICAL" | head -1 | cut -d: -f1 || echo "")

  local post_data
  if [[ -n "$link_start" ]]; then
    link_end=$((link_start + $(echo -n "$CANONICAL" | wc -c)))
    post_data=$(jq -n \
      --arg did "$did" \
      --arg text "$post_text" \
      --arg now "$now" \
      --arg uri "$CANONICAL" \
      --argjson ls "$link_start" \
      --argjson le "$link_end" \
      '{
        repo: $did,
        collection: "app.bsky.feed.post",
        record: {
          "$type": "app.bsky.feed.post",
          text: $text,
          createdAt: $now,
          facets: [{
            index: { byteStart: $ls, byteEnd: $le },
            features: [{ "$type": "app.bsky.richtext.facet#link", uri: $uri }]
          }]
        }
      }')
  else
    post_data=$(jq -n \
      --arg did "$did" \
      --arg text "$post_text" \
      --arg now "$now" \
      '{
        repo: $did,
        collection: "app.bsky.feed.post",
        record: {
          "$type": "app.bsky.feed.post",
          text: $text,
          createdAt: $now
        }
      }')
  fi

  local response
  response=$(curl -s -X POST https://bsky.social/xrpc/com.atproto.repo.createRecord \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $access_jwt" \
    -d "$post_data")

  local uri
  uri=$(echo "$response" | jq -r '.uri // empty')

  if [[ -n "$uri" ]]; then
    # Convert at:// URI to web URL
    local rkey
    rkey=$(echo "$uri" | sed 's|.*/||')
    local web_url="https://bsky.app/profile/${BLUESKY_HANDLE}/post/${rkey}"
    echo "$web_url"
    echo "| Bluesky   | $web_url |" >> "$PUBLISHED_LOG"
  else
    local error
    error=$(echo "$response" | jq -r '.error // "unknown error"')
    echo "FAILED: $error"
    ERRORS="${ERRORS}Bluesky: ${error}\n"
  fi
}

# ---------------------------------------------------------------------------
# LinkedIn (manual — just record it)
# ---------------------------------------------------------------------------
note_linkedin() {
  if [[ -f "$STORY_DIR/social-linkedin.md" ]]; then
    echo "  LinkedIn... MANUAL (post social-linkedin.md yourself, then add URL below)"
    echo "| LinkedIn  | (manual — update after posting) |" >> "$PUBLISHED_LOG"
  fi
}

# ---------------------------------------------------------------------------
# Run all
#
# Each platform runs under `|| true`. Under `set -e` + `pipefail`, one bad
# response aborted the ENTIRE run: on 2026-08-08 Hashnode returned an HTML 301
# instead of JSON, jq died inside a pipeline, and the script exited before
# Mastodon, Bluesky, or the LinkedIn note were ever attempted. Publishing is not
# transactional, so a platform that fails must cost only itself.
#
# PLATFORMS selects a subset, so a partial run can be finished without
# re-posting where it already succeeded:
#   PLATFORMS="mastodon bluesky linkedin" ./scripts/distribute.sh <dir>
# ---------------------------------------------------------------------------
wants() { [[ " $PLATFORMS " == *" $1 "* ]]; }

wants devto    && { publish_devto    || ERRORS="${ERRORS}Dev.to: aborted unexpectedly\n"; }
wants hashnode && { publish_hashnode || ERRORS="${ERRORS}Hashnode: aborted unexpectedly\n"; }
wants mastodon && { publish_mastodon || ERRORS="${ERRORS}Mastodon: aborted unexpectedly\n"; }
wants bluesky  && { publish_bluesky  || ERRORS="${ERRORS}Bluesky: aborted unexpectedly\n"; }
wants linkedin && { note_linkedin    || true; }
true

echo ""
echo "Publish log written to: $PUBLISHED_LOG"

if [[ -n "$ERRORS" ]]; then
  echo ""
  echo "ERRORS:"
  echo -e "$ERRORS"
  exit 1
else
  echo "All platforms published successfully."
fi
