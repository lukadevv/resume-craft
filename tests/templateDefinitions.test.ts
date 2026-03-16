import { describe, expect, it } from 'vitest';
import { templateDefinitions } from '@/lib/templates';

describe('template metadata', () => {
  it('exports unique template definitions', () => {
    const ids = templateDefinitions.map((template) => template.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('defines theme-aware landing presentation overlays', () => {
    for (const template of templateDefinitions) {
      expect(template.landingPresentation).toBeDefined();
      expect(template.landingPresentation?.cardBackground.light).toContain('linear-gradient');
      expect(template.landingPresentation?.cardBackground.dark).toContain('linear-gradient');
      expect(template.landingPresentation?.hoverOverlay.light).toContain('linear-gradient');
      expect(template.landingPresentation?.hoverOverlay.dark).toContain('linear-gradient');
    }
  });

  it('softwareDeveloper template defines balanced structure', () => {
    const template = templateDefinitions.find((t) => t.id === 'softwareDeveloper');
    expect(template).toBeDefined();
    expect(template?.layoutType).toBe('split');
    expect(template?.emphasisComponents).toEqual(
      expect.arrayContaining(['skillDots', 'skillBars', 'contactBadges', 'backgroundAccent'])
    );
    expect(template?.primarySections).toContain('projects');
    expect(template?.sidebarSections).toContain('tools');
  });

  it('has 20 template definitions', () => {
    expect(templateDefinitions).toHaveLength(20);
  });

  it('all template IDs are unique', () => {
    const ids = templateDefinitions.map((t) => t.id);
    expect(new Set(ids).size).toBe(20);
  });
});
