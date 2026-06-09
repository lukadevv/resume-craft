# Proposal: Resume Workflow Redesign

## Intent

Replace the fragmented `/create` + editor experience with a guided 2-phase wizard. Users currently face duplicate edit surfaces (`EditDetailsPanel` modal then full editor), no progress indication, poor preview scaling (`scale-[0.85]`), and ambiguous required vs optional fields. The redesign delivers progressive disclosure that builds confidence.

## Scope

### In Scope
- Rename "Create Resume" → "Start Building", disabled until resume name filled
- Remove `EditDetailsPanel` modal from `/create` flow entirely
- New route `/resume/wizard?id=xxx` — 3-panel layout (step sidebar, form, live preview)
- 7 ordered sections: Personal Info → Summary → Experience → Education → Skills → Projects → Additional (certs, languages, interests, references)
- Review & Export final step with all 5 export formats
- Responsive: desktop 3-col, tablet preview-toggle, mobile FAB
- "Load sample data" button in wizard (optional)

### Out of Scope
- Template editing inside wizard
- ATS optimization / resume scoring
- Multi-language support in wizard
- Dark mode preview panel

## Capabilities

### New Capabilities
- `wizard-navigation`: Step sidebar with progress bar, checkmarks, disabled future steps
- `wizard-form`: Step-based forms with Back/Next, field validation, required-field indicators
- `wizard-preview`: Live preview panel properly scaled (CSS, no `scale-[0.85]`), empty-state sample data
- `wizard-review-export`: Final-review step with all 5 output formats (PDF, DOCX, HTML, JSON, TXT)
- `create-page-v2`: Template picker with name input, button disabled until name non-empty, no modal

### Modified Capabilities
None — existing export and template capabilities remain unchanged at spec level.

## Approach

**Phase 1** — Refactor `CreatePageClient.tsx`: add resume name input, inline personal-info field, disable button when name empty, wire to Zustand store, remove `EditDetailsPanel` reference. **Phase 2** — New `ResumeWizardPageClient.tsx` at `/resume/wizard`. Zustand `createResume` modified to not auto-fill sample data (wizard starts empty). CSS Grid for desktop layout, media queries for responsive breakpoints. Shared preview component reused from templates. No new dependencies.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/create/CreatePageClient.tsx` | Modified | Name input, button rename/disable, remove modal |
| `src/app/resume/wizard/page.tsx` | New | Wizard route entry |
| `src/app/resume/wizard/WizardClient.tsx` | New | 3-panel wizard layout + logic |
| `src/components/wizard/` | New | StepSidebar, StepForm, StepPreview, ReviewExport |
| `src/store/resume.ts` | Modified | `createResume` no longer auto-fills sample data |
| `src/components/resume/editor/EditDetailsPanel.tsx` | Removed | Obsolete — wizard replaces it |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Breaking existing `/create` → editor redirect | Medium | Keep legacy route active with deprecation flag |
| SPA navigation state loss inside wizard | Low | All state in Zustand, localStorage-persisted |
| Sample data mistaken for real user data | Low | Explicit empty-state markers, "Load sample" action |

## Rollback Plan

Single-commit revert: restore prior `CreatePageClient.tsx` (backup), remove `/resume/wizard` route, restore `createResume` sample-data behavior.

## Dependencies

None — all client-side, no new packages required beyond existing stack.

## Success Criteria

- [ ] User reaches Review & Export having navigated all 7 sections
- [ ] Preview updates live on every field change (no manual refresh)
- [ ] Responsive layout renders correctly at mobile (375px), tablet (768px), desktop (1280px)
- [ ] "Start Building" button disabled when name input is empty
- [ ] Export generates valid output for all 5 formats from wizard
