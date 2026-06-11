# Proposal: Redesign My Resumes Page

## Intent

The "My Resumes" page shows a plain grid of text-only cards. Template definitions in `src/lib/templates.ts` carry `accentColor` and `landingPresentation` (cardBackground gradients + hoverOverlays) that go unused. Users can't search, sort, paginate, multi-select, or visually distinguish resumes. This redesign bridges the rich template system with a functional, visually distinctive listing page.

## Scope

### In Scope
- Template-styled cards using each template's `accentColor` and `landingPresentation` (gradients, color glows, hover overlays)
- Mini visual preview per card reflecting the resume's template identity
- Search bar filtering by name
- Sort dropdown (name, date, template)
- Pagination: 9 cards per page (3×3 grid)
- Multi-select checkboxes → bulk delete + bulk export (text, HTML, JSON, PDF, DOCX via existing `src/lib/export/resume-export.ts`)
- Existing per-card actions dropdown (Edit, Duplicate, Delete)
- Polished empty state with improved visuals and messaging

### Out of Scope
- Changes to create/edit resume flow
- Template editor or preview page
- Drag-and-drop reordering, folder/collection organization
- Any server-side features, search indexing, or API routes

## Capabilities

### New Capabilities
None

### Modified Capabilities
None

## Approach

Decompose the current page into composable components under `src/components/my-resumes/`: `ResumeCard` (styled with template `landingPresentation`), `SearchAndSortBar`, `Pagination`, `BulkActionBar`, and `EmptyState`. Derive card styles dynamically from `templateDefinitionMap[resume.template]`. Use `useMemo` for search/filter/sort/paginate computations. Wire Zustand `useResumeStore.resumes`, `deleteResume`, and `duplicateResume`. Reuse existing export functions for bulk export. Multi-select managed via local `Set<string>` state.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/my-resumes/page.tsx` | Modified | Refactored into new component tree |
| `src/components/my-resumes/` | New | `ResumeCard`, `SearchAndSortBar`, `Pagination`, `BulkActionBar`, `EmptyState` |
| `tests/my-resumes/` | New | Unit + integration tests for new components and page |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| `landingPresentation` CSS gradients conflict with Tailwind v4 inline `@theme` | Low | Test light/dark modes; template system already uses `color-mix()` |
| Bulk export of many resumes triggers browser memory pressure | Low | Export sequentially with progress feedback |
| Paginated grid renders inconsistently across viewports | Low | Tailwind responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) |

## Rollback Plan

Revert `src/app/my-resumes/page.tsx` to current single-file implementation. Remove `src/components/my-resumes/`. No store or type changes — clean file swap.

## Dependencies

None. Uses existing `src/lib/templates.ts`, `src/store/resume.ts`, `src/lib/export/resume-export.ts`, and UI primitives.

## Success Criteria

- [ ] Cards render with correct `accentColor` and `landingPresentation` per template
- [ ] Search filters by name; sort reorders by chosen field; pagination shows 9/page
- [ ] Multi-select enables bulk delete and bulk export (all 5 formats)
- [ ] Empty state renders with polished visuals when no resumes exist
- [ ] All tests pass (`pnpm test`) with coverage for new components
- [ ] `pnpm run build` succeeds (static export)
