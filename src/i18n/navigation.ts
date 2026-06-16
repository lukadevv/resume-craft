import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/i18n/routing-extended';

/**
 * Locale-aware navigation primitives.
 * Use these instead of next/link or next/navigation for any route that
 * participates in i18n. The returned Link, redirect, usePathname, and
 * useRouter are all locale-aware.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
