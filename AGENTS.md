# resume-craft

Next.js App Router SSG resume builder with Tailwind v4, Zustand, and 25 templates.

## Non-negotiables

- **Static export only** (`output: 'export'` in `next.config.ts`). No `'use server'`, `cookies()`, `headers()`, or any server features.
- **Tests required.** New code must have tests under `tests/` runnable with `npm test`.
- **Pin exact versions** (`save-exact=true` in `.npmrc`). Install with `npm install foo@latest`.
- Keep changes small and targeted.

## Canonical sources (do not duplicate)

- `.opencode/docs/PROJECT_README.md` — project overview, route table, SSG rules
- `.opencode/skills/coding.md` — TypeScript/React patterns, component structure, naming
- `.opencode/skills/testing.md` — Vitest/RTL patterns, what to test

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Static export to `out/` |
| `npm run type-check` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest (all tests) |
| `npm run test:watch` | Vitest watch mode |
| `npm run gen:icons` | Generate PWA icons |

CI runs: `type-check` → `lint` → `test`. Do not skip steps.

## Architecture

- **State:** Single Zustand store at `src/store/resume.ts`, persisted to localStorage under key `resume-craft-storage`.
- **Path alias:** `@/` → `./src/*` (works in tests too).
- **Styling:** Tailwind v4 (via `@tailwindcss/vite` + `@tailwindcss/postcss`). No `tailwind.config.js`.
- **PWA:** `src/app/manifest.webmanifest`, installable, works offline.
- **Export:** `src/lib/export/resume-export.ts` — text, HTML, JSON, PDF (dynamic `html2pdf`), DOCX.
- **Templates:** 25 definitions in `src/lib/templates.ts` (5 base + 20 role-based).
- **UI primitives:** Radix UI + `class-variance-authority` + `lucide-react` + `next-themes`.
- **Node:** >=24 (`.nvmrc`, `engines`).

## Repo layout

```
src/app/          Next.js App Router routes
src/components/   UI + feature components
src/store/        Zustand (single store)
src/lib/          Utilities, export logic, templates
src/types/        TypeScript interfaces
tests/            Vitest tests (jsdom, @/ alias)
```
