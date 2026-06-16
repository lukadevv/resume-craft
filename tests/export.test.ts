import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  exportToText,
  exportToHTML,
  exportToJSON,
  downloadFile,
  exportToDOCX,
  exportToPDF,
} from '@/lib/export/resume-export';
import { Resume, createEmptyResume } from '@/types/resume';

// ── Module-level mocks for dynamic imports used by exportToPDF ──
// hoisted mock function so tests can call mockResolvedValueOnce on it
const { mockHtml2canvas } = vi.hoisted(() => ({
  mockHtml2canvas: vi.fn().mockResolvedValue({
    width: 2100,
    height: 2970,
    toDataURL: () => 'data:image/jpeg;base64,mock',
  }),
}));

vi.mock('html2canvas-pro', () => ({
  default: mockHtml2canvas,
}));

vi.mock('jspdf', () => ({
  jsPDF: vi.fn(function () {
    return {
      internal: {
        pageSize: {
          getWidth: () => 210,
        },
      },
      addImage: vi.fn(),
      save: vi.fn(),
      setFillColor: vi.fn(),
      rect: vi.fn(),
    };
  }),
}));

// ── Helpers ──
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

const createEmptyResumeForTest = (): Resume => ({
  ...createEmptyResume(),
  id: 'empty-id',
  name: 'Empty Resume',
});

describe('Export Functions', () => {
  let createObjectURLSpy: ReturnType<typeof vi.spyOn>;
  let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>;
  let appendChildSpy: ReturnType<typeof vi.spyOn>;
  let removeChildSpy: ReturnType<typeof vi.spyOn>;
  let clickSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
    removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node);
    clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── exportToText ──
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

    it('should handle empty resume (header only)', () => {
      const resume = createEmptyResumeForTest();
      const text = exportToText(resume);
      expect(text.trim()).toBe('');
      expect(text).not.toContain('WORK EXPERIENCE');
      expect(text).not.toContain('SKILLS');
      expect(text).not.toContain('EDUCATION');
      expect(text).not.toContain('PROJECTS');
      expect(text).not.toContain('CERTIFICATIONS');
      expect(text).not.toContain('LANGUAGES');
    });

    it('should preserve emoji in summary', () => {
      const resume = createMockResume({ summary: 'Passionate developer 🔥' });
      const text = exportToText(resume);
      expect(text).toContain('Passionate developer 🔥');
    });

    it('should show Present for current experience', () => {
      const resume = createMockResume({
        workExperience: [
          {
            ...createMockResume().workExperience[0],
            current: true,
            endDate: '',
          },
        ],
      });
      const text = exportToText(resume);
      expect(text).toContain('Present');
    });

    it('should show only start date when endDate is missing and not current', () => {
      const resume = createMockResume({
        workExperience: [
          {
            ...createMockResume().workExperience[0],
            current: false,
            endDate: '',
          },
        ],
      });
      const text = exportToText(resume);
      expect(text).toContain('Jan 2020');
      expect(text).not.toContain('2023-12');
      expect(text).not.toContain('Present');
    });

    it('should omit date range when startDate is empty', () => {
      const resume = createMockResume({
        workExperience: [
          {
            ...createMockResume().workExperience[0],
            startDate: '',
          },
        ],
      });
      const text = exportToText(resume);
      expect(text).toContain('WORK EXPERIENCE');
      expect(text).not.toContain('Jan 2020');
    });

    it('should preserve newlines in description', () => {
      const resume = createMockResume({
        workExperience: [
          {
            ...createMockResume().workExperience[0],
            description: 'Line 1\nLine 2\nLine 3',
          },
        ],
      });
      const text = exportToText(resume);
      expect(text).toContain('Line 1\nLine 2\nLine 3');
    });

    it('should omit sections when arrays are empty', () => {
      const resume = createMockResume({
        skills: [],
        workExperience: [],
        education: [],
        projects: [],
        certifications: [],
        languages: [],
      });
      const text = exportToText(resume);
      expect(text).toContain('JOHN DOE');
      expect(text).not.toContain('WORK EXPERIENCE');
      expect(text).not.toContain('SKILLS');
      expect(text).not.toContain('EDUCATION');
      expect(text).not.toContain('PROJECTS');
      expect(text).not.toContain('CERTIFICATIONS');
      expect(text).not.toContain('LANGUAGES');
    });
  });

  // ── exportToHTML ──
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

    it('should handle empty resume', () => {
      const resume = createEmptyResumeForTest();
      const html = exportToHTML(resume);
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html');
      expect(html).not.toContain('WORK EXPERIENCE');
      expect(html).not.toContain('EDUCATION');
      expect(html).not.toContain('SKILLS');
      expect(html).not.toContain('PROJECTS');
      expect(html).not.toContain('CERTIFICATIONS');
      expect(html).not.toContain('LANGUAGES');
    });

    it('should NOT escape HTML-special characters in personal info fields', () => {
      const resume = createMockResume({
        personalInfo: {
          ...createMockResume().personalInfo,
          firstName: 'John <b>',
          lastName: 'Doe > "test"',
        },
      });
      const html = exportToHTML(resume);
      expect(html).toContain('John <b>');
      expect(html).toContain('Doe > "test"');
    });
  });

  // TODO: Enable once exportToHTML sanitization is implemented. See: future XSS fix change.
  describe('exportToHTML - XSS Exposure (live gap)', () => {
    it.skip('should NOT sanitize script tags in summary (live gap)', () => {
      const resume = createMockResume({ summary: '<script>alert(1)</script>' });
      const html = exportToHTML(resume);
      expect(html).toContain('<script>alert(1)</script>');
    });

    it.skip('should NOT sanitize onerror handlers in descriptions (live gap)', () => {
      const resume = createMockResume({
        workExperience: [
          {
            ...createMockResume().workExperience[0],
            description: '<img src=x onerror=alert(1)>',
          },
        ],
      });
      const html = exportToHTML(resume);
      expect(html).toContain('<img src=x onerror=alert(1)>');
    });

    it.skip('should NOT escape HTML entities in company name (live gap)', () => {
      const resume = createMockResume({
        workExperience: [
          {
            ...createMockResume().workExperience[0],
            company: 'Tech &amp; Co',
          },
        ],
      });
      const html = exportToHTML(resume);
      expect(html).toContain('Tech &amp; Co');
      expect(html).not.toContain('Tech &amp;amp; Co');
    });
  });

  // ── exportToJSON ──
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

    it('should handle special characters with valid escapes', () => {
      const resume = createMockResume({
        summary: 'Unicode: 🔥 \n Quotes: "test" \n Backslash: \\',
      });
      const json = exportToJSON(resume);
      const parsed = JSON.parse(json);
      expect(parsed.summary).toBe('Unicode: 🔥 \n Quotes: "test" \n Backslash: \\');
    });

    it('should handle empty resume', () => {
      const resume = createEmptyResumeForTest();
      const json = exportToJSON(resume);
      const parsed = JSON.parse(json);
      expect(parsed.personalInfo.firstName).toBe('');
      expect(parsed.workExperience).toEqual([]);
      expect(parsed.skills).toEqual([]);
      expect(parsed.education).toEqual([]);
      expect(parsed.projects).toEqual([]);
    });
  });

  // ── downloadFile ──
  describe('downloadFile', () => {
    it('should create Blob with correct MIME type', () => {
      downloadFile('hello', 'test.txt', 'text/plain');
      expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
      const blob = createObjectURLSpy.mock.calls[0][0];
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('text/plain');
    });

    it('should set anchor href to blob URL and download attribute', () => {
      downloadFile('hello', 'test.txt', 'text/plain');
      expect(appendChildSpy).toHaveBeenCalledTimes(1);
      const anchor = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
      expect(anchor.href).toBe('blob:mock-url');
      expect(anchor.download).toBe('test.txt');
    });

    it('should append, click, then remove anchor from body', () => {
      downloadFile('hello', 'test.txt', 'text/plain');
      expect(appendChildSpy).toHaveBeenCalledTimes(1);
      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(removeChildSpy).toHaveBeenCalledTimes(1);
      const appended = appendChildSpy.mock.calls[0][0];
      const removed = removeChildSpy.mock.calls[0][0];
      expect(appended).toBe(removed);
      expect(appended).toBeInstanceOf(HTMLAnchorElement);
    });

    it('should call URL.revokeObjectURL exactly once after download', () => {
      downloadFile('hello', 'test.txt', 'text/plain');
      expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
      expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
    });
  });

  // ── exportToDOCX ──
  describe('exportToDOCX', () => {
    it('should wrap HTML in Word XML namespaces', async () => {
      const resume = createMockResume();
      exportToDOCX(resume);
      expect(appendChildSpy).toHaveBeenCalledTimes(1);
      const anchor = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
      const blob = createObjectURLSpy.mock.calls[0][0] as Blob;
      const content = await blob.text();
      expect(content).toContain('xmlns:o="urn:schemas-microsoft-com:office:office"');
      expect(content).toContain('xmlns:w="urn:schemas-microsoft-com:office:word"');
      expect(anchor.download).toBe('John_Doe_resume.doc');
      expect(removeChildSpy).toHaveBeenCalledTimes(1);
      expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
    });

    it('should use exportToHTML output inside Word body', async () => {
      const resume = createMockResume();
      exportToDOCX(resume);
      const blob = createObjectURLSpy.mock.calls[0][0] as Blob;
      const content = await blob.text();
      expect(content).toContain('<body>');
      expect(content).toContain('John Doe');
      expect(content).toContain('Tech Corp');
      expect(removeChildSpy).toHaveBeenCalledTimes(1);
      expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
    });

    it('should create Blob with application/msword MIME', () => {
      const resume = createMockResume();
      exportToDOCX(resume);
      const blob = createObjectURLSpy.mock.calls[0][0] as Blob;
      expect(blob.type).toBe('application/msword');
      expect(removeChildSpy).toHaveBeenCalledTimes(1);
      expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
    });

    it('should generate filename {firstName}_{lastName}_resume.doc', () => {
      const resume = createMockResume();
      exportToDOCX(resume);
      expect(appendChildSpy).toHaveBeenCalledTimes(1);
      const anchor = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
      expect(anchor.download).toBe('John_Doe_resume.doc');
      expect(removeChildSpy).toHaveBeenCalledTimes(1);
      expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle empty resume', async () => {
      const resume = createEmptyResumeForTest();
      exportToDOCX(resume);
      expect(appendChildSpy).toHaveBeenCalledTimes(1);
      const anchor = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
      const blob = createObjectURLSpy.mock.calls[0][0] as Blob;
      const content = await blob.text();
      expect(content).toContain('<!DOCTYPE html>');
      expect(content).toContain('<body>');
      expect(anchor.download).toBe('__resume.doc');
      expect(removeChildSpy).toHaveBeenCalledTimes(1);
      expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
    });

    it.skip('should NOT sanitize XSS payloads in DOCX output (live gap)', async () => {
      const resume = createMockResume({ summary: '<script>alert(1)</script>' });
      exportToDOCX(resume);
      const blob = createObjectURLSpy.mock.calls[0][0] as Blob;
      const content = await blob.text();
      expect(content).toContain('<script>alert(1)</script>');
    });
  });

  // ── exportToPDF ──
  describe('exportToPDF', () => {
    it('should resolve dynamic imports for html2canvas-pro and jspdf', async () => {
      const mockElement = document.createElement('div');
      await exportToPDF(mockElement, 'test');
      const { jsPDF } = await import('jspdf');
      expect(jsPDF).toHaveBeenCalledWith({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    });

    it('should add white background to page', async () => {
      const mockElement = document.createElement('div');
      await exportToPDF(mockElement, 'test');
      const { jsPDF: JsPdfMock } = await import('jspdf');
      const instance = (JsPdfMock as unknown as ReturnType<typeof vi.fn>).mock.results[0].value;
      expect(instance.setFillColor).toHaveBeenCalledWith(255, 255, 255);
      expect(instance.rect).toHaveBeenCalledWith(0, 0, 210, 297, 'F');
    });

    it('should add the captured image and save the PDF', async () => {
      const mockElement = document.createElement('div');
      await exportToPDF(mockElement, 'test');
      const { jsPDF: JsPdfMock } = await import('jspdf');
      const instance = (JsPdfMock as unknown as ReturnType<typeof vi.fn>).mock.results[0].value;
      expect(instance.addImage).toHaveBeenCalledOnce();
      expect(instance.save).toHaveBeenCalledWith('test.pdf');
    });

    it('should fill by width when canvas aspect matches A4 (portrait)', async () => {
      // A4 aspect: 210/297 ≈ 0.707. Canvas at 1588x2245 ≈ 0.707 → portrait match
      const mockElement = document.createElement('div');
      await exportToPDF(mockElement, 'test');
      const { jsPDF: JsPdfMock } = await import('jspdf');
      const instance = (JsPdfMock as unknown as ReturnType<typeof vi.fn>).mock.results[0].value;
      // Aspect matches ≈ A4 → fill by width → centered vertically
      const args = instance.addImage.mock.calls[0];
      expect(args[1]).toBe('JPEG');          // format
      expect(args[2]).toBe(0);               // x — centered horizontally? No, fill by width means x=0
      expect(args[4]).toBeCloseTo(210, 0);   // width = A4 width
    });

    it('should add image at A4-filling dimensions when canvas matches A4 aspect', async () => {
      // Default mock is 2100x2970 (exact A4 aspect). After white rect, expect
      // fill-by-width: (x=0, y=0, width=210, height=297).
      const mockElement = document.createElement('div');
      await exportToPDF(mockElement, 'test');
      const { jsPDF: JsPdfMock } = await import('jspdf');
      const instance = (JsPdfMock as unknown as ReturnType<typeof vi.fn>).mock.results[0].value;
      const args = instance.addImage.mock.calls[0];
      expect(args[1]).toBe('JPEG');
      expect(args[2]).toBe(0);                 // x = 0 (full width)
      expect(args[3]).toBe(0);                 // y = 0 (full height)
      expect(args[4]).toBeCloseTo(210, 0);     // width = A4 width
      expect(args[5]).toBeCloseTo(297, 0);     // height = A4 height (proportional)
    });
  });
});
