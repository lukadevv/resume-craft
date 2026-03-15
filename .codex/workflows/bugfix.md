# Bugfix Workflow

Use this workflow when behavior is incorrect or a command is failing.

1. Reproduce:
   - capture the exact error and command
   - isolate to the smallest repro
2. Write/extend a failing test (preferred) under `tests/`.
3. Fix:
   - minimal change that resolves root cause
4. Verify:
   - the new test passes
   - `npm run type-check`, `npm run lint`, `npm test` are green
5. Guardrails:
   - avoid broad refactors; change only what the bug requires

