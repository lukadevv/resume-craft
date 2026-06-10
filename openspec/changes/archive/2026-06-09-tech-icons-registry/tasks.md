# Tasks: Tech Icons Registry Expansion

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~400–500 |
| 400-line budget risk | Medium |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (core) → PR 2 (templates) |
| Delivery strategy | ask-on-risk |
| Chain strategy | resolved: single-pr size:exception |

Decision needed before apply: Resolved — size:exception granted by maintainer
Chained PRs recommended: Overridden by size:exception
Chain strategy: single-pr size:exception
400-line budget risk: Accepted via size:exception

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Core: categories, registry, auto-detect, TechIcon + tests | Single PR | size:exception |
| 2 | Integration: templates, SectionRenderer, SkillBars + build | Single PR | size:exception |

## Phase 1: Category Files

- [x] 1.1 Create `src/lib/icons/categories/frameworks.ts` — 20 icons (React, Angular, Next.js, etc.)
- [x] 1.2 Create `src/lib/icons/categories/databases.ts` — 19 icons (PostgreSQL, MongoDB, Redis, etc.)
- [x] 1.3 Create `src/lib/icons/categories/cloud-infra.ts` — 16 icons (AWS, Vercel, Lambda, etc.)
- [x] 1.4 Create `src/lib/icons/categories/tools.ts` — 29 icons (Git, Docker, Vite, pnpm, etc.) [Husky removed — no icon available]

## Phase 2: Core Infrastructure

- [x] 2.1 Update `src/lib/icons/registry.tsx` — import + spread 4 new arrays into `allIcons`
- [x] 2.2 Create `src/lib/icons/auto-detect.ts` — `autoDetectIcon(name)` fuzzy matcher
- [x] 2.3 Create `src/components/ui/TechIcon.tsx` — `'use client'`, brand icon + optional label

## Phase 3: Template Integration

- [x] 3.1 Modify `SectionRenderer.tsx` — skills/projects/tools cases use TechIcon in pills/rows
- [x] 3.2 Modify `SkillBars.tsx` — TechIcon before skill name in bar rows
- [x] 3.3 Modify `ModernTemplate.tsx` — skills pills + project technologies with TechIcon
- [x] 3.4 Modify `CreativeTemplate.tsx` — skills bar labels + project tech badges with TechIcon
- [x] 3.5 Modify `ClassicTemplate.tsx` — skills text to icon+label flex rows
- [x] 3.6 Modify `MinimalTemplate.tsx` — skills `<p>` to flex row; project techs with TechIcon
- [x] 3.7 Modify `TechnicalTemplate.tsx` — skills category items with TechIcon

## Phase 4: Tests

- [x] 4.1 Extend `tests/iconRegistry.test.ts` — verify all 5 categories load, structure, no dupes
- [x] 4.2 Create `tests/auto-detect.test.ts` — exact, searchTerm, partial, empty, no-match cases
- [x] 4.3 Create `tests/components/ui/TechIcon.test.tsx` — renders match, null, showLabel, aria-label

## Phase 5: Verify

- [x] 5.1 Run `pnpm test` — all tests pass (30 files, 356 tests, 4 skipped)
- [x] 5.2 Run `pnpm run build` — static export succeeds
