import { Metadata } from 'next';
import { Link } from '@/components/ui/Link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { templateDefinitions } from '@/lib/templates';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import type { TemplateType } from '@/types/resume';
import enSeo from '../../../../messages/en/seo.json';
import enTemplates from '../../../../messages/en/templates.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: enSeo.templates.title,
    description: enSeo.templates.description,
    keywords: ['resume templates', 'CV templates', 'professional resume designs'],
    openGraph: {
      title: enSeo.templates.title,
      description: enSeo.templates.description,
      type: 'website',
      locale: 'en_US',
    },
    alternates: {
      canonical: '/templates',
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

export default function TemplatesPage() {
  // Build templateDetails from message files
  const templateDetails = Object.fromEntries(
    templateDefinitions.map((tmpl) => {
      const data = enTemplates[tmpl.id as keyof typeof enTemplates] as { name?: string; description?: string; idealFor?: string[]; keyFeatures?: string[] } | undefined;
      return [
        tmpl.id,
        {
          name: data?.name ?? tmpl.name,
          description: data?.description ?? tmpl.description,
          idealFor: data?.idealFor || [],
          keyFeatures: data?.keyFeatures || [],
        },
      ];
    })
  ) as Record<TemplateType, { name: string; description: string; idealFor: string[]; keyFeatures: string[] }>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: enTemplates.title,
    description: enTemplates.description,
    url: '/templates',
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
          <div
            className="relative"
            style={{
              backgroundImage: [
                'radial-gradient(ellipse at top, rgba(62, 207, 142, 0.08), transparent 60%)',
                'linear-gradient(to right, #80808009 1px, transparent 1px)',
                'linear-gradient(to bottom, #80808009 1px, transparent 1px)',
              ].join(', '),
              backgroundSize: '100% 100%, 24px 24px, 24px 24px',
            }}
          >
            <section className="relative overflow-hidden py-16 md:py-20">
              <div className="mx-auto max-w-7xl px-6">
                <Reveal>
                  <div className="mx-auto max-w-3xl text-center">
                    <div className="mx-auto inline-flex items-center rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm text-foreground-secondary">
                      <Sparkles className="mr-2 h-4 w-4 text-primary" />
                      {enTemplates.badge.replace('{count}', '25')}
                    </div>
                    <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                      {(() => {
                        const title = enTemplates.title;
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
                      {enTemplates.description}
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Link href="/create">
                        <Button size="lg" className="gap-2">
                          {enTemplates.createYourResume}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="lg" asChild>
                        <a href="#templates">{enTemplates.browseTemplates}</a>
                      </Button>
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          </div>
          <section id="templates" className="py-10 md:py-16">
            <div className="mx-auto max-w-7xl px-6">
              <TemplateGrid templateDetails={templateDetails} />
            </div>
          </section>
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-6">
              <div className="rounded-3xl border border-border bg-surface/50 p-8 md:p-12">
                <div className="text-center">
                  <h2 className="text-2xl font-bold md:text-3xl">
                    {enTemplates.readyTitle}
                  </h2>
                  <p className="mt-4 text-foreground-secondary">
                    {enTemplates.readyDescription}
                  </p>
                  <div className="mt-8">
                    <Link href="/create">
                      <Button size="lg" className="gap-2">
                        {enTemplates.getStarted}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
