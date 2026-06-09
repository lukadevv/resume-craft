# Design: Resume Workflow Redesign

## Technical Approach

Two-phase refactor reusing `EditClient.tsx` patterns. Phase 1 strips `EditDetailsPanel` modal from `/create`, adds name input, disables button until non-empty. Phase 2 introduces `/resume/wizard?id=xxx` as CSS Grid 3-panel layout: left step sidebar, center form, right live preview. Reuses existing `*Form` components and `PlaygroundPreview` (without `scale-[0.85]`). Store: `createResume` drops auto-filled sample data; wizard starts empty, optional "Load sample data" calls `getSampleDataForTemplate`.

## Architecture Decisions

| Decision | Choice | Alternative | Rationale |
|---|---|---|---|
| Step state | `useState<number>` in `WizardClient` | Zustand slice | Ephemeral UI state. No cross-component sharing needed. |
| Store sample data | Remove `...sampleData` from `createResume` | Boolean flag param | `/create` already passes merged data via `initialData`; no caller relies on store auto-fill. |
| Form reuse | Wrap existing `*Form` components | New form components | All forms accept `data`+`onUpdate` matching `updateResume`. Zero rewrite. |
| Preview | `PlaygroundPreview` at native scale with `aspect-[210/297]` | New component | Already supports `Partial<Resume>` + all 25 templates with layout types. |
| Routing | `/resume/wizard?id=xxx` query param | Dynamic route `[id]` | Static export constraint. Matches existing `/resume/edit?id=xxx`. |
| Responsive | CSS Grid `grid-cols-[280px_1fr_360px]` | Flexbox | Terse, maps to 3-panel spec. Mobile FAB pattern already in `EditClient.tsx`. |
| Additional step | Single step rendering 4 sub-forms (Certs, Languages, Interests, References) | 4 separate steps | Reduces navigation fatigue. Proposal groups them. |

## Data Flow

```
Zustand store
  └─ WizardClient: getResumeById(id) → local resume ref
       ├─ StepSidebar: reads step index + per-step completion (derived, not stored)
       ├─ StepForm:   resume[section] → *Form onUpdate → updateResume(id, partial)
       ├─ StepPreview: resume → PlaygroundPreview
       └─ ReviewExport: resume → ExportMenu + template component
```

Step completion: derived booleans (e.g., `firstName !== ''`). No separate completion state persisted.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/app/create/CreatePageClient.tsx` | Modify | Add name input; rename button "Start Building" (disabled when empty); remove EditDetailsPanel modal |
| `src/app/resume/wizard/page.tsx` | Create | Route entry with Suspense, exports WizardClient |
| `src/app/resume/wizard/WizardClient.tsx` | Create | 3-panel grid, step index state, Back/Next/Finish, "Load sample data" |
| `src/components/wizard/StepSidebar.tsx` | Create | Step list, progress bar, checkmarks, click-to-navigate (completed/current only) |
| `src/components/wizard/StepForm.tsx` | Create | Maps step→form component, Back/Next, required-field badge |
| `src/components/wizard/StepPreview.tsx` | Create | PlaygroundPreview at `aspect-[210/297]`, sticky |
| `src/components/wizard/ReviewExport.tsx` | Create | Full preview + ExportMenu with 5 formats |
| `src/store/resume.ts` | Modify | Remove `...sampleData` line; add optional `name` param to `createResume` |
| `src/components/resume/editor/EditDetailsPanel.tsx` | Delete | Replaced by wizard |
| `tests/components/wizard/WizardClient.test.tsx` | Create | Integration: navigate steps, fill form, verify preview |
| `tests/components/wizard/StepSidebar.test.tsx` | Create | Unit: step rendering, completion logic, click behavior |
| `tests/store/resume.test.ts` | Modify | Assert no sample auto-fill; test name param |

## Interfaces / Contracts

`createResume` signature change: `(template?, initialData?)` → `(options?: { template?: TemplateType; name?: string; initialData?: Partial<Resume> })`. Object param avoids positional overload. No new types needed — existing `Resume` and section interfaces suffice. Wizard steps defined internally:

```typescript
type WizardStepId = 'personal' | 'summary' | 'experience' | 'education'
  | 'skills' | 'projects' | 'additional' | 'review';
```

## Testing Strategy

| Layer | What | How |
|---|---|---|
| Unit | StepSidebar rendering, completion derivation, disabled steps | RTL, mock resume states |
| Unit | CreatePage name input: button disabled when empty | RTL, assert `disabled` attr |
| Unit | Store: `createResume` no sample auto-fill, name param | Resume store test suite |
| Integration | WizardClient: 7-step navigation, form fill → preview DOM update | RTL, mocked Zustand |
| Integration | "Load sample data" populates sections | Click button, assert non-empty fields |
| Integration | Responsive: FAB visible at 375px, 3-col at 1280px | Viewport resize or CSS class assertions |

## Migration

None. Existing `/resume/edit` untouched. Rollback: single-commit revert restoring `EditDetailsPanel.tsx` and `...sampleData` line.

## Open Questions

- [ ] Redirect to `/create` when no `id` param, or show empty-state prompt?
- [ ] Persist step completion across sessions or keep ephemeral?
