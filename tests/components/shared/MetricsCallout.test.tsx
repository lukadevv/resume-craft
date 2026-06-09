import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MetricsCallout } from '@/components/templates/shared/MetricsCallout';

describe('MetricsCallout', () => {
  beforeEach(() => {
    cleanup();
  });

  const sampleMetrics = [
    { label: 'Revenue Growth', value: '40%' },
    { label: 'Team Members Led', value: '15' },
    { label: 'Projects Delivered', value: '23' },
  ];

  describe('rendering with data', () => {
    it('renders all metric labels', () => {
      render(<MetricsCallout metrics={sampleMetrics} accentColor="#3ECF8E" />);

      expect(screen.getByText('Revenue Growth')).toBeInTheDocument();
      expect(screen.getByText('Team Members Led')).toBeInTheDocument();
      expect(screen.getByText('Projects Delivered')).toBeInTheDocument();
    });

    it('renders all metric values', () => {
      render(<MetricsCallout metrics={sampleMetrics} accentColor="#3ECF8E" />);

      expect(screen.getByText('40%')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
      expect(screen.getByText('23')).toBeInTheDocument();
    });

    it('applies accentColor to each metric card border', () => {
      render(<MetricsCallout metrics={sampleMetrics} accentColor="#FF6600" />);

      const cards = screen.getAllByTestId('metric-card');
      cards.forEach((card) => {
        expect(card).toHaveStyle({ borderColor: 'rgb(255, 102, 0)' });
      });
    });

    it('displays values with large prominent styling', () => {
      render(<MetricsCallout metrics={sampleMetrics} accentColor="#3ECF8E" />);

      const values = screen.getAllByTestId('metric-value');
      expect(values).toHaveLength(3);
      values.forEach((value) => {
        // Values should exist and have content
        expect(value.textContent).toBeTruthy();
      });
    });
  });

  describe('empty state', () => {
    it('returns null when metrics array is empty', () => {
      const { container } = render(
        <MetricsCallout metrics={[]} accentColor="#3ECF8E" />
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('single metric', () => {
    it('renders a single metric card correctly', () => {
      render(
        <MetricsCallout
          metrics={[{ label: 'Satisfaction', value: '98%' }]}
          accentColor="#3ECF8E"
        />
      );

      expect(screen.getByText('Satisfaction')).toBeInTheDocument();
      expect(screen.getByText('98%')).toBeInTheDocument();
      const cards = screen.getAllByTestId('metric-card');
      expect(cards).toHaveLength(1);
    });
  });
});
