import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Accessibility, Eye, Keyboard, Palette, MousePointerClick } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const enSeo = await import(`../../../../messages/${locale}/seo.json`).then((m) => m.default);
  return {
    title: enSeo.accessibility.title,
    description: enSeo.accessibility.description,
    keywords: ['accessibility', 'a11y', 'WCAG', 'screen reader', 'keyboard navigation', 'inclusive design'],
    openGraph: {
      title: enSeo.accessibility.title,
      description: enSeo.accessibility.description,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale,
    },
    alternates: {
      canonical: locale === 'en' ? '/accessibility' : `/${locale}/accessibility`,
      languages: {
        en: '/accessibility',
        es: '/es/accessibility',
        de: '/de/accessibility',
        fr: '/fr/accessibility',
        pt: '/pt/accessibility',
      },
    },
  };
}

const commitmentItems = [
  {
    icon: Keyboard,
    title: 'Keyboard Navigation',
    description:
      'Every interactive element is reachable and operable via keyboard. Tab through forms, use Enter/Space to toggle, and never get trapped in focus loops.',
  },
  {
    icon: Eye,
    title: 'Visual Design',
    description:
      'High contrast ratios, clear typography, and a dark mode option reduce eye strain. All text meets or exceeds WCAG AA contrast requirements.',
  },
  {
    icon: Palette,
    title: 'Reduced Motion',
    description:
      'Respecting prefers-reduced-motion at the system level. Animations are decorative, never essential to understanding or using the app.',
  },
  {
    icon: MousePointerClick,
    title: 'Screen Reader Support',
    description:
      'Semantic HTML structure, ARIA labels on interactive elements, and meaningful alt text on all images. Forms announce errors clearly.',
  },
];

const knownLimitations = [
  {
    title: 'PDF Export Accessibility',
    description:
      'Exported PDFs currently use visual rendering via html2canvas, which produces flattened images rather than tagged accessible PDFs. We recommend using DOCX export for screen-reader-friendly documents.',
  },
  {
    title: 'Template Color Customization',
    description:
      'Some templates offer limited color contrast options. We are working toward ensuring all template presets meet AA contrast standards by default.',
  },
];

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const common = await import(`../../../../messages/${locale}/common.json`).then((m) => m.default);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[72px]">
        {/* Hero Section */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: [
              'radial-gradient(ellipse at top, rgba(62, 207, 142, 0.08), transparent 60%)',
              'radial-gradient(ellipse at bottom right, rgba(62, 207, 142, 0.04), transparent 50%)',
              'linear-gradient(to right, #80808009 1px, transparent 1px)',
              'linear-gradient(to bottom, #80808009 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '100% 100%, 100% 100%, 24px 24px, 24px 24px',
          }}
        >
          <section className="relative py-16 md:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm text-foreground-secondary">
                  <Accessibility className="h-4 w-4 text-primary" />
                  {common.pages.accessibility.badge}
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  {common.pages.accessibility.title}
                </h1>
                <p className="mt-4 text-lg text-foreground-secondary md:text-xl">
                  {common.pages.accessibility.subtitle}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Commitment Cards */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Our Commitment
              </h2>
              <p className="mt-2 text-foreground-secondary">
                We follow the WCAG 2.2 AA standard as our benchmark and are
                continuously improving.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
              {commitmentItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-border/80"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-foreground-secondary">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standards */}
        <section className="border-t border-border bg-surface/20">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Standards & Testing
              </h2>
              <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none">
                <p>
                  We test against the{' '}
                  <strong>Web Content Accessibility Guidelines (WCAG) 2.2</strong>{' '}
                  at Level AA. Our testing process includes:
                </p>
                <ul>
                  <li>
                    Automated audits using axe-core and Lighthouse during every CI
                    build.
                  </li>
                  <li>
                    Manual keyboard-only testing across all routes and interactive
                    components.
                  </li>
                  <li>
                    Screen reader testing with NVDA (Windows) and VoiceOver (macOS
                    & iOS).
                  </li>
                  <li>
                    Focus management verification for modals, dialogs, and dynamic
                    content.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Known Limitations */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Known Limitations
              </h2>
              <p className="mt-2 text-foreground-secondary">
                We&apos;re transparent about where we&apos;re still improving.
              </p>
              <div className="mt-8 space-y-6">
                {knownLimitations.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border bg-background p-6"
                  >
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-foreground-secondary">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section className="border-t border-border bg-surface/20">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Help Us Improve
              </h2>
              <p className="mt-2 text-foreground-secondary">
                Accessibility is a journey, not a destination. If you encounter a
                barrier using ResumeCraft, please let us know.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="https://github.com/lukadevv/resume-craft/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                >
                  Report an Issue
                </a>
                <a
                  href="https://github.com/lukadevv/resume-craft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  View Source
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
