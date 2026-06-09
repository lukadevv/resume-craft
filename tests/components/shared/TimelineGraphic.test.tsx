import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { TimelineGraphic } from '@/components/templates/shared/TimelineGraphic';

describe('TimelineGraphic', () => {
  beforeEach(() => {
    cleanup();
  });

  const sampleEntries = [
    {
      id: '1',
      title: 'Senior Developer',
      subtitle: 'Acme Corp',
      date: '2020 - Present',
      description: 'Led engineering team of 5',
    },
    {
      id: '2',
      title: 'Junior Developer',
      subtitle: 'Startup Inc',
      date: '2018 - 2020',
      description: 'Built frontend features',
    },
  ];

  describe('rendering with multiple entries', () => {
    it('renders all entry titles', () => {
      render(
        <TimelineGraphic entries={sampleEntries} accentColor="#3ECF8E" />
      );

      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
      expect(screen.getByText('Junior Developer')).toBeInTheDocument();
    });

    it('renders all entry subtitles', () => {
      render(
        <TimelineGraphic entries={sampleEntries} accentColor="#3ECF8E" />
      );

      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
      expect(screen.getByText('Startup Inc')).toBeInTheDocument();
    });

    it('renders all entry dates', () => {
      render(
        <TimelineGraphic entries={sampleEntries} accentColor="#3ECF8E" />
      );

      expect(screen.getByText('2020 - Present')).toBeInTheDocument();
      expect(screen.getByText('2018 - 2020')).toBeInTheDocument();
    });

    it('renders timeline dots with accentColor', () => {
      render(
        <TimelineGraphic entries={sampleEntries} accentColor="#FF6600" />
      );

      const dots = screen.getAllByTestId('timeline-dot');
      expect(dots).toHaveLength(2);
      dots.forEach((dot) => {
        expect(dot).toHaveStyle({ backgroundColor: 'rgb(255, 102, 0)' });
      });
    });

    it('renders a vertical connecting line', () => {
      render(
        <TimelineGraphic entries={sampleEntries} accentColor="#3ECF8E" />
      );

      expect(screen.getByTestId('timeline-line')).toBeInTheDocument();
    });

    it('renders descriptions for each entry', () => {
      render(
        <TimelineGraphic entries={sampleEntries} accentColor="#3ECF8E" />
      );

      expect(
        screen.getByText('Led engineering team of 5')
      ).toBeInTheDocument();
      expect(screen.getByText('Built frontend features')).toBeInTheDocument();
    });
  });

  describe('single entry', () => {
    it('renders a single entry with dot and no dangling line issue', () => {
      const singleEntry = [
        {
          id: '1',
          title: 'Sole Contributor',
          subtitle: 'Freelance',
          date: '2022 - Present',
          description: 'Independent work',
        },
      ];

      render(
        <TimelineGraphic entries={singleEntry} accentColor="#3ECF8E" />
      );

      expect(screen.getByText('Sole Contributor')).toBeInTheDocument();
      expect(screen.getByText('Freelance')).toBeInTheDocument();

      const dots = screen.getAllByTestId('timeline-dot');
      expect(dots).toHaveLength(1);
    });
  });

  describe('empty state', () => {
    it('returns null when entries array is empty', () => {
      const { container } = render(
        <TimelineGraphic entries={[]} accentColor="#3ECF8E" />
      );

      expect(container.firstChild).toBeNull();
    });
  });
});
