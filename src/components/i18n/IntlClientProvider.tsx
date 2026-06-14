'use client';

import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

interface IntlClientProviderProps {
  locale: string;
  messages: Record<string, unknown>;
  children: ReactNode;
}

/**
 * Client-component wrapper around NextIntlClientProvider.
 * Must be a client component — when imported into a server component
 * layout, the 'use client' boundary ensures NextIntlClientProvider
 * resolves to the client variant, avoiding server-side config lookups
 * that fail during static export.
 */
export function IntlClientProvider({
  locale,
  messages,
  children,
}: IntlClientProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
