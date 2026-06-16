import { describe, it, expect } from 'vitest';

// Mocks for next-intl are in tests/setup.ts — no additional mocking needed.

describe('i18n navigation', () => {
  describe('exports', () => {
    it('exports Link component', async () => {
      const mod = await import('@/i18n/navigation');
      expect(mod.Link).toBeDefined();
      expect(typeof mod.Link).toBe('function');
    });

    it('exports redirect function', async () => {
      const mod = await import('@/i18n/navigation');
      expect(typeof mod.redirect).toBe('function');
    });

    it('exports usePathname hook', async () => {
      const mod = await import('@/i18n/navigation');
      expect(typeof mod.usePathname).toBe('function');
    });

    it('exports useRouter hook', async () => {
      const mod = await import('@/i18n/navigation');
      expect(typeof mod.useRouter).toBe('function');
    });

    it('exports getPathname function', async () => {
      const mod = await import('@/i18n/navigation');
      expect(typeof mod.getPathname).toBe('function');
    });
  });
});
