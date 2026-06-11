# Design: Redesign My Resumes Page

## Technical Approach

Decompose the monolithic `page.tsx` into 5 composable components under `src/components/my-resumes/`. Derive card styling dynamically from `templateDefinitionMap[resume.template].landingPresentation` using inline CSS custom properties. Search, sort, and pagination are pure `useMemo` computations over `useResumeStore.resumes[]`. Multi-select state is a local `Set<string>`; no store changes needed. Bulk export reuses existing `src/lib/export/resume-export.ts` functions with sequential iteration.

## Architecture Decisions

| Decision | Option | Tradeoff | Choice |
|---|---|---|---|
| **Multi-select state** | Local `Set<string>` vs store slice | Store adds persistence+complexity for ephemeral UI state; local is simpler and resets on navigation | Local `Set<string>` |
| **Mini preview** | CSS-only abstract layout vs scaled-down template render | Real render is complex (requires full resume data + template shell); CSS shapes with accent color gradients are fast and match template identity | CSS-only abstract layout |
| **Pagination** | Local state vs URL params | URL params require `useSearchParams` (client-only); local state simpler for SSG page | Local state (`page`, `pageSize=9`) |
| **Bulk PDF/DOCX** | Sequential downloads vs zip archive | Browser blocks multiple rapid downloads; `JSZip` adds a dependency. Sequential with `setTimeout` gap is pragmatic | Sequential with 300ms gap between downloads |

## Data Flow

```
useResumeStore.resumes[] ────▶ useMemo(filter+sort) ────▶ useMemo(paginate)
                                       │                          │
                                       ▼                          ▼
                              SearchAndSortBar              ResumeCard[] (9/page)
                                       │
                              ┌────────┴────────┐
                              ▼                 ▼
                        BulkActionBar      Pagination
                        (selected: Set)    (page state)
                              │
                    ┌─────────┴──────────┐
                    ▼                    ▼
              bulkDelete()         bulkExport()
              (iterate store)     (iterate export lib)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/my-resumes/ResumeCard.tsx` | Create | Styled card with `landingPresentation` gradients, mini preview, checkbox, actions dropdown |
| `src/components/my-resumes/SearchAndSortBar.tsx` | Create | Search input + sort dropdown (name, updatedAt, template) |
| `src/components/my-resumes/Pagination.tsx` | Create | Prev/next + page numbers, 9-per-page |
| `src/components/my-resumes/BulkActionBar.tsx` | Create | Select-all toggle, delete selected, export dropdown (text/HTML/JSON/PDF/DOCX) |
| `src/components/my-resumes/EmptyState.tsx` | Create | Icon, heading, subtitle, CTA button |
| `src/components/my-resumes/index.ts` | Create | Barrel re-exports |
| `src/app/my-resumes/page.tsx` | Modify | Refactor to compose new components; keep `'use client'` |
| `tests/my-resumes/ResumeCard.test.tsx` | Create | Template styling, actions, checkbox behavior |
| `tests/my-resumes/Pagination.test.tsx` | Create | Page navigation, edge cases |
| `tests/my-resumes/SearchAndSortBar.test.tsx` | Create | Filter + sort logic |
| `tests/my-resumes/BulkActionBar.test.tsx` | Create | Multi-select, bulk delete/export |

## Interfaces / Contracts

ResumeCard receives template-derived styles as props. No new types needed — everything is derived from existing `TemplateDefinition` and `Resume`.

```ts
// ResumeCard inline style derivation
const def = templateDefinitionMap[resume.template];
const lp = def.landingPresentation ?? getLandingPresentation(def.accentColor);
const style = {
  '--card-bg-light': lp.cardBackground.light,
  '--card-bg-dark': lp.cardBackground.dark,
  '--hover-overlay-light': lp.hoverOverlay.light,
  '--hover-overlay-dark': lp.hoverOverlay.dark,
  '--accent': def.accentColor,
} as React.CSSProperties;
```

Mini preview: a 100%×80px div with `background: var(--card-bg-light)` (or dark variant), containing abstract colored bars (`bg-[var(--accent)]/20`, `bg-foreground/10`) positioned to suggest layout structure (sidebar + content columns). The preview is purely decorative — no real resume data rendered.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Component | ResumeCard renders name, template label, formatted date, checkbox | RTL render with mocked store |
| Component | Card applies correct gradient from `landingPresentation` | Check `style` attribute on rendered element |
| Component | Search filters by name substring | Type in search input, assert card visibility |
| Component | Sort reorders by selected field | Select sort option, assert card order |
| Component | Pagination shows correct page, prev/next disabled at boundaries | Render 10+ resumes, assert only 9 visible |
| Integration | Bulk select → delete removes cards | Check checkboxes, click delete, verify store called |
| Integration | Bulk export dropdown triggers download | Mock `downloadFile`, verify called per selected resume |

## Migration / Rollout

No migration required. Feature is self-contained within the My Resumes page.

## Open Questions

- [ ] Bulk PDF export requires rendering each resume to a DOM element (html2canvas) — implement with hidden container + sequential render, or skip PDF from bulk and document the limitation?
- [ ] Should multi-select persist across page changes? (Current design: selection clears on page change for simplicity)
