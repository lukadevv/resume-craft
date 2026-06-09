# Proposal: Template Layout Shells

## Intent

Replace the layout-based fallback system with 4 data-driven layout shells so all 25 templates render their full visual identity — not a generic fallback. Today 19 templates share 4 generic components, losing accent colors, background gradients, emphasis components, and section ordering defined in `templates.ts`.

## Scope

### In Scope
- 4 layout shells: `TwoColumnShell`, `SplitShell`, `SingleColumnShell`, `TimelineShell`
- 4 emphasis components: `SkillBars`, `MetricsCallout`, `TimelineGraphic`, `CertificationBadge`
- Expand `Resume` type with 14 role-specific fields
- Route 23 templates through shells; retain `TechnicalTemplate` and `SoftwareDeveloperTemplate` as standalones
- Tests for all shells (A4 794×1123px output) and emphasis components

### Out of Scope
- Changing template definitions in `templates.ts`
- Altering export engine (`resume-export.ts`)
- New template definitions beyond the existing 25
- Interactive preview in the template picker (stays delegate to shells)

## Capabilities

### New Capabilities
- `template-shell-components`: Layout shells that consume `TemplateDefinition` for colors, sections, and emphasis.
- `emphasis-components`: SkillBars, MetricsCallout, TimelineGraphic, CertificationBadge shared components.
- `resume-type-expansion`: Added fields: tools, coreCompetencies, achievements, portfolio, awards, affiliations, publications, grantsFellowships, conferences, clinicalSkills, licenses, barAdmission, practiceAreas, securityClearance, teachingPhilosophy, classroomExperience, teachingExperience.

### Modified Capabilities
- `template-pdf-export`: `getTemplateComponent()` routing changes from 4 layout fallbacks to 4 shell + 2 direct mappings.

## Approach

Each shell is a pure function of `TemplateDefinition`. On mount it reads `getTemplateDefinition(resume.template)` and adapts:
- Background via `BackgroundLayer` (gradient + overlay from definition)
- Accent color passed to children as a prop
- Sections rendered from `primarySections`/`sidebarSections` arrays
- Emphasis components conditionally rendered from `emphasisComponents` array
- Light/dark mode via Tailwind classes bound to `resume.themeColor`

`TechnicalTemplate` and `SoftwareDeveloperTemplate` retain direct mapping — they have unique visuals (terminal aesthetic, glassmorphism) that don't fit the shell pattern.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/types/resume.ts` | Modified | Add 14 role-specific fields |
| `src/components/resume/templates/` | New/Modified | 4 new shell components + re-exports |
| `src/components/templates/shared/` | New | 4 emphasis components |
| `src/components/resume/export/ExportMenu.tsx` | Modified | Replace layout fallbacks with shell routing |
| `src/store/resume.ts` | Modified | Add fields + `createEmptyResume` defaults |
| `src/lib/templates.ts` | Read-only | No changes, consumed by shells |
| `tests/` | New | Shell + emphasis component tests |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| A4 overflow with emphasis components | Med | Test each shell at 794×1123px; cap emphasis count |
| `Resume` type expansion breaks form components | High | Add fields additively with empty defaults; no existing field removed |
| Shell abstraction loses per-template nuance | Low | Verify all 23 templates visually; delegate special cases to standalone components |

## Rollback Plan

Revert `getTemplateComponent()` to the current `layoutComponentMap` fallback (4 entries). Delete new shell/emphasis files. The expansion of `Resume` type is backward-compatible (additive fields, empty defaults remain).

## Dependencies

- None external. All data from `templates.ts` already exists.

## Success Criteria

- [ ] All 25 templates render their definition's accent color, gradient, and emphasis components
- [ ] A4 export (794×1123px) for each shell type passes visual regression
- [ ] Tests pass for all 4 shells + 4 emphasis components (Strict TDD)
- [ ] `TechnicalTemplate` and `SoftwareDeveloperTemplate` unchanged — no regression
- [ ] Build succeeds with static export (`output: 'export'`)

## Phases

| # | Phase | Deliverable |
|---|-------|-------------|
| 1 | Foundation | Expand `Resume` type + 4 emphasis components |
| 2 | TwoColumnShell | Shell + tests, route 14 two-column templates |
| 3 | SplitShell | Shell + tests, route 4 split templates |
| 4 | SingleColumnShell | Shell + tests, route 3 single-column templates |
| 5 | TimelineShell | Shell + tests, route 2 timeline templates |
| 6 | Polish | Visual review of all 25 templates, A4 verification |
