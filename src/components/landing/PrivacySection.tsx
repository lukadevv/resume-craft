'use client';

import { Shield, Lock, EyeOff, ServerOff, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const privacyPoints = [
  {
    icon: Lock,
    titleKey: 'privacy.dataLocal',
    descKey: 'privacy.dataLocalDesc',
  },
  {
    icon: EyeOff,
    titleKey: 'privacy.noTracking',
    descKey: 'privacy.noTrackingDesc',
  },
  {
    icon: ServerOff,
    titleKey: 'privacy.noServers',
    descKey: 'privacy.noServersDesc',
  },
  {
    icon: Shield,
    titleKey: 'privacy.youControl',
    descKey: 'privacy.youControlDesc',
  },
];

export function PrivacySection() {
  const t = useTranslations('landing');

  return (
    <section className="py-20 md:py-32 bg-surface/50">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm text-foreground-secondary">
              <Shield className="mr-2 h-4 w-4 text-primary" />
              {t('privacy.subtitle')}
            </div>
            <h2 className="text-3xl font-bold md:text-4xl mt-6">
              {(() => {
                const title = t('privacy.title');
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
            <p className="mt-4 text-lg text-foreground-secondary">
              {t('privacy.description')}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {privacyPoints.map((point, index) => (
            <Reveal key={point.titleKey} delayMs={index * 100}>
              <div
                className={cn(
                  'group relative rounded-2xl border border-border bg-background p-6',
                  'transition-all duration-300 hover:shadow-lg hover:border-primary/20'
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <point.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{t(point.titleKey)}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">{t(point.descKey)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={400}>
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-6 py-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                {t('privacy.verified')}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
