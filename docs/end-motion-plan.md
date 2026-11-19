# End section motion follow-ups

Follow-ups from the PR #12 review, all in `components/case-study/End.tsx` (the "Nitty Gritty" section at the end of every case study). Branch `refactor/end-motion`, off main after #12.

Same rules as the modernize plan: one commit per item, screenshot harness and GSAP timeline dump before/after each, stop for approval before any visible change.

## 1. Respect reduced motion (visible, for reduced-motion visitors only)

**Problem.** End's whole `useGSAP` setup (three panel pins, the scrubbed `.process-fade`, the slide/skew/unmask process timeline) runs regardless of `prefers-reduced-motion`. Every other animated component (`SplitReveal`, `Button`, `stack`, `useScaleReveal`, `FeaturedProjects`) gates its motion, through `withMotion` in `lib/gsap.ts` or its own `matchMedia`.

**Change.** Wrap the setup in `withMotion`, so reduced-motion visitors get the plain document flow: the five questions in place, then "The Nitty Gritty", "Want the Details?" and "Let's Connect" stacked normally, with no pins, fades or split text.

**Scope.** `useGSAP(() => withMotion(() => { ... }), { scope: sectionRef })`, the same as `SplitReveal`. A matchMedia created inside a scoped context inherits that context's selector, also when it re-runs after the media query changes (`gsap-core.js` `MatchMedia.add`: `_context && !context.selector && (context.selector = _context.selector)`). So End's class selectors stay limited to the section, and `withMotion` doesn't change. The comment in `FeaturedProjects.tsx` claiming the opposite is wrong; correct it in this commit (comment only, its explicit `gsap.matchMedia(ref)` stays). Verify that the selectors match nothing outside the section.

**Expected reduced-motion layout.** Panel 1 is one screen tall, with the five questions in their grid positions and "The Nitty Gritty" at full opacity. "Want the Details?" and the Let's Connect card follow at their content height, then the bottom padding and Explore. The Let's Connect link stays clickable (its `pointer-events-auto` overrides the inherited `pointer-events-none`), and `.panel-3`'s `h-full` does nothing, so there's no empty space. No CSS change expected; any change is listed and approved.

Capture End under `prefers-reduced-motion: reduce` (puppeteer `emulateMediaFeatures`) at the four End viewports, before and after, for approval. Check specifically that no question is clipped by its column's `overflow-hidden` at a 375px viewport.

**Decision for the user: the fixed End image under reduced motion.** The fixed image isn't a GSAP animation, so `withMotion` doesn't affect it. But the photo staying still while the page slides over it is a parallax-style effect, which iOS's own Reduce Motion setting turns off in the system UI.
- (a) Keep it fixed for everyone (no change).
- (b) **Recommended:** under reduced motion, the image scrolls with the page, CSS only (`motion-reduce:absolute motion-reduce:inset-0 motion-reduce:h-full` on the layer; Tailwind 3.4 emits variants after base utilities, so these win over `fixed` and `h-lvh`). Normal visitors see no change.

**Verify.** Normal motion: the timeline dump and screenshots are identical to main (the wrapper changes no tweens or trigger order). Reduced motion: before/after screenshots for approval. Live toggle: switching the OS setting while on the page reverts or rebuilds cleanly (matchMedia revert), with no stuck pin spacers or half-split text, including after a resize.

## 2. Re-split the process text on resize and after fonts load (invisible in normal conditions)

> **Dropped (2026-11-19).** Implementing it showed that SplitText never splits these items into lines. Each `.process-item` is `display: flex`, so SplitText's inline-block words each become a flex item in one row, and it detects a single line. Each item becomes one block-level `.line` that wraps its text naturally, so there are no measured line breaks to go stale. The implementation below worked (identical timeline and trigger positions after a resize, no double split) but guarded against almost nothing, so the user chose to drop it. Real per-line splitting would be a visible design change, tracked separately if wanted.

**Problem.** The five `SplitText.create` calls run once on mount, with no `autoSplit`. Line breaks are measured with whatever font and width exist at that moment. If the serif web font swaps in afterwards, or an iPad rotates, the `.line-mask` boxes keep the old breaks, so text wraps inside a mask or gets cut off by the 112% clip.

**Change.** Follow `SplitReveal`'s pattern: `autoSplit: true` with the animation built in `onSplit`, returned so SplitText kills and rebuilds it on each re-split.

- One `SplitText.create` over all five `.process-item` elements (SplitText accepts several targets). `onSplit` runs once per instance, after all targets are split, synchronously on create, so one rebuild covers all five. Five separate splits, each rebuilding a shared timeline, would race.
- **The trigger stays outside `onSplit`.** ScrollTrigger offsets a trigger by any earlier-created pin of its own element (`ScrollTrigger.js` refresh: `curPin === trigger` → `offset += cs * (1 - progress)`). Today the process trigger (`.panel-1-container`, `top 90%`) is created before the panel-1 pin, so it isn't offset. If `onSplit` re-created it after a re-split, it would land after the pin and start up to one panel-height later. So create it once, where the timeline is created now:
  ```ts
  let processTimeline: gsap.core.Timeline | undefined;
  const processTrigger = ScrollTrigger.create({
    trigger: ".panel-1-container",
    start: "top 90%",
    onEnter: () => processTimeline?.play(),
    onLeaveBack: () => processTimeline?.reverse(),
  });
  ```
  This is the same as today's `toggleActions: "play none none reverse"`. `onSplit` builds a **paused** timeline with no scrollTrigger: masks `overflow: visible`, lines `y: "100%"` / `display: "block"`, the five item tweens exactly as now. It assigns the timeline to `processTimeline` and returns it, so SplitText reverts it on re-split. On the first split, if the visitor is already past the start (`processTrigger.progress > 0`, e.g. a reload mid-page), `progress(1)`. On re-splits, SplitText carries the old timeline's time over to the new one (`totalTime(animTime)`), so it doesn't replay.
- The pins and the `.process-fade` scrub stay as they are: they don't depend on line breaks, and ScrollTrigger refreshes them on resize itself.
- Re-split triggers: web fonts finishing loading (`document.fonts` `loadingdone`) and element width changes (a ResizeObserver, debounced 200ms). Height-only changes, such as iOS toolbars collapsing, don't re-split.

**Verify.** Normal load: the timeline dump and screenshots are identical to item 1. Resize: load at 1280, resize to 900 and back, then dump again. Expect identical trigger start/end values (the check that catches the pin-offset problem above), the same tweens, the line count matching the new width, and no leftover nested `.line-mask` elements (no double split). Also confirm that a height-only resize doesn't re-split.

## 3. Tie the five process steps to the type (no visible change)

**Problem.** `process: string[]` in `lib/types.ts`, a hand-synced `PROCESS_COUNT = 5`, and hardcoded `process[0]`…`process[4]` markup. A project with 4 steps renders an empty item that still takes a grid row and a timeline slot. With 6 steps, the sixth is silently dropped. All three projects have 5 today.

**Change.** Type it as a 5-tuple, which is what the layout is designed around (a hand-placed two-column grid, rows 5/3/1 and 4/2):

```ts
/** Exactly five: the End layout places them by hand, alternating sides. */
process: [string, string, string, string, string];
```

End's prop becomes `process: Project["end"]["process"]` (a tuple also passes into `string[]`, which would lose the guarantee inside End). Then drop `PROCESS_COUNT` and loop over `process.length`. The only consumer is `CaseStudy.tsx` → End; SEO, llms.txt and JSON-LD don't read it. A project with the wrong count becomes a type error at build time instead of a silent layout bug. Making the grid data-driven for any count isn't worth it: the composition is designed for five.

**Verify.** `tsc` passes for the three projects. Temporarily remove a step from one project: `tsc` must fail (then revert). The timeline dump and screenshots are identical.

## Review (Fable, 2026-11-19)

Sound with changes, all applied above. The scope catch in item 1 was a false premise (matchMedia inherits the scope in GSAP 3.15), so `withMotion` stays as-is. Item 2 now keeps the trigger outside `onSplit`, because re-creating it after the pin would offset it; "plays again" was corrected (SplitText carries the time over). Item 1's expected layout was specified. Item 3 also types End's prop. The fixed-image CSS was checked against Tailwind 3.4 variant order.

## Order and approvals

3 → 1 (item 2 dropped). The invisible one first, so item 1's reduced-motion screenshots are taken on the final code. Stops: the fixed-image decision (before item 1), then item 1's reduced-motion before/after. Then `/code-review` and the PR.
