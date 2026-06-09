'use client';

import { useState } from 'react';
import type { Resume } from '@/types/resume';
import { getTemplateComponent } from '@/components/resume/export/ExportMenu';
import { templateDefinitionMap } from '@/lib/templates';
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
  const TemplateComponent = getTemplateComponent(resume.template);
  const showEmptyState = !hasPersonalData(resume);
  const [mode, setMode] = useState<PreviewMode>('pdf');

  const definition = templateDefinitionMap[resume.template];
  const isDark = definition?.background?.gradient
    ? (() => {
        const hex = definition.background?.gradient?.match(/#([0-9a-fA-F]{6})/)?.[1];
        if (!hex) return false;
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return 0.299 * r + 0.587 * g + 0.114 * b < 128;
      })()
    : false;

  const headerBg = isDark
    ? 'bg-gray-900/90 backdrop-blur-sm border-b border-gray-700/60'
    : 'bg-gray-100/80 backdrop-blur-sm border-b border-gray-200/60';

  return (
    <div className="sticky top-0 h-full flex flex-col" data-testid="step-preview">
      {/* Header with tabs */}
      <div className={`shrink-0 ${headerBg}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Live Preview
          </h3>
          <div className={`flex items-center gap-1 rounded-lg p-0.5 ${isDark ? 'bg-gray-800' : 'bg-black/10'}`}>
            <button
              type="button"
              onClick={() => setMode('pdf')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'pdf'
                  ? isDark ? 'bg-gray-700 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm'
                  : isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <FileDown className="h-3.5 w-3.5" />
              PDF
            </button>
            <button
              type="button"
              onClick={() => setMode('html')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'html'
                  ? isDark ? 'bg-gray-700 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm'
                  : isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              HTML
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
                Start filling in your details to see a live preview of your resume here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
