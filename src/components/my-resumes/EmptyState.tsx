'use client';

import { Link } from 'next-view-transitions';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useLocalizedHref } from '@/lib/locale-utils';

interface EmptyStateProps {
  message?: string;
  ctaLabel?: string;
  className?: string;
}

export function EmptyState({
  message,
  ctaLabel,
  className,
}: EmptyStateProps) {
  const t = useTranslations('common');
  const lh = useLocalizedHref();

  return (
    <div className={cn('text-center py-20', className)}>
      <div className="mx-auto w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4">
        <FileText className="h-8 w-8 text-foreground-secondary" />
      </div>
      <h2 className="text-xl font-semibold">{t('myResumes.emptyState.title')}</h2>
      <p className="text-foreground-secondary mt-2 mb-6">
        {message || t('myResumes.emptyState.defaultMessage')}
      </p>
      <Link href={lh('/create')}>
        <Button>{ctaLabel || t('myResumes.emptyState.defaultCtaLabel')}</Button>
      </Link>
    </div>
  );
}
