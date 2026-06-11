# Tasks: Redesign My Resumes Page

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~650–800 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Core display) → PR 2 (Bulk actions + wiring) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Core display: EmptyState, ResumeCard, SearchAndSortBar, Pagination, barrel, page integration + tests | PR 1 | Base = main (stacked) or feature/tracker branch |
| 2 | Bulk actions: BulkActionBar + multi-select + bulk handlers + page wiring + tests | PR 2 | Base = main (stacked) or PR 1 branch (feature-branch) |

## Phase 1: Foundation

- [x] 1.1 Create `src/components/my-resumes/EmptyState.tsx` — icon, heading, subtitle, CTA
- [x] 1.2 Create `src/components/my-resumes/index.ts` — barrel re-export of all components

## Phase 2: Core Components

- [x] 2.1 Create `src/components/my-resumes/ResumeCard.tsx` — `landingPresentation` gradient bg, mini preview (CSS abstract shapes), accent color indicator, checkbox, actions dropdown
- [x] 2.2 Create `src/components/my-resumes/SearchAndSortBar.tsx` — search input + sort dropdown (name/date/template)
- [x] 2.3 Create `src/components/my-resumes/Pagination.tsx` — prev/next, page numbers, 9/page

## Phase 3: Bulk Actions + Page Integration

- [x] 3.1 Create `src/components/my-resumes/BulkActionBar.tsx` — select-all checkbox, delete button, export dropdown (text/HTML/JSON/DOCX; skip PDF)
- [x] 3.2 Add multi-select state (`Set<string>`) + bulk delete handler to page — clears on page change
- [x] 3.3 Add bulk export handler — sequential downloads with 300ms gap using `src/lib/export/resume-export.ts`
- [x] 3.4 Refactor `src/app/my-resumes/page.tsx` — compose SearchAndSortBar, ResumeCard grid (3×3), Pagination, BulkActionBar, EmptyState

## Phase 4: Testing

- [x] 4.1 Write `tests/my-resumes/EmptyState.test.tsx` — renders icon, messaging, CTA
- [x] 4.2 Write `tests/my-resumes/ResumeCard.test.tsx` — template gradient, checkbox toggle, actions dropdown
- [x] 4.3 Write `tests/my-resumes/SearchAndSortBar.test.tsx` — name filter, sort reorder, edge cases
- [x] 4.4 Write `tests/my-resumes/Pagination.test.tsx` — page nav, prev/next disabled at boundaries
- [x] 4.5 Write `tests/my-resumes/BulkActionBar.test.tsx` — multi-select, delete triggers store, export triggers download
