# SDD Context — resume-craft

Initialized: 2026-06-07
Mode: hybrid (OpenSpec + Engram)

## Executive Summary

resume-craft is a Next.js App Router SSG resume builder with 25 templates, Tailwind v4, Zustand state management (localStorage), and Vitest for testing. It is a static-export-only PWA with no backend.

## Stack Snapshot

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.1.6 |
| React | react / react-dom | 19.2.4 |
| TypeScript | typescript | 5.9.3 (strict) |
| Styling | tailwindcss | 4.2.1 |
| State | zustand | 5.0.11 |
| Testing | vitest | 4.1.0 |
| Testing | @testing-library/react | 16.3.2 |
| Testing | jsdom | 28.1.0 |
| Lint | eslint | 10.0.3 |
| Format | prettier | 3.8.1 |

## Testing Capabilities

- **Runner**: Vitest 4.1.0 with jsdom environment
- **Framework**: React Testing Library + jest-dom matchers
- **Coverage**: v8 provider (text, json, html)
- **Setup**: `tests/setup.ts` imports `@testing-library/jest-dom/vitest`
- **Alias**: `@/` → `./src/*` (resolved in vitest.config.ts)
- **Strict TDD**: true — tests are mandatory per project conventions
- **Existing tests**: 11 files under `tests/`

## CI Pipeline

1. `npm run type-check` (tsc --noEmit)
2. `npm run lint` (eslint .)
3. `npm test` (vitest run)

## Key Constraints

- Static export only (`output: 'export'`)
- No server actions, cookies, headers, or dynamic rendering
- Node >=24
- Exact version pinning (`save-exact=true`)

## Canonical Sources

- `.opencode/docs/PROJECT_README.md` — project overview, routes, SSG rules
- `.opencode/skills/coding.md` — TypeScript/React patterns, component structure, naming
- `.opencode/skills/testing.md` — Vitest/RTL patterns, what to test
- `AGENTS.md` — non-negotiables, commands, architecture
