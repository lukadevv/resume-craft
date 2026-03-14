# Testing Enforcement Added

I've successfully added mandatory testing requirements to the coding standards in `.opencode/skills/coding.md`:

## What was added:

**Testing (MANDATORY) section** with:

- **Requirement**: ALWAYS create tests when writing new code
- **Test file placement**: `tests/` directory with `.test.ts` extension
- **Execution**: Must run `npm test` before completing any feature
- **What to test**:
  - Priority 1: Store logic, utilities, form validation, component rendering
  - Priority 2: User interactions, error states, export functions
- **Enforcement**: No feature is complete until tests exist and pass

## Current test status:

- ✅ Existing tests pass (utils.test.ts, export.test.ts)
- ✅ Added example.test.ts to verify test framework works
- ✅ Coding standards now mandate testing for all new code

## Next steps for features:

When creating new components (like resume forms, templates, etc.):

1. Create the component file
2. Create corresponding `.test.ts` file in `tests/` directory
3. Write tests covering the requirements above
4. Run `npm test` to verify everything passes

The AI will now enforce testing as part of every development task according to the updated coding standards.
