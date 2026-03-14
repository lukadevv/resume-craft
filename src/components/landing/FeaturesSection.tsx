'use client';

import { Layout, Palette, Download, Eye, FileJson, Zap, Shield, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Layout,
    title: '5 Professional Templates',
    description:
      'Choose from Modern, Classic, Minimal, Creative, and Technical templates designed by professionals.',
  },
  {
    icon: Palette,
    title: 'Customizable Colors',
    description: 'Personalize your resume with custom colors that match your style and brand.',
  },
  {
    icon: Eye,
    title: 'Live Preview',
    description: 'See changes in real-time as you edit your resume. WYSIWYG editing at its best.',
  },
  {
    icon: Download,
    title: 'Multiple Export Formats',
    description:
      'Export to PDF, DOCX, JSON, HTML, or plain text. Compatible with all application systems.',
  },
  {
    icon: FileJson,
    title: 'Data Portability',
    description:
      'Your data stays yours. Export and import your resume data in JSON format anytime.',
  },
  {
    icon: Zap,
    title: 'Fast & Easy',
    description: 'Intuitive interface lets you create a professional resume in under 10 minutes.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'All data is stored locally in your browser. No servers, no tracking, completely private.',
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    description: 'Access your resumes from any device. Create, edit, and download on the go.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Everything You Need to Create the <span className="gradient-text">Perfect Resume</span>
          </h2>
          <p className="mt-4 text-lg text-foreground-secondary">
            Powerful features designed to help you land your dream job. No design skills required.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/50 bg-surface/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-white mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
