# Export Test Coverage Specification

## Purpose

Define required test coverage for 6 export functions in `src/lib/export/resume-export.ts`.
`downloadFile`, `exportToPDF`, `exportToDOCX` are untested; `exportToHTML` has a live XSS gap
(user content injected with zero sanitization) that tests MUST document.

## Requirements

### Requirement: exportToText Edge Cases

| # | Scenario | Expected |
|---|---|---|
| 1 | GIVEN empty resume WHEN exportToText THEN header only, no section labels |
| 2 | GIVEN emoji in summary WHEN exportToText THEN preserved literally |
| 3 | GIVEN `current=true` experience WHEN exportToText THEN shows "Present" |
| 4 | GIVEN missing end-date + current=false WHEN exportToText THEN only start date |
| 5 | GIVEN newlines in description WHEN exportToText THEN line breaks preserved |
| 6 | GIVEN empty arrays (skills/exp/edu) WHEN exportToText THEN sections omitted |

### Requirement: exportToHTML XSS Exposure

Tests SHALL inject XSS payloads and assert they appear UNSANITIZED. These document the gap for
a future fix.

| # | Scenario | Expected |
|---|---|---|
| 1 | GIVEN `<script>alert(1)</script>` in summary WHEN exportToHTML THEN tag appears verbatim (XSS gap) |
| 2 | GIVEN `<img src=x onerror=alert(1)>` in description WHEN exportToHTML THEN onerror unescaped |
| 3 | GIVEN `&amp;` in company name WHEN exportToHTML THEN entity appears as-is |
| 4 | GIVEN empty resume WHEN exportToHTML THEN valid HTML structure, header only |

### Requirement: exportToJSON Integrity

| # | Scenario | Expected |
|---|---|---|
| 1 | GIVEN full resume WHEN exportToJSON THEN JSON.parse reproduces original shape |
| 2 | GIVEN special chars WHEN exportToJSON THEN valid JSON with escapes |
| 3 | GIVEN empty resume WHEN exportToJSON THEN valid JSON, empty arrays |

### Requirement: downloadFile jsdom

| # | Scenario | Expected |
|---|---|---|
| 1 | GIVEN content + filename WHEN downloadFile THEN Blob created with correct MIME type |
| 2 | GIVEN content WHEN downloadFile THEN anchor.href starts with `blob:`, download=filename |
| 3 | GIVEN content WHEN downloadFile THEN anchor appended to body, clicked, removed |
| 4 | GIVEN content WHEN downloadFile THEN URL.revokeObjectURL called after download |

### Requirement: exportToDOCX

| # | Scenario | Expected |
|---|---|---|
| 1 | GIVEN normal resume WHEN exportToDOCX THEN Word XML namespace present |
| 2 | GIVEN normal resume WHEN exportToDOCX THEN wraps exportToHTML output in `<body>` |
| 3 | GIVEN normal resume WHEN exportToDOCX THEN Blob MIME `application/msword` |
| 4 | GIVEN first/last name WHEN exportToDOCX THEN filename `{first}_{last}_resume.doc` |

### Requirement: exportToPDF Import Structure

Full rendering out of scope.

| # | Scenario | Expected |
|---|---|---|
| 1 | GIVEN null HTMLElement WHEN exportToPDF THEN fails cleanly, no crash |
| 2 | GIVEN valid element mock WHEN await top-level THEN `Promise.all` resolves |

### Requirement: formatDate / formatDateRange (indirect coverage)

| # | Scenario | Expected |
|---|---|---|
| 1 | GIVEN `"2020-06"` WHEN exported THEN "Jun 2020" appears |
| 2 | GIVEN empty start date WHEN exported THEN no date line |
| 3 | GIVEN current=true WHEN exported THEN "Present" appears |

## Mocking Strategy

| Concern | Approach |
|---|---|
| `URL.createObjectURL` | `vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock')` |
| `anchor.click()` | `vi.spyOn(HTMLAnchorElement.prototype, 'click')` |
| `document.createElement` | Native jsdom (no mock) |
| `Blob` | Native jsdom (no mock) |
| Dynamic imports | `vi.mock()` stubs; verify `Promise.all` structure |
