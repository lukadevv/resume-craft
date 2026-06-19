import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing-extended';

/**
 * Next-intl request configuration for static export.
 *
 * NOT auto-discovered by next-intl since the plugin was removed
 * from next.config.ts. This file is used only by:
 * 1. Unit tests (where next-intl/server is mocked)
 * 2. Potential future server-less usage patterns
 *
 * Does not use any server-only APIs (headers, cookies).
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Fallback to default locale if not provided or invalid
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  // Return locale only — messages are loaded by each layout's
  // NextIntlClientProvider directly. Tests mock this module and
  // validate the return shape.
  return {
    locale,
    messages: {},
    timeZone: 'UTC',
  };
});
