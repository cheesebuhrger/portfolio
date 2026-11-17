# llms.txt + Vercel Speed Insights: Plan

_Created 2026-11-17. Status: approved and implemented 2026-11-17; revised after Fable 5.1 review and `/code-review` (see end). §2 optional items of `roadmap-plan.md`. Branch `feat/llms-txt-speed-insights` from `main`._

## Goal

1. Serve `https://buhrduong.com/llms.txt`: a plain-text Markdown summary of the site for AI answer engines (format from llmstxt.org).
2. Add Vercel Speed Insights (real-visitor Core Web Vitals) next to the existing Vercel Analytics.

No visible change to any page.

## 1. llms.txt

**Closest existing code:** `app/sitemap.ts` and `app/robots.ts`. Both are generated from `lib/content.ts` + `lib/seo.ts` (`SITE`), so they can't drift from the content. llms.txt follows the same pattern instead of a hand-written file in `public/`.

**File:** `app/llms.txt/route.ts`, a Route Handler:

```ts
export const dynamic = "force-static"; // built once at build time, like sitemap.ts
export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

The body is built in a small `llmsTxt()` function in `lib/seo.ts` (next to `personSchema` etc.), so the route stays thin.

**Content** (llmstxt.org structure: H1, blockquote summary, details, H2 link lists):

```md
# Buhr Duong

> {SITE.description}

Portfolio home: {SITE.url}. {SITE.jobTitle}, working as {SITE.business.name}.

## Case studies
- [{title}]({absolute url}): {company}, {year}. {problem}

## Frames
- [{title}]({absolute url}): {frameDescription(item)}

## Profiles
- [LinkedIn]({SITE.profiles.linkedin})
- [GitHub](…)
- [Are.na](…)

## Optional
- [{title}]({absolute url}): frames that only have the fallback description
```

- Same page set as the sitemap: home, every project, every frame. `/about` stays out (it's `noindex`).
- URLs via `absoluteUrl()` + `projectHref()` / `frameHref()`, as in `sitemap.ts`.
- Link text escapes `[`, `]` and `\`; descriptions have newlines collapsed and end with a full stop (some `problem` strings don't). No `**` stripping needed: these fields are plain strings, not `RichText`.
- Frames without their own `description` go under `## Optional`, the spec's section that tools may skip, and move up automatically once they get one. (`chapter-2` and `chapter-4` got descriptions in this PR, so the section is currently empty and left out.)
- `text/plain` rather than `text/markdown`: both are valid, but some browsers (Firefox) download `text/markdown` instead of showing it.
- **robots.txt is unchanged.** It blocks AI *training* crawlers; AI *search* and user-triggered fetchers (OAI-SearchBot, Claude-SearchBot, PerplexityBot, ChatGPT-User, Claude-User) are already allowed and are the ones that would read llms.txt. Not added to the sitemap (llms.txt isn't a page).

## 2. Speed Insights

**Closest existing code:** `<Analytics />` from `@vercel/analytics/react` in `app/layout.tsx:32`.

- `npm install @vercel/speed-insights` (2.1.0).
- In `app/layout.tsx`: `import { SpeedInsights } from "@vercel/speed-insights/react";` and render `<SpeedInsights />` right after `<Analytics />`.
- **`/react`, not `/next`** (changed after `/code-review`): the `/next` entry derives the route pattern from the root layout's `useParams()`, which includes the `@modal/[...catchAll]` slot's param, so `/about` would be reported as `/[...catchAll]`. `/react` reports plain URLs, matching the existing `Analytics` (also `/react`), so the two dashboards line up page by page.
- **Dashboard step (you):** enable Speed Insights in the Vercel project (Project → Speed Insights → Enable). Without it, the script loads but data isn't collected. Check the plan's included data points.

## Verification

- `npm run lint`, `npm run typecheck`, `npm run build`. The build output lists `/llms.txt` as static (○).
- `next start`, then `curl -i localhost:3000/llms.txt`: 200, `text/plain`, every project and frame present, absolute `https://buhrduong.com` URLs.
- Locally, expect `/_vercel/speed-insights/script.js` (and the existing `/_vercel/insights/script.js`) to 404 under `next start`: only Vercel serves those paths. In `next dev`, the debug script logs to the console. So the script check happens on the **Vercel preview deployment**: script loads with 200, no console errors.
- Pixel diff of the homepage before/after: zero.

## Commits

1. `Add llms.txt generated from site content`
2. `Add Vercel Speed Insights`

## Review (Fable 5.1, 2026-11-17)

Fable built a prototype of the route on a scratch copy (`○ /llms.txt (Static)`, 200, all 3 projects and 10 frames) and read the Speed Insights 2.1.0 source. Folded in above:

- Verification corrected: Speed Insights isn't a no-op in dev, and its script 404s under local `next start`; check on the Vercel preview instead.
- Home URL added, so the page set matches the sitemap.
- Link text escaping and description normalising added; the unnecessary `**` stripping dropped.
- `text/plain` instead of `text/markdown`, for viewing in browsers.
- Fallback-description frames moved to `## Optional`.

Confirmed: the static route works and doesn't clash with `@modal/[...catchAll]`; the llmstxt.org structure; robots.txt reasoning; Speed Insights `/next` import, peer deps (Next ≥13, React 18/19), route grouping and placement; the Analytics `/react` vs `/next` note; no CSP or consent issues (no cookies). Some ad blockers block `/_vercel/*`, so some data will be missing.

## Code review (`/code-review`, 2026-11-17)

- Fixed: Speed Insights switched to `/react` (route mislabelling via the `@modal` catch-all; also matches Analytics).
- Fixed: profiles built from `SITE.profiles` with a typed label map; the "Works across…" line (lowercased, repeating the description) replaced; every section is left out when empty.
- Not changed: escaping Markdown in descriptions (plain prose, read by AI tools, not rendered); `sampleRate` (traffic is low; revisit if the plan's data points run out).
