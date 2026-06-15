'use client';

import { Header } from '@/components/layout/Header';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

/**
 * Full-page loading state with Header + centered spinner.
 * Use as a hydration/loading fallback for client pages
 * that depend on async store hydration.
 */
export function FullPageLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[72px] flex justify-center">
        <div className="flex flex-col items-center gap-4 pt-32">
          <LoadingSpinner size="h-8 w-8" className="text-primary" />
          <p className="text-sm text-foreground-secondary">Loading...</p>
        </div>
      </main>
    </div>
  );
}
