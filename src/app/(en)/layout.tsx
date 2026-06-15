import { IntlClientProvider } from '@/components/i18n/IntlClientProvider';

/**
 * English (default) locale layout.
 * Serves all English pages at root (no locale prefix).
 * Provides NextIntlClientProvider with English messages via a client wrapper.
 */
export default async function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load English messages — static imports bundled at build time
  const messages = await loadEnglishMessages();

  return (
    <IntlClientProvider locale="en" messages={messages}>
      {children}
    </IntlClientProvider>
  );
}

async function loadEnglishMessages() {
  const [common, templates, resumeForm, blog, seo, landing, section] = await Promise.all([
    import(`../../../messages/en/common.json`).then((m) => m.default),
    import(`../../../messages/en/templates.json`).then((m) => m.default),
    import(`../../../messages/en/resume-form.json`).then((m) => m.default),
    import(`../../../messages/en/blog.json`).then((m) => m.default),
    import(`../../../messages/en/seo.json`).then((m) => m.default),
    import(`../../../messages/en/landing.json`).then((m) => m.default),
    import(`../../../messages/en/section.json`).then((m) => m.default),
  ]);

  return {
    common,
    templates,
    'resume-form': resumeForm,
    blog,
    seo,
    landing,
    section,
  };
}
