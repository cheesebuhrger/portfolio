# Roadmap: Polish, Modernization and Design System: Plan

_Created 2026-09-30. Status: in progress (launch admin and §2 optional items done 2026-11-17; decisions settled, see end). Covers what comes after `refactor-plan.md`, `seo-aeo-plan.md` and `frames-links-plan.md`, all shipped (PRs #1–#9). Counts in the audit sections are from `main` at 95b1378._

## Goal

1. **Close out launch:** do the remaining admin steps and small fixes.
2. **Modernize the component code:** remove patterns from the "first version" era. Nothing visible changes.
3. **Tighten the token system:**
   - named spacing aliases instead of the same breakpoint chains repeated everywhere;
   - one column grid that every section aligns to.
4. **Showcase the system:** a Material.io-style documentation site for the design system this portfolio uses, optionally backed by a self-made component package. Like the Sanity work, this is partly a portfolio piece in its own right.

Parts 2–3 prepare for part 4: the docs site can only document tokens and components that actually exist in clean form.

**Styling architecture (decided 2026-11-17): hybrid.** Tokens are plain CSS variables in `@flxra/tokens`, owned by no framework. `@flxra/ui` components are styled with CSS Modules (in `@layer components`) and ship as compiled CSS, so apps that use them don't need Tailwind. The portfolio keeps Tailwind for page layout, with its theme mapped to the same variables. Components accept `className` for placement only (margin, width, grid span); their appearance changes through `variant`/`size` props or token overrides. Reason: avoid tying the design system to Tailwind's upgrade cycle and plugin ecosystem (`fluid-tailwind` is already unmaintained and v3-only).

---

## 1. Launch admin (no code)

- Resubmit `https://buhrduong.com/sitemap.xml` in Google Search Console, since the domain changed.
- Submit the same sitemap in Bing Webmaster Tools (it also feeds ChatGPT search and Copilot).
- Run LinkedIn Post Inspector on the homepage and one frame URL to refresh cached previews.
- Delete the merged local branches. `git branch --merged main` misses branches whose PRs were squash-merged, so check each branch's PR state (`gh pr list --state merged --head <branch>`) and delete those with `git branch -D`.

**Done 2026-11-17:** sitemaps resubmitted (Google, Bing), LinkedIn previews refreshed, merged branches deleted (6 via `git branch --merged`, plus `feat/llms-txt-speed-insights`; `refactor/phase-2…5` kept because their local tips differ from what their PRs merged, so they may hold unpushed work), and the unused Netlify site and GitHub integration removed (all domains are served by Vercel; DNS is at Porkbun).

## 2. Fixes and polish

| Item | Why | Size |
|---|---|---|
| Frame page Nav on phones | Below `md` only the name shows, so there's no way to Projects/Frames except the logo. Deferred on 2026-09-29. **On hold (2026-11-17).** | Small |
| ~~Chapter 2/4 frame descriptions~~ | They used the fallback line. **Done (PR #10, 2026-11-17).** | Writing only |
| Homepage refresh position | Refreshing mid-page lands at an unexpected position. It also happens on the live site from before the refactor, so the pinned GSAP sections are the likely cause: the browser restores the old `scrollY` before ScrollTrigger adds pin spacers, and `SmoothScroll.tsx` skips first load. Options: always start at the top on refresh, or re-apply the saved position after ScrollTrigger's refresh. **On hold (2026-11-17).** | Medium, investigate first |
| Custom 404 page | No `app/not-found.tsx`, so every unknown URL shows Next's generic "This page could not be found." `/frames/typo` already gets the homepage Nav (`usesHomeChrome` matches `/frames/`); other bad URLs get the back-button Nav. Fix: a designed `not-found.tsx` with the homepage Nav everywhere. **On hold (2026-11-17).** | Small |
| ~~Optional: `llms.txt`~~ | A plain-text site summary for AI answer engines. **Done (PR #10, 2026-11-17):** generated from content like the sitemap. | Tiny |
| ~~Optional: Vercel Speed Insights~~ | Real-user Core Web Vitals, next to the existing Analytics. **Done (PR #10, 2026-11-17):** uses the `/react` entry like Analytics. | Tiny |
| ~~Optional: media via `buhrduong.com/media`~~ | A rewrite to Cloudinary would put share images and video on the primary domain. **Skipped (2026-11-17):** cosmetic benefit; every file would detour through Vercel bandwidth. | Small |

---

## 3. Component modernization

Code-only changes: every page should be pixel-identical before and after (verify with the headless-Chrome diff used in the refactor). **Exceptions, reviewed individually with before/after screenshots:** the Button duration, `w-screen` → `w-full` (pinned sections get one scrollbar-width narrower on desktop) and the `bg-fixed` replacement (scroll behaviour of the End background changes).

### Findings

| Pattern | Where | Modern replacement |
|---|---|---|
| `React.FC<Props>` (8) | `ui/Button`, `ui/Media`, `icons/AnimatedIcon`, `case-study/Hero` (×2), `Section`, `blocks/StatCard`, `blocks/QuoteBlock` | Plain function components with typed props: `function Button({ … }: ButtonProps)`. `React.FC` is no longer recommended: it hides the return type and used to add `children` implicitly. |
| `import React` for JSX (2) | `ui/Button`, `case-study/Section` | Not needed since the automatic JSX runtime. Import only the hooks. |
| Template-string `className` (17 in 12 files) | `ui/Avatar`, `Badge`, `Dialog`, `layout/Footer`, `motion/stack`, `AnimatedIcon`, `Hero`, `Section`, and the `MediaBlock`, `StatsBlock`, `StatCard` and `QuoteBlock` blocks | In the portfolio, a `cn()` helper (`clsx` + `tailwind-merge`) in `lib/cn.ts`. (`@flxra/ui` uses plain `clsx` with CSS Modules.) It merges conditionals cleanly and lets a passed-in `className` override defaults instead of conflicting with them. |
| Hand-rolled variant maps | `ui/Button` (and `Badge`) | `cva` (class-variance-authority) or a typed `variants` object. This is what the component package would use later (§6). |
| Invalid class `duration-30` (2) | `ui/Button:82, 84` | Tailwind has no `duration-30`, so the transition currently falls back to the default 150 ms. **Decided: 250 ms**, matching the label flip. This is a **visible** change (from 150 ms), so review it. |
| Tailwind v2 names `flex-shrink-0`, `flex-grow` (3) | `frames/FrameDetail`, `blocks/QuoteBlock`, `ui/Dialog` | `shrink-0`, `grow` |
| `w-screen` (6) | `home/FeaturedProjects` (×3), `case-study/Hero`, `case-study/End` (×2) | `w-full`. `100vw` includes the scrollbar on desktop browsers, which can add a horizontal scroll. Check that the pinned sections still size correctly. **Visible** on desktop (scrollbar width), so review it. |
| Arbitrary values `z-[…]`, `rounded-[…]` (10) | `Cursor`, `FeaturedProjects`, `End`, `Badge` | A named z-index scale (`z-cursor`, `z-dialog`, `z-nav`, …) and radius tokens (`rounded-full` for the `1000px` cursor; a new `xs: 4px` radius token for the badge, since the config only defines sm/md/lg and v4's built-in `rounded-xs` is 2px). |
| Commented-out JSX (5 blocks) | `layout/Nav` (2), `layout/Footer` (3) | Delete it; git history keeps it. |
| Padding-bottom aspect ratio | Fixed in `FrameDetail` (PR #9); no others remain | Already `aspect-*` utilities. |
| `bg-fixed` + inline `backgroundImage` | `case-study/End:288–289` | `background-attachment: fixed` doesn't work on iOS and forces repaints. Use a `next/image` / `Media` layer with a GSAP or CSS scroll-driven parallax. |
| Large hardcoded GSAP timelines | `case-study/End` (~350 lines) | Split into a hook per panel (`useEndPanels`), with durations and easings from shared motion tokens (§4). |
| Unused tokens | `surface-swiper`, `--black-60`, `--black-70`, `--pink-02` | Remove them, or document them as reserved. |
| `mx-auto w-full` without a max width | `FrameDetail` and others | `mx-auto` does nothing without a `max-w-*`. Remove it, or give the grid a max width (§5). |

### Tailwind 3.4 → 4: deferred

With the hybrid architecture, Tailwind is only the portfolio's layout tool, not the design system's foundation, so the migration no longer has to come first. It's still worth doing eventually: v3 will age, `fluid-tailwind` is unmaintained, and v4 reads CSS variables natively (`@theme inline`). The reviewed plan is parked in `docs/tailwind-v4-plan.md`; refresh it against the code before using it.

---

## 4. Token aliases

### Findings: repeated responsive spacing chains

| Chain | Count | Value (base / md / lg) |
|---|---|---|
| `gap-4 md:gap-6 lg:gap-8` | 16 | 16 / 24 / 32 px |
| `p-4 md:p-6 lg:p-8` | 11 | 16 / 24 / 32 |
| `px-4 md:px-6 lg:px-8` | 5 | 16 / 24 / 32 |
| `pr-4 md:pr-6 lg:pr-8`, `pl-4 md:pl-6 lg:pl-8` | 5 | 16 / 24 / 32 |
| `gap-y-8 md:gap-y-12 lg:gap-y-16`, `gap-8 md:gap-12 lg:gap-16` | 3 | 32 / 48 / 64 |
| `pb-32 md:pb-40 lg:pb-48` | 1 (+ variants) | 128 / 160 / 192 |
| `pt-16 md:pt-20 lg:pt-24` | 1 | 64 / 80 / 96 |
| `px-2 md:px-4 lg:px-6` (dialog header) | 1 | 8 / 16 / 24 |

- **The 16/24/32 step appears 37 times across 13 files.** It's the site's gutter: both the page margin and the gap between columns. It just has no name.
- **One-off variants look accidental:**
  - `p-4 md:p-6 lg:p-4 xl:p-8` shrinks at `lg`;
  - `gap-16 md:gap-6 lg:gap-8`, `gap-12 md:gap-6 lg:gap-8` and `gap-8 md:gap-6 lg:gap-8` have a bigger gap on mobile than on tablet.

  Check each against the live design: keep it deliberately or snap it to the scale.

### Approach: responsive CSS variables, exposed as spacing tokens

```css
/* @flxra/tokens: every variable is prefixed --flxra-* */
:root {
  --flxra-space-gutter-sm: 0.5rem; /* 8: dialog header */
  --flxra-space-gutter: 1rem;      /* 16 */
  --flxra-space-stack:  2rem;      /* 32: gap between stacked blocks */
  --flxra-space-section: 8rem;     /* 128: space below a section */
  --flxra-space-page-top: 4rem;    /* 64 */
}
@media (min-width: 48rem) { :root { --flxra-space-gutter-sm: 1rem;   --flxra-space-gutter: 1.5rem; --flxra-space-stack: 3rem; --flxra-space-section: 10rem; --flxra-space-page-top: 5rem; } }
@media (min-width: 60rem) { :root { --flxra-space-gutter-sm: 1.5rem; --flxra-space-gutter: 2rem;   --flxra-space-stack: 4rem; --flxra-space-section: 12rem; --flxra-space-page-top: 6rem; } }
```

The portfolio's Tailwind config maps short names to them, so every utility works: `p-gutter`, `px-gutter`, `gap-gutter`, `gap-y-stack`, `pb-section`, `pt-page-top`, and `px-gutter-sm` for the dialog header (8/16/24, one step below the gutter; not half of it). The same `--flxra-*` names are what `@flxra/ui`'s CSS Modules read, so the two can't diverge. Existing colour primitives (`--pink-05` etc.) are renamed to `--flxra-*` in step 4 too.

- **Why variables rather than `@apply` classes:**
  - One token works with every property (padding, gap, margin, inset, even GSAP offsets) instead of needing a class per property.
  - The breakpoint logic lives in one place.
- **Why not fluid (`~p-4/8`):** fluid values change size continuously between breakpoints, which is a visible change. Stepped variables keep parity. Switching to fluid later becomes a one-line change per token.
- **Also worth naming:**
  - a **z-index scale** and **radius** tokens (see §3);
  - **motion tokens**: durations and eases now written inline in GSAP calls (`power3.out`, `0.8`, …) become `motion.duration.base`, `motion.ease.emphasized`, shared by CSS and GSAP.

---

## 5. Column grid

### Findings

Sections pick their own column system:

| Component | Columns |
|---|---|
| `Nav` | 12 at every size |
| `FeaturedProjects` | `md:grid-cols-12` (×2) and `md:grid-cols-2` |
| `case-study/Hero` | `md:grid-cols-6 lg:grid-cols-12` |
| `TextBlock`, `MediaBlock` | `grid-cols-1 md:grid-cols-2 xl:grid-cols-12` (MediaBlock also `xl:grid-cols-6`) |
| `QuoteBlock` | `grid-cols-1 lg:grid-cols-2` |
| `StatsBlock` | `md:grid-cols-2` |
| `Frames` | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| `Footer` | `md:grid-cols-4` |
| `about/page` | `grid-cols-1 md:grid-cols-2` |
| `End`, `Hero`, `Section`, `StatsBlock`, `FeaturedProjects`, `FrameDetail` | Flex with fractional widths (`w-1/2`, `lg:w-2/3`), 22 in total |

Most of these would fit a 12-column grid (2, 3, 4 and 6 all divide 12). But the columns are computed separately inside each section with different gaps, so edges only line up by coincidence. A "half" in a flex row with `gap-8` isn't the same line as `col-span-6` in a grid with `gap-6`.

### Approach

- **One grid definition:**
  - 4 columns below `md`, 8 at `md`, 12 at `lg` and up;
  - the gap is `--space-gutter` and the outer margin is `--space-gutter`, so the page edge and the column gaps share one rhythm.
  - Modelled on Material 3's compact / medium / expanded idea, but switching at the site's own `md` (768px) and `lg` (960px) breakpoints, not M3's 600/840dp.
- **Delivered as:**
  - a `grid-layout` utility (or a `<Grid>` / `<Grid.Item span={{ base: 4, md: 4, lg: 6 }}>` component);
  - sections use `col-span-*` / `col-start-*` instead of their own `grid-cols-*`;
  - a subgrid (`grid-cols-subgrid`) lets nested blocks inherit the parent's columns instead of starting a new grid.
- **A grid overlay for development:** press **G** to show the columns over the page. This is useful for the migration, and a nice thing to demo in the design-system site.
- **This one is visible:** snapping sections to shared columns will move some edges by a few pixels. Migrate one section per commit with before/after screenshots, and decide per section.

### Max content width (decided 2026-11-17)

The grid is capped at **2400px, centred**. Wider screens get equal margins on both sides. (Today everything stretches edge to edge on ultrawide screens.)

---

## 6. Design system showcase

### What it is

A documentation site for the portfolio's design system, in the spirit of material.io. Name: **Flxra Design System** (flora, respelled).

- **Foundations:** color (primitive → semantic tokens: `--pink-05` → `surface-secondary`), type (Surt / Editorial Old / Geist, the fluid scale, the `-p` paragraph variants and why they exist), spacing (§4), grid (§5, with the live overlay), radius, elevation/z-index, motion (tokens plus live GSAP demos: SplitReveal, scale reveal, the cursor).
- **Components:** Button, Badge, Avatar, AvatarGroup, Tooltip, Dialog, Media, AnimatedIcon, plus the case-study blocks as "patterns". Each page has a live demo, variants, a props table, usage do/don't, accessibility notes and the code.
- **Why it's a portfolio piece:** it shows design-engineering judgement (token architecture, API design, documentation), not only visuals.

### Architecture options

| Option | Shape | Pros | Cons |
|---|---|---|---|
| **A. Route in this app** | `/system/*` in the portfolio, reading the real tokens and components | Fastest; zero drift, since it documents the code that ships | Not a real "library"; everything is coupled |
| **B. Monorepo** | pnpm workspaces: `apps/portfolio`, `apps/flxra` (docs site), `packages/tokens`, `packages/ui` | A real package boundary, consumed by two apps; the standard industry setup (Turborepo) | Repo restructure; build tooling (tsup, CSS Modules bundling) |
| **C. Separate repo, published to npm** | `@flxra/ui` on npm, versioned with Changesets | The most "real"; others can install it | Two repos to keep in sync; every change is publish → bump → install |

**Decided 2026-11-17: go straight to B; no `/system` route in the portfolio.** Do **C** only if there's a reason to.

1. **B:** a Turborepo monorepo.
   - `packages/tokens`: plain CSS variables (`--flxra-*`), plus motion tokens as TS for GSAP. No Tailwind.
   - `packages/ui`: components styled with CSS Modules in `@layer components`, variants via `cva` or a typed map with `clsx`, shipped as compiled CSS; a `"use client"` boundary only where needed. No Tailwind.
   - `apps/flxra`: served at **`buhrduong.com/flxra`** via a Vercel rewrite or microfrontend (decided).
   - The portfolio then consumes `@flxra/ui` like any other app, which is the actual showcase claim: "this site is built from my library."
2. **C (npm publish):** only if a second consumer appears. B already demonstrates the skill.

### Tooling to decide during §6

- **Docs content (decided: MDX only):** MDX pages with a small `<Demo>` / `<PropsTable>` kit. Storybook is not used; it can be added later as a dev workbench if the component count grows.
- **Props tables:** generated from TypeScript (`react-docgen-typescript`), so they don't drift.
- **Token source:** hand-written CSS variables are enough at this size. Style Dictionary / DTCG JSON is only worth it if tokens need to sync with Figma variables, which is a nice extra story if the Figma file uses variables.
- **Accessibility and visual tests:** `axe` on each demo, plus screenshot tests. The existing headless-Chrome diff can become a Playwright suite.

---

## 7. Later

- **Sanity CMS** (from `refactor-plan.md`): the `lib/content.ts` seam is ready. If §6 comes first, Sanity schemas can map one-to-one to the documented block components.
- **Code-project case-study template** (from `refactor-plan.md`).
- **About page:** `noindex` until it's built; add `ProfilePage` JSON-LD once it's real.

## Suggested order

1. **Launch admin (§1)** and the small fixes (§2). A day or two, independent PRs.
2. **Modernization (§3)**, code-only, pixel-identical. One PR, or split UI primitives / case study / home.
3. **Monorepo:** Turborepo with `apps/portfolio` and empty `packages/tokens` (`@flxra/tokens`) and `packages/ui` (`@flxra/ui`). Pixel-identical.
4. **`@flxra/tokens` + aliases (§4):** move the colour primitives and semantic tokens into plain CSS variables, add the spacing aliases, z-index, radius and motion tokens. The portfolio's Tailwind config maps to them. Pixel-identical except the accidental one-offs, reviewed individually.
5. **Column grid (§5)**, visible changes, reviewed per section. One PR per area (home, case study, frames, nav/footer).
6. **`@flxra/ui` in CSS Modules:** move the primitives (Button, Badge, Avatar, Tooltip, Dialog, Media, AnimatedIcon) one at a time; the portfolio consumes them. Pixel-identical except the approved Button 250 ms.
7. **Flxra docs app (`apps/flxra`)** at `buhrduong.com/flxra`: foundations first, then components.
8. **Tailwind v4 migration of the portfolio**, when convenient, from the parked `docs/tailwind-v4-plan.md`.
9. **Sanity (§7).**

**Process for every step:** write the step's plan first, run it through a review with the latest Claude model (currently Fable 5.1) to check it's sound, then implement. Each step pauses for review, as in the refactor. Every PR runs `/code-review` and the headless-Chrome diff against production.

## Verification (applies to every code step)

- `npm run lint`, `npm run typecheck`, `npm run build`.
- Pixel diff against production at the usual scroll positions (home, one case study, a frame page, the dialog), at phone, tablet and desktop widths. §3, §4 and the Tailwind migration expect **zero** diff. §5 expects only the approved diffs.
- The existing scroll/navigation behaviour tests still pass.

## Decisions

1. ~~Migrate to Tailwind 4 before the token work?~~ **Decided 2026-11-17: yes, then revised the same day: deferred** to step 8 after choosing the hybrid architecture (decision 6).
2. ~~Button transition duration?~~ **Decided 2026-11-17: 250 ms** (matches the label flip; becomes `motion.duration.fast`). Applied when Button moves to CSS Modules (step 6), which comes before the Tailwind 4 migration (step 8). If Button were still on Tailwind at step 8, note that v4 turns `duration-30` into a real 30 ms.
3. ~~Max content width at `xxl`: cap or full-bleed?~~ **Decided 2026-11-17: cap the grid at 2400px, centred.** Wider screens get equal margins on both sides.
4. ~~Design system structure, name, URL?~~ **Decided 2026-11-17:** monorepo (option B) from the start; named **Flxra Design System**; packages `@flxra/*`; docs at `buhrduong.com/flxra`.
5. ~~Docs tooling?~~ **Decided 2026-11-17: MDX only.**
6. ~~Styling architecture?~~ **Decided 2026-11-17: hybrid.** Tokens as plain CSS variables, `@flxra/ui` in CSS Modules, portfolio keeps Tailwind mapped to the tokens. See the note under Goal.
