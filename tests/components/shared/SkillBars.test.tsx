import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { SkillBars } from '@/components/templates/shared/SkillBars';

describe('SkillBars', () => {
  beforeEach(() => {
    cleanup();
  });

  const sampleSkills = [
    { name: 'React', level: 'expert' },
    { name: 'TypeScript', level: 'advanced' },
    { name: 'CSS', level: 'intermediate' },
    { name: 'Docker', level: 'beginner' },
  ];

  describe('rendering with data', () => {
    it('renders all skill names', () => {
      render(<SkillBars skills={sampleSkills} accentColor="#3ECF8E" />);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('CSS')).toBeInTheDocument();
      expect(screen.getByText('Docker')).toBeInTheDocument();
    });

    it('sorts skills in descending proficiency order (expert first, beginner last)', () => {
      render(<SkillBars skills={sampleSkills} accentColor="#3ECF8E" />);

      const skillNames = screen
        .getAllByTestId('skill-bar-name')
        .map((el) => el.textContent);

      // expert first, beginner last
      expect(skillNames).toEqual(['React', 'TypeScript', 'CSS', 'Docker']);
    });

    it('fills bars proportionally to proficiency level', () => {
      render(<SkillBars skills={sampleSkills} accentColor="#3ECF8E" />);

      const fills = screen.getAllByTestId('skill-bar-fill');
      // expert=100%, advanced=75%, intermediate=50%, beginner=25%
      expect(fills[0]).toHaveStyle({ width: '100%' });
      expect(fills[1]).toHaveStyle({ width: '75%' });
      expect(fills[2]).toHaveStyle({ width: '50%' });
      expect(fills[3]).toHaveStyle({ width: '25%' });
    });

    it('applies accentColor to the fill bars via inline style', () => {
      render(<SkillBars skills={sampleSkills} accentColor="#FF6600" />);

      const fills = screen.getAllByTestId('skill-bar-fill');
      fills.forEach((fill) => {
        expect(fill).toHaveStyle({ backgroundColor: 'rgb(255, 102, 0)' });
      });
    });
  });

  describe('empty state', () => {
    it('returns null when skills array is empty', () => {
      const { container } = render(
        <SkillBars skills={[]} accentColor="#3ECF8E" />
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('single skill', () => {
    it('renders a single skill bar correctly', () => {
      render(
        <SkillBars
          skills={[{ name: 'Python', level: 'advanced' }]}
          accentColor="#3ECF8E"
        />
      );

      expect(screen.getByText('Python')).toBeInTheDocument();
      const fill = screen.getByTestId('skill-bar-fill');
      expect(fill).toHaveStyle({ width: '75%' });
    });
  });
});
