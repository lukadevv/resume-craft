# Feature Workflow

Use this workflow when adding new behavior or UI.

1. Clarify:
   - user goal and acceptance criteria
   - SSG-only constraints and any routing/storage implications
2. Implement the smallest change that satisfies acceptance.
3. Add tests under `tests/`:
   - unit tests for utilities/store logic
   - component tests when adding UI behavior
4. Verify locally:
   - `npm run type-check`
   - `npm run lint`
   - `npm test`
5. Keep the diff tight:
   - avoid drive-by formatting and unrelated refactors

