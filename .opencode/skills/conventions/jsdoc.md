# JSDoc & Comments Convention

## Format

Use the **expanded format** with a newline after the opening `/**`:

```typescript
/**
 * Description of what the function does
 * @param {Type} paramName - Description of parameter
 * @returns {Type} Description of return value
 */
```

## JSDoc for Functions

### Template

```typescript
/**
 * Description of what the function does
 * @param {Type} paramName - Description of parameter
 * @returns {Type} Description of return value
 */
```

### Examples

#### Function with params and return

```typescript
/**
 * Formats a phone number to standard format
 * @param {string} phone - Raw phone number input
 * @returns {string} Formatted phone number (XXX) XXX-XXXX
 */
function formatPhoneNumber(phone: string): string {
  // ...
}
```

#### Function with multiple params

```typescript
/**
 * Calculates resume completion percentage
 * @param {ResumeData} resume - The resume data object
 * @param {string[]} requiredSections - List of required sections
 * @param {boolean} includeOptional - Whether to include optional sections
 * @returns {number} Completion percentage (0-100)
 */
function calculateCompletion(
  resume: ResumeData,
  requiredSections: string[],
  includeOptional: boolean
): number {
  // ...
}
```

#### Void function

```typescript
/**
 * Saves resume data to localStorage
 * 
 * @param {ResumeData} resume - Resume data to save
 * @returns {void}
 */
function saveResumeToStorage(resume: ResumeData): void {
  // ...
}
```

#### Async function

```typescript
/**
 * Fetches resume from API
 * 
 * @param {string} id - Resume unique identifier
 * @returns {Promise<ResumeData>} Resume data from server
 * @throws {Error} When network request fails
 */
async function fetchResume(id: string): Promise<ResumeData> {
  // ...
}
```

## JSDoc for Components

### Functional Component

```typescript
/**
 * Main resume form component for user input
 * 
 * @component
 * @param {ResumeFormProps} props - Component props
 * @param {() => void} props.onSubmit - Callback when form is submitted
 * @param {ResumeData} props.initialData - Initial resume data
 * @returns {JSX.Element} Rendered form component
 */
export function ResumeForm({ onSubmit, initialData }: ResumeFormProps): JSX.Element {
  // ...
}
```

### Component Props

```typescript
/**
 * Props for ResumeForm component
 * 
 * @interface
 */
interface ResumeFormProps {
  /** Callback when form is submitted */
  onSubmit: () => void;
  /** Initial resume data for editing */
  initialData?: ResumeData;
  /** Whether form is in readonly mode */
  readonly?: boolean;
}
```

## JSDoc for Types/Interfaces

```typescript
/**
 * Resume data structure
 * 
 * @interface
 */
interface ResumeData {
  /** Unique identifier */
  id: string;
  /** Full name of the person */
  name: string;
  /** Contact email */
  email: string;
  /** Work experience entries */
  experience: Experience[];
}

/**
 * Status of resume in the system
 * @typedef {'draft' | 'published' | 'archived'} ResumeStatus
 */
```

## JSDoc for Constants

```typescript
/**
 * Base URL for API endpoints
 * @constant
 */
export const API_BASE_URL = 'https://api.resumecraft.app';

/**
 * Maximum file size for upload (5MB)
 * @constant
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
```

## Inline Comments

### Use Cases for Inline Comments

- Complex logic that needs explanation
- Workarounds or hack explanations
- TODO/FIXME markers
- Reasoning behind decisions

### Examples

```typescript
// Calculate score based on keyword density
const score = keywords.reduce((acc, kw) => {
  return acc + (text.includes(kw) ? 10 : 0);
}, 0);

// TODO: Optimize this for large resumes
// FIXME: This breaks when experience > 10 entries

// Using setTimeout to avoid React 18 double-render in development
setTimeout(() => {
  initializeForm();
}, 0);
```

### When NOT to Use Inline Comments

- ❌ Explaining obvious code (`const x = 1 // set x to 1`)
- ❌ Commented-out code (delete it, use git)
- ❌ TODO without description

## Comments Style Rules

### Position

- JSDoc: Above function/component/type
- Inline: Same line (prefer not to) or line above

### Language

- English only
- Clear, concise sentences
- Start with uppercase, end with period

### Example Block

```typescript
/**
 * Parses CSV data into resume experience entries
 * @param {string} csvData - Raw CSV string
 * @returns {Experience[]} Parsed experience array
 * @example
 * const experience = parseCSVExperience('Company,Role,2020,2022');
 * // Returns: [{ company: 'Company', role: 'Role', startYear: 2020, endYear: 2022 }]
 */
function parseCSVExperience(csvData: string): Experience[] {
  // ...
}
```

## Checklist

- [ ] All exported functions have JSDoc
- [ ] All components have JSDoc with @returns
- [ ] All interfaces/types have description
- [ ] Complex logic has inline comments
- [ ] No commented-out code
- [ ] TODO/FIXME have descriptions
