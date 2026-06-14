import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing-extended';

/**
 * Message loader for static export.
 * Imports JSON files statically — no server-only APIs (headers, cookies).
 * Each namespace is imported as a module and merged into a single messages object.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure a valid locale is used
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const effectiveLocale = locale as string;

  // Static imports — bundled at build time, compatible with output: 'export'
  const [common, templates, resumeForm, blog, seo, landing] = await Promise.all([
    import(`../../messages/${effectiveLocale}/common.json`).then((m) => m.default),
    import(`../../messages/${effectiveLocale}/templates.json`).then((m) => m.default),
    import(`../../messages/${effectiveLocale}/resume-form.json`).then((m) => m.default),
    import(`../../messages/${effectiveLocale}/blog.json`).then((m) => m.default),
    import(`../../messages/${effectiveLocale}/seo.json`).then((m) => m.default),
    import(`../../messages/${effectiveLocale}/landing.json`).then((m) => m.default),
  ]);

  return {
    locale: effectiveLocale,
    messages: {
      common,
      templates,
      'resume-form': resumeForm,
      blog,
      seo,
      landing,
    },
  };
});
