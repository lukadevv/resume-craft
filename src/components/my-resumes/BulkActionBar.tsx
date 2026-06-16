'use client';

import { useState } from 'react';
import { Trash2, Download, ChevronDown, FileText, Code, FileJson, FileType, File } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export type BulkExportFormat = 'text' | 'html' | 'json' | 'docx';

interface BulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: (checked: boolean) => void;
  onDeleteSelected: () => void;
  onExport: (format: BulkExportFormat) => void;
  className?: string;
}

function useExportOptions() {
  const t = useTranslations('common');
  return [
    { value: 'text' as const, labelKey: 'Text', icon: <FileText className="h-4 w-4" /> },
    { value: 'html' as const, labelKey: 'HTML', icon: <Code className="h-4 w-4" /> },
    { value: 'json' as const, labelKey: 'JSON', icon: <FileJson className="h-4 w-4" /> },
    { value: 'docx' as const, labelKey: 'DOCX', icon: <FileType className="h-4 w-4" /> },
    {
      value: 'pdf' as const,
      labelKey: 'PDF',
      icon: <File className="h-4 w-4" />,
      disabled: true,
      tooltipKey: t('myResumes.bulk.pdfTooltip'),
    },
  ];
}

export function BulkActionBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeleteSelected,
  onExport,
  className,
}: BulkActionBarProps) {
  const t = useTranslations('common');
  const [exportOpen, setExportOpen] = useState(false);
  const exportOptions = useExportOptions();

  if (selectedCount === 0) {
    return null;
  }

  const allSelected = selectedCount === totalCount;

  return (
    <div
      className={cn(
        'flex items-center gap-4 p-3 rounded-md border border-border bg-surface',
        className
      )}
    >
      {/* Select all checkbox */}
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
          checked={allSelected}
          onChange={(e) => onSelectAll(e.target.checked)}
        />
        <span className="text-foreground-secondary">
          {t('myResumes.bulk.selectedCount', { count: selectedCount })}
        </span>
      </label>

      <div className="flex-1" />

      {/* Delete button */}
      <button
        onClick={onDeleteSelected}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-sm font-medium border border-destructive/30 text-destructive bg-background hover:bg-destructive/10 cursor-pointer transition-colors"
      >
        <Trash2 className="h-4 w-4" />
        {t('myResumes.bulk.delete')}
      </button>

      {/* Export dropdown */}
      <div className="relative">
        <button
          onClick={() => setExportOpen(!exportOpen)}
          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-sm font-medium border border-border bg-background hover:bg-surface cursor-pointer transition-colors"
        >
          <Download className="h-4 w-4" />
          {t('myResumes.bulk.export')}
          <ChevronDown className="h-3 w-3" />
        </button>

        {exportOpen && (
          <div className="absolute right-0 top-full mt-1 z-20 w-44 rounded-md border border-border bg-background shadow-lg">
            {exportOptions.map((option) =>
              option.disabled ? (
                <div
                  key={option.value}
                  className="group relative flex w-full"
                >
                  <button
                    disabled
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground-secondary/50 cursor-not-allowed"
                  >
                    {option.icon}
                    {option.labelKey}
                  </button>
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-30 hidden group-hover:block whitespace-nowrap rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground-secondary shadow-lg pointer-events-none">
                    {option.tooltipKey}
                  </div>
                </div>
              ) : (
                <button
                  key={option.value}
                  onClick={() => {
                    if (option.value !== 'pdf') onExport(option.value);
                    setExportOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-surface cursor-pointer"
                >
                  {option.icon}
                  {option.labelKey}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
