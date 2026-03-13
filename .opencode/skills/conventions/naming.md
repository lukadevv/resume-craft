# Naming Conventions

## File Naming

### General Rules
- **Files**: kebab-case (`resume-form.tsx`, `api-handler.ts`)
- **Folders**: kebab-case (`components/`, `utils/`, `hooks/`)
- **Tests**: `.test.ts` or `.spec.ts` suffix (`resume-form.test.ts`)

### TypeScript/React Files
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ResumeForm.tsx` |
| Hooks | camelCase + `use` prefix | `useResumeData.ts` |
| Context | PascalCase + `Context` | `ResumeContext.tsx` |
| Types/Interfaces | PascalCase | `ResumeData.ts` |
| Utils | kebab-case | `math-utils.ts` |
| Constants | UPPER_SNAKE_CASE | `API_URLS.ts` |

## Variable Naming

### JavaScript/TypeScript
| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `const resumeData = ...` |
| Let variables | camelCase | `let currentStep = 0` |
| Global constants | UPPER_SNAKE_CASE | `const MAX_FILE_SIZE = 5000` |
| exported constants | UPPER_SNAKE_CASE | `export const API_BASE_URL = ...` |
| Boolean | is/has/can prefix | `isLoading`, `hasError`, `canExport` |
| Arrays | plural noun | `const items = []` |
| Object | singular noun | `const resume = {}` |

## Function Naming

### Functions
| Type | Convention | Example |
|------|------------|---------|
| Regular functions | camelCase | `function calculateScore() {}` |
| Arrow functions | camelCase | `const formatDate = () => {}` |
| Event handlers | on/handle prefix | `onSubmit()`, `handleClick()` |
| Custom hooks | use prefix + PascalCase | `useResumeForm()` |
| API functions | verb + noun | `fetchResume()`, `saveResume()` |
| Utility functions | descriptive verb | `formatPhoneNumber()`, `generateUUID()` |

## Component Naming

### React Components
- **File name**: PascalCase (`ResumeForm.tsx`)
- **Component name**: PascalCase (`export function ResumeForm() {}`)
- **Props interface**: ComponentName + `Props` (`interface ResumeFormProps {}`)

### CSS/Tailwind
- **Classes**: kebab-case in CSS modules (`.resume-form-container`)
- **Tailwind**: Use utility classes directly in JSX
- **Custom tokens**: snake_case in config (`--resume-primary-color`)

## Interface & Type Naming

### TypeScript
| Type | Convention | Example |
|------|------------|---------|
| Interfaces | PascalCase | `interface ResumeData {}` |
| Types | PascalCase | `type ResumeStatus = 'draft' | 'published'` |
| Enums | PascalCase | `enum ResumeSection {}` |
| Generics | T, U, or descriptive | `interface ApiResponse<T> {}` |

## Import/Export Naming

### Exports
- Named exports preferred for utilities
- Default export only for root components/pages

```typescript
// Named exports (preferred)
export function formatDate() {}
export const API_URL = ''

// Default export (components/pages)
export default function ResumeForm() {}
```

## Anti-Patterns

❌ `const ResumeData = ...` (should be `resumeData`)
❌ `function ResumeForm() {}` (should be `function resumeForm()`)
❌ `const resume_form = ...` (should be `const resumeForm`)
❌ `export default const ...` (use named export)
❌ `function onClick() {}` (use `handleClick` or `onSubmit`)
