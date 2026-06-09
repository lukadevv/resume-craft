import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  TechnicalTemplate,
  SoftwareDeveloperTemplate,
  TwoColumnShell,
  SplitShell,
  SingleColumnShell,
  TimelineShell,
  ModernTemplate,
} from '@/components/resume/templates';
import { getTemplateComponent } from '@/components/resume/export/ExportMenu';
import { templateDefinitionMap } from '@/lib/templates';
import { TemplateType } from '@/types/resume';

// Mock resume-export to avoid loading heavy dependencies
vi.mock('@/lib/export/resume-export', () => ({
  exportToText: vi.fn(),
  exportToHTML: vi.fn(),
  exportToJSON: vi.fn(),
  exportToPDF: vi.fn(),
  exportToDOCX: vi.fn(),
  downloadFile: vi.fn(),
}));

describe('getTemplateComponent', () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  describe('direct component matches — standalone templates', () => {
    it('resolves technical to TechnicalTemplate (bypasses shell)', () => {
      expect(getTemplateComponent('technical')).toBe(TechnicalTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves softwareDeveloper to SoftwareDeveloperTemplate (bypasses shell)', () => {
      expect(getTemplateComponent('softwareDeveloper')).toBe(SoftwareDeveloperTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('layoutType routing — two-column → TwoColumnShell', () => {
    const twoColumnTemplates: TemplateType[] = [
      'modern',
      'dataScientist',
      'uxDesigner',
      'productManager',
      'marketing',
      'accountant',
      'nurse',
      'teacher',
      'lawyer',
      'engineer',
      'hr',
      'consultant',
      'itSupport',
      'military',
    ];

    it.each(twoColumnTemplates)('resolves %s to TwoColumnShell', (template) => {
      expect(getTemplateComponent(template)).toBe(TwoColumnShell);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('layoutType routing — split → SplitShell', () => {
    const splitTemplates: TemplateType[] = [
      'creative',
      'graphicDesigner',
      'sales',
      'executive',
    ];

    it.each(splitTemplates)('resolves %s to SplitShell', (template) => {
      expect(getTemplateComponent(template)).toBe(SplitShell);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('layoutType routing — single-column → SingleColumnShell', () => {
    it('resolves minimal to SingleColumnShell', () => {
      expect(getTemplateComponent('minimal')).toBe(SingleColumnShell);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves academic to SingleColumnShell', () => {
      expect(getTemplateComponent('academic')).toBe(SingleColumnShell);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves federal to SingleColumnShell', () => {
      expect(getTemplateComponent('federal')).toBe(SingleColumnShell);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('layoutType routing — timeline → TimelineShell', () => {
    it('resolves classic to TimelineShell', () => {
      expect(getTemplateComponent('classic')).toBe(TimelineShell);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves projectManager to TimelineShell', () => {
      expect(getTemplateComponent('projectManager')).toBe(TimelineShell);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('returns ModernTemplate and warns for unknown template IDs', () => {
      expect(getTemplateComponent('bogus' as TemplateType)).toBe(ModernTemplate);
      expect(consoleWarnSpy).toHaveBeenCalledOnce();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('bogus'),
      );
    });

    it('resolves all 25 defined templates to a non-null component', () => {
      const allTemplateIds = Object.keys(templateDefinitionMap);
      expect(allTemplateIds).toHaveLength(25);

      for (const templateId of allTemplateIds) {
        const Component = getTemplateComponent(templateId as TemplateType);
        expect(Component).toBeDefined();
        expect(Component).not.toBeNull();
      }
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('all shell-routed templates return one of the 4 shells', () => {
      const shellComponents = [TwoColumnShell, SplitShell, SingleColumnShell, TimelineShell];
      const allTemplateIds = Object.keys(templateDefinitionMap) as TemplateType[];

      for (const templateId of allTemplateIds) {
        const Component = getTemplateComponent(templateId);
        if (templateId === 'technical' || templateId === 'softwareDeveloper') {
          // Standalone, bypasses shells
          expect([TechnicalTemplate, SoftwareDeveloperTemplate]).toContain(Component);
        } else {
          expect(shellComponents).toContain(Component);
        }
      }
    });
  });
});
