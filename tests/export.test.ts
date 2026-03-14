import { describe, it, expect } from 'vitest';
import { exportToText, exportToHTML, exportToJSON } from '@/lib/export/resume-export';
import { Resume, createEmptyResume } from '@/types/resume';

describe('Export Functions', () => {
  const createMockResume = (overrides: Partial<Resume> = {}): Resume => ({
    ...createEmptyResume(),
    id: 'test-id',
    name: 'Test Resume',
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      location: 'New York, USA',
      website: 'https://johndoe.com',
      linkedin: 'linkedin.com/in/johndoe',
      portfolio: '',
      summary: 'Experienced developer',
    },
    summary: 'A passionate developer',
    workExperience: [
      {
        id: 'exp-1',
        company: 'Tech Corp',
        position: 'Software Engineer',
        location: 'San Francisco',
        startDate: '2020-01',
        endDate: '2023-12',
        current: false,
        description: 'Built amazing things',
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'State University',
        degree: 'Bachelor',
        field: 'Computer Science',
        location: 'Boston',
        startDate: '2016-09',
        endDate: '2020-05',
        current: false,
        gpa: '3.8',
        achievements: "Dean's List",
      },
    ],
    skills: [
      { id: 'skill-1', name: 'TypeScript', level: 'expert', category: 'Technical' },
      { id: 'skill-2', name: 'React', level: 'advanced', category: 'Technical' },
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'Awesome App',
        description: 'A cool application',
        url: 'https://example.com',
        technologies: ['React', 'Node.js'],
        startDate: '2022-01',
        endDate: '2022-06',
        current: false,
      },
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Solutions Architect',
        issuer: 'Amazon',
        date: '2021-06',
        expiryDate: '2024-06',
        credentialId: 'ABC123',
        url: 'https://aws.com',
      },
    ],
    languages: [
      { id: 'lang-1', name: 'English', proficiency: 'native' },
      { id: 'lang-2', name: 'Spanish', proficiency: 'intermediate' },
    ],
    interests: [{ id: 'int-1', name: 'Photography' }],
    references: [],
    customSections: [],
    ...overrides,
  });

  describe('exportToText', () => {
    it('should export resume to plain text', () => {
      const resume = createMockResume();
      const text = exportToText(resume);

      expect(text).toContain('JOHN DOE');
      expect(text).toContain('john@example.com');
      expect(text).toContain('WORK EXPERIENCE');
      expect(text).toContain('Tech Corp');
      expect(text).toContain('SKILLS');
    });

    it('should include skills in export', () => {
      const resume = createMockResume();
      const text = exportToText(resume);

      expect(text).toContain('TypeScript');
      expect(text).toContain('React');
    });
  });

  describe('exportToHTML', () => {
    it('should export resume to valid HTML', () => {
      const resume = createMockResume();
      const html = exportToHTML(resume);

      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html');
      expect(html).toContain('John Doe');
      expect(html).toContain('Tech Corp');
    });

    it('should include custom theme color', () => {
      const resume = createMockResume({ themeColor: '#FF0000' });
      const html = exportToHTML(resume);

      expect(html).toContain('#FF0000');
    });
  });

  describe('exportToJSON', () => {
    it('should export resume to valid JSON', () => {
      const resume = createMockResume();
      const json = exportToJSON(resume);

      const parsed = JSON.parse(json);
      expect(parsed.personalInfo.firstName).toBe('John');
      expect(parsed.workExperience).toHaveLength(1);
      expect(parsed.skills).toHaveLength(2);
    });

    it('should preserve all resume data', () => {
      const resume = createMockResume();
      const json = exportToJSON(resume);

      const parsed = JSON.parse(json);
      expect(parsed.languages).toHaveLength(2);
      expect(parsed.certifications).toHaveLength(1);
    });
  });
});
