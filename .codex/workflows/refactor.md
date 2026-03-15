# Refactor Workflow

Use this workflow when improving code quality without changing behavior.

1. Define the refactor intent (readability, maintainability, perf).
2. Make mechanical changes only (no behavior changes).
3. Ensure tests still cover the behavior; add tests only if needed to prevent regressions.
4. Verify:
   - `npm run type-check`
   - `npm run lint`
   - `npm test`
5. Keep scope tight and avoid mixing with feature work.

