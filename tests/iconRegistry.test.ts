import { describe, it, expect } from 'vitest';
import {
  getAllIcons,
  getIconDefinition,
  getIconsByCategory,
  searchIcons,
  findIconKeyByLabel,
  getIconComponent,
} from '@/lib/icons';

describe('Icon Registry', () => {
  it('returns all icons from getAllIcons', () => {
    const icons = getAllIcons();
    expect(icons.length).toBeGreaterThan(0);
    expect(icons[0]).toHaveProperty('key');
    expect(icons[0]).toHaveProperty('category');
    expect(icons[0]).toHaveProperty('label');
    expect(icons[0]).toHaveProperty('Component');
    expect(icons[0]).toHaveProperty('searchTerms');
  });

  it('returns a specific icon definition by key', () => {
    const icon = getIconDefinition('javascript');
    expect(icon).toBeDefined();
    expect(icon?.label).toBe('JavaScript');
    expect(icon?.category).toBe('programming-language');
    expect(typeof icon?.Component).toBe('function');
  });

  it('returns undefined for unknown key', () => {
    expect(getIconDefinition('nonexistent')).toBeUndefined();
  });

  it('returns icons filtered by category', () => {
    const icons = getIconsByCategory('programming-language');
    expect(icons.length).toBeGreaterThan(0);
    icons.forEach((icon) => {
      expect(icon.category).toBe('programming-language');
    });
  });

  it('returns empty array for category with no icons', () => {
    const icons = getIconsByCategory('country-flag');
    expect(icons).toEqual([]);
  });

  it('searchIcons returns all icons when query is empty', () => {
    const all = getAllIcons();
    const result = searchIcons('');
    expect(result.length).toBe(all.length);
  });

  it('searchIcons filters by label', () => {
    const result = searchIcons('javascript');
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.some((i) => i.key === 'javascript')).toBe(true);
  });

  it('searchIcons filters by search terms', () => {
    const result = searchIcons('js');
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.some((i) => i.key === 'javascript')).toBe(true);
  });

  it('searchIcons filters by key', () => {
    const result = searchIcons('python');
    expect(result.length).toBe(1);
    expect(result[0].key).toBe('python');
  });

  it('searchIcons respects category filter', () => {
    const result = searchIcons('javascript', 'tool');
    expect(result.length).toBe(0);
    const inCategory = searchIcons('javascript', 'programming-language');
    expect(inCategory.length).toBeGreaterThanOrEqual(1);
    expect(inCategory.some((i) => i.key === 'javascript')).toBe(true);
  });

  it('findIconKeyByLabel maps exact label', () => {
    expect(findIconKeyByLabel('javascript')).toBe('javascript');
    expect(findIconKeyByLabel('JavaScript')).toBe('javascript');
  });

  it('findIconKeyByLabel maps search terms', () => {
    expect(findIconKeyByLabel('js')).toBe('javascript');
    expect(findIconKeyByLabel('ts')).toBe('typescript');
    expect(findIconKeyByLabel('golang')).toBe('go');
  });

  it('findIconKeyByLabel returns undefined for unknown', () => {
    expect(findIconKeyByLabel('cobol')).toBeUndefined();
    expect(findIconKeyByLabel('')).toBeUndefined();
  });

  it('getIconComponent returns a ReactNode', () => {
    const result = getIconComponent('javascript', 'h-4 w-4');
    expect(result).toBeTruthy();
  });

  it('getIconComponent returns null for unknown key', () => {
    const result = getIconComponent('nonexistent');
    expect(result).toBeNull();
  });
});
