# Monorepo (roadmap step 3)

> **Shelved 2026-11-19.** Flxra gets its own repo, published to npm, and the portfolio stays a single app that installs it (see the roadmap, §6 and step 3). This plan was for turning the portfolio repo itself into a monorepo. Its Fable-reviewed findings on Turborepo, workspaces, lockfile drift, Tailwind's `relative: true` and the Vercel Root Directory switchover carry over to the Flxra repo.

Turn the repo into a Turborepo monorepo: the portfolio moves to `apps/portfolio`, and two empty packages, `@flxra/tokens` and `@flxra/ui`, get created for steps 4–6. **Nothing visible changes**, and the dependency versions stay exactly the same.

**Why a monorepo:** the design system gets real package boundaries. The portfolio and the future Flxra docs app (step 7) consume the same packages, a change to a component, its use and its docs lands in one PR, and each app deploys independently. For the portfolio alone a folder would do; the second app and the design system as a portfolio piece are what justify it.

Branch `chore/monorepo`. Same rules as before: plan → Fable review → approval → implement, screenshot parity, `/code-review` before the PR.

## Target layout

```
/
├─ apps/
│  └─ portfolio/          ← everything that builds the site today
│     ├─ app/ components/ content/ lib/ fonts/ public/
│     ├─ next.config.mjs tailwind.config.ts postcss.config.mjs
│     ├─ eslint.config.mjs tsconfig.json
│     └─ package.json     (name: "portfolio", the current deps and scripts)
├─ packages/
│  ├─ tokens/             @flxra/tokens: placeholder (step 4 fills it)
│  └─ ui/                 @flxra/ui: placeholder (step 6 fills it)
├─ docs/                  stays at the root: repo-level plans
├─ .claude/  README.md  .gitignore
├─ package.json           workspaces + turbo scripts, no app deps
├─ package-lock.json      one lockfile for the whole repo
└─ turbo.json
```

## Commits

### 1. Move the app and add the workspace root (one commit)

One commit, so `main` never has an unbuildable commit (the repo merges with merge commits, so every commit stays bisectable). Git's rename detection still sees each moved file as a 100% rename, so `git log --follow` keeps its history.

**The move.** `git mv` `app/ components/ content/ lib/ fonts/ public/`, the configs (`next.config.mjs tailwind.config.ts postcss.config.mjs eslint.config.mjs tsconfig.json`) and `package.json` into `apps/portfolio/`. Everything inside moves together, so the relative references stay valid: the `@/*` → `./*` alias, `url("../fonts/…")` in `app/global.css`, the Tailwind content globs. `git mv` skips ignored files, so delete the root `.next/`, `next-env.d.ts` and `tsconfig.tsbuildinfo` afterwards. Next and `tsc` regenerate them under `apps/portfolio`.

**Root `package.json`:**
- `"name": "flxra"`, `private`, `"workspaces": ["apps/*", "packages/*"]`.
- `"packageManager": "npm@10.9.8"`: turbo 2 needs it to find the workspaces (Vercel ignores it).
- devDependency `turbo`, pinned exact at `2.11.10` (released 2026-10-20).
- Scripts:
  - `dev`: `turbo run dev --filter=portfolio`, so `npm run dev` at the root starts the site as today;
  - `build`, `start`, `lint` and `typecheck`: `turbo run <task>`.

**`turbo.json`:**
- `$schema`.
- `ui: "stream"`, so `npm run dev` output looks like plain `next dev` instead of turbo's full-screen interface.
- Tasks (turbo 2 errors when asked to run a task that isn't defined):
  - `build`: `dependsOn: ["^build"]`, outputs `.next/**` and `!.next/cache/**`.
  - `dev` and `start`: `cache: false`, `persistent: true`.
  - `lint` and `typecheck`: `{}`.

Turbo already hashes the lockfile, so no `globalDependencies` is needed.

**`apps/portfolio/next.config.mjs`:** `turbopack.root` is `import.meta.dirname` today, which would now point at `apps/portfolio`. With workspaces, npm hoists `node_modules` to the repo root, and Turbopack can't resolve files outside its root. So it becomes the repo root, `path.join(import.meta.dirname, "../..")`. Next 16 mirrors `turbopack.root` into `outputFileTracingRoot` (`next/dist/server/config.js`), so Vercel's file tracing picks up the hoisted dependencies too. Only one setting is needed.

**`apps/portfolio/tailwind.config.ts`:** add `relative: true` to `content`. Tailwind 3.4 resolves content globs against the current working directory unless this is set (`tailwindcss/lib/lib/content.js`). With it, they resolve against the config file's folder, whoever runs the build and from wherever. It can't change the output when cwd is already `apps/portfolio`; the selector-set check proves that.

**`apps/portfolio/tsconfig.json`:** drop the stale `data/*.ts` includes (those files don't exist). No TypeScript project references: nothing imports across packages yet.

**`.gitignore`:** make the root-anchored entries match at any depth: `/node_modules`, `/.next/`, `/out/`, `/build`, `/coverage` and `/.pnp` lose their leading slash. Add `.turbo/`. The others (`.vercel`, `*.tsbuildinfo`, `next-env.d.ts`, `.env*.local`, `public/images/`) already match at any depth.

**Lockfile, with no version drift.** After the move, `npm install` keeps every locked version: npm only rewrites the root entry and adds the workspace entries, because the hoisted `node_modules/*` entries still satisfy `apps/portfolio`'s dependencies. Don't delete or move the lockfile, and don't use `--prefer-dedupe`. Check:
1. Copy `package-lock.json` before the move.
2. After the move: `npm install --package-lock-only`, then `npm ci`.
3. Diff the two lockfiles directly. For every `packages` key starting with `node_modules/`, compare `version`, `resolved` and `integrity`. (`npm ls` would miss the platform binaries that aren't installed on a Mac, such as the Linux `@next/swc-*` that Vercel uses.)
4. The only expected additions: `turbo` and its `turbo-*` platform packages, the workspace entries (`apps/portfolio`, `packages/*`), and their `node_modules/portfolio` and `node_modules/@flxra/*` links.
5. If anything else changed, restore that entry in the lockfile, not with `npm install <pkg>@<old>` at the root (that would add it to the root `package.json`).

### 2. Empty packages

The workspace graph should be real from day one, but with nothing in it that affects the site.
- **`packages/tokens/package.json`:** `"name": "@flxra/tokens"`, `private`, `"version": "0.0.0"`, `"exports": { "./tokens.css": "./tokens.css" }`. `tokens.css` holds only a header comment saying step 4 fills it. Plus a short `README.md`.
- **`packages/ui/package.json`:** `"name": "@flxra/ui"`, `private`, `"version": "0.0.0"`, `"exports": { ".": "./src/index.ts" }` (source TS, consumed through `transpilePackages` later, so no build step). `src/index.ts` is `export {};` with a comment. No `tsconfig` or `typecheck` script until step 6 gives it code. Plus a short `README.md`.
- The portfolio does **not** depend on them yet. The dependency and `transpilePackages: ["@flxra/ui"]` arrive in steps 4 and 6. Turbo skips packages that don't define a task's script, so the empty packages cause no task errors.

### 3. Docs

- **README:** a "Repo layout" section, plus:
  - run commands from the root (`npm run dev`);
  - add dependencies with `npm install <pkg> -w portfolio`;
  - `npm install` run inside `apps/portfolio` still installs at the root.
- **Roadmap:** mark step 3 done.
- **`docs/tailwind-v4-plan.md`:** paths now start with `apps/portfolio/`. Add a note at its top instead of rewriting every path.

## Vercel switchover (you do this in the dashboard; nothing can break production)

A failed build is never promoted. Production, and every auto-assigned production domain, keeps serving the last good deployment until a new one succeeds. So the worst case is a failed build, never a broken site.

**Build command: keep Vercel's default.** It runs `next build` in `apps/portfolio` after installing from the repo root. Turbo isn't needed on Vercel for one app, and the default avoids turbo's strict env-var mode. The build log shows which command ran; check it.

**Order.** Do it in one sitting, so the window between the setting change and the merge is minutes:
1. **Open the PR.** Its preview build fails, because the Root Directory is still the repo root, which no longer contains a Next app. That's expected.
2. **In Vercel** (Project → Settings → Build and Deployment):
   - set **Root Directory** to `apps/portfolio`;
   - leave "Include files outside the Root Directory" **on** (the lockfile and the hoisted `node_modules` live at the root);
   - framework preset: Next.js;
   - build and install commands: defaults.
3. **Redeploy the PR's preview** (or push an empty commit). Run the preview checks below.
4. **Merge right away.** Production builds from `main` with the new setting.

**What the setting affects.** The Root Directory applies to every new build, including a "Redeploy" of an old `main` commit, which would now fail. Until the merge, don't push to `main` or redeploy old commits.

**Rollback:**
- Instant Rollback (promote the previous production deployment) works regardless, because it reuses built output instead of rebuilding.
- Set Root Directory back to empty only if you also revert the code.

Optional later: an Ignored Build Step of `npx turbo-ignore`, so docs-only commits don't trigger a build.

## Later, for reference: serving `buhrduong.com/flxra` (step 7)

`apps/flxra` becomes a second Vercel project from the same repo (Root Directory `apps/flxra`), with `basePath: "/flxra"`. The portfolio adds a rewrite, `/flxra` and `/flxra/:path*` → the flxra deployment's URL (Next multi-zones). One domain, two independently deployed apps.

## Verification

- **Locally, from the root:**
  - `npm ci` from a clean checkout (no `node_modules` anywhere) succeeds.
  - `npm run lint` and `npm run typecheck` pass through turbo. ESLint resolves `eslint-config-next` from the hoisted `node_modules`.
  - `npm run build` passes; run `turbo run build --force` for the parity checks, so a cache hit can't replay an old build.
  - `npm run dev` starts the site on :3000, and hot reload works when a component is edited.
- **The build output matches main's:**
  - the same route list in the `next build` summary (static/dynamic markers included);
  - an identical compiled CSS selector set;
  - `/llms.txt`, `/sitemap.xml` and `/robots.txt` byte-identical.
- **Dependency diff:** clean, as described under the lockfile in commit 1.
- **Screenshots:** the full harness (home, case study, frame, about, dialog at 5 widths) on the monorepo build vs main shows 0 differences apart from known noise. The harness scripts get pointed at `apps/portfolio` (they live outside the repo).
- **Fonts:** Editorial Old and Geist Mono load, with no 404s.
- **On the Vercel preview, after the Root Directory change:**
  - the build succeeds, and the log shows `next build` in `apps/portfolio`;
  - pages render, and `/llms.txt` loads;
  - Speed Insights and Analytics scripts return 200;
  - `public/og-image.png` loads;
  - no console errors.
- **`git log --follow apps/portfolio/components/case-study/End.tsx`:** shows the file's full history.

## Risks

- **Hoisting:** packages now resolve from `../../node_modules`. Turbopack handles this once its root is set, and ESLint resolves plugins relative to its config file, which walks up to the root. `npm run lint` and the build verify both.
- **`fluid-tailwind`** (unmaintained) is only imported by `tailwind.config.ts`, and it moves with it.
- **Env vars:** the code reads none today. If turbo ever runs on Vercel, its strict env mode would need them declared in `turbo.json`.
- **My screenshot harness** builds from the repo root. It gets updated, but it's outside the repo.

## Review (Fable, 2026-11-19)

Sound with changes, all applied above:
- one Next root setting (Next mirrors it);
- `relative: true` for Tailwind's cwd-relative globs;
- an explicit Vercel build command, and a tighter switchover window with the redeploy and rollback caveats;
- a lockfile-level dependency diff (`npm ls` misses uninstalled platform binaries), with no root `npm install` pin-backs;
- the move and root squashed into one commit, so main stays bisectable;
- a `start` task, explicit `lint` and `typecheck` tasks, `ui: "stream"`, and no tsconfig for the empty `ui` package;
- deleting the ignored files left behind, the exact `.gitignore` entries, and the README dependency instructions.
