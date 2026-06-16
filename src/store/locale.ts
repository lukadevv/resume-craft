import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Locale } from '@/i18n/routing';

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

/**
 * Locale store with localStorage persistence.
 * Uses a separate key from the resume store to avoid coupling.
 * The locale is app-level state, not resume data.
 */
export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en',

      setLocale: (locale: Locale) => {
        set({ locale });
      },
    }),
    {
      name: 'resume-craft-locale',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
