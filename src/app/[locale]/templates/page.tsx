import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from 'next-view-transitions';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { templateDefinitions } from '@/lib/templates';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import type { TemplateType } from '@/types/resume';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('templates.title'),
    description: t('templates.description'),
    keywords: ['resume templates', 'CV templates', 'professional resume designs'],
    openGraph: {
      title: t('templates.title'),
      description: t('templates.description'),
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale,
    },
    alternates: {
      canonical: locale === 'en' ? '/templates' : `/${locale}/templates`,
      languages: {
        en: '/templates',
        es: '/es/templates',
        de: '/de/templates',
        fr: '/fr/templates',
        pt: '/pt/templates',
      },
    },
  };
}

export default async function TemplatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'templates' });
  // Load template details from English messages as fallback
  const tRaw = await import(`../../../../messages/en/templates.json`).then(
    (m) => m.default
  ).catch(() => ({}));

  const templateDetails = Object.fromEntries(
    templateDefinitions.map((tmpl) => {
      const data = tRaw[tmpl.id as keyof typeof tRaw] as { idealFor?: string[]; keyFeatures?: string[] } | undefined;
      return [
        tmpl.id,
        {
          idealFor: data?.idealFor || [],
          keyFeatures: data?.keyFeatures || [],
        },
      ];
    })
  ) as Record<TemplateType, { idealFor: string[]; keyFeatures: string[] }>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('title'),
    description: t('description'),
    url: locale === 'en' ? '/templates' : `/${locale}/templates`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: templateDefinitions.map((template, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: template.name,
          description: template.description,
          url: `/create?template=${template.id}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[72px]">
          <section className="relative py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-6">
              <Reveal>
                <div className="mx-auto max-w-3xl text-center">
                  <div className="mx-auto inline-flex items-center rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm text-foreground-secondary">
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    {t('badge', { count: 25 })}
                  </div>
                  <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    {(() => {
                      const title = t('title');
                      const parts = title.split(' ');
                      const lastWord = parts.pop();
                      return (
                        <>
                          {parts.join(' ')}{' '}
                          <span className="gradient-text">{lastWord}</span>
                        </>
                      );
                    })()}
                  </h1>
                  <p className="mt-8 text-lg text-foreground-secondary md:text-xl">
                    {t('description')}
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="/create">
                      <Button size="lg" className="gap-2">
                        {t('createYourResume')}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" asChild>
                      <a href="#templates">{t('browseTemplates')}</a>
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
          <section id="templates" className="py-10 md:py-16">
            <div className="mx-auto max-w-7xl px-6">
              <TemplateGrid templateDetails={templateDetails} />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
