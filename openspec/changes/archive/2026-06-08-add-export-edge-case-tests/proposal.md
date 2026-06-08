# Proposal: Add Export Edge-Case Tests

## Intent

`tests/export.test.ts` has only 6 happy-path tests for 6 exported functions. `exportToPDF`, `exportToDOCX`, and `downloadFile` are completely untested. Critically, `exportToHTML` injects user content directly into HTML via template literals with **zero escaping or sanitization** — a real XSS gap. This change fills those test gaps with edge-case coverage.

## Scope

### In Scope
- `exportToText`: empty resume, missing fields, empty arrays, date edge cases, special chars
- `exportToHTML`: **XSS vectors** (`<script>`, `<img onerror>`, entities), empty resume, empty arrays
- `exportToJSON`: round-trip integrity, empty resume, special characters
- `downloadFile`: Blob creation, anchor attributes, DOM lifecycle (jsdom)
- `exportToDOCX`: Word XML wrapper structure, BLOB MIME type
- `exportToPDF`: import structure verification, null element handling

### Out of Scope
- Fixing HTML escaping — this proposal is **test-only** (a separate change addresses sanitization)
- Full browser rendering tests for PDF/DOCX
- PDF visual correctness (requires real browser)
- Snapshot tests

## Capabilities

### New Capabilities
None — this change adds tests only, no new runtime capabilities.

### Modified Capabilities
None — existing spec behavior is unchanged.

## Approach

**Pure functions** (exportToText, exportToHTML, exportToJSON): No mocking. Build mock resumes with edge-case data, assert output.

**jsdom tests** (downloadFile, exportToDOCX): Mock `URL.createObjectURL` and `HTMLAnchorElement.click`. Assert Blob construction and anchor attributes.

**Dynamic imports** (exportToPDF): Verify `Promise.all` structure; assert null element fails cleanly. Cannot test rendering without real DOM.

**Helpers** (formatDate, formatDateRange): Covered indirectly via export functions; explicit tests added if gaps remain.

Conventions per `.opencode/skills/testing.md`: `describe`/`it`, Vitest assertions, no snapshots.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `tests/export.test.ts` | Modified | Add ~35–45 new test cases across all 6 functions |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| XSS tests expose real vulnerability with no fix yet | High | Separate change follows for sanitization |
| jsdom `click()` differs from real browser | Low | Mock with `vi.fn()`, assert parameters |
| `html2canvas-pro` mock complexity | Med | Test only import structure, not rendering |

## Rollback Plan

Revert `tests/export.test.ts` to current state. No runtime code changes.

## Dependencies

- Vitest 4.1.0 (already installed)
- jsdom environment (already configured in `vitest.config.ts`)

## Success Criteria

- [ ] ≥35 new test cases added in `tests/export.test.ts`
- [ ] XSS injection tests for `exportToHTML` — `<script>`, `<img onerror>`, HTML entities
- [ ] `downloadFile` tested for Blob, anchor DOM lifecycle
- [ ] `exportToDOCX` tested for Word XML wrapper
- [ ] `exportToPDF` tested for import structure (at minimum)
- [ ] All tests pass: `npm test`
- [ ] No regressions in existing 6 tests
