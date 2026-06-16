'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Resume } from '@/types/resume';
import { getTemplateComponent } from '@/components/resume/export/ExportMenu';
import { FileDown, Monitor } from 'lucide-react';

type PreviewMode = 'pdf' | 'html';

interface StepPreviewProps {
  resume: Resume;
}

function hasPersonalData(resume: Resume): boolean {
  const { personalInfo } = resume;
  return !!(
    personalInfo.firstName ||
    personalInfo.lastName ||
    personalInfo.email
  );
}

export function StepPreview({ resume }: StepPreviewProps) {
  const t = useTranslations('resume-form');
  const TemplateComponent = getTemplateComponent(resume.template);
  const showEmptyState = !hasPersonalData(resume);
  const [mode, setMode] = useState<PreviewMode>('pdf');

  return (
    <div className="sticky top-0 h-full flex flex-col" data-testid="step-preview">
      {/* Header with tabs — uses site theme, not template theme */}
      <div className="shrink-0 bg-surface/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 max-xl:mt-4">
          <h3 className="text-sm font-semibold text-foreground">
            {t('preview.livePreview')}
          </h3>
          <div className="flex items-center gap-1 rounded-lg p-0.5 bg-black/5 dark:bg-white/10">
            <button
              type="button"
              onClick={() => setMode('pdf')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'pdf'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              <FileDown className="h-3.5 w-3.5" />
              {t('export.pdf')}
            </button>
            <button
              type="button"
              onClick={() => setMode('html')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'html'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              {t('export.html')}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        {!showEmptyState ? (
          mode === 'pdf' ? (
            <div className="overflow-x-auto py-8 px-4">
              <div className="mx-auto" style={{ width: 794 }}>
                <div className="bg-white shadow-xl" style={{ minHeight: 1123 }}>
                  <TemplateComponent resume={resume} />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6 px-4 w-full @container">
              <TemplateComponent resume={resume} />
            </div>
          )
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="border-2 border-dashed border-border flex items-center justify-center bg-surface/30 w-full mx-4" style={{ height: 500 }}>
              <p className="text-sm text-foreground-secondary/60 italic text-center px-4">
                {t('preview.emptyState')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
