import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { templateDefinitions, getTemplateDefinition } from '@/lib/templates';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import type { TemplateType } from '@/types/resume';

interface TemplatePageProps {
  params: Promise<{
    templateId?: string;
  }>;
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const resolvedParams = await params;

  if (resolvedParams.templateId) {
    const template = getTemplateDefinition(resolvedParams.templateId as TemplateType);
    if (!template) return notFound();

    return {
      title: `${template.name} Resume Template | Resume Craft`,
      description: template.description,
      keywords: [
        `${template.name} resume template`,
        'resume builder',
        'professional resume',
        'CV template',
        template.layoutType.replace('-', ' ') + ' resume',
      ],
      openGraph: {
        title: `${template.name} Resume Template | Resume Craft`,
        description: template.description,
        type: 'website',
      },
    };
  }

  return {
    title: 'Professional Resume Templates | Resume Craft',
    description:
      'Choose from 25 professionally designed resume templates tailored for every industry and career level. Modern, classic, creative, and industry-specific designs.',
    keywords: [
      'resume templates',
      'CV templates',
      'professional resume designs',
      'resume builder',
      'free resume templates',
      'job resume templates',
      'career templates',
    ],
    openGraph: {
      title: 'Professional Resume Templates | Resume Craft',
      description:
        'Choose from 20 professionally designed resume templates tailored for every industry and career level.',
      type: 'website',
    },
    alternates: {
      canonical: '/templates',
    },
  };
}

const templateDetails: Record<
  TemplateType,
  {
    idealFor: string[];
    keyFeatures: string[];
  }
> = {
  modern: {
    idealFor: ['Tech professionals', 'Startups', 'Recent graduates', 'Creative industries'],
    keyFeatures: [
      'Two-column layout with sidebar',
      'Accent color headers',
      'Clean section dividers',
    ],
  },
  classic: {
    idealFor: ['Corporate roles', 'Finance', 'Legal', 'Traditional industries'],
    keyFeatures: ['Timeline-based layout', 'Serif typography options', 'Traditional structure'],
  },
  minimal: {
    idealFor: ['Designers', 'Writers', 'Academics', 'Minimalists'],
    keyFeatures: ['Single-column layout', 'Maximum whitespace', 'Clean typography'],
  },
  creative: {
    idealFor: ['Marketing', 'Design', 'Entertainment', 'Media'],
    keyFeatures: ['Split-column layout', 'Bold accent imagery', 'Feature cards for highlights'],
  },
  technical: {
    idealFor: ['Software Engineers', 'Data Scientists', 'IT Professionals'],
    keyFeatures: ['Skills-heavy sidebar', 'Technology icons', 'Project technology tags'],
  },
  softwareDeveloper: {
    idealFor: ['Software Developers', 'Full-Stack Engineers', 'DevOps'],
    keyFeatures: [
      'Tech-focused layout',
      'Skills bars visualization',
      'GitHub/Portfolio integration',
    ],
  },
  dataScientist: {
    idealFor: ['Data Scientists', 'ML Engineers', 'Analysts'],
    keyFeatures: ['Skills charts', 'Metrics emphasis', 'Project impact highlights'],
  },
  uxDesigner: {
    idealFor: ['UX Designers', 'UI Designers', 'Product Designers'],
    keyFeatures: ['Portfolio showcase area', 'Design tools section', 'Clean modern layout'],
  },
  graphicDesigner: {
    idealFor: ['Graphic Designers', 'Illustrators', 'Visual Artists'],
    keyFeatures: ['Visual-first design', 'Bold typography', 'Portfolio emphasis'],
  },
  productManager: {
    idealFor: ['Product Managers', 'Project Managers', 'Scrum Masters'],
    keyFeatures: ['Metrics callout sections', 'Core competencies area', 'Strategy focus'],
  },
  projectManager: {
    idealFor: ['Project Managers', 'Program Managers', 'Operations'],
    keyFeatures: ['Timeline graphics', 'Certification badges', 'Leadership emphasis'],
  },
  marketing: {
    idealFor: ['Marketing Managers', 'Digital Marketers', 'Brand Managers'],
    keyFeatures: ['Campaign metrics emphasis', 'Digital skills section', 'Achievement cards'],
  },
  sales: {
    idealFor: ['Sales Executives', 'Account Managers', 'BD Managers'],
    keyFeatures: ['Sales metrics highlights', 'Revenue emphasis', 'CRM skills section'],
  },
  accountant: {
    idealFor: ['Accountants', 'Auditors', 'Financial Analysts'],
    keyFeatures: ['Certification badges', 'Finance-focused layout', 'Professional formatting'],
  },
  nurse: {
    idealFor: ['Nurses', 'Healthcare Professionals', 'Medical Assistants'],
    keyFeatures: ['Clinical skills section', 'License badges', 'Healthcare-focused layout'],
  },
  teacher: {
    idealFor: ['Teachers', 'Educators', 'Professors'],
    keyFeatures: ['Classroom experience section', 'Certification area', 'Education timeline'],
  },
  academic: {
    idealFor: ['Academics', 'Researchers', 'Scientists'],
    keyFeatures: ['Multi-page CV support', 'Publications section', 'Research focus'],
  },
  lawyer: {
    idealFor: ['Lawyers', 'Attorneys', 'Legal Professionals'],
    keyFeatures: ['Formal legal layout', 'Bar admission badges', 'Practice areas section'],
  },
  engineer: {
    idealFor: ['Engineers', 'Technical Professionals', 'Architects'],
    keyFeatures: ['Technical skills bars', 'Project timeline', 'Tools section'],
  },
  executive: {
    idealFor: ['Executives', 'C-Suite', 'Senior Leaders'],
    keyFeatures: ['Executive summary focus', 'Leadership metrics', 'Board achievements'],
  },
  hr: {
    idealFor: ['HR Professionals', 'Recruiters', 'Talent Acquisition'],
    keyFeatures: ['Metrics-driven layout', 'HR certifications', 'Talent acquisition focus'],
  },
  consultant: {
    idealFor: ['Consultants', 'Advisors', 'Strategy Professionals'],
    keyFeatures: ['Case study emphasis', 'Strategy focus', 'Client impact highlights'],
  },
  itSupport: {
    idealFor: ['IT Support', 'System Administrators', 'Help Desk'],
    keyFeatures: ['IT certifications badges', 'Technical skills bars', 'Support experience focus'],
  },
  military: {
    idealFor: ['Veterans', 'Military Personnel', 'Security Professionals'],
    keyFeatures: [
      'Security clearance emphasis',
      'Military-to-civilian translation',
      'Leadership highlights',
    ],
  },
  federal: {
    idealFor: ['Government jobs', 'Federal positions', 'Public sector'],
    keyFeatures: ['USAJOBS optimized', 'GS grade alignment', 'Detailed position format'],
  },
};

export default async function TemplatesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Resume Templates',
    description:
      'Browse our collection of 25 professional resume templates designed for every industry and career level.',
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
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'layoutType',
              value: template.layoutType,
            },
            {
              '@type': 'PropertyValue',
              name: 'primarySections',
              value: template.primarySections.join(', '),
            },
          ],
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
                    25 Professional Templates
                  </div>
                  <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    Find Your Perfect <span className="gradient-text">Resume Template</span>
                  </h1>
                  <p className="mt-8 text-lg text-foreground-secondary md:text-xl text-left">
                    Every template is carefully crafted to help you land your dream job. Choose from
                    modern, classic, creative, and industry-specific designs that highlight your
                    unique strengths.
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="/create">
                      <Button size="lg" className="gap-2">
                        Create Your Resume
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" asChild>
                      <a href="#templates">Browse Templates</a>
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
          </div>

          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-6">
              <div className="rounded-3xl border border-border bg-surface/50 p-8 md:p-12">
                <div className="text-center">
                  <h2 className="text-2xl font-bold md:text-3xl">
                    Ready to Create Your Professional Resume?
                  </h2>
                  <p className="mt-4 text-foreground-secondary">
                    Choose a template and start building your resume in minutes. Export to PDF,
                    DOCX, and more.
                  </p>
                  <div className="mt-8">
                    <Link href="/create">
                      <Button size="lg" className="gap-2">
                        Get Started Now
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
