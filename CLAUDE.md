# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio site for Liang-Shih Lin, served at https://baoge.dev. Vite + React 19 + TypeScript + Tailwind + shadcn/ui. Static client-side SPA, no backend.

## Branch flow (overrides the global "promote via staging" rule)

- **`site` is the source branch.** All work lands on `site`. Commit and push there.
- **`master` is build output.** `.github/workflows/deploy.yml` runs on every push to `site`: `bun install`, `bun run build`, then deploys `dist/` to `master` with `clean: true`. Never commit source to `master` and never open a PR targeting it. Anything hand-committed there is wiped by the next deploy.
- The harness may report `master` as the main branch. Ignore that for this repo.

## Commands

Package manager is **bun** (`bun.lockb` is authoritative; `package-lock.json` is stale, do not use npm).

```bash
bun install          # deps
bun run dev          # vite dev server, host "::", allows *.lan hosts
bun run build        # production build to dist/ (sourcemaps on)
bun run build:dev    # vite build --mode development
bun run preview      # serve dist/
bun run lint         # eslint . (ts/tsx only)
```

What does **not** exist, so do not claim it passed:
- No test runner and no test script.
- No typecheck script. `tsconfig` has `strict`, `strictNullChecks`, and `noImplicitAny` all **off**, and eslint's `no-unused-vars` is off. A green build is not a type guarantee. If you want a real check, run `bunx tsc -p tsconfig.app.json --noEmit` and say you did (clean as of 2026-10-30).
- Local builds work without env vars. `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` are CI-only secrets; without them the Sentry plugin just warns and skips the sourcemap upload. `VITE_GITHUB_PAT` is set in CI but nothing in `src/` reads it.

### TypeScript 7 split (do not "simplify" this)

`tsc` is TypeScript 7, the native Go compiler, which ships **no JS compiler API**. typescript-eslint still needs that API, so `package.json` uses two npm aliases, per the TS 7 release guidance:

- `typescript` → `npm:@typescript/typescript6` (JS API + a `tsc6` binary). This is what `require("typescript")` and eslint see.
- `@typescript/native` → `npm:typescript@7` (the `tsc` binary).

Collapsing these back to a single `typescript` entry breaks either lint (on 7) or the fast compiler (on 6). typescript-eslint 8.x refuses to load on any TS 7 (its peer range is `<6.1`); revisit when it ships TS 7 support (github.com/typescript-eslint/typescript-eslint/issues/10940). TS 7 also removed `baseUrl`; the `@/*` path alias resolves relative to the tsconfig.

`bunx tsc -p tsconfig.node.json --noEmit` (strict, covers `vite.config.ts` and what it imports) has two pre-existing implicit-any errors in `src/lib/utils.ts` from the self-referencing `md` renderer. They predate the upgrade and Vite does not typecheck, so they do not block the build.

### Toolchain notes

- Vite 8 (rolldown). `vite-plugin-markdown` warns about missing sourcemaps on every `.md`; harmless.
- ESLint 10 flat config with `eslint-plugin-react-hooks` 7, which includes the React Compiler rules (`react-hooks/refs`, etc.). Writing to a ref during render is an error; do it in an effect.
- The lockfile is the text `bun.lock`. It must stay free of registry URLs (bun omits them only for the default npm registry) or the GitHub Actions `bun install` fails. If you install through a private registry mirror, check with `grep -c tgz bun.lock` (expect 0) before committing.

## Architecture

### Routing and shells

`src/App.tsx` holds the router: `/` (Index), `/projects`, `/blog`, `/blog/:slug`, `*`. Two visual shells:

- **Home (`src/pages/Index.tsx`)** is a fake terminal session. It composes `CommandBlock` sections from `src/components/home/`. `CommandBlock` renders commands and output immediately. Only its decorative cursor briefly animates through CSS, gated on `prefers-reduced-motion: no-preference`. The decorative boot sequence still uses GSAP with a reduced-motion guard. Never hide essential content behind an animation. The prompt string lives in `src/components/home/prompt.ts`.
- **Every other page** wraps in `SidebarLayout` (`src/components/layout/`), a fixed left rail with page nav.

The Konami code (hook in `src/hooks/useKonamiCode.ts`) opens `TerminalModal`, a separate interactive terminal with its own static command table in `src/lib/terminalCommands.ts`. It shares nothing with the home-page terminal besides the look.

### Blog pipeline (build time, no registry)

1. Markdown lives in `src/content/blog/*.md`. Frontmatter fields: `title`, `date` (full ISO, e.g. `2025-06-03T00:00:00.000Z`), `author`, `excerpt`, `tags`.
2. `vite.config.ts` registers `vite-plugin-markdown` in `Mode.MARKDOWN` + `Mode.HTML`, using the `md` renderer exported from `src/lib/utils.ts` (markdown-it + highlight.js + anchor plugin).
3. `src/data/blogPosts.ts` does an eager `import.meta.glob` over that folder. **Slug = filename without `.md`.** Reading time is computed there from the raw markdown.
4. `src/lib/blogLoader.ts` sorts by date and looks up by slug.

To add a post: drop a `.md` file in the folder. Nothing else to register.

Gotchas:
- `date` is parsed with `new Date()` and the home page calls `toISOString()` on it. Use full ISO 8601 with a `T`; a string that fails to parse would throw and blank the home page. (Node is lenient: `2026-07-29:00:00.000Z` without the `T` still parses, as local time.)
- `BlogPost.tsx` runs the already-rendered HTML through `parseMarkdown` again, which ends with a DOMPurify pass using an explicit `ALLOWED_TAGS` list in `src/lib/utils.ts`. Tags not on that list (tables, iframes, etc.) are stripped. Add them there if a post needs them.
- Because `vite.config.ts` imports `src/lib/utils.ts`, that module executes in Node at config load. Do not add browser globals at its top level.

### Projects page

`src/lib/github.ts` hits the **unauthenticated** GitHub REST API for user `ll931217` (60 requests/hour limit), cached via react-query. `src/data/featuredRepos.ts` is the hand-curated "featured" list, matched by repo name. `RepoFilter` in `src/types/repository.ts` defines the filter variants (`all`, `featured`, `recent`, `popular`, `featuredOnly`).

### Styling

- `@` aliases `src/`. shadcn/ui components are in `src/components/ui/` (config in `components.json`). Only the ones actually imported are kept (select, tooltip, plus custom PascalCase ones like EmptyState and KeyboardCheatSheet); the unused shadcn set, the never-called toast/sonner stack, and their radix packages were deleted on 2026-10-30. If you need another shadcn component, add it with the shadcn CLI and its radix dependency together.
- **Tailwind CSS 4, CSS-first config.** There is no `tailwind.config.ts`. The theme lives in `@theme {}` in `src/index.css`: shadcn CSS vars, the custom `night` palette (`night`, `night-fg`, `night-muted`, `night-faint`), `font-mono` = JetBrains Mono, keyframes. Tailwind runs through `@tailwindcss/vite` in `vite.config.ts` (no PostCSS). `tw-animate-css` provides `animate-in`, `fade-in-0`, `slide-in-from-*` for the radix components. Two v4 preflight changes to know: buttons no longer get `cursor: pointer` by default (a base rule in `index.css` restores it), and `hover:` variants only apply on devices that support hover. Most of the site is mono; emerald-400 is the accent.
- Code blocks use the `tokyo-night-dark` highlight.js theme imported in `src/main.tsx`.

### Observability and SEO

- Sentry is initialised in `src/main.tsx` with a hardcoded DSN pointing at `sentry.baoge.dev`, 100% trace sampling.
- `src/lib/structuredData.ts` builds JSON-LD; `BlogPost.tsx` injects an Article schema. `vite-plugin-sitemap` generates the sitemap for `https://baoge.dev`.
