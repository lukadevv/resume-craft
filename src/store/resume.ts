import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Resume, createEmptyResume, TemplateType } from '@/types/resume';
import { generateUUID } from '@/utils/random';
import { getSampleDataForTemplate } from '@/lib/sampleData';

/**
 * Resume store state interface
 */
interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;

  // Actions
  createResume: (template?: TemplateType, initialData?: Partial<Resume>) => Resume;
  updateResume: (id: string, data: Partial<Resume>) => void;
  deleteResume: (id: string) => void;
  setCurrentResume: (id: string | null) => void;
  getResumeById: (id: string) => Resume | undefined;
  duplicateResume: (id: string) => Resume | undefined;
}

/**
 * Resume store with localStorage persistence
 * Manages all resume CRUD operations
 */
export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: [],
      currentResume: null,

      /**
       * Creates a new resume with the specified template
       * @param template - Template type to use (default: modern)
       * @param initialData - Optional initial data to populate the resume
       * @returns The newly created resume
       */
      createResume: (template = 'modern', initialData?: Partial<Resume>) => {
        const sampleData = getSampleDataForTemplate(template);
        const newResume: Resume = {
          ...createEmptyResume(),
          id: generateUUID(),
          name: 'My Resume',
          template,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...sampleData,
          ...initialData,
        };

        set((state) => ({
          resumes: [...state.resumes, newResume],
          currentResume: newResume,
        }));

        return newResume;
      },

      /**
       * Updates an existing resume with new data
       * @param id - Resume ID to update
       * @param data - Partial resume data to merge
       */
      updateResume: (id, data) => {
        set((state) => ({
          resumes: state.resumes.map((resume) =>
            resume.id === id ? { ...resume, ...data, updatedAt: new Date().toISOString() } : resume
          ),
          currentResume:
            state.currentResume?.id === id
              ? { ...state.currentResume, ...data, updatedAt: new Date().toISOString() }
              : state.currentResume,
        }));
      },

      /**
       * Deletes a resume by ID
       * @param id - Resume ID to delete
       */
      deleteResume: (id) => {
        set((state) => ({
          resumes: state.resumes.filter((resume) => resume.id !== id),
          currentResume: state.currentResume?.id === id ? null : state.currentResume,
        }));
      },

      /**
       * Sets the current active resume
       * @param id - Resume ID to set as current, or null to clear
       */
      setCurrentResume: (id) => {
        if (!id) {
          set({ currentResume: null });
          return;
        }

        const resume = get().resumes.find((r) => r.id === id);
        set({ currentResume: resume || null });
      },

      /**
       * Retrieves a resume by ID
       * @param id - Resume ID to find
       * @returns The resume if found, undefined otherwise
       */
      getResumeById: (id) => {
        return get().resumes.find((resume) => resume.id === id);
      },

      /**
       * Duplicates an existing resume
       * @param id - Resume ID to duplicate
       * @returns The duplicated resume or undefined if not found
       */
      duplicateResume: (id) => {
        const original = get().resumes.find((r) => r.id === id);
        if (!original) return undefined;

        const duplicate: Resume = {
          ...original,
          id: generateUUID(),
          name: `${original.name} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          resumes: [...state.resumes, duplicate],
        }));

        return duplicate;
      },
    }),
    {
      name: 'resume-craft-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ resumes: state.resumes }),
    }
  )
);
