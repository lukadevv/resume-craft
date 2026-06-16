'use client';

import { usePathname } from 'next/navigation';
import { locales } from '@/i18n/routing';

/**
 * Extract the current locale from a pathname string.
 * Returns 'en' if no locale prefix is found.
 */
export function getCurrentLocale(path: string): string {
  const first = path.split('/')[1];
  if (first && first !== 'en' && (locales as readonly string[]).includes(first)) {
    return first;
  }
  return 'en';
}

/**
 * Prepend a locale prefix to an internal href.
 * English paths stay clean (no prefix). Non-English get /{locale}{href}.
 */
export function localizeHref(href: string, locale: string): string {
  if (locale === 'en') return href;
  return href === '/' ? `/${locale}` : `/${locale}${href}`;
}

/**
 * Hook that returns the current locale based on the URL pathname.
 */
export function useLocale(): string {
  const pathname = usePathname();
  return getCurrentLocale(pathname.replace(/\/$/, '') || '/');
}

/**
 * Hook that returns a locale-aware href builder function.
 * Usage: const lh = useLocalizedHref(); <Link href={lh('/blog/my-post')} />
 */
export function useLocalizedHref(): (href: string) => string {
  const locale = useLocale();
  return (href: string) => localizeHref(href, locale);
}
