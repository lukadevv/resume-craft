# Proposal: Add Zustand Store Unit Tests

## Intent

`src/store/resume.ts` has zero test coverage despite being the single source of truth for all resume CRUD. Every action is untested — a regression in any of the 6 actions would silently break the app. This change adds a focused unit test suite covering all store actions, edge cases, and persistence behavior.

## Scope

### In Scope
- `tests/store/resume.test.ts` — single test file covering all 6 actions:
  - `createResume`: default template, custom template, initial data merge, UUID generation
  - `updateResume`: partial update on existing, no-op on nonexistent ID, `currentResume` sync, `updatedAt` refresh
  - `deleteResume`: removes from `resumes`, clears `currentResume` if deleted, leaves `currentResume` if deleting unrelated
  - `setCurrentResume`: sets by valid ID, clears on `null`, sets `null` on nonexistent ID
  - `getResumeById`: found and not-found paths
  - `duplicateResume`: copies all fields, generates new UUID, appends "(Copy)", does not set as current, returns `undefined` on nonexistent ID
- Persist middleware behavior: verify `resumes` persists, `currentResume` does not
- localStorage cleanup in `beforeEach`

### Out of Scope
- Component integration tests (e.g., `<ResumeEditor/>`)
- Snapshot tests
- Mocking sample data functions (test real behavior)
- Field-level validation (not in store layer)
- Coverage threshold enforcement (do not gate on %)

## Capabilities

### New Capabilities
None.

### Modified Capabilities
None — this is a pure test addition with no spec-level behavioral changes.

## Approach

Direct state manipulation via `useResumeStore.getState()` and `useResumeStore.setState()`. No React rendering. Each test resets state in `beforeEach`:

```ts
useResumeStore.setState({ resumes: [], currentResume: null });
useResumeStore.persist.clearStorage();
```

External deps handled pragmatically:
- **UUID**: assert format via `/^[a-f0-9-]{36}$/`, not specific values
- **sampleData**: do not mock — shape assertions validate integration

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `tests/store/resume.test.ts` | New | ~25 test cases across 6 `describe` blocks |
| `src/store/resume.ts` | None | Only tested, not modified |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| `getSampleDataForTemplate` module-level `idCounter` causes cross-test pollution | Low | Assert shape not exact IDs; counter resets per file load |
| localStorage persistence rehydrates stale state across tests | Medium | `beforeEach` calls both `setState` + `persist.clearStorage()` |
| UUID collisions in test output make assertions flaky | Low | Match regex, never compare UUIDs for equality |

## Rollback Plan

Delete `tests/store/resume.test.ts`. No code changes to roll back.

## Dependencies

None. Uses existing Vitest + `@testing-library/jest-dom` setup. No new packages.

## Success Criteria

- [ ] 6 `describe` blocks covering all store actions
- [ ] All tests pass: `npm test`
- [ ] Tests run deterministically (no flaky UUID/localStorage assertions)
- [ ] No store source code modified
