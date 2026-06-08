# Tasks: Add Export Edge-Case Tests

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 350–400 (additions only, no deletions) |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR (all tests, same file, no source changes) |
| Delivery strategy | exception-ok |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | All 23 new tests + mocks + helpers | Single PR | Test-only; no source changes; one file |

## Phase 1: Setup — Imports, Mocks, Helpers

- [x] 1.1 Add `vi` to vitest import; add `downloadFile`, `exportToPDF`, `exportToDOCX` to module imports
- [x] 1.2 Add module-level `vi.mock('html2canvas-pro', ...)` — default returns `{ toDataURL: () => 'data:image/jpeg;base64,mock' }`
- [x] 1.3 Add module-level `vi.mock('jspdf', ...)` — jsPDF constructor returns `{ internal: { pageSize: { getWidth: () => 210 } }, addImage: vi.fn(), save: vi.fn() }`
- [x] 1.4 Add `createEmptyResumeForTest()` helper using `createEmptyResume()` spread
- [x] 1.5 Add XSS warning comment block above the upcoming XSS describe block

## Phase 2: downloadFile Tests (4 scenarios)

- [x] 2.1 Spy on `URL.createObjectURL`, `URL.revokeObjectURL`, `document.body.appendChild`, `document.body.removeChild`, and `HTMLAnchorElement.prototype.click` in a shared `beforeEach`
- [x] 2.2 Test: creates Blob with correct MIME type (assert `appendChild` spy receives anchor with `href` starting `blob:`)
- [x] 2.3 Test: sets anchor.href to blob URL and anchor.download to filename (assert both properties post-call)
- [x] 2.4 Test: appendChild → click → removeChild lifecycle (assert all three called exactly once, correct element)
- [x] 2.5 Test: calls URL.revokeObjectURL exactly once after download completes

## Phase 3: exportToText Edge Cases (6 scenarios)

- [x] 3.1 Test: empty resume → header only, no `WORK EXPERIENCE` / `SKILLS` section labels
- [x] 3.2 Test: emoji in summary → preserved literally in output
- [x] 3.3 Test: `current=true` experience → date shows `Present`
- [x] 3.4 Test: missing `endDate` + `current=false` → only start date shown
- [x] 3.5 Test: newlines in description → preserved in output
- [x] 3.6 Test: all arrays empty (skills, exp, edu) → their sections fully omitted

## Phase 4: exportToHTML Edge Cases + XSS (5 scenarios)

- [x] 4.1 Test: empty resume → valid HTML structure (`<!DOCTYPE html>`, `<html>`, no work/edu sections)
- [x] 4.2 Test: special characters (`<`, `>`, `"`) in position/company → appear verbatim (unsanitized)
- [x] 4.3 Test (XSS): `<script>alert(1)</script>` in summary → appears verbatim in HTML output
- [x] 4.4 Test (XSS): `<img src=x onerror=alert(1)>` in description → onerror appears unescaped
- [x] 4.5 Test (XSS): `&amp;` entity in company name → appears as literal `&amp;`, not double-escaped

## Phase 5: exportToJSON Edge Cases (2 scenarios)

- [x] 5.1 Test: special characters (Unicode, quotes, backslashes) → valid JSON with proper escapes (`JSON.parse` round-trips)
- [x] 5.2 Test: empty resume → valid JSON with empty arrays, no crash

## Phase 6: exportToDOCX Tests (4 scenarios)

- [x] 6.1 Test: output contains Word XML namespaces (`xmlns:w`, `xmlns:o`)
- [x] 6.2 Test: output wraps exportToHTML content inside `<body>` tag
- [x] 6.3 Test: creates Blob with `application/msword` MIME (assert via anchor href → blob → type assertion in spy)
- [x] 6.4 Test: filename is `{firstName}_{lastName}_resume.doc`

## Phase 7: exportToPDF Tests (2 scenarios)

- [x] 7.1 Test: when HTMLElement is `null`, function throws or returns without crashing (try/catch assertion)
- [x] 7.2 Test: `vi.mocked(html2canvas-pro)` and `vi.mocked(jsPDF)` are both resolved (assert dynamic imports succeed, constructor called with `{ unit: 'mm', format: 'a4' }`)

## Phase 8: Verify

- [x] 8.1 Run `npm test` — all 29 tests pass (6 existing + 23 new), no regressions
- [x] 8.2 Run `npm run type-check` — no new type errors introduced
