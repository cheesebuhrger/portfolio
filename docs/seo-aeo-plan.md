# SEO & AEO Plan

_Created 2026-09-28. Status: approved, decisions below. Build this **before** `playground-links-plan.md`, which reuses its helpers._

**SEO** (search engine optimization): being found and understood by Google/Bing.
**AEO** (answer engine optimization, also called GEO): being understood and cited by AI answer tools such as ChatGPT search, Perplexity, Claude and Google AI Overviews / AI Mode. The two overlap almost entirely.

## What the research says (and what it means here)

| Finding | Source | Implication for buhr.dev |
|---|---|---|
| "There are no additional requirements to appear in AI Overviews or AI Mode." The fundamentals are the same as regular search. | [Google: optimizing for generative AI](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | Get indexing, structure and page quality right; there's no separate "AI version" of the site. |
| Google explicitly says llms.txt, AI-specific files and content chunking are **not needed**, and that structured data isn't required for AI features. | same | Don't write content "for AI". Structured data is still worth adding for entity clarity (who you are, what each case study is), but it isn't a magic switch. |
| A server-log study of ~900 domains found no requests for `llms.txt` from frontier AI crawlers. Coding and agent tools (Cursor, MCP clients) do use it. | [server-log study via digitalapplied](https://www.digitalapplied.com/blog/llms-txt-in-practice-adoption-evidence-2026) | Optional and low priority. Cheap to add, but not an SEO lever. |
| AI companies run separate bots for **search** (OAI-SearchBot, Claude-SearchBot, PerplexityBot) and **training** (GPTBot, ClaudeBot, Google-Extended). Blocking a search bot removes you from that engine's answers. | [OpenAI crawler docs](https://developers.openai.com/api/docs/bots) | `robots.txt` must allow the search bots. Allowing training bots is a separate choice (see decisions). |
| Content changes can raise visibility in AI answers by up to 40%; adding statistics, quotations and cited sources are among the most effective. Answer engines also draw on what other sites say about you. | [GEO: Generative Engine Optimization (KDD 2024)](https://arxiv.org/abs/2311.09735) | Your case studies already fit (first-person, real metrics, quotes). Beyond the site, get mentioned elsewhere (LinkedIn etc.) with a consistent name and role. |
| ProfilePage markup suits "About Me" pages, not home pages that mix other content. | [Google: ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page) | Homepage: `Person` + `WebSite`. Use `ProfilePage` later, when `/about` is real. |
| For video indexing, each video needs a dedicated **watch page** where it's the main content, with a stable thumbnail. | [Google: video SEO](https://developers.google.com/search/docs/appearance/video) | This confirms the Playground plan's per-item pages (option A). |
| LinkedIn wants og:image ≥1200×627 and doesn't reliably render WebP. | [LinkedIn: shareable websites](https://www.linkedin.com/help/linkedin/answer/a521928) | Case-study previews are currently `.webp` covers, so serve 1200×630 JPEGs through Cloudinary. |
| JSON-LD goes in a `<script type="application/ld+json">` in the page/layout, with `<` escaped. | [Next.js: JSON-LD](https://nextjs.org/docs/app/guides/json-ld) | One small helper component. |
| Search Console has a **Generative AI performance report**. | [Google: optimizing for generative AI](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | Verify the site so you can see AI Overview / AI Mode visibility. |

## Audit of the live site (2026-09-28)

**Already good:**
- Case studies: own title, description and canonical.
- ~7k characters of server-rendered text per case study.
- All images have alt text, and `lang="en"` is set.
- Page speed (measured in headless Chrome):
  - Case studies: LCP 0.3s desktop / 0.7s throttled phone.
  - Homepage: LCP 0.4s desktop / 2.4s throttled phone.
  - CLS ≤0.03 everywhere.

**Gaps:**
- No `sitemap.xml` / `robots.txt` (404).
- No structured data.
- Case-study og:images are WebP and not 1200×630.
- `/about` is indexable with placeholder content and the homepage's title and canonical.
- 3 `<h1>`s per case study.
- Homepage title "Buhr | Portfolio" doesn't include your name or role.

## Work

### 1. Foundations: `lib/seo.ts`
- **Site facts in one place:** URL, name "Buhr Duong", role "Design Engineer", profiles (LinkedIn, GitHub, Are.na, already in the footer). The Footer and metadata read from here, so they can't drift apart.
- **`JsonLd` component:** renders escaped JSON-LD, per the Next.js guidance.
- **`ogImage(src)` helper:** returns a Cloudinary 1200×630 JPEG for any image or video URL (videos use a frame).

### 2. Crawling and indexing
- **`app/sitemap.ts`:** `/`, every case study and (later) every Playground item, with `lastModified`. `/about` is excluded.
- **`app/robots.ts`:** allow everything, point to the sitemap, and apply the AI crawler policy chosen below.
- **`/about`:** `robots: { index: false }` and its own title/canonical until it's built. (Decision made: hide for now.)

### 3. Identity (the core of AEO)
- **Homepage title:** "Buhr Duong: Design Engineer" (decision made). The description names you and your role.
- **Homepage JSON-LD:**
  - `WebSite` (name, url).
  - `Person` with a stable `@id` (`https://buhr.dev/#person`): name, jobTitle, url, description, `sameAs` (LinkedIn, GitHub, Are.na), `knowsAbout` (product design, interaction design, motion, prototyping, front-end development).
- Keep name and role wording **identical** across the site, LinkedIn and other profiles.

### 4. Case studies
- **Per-page JSON-LD:**
  - `Article`: headline, description, image (1200×630 JPEG), `author` → `#person`.
  - `about` → `Organization` (the company).
  - The role and skills as `keywords`.
  - `datePublished` / `dateModified` only if we add real dates (see decisions).
- **`BreadcrumbList`:** Home → Case study.
- **og:image / twitter:image:** 1200×630 JPEG instead of the WebP cover.
- **Headings:** "The Nitty Gritty" and "Want the Details?" become `<h2>` (same styling). One `<h1>` per page.

### 5. Measurement (your actions; I'll give exact steps)
- **Google Search Console:** verify via a DNS TXT record in Vercel or a meta tag, submit the sitemap, then watch Performance and the Generative AI report.
- **Bing Webmaster Tools:** import from Search Console. Bing's index powers Copilot and is used by other AI search tools.
- **Vercel Analytics** (already installed): watch referrers from `chatgpt.com`, `perplexity.ai` and similar.
- **Share-preview checks:** LinkedIn Post Inspector on each case study after deploy.

### 6. Off-site (highest-impact AEO, your actions)
- LinkedIn: headline matches "Design Engineer", website field set to buhr.dev, and featured links to the case studies.
- When sharing a case study (LinkedIn post, Dribbble, Are.na), link to its buhr.dev URL. Answer engines also draw on what other sites say about you.

### 7. Optional / later
- `llms.txt` (for coding agents, not search).
- Vercel Speed Insights, to track real-user Core Web Vitals. The homepage's phone LCP (2.4s) is right at Google's 2.5s "good" line, because the intro text reveal delays the largest paint.
- `ProfilePage` + `Person` on `/about` once it's real.

### 8. Verification
- Schema Markup Validator and Google Rich Results Test on the homepage and each case study.
- `/sitemap.xml` and `/robots.txt` return the expected content.
- `/about` has `noindex`.
- One `<h1>` per page.
- og:image URLs return 1200×630 `image/jpeg`.
- Homepage and case-study screenshots unchanged (the heading change is markup-only).

## Decisions (made 2026-09-28)

1. **AI training crawlers: block all** (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, and similar). Search and user-fetch bots stay allowed, so there's no effect on search or AI-search visibility. The only trade-off: models answering *without* searching won't have learned from the site. `robots.txt` can't reach media served straight from `res.cloudinary.com`, which is Cloudinary's domain; serving media through `buhr.dev/media/*` is an optional later step if that matters.
2. **Case-study publish dates:** Buildforce Leadership 2024-07-05, Buildforce 2024-11-19, Strava Growth 2022-02-08. `dateModified` only changes when content changes.
3. **`worksFor`:** Organization "Buhr Duong, LLC" (url buhr.dev). It signals you're independent and available for hire.
4. **No headshot:** the Person `image` is omitted.
5. **Homepage title:** "Buhr Duong: Design Engineer".
6. **`/about`:** `noindex` and left out of the sitemap until it's built.
7. **Preview images:** Cloudinary URL transform `c_fill,g_auto,w_1200,h_630,q_auto,f_jpg`, generated on request; nothing to configure in Cloudinary. Crops reviewed and approved.
8. **Playground video dates** (for the Playground plan): `uploadDate` is the Cloudinary version timestamp (when first published on the site), and `dateCreated` is the item's year.
