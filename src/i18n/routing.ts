import type { ComponentType } from 'react';

/*
 * Locale definition and routing constants.
 * These are used by the next-intl plugin and the navigation utilities.
 */

export const locales = ['en', 'es', 'de', 'fr', 'pt'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/**
 * Native language names for display in the language switcher.
 * Keys are Locale values; values are the language name in its own script.
 */
export const localeLabelMap: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  pt: 'Português',
};

/**
 * Map of locale to its country-flag component.
 * Components are imported lazily in the LocaleSwitcher.
 */
export type FlagComponent = ComponentType<{ className?: string }>;

export const flagComponentMap: Record<Locale, string> = {
  en: 'US',
  es: 'ES',
  de: 'DE',
  fr: 'FR',
  pt: 'PT',
};
