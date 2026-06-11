import { Link } from 'next-view-transitions';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  message?: string;
  ctaLabel?: string;
  className?: string;
}

export function EmptyState({
  message = 'Create your first resume to get started',
  ctaLabel = 'Create Resume',
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('text-center py-20', className)}>
      <div className="mx-auto w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4">
        <FileText className="h-8 w-8 text-foreground-secondary" />
      </div>
      <h2 className="text-xl font-semibold">No resumes yet</h2>
      <p className="text-foreground-secondary mt-2 mb-6">{message}</p>
      <Link href="/create">
        <Button>{ctaLabel}</Button>
      </Link>
    </div>
  );
}
