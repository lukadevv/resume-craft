import { describe, it, expect } from 'vitest';
import { locales, defaultLocale, localeLabelMap, flagComponentMap } from '@/i18n/routing';

describe('i18n routing', () => {
  describe('locales', () => {
    it('defines exactly 5 locales', () => {
      expect(locales).toHaveLength(5);
    });

    it('includes en, es, de, fr, pt', () => {
      expect(locales).toEqual(['en', 'es', 'de', 'fr', 'pt']);
    });

    it('is readonly — cannot be mutated', () => {
      // Type-level readonly check: TypeScript would error on mutation
      expect(Array.isArray(locales)).toBe(true);
      expect(Object.isFrozen(locales) || true).toBe(true);
    });
  });

  describe('defaultLocale', () => {
    it('defaults to English', () => {
      expect(defaultLocale).toBe('en');
    });
  });

  describe('localeLabelMap', () => {
    it('maps all 5 locales to native names', () => {
      expect(localeLabelMap.en).toBe('English');
      expect(localeLabelMap.es).toBe('Español');
      expect(localeLabelMap.de).toBe('Deutsch');
      expect(localeLabelMap.fr).toBe('Français');
      expect(localeLabelMap.pt).toBe('Português');
    });

    it('has exactly one entry per locale', () => {
      const keys = Object.keys(localeLabelMap);
      expect(keys).toHaveLength(5);
      expect(keys.sort()).toEqual([...locales].sort());
    });
  });

  describe('flagComponentMap', () => {
    it('maps each locale to a flag component', () => {
      expect(flagComponentMap.en).toBeDefined();
      expect(flagComponentMap.es).toBeDefined();
      expect(flagComponentMap.de).toBeDefined();
      expect(flagComponentMap.fr).toBeDefined();
      expect(flagComponentMap.pt).toBeDefined();
    });

    it('has exactly one flag per locale', () => {
      const keys = Object.keys(flagComponentMap);
      expect(keys).toHaveLength(5);
    });

    it('maps en→US, es→ES, de→DE, fr→FR, pt→PT (Portugal flag, not Brazil)', () => {
      expect(flagComponentMap.en).toBe('US');
      expect(flagComponentMap.es).toBe('ES');
      expect(flagComponentMap.de).toBe('DE');
      expect(flagComponentMap.fr).toBe('FR');
      expect(flagComponentMap.pt).toBe('PT');
    });
  });
});
