import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

// Mock next/navigation — next-intl internally imports from here.
// Must be hoisted to avoid "Cannot find module" errors in Vitest.
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  notFound: vi.fn(),
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
}));

// Mock next-intl for test environments (useTranslations, NextIntlClientProvider)
vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => (key: string, params?: Record<string, unknown>) => {
    if (params) {
      return `${namespace ? namespace + '.' : ''}${key}${JSON.stringify(params)}`;
    }
    return namespace ? `${namespace}.${key}` : key;
  },
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  useFormatter: () => ({
    dateTime: (date: Date) => date.toISOString(),
    number: (n: number) => String(n),
  }),
  useLocale: () => 'en',
}));

// Mock next-intl/server for test environments
vi.mock('next-intl/server', () => ({
  getRequestConfig: (fn: (opts: { requestLocale: Promise<string | undefined> }) => Promise<Record<string, unknown>>) => {
    const wrappedFn = fn;
    return wrappedFn;
  },
  setRequestLocale: () => {},
  getTranslations: (opts?: { locale?: string; namespace?: string } | string) => {
    const namespace = typeof opts === 'string' ? opts : opts?.namespace;
    return Promise.resolve(
      (key: string, params?: Record<string, unknown>) => {
        if (params) {
          return `${namespace ? namespace + '.' : ''}${key}${JSON.stringify(params)}`;
        }
        return namespace ? `${namespace}.${key}` : key;
      }
    );
  },
}));

// Mock next-intl/routing
vi.mock('next-intl/routing', () => ({
  defineRouting: (config: Record<string, unknown>) => config,
}));

// Mock next-intl/navigation
vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) =>
      React.createElement('a', { href, ...props }, children),
    redirect: vi.fn(),
    usePathname: vi.fn(() => '/'),
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    })),
    getPathname: vi.fn(({ href }: { href: string }) => href),
  }),
}));

// jsdom localStorage is missing methods in this environment;
// provide a minimal in-memory implementation for zustand persist.
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock next-view-transitions for tests since they don't run inside
// the ViewTransitions provider from the root layout.
vi.mock('next-view-transitions', () => {
  const MockLink = ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => React.createElement('a', { href, ...props }, children);
  MockLink.displayName = 'MockLink';

  const MockViewTransitions = ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children);
  MockViewTransitions.displayName = 'MockViewTransitions';

  return {
    Link: MockLink,
    ViewTransitions: MockViewTransitions,
    useTransitionRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
  };
});

