# Portfolio Refactor Plan

_Created 2026-09-28. Living document: update as phases land._

## Goals

- Fix the architecture so pages are templates filled with data, not hand-built one-offs.
- Make every animation owned by the component it animates (no global class-name scanning).
- Separate content from presentation behind a single "content seam" so a CMS can be added later without touching components.
- Keep the site looking and feeling the same. This is a refactor, not a redesign.

## Decisions

| # | Decision | Outcome |
|---|---|---|
| 1 | Sanity CMS | **Skip for now.** Build the content seam (`lib/content.ts`) so it can be added later. Content files are shaped like Sanity documents. |
| 2 | Motion fidelity | **Visual parity is required.** The SplitText swap is prototyped in isolation first and only adopted if it looks the same. Cleaner code that looks different is rejected. |
| 3 | `/about` page | **Keep.** It will be used later. It's not treated as dead code. |
| 4 | Workflow | **One PR per phase.** Pause for review after each one. |

## Findings

### Architecture
- Every page is `"use client"`, so case study pages can't export `metadata`. All projects share one title and OG image.
- `viewport` in `app/metadata.ts` is never exported from `app/layout.tsx`, so Next ignores it.
- There's one hand-built route per project (`app/projects/*/page.tsx`, 220–612 lines each) instead of `app/projects/[slug]/page.tsx`.
- Project content is split between `data/designProjects.ts` and page JSX. Pages index projects by array position (`designProjects[1]`).
- `ReactLenis` and `CursorDot` are mounted per page instead of once in the layout.

### Animation
- Hooks scan the whole document for class names (`.split-type-animation`, `.stack-animation`, `.image-scale-animation`).
- `useSplitTypeAnimation()` is called from the page, `ProjectHero`, `IndexProjects`, and every `ProjectSectionContent`. Each call re-processes every matching element on the page, which duplicates splits and ScrollTriggers.
- `hooks/useCursorAnimation.ts` and `components/Button.tsx` remove listeners using new anonymous functions, so listeners are never removed. The cursor collects targets once on mount and misses elements added later (e.g. the modal).
- `components/IndexProjects.tsx`: the timeline is built with desktop `mobileValues` before the resize effect runs and is never rebuilt, so mobile gets desktop values.
- Responsiveness is handled three ways (`useIsMobile`, `useIsTouch`, inline `innerWidth`).
- There's no `prefers-reduced-motion` support.
- `split-type` + manual `innerHTML` span-wrapping + clip-path could be replaced by GSAP SplitText (`mask: "lines"`), which is free since GSAP 3.13. Adoption depends on the Phase 3 prototype.

### Components
- `IndexProjects.tsx` (676 lines) repeats the same markup and timelines three times.
- `MediaImage` and `MediaItem` overlap. `MediaItem` uses CSS `background-image`, which skips `next/image` optimisation.
- `TransitionLink` always calls `preventDefault()`, which breaks cmd/ctrl-click, and does a full page reload on mobile. Its props are typed `[key: string]: any`.
- `ProjectEnd`: `process.item1`–`item5` should be an array. `project` and `prototype` should be a `related` list derived from data.
- `ProjectSectionMedia` takes a Tailwind class string as the background colour (`"bg-[#BEB39E]"`). That breaks once content lives outside scanned source files. Use a hex value applied via `style`.
- Nav items are `<li onClick>` / `<div onClick>`, so they aren't keyboard-accessible. The modal has no focus trap and no dialog semantics.

### Data, hooks, dependencies
- Dead code: `components/IndexDemos.tsx`, `data/codeDemos.ts`, `app/projects/playground/page.module.css`.
- `GridItem` is defined twice with different shapes. `useModal` takes `any[]`.
- Unused dependencies: `cloudinary`, `next-cloudinary`, `lenis` (direct). `@studio-freight/react-lenis` is deprecated in favour of `lenis/react`.
- React 18.3 with Next 16. ESLint 9 with a legacy `.eslintrc.json`, and `next lint` was removed in Next 16, so linting is probably broken (verify in Phase 1).

## Target structure

```
app/
  layout.tsx                 server; mounts SmoothScroll, Cursor, Nav, Footer once
  page.tsx                   server; getProjects() → client sections
  about/page.tsx             kept as-is for later
  projects/[slug]/page.tsx   one template + generateStaticParams + generateMetadata
content/                     typed, CMS-shaped data
  projects/strava-growth.ts, buildforce.ts, buildforce-leadership.ts
  playground.ts
lib/
  content.ts                 getProjects(), getProject(slug)  ← the content seam
  types.ts                   Project, Section, Block (discriminated union), Media
  gsap.ts                    registers plugins once
components/
  ui/          Button, Badge, Avatar, Tooltip, Dialog, Media
  layout/      Nav, Footer, SmoothScroll, Cursor, TransitionLink
  home/        Intro, FeaturedProjects, Playground
  case-study/  Hero, Section, BlockRenderer, End, blocks/{Text,Media,Stats,Quote}
  motion/      SplitReveal, ImageReveal, Stack
```

**Core rule:** each component animates only itself, using `useGSAP(fn, { scope: ref })` and `gsap.matchMedia()` for breakpoints and reduced motion. Blocks must own their animation before content can be rendered from data. That's why the motion work comes before the content model.

### Content model sketch

```ts
type Media =
  | { type: "image"; src: string; alt: string; caption?: RichText }
  | { type: "video"; src: string; alt: string; caption?: RichText; poster?: string };

type Stat = { title: RichText; value: string; footnote?: string; direction?: "up" | "down" | "none" };

type Block =
  | { _type: "text"; headline: RichText; body: RichText; animateHeadline?: boolean }
  | { _type: "media"; layout: "full" | "double" | "mockup"; media: Media[]; background?: { color?: string; image?: string } }
  | { _type: "stats"; media: Media; stats: Stat[]; position: "left" | "right" }
  | { _type: "quote"; writer?: { name: string; role?: string; image?: string }; snippet: RichText; full?: RichText }
  | { _type: "group"; blocks: Block[] };

type Section = { number: string; label: string; icon?: AnimatedIconType; blocks: Block[] };

type Project = {
  slug: string; title: string; company: string; role: string; year: string; duration: string;
  problem: string; solution: string; skills: string[]; team: TeamMember[] | string;
  cover: { primary: Media; secondary: Media };
  sections: Section[];
  process: string[];
  related?: string[]; // slugs
};
```

The `RichText` format (e.g. a small highlight syntax vs. Portable Text-shaped arrays) gets decided in Phase 4. It must be serialisable, because JSX in data can't come from a CMS later.

## Phases

Each phase is one PR. Visual parity is checked before merge. Pause for review after each one.

### Phase 1: Cleanup and tooling (low risk)
- Delete `IndexDemos`, `data/codeDemos.ts`, `app/projects/playground/page.module.css`. Keep `/about`.
- Remove the `cloudinary`, `next-cloudinary`, and direct `lenis` dependencies (re-add `lenis` in Phase 2 via `lenis/react`).
- Migrate to an ESLint flat config (`eslint.config.mjs`) and fix the `lint` script.
- Upgrade to React 19 + types, and GSAP to 3.13+.
- Export `viewport` from the layout and reconcile theme colours.

**Status: done.** Notes:
- `@studio-freight/react-lenis` bundles React 18 and can't coexist with React 19, so the import swap to `lenis/react` was pulled into this phase. Mount locations are unchanged (still per page; moving them is Phase 2).
- `next-view-transitions` bumped 0.3.4 → 0.3.5 for React 19 peer support.
- Theme colour set to `#f2f2f2` (matches `surface-background`); the duplicate `<meta>` in `<head>` was removed.
- ESLint preset kept at parity (`core-web-vitals` only). Adding the `typescript` preset can come later.
- Lint fixed in `ProjectSectionMedia` (component defined during render → JSX value).
- **Known lint errors, deferred:** `react-hooks/set-state-in-effect` in `components/InitialLoadTransition.tsx` (Phase 2) and `components/Modal.tsx` (Phase 5). Both are being rewritten, so they aren't patched now.

### Phase 2: Foundation
- `SmoothScroll` (via `lenis/react`) and `Cursor` mounted once in `app/layout.tsx`. Remove per-page mounts.
- `lib/gsap.ts` registers plugins once.
- Cursor uses event delegation (`closest("[data-cursor-text]")`), so late-mounted elements work and cleanup is correct.
- Fix listener cleanup in `Button`.
- `TransitionLink`: respect modifier keys and `target`, no full reload on mobile, proper prop types.
- Nav and Footer use real links or buttons.
- Split pages into server components with client islands where possible.

### Phase 3: Motion rewrite (prototype first, then adopt)
1. **Prototype (isolated):** build `SplitReveal` with GSAP SplitText on a throwaway route (e.g. `/lab/motion`, not linked or indexed). Render the same headlines side by side: current `split-type` implementation vs. new. Check line breaks, timing, easing, skew/clip reveal, resize behaviour, and font-load behaviour.
2. **Decision gate:** if it looks the same, adopt SplitText. If not, keep `split-type` but still move it into a scoped `SplitReveal` component (the architectural fix doesn't depend on the library).
3. Build `ImageReveal` and `Stack` as scoped components replacing `useImageScaleAnimation` / `useStackAnimation`.
4. Add `gsap.matchMedia()` for breakpoints and `prefers-reduced-motion`. Remove `useIsMobile` / `useIsTouch` where animation-only.
5. Remove the `/lab` route before merge.

### Phase 4: Content model
- `lib/types.ts`, `content/projects/*.ts`, `lib/content.ts`.
- `app/projects/[slug]/page.tsx` with `generateStaticParams`, `generateMetadata` (per-project title and OG image), and `BlockRenderer`.
- Migrate Strava first (smallest), verify parity, then Buildforce and Buildforce Leadership.
- `ProjectEnd` → `case-study/End` with `process: string[]` and `related` derived from data.
- Media background colour becomes a hex value applied via `style`.

### Phase 5: Homepage
- `FeaturedProjects` rendered from `getProjects()`, with timelines generated in a loop and mobile values via `matchMedia`.
- Playground uses a native `<dialog>`-based `Dialog` (focus handling, Escape, arrow keys) and the unified `Media` component.
- Type `useModal` generically (or fold it into the Playground).

### Later: Sanity (deferred)
- Sanity schemas mirror `lib/types.ts`. `lib/content.ts` switches to GROQ. Studio at `/studio`. Revalidation webhook.
- Decide on image hosting then: keep Cloudinary URLs or move to the Sanity image CDN.
