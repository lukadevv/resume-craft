'use client';

import { useEffect, useState } from 'react';
import { useResumeStore } from '@/store/resume';

/**
 * Tracks whether the Zustand persist middleware has finished hydrating
 * from localStorage. Component should wait for hydration before reading
 * store state to avoid rendering empty/default values on page reload.
 */
export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydration may have already completed before this effect ran
    if (useResumeStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    const unsub = useResumeStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return () => {
      unsub();
    };
  }, []);

  return hydrated;
}
