import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HelpCircle } from 'lucide-react';
import enSeo from '../../../../messages/en/seo.json';
import common from '../../../../messages/en/common.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: enSeo.faq.title,
    description: enSeo.faq.description,
    keywords: ['FAQ', 'resume builder help', 'frequently asked questions', 'how to use'],
    openGraph: {
      title: enSeo.faq.title,
      description: enSeo.faq.description,
      type: 'website',
      locale: 'en_US',
    },
    alternates: {
      canonical: '/faq',
      languages: {
        en: '/faq',
        es: '/es/faq',
        de: '/de/faq',
        fr: '/fr/faq',
        pt: '/pt/faq',
      },
    },
  };
}

const faqItems = [
  {
    question: 'Where is my resume data stored?',
    answer: (
      <p>
        Entirely in your browser&apos;s local storage. We don&apos;t have servers,
        accounts, or databases. Your data never leaves your device unless
        <em>you</em> choose to export or share it.
      </p>
    ),
  },
  {
    question: 'Can I use ResumeCraft offline?',
    answer: (
      <p>
        Yes. ResumeCraft is a Progressive Web App (PWA). Once you&apos;ve visited
        the site, it works fully offline — including creating, editing, and
        exporting resumes. You can even install it as an app on your phone or
        desktop.
      </p>
    ),
  },
  {
    question: 'How do I export my resume as a PDF?',
    answer: (
      <>
        <p>
          Open the resume you want to export, click the <strong>Export</strong>{' '}
          button in the top bar, and select <strong>PDF</strong>. The conversion
          happens entirely in your browser — nothing is sent to a server.
        </p>
        <p>
          You can also export as DOCX, JSON, HTML, or plain text from the same
          menu.
        </p>
      </>
    ),
  },
  {
    question: 'Are my resumes private?',
    answer: (
      <p>
        Completely. Since everything lives in your browser, there&apos;s no way
        for us — or anyone else — to access your resume data. The only exception
        is if you choose to share a generated link or file yourself.
      </p>
    ),
  },
  {
    question: 'How many resumes can I create?',
    answer: (
      <p>
        As many as you want. There are no limits, no paid tiers, and no
        subscription. All 25+ templates are free to use on every single resume.
      </p>
    ),
  },
  {
    question: 'Can I use the templates for commercial purposes?',
    answer: (
      <p>
        Absolutely. Any resume you create with ResumeCraft is yours to use
        however you like — job applications, freelance proposals, portfolio
        showcases, you name it.
      </p>
    ),
  },
  {
    question: 'What happens if I clear my browser data?',
    answer: (
      <p>
        Your resumes will be deleted. We recommend exporting important resumes as
        PDF or DOCX backups. You can also export as JSON, which you can re-import
        later to continue editing.
      </p>
    ),
  },
  {
    question: 'Is there a way to recover deleted resumes?',
    answer: (
      <p>
        Unfortunately, no. Because data is stored locally, there&apos;s no undo
        once it&apos;s deleted. This is why we recommend regular backups via
        JSON export.
      </p>
    ),
  },
  {
    question: 'Will my data be used to train AI models?',
    answer: (
      <p>
        Never. We don&apos;t have access to your data to begin with. Your resume
        content stays on your device and is never transmitted anywhere.
      </p>
    ),
  },
  {
    question: 'Is ResumeCraft really free?',
    answer: (
      <p>
        Yes, always. ResumeCraft is open source under the MIT License. There are
        no paid plans, no hidden features behind a paywall, and no ads. If you
        find it useful, the best way to support it is by{' '}
        <a
          href="https://github.com/lukadevv/resume-craft"
          target="_blank"
          rel="noopener noreferrer"
        >
          starring the repo on GitHub
        </a>{' '}
        or contributing.
      </p>
    ),
  },
  {
    question: 'How do I report a bug or request a feature?',
    answer: (
      <p>
        Open an issue on our{' '}
        <a
          href="https://github.com/lukadevv/resume-craft/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repository
        </a>
        . We review every submission and typically respond within a few days.
      </p>
    ),
  },
];

export default function FAQPage() {
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
                  <HelpCircle className="h-4 w-4 text-primary" />
                  {common.pages.faq.badge}
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  {common.pages.faq.title}
                </h1>
                <p className="mt-4 text-lg text-foreground-secondary md:text-xl">
                  {common.pages.faq.subtitle}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Content */}
        <section className="border-t border-border bg-surface/20 pb-20">
          <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-16">
            <div className="mx-auto max-w-3xl">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {faqItems.map((item, index) => (
                  <div key={index} className="not-prose mb-8">
                    <details className="group cursor-pointer rounded-2xl border border-border bg-background transition-colors hover:border-border/80">
                      <summary className="flex items-center justify-between gap-4 px-6 py-5 text-base font-medium text-foreground list-none">
                        <span className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {index + 1}
                          </span>
                          <span>{item.question}</span>
                        </span>
                        <Chevron className="h-5 w-5 shrink-0 text-foreground-secondary transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="border-t border-border px-6 py-5 text-foreground-secondary">
                        {item.answer}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
