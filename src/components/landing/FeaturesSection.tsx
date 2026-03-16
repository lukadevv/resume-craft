'use client';

import { Layout, Palette, Download, Eye, Zap, Shield } from 'lucide-react';
import { type CSSProperties } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Layout,
    title: '5 Professional Templates',
    description:
      'Choose from Modern, Classic, Minimal, Creative, Technical, and Programming templates designed by professionals.',
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
    description: 'Export to PDF, DOCX, and more — ready for any application workflow.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your resume data stays in your browser — no servers, no tracking, no surprises.',
  },
  {
    icon: Zap,
    title: 'Fast & Easy',
    description: 'Intuitive interface lets you create a professional resume in under 10 minutes.',
  },
];

export function FeaturesSection() {
  const timelineStyle = {
    '--features-ring':
      'linear-gradient(135deg, rgba(15,23,42,0.08), rgba(62,207,142,0.22), rgba(15,23,42,0.04))',
    '--features-ring-dark':
      'linear-gradient(135deg,rgba(255,255,255,0.14),rgba(62,207,142,0.22),rgba(255,255,255,0.06))',
    '--features-card-bg':
      'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(240,253,250,0.90))',
    '--features-card-bg-dark': '#0b1220',
    '--features-grid-line': 'rgba(15,23,42,0.08)',
    '--features-grid-line-dark': 'rgba(255,255,255,0.06)',
    '--features-glow-1': 'rgba(62,207,142,0.14)',
    '--features-glow-2': 'rgba(22,160,133,0.12)',
    '--features-glow-1-dark': 'rgba(62,207,142,0.18)',
    '--features-glow-2-dark': 'rgba(22,160,133,0.18)',
  } as CSSProperties;

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm text-foreground-secondary">
              Features
            </div>
            <h2 className="text-3xl font-bold md:text-4xl mt-6">
              Everything You Need to Create the <span className="gradient-text">Perfect Resume</span>
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary">
              Powerful features designed to help you land your dream job. No design skills required.
            </p>
          </div>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <div
              className={cn(
                'relative rounded-3xl p-[1px] shadow-xl',
                '[background:var(--features-ring)] dark:[background:var(--features-ring-dark)]',
              )}
              style={timelineStyle}
            >
              <div
                data-testid="features-timeline-card"
                className={cn(
                  'relative overflow-hidden rounded-[1.45rem] p-6 md:p-10',
                  'border border-border/60',
                  '[background:var(--features-card-bg)] dark:[background:var(--features-card-bg-dark)]',
                )}
                style={timelineStyle}
              >
                {/* Background */}
                <div className="pointer-events-none absolute inset-0 opacity-80 dark:opacity-90">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--features-glow-1),transparent_55%)] dark:bg-[radial-gradient(circle_at_top_left,var(--features-glow-1-dark),transparent_55%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--features-glow-2),transparent_55%)] dark:bg-[radial-gradient(circle_at_bottom_right,var(--features-glow-2-dark),transparent_55%)]" />
                  <div
                    className={cn(
                      'absolute inset-0',
                      'bg-[linear-gradient(to_right,var(--features-grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--features-grid-line)_1px,transparent_1px)]',
                      'dark:bg-[linear-gradient(to_right,var(--features-grid-line-dark)_1px,transparent_1px),linear-gradient(to_bottom,var(--features-grid-line-dark)_1px,transparent_1px)]',
                      'bg-[size:52px_52px]',
                      '[-webkit-mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_70%)] [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_70%)]',
                    )}
                  />
                </div>

                <div className="relative grid gap-8 md:gap-10">
                {features.map((feature, index) => {
                  const number = String(index + 1).padStart(2, '0');
                  const isFirst = index === 0;
                  const isLast = index === features.length - 1;

                  return (
                    <Reveal key={feature.title} delayMs={index * 70}>
                      <div className="grid items-start gap-4 md:grid-cols-[88px_96px_1fr] md:gap-6">
                        {/* Number */}
                        <div className="pt-1 text-4xl font-bold tabular-nums text-primary md:text-5xl">
                          {number}
                        </div>

                        {/* Icon + Line */}
                        <div className="relative flex justify-center">
                          {!isFirst && (
                            <div
                              className={cn(
                                'absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2',
                                'bg-[linear-gradient(to_bottom,rgba(62,207,142,0.0),rgba(62,207,142,0.55),rgba(62,207,142,0.0))] bg-[size:100%_200%]',
                                'animate-[timeline-flow_3.5s_linear_infinite]',
                              )}
                            />
                          )}
                          {!isLast && (
                            <div
                              className={cn(
                                'absolute left-1/2 bottom-0 h-1/2 w-px -translate-x-1/2',
                                'bg-[linear-gradient(to_bottom,rgba(62,207,142,0.0),rgba(62,207,142,0.55),rgba(62,207,142,0.0))] bg-[size:100%_200%]',
                                'animate-[timeline-flow_3.5s_linear_infinite]',
                              )}
                            />
                          )}

                          <div className="relative z-10">
                            <div
                              className={cn(
                                'relative flex h-16 w-16 items-center justify-center rounded-2xl border bg-background/60',
                                'border-border/70 shadow-[0_0_0_1px_rgba(15,23,42,0.04)]',
                                'before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),transparent_55%)] before:opacity-45',
                                'dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]',
                                'dark:before:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_55%)] dark:before:opacity-80',
                              )}
                            >
                              <div className="absolute -inset-6 -z-10 rounded-full bg-primary/10 blur-2xl dark:bg-primary/15" />
                              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-white shadow-md animate-[float-soft_4.5s_ease-in-out_infinite]">
                                <feature.icon className="h-6 w-6" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Text */}
                        <div className="pt-1">
                          <h3 className="text-lg font-semibold text-foreground md:text-xl">
                            <span className="text-primary">{feature.title}</span>
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-foreground-secondary md:text-base">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
