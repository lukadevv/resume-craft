# Tasks: Resume Workflow Redesign

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~800-1100 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr-default |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Full redesign | PR 1 | Single PR per user preference |

## Phase 1: Store & Foundation

- [x] 1.1 `src/store/resume.ts`: wrap `createResume` into object param `{ template?, name?, initialData? }`, remove sample data auto-fill
- [x] 1.2 Delete `src/components/resume/editor/EditDetailsPanel.tsx`

## Phase 2: Create Page V2

- [x] 2.1 `src/app/create/CreatePageClient.tsx`: add resume name input, rename button "Start Building", disable when empty, remove modal/EditDetailsPanel reference

## Phase 3: Wizard Core

- [x] 3.1 `src/app/resume/wizard/page.tsx`: Suspense route entry
- [x] 3.2 `src/components/wizard/StepSidebar.tsx`: step list + progress bar + checkmarks
- [x] 3.3 `src/components/wizard/StepForm.tsx`: step→form mapping, required indicators, Back/Next
- [x] 3.4 `src/components/wizard/StepPreview.tsx`: PlaygroundPreview at native scale, empty-state placeholder
- [x] 3.5 `src/app/resume/wizard/WizardClient.tsx`: 3-panel grid, step state, Back/Next/Finish, "Load sample data"

## Phase 4: Review & Export

- [x] 4.1 `src/components/wizard/ReviewExport.tsx`: read-only section summaries, Edit links, ExportMenu for 5 formats

## Phase 5: Tests

- [x] 5.1 `tests/store/resume.test.ts`: assert no sample auto-fill, verify name param
- [x] 5.2 `tests/components/wizard/StepSidebar.test.tsx`: rendering, completion derivation, click behavior
- [x] 5.3 `tests/components/wizard/StepForm.test.tsx`: form render, required-field validation, Back/Next
- [x] 5.4 `tests/components/wizard/StepPreview.test.tsx`: live update, empty-state placeholder, responsive toggle
- [x] 5.5 `tests/components/wizard/ReviewExport.test.tsx`: summaries, Edit nav, export trigger
- [x] 5.6 `tests/components/wizard/WizardClient.test.tsx`: full 7-step nav, form→preview link, responsive FAB
- [x] 5.7 `tests/app/create/CreatePageClient.test.tsx`: name input, button disabled, template picker
- [x] 5.8 `pnpm test`: verify all pass
- [x] 5.9 `pnpm run type-check && pnpm run lint`: fix any issues
