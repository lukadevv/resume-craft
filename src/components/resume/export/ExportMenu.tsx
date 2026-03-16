'use client';

import { useState, useRef } from 'react';
import { Download, FileJson, FileText, FileCode, File } from 'lucide-react';
import { Resume } from '@/types/resume';
import {
  exportToText,
  exportToHTML,
  exportToJSON,
  exportToPDF,
  exportToDOCX,
  downloadFile,
} from '@/lib/export/resume-export';
import {
  ModernTemplate,
  ClassicTemplate,
  MinimalTemplate,
  CreativeTemplate,
  TechnicalTemplate,
  ProgrammingTemplate,
} from '@/components/resume/templates';

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
 * Get the template component based on resume template type
 */
function getTemplateComponent(template: string) {
  switch (template) {
    case 'modern':
      return ModernTemplate;
    case 'classic':
      return ClassicTemplate;
    case 'minimal':
      return MinimalTemplate;
    case 'creative':
      return CreativeTemplate;
    case 'technical':
      return TechnicalTemplate;
    case 'programming':
      return ProgrammingTemplate;
    default:
      return ModernTemplate;
  }
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
          downloadFile(exportToHTML(resume), `${filename}.html`, 'text/html');
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
        className="flex items-center gap-2 h-10 px-4 rounded-lg gradient-primary text-white font-medium transition-all hover:brightness-105"
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
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-surface disabled:opacity-50"
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
