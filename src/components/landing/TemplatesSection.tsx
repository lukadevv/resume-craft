'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { type CSSProperties } from 'react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import {
  getLandingPresentation,
  templateDefinitions,
  type TemplateSection,
  type EmphasisComponent,
} from '@/lib/templates';

const sectionLabels: Record<TemplateSection, string> = {
  summary: 'Summary',
  workExperience: 'Work Experience',
  education: 'Education',
  skills: 'Skills Matrix',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  contact: 'Contact',
  references: 'References',
  customSections: 'Custom Sections',
  // Role-specific sections
  publications: 'Publications',
  grantsFellowships: 'Grants & Fellowships',
  conferences: 'Conferences',
  licenses: 'Licenses',
  clinicalSkills: 'Clinical Skills',
  barAdmission: 'Bar Admission',
  practiceAreas: 'Practice Areas',
  securityClearance: 'Security Clearance',
  teachingPhilosophy: 'Teaching Philosophy',
  classroomExperience: 'Classroom Experience',
  tools: 'Tools & Technologies',
  portfolio: 'Portfolio',
  achievements: 'Achievements',
  affiliations: 'Affiliations',
  coreCompetencies: 'Core Competencies',
  awards: 'Awards',
  teachingExperience: 'Teaching Experience',
};

const emphasisLabels: Record<EmphasisComponent, string> = {
  languageArc: 'Language arcs',
  skillDots: 'Skill dots',
  contactBadges: 'Contact badges',
  educationTimeline: 'Education timeline',
  backgroundAccent: 'Background accents',
  skillBars: 'Skill bars',
  metricsCallout: 'Metrics callout',
  timelineGraphic: 'Timeline graphics',
  certificationBadge: 'Certification badges',
};

const templates = templateDefinitions;

export function TemplatesSection() {
  return (
    <section id="templates" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm text-foreground-secondary">
              Templates
            </div>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Choose Your <span className="gradient-text">Perfect Template</span>
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary">
              20 professionally designed templates tailored for different industries and career
              levels.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 grid-cols-3 max-[975px]:grid-cols-2 max-[505px]:grid-cols-1 items-start">
          {templates.map((template, index) => {
            const layoutLabel = template.layoutType.replace('-', ' ');
            const primaryLabel = template.primarySections
              .map((section) => sectionLabels[section])
              .join(', ');
            const emphasisLabel =
              template.emphasisComponents.length > 0
                ? template.emphasisComponents
                    .map((component) => emphasisLabels[component])
                    .join(', ')
                : 'Balanced focus';

            const glowStyle = {
              background:
                template.background?.gradient ||
                `linear-gradient(135deg, ${template.accentColor}, rgba(255,255,255,0))`,
            };

            const landingPresentation =
              template.landingPresentation ?? getLandingPresentation(template.accentColor);

            const landingStyle = {
              '--template-card-bg': landingPresentation.cardBackground.light,
              '--template-card-bg-dark': landingPresentation.cardBackground.dark,
              '--template-hover-overlay': landingPresentation.hoverOverlay.light,
              '--template-hover-overlay-dark': landingPresentation.hoverOverlay.dark,
            } as CSSProperties;

            return (
              <Reveal
                key={template.id}
                delayMs={index * 70}
                className="group h-full rounded-[1.6rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40"
              >
                <div
                  data-testid={`template-card-${template.id}`}
                  className={cn(
                    'relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border/60 bg-surface/80 transition-colors duration-300 group-hover:border-primary/80 dark:bg-surface',
                    '[background:var(--template-card-bg)] dark:[background:var(--template-card-bg-dark)]'
                  )}
                  style={landingStyle}
                >
                  {/* Preview */}
                  <div className="relative flex-1 p-6">
                    <div className="relative">
                      {/* Glow pulse */}
                      <div
                        aria-hidden="true"
                        style={{ animationDelay: `${index * 0.6}s`, ...glowStyle }}
                        className={cn(
                          'pointer-events-none absolute -inset-2 rounded-2xl blur-xl',
                          'opacity-35 transition-opacity group-hover:opacity-70',
                          'motion-safe:animate-[template-glow_6s_ease-in-out_infinite] motion-reduce:animate-none'
                        )}
                      />

                      {/* Gradient ring + preview surface */}
                      <div className="relative rounded-2xl p-1" style={glowStyle}>
                        <div
                          className={cn(
                            'relative aspect-[3/4] overflow-hidden rounded-[1.05rem] border border-white/10 transition-shadow',
                            'bg-gradient-to-b from-slate-100/90 via-slate-100/80 to-slate-100/70',
                            'shadow-[0_20px_60px_rgba(15,23,42,0.35)]',
                            'dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-900/70',
                            'dark:border-white/5 dark:shadow-[0_25px_70px_rgba(0,0,0,0.65)]'
                          )}
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_55%)] opacity-30 dark:opacity-15" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_55%)] opacity-20 dark:opacity-10" />
                          <div className="relative h-full p-5">
                            <div className="h-full space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/90 dark:bg-white/10 shadow-inner" />
                                <div className="space-y-2">
                                  <div className="h-3 w-24 rounded bg-white/80 dark:bg-white/20" />
                                  <div className="h-2 w-16 rounded bg-white/70 dark:bg-white/15" />
                                </div>
                              </div>
                              <div className="space-y-2 pt-1">
                                <div className="h-2 w-full rounded bg-white/70 dark:bg-white/15" />
                                <div className="h-2 w-4/5 rounded bg-white/60 dark:bg-white/12" />
                                <div className="h-2 w-3/5 rounded bg-white/50 dark:bg-white/10" />
                              </div>
                              <div className="grid grid-cols-2 gap-2 pt-2">
                                <div className="h-9 rounded bg-white/30 dark:bg-white/10" />
                                <div className="h-9 rounded bg-white/30 dark:bg-white/10" />
                              </div>
                            </div>
                          </div>

                          {/* Overlay on hover */}
                          <div
                            data-testid={`template-hover-overlay-${template.id}`}
                            className={cn(
                              'absolute inset-0 rounded-[1.05rem] flex items-center justify-center',
                              'opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100',
                              '[background:var(--template-hover-overlay)] dark:[background:var(--template-hover-overlay-dark)]'
                            )}
                          >
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
                  <div className="px-6 pb-6 h-full">
                    <h3 className="text-lg font-semibold text-foreground">{template.name}</h3>
                    <p className="mt-1 text-sm text-foreground-secondary">{template.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-foreground-secondary">
                      {[
                        `Layout: ${layoutLabel}`,
                        `Primary: ${primaryLabel}`,
                        `Emphasis: ${emphasisLabel}`,
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary min-w-4 min-h-4" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delayMs={200} className="mt-12 text-center">
          <Link href="/#templates">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-border text-foreground hover:bg-foreground/5"
            >
              View All Templates
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
