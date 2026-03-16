'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/Reveal';
import { TypewriterRotatingText } from '@/components/ui/TypewriterRotatingText';
import { CountUp } from '@/components/ui/CountUp';
import { useInView } from '@/lib/useInView';

const heroFeatures = [
  '5 Professional Templates',
  'PDF, DOCX Export',
  'Real-time Preview',
  'No Account Required',
];

const rotatingWords = [
  'Resumes in Minutes',
  'ATS-Ready Resumes',
  'Beautiful Resumes',
];

function formatResumesCreated(n: number) {
  if (n < 1000) return `${n}`;
  const k = Math.floor(n / 1000);
  return `${k}K${n >= 50000 ? '+' : ''}`;
}

function formatCountries(n: number) {
  return `${n}${n >= 100 ? '+' : ''}`;
}

export function HeroSection() {
  const { ref: statsStartRef, inView: statsStart } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[rgba(62,207,142,0.15)] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [-webkit-mask-image:radial-gradient(circle_at_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_70%)] [mask-image:radial-gradient(circle_at_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <Reveal className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-foreground-secondary">Build your career with confidence</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Create Professional{' '}
              <TypewriterRotatingText words={rotatingWords} className="gradient-text" />
            </h1>

            <p className="mt-6 text-lg text-foreground-secondary md:text-xl">
              Stand out from the crowd with beautifully designed resumes. Choose from 5 professional
              templates, customize every detail, and export to PDF, DOCX, and more.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/create">
                <Button size="lg" className="gap-2 text-base">
                  Create Resume Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#templates">
                <Button variant="outline" size="lg" className="text-base">
                  View Templates
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              {heroFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right Content - Preview Card */}
          <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none" delayMs={120}>
            {/* Decorative Elements */}
            <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-accent-start/20 blur-3xl" />

            {/* Resume Preview Card */}
            <div className="relative rounded-xl border border-border bg-background p-6 shadow-xl">
              {/* Mock Resume Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent-start" />
                  <div className="space-y-1">
                    <div className="h-4 w-32 rounded bg-surface" />
                    <div className="h-3 w-24 rounded bg-surface" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-surface" />
                  <div className="h-2 w-4/5 rounded bg-surface" />
                  <div className="h-2 w-3/5 rounded bg-surface" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="h-3 w-16 rounded bg-surface" />
                    <div className="h-2 w-full rounded bg-surface" />
                    <div className="h-2 w-4/5 rounded bg-surface" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 w-16 rounded bg-surface" />
                    <div className="h-2 w-full rounded bg-surface" />
                    <div className="h-2 w-3/5 rounded bg-surface" />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -right-4 top-8 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">PDF Ready</span>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -left-4 bottom-8 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
                <Download className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">One Click Export</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal delayMs={180}>
          <div
            ref={statsStartRef}
            className="mt-20 grid grid-cols-2 gap-8 rounded-2xl border border-border bg-surface/50 p-8 md:grid-cols-4"
          >
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text md:text-4xl">
                <CountUp to={50000} start={statsStart} format={formatResumesCreated} />
              </div>
              <div className="mt-1 text-sm text-foreground-secondary">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text md:text-4xl">
                <CountUp to={4.9} start={statsStart} decimals={1} />
                /5
              </div>
              <div className="mt-1 text-sm text-foreground-secondary">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text md:text-4xl">
                <CountUp to={100} start={statsStart} format={formatCountries} />
              </div>
              <div className="mt-1 text-sm text-foreground-secondary">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text md:text-4xl">
                <CountUp to={0} start={statsStart} format={(n) => `$${n}`} />
              </div>
              <div className="mt-1 text-sm text-foreground-secondary">To Get Started</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
