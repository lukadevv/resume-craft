'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getPageNumbers(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 0) return [];
  const pages: number[] = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const t = useTranslations('common');
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 mt-8',
        className
      )}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="px-3 py-1.5 text-sm rounded-md border border-border bg-background hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        {t('myResumes.pagination.previous')}
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'w-9 h-9 text-sm rounded-md border cursor-pointer transition-colors',
              page === currentPage
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background hover:bg-surface'
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="px-3 py-1.5 text-sm rounded-md border border-border bg-background hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        {t('myResumes.pagination.next')}
      </button>

      <span className="text-sm text-foreground-secondary ml-3">
        {t('myResumes.pagination.pageInfo', { current: currentPage, total: totalPages })}
      </span>
    </div>
  );
}
