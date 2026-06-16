import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield } from 'lucide-react';
import enSeo from '../../../../messages/en/seo.json';
import common from '../../../../messages/en/common.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: enSeo.privacy.title,
    description: enSeo.privacy.description,
    keywords: ['privacy policy', 'data privacy', 'resume builder privacy', 'data protection', 'GDPR'],
    openGraph: {
      title: enSeo.privacy.title,
      description: enSeo.privacy.description,
      type: 'website',
      locale: 'en_US',
    },
    alternates: {
      canonical: '/privacy',
      languages: {
        en: '/privacy',
        es: '/es/privacy',
        de: '/de/privacy',
        fr: '/fr/privacy',
        pt: '/pt/privacy',
      },
    },
  };
}

const lastUpdated = 'June 1, 2026';

const sections = [
  {
    title: 'Information We Collect',
    content: (
      <>
        <p>
          ResumeCraft is designed with your privacy first. Because your resume data
          is stored <strong>entirely in your browser&apos;s local storage</strong>,
          we never have access to the personal information you enter. Here&apos;s
          what that means in practice:
        </p>
        <ul>
          <li>
            <strong>Resume data</strong> — Names, work history, education, skills,
            and any other information you enter stays on your device. It is never
            transmitted to our servers.
          </li>
          <li>
            <strong>Account information</strong> — ResumeCraft does not require an
            account. We do not collect email addresses, passwords, or any
            authentication credentials.
          </li>
          <li>
            <strong>Usage analytics</strong> — We may collect anonymous usage data
            (page views, feature interactions) to improve the application. This
            data cannot be used to identify you personally.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'How We Use Your Information',
    content: (
      <>
        <p>
          Since we don&apos;t collect your resume data, our use of information
          is minimal and transparent:
        </p>
        <ul>
          <li>
            <strong>Local storage</strong> — Your resume drafts and preferences are
            saved to your browser&apos;s localStorage so they persist between
            sessions. You can clear this data at any time through your browser
            settings.
          </li>
          <li>
            <strong>Anonymous analytics</strong> — We use aggregated data to
            understand which templates are popular, where users drop off, and how
            to improve the experience.
          </li>
          <li>
            <strong>No selling of data</strong> — We do not sell, rent, or share
            your personal information with third parties for their marketing
            purposes.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'Local Storage & Your Control',
    content: (
      <>
        <p>
          ResumeCraft uses your browser&apos;s <code>localStorage</code> API to
          store your resume data. This means:
        </p>
        <ul>
          <li>Your data never leaves your device unless you export it.</li>
          <li>
            You can view, edit, or delete your data at any time from within the
            app.
          </li>
          <li>
            Clearing your browser&apos;s local storage will remove all resume data.
            We recommend exporting important resumes as PDF or DOCX backups.
          </li>
          <li>No cookies are used for tracking or advertising purposes.</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Third-Party Services',
    content: (
      <>
        <p>ResumeCraft integrates with the following third-party services:</p>
        <ul>
          <li>
            <strong>GitHub Pages / Vercel</strong> — The application is hosted as a
            static site. Standard server logs (IP address, browser type, pages
            visited) may be collected by the hosting provider.
          </li>
          <li>
            <strong>Export libraries</strong> — When exporting to PDF or DOCX, the
            conversion happens entirely in your browser. No data is sent to
            external conversion services.
          </li>
        </ul>
        <p>
          We carefully vet all third-party integrations and choose those that
          respect user privacy.
        </p>
      </>
    ),
  },
  {
    title: 'Data Security',
    content: (
      <>
        <p>
          Because your resume data never reaches our servers, the primary security
          risk is on your own device. We recommend:
        </p>
        <ul>
          <li>Keeping your browser and operating system up to date.</li>
          <li>
            Using strong device-level security (passwords, biometrics, encryption).
          </li>
          <li>
            Exporting and backing up important resumes outside of the application.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'Your Rights',
    content: (
      <>
        <p>
          Depending on your jurisdiction (e.g., GDPR in the EU, CCPA in
          California), you may have rights including:
        </p>
        <ul>
          <li>
            <strong>Right to access</strong> — Since your data is local, you have
            full access to everything you&apos;ve created.
          </li>
          <li>
            <strong>Right to deletion</strong> — You can delete your data at any
            time from within the app or by clearing browser storage.
          </li>
          <li>
            <strong>Right to data portability</strong> — Export your resumes as
            JSON, PDF, or DOCX at any time.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'Changes to This Policy',
    content: (
      <>
        <p>
          We may update this privacy policy from time to time. Changes will be
          posted on this page with an updated &quot;Last updated&quot; date. We
          encourage you to review this page periodically.
        </p>
      </>
    ),
  },
  {
    title: 'Contact',
    content: (
      <>
        <p>
          Have questions about this privacy policy or how we handle your data?
          Reach out to us:
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

export default function PrivacyPage() {
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
                  <Shield className="h-4 w-4 text-primary" />
                  {common.pages.privacy.badge}
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  {common.pages.privacy.title}
                </h1>
                <p className="mt-4 text-lg text-foreground-secondary md:text-xl">
                  {common.pages.privacy.subtitle}
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
