'use client';

import { useEffect } from 'react';
import { locales } from '@/i18n/routing';

/**
 * Determines the page transition direction based on a flat priority list.
 *
 * Priority order (left → right):
 *   0: Home       (/)
 *   1: Templates  (/templates)
 *   2: My Resumes (/my-resumes)
 *   3: /create
 *   4: /resume    (also matches /resume/*, /resume/edit, etc.)
 *
 * Rules:
 * - Target is to the RIGHT (higher index) → forward (new content from right)
 * - Target is to the LEFT  (lower index) → back   (new content from left)
 * - Pages not in the list → treated as rightmost (highest index)
 * - Same page → no animation
 * - Browser back/forward → back
 */
const NAV_ORDER = ['/', '/templates', '/blog', '/blog/', '/my-resumes', '/create', '/resume'];

/** Strip locale prefix from a path so locale-aware routes match NAV_ORDER.
 *  "/es/templates" → "/templates", "/de" → "/", "/fr" → "/" */
function stripLocale(p: string): string {
  const segments = p.split('/');
  const first = segments[1];
  if (
    first &&
    first !== 'en' &&
    (locales as readonly string[]).includes(first)
  ) {
    const rest = segments.slice(2).join('/');
    return rest ? `/${rest}` : '/';
  }
  return p;
}

function normalizePath(p: string): string {
  // Strip query string, hash fragment, trailing slash, and locale prefix
  return stripLocale(p.split('?')[0].split('#')[0].replace(/\/$/, '') || '/');
}

function getNavIndex(path: string): number {
  const normalized = normalizePath(path);

  for (let i = NAV_ORDER.length - 1; i >= 0; i--) {
    const navPath = NAV_ORDER[i];

    if (navPath === '/') {
      // '/' only matches exactly '/'
      if (normalized === '/') return i;
    } else if (navPath.endsWith('/')) {
      // Trailing-slash entry — match only sub-pages via prefix, never the list page itself
      const prefix = navPath.replace(/\/$/, '');
      if (normalized !== prefix && normalized.startsWith(prefix + '/')) {
        return i;
      }
    } else {
      // Other items match exact or as prefix (e.g., /resume ← /resume/edit)
      if (normalized === navPath || normalized.startsWith(navPath + '/')) {
        return i;
      }
    }
  }

  // Not found in the list → treat as rightmost
  return NAV_ORDER.length;
}

export function NavigationDirection() {
  useEffect(() => {
    // Intercept Link clicks in capture phase — fires BEFORE the Link's own
    // handler, so direction is set before startViewTransition() is called.
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (!link) return;

      const href = link.getAttribute('href') || '';

      // Ignore external links, anchors, target=_blank
      if (
        link.target === '_blank' ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href === '#'
      )
        return;

      // Use window.location for the current page — always ground truth
      const currentPath = normalizePath(window.location.pathname);
      const targetPath = normalizePath(href);
      const currentIdx = getNavIndex(currentPath);
      const targetIdx = getNavIndex(targetPath);
      const isSamePage = currentPath === targetPath;

      let dir: 'forward' | 'back' | 'none';

      if (isSamePage) {
        dir = 'none';
      } else if (targetIdx > currentIdx) {
        // Target is to the RIGHT in the priority list → forward
        dir = 'forward';
      } else {
        // Target is to the LEFT or equal (same index, different path) → back
        dir = 'back';
      }

      document.documentElement.dataset.navDirection = dir;
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () =>
      document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  useEffect(() => {
    // Browser back/forward buttons → always back
    const handlePopState = () => {
      document.documentElement.dataset.navDirection = 'back';
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return null;
}
