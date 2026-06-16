import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { templateDefinitions } from '@/lib/templates';
import { TemplatesSection } from '@/components/landing/TemplatesSection';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: { fallback?: string }) => params?.fallback ?? key,
}));

vi.mock('next/link', () => {
  return {
    default: ({
      href,
      children,
      ...props
    }: {
      href: string | { pathname?: string };
      children: React.ReactNode;
    }) => (
      <a href={typeof href === 'string' ? href : href.pathname ?? '#'} {...props}>
        {children}
      </a>
    ),
  };
});

describe('TemplatesSection', () => {
  it('uses theme-aware landing card + hover overlay backgrounds for every template', () => {
    render(<TemplatesSection />);

    for (const template of templateDefinitions) {
      const card = screen.getByTestId(`template-card-${template.id}`);
      expect(card.className).toContain('[background:var(--template-card-bg)]');
      expect(card.className).toContain('dark:[background:var(--template-card-bg-dark)]');
      expect(card.style.getPropertyValue('--template-card-bg')).toBeTruthy();
      expect(card.style.getPropertyValue('--template-card-bg-dark')).toBeTruthy();
      expect(card.style.getPropertyValue('--template-hover-overlay')).toBeTruthy();
      expect(card.style.getPropertyValue('--template-hover-overlay-dark')).toBeTruthy();

      const overlay = screen.getByTestId(`template-hover-overlay-${template.id}`);
      expect(overlay.className).toContain('[background:var(--template-hover-overlay)]');
      expect(overlay.className).toContain('dark:[background:var(--template-hover-overlay-dark)]');
    }
  });
});
