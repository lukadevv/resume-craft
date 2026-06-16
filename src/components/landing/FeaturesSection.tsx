'use client';

import { type CSSProperties } from 'react';
import { Layout, Palette, Download, Shield, FileCheck, Wifi } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

type FeatureKey = 'templates' | 'ats' | 'export' | 'privacy' | 'customization' | 'pwa';

const featureIconMap: Record<FeatureKey, typeof Layout> = {
  templates: Layout,
  ats: FileCheck,
  export: Download,
  privacy: Shield,
  customization: Palette,
  pwa: Wifi,
};

const featureKeys: FeatureKey[] = ['templates', 'ats', 'export', 'privacy', 'customization', 'pwa'];

const cardBgStyle: CSSProperties = {
  '--features-card-bg': 'linear-gradient(180deg, #0b1220 0%, #0f172a 100%)',
  '--features-card-bg-dark': 'linear-gradient(180deg, #0b1220 0%, #0f172a 100%)',
} as CSSProperties;

export function FeaturesSection() {
  const t = useTranslations('landing');

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm text-foreground-secondary">
              {t('features.subtitle')}
            </div>
            <h2 className="text-3xl font-bold md:text-4xl mt-6">
              {(() => {
                const title = t('features.title');
                // Split at last space to wrap "Dream Job" with gradient
                const parts = title.split(' ');
                const lastWord = parts.pop();
                return (
                  <>
                    {parts.join(' ')}{' '}
                    <span className="gradient-text">{lastWord}</span>
                  </>
                );
              })()}
            </h2>
          </div>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <div className="relative rounded-3xl p-[1px] shadow-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(62,207,142,0.22),rgba(255,255,255,0.06))]">
              <div
                data-testid="features-timeline-card"
                className={cn(
                  'relative overflow-hidden rounded-[1.45rem] bg-surface p-6 md:p-10',
                  '[background:var(--features-card-bg)] dark:[background:var(--features-card-bg-dark)]'
                )}
                style={cardBgStyle}
              >
                {/* Background */}
                <div className="pointer-events-none absolute inset-0 opacity-90">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(62,207,142,0.18),transparent_55%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(22,160,133,0.18),transparent_55%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:52px_52px] [-webkit-mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_70%)] [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_70%)]" />
                </div>

                <div className="relative grid gap-8 md:gap-10">
                  {featureKeys.map((featureKey, index) => {
                    const number = String(index + 1).padStart(2, '0');
                    const isFirst = index === 0;
                    const isLast = index === featureKeys.length - 1;
                    const Icon = featureIconMap[featureKey];
                    const featureTitle = t(`features.${featureKey}.title`);
                    const featureDescription = t(`features.${featureKey}.description`);

                    return (
                      <Reveal key={featureKey} delayMs={index * 70}>
                        <div className="grid items-start gap-4 md:grid-cols-[88px_96px_1fr] md:gap-6">
                          {/* Number */}
                          <div className="pt-1 text-4xl font-bold tabular-nums text-primary/90 md:text-5xl">
                            {number}
                          </div>

                          {/* Icon + Line */}
                          <div className="relative flex justify-center">
                            {!isFirst && (
                              <div
                                className={cn(
                                  'absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2',
                                  'bg-[linear-gradient(to_bottom,rgba(62,207,142,0.0),rgba(62,207,142,0.55),rgba(62,207,142,0.0))] bg-[size:100%_200%]',
                                  'animate-[timeline-flow_3.5s_linear_infinite]'
                                )}
                              />
                            )}
                            {!isLast && (
                              <div
                                className={cn(
                                  'absolute left-1/2 bottom-0 h-1/2 w-px -translate-x-1/2',
                                  'bg-[linear-gradient(to_bottom,rgba(62,207,142,0.0),rgba(62,207,142,0.55),rgba(62,207,142,0.0))] bg-[size:100%_200%]',
                                  'animate-[timeline-flow_3.5s_linear_infinite]'
                                )}
                              />
                            )}

                            <div className="relative z-10">
                              <div
                                className={cn(
                                  'relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]',
                                  'before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_55%)] before:opacity-80'
                                )}
                              >
                                <div className="absolute -inset-6 -z-10 rounded-full bg-primary/15 blur-2xl" />
                                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-white shadow-md animate-[float-soft_4.5s_ease-in-out_infinite]">
                                  <Icon className="h-6 w-6" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Text */}
                          <div className="pt-1">
                            <h3 className="text-lg font-semibold text-foreground md:text-xl">
                              <span className="text-primary">{featureTitle}</span>
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-foreground-secondary md:text-base">
                              {featureDescription}
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
