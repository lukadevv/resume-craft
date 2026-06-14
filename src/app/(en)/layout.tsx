import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

/**
 * English (default) locale layout.
 * Serves all English pages at root (no locale prefix).
 * Provides NextIntlClientProvider with English messages.
 */
export default async function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enable static rendering for English
  setRequestLocale('en');

  // Load English messages — static imports bundled at build time
  const messages = await loadEnglishMessages();

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

async function loadEnglishMessages() {
  const [common, templates, resumeForm, blog, seo, landing] = await Promise.all([
    import(`../../../messages/en/common.json`).then((m) => m.default),
    import(`../../../messages/en/templates.json`).then((m) => m.default),
    import(`../../../messages/en/resume-form.json`).then((m) => m.default),
    import(`../../../messages/en/blog.json`).then((m) => m.default),
    import(`../../../messages/en/seo.json`).then((m) => m.default),
    import(`../../../messages/en/landing.json`).then((m) => m.default),
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
