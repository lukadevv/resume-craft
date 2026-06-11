import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { EmptyState } from '@/components/my-resumes/EmptyState';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
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

  it('renders the no-resumes heading', () => {
    render(<EmptyState />);
    expect(screen.getByText('No resumes yet')).toBeInTheDocument();
  });

  it('renders the descriptive subtitle', () => {
    render(<EmptyState />);
    expect(
      screen.getByText('Create your first resume to get started')
    ).toBeInTheDocument();
  });

  it('renders a CTA button linking to /create', () => {
    render(<EmptyState />);
    const cta = screen.getByRole('link', { name: /create resume/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '/create');
  });

  it('renders a FileText icon', () => {
    const { container } = render(<EmptyState />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('accepts and displays a custom message', () => {
    render(<EmptyState message="No search results found." />);
    expect(
      screen.getByText('No search results found.')
    ).toBeInTheDocument();
  });

  it('accepts and uses a custom CTA label', () => {
    render(<EmptyState ctaLabel="Start fresh" />);
    const cta = screen.getByRole('link', { name: /start fresh/i });
    expect(cta).toBeInTheDocument();
  });
});
