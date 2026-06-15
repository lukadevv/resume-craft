'use client';

import { useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/textarea';

interface SummaryFormProps {
  data: string;
  onUpdate: (data: string) => void;
}

export function SummaryForm({ data, onUpdate }: SummaryFormProps) {
  const t = useTranslations('resume-form');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('steps.summary')}</h2>
        <p className="text-foreground-secondary">
          {t('stepDescriptions.summary')}
        </p>
      </div>

      <Textarea
        value={data}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder={t('placeholders.summary')}
        className="min-h-[200px]"
      />

      <div className="rounded-lg bg-surface p-4">
        <h3 className="font-medium mb-2">{t('tips.summaryTitle')}</h3>
        <ul className="text-sm text-foreground-secondary space-y-1">
          <li>• {t('tips.summaryItem1')}</li>
          <li>• {t('tips.summaryItem2')}</li>
          <li>• {t('tips.summaryItem3')}</li>
          <li>• {t('tips.summaryItem4')}</li>
        </ul>
      </div>
    </div>
  );
}
