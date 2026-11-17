# Tailwind 3.4 → 4 Migration: Plan

_Created 2026-11-17. Status: **parked** (revised after Fable 5.1 review, see end). Deferred to step 8 of `roadmap-plan.md` after the hybrid styling decision; refresh against the code before use. Open question if resumed: accept v4's hover-on-touch behaviour?_

> **Before resuming:** this plan was written when Button still used Tailwind's `duration-30`. Per the roadmap, Button moves to `@flxra/ui` (CSS Modules, 250 ms) in step 6, before this migration in step 8. Drop the Button steps (step 3's `duration-150` pin and step 6) if that has happened, and the "one approved exception" with them; otherwise keep them. Likewise, components already moved to CSS Modules no longer need their Tailwind classes checked.

## Goal

Move the site from Tailwind 3.4 (JS config) to Tailwind 4.3 (CSS-first `@theme`). **Every page must look identical before and after**, with one approved exception: the Button transition becomes 250 ms (roadmap decision 2).

Out of scope: token aliases (§4), column grid and 2400px cap (§5), and the other §3 cleanups. They follow in their own PRs, written once in v4 syntax.

## Current setup (audited)

| Item | Today | v4 concern |
|---|---|---|
| Config | `tailwind.config.ts`, `postcss.config.mjs` with `tailwindcss` | Replaced by `@import "tailwindcss"` + `@theme` in `app/global.css`; PostCSS plugin becomes `@tailwindcss/postcss` |
| `fluid-tailwind` 1.0.4 | 20 `~text-*` uses, 14 unique combos, 7 files | **v3 only** (`peerDependencies: tailwindcss ^3.2.0`, last release 2024-11). Must be replaced before the upgrade |
| `colors` | Fully **overrides** the default palette (not `extend`) | Needs `--color-*: initial` so v4's palette doesn't appear. Side effect today: `bg-black` (`Cursor.tsx:107`), `text-inherit` and `backdrop:bg-transparent` (`Dialog.tsx:94`) generate nothing. In v4, `inherit` and `transparent` are built-in values, so the two Dialog classes **start working** (dialog text colour and a lighter backdrop). Delete both for parity (step 3). `bg-black` stays dead in v4; flag it as a likely bug for later |
| `screens` | Overrides: sm 30, md 48, lg 60, xl 80, xxl 100 rem | Needs `--breakpoint-*: initial`, otherwise v4's `sm` 40rem and `2xl` 96rem would leak in |
| `fontSize` | Overrides, each with a line height; `-p` variants | `--text-*: initial`, then `--text-lg-p: 1.125rem; --text-lg-p--line-height: 1.75rem;` etc. |
| `fontFamily` | Overrides; entries carry `fontFeatureSettings` / `fontVariationSettings` | `--font-serif--font-feature-settings: …`. **The upgrade tool drops `font-mono`** (its nested-array entry becomes `--font-mono-0`/`--font-mono-length`, which generate nothing); write `--font-mono: Geist, monospace; --font-mono--font-feature-settings: "ss03" on, "liga" off;` by hand. The `fontVariationSettings: "lining-nums tabular-nums"` value is invalid CSS for that property and does nothing today; carry it over unchanged for parity, note for §3 |
| `borderRadius` | Overrides with sm/md/lg only | `--radius-*: initial` + three values. `rounded-full` and `rounded-none` are static in v4, unaffected (`rounded-[1000px]` stays as is until §3) |
| `aspectRatio` | Overrides, incl. names like `16/9-half`, `21/9-half` | v4 parses `aspect-16/9` as a fraction natively. The `-half` names need custom `@utility` definitions; check the upgrade tool's output here closely |
| `height` extend | `h-80/85/90` = 80/85/90 vh | In v4 `h-85` comes from the spacing scale (21.25rem). Only `h-85` is used (`case-study/Hero.tsx:83`). v4 has a `--height-*` namespace; the tool's `--height-85: 85vh` handles it. Verify it's present |
| `content` globs | `pages/`, `components/`, `app/` | v4 detects sources automatically, which would also scan `docs/*.md` (full of class names like `w-screen`). Add `@source not "../docs";` |
| `@tailwind` + `@layer base` + `@apply` | `global.css` | `@import "tailwindcss"`; `@apply` still works. The unused `.project-section*` classes stay until §3 |

No uses of the utilities v4 renamed (`shadow`, `blur`, `ring`, `outline-none`, `*-opacity-*`, `space-*`, `divide-*`, `bg-gradient-*`). Three uses of `flex-shrink-0` / `flex-grow`, deprecated (still working) in v4; the upgrade tool rewrites them to `shrink-0` / `grow`. One `duration-30` pair (Button): no CSS in v3 (effective 150 ms default), a real 30 ms in v4.

## Default-behaviour changes to neutralise

1. **Button cursor.** v4's preflight gives `<button>` the default arrow cursor. `QuoteBlock.tsx:64` relies on the v3 pointer. Restore v3 behaviour globally with the upgrade guide's snippet: `button:not(:disabled), [role="button"]:not(:disabled) { cursor: pointer; }` in `@layer base`.
2. **Hover on touch devices.** v4 wraps `hover:` in `@media (hover: hover)`, so tapping on a phone no longer leaves a "stuck" hover style. 33 `hover:` / `group-hover:` uses. This is a visible change on phones only, and generally an improvement. **Decision needed** (see below). Parity option: `@custom-variant hover (&:hover);`.
3. **Default border colour.** v3 with the colour palette overridden falls back to `currentColor`; v4 also uses `currentColor`. No change. (`Badge` sets a colour anyway.)
4. **Cascade layers.** v4 puts utilities in a real `@layer utilities`. **The upgrade tool also moves everything above `@layer base`** (`@font-face`, `:root` vars, `html { scroll-behavior }`, `.index-project-title`) **into `@layer utilities`.** Undo that: fonts and `:root` back to top level, custom rules unlayered after the `@import` (as in v3, where they came after `@tailwind utilities`). Also delete the tool's border-colour compat block (`var(--color-gray-200, currentcolor)`); it's a no-op with the palette reset. Unlayered rules now always beat utilities; audit each against utilities on the same elements.
5. **`group-hover:` specificity** drops from (0,3,0) to (0,2,0) in v4. No conflicts found in the code; covered by the computed-style diff.
6. **`transition` property list** gains `outline-color`, `translate`, `scale`, `rotate` etc. Only affects elements that animate those via CSS transitions; GSAP-driven properties are inline and unaffected. Check in the diff.
7. **Browser support.** v4 requires Safari 16.4+, Chrome 111+, Firefox 128+ (uses `@property`, `color-mix()`, cascade layers). Older browsers get broken styling, not degraded styling. Acceptable for a portfolio audience; noted for the record.

## Steps (one commit each)

1. **Baseline.** On the current code, run `next build && next start` and capture, at 390, 768, 1280, 1600 and 2560 px wide, for home (top + each pinned section), one case study, a frame page, the frame dialog open, about and 404:
   - **screenshots**, with `prefers-reduced-motion` and fixed waits so GSAP/Lenis don't make captures flaky;
   - a **computed-style dump**: `getComputedStyle` for every element, including `::backdrop` and with forced `:hover`;
   - a **class-output dump**: every class token in `app/` and `components/` compiled with the current config.
   Screenshots can't see hover, transition timing, cursors or the dialog backdrop; the two dumps can.
2. **Replace `fluid-tailwind`, still on v3.** Read the exact `clamp()` values fluid-tailwind generates for the 14 combos from the baseline CSS. Define 14 named utilities in `global.css` with those exact values (e.g. `.text-fluid-sm-base { font-size: clamp(…); line-height: clamp(…); }`), swap the 20 class uses, remove the plugin and `extract`, and **`npm uninstall fluid-tailwind`** (its `tailwindcss ^3.2.0` peer requirement otherwise makes the upgrade tool's install fail with ERESOLVE). Diff: **zero** expected. (Doing this on v3 isolates the fluid change from the upgrade.)
3. **Run `npx @tailwindcss/upgrade`.** It swaps dependencies, rewrites PostCSS config, converts the JS config to `@theme`, and rewrites renamed classes. Review its diff against the table above line by line: every `initial` reset present, line heights and font features carried over, aspect ratios and `--height-85` present. Then fix what the tool gets wrong: hand-write `--font-mono`; move fonts, `:root` and custom rules out of `@layer utilities`; delete the border-colour compat block. Delete `text-inherit` and `backdrop:bg-transparent` from `Dialog.tsx:94`. Change Button's `duration-30` to `duration-150` (keeps today's effective 150 ms; otherwise v4 makes it 30 ms). Convert the step-2 utilities to `@utility` blocks. Delete `tailwind.config.ts`.
4. **Neutralise defaults.** Button cursor rule, `@source not "../docs"`, hover decision applied.
5. **Verify parity.** lint, typecheck, build; then compare the class-output dump, the computed-style dump and the screenshots against the baseline. Expect **zero** diff in all three. Any diff is investigated, never accepted blind.
6. **Button 250 ms.** Change both `duration-150` to `duration-250` (valid in v4). The only intended visible change; a separate commit so it's easy to review or revert.
7. **PR** with `/code-review`, a before/after table of the theme conversion, and the diff results.

## Decisions needed

1. **Hover on touch devices:** accept v4's behaviour (no stuck hover after tapping on phones; recommended), or keep v3's for strict parity?

## Risks

- `fluid-tailwind` values must be copied exactly; a rounding difference shows up as a 1px text shift. The step-2 diff catches it before anything else changes.
- The upgrade tool may not convert the `-half` aspect names or the font feature settings cleanly; manual review covers this.
- Turbopack + `@tailwindcss/postcss` is the standard Next 16 setup; the v3 stale-file error seen on 2026-11-17 (`ENOENT … Footer.tsx`) came from v3's content tracker and should not recur.

## Review (Fable 5.1, 2026-11-17)

Fable ran `@tailwindcss/upgrade@4.3.5` on a scratch copy of the repo and compared which classes produce CSS in v3 and v4. Its findings are folded into the plan above:

- The upgrade tool drops `font-mono` and moves the top of `global.css` into `@layer utilities`; both are fixed by hand in step 3.
- `text-inherit` and `backdrop:bg-transparent` do nothing in v3 and start working in v4; they're deleted for parity.
- `duration-30` would silently become 30 ms in v4; it's pinned to today's 150 ms in step 3, then changed to 250 ms in step 6.
- `fluid-tailwind` must be uninstalled, not just removed from the config, or the tool's install fails.
- Screenshots alone can't prove parity here; class-output and computed-style diffs were added.
- Corrected: `flex-shrink-0`/`flex-grow` are deprecated in v4, not removed; `h-85` uses the `--height-*` namespace, no custom utility needed.

Confirmed correct: the fluid-tailwind usage counts and v3-only status, the `initial` resets, border colour, button cursor, hover media query, `--aspect-*` handling, `@source not` syntax, step order and browser support.
