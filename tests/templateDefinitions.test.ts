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

  it('programming template defines balanced structure', () => {
    const programmingTemplate = templateDefinitions.find((template) => template.id === 'programming');
    expect(programmingTemplate).toBeDefined();
    expect(programmingTemplate?.layoutType).toBe('split');
    expect(programmingTemplate?.emphasisComponents).toEqual(
      expect.arrayContaining(['languageArc', 'skillDots', 'contactBadges', 'educationTimeline'])
    );
    expect(programmingTemplate?.background?.imageUrl).toBeDefined();
  });
});
