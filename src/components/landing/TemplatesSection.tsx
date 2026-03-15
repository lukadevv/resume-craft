'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
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
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-3xl p-[1px] shadow-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(62,207,142,0.22),rgba(255,255,255,0.06))]">
          <div className="relative overflow-hidden rounded-[1.45rem] bg-[#0b1220] px-6 py-14 md:px-12 md:py-20">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 opacity-90">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(62,207,142,0.18),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(22,160,133,0.18),transparent_55%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px] [-webkit-mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_72%)] [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0)_72%)]" />
            </div>

            <div className="relative">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="mx-auto inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                  Templates
                </div>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                  Choose Your <span className="text-primary">Perfect Template</span>
                </h2>
                <p className="mt-4 text-lg text-white/65">
                  5 professionally designed templates tailored for different industries and career
                  levels.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              {templates.map((template, index) => (
                <Reveal
                  key={template.id}
                  delayMs={index * 70}
                  className="group relative rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(62,207,142,0.16),rgba(255,255,255,0.05))]"
                >
                  <div className="relative overflow-hidden rounded-[0.95rem] bg-white/5 transition-colors duration-300 group-hover:bg-white/10">
                    {/* Preview */}
                    <div className="relative p-6">
                    <div className="relative">
                      {/* Glow pulse */}
                      <div
                        aria-hidden="true"
                        style={{ animationDelay: `${index * 0.6}s` }}
                        className={cn(
                          'pointer-events-none absolute -inset-2 rounded-2xl blur-xl',
                          `bg-gradient-to-br ${templateColors[template.id]}`,
                          'opacity-35 transition-opacity group-hover:opacity-70',
                          'motion-safe:animate-[template-glow_6s_ease-in-out_infinite] motion-reduce:animate-none',
                        )}
                      />

                      {/* Gradient ring + paper */}
                      <div
                        className={cn(
                          'relative rounded-2xl p-1',
                          `bg-gradient-to-br ${templateColors[template.id]}`,
                        )}
                      >
                        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.05rem] bg-white shadow-xl">
                          <div className="h-full p-5 space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full skeleton motion-reduce:animate-none" />
                              <div className="space-y-2">
                                <div className="h-3 w-24 rounded skeleton motion-reduce:animate-none" />
                                <div className="h-2 w-16 rounded skeleton motion-reduce:animate-none" />
                              </div>
                            </div>
                            <div className="space-y-2 pt-1">
                              <div className="h-2 w-full rounded skeleton motion-reduce:animate-none" />
                              <div className="h-2 w-4/5 rounded skeleton motion-reduce:animate-none" />
                              <div className="h-2 w-3/5 rounded skeleton motion-reduce:animate-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-2">
                              <div className="h-9 rounded skeleton motion-reduce:animate-none" />
                              <div className="h-9 rounded skeleton motion-reduce:animate-none" />
                            </div>
                          </div>

                          {/* Overlay on hover */}
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/20 via-black/55 to-black/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                            <Link href={`/create?template=${template.id}`}>
                              <Button
                                variant="secondary"
                                className="gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                              >
                                Use Template
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>

                    {/* Info */}
                    <div className="px-6 pb-6">
                      <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                      <p className="mt-1 text-sm text-white/65">{template.description}</p>
                      <ul className="mt-4 space-y-2">
                        {template.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-white/70"
                          >
                            <Check className="h-4 w-4 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delayMs={200} className="mt-12 text-center">
              <Link href="/templates">
                <Button variant="outline" size="lg" className="gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white">
                  View All Templates
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </Reveal>
          </div>
        </div>
          </div>
      </div>
    </section>
  );
}
