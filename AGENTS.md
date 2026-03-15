# Codex Project Instructions (resume-craft)

This repository is a **Next.js App Router** resume builder. Optimize for developer productivity and safe changes.

## Non-negotiables

- **SSG-only:** do not add Server Actions or server-only APIs (`'use server'`, `cookies()`, `headers()`, etc.). Prefer static pages + client components + local persistence.
- **Testing is mandatory:** new behavior must come with tests under `tests/` and must be runnable with `npm test`.
- Keep changes small and targeted. Avoid unrelated refactors.

## Source of truth for conventions

This repo already has OpenCode standards. Treat these as canonical and do not duplicate them:

- `.opencode/docs/PROJECT_README.md`
- `.opencode/skills/coding.md`
- `.opencode/skills/testing.md`

Codex-facing docs live under `.codex/` and reference the above.

## Useful commands

- `npm run dev`
- `npm run build`
- `npm run type-check`
- `npm run lint`
- `npm test`

## Repo layout (high-level)

- `src/app/**` Next.js routes (App Router)
- `src/components/**` UI + feature components
- `src/store/**` Zustand stores
- `src/lib/**` utilities + export logic
- `tests/**` Vitest tests

