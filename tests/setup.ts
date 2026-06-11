import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

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

