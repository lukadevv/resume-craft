# Tasks: Template Layout Shells

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1000–1300 additions |
| 400-line budget risk | High |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: High

## Phase 1: Foundation — Type Expansion + Emphasis Components

- [x] 1.1 [RED] Write test: `createEmptyResume()` returns all 17 new fields with correct empty defaults
- [x] 1.2 [GREEN] Expand `Resume` type in `src/types/resume.ts` — add 17 role-specific fields
- [x] 1.3 [GREEN] Update `src/store/resume.ts` — `createEmptyResume()` defaults for 17 new fields
- [x] 1.4 [RED] Write tests for `SkillBars` — renders bars sorted by proficiency, accent fill, empty → null
- [x] 1.5 [GREEN] Create `src/components/templates/shared/SkillBars.tsx`
- [x] 1.6 [RED] Write tests for `MetricsCallout` — renders cards with accent, empty → null
- [x] 1.7 [GREEN] Create `src/components/templates/shared/MetricsCallout.tsx`
- [x] 1.8 [RED] Write tests for `TimelineGraphic` — vertical timeline, dots, line, single-entry, empty → null
- [x] 1.9 [GREEN] Create `src/components/templates/shared/TimelineGraphic.tsx`
- [x] 1.10 [RED] Write tests for `CertificationBadge` — badge chips with accent, empty → null
- [x] 1.11 [GREEN] Create `src/components/templates/shared/CertificationBadge.tsx`

## Phase 2: TwoColumnShell

- [x] 2.1 [RED] Write test: `TwoColumnShell` renders A4 (794×1123), 30/70 split, section ordering, emphasis toggle
- [x] 2.2 [GREEN] Create `src/components/resume/templates/TwoColumnShell.tsx`

## Phase 3: SplitShell

- [x] 3.1 [RED] Write test: `SplitShell` renders 50/50 columns, accent color from definition, background gradient
- [x] 3.2 [GREEN] Create `src/components/resume/templates/SplitShell.tsx`

## Phase 4: SingleColumnShell

- [x] 4.1 [RED] Write test: `SingleColumnShell` stacks primarySections then sidebarSections, A4 fit, accent
- [x] 4.2 [GREEN] Create `src/components/resume/templates/SingleColumnShell.tsx`

## Phase 5: TimelineShell

- [x] 5.1 [RED] Write test: `TimelineShell` renders TimelineGraphic, section ordering, dark/light theme
- [x] 5.2 [GREEN] Create `src/components/resume/templates/TimelineShell.tsx`

## Phase 6: Routing + Cleanup

- [x] 6.1 [RED] Write integration test: `getTemplateComponent()` routes all 25 IDs — direct for 2, shell for 23, safe default
- [x] 6.2 Update `src/components/resume/templates/index.ts` — export 4 shells + 2 standalones, re-export originals
- [x] 6.3 Update `src/components/resume/export/ExportMenu.tsx` — replace layoutComponentMap with shellComponentMap
- [x] 6.4 Remove/deprecate unused layout fallback imports (ModernTemplate, ClassicTemplate, MinimalTemplate, CreativeTemplate from old map)

## Phase 7: Final Verification

- [x] 7.1 Run `pnpm run type-check` — no new type errors
- [x] 7.2 Run `pnpm run lint` — no lint violations
- [x] 7.3 Run `pnpm test` — all 8+ new test files pass, no regressions
- [x] 7.4 Run `pnpm run build` — static export succeeds
