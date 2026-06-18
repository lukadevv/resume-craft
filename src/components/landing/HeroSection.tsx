'use client';

import React from 'react';
import { Link } from '@/components/ui/Link';
import { ArrowRight, CheckCircle2, Sparkles, FileText, Download, Lock, Palette, Layout } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/Reveal';
import { TypewriterRotatingText } from '@/components/ui/TypewriterRotatingText';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import { useInView } from '@/lib/useInView';

const statsConfig = [
  { icon: Layout, value: 25, suffix: '+', labelKey: 'hero.stats.templates' },
  { icon: FileText, value: 5, suffix: '', labelKey: 'hero.stats.formats' },
  { icon: Lock, value: 100, suffix: '%', labelKey: 'hero.stats.privacy' },
  { icon: Download, value: 50, suffix: 'K+', labelKey: 'hero.stats.created' },
];

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  reducedMotion?: boolean;
}

function FloatingElement({ children, className, delay = 0, duration = 4, reducedMotion = false }: FloatingElementProps) {
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={className}
      style={{
        animation: `float-soft ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  start: boolean;
  durationMs?: number;
}

function AnimatedCounter({ value, suffix, start, durationMs = 2000 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const reducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (!start || reducedMotion) {
      setDisplayValue(reducedMotion ? value : 0);
      return;
    }

    const startTime = performance.now();
    const from = 0;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(from + (value - from) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value, start, durationMs, reducedMotion]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export function HeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const t = useTranslations('landing');

  const rotatingWords = [
    t('hero.rotatingWords.0'),
    t('hero.rotatingWords.1'),
    t('hero.rotatingWords.2'),
  ];

  // Shrink typewriter font when translations are longer than English (max 18 chars)
  const hasLongWords = rotatingWords.some((w) => w.length > 18);

  const heroFeatures = [
    t('features.templates.title'),
    t('features.export.title'),
    t('features.pwa.title'),
    t('features.privacy.title'),
    t('features.customization.title'),
  ];

  return (
    <section className="relative overflow-hidden pt-20 pb-14 md:pt-24 md:pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[rgba(62,207,142,0.15)] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [-webkit-mask-image:radial-gradient(circle_at_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_70%)] [mask-image:radial-gradient(circle_at_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center pt-12 md:pt-20 *:min-w-0">
          {/* Left Content */}
          <Reveal className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-foreground-secondary">{t('hero.subtitle')}</span>
            </div>

            <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
              {t('hero.title')}{' '}
              <TypewriterRotatingText words={rotatingWords} className={cn('gradient-text pb-1', hasLongWords && 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl')} />
            </h1>

            <p className="mt-6 text-lg text-foreground-secondary md:text-xl">
              {t('hero.description')}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/create">
                <Button size="lg" className="gap-2 text-base">
                  {t('hero.cta')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#templates">
                <Button variant="outline" size="lg" className="text-base">
                  {t('hero.templatesLink')}
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-6">
              {heroFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-foreground-secondary">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <span>
                {t('hero.privacyNote')}
              </span>
            </div>
          </Reveal>

          {/* Right Content - Animated Preview */}
          <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none" delayMs={120}>
            {/* Animated Background Glow */}
            <div
              className="absolute -left-8 -top-8 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
              style={!reducedMotion ? { animation: 'template-glow 8s ease-in-out infinite' } : undefined}
            />
            <div
              className="absolute -bottom-8 -right-8 h-80 w-80 rounded-full bg-accent-start/20 blur-3xl"
              style={!reducedMotion ? { animation: 'template-glow 8s ease-in-out infinite 2s' } : undefined}
            />

            {/* Floating Template Mini-Cards */}
            <FloatingElement
              className="absolute -left-6 top-1/4 hidden lg:block z-10"
              delay={0.5}
              duration={3}
              reducedMotion={reducedMotion}
            >
              <div className="rounded-lg border border-border bg-background/90 backdrop-blur-sm p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-gradient-to-br from-[#3ECF8E] to-[#16a085] flex items-center justify-center">
                    <Layout className="h-4 w-4 text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 w-16 rounded bg-surface" />
                    <div className="h-1.5 w-10 rounded bg-surface" />
                  </div>
                </div>
              </div>
            </FloatingElement>

            <FloatingElement
              className="absolute -right-4 top-1/3 hidden lg:block z-10"
              delay={1}
              duration={3.5}
              reducedMotion={reducedMotion}
            >
              <div className="rounded-lg border border-border bg-background/90 backdrop-blur-sm p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-gradient-to-br from-[#a855f7] to-[#6366f1] flex items-center justify-center">
                    <Palette className="h-4 w-4 text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 w-16 rounded bg-surface" />
                    <div className="h-1.5 w-10 rounded bg-surface" />
                  </div>
                </div>
              </div>
            </FloatingElement>

            {/* Main Resume Card */}
            <FloatingElement
              className="relative z-0"
              duration={4}
              reducedMotion={reducedMotion}
            >
              <div className="relative rounded-xl border border-border bg-background p-6 shadow-xl">
                {/* Resume Header */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent-start flex items-center justify-center text-white font-bold text-xl">
                    LM
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">Lucas Witzhell</div>
                    <div className="text-sm text-foreground-secondary">Senior Product Designer</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-foreground-secondary">
                  <span>lucas@email.com</span>
                  <span>•</span>
                  <span>San Francisco, CA</span>
                  <span>•</span>
                  <span>linkedin.com/in/lucaswitzhell</span>
                </div>

                {/* Summary */}
                <div className="mt-4">
                  <div className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">Summary</div>
                  <p className="text-xs text-foreground-secondary leading-relaxed">
                    Creative product designer with 8+ years of experience building user-centered digital products.
                    Passionate about creating intuitive interfaces that solve real problems.
                  </p>
                </div>

                {/* Skills */}
                <div className="mt-4">
                  <div className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['UX Design', 'Figma', 'React', 'TypeScript', 'Node.js', 'User Research'].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mt-4">
                  <div className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Experience</div>
                  <div className="space-y-2.5">
                    <div className="border-l-2 border-primary/30 pl-3">
                      <div className="flex justify-between items-start">
                        <div className="text-xs font-medium text-foreground">Senior Product Designer</div>
                        <div className="text-xs text-foreground-secondary">2020 - Present</div>
                      </div>
                      <div className="text-xs text-foreground-secondary mt-0.5">TechCorp Inc.</div>
                    </div>
                    <div className="border-l-2 border-primary/30 pl-3">
                      <div className="flex justify-between items-start">
                        <div className="text-xs font-medium text-foreground">UX Designer</div>
                        <div className="text-xs text-foreground-secondary">2017 - 2020</div>
                      </div>
                      <div className="text-xs text-foreground-secondary mt-0.5">DesignStudio</div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge - PDF Ready */}
                <FloatingElement
                  className="absolute -right-4 top-8 z-10 hidden sm:block"
                  delay={1}
                  duration={3}
                  reducedMotion={reducedMotion}
                >
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{t('hero.badgePdfReady')}</span>
                  </div>
                </FloatingElement>

                {/* Floating Badge - One Click Export */}
                <FloatingElement
                  className="absolute -left-4 bottom-8 z-10 hidden sm:block"
                  delay={1.5}
                  duration={3.5}
                  reducedMotion={reducedMotion}
                >
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
                    <Download className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{t('hero.badgeOneClickExport')}</span>
                  </div>
                </FloatingElement>
              </div>
            </FloatingElement>
          </Reveal>
        </div>
        {/* Stats Section */}
        <div className="mt-16 md:mt-44">
          <StatsSection />
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const reducedMotion = usePrefersReducedMotion();
  const t = useTranslations('landing');

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-surface/80 to-surface/40 backdrop-blur-sm p-8 md:p-12"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-40 w-40 rounded-full bg-accent-start/10 blur-3xl" />
      </div>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.labelKey}
              className={cn(
                'group relative flex flex-col items-center text-center',
                'transition-all duration-700 ease-out',
                inView || reducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{
                transitionDelay: reducedMotion ? '0ms' : `${index * 150}ms`,
              }}
            >
              {/* Icon */}
              <div className="relative mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent-start/20 border border-primary/10 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                {/* Pulse ring on hover */}
                <div className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-ping" />
              </div>

              {/* Value */}
              <div className="text-3xl font-bold tracking-tight md:text-4xl">
                <span className="gradient-text">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    start={inView}
                    durationMs={2000 + index * 300}
                  />
                </span>
              </div>

              {/* Label */}
              <div className="mt-2 text-sm font-medium text-foreground-secondary">
                {t(stat.labelKey)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
