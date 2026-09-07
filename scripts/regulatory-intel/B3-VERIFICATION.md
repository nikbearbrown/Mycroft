# B3 — Google News URL unwrap: verification & measured evidence

**Date:** 2026-08-31 · **Workflow:** `workflow.dev.json` (`Normalize Data` node)

## The bug

`extractRealUrl()` tried to pull the real article URL out of a Google News redirect link via
`link.match(/url=([^&]+)/)`. Modern Google News RSS links
(`news.google.com/rss/articles/<opaque-id>?oc=5`) carry no `url=` query parameter at all — the
regex never matched, so every Google News item's stored `link` was just the opaque redirect,
useless to a reader. Confirmed live 2026-07-24 (see `FINDINGS.md`) and re-confirmed this session.

## Why it's not a simple regex/302 fix

`curl -L` on a Google News redirect link returns the same URL back with locale params appended —
no 302 to the real article. The real destination is only resolvable the way the Google News web
page itself resolves it: the page embeds a `data-n-a-id` / `data-n-a-ts` / `data-n-a-sg` triple
(article id, timestamp, signature) that must be POSTed to Google's internal
`_/DotsSplashUi/data/batchexecute` endpoint (RPC id `Fbv4je`), which returns the real URL in its
response body. This is the same technique documented by third-party Google-News-link decoders;
verified independently here against live data, not assumed from memory.

## The fix

`unwrapGoogleNewsUrl(link)`:
1. If the link isn't a Google News link, return it unchanged (no-op for all other sources).
2. `fetch()` the redirect page, extract `data-n-a-id`/`data-n-a-ts`/`data-n-a-sg` via regex.
3. POST the `garturlreq` payload to the batchexecute endpoint, extract the real URL
   (`garturlres`) from the response.
4. On any failure (network error, missing attributes, unexpected response format) — catch and
   return the original link unchanged. A broken decode never breaks the run; it just doesn't
   upgrade that one item's link.

**Critical ordering fix, caught before deploying:** `identifySource()`'s Google News branch keys
off the `news.google.com` domain in the link. The old code called `identifySource(link, ...)`
*after* `extractRealUrl()` — harmless before, because `extractRealUrl` was a no-op (the regex
never matched, so `link` was always still the google.com redirect). Now that unwrapping actually
works, calling `identifySource` after unwrapping would silently break its Google News branch for
every item (the real publisher domain, e.g. `mayerbrown.com`, never matches `news.google.com`),
undoing the B2 and Unknown-Source-Investigation fixes. Fixed by classifying on the **original**
`rawLink` before unwrapping, then using the unwrapped link only for the stored/displayed `link`
field.

## Visibility, not silent degradation

Added `gnewsSeen` / `gnewsUnwrapped` counters, logged in the run summary:
`Google News links seen: N, unwrapped to real URL: M, fell back to redirect: N-M`. If Google
changes the internal API later and the decode starts failing, this shows up immediately in the
log/report instead of links silently going back to being useless redirects with no signal that
anything changed — the same "make failures visible" principle as B1/A7/B2.

## Live verification

**Prototype (Python, 3 rounds):** first single item — decoded successfully. Batch of 20 (10 from
each Google News feed) — **20/20 (100%)** decoded to real URLs.

**Exact JS implementation (Node, native `fetch`):** ported the identical code — **16/16 (100%)**
decoded across both feeds.

**Full end-to-end test of the actual updated node** (extracted `Normalize Data`'s real `jsCode`
from `workflow.dev.json` post-fix, executed via `$input.all()` + top-level await exactly as n8n's
Code node runtime does): 6 live FINRA Google News items + 3 live SEC Press Release items.
- All 6 Google News items: unwrapped to real, working publisher URLs (mcguirewoods.com,
  freshfields.com, mayerbrown.com, jdsupra.com, morganlewis.com, ai-cio.com).
- All 6 **still correctly classified** as `FINRA Enforcement News` (confirms the classification-
  ordering fix works — this would have silently regressed to `Unknown Source` without it).
- 3 SEC items: unaffected, correct link and classification (`SEC Press Releases`).
- Summary log line: `Google News links seen: 6, unwrapped to real URL: 6, fell back to redirect: 0`.

## What's NOT verified — flagged, not assumed

- **n8n Code node `fetch`/top-level-`await` support in the fellow's specific n8n version/instance**
  is not verified here — I have no live n8n to test against, only the workflow JSON. Modern n8n
  Code nodes (typeVersion 2, already used throughout this workflow) support both, but confirm when
  copying this node in.
- **Request volume / rate-limit risk:** this adds 2 extra HTTP round-trips per Google News item —
  roughly 400 extra requests per run across both feeds (~200 items). Sequential, not parallelized,
  by deliberate choice (bursty parallel requests are more likely to trip a rate limit than the same
  volume spread out, and this is a scheduled batch job, not a latency-sensitive path). This adds
  real wall-clock time to every run — not measured here since it depends on network conditions at
  run time.
- **This is an undocumented, reverse-engineered internal Google API**, not a stable public
  contract. It could change or be blocked without notice. The fallback-on-failure + logged
  seen/unwrapped counts are the mitigation, not a guarantee.
