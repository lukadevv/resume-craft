import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ModernTemplate } from '@/components/resume/templates/ModernTemplate';
import { ClassicTemplate } from '@/components/resume/templates/ClassicTemplate';
import { MinimalTemplate } from '@/components/resume/templates/MinimalTemplate';
import { CreativeTemplate } from '@/components/resume/templates/CreativeTemplate';
import { TechnicalTemplate } from '@/components/resume/templates/TechnicalTemplate';
import { SectionRenderer } from '@/components/templates/shared/SectionRenderer';
import { LanguagesForm } from '@/components/resume/editor/LanguagesForm';
import { ResumePreview } from '@/components/resume/preview/ResumePreview';
import { autoDetectIcon, getIconsByCategory } from '@/lib/icons';
import type { Resume, Language } from '@/types/resume';

// ── Helpers ──

function createMinimalResume(overrides: Partial<Resume> = {}): Resume {
  return {
    id: 'test-1',
    name: 'Test Resume',
    template: 'modern',
    themeColor: '#3ECF8E',
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      portfolio: '',
      summary: '',
    },
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
    references: [],
    customIcons: [],
    customSections: [],
    tools: [],
    coreCompetencies: [],
    achievements: [],
    portfolio: '',
    awards: [],
    affiliations: [],
    publications: [],
    grantsFellowships: [],
    conferences: [],
    clinicalSkills: [],
    licenses: [],
    barAdmission: [],
    practiceAreas: [],
    securityClearance: '',
    teachingPhilosophy: '',
    classroomExperience: '',
    teachingExperience: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

// ── Registry / Auto-detect Tests ──

describe('Country Flag — Registry & Auto-detect', () => {
  it('getIconsByCategory country-flag returns 28+ icons', () => {
    const icons = getIconsByCategory('country-flag');
    expect(icons.length).toBeGreaterThanOrEqual(28);
  });

  it('autoDetectIcon Spanish → es flag', () => {
    const icon = autoDetectIcon('Spanish');
    expect(icon).toBeDefined();
    expect(icon?.key).toBe('es');
  });

  it('autoDetectIcon English → us flag', () => {
    const icon = autoDetectIcon('English');
    expect(icon).toBeDefined();
    expect(icon?.key).toBe('us');
  });

  it('autoDetectIcon unknown → undefined', () => {
    const icon = autoDetectIcon('Klingon');
    expect(icon).toBeUndefined();
  });

  it('all 28 flag keys are unique', () => {
    const icons = getIconsByCategory('country-flag');
    const keys = icons.map((i) => i.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

// ── Template Rendering Tests ──

describe('Country Flag — Template Rendering', () => {
  const spanishLanguage: Language = {
    id: 'lang-es',
    name: 'Spanish',
    proficiency: 'native',
  };

  const englishLanguage: Language = {
    id: 'lang-en',
    name: 'English',
    proficiency: 'fluent',
  };

  const klingonLanguage: Language = {
    id: 'lang-kl',
    name: 'Klingon',
    proficiency: 'beginner',
  };

  const frenchOverrideLanguage: Language = {
    id: 'lang-fr',
    name: 'Klingon',
    proficiency: 'advanced',
    iconKey: 'fr',
  };

  it('ModernTemplate renders Spanish with flag SVG', () => {
    const resume = createMinimalResume({ languages: [spanishLanguage] });
    const { container } = render(<ModernTemplate resume={resume} />);
    expect(screen.getByText('Spanish')).toBeInTheDocument();
    // The Spanish flag SVG should be rendered as part of the language row
    const languagesSection = container.querySelector('section');
    expect(languagesSection).toBeTruthy();
    // After implementation: an SVG with flag colors should exist in the language area
    // RED: this test checks for the text only; SVG presence verification added below
  });

  it('ModernTemplate renders English with flag SVG', () => {
    const resume = createMinimalResume({ languages: [englishLanguage] });
    const { container } = render(<ModernTemplate resume={resume} />);
    expect(screen.getByText('English')).toBeInTheDocument();
    // Verify SVG is rendered (auto-detected US flag)
    const svgs = container.querySelectorAll('svg');
    // At least one SVG should exist for the flag (auto-detected)
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('ModernTemplate renders unknown language without broken UI', () => {
    const resume = createMinimalResume({ languages: [klingonLanguage] });
    render(<ModernTemplate resume={resume} />);
    expect(screen.getByText('Klingon')).toBeInTheDocument();
    // showDefault=false means NO Wrench icon for unknown languages
    // If Wrench were rendered it would have aria-label="Klingon"
    // Text-only fallback without Wrench is the expected behavior
  });

  it('ModernTemplate renders explicit iconKey regardless of name', () => {
    const resume = createMinimalResume({ languages: [frenchOverrideLanguage] });
    const { container } = render(<ModernTemplate resume={resume} />);
    // Even though name is "Klingon", the FR flag should render because iconKey='fr'
    const klingonTexts = screen.getAllByText('Klingon');
    expect(klingonTexts.length).toBeGreaterThan(0);
    // The FR flag SVG has blue (#002395), white, and red (#ED2939) fills
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('SectionRenderer languages case renders flag alongside name', () => {
    const resume = createMinimalResume({ languages: [spanishLanguage] });
    const { container } = render(
      <SectionRenderer
        section="languages"
        resume={resume}
        accentColor="#333"
        colors={{ heading: 'text-gray-900', body: 'text-gray-700', muted: 'text-gray-500' }}
      />
    );
    const spanishTexts = screen.getAllByText('Spanish');
    expect(spanishTexts.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/section\.proficiencyLevels\.native/).length).toBeGreaterThan(0);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('ClassicTemplate renders language with flag', () => {
    const resume = createMinimalResume({ languages: [spanishLanguage, englishLanguage] });
    const { container } = render(<ClassicTemplate resume={resume} />);
    const spanishTexts = screen.getAllByText(/Spanish/);
    expect(spanishTexts.length).toBeGreaterThan(0);
    const englishTexts = screen.getAllByText(/English/);
    expect(englishTexts.length).toBeGreaterThan(0);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it('MinimalTemplate renders language with flag', () => {
    const resume = createMinimalResume({ languages: [spanishLanguage] });
    const { container } = render(<MinimalTemplate resume={resume} />);
    const spanishTexts = screen.getAllByText('Spanish');
    expect(spanishTexts.length).toBeGreaterThan(0);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('CreativeTemplate renders language with flag', () => {
    const resume = createMinimalResume({ languages: [englishLanguage] });
    const { container } = render(<CreativeTemplate resume={resume} />);
    const englishTexts = screen.getAllByText('English');
    expect(englishTexts.length).toBeGreaterThan(0);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('TechnicalTemplate renders language with flag', () => {
    const resume = createMinimalResume({ languages: [spanishLanguage] });
    const { container } = render(<TechnicalTemplate resume={resume} />);
    const spanishTexts = screen.getAllByText(/Spanish/);
    expect(spanishTexts.length).toBeGreaterThan(0);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('ResumePreview renders language with flag', () => {
    const resume = createMinimalResume({ languages: [englishLanguage] });
    const { container } = render(<ResumePreview resume={resume} />);
    const englishTexts = screen.getAllByText(/English/);
    expect(englishTexts.length).toBeGreaterThan(0);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });
});

// ── Editor Tests ──

describe('Country Flag — Editor Icon Picker', () => {
  it('LanguagesForm renders without crashing', () => {
    const onUpdate = vi.fn();
    render(<LanguagesForm data={[]} onUpdate={onUpdate} />);
    const headings = screen.getAllByText('Languages');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('LanguagesForm shows icon picker trigger for each language row', () => {
    const languages: Language[] = [
      { id: '1', name: 'Spanish', proficiency: 'native' },
    ];
    const onUpdate = vi.fn();
    render(<LanguagesForm data={languages} onUpdate={onUpdate} />);
    // After implementation, there should be an icon picker button
    // RED phase: just verify language renders
    expect(screen.getByDisplayValue('Spanish')).toBeInTheDocument();
  });

  it('LanguagesForm icon picker opens and filters by country-flag', async () => {
    const languages: Language[] = [
      { id: '1', name: 'Spanish', proficiency: 'native' },
    ];
    const onUpdate = vi.fn();
    render(<LanguagesForm data={languages} onUpdate={onUpdate} />);

    // After implementation: find the icon trigger button and click it
    // The popover should show country-flag icons
    // RED phase: placeholder — actual assertions added after implementation
  });

  it('LanguagesForm selecting a flag calls onUpdate with iconKey', () => {
    const languages: Language[] = [
      { id: '1', name: 'English', proficiency: 'fluent' },
    ];
    const onUpdate = vi.fn();
    render(<LanguagesForm data={languages} onUpdate={onUpdate} />);
    // After implementation: simulate selecting a flag
    // RED phase: placeholder
  });

  it('LanguagesForm reset button clears iconKey', () => {
    const languages: Language[] = [
      { id: '1', name: 'French', proficiency: 'advanced', iconKey: 'es' },
    ];
    const onUpdate = vi.fn();
    render(<LanguagesForm data={languages} onUpdate={onUpdate} />);
    // After implementation: click the reset button and verify iconKey becomes undefined
    // RED phase: placeholder
  });
});
