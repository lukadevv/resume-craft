import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ModernTemplate,
  ClassicTemplate,
  MinimalTemplate,
  CreativeTemplate,
  TechnicalTemplate,
  SoftwareDeveloperTemplate,
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

  describe('direct component mappings', () => {
    it('resolves modern to ModernTemplate', () => {
      expect(getTemplateComponent('modern')).toBe(ModernTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves classic to ClassicTemplate', () => {
      expect(getTemplateComponent('classic')).toBe(ClassicTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves minimal to MinimalTemplate', () => {
      expect(getTemplateComponent('minimal')).toBe(MinimalTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves creative to CreativeTemplate', () => {
      expect(getTemplateComponent('creative')).toBe(CreativeTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves technical to TechnicalTemplate', () => {
      expect(getTemplateComponent('technical')).toBe(TechnicalTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves softwareDeveloper to SoftwareDeveloperTemplate', () => {
      expect(getTemplateComponent('softwareDeveloper')).toBe(SoftwareDeveloperTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('layoutType fallback — two-column → ModernTemplate', () => {
    const twoColumnTemplates = [
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

    it.each(twoColumnTemplates)('resolves %s to ModernTemplate', (template) => {
      expect(getTemplateComponent(template as TemplateType)).toBe(ModernTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('layoutType fallback — single-column → MinimalTemplate', () => {
    it('resolves academic to MinimalTemplate', () => {
      expect(getTemplateComponent('academic')).toBe(MinimalTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves federal to MinimalTemplate', () => {
      expect(getTemplateComponent('federal')).toBe(MinimalTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('layoutType fallback — split → CreativeTemplate', () => {
    it('resolves graphicDesigner to CreativeTemplate', () => {
      expect(getTemplateComponent('graphicDesigner')).toBe(CreativeTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves sales to CreativeTemplate', () => {
      expect(getTemplateComponent('sales')).toBe(CreativeTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('resolves executive to CreativeTemplate', () => {
      expect(getTemplateComponent('executive')).toBe(CreativeTemplate);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('layoutType fallback — timeline → ClassicTemplate', () => {
    it('resolves projectManager to ClassicTemplate', () => {
      expect(getTemplateComponent('projectManager')).toBe(ClassicTemplate);
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
  });
});
