# Tasks: Fix ExportMenu Template Mapping Bug

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 45-50 (ExportMenu) + 200-220 (test) = ~255 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

## Phase 1: Foundation — ExportMenu.tsx changes

- [ ] 1.1 Add import `templateDefinitionMap` from `@/lib/templates` to ExportMenu.tsx
- [ ] 1.2 Create `directComponentMap: Record<string, React.ComponentType<{ resume: Resume }>>` — maps 6 template IDs to their dedicated components (modern→ModernTemplate, classic→ClassicTemplate, minimal→MinimalTemplate, creative→CreativeTemplate, technical→TechnicalTemplate, softwareDeveloper→SoftwareDeveloperTemplate)
- [ ] 1.3 Create `layoutComponentMap: Record<LayoutType, React.ComponentType<{ resume: Resume }>>` — maps 4 layout types to representative components (single-column→MinimalTemplate, two-column→ModernTemplate, split→CreativeTemplate, timeline→ClassicTemplate)
- [ ] 1.4 Rewrite `getTemplateComponent(template: string)` with two-tier resolution: (a) check directComponentMap → return match; (b) look up templateDefinitionMap[template]?.layoutType → check layoutComponentMap → return match; (c) console.warn + return ModernTemplate as safe default
- [ ] 1.5 Export `getTemplateComponent` for unit testing (remove `function` → `export function`)

## Phase 2: Testing — Create ExportMenu test suite

- [ ] 2.1 Create `tests/components/resume/export/ExportMenu.test.tsx`
- [ ] 2.2 Add `vi.mock('@/components/resume/templates', ...)` with 6 distinct function references so tests can compare by identity
- [ ] 2.3 Write direct mapping tests (6 cases): modern→ModernTemplate, classic→ClassicTemplate, minimal→MinimalTemplate, creative→CreativeTemplate, technical→TechnicalTemplate, softwareDeveloper→SoftwareDeveloperTemplate
- [ ] 2.4 Write layoutType fallback tests — two-column (12 cases): dataScientist, uxDesigner, productManager, marketing, accountant, nurse, teacher, lawyer, engineer, hr, consultant, itSupport, military → ModernTemplate
- [ ] 2.5 Write layoutType fallback tests — single-column (2 cases): academic, federal → MinimalTemplate
- [ ] 2.6 Write layoutType fallback tests — split (3 cases): graphicDesigner, sales, executive → CreativeTemplate
- [ ] 2.7 Write layoutType fallback tests — timeline (1 case): projectManager → ClassicTemplate
- [ ] 2.8 Write edge case test: unknown template string → ModernTemplate + console.warn
- [ ] 2.9 Write regression test: iterate all 25 TemplateType values, verify each resolves non-null

## Phase 3: Verification — Run and fix

- [ ] 3.1 Run `npm test -- tests/components/resume/export/ExportMenu.test.tsx`
- [ ] 3.2 Fix any failing test cases
- [ ] 3.3 Run full test suite `npm test` to confirm no regressions

## Phase 4: Cleanup

- [ ] 4.1 Run `npm run type-check` — confirm no TS errors
- [ ] 4.2 Run `npm run lint` — confirm no lint errors
