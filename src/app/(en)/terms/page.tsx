import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Scale } from 'lucide-react';
import enSeo from '../../../../messages/en/seo.json';
import common from '../../../../messages/en/common.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: enSeo.terms.title,
    description: enSeo.terms.description,
    keywords: ['terms of service', 'terms of use', 'resume builder terms', 'conditions', 'legal'],
    openGraph: {
      title: enSeo.terms.title,
      description: enSeo.terms.description,
      type: 'website',
      locale: 'en_US',
    },
    alternates: {
      canonical: '/terms',
      languages: {
        en: '/terms',
        es: '/es/terms',
        de: '/de/terms',
        fr: '/fr/terms',
        pt: '/pt/terms',
      },
    },
  };
}

const lastUpdated = 'June 20, 2026';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: (
      <>
        <p>
          By using ResumeCraft (&quot;the Service&quot;), you agree to be bound by
          these Terms of Service. If you do not agree to these terms, please do not
          use the Service.
        </p>
        <p>
          ResumeCraft is provided as a free, open-source tool for creating and
          managing professional resumes. The Service is offered &quot;as is&quot;
          without warranty of any kind.
        </p>
      </>
    ),
  },
  {
    title: 'Description of Service',
    content: (
      <>
        <p>ResumeCraft is a static web application that provides:</p>
        <ul>
          <li>Form-based resume creation and editing</li>
          <li>25+ professional templates for formatting</li>
          <li>Export to PDF, DOCX, JSON, HTML, and plain text formats</li>
          <li>Local storage of resume data in your browser</li>
        </ul>
        <p>
          The Service runs entirely in your browser. We do not host, store, or
          process your resume data on our servers. This means:
        </p>
        <ul>
          <li>We cannot access, view, or recover your resume data.</li>
          <li>You are solely responsible for maintaining backups.</li>
          <li>The Service functions fully offline once loaded.</li>
        </ul>
      </>
    ),
  },
  {
    title: 'User Responsibilities',
    content: (
      <>
        <p>As a user of ResumeCraft, you agree to:</p>
        <ul>
          <li>
            Use the Service for lawful purposes only — creating genuine resumes
            for job applications and professional use.
          </li>
          <li>
            Not misuse the Service for spam, fraud, impersonation, or any illegal
            activity.
          </li>
          <li>
            Not attempt to reverse engineer, exploit, or disrupt the Service&apos;s
            functionality.
          </li>
          <li>
            Maintain your own backups of important resume data. The Service is a
            tool, not a storage solution.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'Intellectual Property',
    content: (
      <>
        <p>
          <strong>Your Content:</strong> You retain full ownership of all
          information, text, and data you enter into ResumeCraft. We make no claim
          of ownership over your resume content.
        </p>
        <p>
          <strong>Our IP:</strong> The ResumeCraft application, including its
          source code, templates, design system, and branding, is open source under
          the MIT License. You may view, fork, and contribute to the project via
          GitHub.
        </p>
        <p>
          <strong>Templates:</strong> The resume templates provided are designed
          to be used freely. You may use any resume you create with our templates
          for any personal or professional purpose.
        </p>
      </>
    ),
  },
  {
    title: 'Limitation of Liability',
    content: (
      <>
        <p>
          ResumeCraft is provided free of charge and without any guarantees. To
          the maximum extent permitted by applicable law:
        </p>
        <ul>
          <li>
            We are not liable for any loss of data — please maintain your own
            backups.
          </li>
          <li>
            We are not responsible for how employers, recruiters, or third parties
            interpret or process resumes created with the Service.
          </li>
          <li>
            We are not liable for any indirect, incidental, or consequential
            damages arising from your use of the Service.
          </li>
        </ul>
        <div className="callout callout-warning">
          <p>
            <strong>No guarantees:</strong> The Service may contain bugs, errors,
            or inaccuracies. We are actively developing and improving, but we make
            no承诺 that the Service will meet your specific requirements.
          </p>
        </div>
      </>
    ),
  },
  {
    title: 'Third-Party Links',
    content: (
      <>
        <p>
          The Service may contain links to third-party websites or resources. We
          are not responsible for the content, privacy practices, or availability of
          these external sites. Examples include:
        </p>
        <ul>
          <li>GitHub repository and associated services</li>
          <li>Cloudflare Pages (hosting) and Cloudflare Web Analytics (analytics)</li>
          <li>External font providers and CDN resources</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Changes to Terms',
    content: (
      <>
        <p>
          We reserve the right to modify these terms at any time. Changes will be
          posted on this page with an updated &quot;Last updated&quot; date. Your
          continued use of the Service after changes constitutes acceptance of the
          new terms.
        </p>
      </>
    ),
  },
  {
    title: 'Governing Law',
    content: (
      <>
        <p>
          These terms are governed by the laws of{' '}
          <strong>England and Wales</strong>. Any disputes arising from these terms
          or the Service will be resolved in the courts of England and Wales.
        </p>
      </>
    ),
  },
  {
    title: 'Contact',
    content: (
      <>
        <p>
          Questions about these terms? Reach out through our GitHub repository:
        </p>
        <ul>
          <li>
            <strong>GitHub Issues</strong> —{' '}
            <a
              href="https://github.com/lukadevv/resume-craft/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/lukadevv/resume-craft/issues
            </a>
          </li>
          <li>
            <strong>Project Repository</strong> —{' '}
            <a
              href="https://github.com/lukadevv/resume-craft"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/lukadevv/resume-craft
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
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
                  <Scale className="h-4 w-4 text-primary" />
                  {common.pages.terms.badge}
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  {common.pages.terms.title}
                </h1>
                <p className="mt-4 text-lg text-foreground-secondary md:text-xl">
                  {common.pages.terms.subtitle}
                </p>
                <p className="mt-3 text-sm text-foreground-secondary">
                  Last updated: {lastUpdated}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Content Section */}
        <section className="border-t border-border bg-surface/20 pb-20">
          <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-16">
            <div className="mx-auto max-w-3xl">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h2>{section.title}</h2>
                    {section.content}
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
