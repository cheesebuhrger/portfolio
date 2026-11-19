# §3 Component Modernization (narrowed): Plan

_Created 2026-11-17. Status: revised after Fable 5.1 review (see end), awaiting approval. §3 of `roadmap-plan.md`, narrowed under the hybrid styling decision. Branch `refactor/modernize` from `main`._

## Goal

Remove "first version" patterns that will survive the later move of the basic components into `@flxra/ui`. Pages look identical, except two approved visible changes, each in its own commit with before/after screenshots.

**Deferred to step 6 (`@flxra/ui` in CSS Modules), not done here:** `cn()`/`cva` and template-string `className` cleanup on the basic components, the named z-index and radius scales, and the Button 250 ms change. Doing them now would mean restyling the same components twice.

## Changes (one commit each)

### 1. `React.FC` → plain typed function components

8 components: `ui/Button`, `ui/Media`, `icons/AnimatedIcon`, `case-study/Section`, `case-study/Hero` (`HeroDetail`, `Hero`), `blocks/StatCard`, `blocks/QuoteBlock`.

```tsx
// before
const Button: React.FC<ButtonProps> = ({ label, … }) => { … };
// after
const Button = ({ label, … }: ButtonProps) => { … };
```

Matches the existing style elsewhere (e.g. `End`: `const End = ({ … }: EndProps) => …`), so arrow-function components stay; only the `React.FC` annotation goes. Drop `import React` (`Button`, `Section`); keep the hook imports. `React.MouseEvent` and other `React.X` types stay as they are: `@types/react` exposes the `React` namespace globally, and ten files already rely on that (`Dialog.tsx`, `Nav.tsx`, `layout.tsx`, …). `Media` takes `props` (discriminated union) and stays that way: `(props: MediaProps)`.

### 2. Dead code

- Commented-out JSX: `layout/Nav.tsx:67, 85`; `layout/Footer.tsx:21, 41, 57`. Explanatory comments (e.g. `FrameDetail.tsx:23`) stay.
- Commented-out CSS in `app/global.css`: the dark-mode block, two `@layer utilities` blocks, the `.project-hero-text` rules.
- Unused classes in `global.css` `@layer base`: `.project-section`, `.project-section-two` (no references in `app/`, `components/`, `content/`).
- Unused tokens: `surface.swiper` and `text.highlight` (points to `--gold-60`, which is never defined) in `tailwind.config.ts`; `--black-60`, `--black-70`, `--pink-02` in `global.css` (each appears only at its definition).

Expected diff: zero. Also diff the compiled CSS before and after commits 2–3: only the removed selectors may drop (Tailwind also scans comments, so e.g. `h-96` from the deleted Footer comment disappears; it's unused).

### 3. Tailwind v2 class names

`flex-shrink-0` → `shrink-0` (`FrameDetail.tsx:22`, `QuoteBlock.tsx:30`); `flex-grow` → `grow` (`Dialog.tsx:126`). Identical CSS in v3. Expected diff: zero.

### 4. `w-screen` → `w-full` (visible, review)

`FeaturedProjects.tsx:237, 258, 312`; `case-study/Hero.tsx:81`; `case-study/End.tsx:288, 292`. `100vw` includes the scrollbar on browsers with classic (non-overlay) scrollbars, so these elements are wider than the page and can cause sideways overflow. `w-full` fixes it; with a classic scrollbar, the elements get one scrollbar-width narrower. On macOS with overlay scrollbars (the default), no change. `h-screen` is untouched.

Check: pinned sections (`FeaturedProjects` intro and project list, case-study `Hero` with `stackHero`, `End` panels) still pin and size correctly. Screenshots must run **with visible scrollbars**: headless Chrome hides them by default, which would make `w-screen` and `w-full` identical; launch without `--hide-scrollbars` and assert `innerWidth - documentElement.clientWidth > 0`. Expect pin start/end positions to shift by the height of the horizontal scrollbar that disappears: a side effect of the fix, not a bug.

### 5. `End` process timeline: loop instead of five copies

`End.tsx:97–282` repeats the same three tweens for `process-item-1…5`, alternating direction (odd items enter from the right with `skewX: 30`, even from the left with `-30`). Replace with a loop over a constant `PROCESS_COUNT = 5` (the markup always renders exactly five items; `process` is typed `string[]`, so looping over its length could build a different timeline than the markup) that builds the identical timeline:

```ts
for (let i = 0; i < PROCESS_COUNT; i++) {
  const from = i % 2 === 0 ? 1 : -1; // odd items (1, 3, 5) from the right
  const item = `.process-item-${i + 1}`;
  processTimeline
    .fromTo(item, { xPercent: 100 * from }, { xPercent: 0, ease, duration }, i === 0 ? undefined : tighten)
    .fromTo(`${item} .line-mask > .line`, { y: "100%", skewX: 30 * from }, { y: 0, skewX: 0, duration, ease, delay: skewDelay }, "<")
    .fromTo(`${item} .line-mask`, { clipPath: CLIP_HIDDEN }, { clipPath: CLIP_SHOWN, duration, ease }, "<");
}
```

Also: the three panel pins (`panel-1/2/3`) become one loop; `useGSAP` gets a `scope` ref on the `<section>` so its selectors (`.panel-1`, `.process-item`, …) can't match elements outside `End`. `document.querySelectorAll(".process-item")` ignores `scope`, so it becomes `gsap.utils.toArray(".process-item")`. **ScrollTrigger creation order is preserved** (it refreshes in creation order): the process timeline, then the three `set`s, then pins 1 → 2 → 3, then `.process-fade`. Timings, eases and order unchanged.

Verification beyond screenshots: dump the built timeline before and after in headless Chrome and diff. GSAP is on `window.gsap`; the timeline is `ScrollTrigger.getAll().find(st => st.vars.toggleActions).animation`, and for each child record targets, `startTime()`, `duration()`, `vars` and `vars.startAt` (the from-values). Also record every ScrollTrigger's `start`/`end` and creation order. Expected: identical.

### 6. `bg-fixed` background → clipped fixed layer (visible, review)

`End.tsx:288–289` uses `md:bg-fixed` with an inline `backgroundImage`. `background-attachment: fixed` is ignored on iOS/iPadOS Safari (the image just scrolls, at iPad widths ≥ md) and repaints on every scroll frame on desktop.

Replacement with the same look: **the image div** (`End.tsx:287–290`, already `relative z-10 overflow-hidden`, keeping `bg-surface-secondary` as the loading placeholder) gets `clip-path: inset(0)`. Not the `<section>`: that wraps the pinned panels, which become `position: fixed` while pinned, and clipping there would clip them and change their stacking. Inside the div, a `Media` image in a layer that is `fixed inset-x-0 top-0 h-lvh` at every width, `object-cover`. `h-lvh` rather than `bottom: 0`, so on iOS the image doesn't resize and re-crop as the toolbar collapses. `overflow: hidden` doesn't clip a fixed child, but `clip-path` does, so the image shows only through the div, exactly like a fixed background. Props: `alt=""` (decorative), `sizes="100vw"`, `unoptimized` (a new `Media` option: next/image's resize softened the photo's film grain, so it serves the original file as before), and **`imageScaleAnimation="none"`**: `Media` defaults to a 1.2× zoom-out reveal, which would add an animation and give it a ScrollTrigger on a fixed, viewport-filling element.

Risks to check: no ancestor of `End` may have `transform`, `filter`, `perspective` or `will-change: transform` (they'd make `fixed` relative to that ancestor instead of the viewport). Current ancestors: `CaseStudy` → page → layout `div.initial-load` (opacity animation only), `ReactLenis root` (no wrapper element). The view-transition rules apply to the `root` snapshot pseudo-elements, not to ancestors.

Visible: the fixed effect now works on iOS, and it applies at every width, including portrait phones (previously `md` and up only; portrait phones scrolled the image). Same file, so the same grain. Screenshots at several scroll positions through the image, at desktop, iPad, phone-landscape and phone widths.

_Decided during review (2026-11-19): the user chose the original file over next/image's resized copy, and the fixed effect on mobile too, so desktop and mobile match._

## Verification (all commits)

- `npm run lint`, `npm run typecheck`, `npm run build`.
- Baseline before any change: production build, headless-Chrome screenshots at 390, 768, 1280, 1600 and 2560 px of home (top and each pinned section), one case study (top, middle, the End image, panels, Explore more), a frame page, the frame dialog, about.
- Repeatable captures: scroll with `lenis.scrollTo(y, { immediate: true })`, call `ScrollTrigger.update()`, wait ≥ 2.5s (scrubbed pins lag 1s; toggle animations run ~1.5s); wait for images to finish loading; pause videos at `currentTime = 0`; mask `AnimatedIcon` (it cycles on a timer). Take the baseline **twice** to measure run-to-run noise before calling any diff "zero".
- After each commit: same screenshots; commits 1–3 and 5 expect **zero** diff; 4 and 6 show only the expected differences, reviewed with you.
- Commit 5: timeline dump diff, expected identical.
- `/code-review` before the PR.

## Review (Fable 5.1, 2026-11-17)

Folded in above:

- Commit 6: `Media`'s default zoom reveal would have added an animation (now `imageScaleAnimation="none"`); `clip-path` belongs on the image div, not the `<section>` (which holds the pinned panels); `h-lvh` for iOS; the visible scope is iPad and landscape iPhones, plus next/image re-encoding.
- Commit 4: headless Chrome hides scrollbars by default, which would have hidden the change; screenshots now run with scrollbars, asserted.
- Commit 5: loop over a fixed count of 5; keep ScrollTrigger creation order; make the scope real for `.process-item`; detailed timeline-dump recipe.
- Commit 1: keep `React.MouseEvent` (global namespace) instead of importing `MouseEvent`, matching ten other files.
- Commit 2: also remove `text.highlight` (undefined `--gold-60`); diff compiled CSS.
- Verification: steps to make scroll-driven screenshots repeatable, and a double baseline to measure noise.

Confirmed: every removed class/token is unreferenced; `React.FC` removal changes no typing (React 19 types); commit 3's CSS is identical; nothing in GSAP reads widths, so `w-full` is safe for the pins; the loop matches the existing timeline tween for tween; End has no transformed ancestors; a fixed `object-cover` layer matches `bg-fixed bg-cover bg-center`; iOS Safari ignores `background-attachment: fixed`.
