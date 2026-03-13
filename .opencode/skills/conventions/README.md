# Code Conventions

This skill enforces naming conventions and JSDoc/TSDoc comments.

## Usage

When writing code, follow these conventions:

### Naming
- Components: `PascalCase` (`ResumeForm.tsx`)
- Functions: `camelCase` (`formatDate()`)
- Global exports: `UPPER_SNAKE_CASE` (`export const API_URL`)
- Files: `kebab-case` (`resume-form.tsx`)
- Utils: Flat in `src/utils/` (`math.ts`, `random.ts`, `strings.ts`)

### JSDoc
All exported functions and components must have JSDoc:
```typescript
/** 
 * Description of function
 * 
 * @param {type} paramName - description
 * @returns {type} description
 */
```

See `naming.md` and `jsdoc.md` for full details.
