import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturesSection } from '@/components/landing/FeaturesSection';

// Mock useInView and usePrefersReducedMotion used by Reveal
vi.mock('@/lib/useInView', () => ({
  useInView: () => ({ ref: { current: null }, inView: true }),
}));

vi.mock('@/lib/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => false,
}));

describe('FeaturesSection', () => {
  it('renders translated feature titles from landing namespace', () => {
    render(<FeaturesSection />);

    // Features should use translation keys from messages/en/landing.json
    // Note: Reveal renders content twice (visible + hidden), so use getAllByText
    expect(screen.getAllByText('landing.features.templates.title').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('landing.features.ats.title').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('landing.features.export.title').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('landing.features.privacy.title').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('landing.features.customization.title').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('landing.features.pwa.title').length).toBeGreaterThanOrEqual(1);
  });

  it('renders translated feature descriptions from landing namespace', () => {
    render(<FeaturesSection />);

    expect(screen.getAllByText('landing.features.templates.description').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('landing.features.pwa.description').length).toBeGreaterThanOrEqual(1);
  });

  it('renders translated section title from landing namespace', () => {
    render(<FeaturesSection />);

    expect(screen.getAllByText('landing.features.title').length).toBeGreaterThanOrEqual(1);
  });

  it('uses theme-aware css variables for the timeline card background', () => {
    render(<FeaturesSection />);

    const cards = screen.getAllByTestId('features-timeline-card');
    expect(cards.length).toBeGreaterThanOrEqual(1);
    const card = cards[0];
    expect(card.className).toContain('[background:var(--features-card-bg)]');
    expect(card.className).toContain('dark:[background:var(--features-card-bg-dark)]');
    expect(card.style.getPropertyValue('--features-card-bg')).toBeTruthy();
    expect(card.style.getPropertyValue('--features-card-bg-dark')).toBeTruthy();
  });
});
