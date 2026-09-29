# Shareable Playground Links: Plan

_Created 2026-09-28. Status: built 2026-09-29 (notes at the end). Approved, with all recommended options chosen (see bottom). Build after `seo-aeo-plan.md`, which provides the sitemap, JSON-LD and og-image helpers used here._

## Goal

Every Playground item gets its own URL, e.g. `buhr.dev/playground/abode-money-loader`.

- **From the homepage:** clicking a tile opens the dialog as it does today, and the address bar shows the item's URL. Previous/Next update it, and closing it or pressing Back returns to `/`.
- **Shared or refreshed:** the URL loads that item directly.
- **Search engines and link previews:** each item is a real page with its own title, description, preview image and canonical URL, statically generated and listed in a sitemap.

## Approach: Next.js intercepting + parallel routes

This is the official App Router pattern for "modal with a real URL" (the same one used by photo galleries like Instagram and Next's own demos).

```
app/
  layout.tsx                          ← renders {children} and {modal}
  @modal/
    default.tsx                       ← renders nothing when no modal is open
    (.)playground/[slug]/page.tsx     ← intercepted: the dialog over the current page
  playground/[slug]/page.tsx          ← direct visit / share / refresh: full page
```

- **In-app click** (a "soft navigation"): Next intercepts `/playground/[slug]` and renders it in the `@modal` slot. The homepage stays mounted behind the dialog, so its scroll position and animations are untouched.
- **Direct visit** (a "hard navigation"): there's nothing to intercept, so `playground/[slug]/page.tsx` renders as a normal, server-rendered page.
- **SEO:** crawlers only ever do hard navigations, so each item is a complete static HTML page with its own metadata. Query strings (`/?item=…`) and hashes (`/#item`) were rejected: hashes never reach the server, and query strings would make the homepage dynamic and are weaker signals for indexing.

## Work

### 1. Content
- Add a required `slug` to `PlaygroundItem`, written explicitly (e.g. `"abode-money-loader"`) so URLs stay stable if a title changes.
- Add an optional `poster` for link-preview images.
  - Default for videos: a Cloudinary frame at 1200×630, derived from the video URL (`/video/upload/so_0,w_1200,h_630,c_fill/…/name.jpg`). Verified working.
  - Set `poster` explicitly when the first frame is blank, e.g. loaders that start empty.
- Images use themselves via a Cloudinary crop.
- In `lib/content.ts`: `getPlaygroundItem(slug)` and `getAdjacentPlaygroundItems(slug)` (previous/next, wrapping).

### 2. Routes
- **`app/playground/[slug]/page.tsx`**:
  - `generateStaticParams` + `dynamicParams = false` (unknown slugs return 404).
  - `generateMetadata`:
    - title → "Buhr | {title}"
    - description → the item description, falling back to "{title} ({date}), from Buhr Duong's playground."
    - OG/Twitter image → poster
    - canonical → `/playground/{slug}`
  - Optional JSON-LD: `VideoObject` for videos, `ImageObject`/`CreativeWork` for images.
- **`app/@modal/(.)playground/[slug]/page.tsx`**: renders the existing `Dialog` with the item.
- **`app/@modal/default.tsx`**: returns `null`.
- **`app/layout.tsx`**: accepts and renders the `modal` slot.

### 3. Components
- **`PlaygroundDetail`**: the dialog's current content (media + title/date/link/description), extracted so the dialog and the full page render the same thing.
- **Playground tiles** become `<Link href="/playground/{slug}" scroll={false}>`. They stay keyboard-accessible, and they're now crawlable links too. Plain `Link`, not `TransitionLink`, so the page-transition animation doesn't play when a dialog opens.
- **`Dialog`** becomes route-driven:
  - Open on mount.
  - Previous/Next → `router.replace(nextSlug, { scroll: false })`, so stepping through items doesn't flood the history.
  - Close (button, Escape, scrim) → animate out, then `router.back()`. If the dialog wasn't opened from inside the site, go to `/#playground` instead.
- **`Playground`** drops its local open/index state, since the URL is now the state.

### 4. Integration points (where this can break existing behaviour)
- **`SmoothScroll` / `ResetScrollOnNavigate`** jumps to the top on every path change. Opening, stepping and closing the dialog change the path, so they must be exempt: the homepage has to stay exactly where it is behind the dialog. Add an explicit "overlay route" check for `/playground/*` soft navigations.
- **`next-view-transitions`** starts a view transition on every `popstate`. Closing with `router.back()` is a popstate, so check that no transition flash plays when the dialog closes.
- **Lenis scroll lock** in `Dialog` stays as is.
- **The custom cursor's** "VIEW DETAILS" label works on links as on buttons (`.cursor-animation` class). Just verify it.
- **Focus:** with a route-driven dialog, focus must still return to the tile that opened it on close.

### 5. Discoverability
- **`app/sitemap.ts`** (none exists today; `/sitemap.xml` returns 404): `/`, every case study and every Playground item.
- **`app/robots.ts`**: allow all and point to the sitemap.
- **Vercel Analytics** counts each item URL as a page view, so you'll see which Playground pieces get opened and shared.

### 6. Verification
Using the headless-Chrome setup from the refactor:
- **Homepage parity:** screenshots at the usual scroll positions, pin count and page height stay unchanged.
- **Dialog behaviour:**
  - Open → the URL changes and the page behind doesn't move.
  - Previous/Next → the URL is replaced and history doesn't grow.
  - Close / Escape / scrim / browser Back → back to `/` at the same scroll position, focus on the tile.
  - Browser Forward reopens the dialog.
- **Direct visit:** each slug returns 200 with the correct title, OG tags and canonical. An unknown slug returns 404.
- **Share previews:** each OG image URL returns a 1200×630 JPEG.
- **Existing scroll tests still pass:** project links, hash links, back/forward.
- **Sitemap:** `/sitemap.xml` lists every URL.

## Decisions (made 2026-09-28)

1. **A shared link opens a dedicated item page.** Same content and styling as the dialog, with Nav/Footer, Previous/Next and "Back to Playground". This also makes each video a proper *watch page*, which Google requires for video indexing ([Google: video SEO](https://developers.google.com/search/docs/appearance/video)).
2. **Slugs are written by hand** in `content/playground.ts`.
3. **Structured data:** `VideoObject` for videos and `ImageObject` for images, via the `JsonLd` helper from the SEO plan.
   - `VideoObject` needs `name`, `thumbnailUrl` (the Cloudinary frame) and `uploadDate`. Only years are known today, so add real dates to the content if possible; otherwise mark up the year only and accept that video rich results are less likely.
   - Items go into `app/sitemap.ts`.

## Implementation notes (2026-09-29)

- **Routes:**
  - `app/playground/[slug]` is the full page (shared links, refreshes, crawlers).
  - `app/@modal/(.)playground/[slug]` is the intercepted in-site dialog.
  - `app/@modal/default.tsx` and `[...catchAll]` close the slot.
  - Both routes are statically generated; unknown slugs return 404.
- **The dialog lives in the intercepted route's layout** (`app/@modal/(.)playground/layout.tsx` → `components/playground/PlaygroundDialog`). That way it stays mounted while Previous/Next change the slug: no close/reopen between items.
  - Previous/Next use `router.replace`, so history doesn't grow and Back closes in one step.
  - Rapid presses step from the pending target, so two quick presses move two items.
- **`PlaygroundDetail`** is shared by the dialog (heading `h2`, since the page behind has the `h1`) and the full page (`h1`).
- **On the full page, Previous/Next are plain `<a>` links** (a full navigation), so Next doesn't intercept them into a dialog over the page. "All Playground" goes to `/#playground`.
- **Scroll (`components/layout/SmoothScroll.tsx`):**
  - Opening a route dialog, stepping between items, and closing it don't move the page behind.
    - This is decided by whether a `dialog[data-route-overlay]` is actually in the DOM after the commit, not by the URL, because `/playground/*` can also be the full page (found in code review).
  - Scroll positions for Back/Forward are saved on every scroll.
    - A click on a link to another page snapshots the position at that moment and ignores scrolls until the new route renders. Browsers emit a stray scroll to 0 mid-navigation, and trackpad/smooth-scroll momentum continues after a click.
    - Popstate uses the existing pending-history logic.
    - Repeat clicks while a navigation or Back/Forward is pending keep the first snapshot. A navigation pending for more than 10 s counts as abandoned, and the next click snapshots afresh.
    - Known gap (rare): after an abandoned soft navigation, a browser Back before the next click or route change restores the click-time position.
  - Earlier attempts (a settle debounce, then resuming on a timeout or on wheel/key input) each reopened the stray-scroll or momentum case in code review. Browsers can emit a stray scroll to 0 mid-navigation, before the URL changes, which overwrote the real position.
  - `lenis.resize()` runs before every jump. Lenis clamps to its cached page height, which is stale coming from a short page (the full item page), so jumps to `#playground` stopped short.
- **Share images:**
  - `ogImage(src, { at, gravity })`. Buildforce Loader uses the frame at 1s, centre-cropped; its first frame is blank.
  - `og:image:type` and `og:image:alt` are now set on every page.
- **Structured data:**
  - `VideoObject`: `uploadDate` from the Cloudinary version, `dateCreated` from the item year.
  - `ImageObject` for image items.
  - `BreadcrumbList` on both.
  - Validator: 0 errors, 0 warnings.
- **The sitemap** now lists 14 URLs, including all 10 Playground items.
- **Verified in headless Chrome:**
  - Open, Previous/Next, Escape, scrim click, Back/Forward and focus return all behave as intended, and the page behind never moves.
  - Direct visits render the full page.
  - Homepage screenshots are pixel-identical to the previous build.
  - Existing scroll tests pass.
