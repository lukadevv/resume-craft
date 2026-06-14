import { IntlClientProvider } from '@/components/i18n/IntlClientProvider';
import { notFound } from 'next/navigation';

/**
 * Supported non-English locales for static export.
 * English is handled by the (en)/ route group at root.
 */
const nonEnglishLocales = ['es', 'de', 'fr', 'pt'] as const;

/**
 * Locale layout for non-English locales (es, de, fr, pt).
 * Provides NextIntlClientProvider with locale-specific messages.
 * generateStaticParams ensures all non-English locale+route combos are exported.
 * English is handled by the (en)/ route group at root.
 */
export function generateStaticParams() {
  return nonEnglishLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure the incoming locale is valid
  if (!(nonEnglishLocales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Load messages — static imports bundled at build time
  const messages = await loadMessages(locale);

  return (
    <IntlClientProvider locale={locale} messages={messages}>
      {children}
    </IntlClientProvider>
  );
}

/**
 * Load and merge all namespace messages for a given locale.
 * Uses static imports — no server-only APIs, compatible with output: 'export'.
 */
async function loadMessages(locale: string) {
  const [common, templates, resumeForm, blog, seo, landing] = await Promise.all([
    import(`../../../messages/${locale}/common.json`).then((m) => m.default),
    import(`../../../messages/${locale}/templates.json`).then((m) => m.default),
    import(`../../../messages/${locale}/resume-form.json`).then((m) => m.default),
    import(`../../../messages/${locale}/blog.json`).then((m) => m.default),
    import(`../../../messages/${locale}/seo.json`).then((m) => m.default),
    import(`../../../messages/${locale}/landing.json`).then((m) => m.default),
  ]);

  return {
    common,
    templates,
    'resume-form': resumeForm,
    blog,
    seo,
    landing,
  };
}
