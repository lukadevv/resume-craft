import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturesSection } from '@/components/landing/FeaturesSection';

describe('FeaturesSection', () => {
  it('uses theme-aware css variables for the timeline card background', () => {
    render(<FeaturesSection />);

    const card = screen.getByTestId('features-timeline-card');
    expect(card.className).toContain('[background:var(--features-card-bg)]');
    expect(card.className).toContain('dark:[background:var(--features-card-bg-dark)]');
    expect(card.style.getPropertyValue('--features-card-bg')).toBeTruthy();
    expect(card.style.getPropertyValue('--features-card-bg-dark')).toBeTruthy();
  });

  it('does not hardcode white text for feature copy', () => {
    render(<FeaturesSection />);

    const firstTitle = screen.getAllByText('5 Professional Templates')[0];
    const titleHeading = firstTitle.closest('h3');
    expect(titleHeading).toBeTruthy();
    expect(titleHeading?.className).toContain('text-foreground');
    expect(titleHeading?.className).not.toContain('text-white');

    const firstDescription = screen.getAllByText(/Choose from Modern, Classic/i)[0];
    expect(firstDescription.className).toContain('text-foreground-secondary');
    expect(firstDescription.className).not.toContain('text-white');
  });
});
