'use client';

import { forwardRef } from 'react';
import { Link as ViewTransitionLink } from 'next-view-transitions';
import { useLocalizedHref } from '@/lib/locale-utils';
import type { ComponentProps } from 'react';

type LinkProps = Omit<ComponentProps<typeof ViewTransitionLink>, 'href'> & {
  href: string;
};

/**
 * Locale-aware Link component with view transitions.
 *
 * Automatically prefixes internal hrefs with the current locale so
 * navigation keeps the user in their selected language.
 * Use this instead of next/link or next-view-transitions Link.
 *
 * External URLs and anchor-only hrefs (#…) are passed through unchanged.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, ...props }, ref) => {
    const lh = useLocalizedHref();
    return <ViewTransitionLink ref={ref} href={lh(href)} {...props} />;
  }
);

Link.displayName = 'Link';
