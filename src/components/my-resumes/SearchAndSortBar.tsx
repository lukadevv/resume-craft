'use client';

import { Search, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export type SortField = 'name' | 'updatedAt' | 'template';

interface SearchAndSortBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortField;
  onSortChange: (field: SortField) => void;
  className?: string;
}

const SORT_FIELDS: SortField[] = ['updatedAt', 'name', 'template'];

export function SearchAndSortBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  className,
}: SearchAndSortBarProps) {
  const t = useTranslations('common');

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between',
        className
      )}
    >
      {/* Search input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
        <input
          type="text"
          placeholder={t('myResumes.search.placeholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-md border border-border bg-background text-sm placeholder:text-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Sort dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-foreground-secondary whitespace-nowrap">
          {t('myResumes.search.sortBy')}
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortField)}
            className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
            role="combobox"
          >
            {SORT_FIELDS.map((field) => (
              <option key={field} value={field}>
                {t(`myResumes.search.sortOptions.${field}`)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
        </div>
      </div>
    </div>
  );
}
