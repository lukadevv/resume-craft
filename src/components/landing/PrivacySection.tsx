'use client';

import { Shield, Lock, EyeOff, ServerOff, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const privacyPoints = [
  {
    icon: Lock,
    title: 'Data Stays Local',
    description:
      'All resume data is processed and stored entirely in your browser using localStorage.',
  },
  {
    icon: EyeOff,
    title: 'No Tracking',
    description:
      "We don't use analytics, cookies, or any tracking scripts. Your privacy is absolute.",
  },
  {
    icon: ServerOff,
    title: 'No Servers',
    description: "There's no backend database. Your personal information never leaves your device.",
  },
  {
    icon: Shield,
    title: 'You Control Your Data',
    description: 'Your resumes are yours. Delete them anytime — they exist only on your device.',
  },
];

export function PrivacySection() {
  return (
    <section className="py-20 md:py-32 bg-surface/50">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm text-foreground-secondary">
              <Shield className="mr-2 h-4 w-4 text-primary" />
              Privacy Guarantee
            </div>
            <h2 className="text-3xl font-bold md:text-4xl mt-6">
              Your Data Never Leaves Your <span className="gradient-text">Browser</span>
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary">
              We built Resume Craft with privacy as a core principle. Your personal information
              stays on your device — period.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {privacyPoints.map((point, index) => (
            <Reveal key={point.title} delayMs={index * 100}>
              <div
                className={cn(
                  'group relative rounded-2xl border border-border bg-background p-6',
                  'transition-all duration-300 hover:shadow-lg hover:border-primary/20'
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <point.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">{point.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={400}>
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-6 py-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                Verified: No data leaves your device. No exceptions.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
