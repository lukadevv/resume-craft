'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Determines the page transition direction based on the navigation bar order.
 *
 * Nav bar order: Home (/) → Templates (/templates) → My Resumes (/my-resumes)
 *
 * Rules:
 * - Navigating to a page to the RIGHT in the nav bar → forward (new from right)
 * - Navigating to a page to the LEFT in the nav bar → back (new from left)
 * - Route not in the nav bar → always forward
 * - Browser back/forward → always back
 */
const NAV_ORDER = ['/', '/templates', '/my-resumes'];

function normalizePath(p: string): string {
  // Strip trailing slash and hash fragment, default to '/'
  return p.split('#')[0].replace(/\/$/, '') || '/';
}

function getNavIndex(path: string): number {
  return NAV_ORDER.indexOf(normalizePath(path));
}

export function NavigationDirection() {
  const pathname = usePathname();
  const currentRef = useRef(normalizePath(pathname));

  // Keep current page synced after navigation
  useEffect(() => {
    currentRef.current = normalizePath(pathname);
  }, [pathname]);

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

      const targetPath = normalizePath(href);
      const currentIdx = getNavIndex(currentRef.current);
      const targetIdx = getNavIndex(targetPath);
      const isSamePage = normalizePath(currentRef.current) === targetPath;

      let dir: 'forward' | 'back' | 'none';

      if (isSamePage) {
        // Same page → no animation
        dir = 'none';
      } else if (targetIdx === -1) {
        // Not in the nav bar → forward
        dir = 'forward';
      } else if (targetIdx > currentIdx) {
        // Target is to the RIGHT in the nav bar → forward
        dir = 'forward';
      } else if (targetIdx < currentIdx) {
        // Target is to the LEFT in the nav bar → back
        dir = 'back';
      } else {
        // Same index but different path (shouldn't happen, but safe default)
        dir = 'forward';
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
