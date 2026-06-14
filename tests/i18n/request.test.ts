import { describe, it, expect } from 'vitest';

// Mocks for next-intl/server are in tests/setup.ts

describe('i18n request', () => {
  it('getRequestConfig is importable without server dependencies', async () => {
    const mod = await import('@/i18n/request');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('getRequestConfig can be called with a locale', async () => {
    const { default: getRequestConfig } = await import('@/i18n/request');

    // The mock wraps the function we passed to getRequestConfig
    const result = await getRequestConfig({ requestLocale: 'en' });

    expect(result).toBeDefined();
    expect(result.locale).toBeDefined();
    expect(result.messages).toBeDefined();
    expect(typeof result.messages).toBe('object');
  });

  it('falls back to default locale for invalid input', async () => {
    const { default: getRequestConfig } = await import('@/i18n/request');

    const result = await getRequestConfig({ requestLocale: 'it' });
    expect(result.locale).toBe('en');
  });

  it('handles nullish requestLocale by falling back to en', async () => {
    const { default: getRequestConfig } = await import('@/i18n/request');

    const result = await getRequestConfig({ requestLocale: undefined as unknown as string });
    expect(result.locale).toBe('en');
  });

  it('requires requestLocale parameter', async () => {
    const { default: getRequestConfig } = await import('@/i18n/request');

    // Should not throw when called with valid params
    await expect(
      getRequestConfig({ requestLocale: 'de' })
    ).resolves.toBeDefined();
  });
});
