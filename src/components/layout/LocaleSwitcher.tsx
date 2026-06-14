'use client';

import { useState, useCallback } from 'react';
import { Globe } from 'lucide-react';
import US from 'country-flag-icons/react/3x2/US';
import ES from 'country-flag-icons/react/3x2/ES';
import DE from 'country-flag-icons/react/3x2/DE';
import FR from 'country-flag-icons/react/3x2/FR';
import PT from 'country-flag-icons/react/3x2/PT';
import type { ComponentType } from 'react';
import { useLocaleStore } from '@/store/locale';
import { localeLabelMap, type Locale } from '@/i18n/routing';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
 * Uses globe icon trigger, shows flag + native name per locale.
 * Persists selection to localStorage via useLocaleStore.
 * Accessible: keyboard navigation, aria-label, focus ring.
 */
export function LocaleSwitcher() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLocaleStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = useCallback(
    (newLocale: Locale) => {
      setLocale(newLocale);
      setOpen(false);
      // Navigate to the equivalent page in the new locale
      router.replace(pathname, { locale: newLocale });
    },
    [setLocale, router, pathname]
  );

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={() => setOpen(!open)}
        aria-label={`Switch language (current: ${localeLabelMap[locale]})`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-5 w-5" />
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
