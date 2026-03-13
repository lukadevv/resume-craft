# Zustand State Management Skill

Client-side state management with persistent storage for resume data.

## Basic Store Pattern

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ResumeState {
  resume: ResumeData | null
  setResume: (resume: ResumeData) => void
  updateResume: (updates: Partial<ResumeData>) => void
  clearResume: () => void
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: null,
      setResume: (resume) => set({ resume }),
      updateResume: (updates) => 
        set((state) => ({ resume: { ...state.resume, ...updates } })),
      clearResume: () => set({ resume: null }),
    }),
    { name: 'resume-storage' }
  )
)
```

## Using in Components

```tsx
import { useResumeStore } from '@/store/resume'

export function ResumeEditor() {
  const resume = useResumeStore((state) => state.resume)
  const updateResume = useResumeStore((state) => state.updateResume)
  
  return (
    <input 
      value={resume?.name || ''}
      onChange={(e) => updateResume({ name: e.target.value })}
    />
  )
}
```

## Store Slices Pattern (Large Apps)

```typescript
// store/slices/resumeSlice.ts
import { StateCreator } from 'zustand'

export interface ResumeSlice {
  resume: ResumeData | null
  setResume: (resume: ResumeData) => void
}

export const createResumeSlice: StateCreator<Store, [], [], ResumeSlice> = (set) => ({
  resume: null,
  setResume: (resume) => set({ resume }),
})

// store/index.ts
import { create } from 'zustand'
import { createResumeSlice, type ResumeSlice } from './slices/resumeSlice'

type Store = ResumeSlice

export const useStore = create<Store>()((...args) => ({
  ...createResumeSlice(...args),
}))
```

## Optimistic Updates

```typescript
// For API calls - update UI immediately, then sync
const updateResume = async (updates: Partial<ResumeData>) => {
  // 1. Optimistic update
  set((state) => ({ resume: { ...state.resume!, ...updates } }))
  
  try {
    // 2. Call API
    await resumeService.update(updates)
  } catch {
    // 3. Revert on error
    set((state) => ({ resume: originalResume }))
  }
}
```

## Persistence

```typescript
import { persist, createJSONStorage } from 'zustand/middleware'

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({ /* ... */ }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ resume: state.resume }), // Only persist specific keys
    }
  )
)
```

## Actions Pattern

```typescript
interface ResumeActions {
  loadTemplate: (templateId: string) => void
  exportToPDF: () => Promise<Blob>
  exportToDOCX: () => Promise<Blob>
}

export const useResumeStore = create<ResumeState & ResumeActions>()(
  persist(
    (set, get) => ({
      resume: null,
      
      loadTemplate: async (templateId) => {
        const template = await getTemplate(templateId)
        set({ resume: template })
      },
      
      exportToPDF: async () => {
        const html = renderResumeHTML(get().resume!)
        return generatePDF(html)
      },
      
      exportToDOCX: async () => {
        const data = get().resume!
        return generateDOCX(data)
      },
    }),
    { name: 'resume-storage' }
  )
)
```

## TypeScript Tips

```typescript
// Selector pattern for type safety
const selectResume = (state: ResumeState) => state.resume
const resume = useResumeStore(selectResume)

// For computed values
const selectHasUnsavedChanges = (state: ResumeState & ResumeActions) => 
  state.resume !== state.savedResume
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Too much state | Only store what's needed for UI |
| No persistence | Use persist middleware for localStorage |
| Complex nested updates | Use Immer or shallow compare |
| Not typing selectors | Define typed selector functions |
