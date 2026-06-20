'use client';

import { useState, useCallback, Suspense } from 'react';
import US from 'country-flag-icons/react/3x2/US';
import ES from 'country-flag-icons/react/3x2/ES';
import DE from 'country-flag-icons/react/3x2/DE';
import FR from 'country-flag-icons/react/3x2/FR';
import PT from 'country-flag-icons/react/3x2/PT';
import type { ComponentType } from 'react';
import { useLocaleStore } from '@/store/locale';
import { localeLabelMap, type Locale } from '@/i18n/routing';
import { useTransitionRouter } from 'next-view-transitions';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getCurrentLocale, localizeHref } from '@/lib/locale-utils';

const flagComponents: Record<Locale, ComponentType<{ className?: string }>> = {
  en: US as ComponentType<{ className?: string }>,
  es: ES as ComponentType<{ className?: string }>,
  de: DE as ComponentType<{ className?: string }>,
  fr: FR as ComponentType<{ className?: string }>,
  pt: PT as ComponentType<{ className?: string }>,
};

const allLocales: Locale[] = ['en', 'es', 'de', 'fr', 'pt'];

/**
 * Language switcher dropdown component.
 * Uses current locale's flag icon as trigger, shows flag + native name per locale.
 * Persists selection to localStorage via useLocaleStore.
 * Accessible: keyboard navigation, aria-label, focus ring.
 *
 * Wrapped in Suspense because LocaleSwitcherInner calls useSearchParams(),
 * which opts out of static prerendering and requires a Suspense boundary.
 */
export function LocaleSwitcher() {
  return (
    <Suspense fallback={<div className="h-9 w-9" />}>
      <LocaleSwitcherInner />
    </Suspense>
  );
}

function LocaleSwitcherInner() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLocaleStore();
  const router = useTransitionRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = getCurrentLocale(pathname.replace(/\/$/, '') || '/');

  const handleSelect = useCallback(
    (newLocale: Locale) => {
      setLocale(newLocale);
      setOpen(false);

      // Get the path without the current locale prefix
      // On /es/resume/wizard?id=xxx → /resume/wizard, on / → /
      // Then prepend the new locale prefix (or none for en)
      const strippedPath = currentLocale === 'en'
        ? (pathname.replace(/\/$/, '') || '/')
        : (pathname.replace(new RegExp(`^/${currentLocale}`), '') || '/');

      // Preserve query parameters so the wizard/edit page keeps the ?id= param
      const queryString = searchParams.toString();
      const pathWithQuery = queryString
        ? `${strippedPath}?${queryString}`
        : strippedPath;
      const target = localizeHref(pathWithQuery, newLocale);

      router.replace(target);
    },
    [setLocale, router, pathname, searchParams, currentLocale]
  );

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 border border-border"
        onClick={() => setOpen(!open)}
        aria-label={`Switch language (current: ${localeLabelMap[locale]})`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {(() => {
          const FlagIcon = flagComponents[locale];
          return <FlagIcon className="h-5 w-5 rounded-sm" />;
        })()}
      </Button>

      {open && (
        <>
          {/* Backdrop for click-outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown */}
          <div
            className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-background shadow-lg"
            role="listbox"
            aria-label="Select language"
          >
            {allLocales.map((loc) => (
              <button
                key={loc}
                role="option"
                aria-selected={loc === locale}
                onClick={() => handleSelect(loc)}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-surface',
                  'first:rounded-t-lg last:rounded-b-lg',
                  loc === locale
                    ? 'bg-surface text-foreground font-medium'
                    : 'text-foreground-secondary'
                )}
              >
                <span aria-hidden="true">
                  {(() => {
                    const FlagIcon = flagComponents[loc];
                    return <FlagIcon className="h-4 w-4 rounded-sm" />;
                  })()}
                </span>
                <span className="truncate">{localeLabelMap[loc]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
