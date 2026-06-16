import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from '@/i18n/routing';

/**
 * Next-intl routing configuration for static export.
 * English is the default at root; other locales use path prefix.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  // Static export: no locale prefix for default locale
  localePrefix: 'as-needed',
});
