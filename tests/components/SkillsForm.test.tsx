import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { SkillsForm } from '@/components/resume/editor/SkillsForm';
import type { Skill } from '@/types/resume';

const mockOnUpdate = vi.fn();

const createSkill = (overrides: Partial<Skill> = {}): Skill => ({
  id: 'skill-1',
  name: 'JavaScript',
  level: 'advanced',
  category: 'Technical',
  ...overrides,
});

describe('SkillsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders empty state when no skills', () => {
    const { container } = render(<SkillsForm data={[]} onUpdate={mockOnUpdate} />);
    expect(screen.getByText('resume-form.emptyStates.skills')).toBeTruthy();
    expect(screen.getByText('resume-form.labels.addSkill')).toBeTruthy();
    expect(container.querySelectorAll('button').length).toBe(2); // header Add + empty state Add Skill
  });

  it('renders skill rows when data exists', () => {
    const skills = [createSkill()];
    render(<SkillsForm data={skills} onUpdate={mockOnUpdate} />);
    expect(screen.getByDisplayValue('JavaScript')).toBeTruthy();
    // Level select shows raw translation key without provider
    expect(screen.getByDisplayValue('resume-form.skillLevels.advanced')).toBeTruthy();
    expect(screen.getByDisplayValue('resume-form.skillCategories.Technical')).toBeTruthy();
  });

  it('calls onUpdate with new skill when Add button is clicked', () => {
    render(<SkillsForm data={[]} onUpdate={mockOnUpdate} />);
    // Use the header Add button (first one) — "Add" is now via translation key
    const addButtons = screen.getAllByText('resume-form.labels.add');
    fireEvent.click(addButtons[0]);
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    const newSkills = mockOnUpdate.mock.calls[0][0];
    expect(newSkills).toHaveLength(1);
    expect(newSkills[0].level).toBe('intermediate');
    expect(newSkills[0].category).toBe('Technical');
  });

  it('calls onUpdate when skill name changes', () => {
    const skills = [createSkill()];
    render(<SkillsForm data={skills} onUpdate={mockOnUpdate} />);
    fireEvent.change(screen.getByDisplayValue('JavaScript'), {
      target: { value: 'TypeScript' },
    });
    expect(mockOnUpdate).toHaveBeenCalled();
    const updated = mockOnUpdate.mock.calls[0][0];
    expect(updated[0].name).toBe('TypeScript');
  });

  it('calls onUpdate when level changes', () => {
    const skills = [createSkill()];
    render(<SkillsForm data={skills} onUpdate={mockOnUpdate} />);
    fireEvent.change(screen.getByDisplayValue('resume-form.skillLevels.advanced'), {
      target: { value: 'expert' },
    });
    expect(mockOnUpdate).toHaveBeenCalled();
    const updated = mockOnUpdate.mock.calls[0][0];
    expect(updated[0].level).toBe('expert');
  });

  it('calls onUpdate when category changes', () => {
    const skills = [createSkill()];
    render(<SkillsForm data={skills} onUpdate={mockOnUpdate} />);
    fireEvent.change(screen.getByDisplayValue('resume-form.skillCategories.Technical'), {
      target: { value: 'Soft Skills' },
    });
    expect(mockOnUpdate).toHaveBeenCalled();
    const updated = mockOnUpdate.mock.calls[0][0];
    expect(updated[0].category).toBe('Soft Skills');
  });

  it('removes skill when trash button is clicked', () => {
    const skills = [createSkill({ id: 's1', name: 'JavaScript' }), createSkill({ id: 's2', name: 'Python' })];
    render(<SkillsForm data={skills} onUpdate={mockOnUpdate} />);
    const allButtons = document.querySelectorAll('button');
    const trashButton = Array.from(allButtons).find((btn) => {
      const svg = btn.querySelector('svg');
      return svg && svg.classList.contains('lucide-trash-2');
    });
    fireEvent.click(trashButton!);
    expect(mockOnUpdate).toHaveBeenCalled();
    const updated = mockOnUpdate.mock.calls[0][0];
    expect(updated).toHaveLength(1);
    expect(updated[0].id).toBe('s2');
    expect(updated[0].name).toBe('Python');
  });

});
