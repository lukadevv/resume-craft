# Testing Standards

Comprehensive testing strategy for Resume Craft.

## Test Stack

- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **Playwright** - E2E testing (optional)

## Unit Tests

### Basic Test Structure

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant classes', () => {
    render(<Button variant="secondary">Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-secondary')
  })
})
```

### Testing Store Logic

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { useResumeStore } from './resume'

describe('Resume Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useResumeStore.setState({ resume: null })
  })

  it('sets resume data', () => {
    const mockResume = { id: '1', name: 'Test' }
    useResumeStore.getState().setResume(mockResume)
    expect(useResumeStore.getState().resume).toEqual(mockResume)
  })

  it('updates resume partially', () => {
    useResumeStore.getState().setResume({ id: '1', name: 'Test' })
    useResumeStore.getState().updateResume({ name: 'Updated' })
    expect(useResumeStore.getState().resume?.name).toBe('Updated')
    expect(useResumeStore.getState().resume?.id).toBe('1')
  })
})
```

## Integration Tests

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ResumeEditor } from './ResumeEditor'

describe('ResumeEditor', () => {
  it('saves resume on button click', async () => {
    const user = userEvent.setup()
    render(<ResumeEditor />)
    
    await user.type(screen.getByLabelText('Name'), 'John Doe')
    await user.click(screen.getByRole('button', { name: /save/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Saved!')).toBeInTheDocument()
    })
  })
})
```

## Test Naming

Use descriptive names that explain what is being tested:

```typescript
// Good
it('updates resume name when user types in name field')
it('shows error when email format is invalid')
it('persists resume to localStorage after changes')

// Avoid
it('works')
it('test1')
```

## What to Test

### Priority 1 (Always)
- Business logic in stores
- Utility functions
- Form validation
- Component rendering

### Priority 2 (Important)
- User interactions
- Error states
- Loading states

### Priority 3 (Nice to have)
- Edge cases
- Complex interactions
- Visual regressions

## What NOT to Test

- Implementation details
- Third-party libraries
- Snapshot tests (avoid)
- 100% coverage goal

## Running Tests

```bash
# Run all tests
pnpm test

# Run in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage

# Run specific file
pnpm test resume.test.ts
```

## Common Patterns

### Mocking

```typescript
// Mock fetch
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ id: '1' })
})

// Mock localStorage
vi.mock('@/lib/storage', () => ({
  storage: {
    get: vi.fn(),
    set: vi.fn(),
  }
}))
```

### Async Testing

```typescript
it('loads resume after mount', async () => {
  render(<ResumeEditor resumeId="1" />)
  
  await waitFor(() => {
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
  })
})
```
