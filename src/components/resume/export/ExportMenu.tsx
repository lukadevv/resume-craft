'use client';

import { useState, useRef } from 'react';
import { Download, FileJson, FileText, FileCode, File } from 'lucide-react';
import { Resume, TemplateType } from '@/types/resume';
import {
  exportToText,
  exportToJSON,
  exportToPDF,
  exportToDOCX,
  exportToHTMLWithImage,
  downloadFile,
} from '@/lib/export/resume-export';
import {
  TechnicalTemplate,
  SoftwareDeveloperTemplate,
  TwoColumnShell,
  SplitShell,
  SingleColumnShell,
  TimelineShell,
  ModernTemplate,
} from '@/components/resume/templates';
import { templateDefinitionMap, type LayoutType } from '@/lib/templates';

interface ExportMenuProps {
  resume: Resume;
}

type ExportFormat = 'pdf' | 'docx' | 'json' | 'html' | 'text';

const formats: { id: ExportFormat; label: string; icon: React.ElementType }[] = [
  { id: 'pdf', label: 'PDF', icon: Download },
  { id: 'docx', label: 'Word', icon: File },
  { id: 'html', label: 'HTML', icon: FileCode },
  { id: 'json', label: 'JSON', icon: FileJson },
  { id: 'text', label: 'Plain Text', icon: FileText },
];

/**
 * Direct mapping for templates with dedicated standalone components.
 * Only templates with their own full React component (not a shell).
 */
const directComponentMap: Partial<Record<TemplateType, React.ComponentType<{ resume: Resume }>>> = {
  technical: TechnicalTemplate,
  softwareDeveloper: SoftwareDeveloperTemplate,
};

/**
 * Layout-to-shell component map. Each layoutType resolves to its shell component.
 */
const shellComponentMap: Record<LayoutType, React.ComponentType<{ resume: Resume }>> = {
  'two-column': TwoColumnShell,
  'split': SplitShell,
  'single-column': SingleColumnShell,
  'timeline': TimelineShell,
};

/**
 * Get the template component based on resume template type.
 * Resolution is three-tier:
 * 1. Direct component match (2 standalone templates: technical, softwareDeveloper).
 * 2. Shell routing via templateDefinitionMap layoutType → layout-specific shell.
 * 3. Final fallback: ModernTemplate with a console warning.
 */
export function getTemplateComponent(template: TemplateType): React.ComponentType<{ resume: Resume }> {
  // Tier 1: Direct component match (standalone templates)
  const direct = directComponentMap[template];
  if (direct) {
    return direct;
  }

  // Tier 2: Shell routing via layoutType
  const definition = templateDefinitionMap[template];
  if (definition) {
    const shell = shellComponentMap[definition.layoutType];
    if (shell) {
      return shell;
    }
  }

  // Tier 3: Safe default
  // eslint-disable-next-line no-console
  console.warn(`[ExportMenu] Unknown template "${template}". Falling back to ModernTemplate.`);
  return ModernTemplate;
}

export function ExportMenu({ resume }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(true);
    const filename = `${resume.personalInfo.firstName || 'resume'}_${resume.personalInfo.lastName || 'resume'}`;

    try {
      switch (format) {
        case 'text':
          downloadFile(exportToText(resume), `${filename}.txt`, 'text/plain');
          break;

        case 'html':
          if (resumeRef.current) {
            await exportToHTMLWithImage(resumeRef.current, resume, filename);
          }
          break;

        case 'json':
          downloadFile(exportToJSON(resume), `${filename}.json`, 'application/json');
          break;

        case 'docx':
          exportToDOCX(resume);
          break;

        case 'pdf':
          if (resumeRef.current) {
            await exportToPDF(resumeRef.current, filename);
          }
          break;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const TemplateComponent = getTemplateComponent(resume.template);

  return (
    <div className="relative">
      {/* Hidden Resume Template for PDF Export */}
      <div className="absolute left-[-9999px] top-0 w-[210mm]">
        <div ref={resumeRef} className="bg-white">
          <TemplateComponent resume={resume} />
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-10 px-4 rounded-lg gradient-primary text-white font-medium transition-all hover:brightness-105 cursor-pointer"
      >
        <Download className="h-4 w-4" />
        Export
      </button>

      {/* Export Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-border bg-background shadow-lg">
          <div className="p-1">
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => handleExport(format.id)}
                disabled={isExporting}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-surface disabled:opacity-50 cursor-pointer"
              >
                <format.icon className="h-4 w-4" />
                {format.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
