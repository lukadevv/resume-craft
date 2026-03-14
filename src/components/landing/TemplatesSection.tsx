'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TemplateType } from '@/types/resume';

interface Template {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
  features: string[];
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with a professional touch',
    preview: 'modern',
    features: ['Clean layout', 'Accent colors', 'Timeline design'],
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume format that works for any industry',
    preview: 'classic',
    features: ['Professional', 'ATS-friendly', 'Time-tested'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content',
    preview: 'minimal',
    features: ['Whitespace', 'Typography focus', 'Subtle details'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Stand out with unique and eye-catching design',
    preview: 'creative',
    features: ['Bold colors', 'Custom sections', 'Visual impact'],
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Perfect for tech roles with skills-focused layout',
    preview: 'technical',
    features: ['Skills matrix', 'Code-friendly', 'Project highlights'],
  },
];

const templateColors: Record<TemplateType, string> = {
  modern: 'from-blue-500 to-cyan-500',
  classic: 'from-slate-600 to-slate-800',
  minimal: 'from-gray-400 to-gray-600',
  creative: 'from-purple-500 to-pink-500',
  technical: 'from-green-500 to-emerald-500',
};

export function TemplatesSection() {
  return (
    <section className="py-20 md:py-32 bg-surface/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Choose Your <span className="gradient-text">Perfect Template</span>
          </h2>
          <p className="mt-4 text-lg text-foreground-secondary">
            5 professionally designed templates tailored for different industries and career levels.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-background transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Preview */}
              <div
                className={`relative aspect-[3/4] bg-gradient-to-br ${templateColors[template.id]} p-6`}
              >
                <div className="absolute inset-4 rounded-lg bg-white shadow-lg">
                  <div className="h-full p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                      <div className="space-y-1">
                        <div className="h-3 w-20 rounded bg-gray-200" />
                        <div className="h-2 w-16 rounded bg-gray-100" />
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="h-2 w-full rounded bg-gray-100" />
                      <div className="h-2 w-4/5 rounded bg-gray-100" />
                      <div className="h-2 w-3/5 rounded bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="h-8 rounded bg-gray-100" />
                      <div className="h-8 rounded bg-gray-100" />
                    </div>
                  </div>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Link href={`/create?template=${template.id}`}>
                    <Button variant="secondary" className="gap-2">
                      Use Template
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <p className="mt-1 text-sm text-foreground-secondary">{template.description}</p>
                <ul className="mt-4 space-y-2">
                  {template.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-foreground-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/templates">
            <Button variant="outline" size="lg" className="gap-2">
              View All Templates
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
