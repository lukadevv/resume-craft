# Coding Standards

Follow these conventions for consistent, maintainable code.

## TypeScript

- Use strict mode always
- Prefer interfaces over types for object shapes
- Use type inference; add explicit types when unclear
- Never use `any` - use `unknown` instead

```typescript
// Good
interface Resume {
  id: string;
  name: string;
  email: string;
  experience: Experience[];
}

// Avoid
type Resume = any;
```

## Component Patterns

### React Components

```typescript
// Functional component with explicit props
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  )
}
```

### Client vs Server Components

- Use `'use client'` only when needed (event handlers, hooks, browser APIs)
- Default to Server Components in Next.js App Router
- Pass serializable data to client components via props

## File Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── [slug]/            # Dynamic routes
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── resume/            # Resume-specific components
│   └── forms/             # Form components
├── store/                 # Zustand stores
├── lib/                   # Utilities, helpers
│   ├── utils.ts           # General utilities
│   └── constants.ts       # App constants
├── types/                 # TypeScript types
└── styles/                # Global styles
```

## Naming Conventions

| Type             | Convention                  | Example       |
| ---------------- | --------------------------- | ------------- |
| Components       | PascalCase                  | ResumeEditor  |
| Hooks            | camelCase starting with use | useResume     |
| Utilities        | camelCase                   | formatDate    |
| Types/Interfaces | PascalCase                  | ResumeData    |
| Constants        | UPPER_SNAKE                 | MAX_FILE_SIZE |

## Best Practices

### Functions

- Keep functions under 50 lines
- Use descriptive names
- Single responsibility
- Prefer pure functions

```typescript
// Good
function formatResumeDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(date);
}

// Avoid
function format(d: Date): string {
  /* ... */
}
```

### Imports

```typescript
// Order: external → internal → relative
import { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/resume';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
```

### Error Handling

```typescript
// Always handle async errors
async function loadResume(id: string): Promise<Resume | null> {
  try {
    const response = await fetch(\`/api/resume/\${id}\`)
    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error('Failed to load resume:', error)
    return null
  }
}
```

## Performance

- Use React.memo for expensive components
- Implement virtualization for long lists
- Lazy load routes and components
- Optimize images (WebP, proper sizing)

## Package Management

- Always install the latest version of packages
- Never use the `^` prefix for version ranges
- Use exact versions to prevent unexpected updates

```bash
# Good - exact version
npm install lucide-react@latest

# Bad - caret allows minor/patch updates
npm install lucide-react
```

## Security

- Never expose secrets in client code
- Validate all user inputs
- Sanitize data before rendering
- Use proper CORS headers
