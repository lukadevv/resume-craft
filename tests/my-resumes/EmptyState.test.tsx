import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { EmptyState } from '@/components/my-resumes/EmptyState';

vi.mock('next-view-transitions', () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

describe('EmptyState', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders translation key for heading (no provider — shows raw key)', () => {
    render(<EmptyState />);
    expect(screen.getByText('common.myResumes.emptyState.title')).toBeInTheDocument();
  });

  it('renders translation key for subtitle', () => {
    render(<EmptyState />);
    expect(screen.getByText('common.myResumes.emptyState.defaultMessage')).toBeInTheDocument();
  });

  it('renders a CTA button linking to /create', () => {
    render(<EmptyState />);
    const cta = screen.getByRole('link', { name: /common.myResumes.emptyState.defaultCtaLabel/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '/create');
  });

  it('renders a FileText icon', () => {
    const { container } = render(<EmptyState />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('accepts and displays a custom message (overrides translation)', () => {
    render(<EmptyState message="No search results found." />);
    expect(screen.getByText('No search results found.')).toBeInTheDocument();
  });

  it('accepts and uses a custom CTA label (overrides translation)', () => {
    render(<EmptyState ctaLabel="Start fresh" />);
    const cta = screen.getByRole('link', { name: /start fresh/i });
    expect(cta).toBeInTheDocument();
  });
});
