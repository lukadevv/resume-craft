import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useResumeStore } from '@/store/resume';
import { createEmptyResume, TemplateType } from '@/types/resume';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

beforeEach(() => {
  useResumeStore.setState({ resumes: [], currentResume: null });
  useResumeStore.persist.clearStorage();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('createResume', () => {
  it('creates a resume with default template modern, name My Resume, and a UUID', () => {
    const resume = useResumeStore.getState().createResume();

    expect(resume.template).toBe('modern');
    expect(resume.name).toBe('My Resume');
    expect(resume.id).toMatch(UUID_REGEX);
  });

  it('adds the new resume to resumes and sets it as currentResume', () => {
    const resume = useResumeStore.getState().createResume();
    const state = useResumeStore.getState();

    expect(state.resumes).toHaveLength(1);
    expect(state.currentResume?.id).toBe(resume.id);
  });

  it('uses custom template and initialData via object param', () => {
    const template: TemplateType = 'creative';
    const resume = useResumeStore.getState().createResume({ template, initialData: { name: 'Dev CV' } });

    expect(resume.template).toBe('creative');
    expect(resume.name).toBe('Dev CV');
  });

  it('does NOT auto-fill sample data — starts with empty resume fields', () => {
    const resume = useResumeStore.getState().createResume({ template: 'modern' });

    expect(resume.summary).toBe('');
    expect(resume.workExperience).toHaveLength(0);
    expect(resume.education).toHaveLength(0);
    expect(resume.skills).toHaveLength(0);
    expect(resume.projects).toHaveLength(0);
    expect(resume.personalInfo.firstName).toBe('');
    expect(resume.personalInfo.lastName).toBe('');
  });

  it('allows initialData to populate specific fields without sample data contamination', () => {
    const resume = useResumeStore
      .getState()
      .createResume({ template: 'modern', initialData: { name: 'Custom', summary: 'A summary' } });

    expect(resume.name).toBe('Custom');
    expect(resume.summary).toBe('A summary');
    // No sample data: other fields remain empty
    expect(resume.workExperience).toHaveLength(0);
    expect(resume.skills).toHaveLength(0);
    expect(resume.personalInfo.firstName).toBe('');
  });

  it('sets the resume name from options.name and allows initialData.name to override', () => {
    // options.name sets the base name; initialData.name can override it
    const resume = useResumeStore
      .getState()
      .createResume({ name: 'Software Engineer Resume', initialData: { name: 'Final Name' } });

    expect(resume.name).toBe('Final Name');
  });

  it('uses options.name as the resume name when no initialData.name is given', () => {
    const resume = useResumeStore
      .getState()
      .createResume({ name: 'Software Engineer Resume', template: 'creative' });

    expect(resume.name).toBe('Software Engineer Resume');
    expect(resume.template).toBe('creative');
  });

  it('allows initialData.id to override the generated UUID', () => {
    const resume = useResumeStore.getState().createResume({ template: 'modern', initialData: { id: 'forced' } });
    expect(resume.id).toBe('forced');
  });
});

describe('createEmptyResume defaults for new role-specific fields', () => {
  it('returns all 17 new fields with correct empty defaults', () => {
    const resume = createEmptyResume();

    // String array fields
    expect(resume.tools).toEqual([]);
    expect(resume.coreCompetencies).toEqual([]);
    expect(resume.achievements).toEqual([]);
    expect(resume.awards).toEqual([]);
    expect(resume.affiliations).toEqual([]);
    expect(resume.clinicalSkills).toEqual([]);
    expect(resume.practiceAreas).toEqual([]);

    // Scalar string fields
    expect(resume.portfolio).toBe('');
    expect(resume.securityClearance).toBe('');
    expect(resume.teachingPhilosophy).toBe('');
    expect(resume.classroomExperience).toBe('');

    // Structured array fields
    expect(resume.publications).toEqual([]);
    expect(resume.grantsFellowships).toEqual([]);
    expect(resume.conferences).toEqual([]);
    expect(resume.licenses).toEqual([]);
    expect(resume.barAdmission).toEqual([]);
    expect(resume.teachingExperience).toEqual([]);
  });
});

describe('updateResume', () => {
  it('updates the name of an existing resume', () => {
    const created = useResumeStore.getState().createResume();
    const originalUpdatedAt = created.updatedAt;

    vi.useFakeTimers({ toFake: ['Date'] });
    vi.advanceTimersByTime(1000);

    useResumeStore.getState().updateResume(created.id, { name: 'Updated Name' });

    const updated = useResumeStore.getState().resumes.find((r) => r.id === created.id);
    expect(updated?.name).toBe('Updated Name');
    expect(new Date(updated!.updatedAt).getTime()).toBeGreaterThan(new Date(originalUpdatedAt).getTime());
  });

  it('syncs currentResume when the updated id matches', () => {
    const created = useResumeStore.getState().createResume();

    useResumeStore.getState().updateResume(created.id, { themeColor: '#FFF' });

    expect(useResumeStore.getState().currentResume?.themeColor).toBe('#FFF');
  });

  it('leaves currentResume unchanged when updating a different resume', () => {
    const a = useResumeStore.getState().createResume();
    const b = useResumeStore.getState().createResume();

    useResumeStore.getState().updateResume(a.id, { name: 'Changed' });

    expect(useResumeStore.getState().currentResume?.id).toBe(b.id);
    expect(useResumeStore.getState().currentResume?.name).toBe(b.name);
  });

  it('is a no-op when the id does not exist', () => {
    useResumeStore.getState().createResume();
    const before = useResumeStore.getState();

    useResumeStore.getState().updateResume('nonexistent', { name: 'X' });

    const after = useResumeStore.getState();
    expect(after.resumes.length).toBe(before.resumes.length);
    expect(after.currentResume?.id).toBe(before.currentResume?.id);
    expect(after.resumes[0].name).toBe(before.resumes[0].name);
  });

  it('allows updateResume to change the resume id', () => {
    const created = useResumeStore.getState().createResume();
    const oldId = created.id;
    useResumeStore.getState().updateResume(created.id, { id: 'new-id' });
    const updated = useResumeStore.getState().resumes.find((r) => r.id === 'new-id');
    expect(updated).toBeDefined();
    expect(updated?.id).toBe('new-id');
    expect(useResumeStore.getState().currentResume?.id).toBe('new-id');
    expect(useResumeStore.getState().resumes).toHaveLength(1);
    expect(useResumeStore.getState().resumes.find((r) => r.id === oldId)).toBeUndefined();
  });
});

describe('deleteResume', () => {
  it('removes the current resume and clears currentResume', () => {
    const a = useResumeStore.getState().createResume();
    useResumeStore.getState().createResume();

    useResumeStore.getState().setCurrentResume(a.id);
    useResumeStore.getState().deleteResume(a.id);

    expect(useResumeStore.getState().resumes).toHaveLength(1);
    expect(useResumeStore.getState().currentResume).toBeNull();
  });

  it('removes a non-current resume while preserving currentResume', () => {
    const a = useResumeStore.getState().createResume();
    const b = useResumeStore.getState().createResume();

    useResumeStore.getState().setCurrentResume(a.id);

    useResumeStore.getState().deleteResume(b.id);

    expect(useResumeStore.getState().resumes).toHaveLength(1);
    expect(useResumeStore.getState().currentResume?.id).toBe(a.id);
  });

  it('is a no-op when the id does not exist', () => {
    useResumeStore.getState().createResume();
    const before = useResumeStore.getState();

    useResumeStore.getState().deleteResume('nonexistent');

    const after = useResumeStore.getState();
    expect(after.resumes.length).toBe(before.resumes.length);
    expect(after.resumes[0].name).toBe(before.resumes[0].name);
  });
});

describe('setCurrentResume', () => {
  it('sets currentResume to the resume with the given id', () => {
    useResumeStore.getState().createResume();
    const b = useResumeStore.getState().createResume();

    useResumeStore.getState().setCurrentResume(b.id);

    expect(useResumeStore.getState().currentResume?.id).toBe(b.id);
  });

  it('clears currentResume when given null', () => {
    useResumeStore.getState().createResume();

    useResumeStore.getState().setCurrentResume(null);

    expect(useResumeStore.getState().currentResume).toBeNull();
  });

  it('sets currentResume to null when the id does not exist', () => {
    useResumeStore.getState().createResume();

    useResumeStore.getState().setCurrentResume('nonexistent');

    expect(useResumeStore.getState().currentResume).toBeNull();
  });
});

describe('getResumeById', () => {
  it('returns the correct resume for an existing id', () => {
    useResumeStore.getState().createResume();
    const b = useResumeStore.getState().createResume();

    const found = useResumeStore.getState().getResumeById(b.id);

    expect(found?.id).toBe(b.id);
  });

  it('returns undefined for a non-existent id', () => {
    useResumeStore.getState().createResume();

    const found = useResumeStore.getState().getResumeById('nonexistent');

    expect(found).toBeUndefined();
  });
});

describe('duplicateResume', () => {
  it('clones with new id, appends " (Copy)", and new createdAt', () => {
    const original = useResumeStore.getState().createResume({ template: 'modern', initialData: { name: 'Original' } });

    const duplicate = useResumeStore.getState().duplicateResume(original.id);

    expect(duplicate).toBeDefined();
    expect(duplicate!.id).not.toBe(original.id);
    expect(duplicate!.id).toMatch(UUID_REGEX);
    expect(duplicate!.name).toBe('Original (Copy)');
    expect(new Date(duplicate!.createdAt).getTime()).toBeGreaterThanOrEqual(new Date(original.createdAt).getTime());
    expect(new Date(duplicate!.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(original.updatedAt).getTime());
  });

  it('adds to resumes list and does not change currentResume', () => {
    const original = useResumeStore.getState().createResume();

    useResumeStore.getState().duplicateResume(original.id);

    expect(useResumeStore.getState().resumes).toHaveLength(2);
    expect(useResumeStore.getState().currentResume?.id).toBe(original.id);
  });

  it('returns undefined for a non-existent id', () => {
    const result = useResumeStore.getState().duplicateResume('nonexistent');

    expect(result).toBeUndefined();
  });

  it('performs a shallow copy so nested objects are shared with the original', () => {
    const original = useResumeStore.getState().createResume();
    const duplicate = useResumeStore.getState().duplicateResume(original.id)!;

    duplicate.personalInfo.firstName = 'Modified';

    const originalAfter = useResumeStore.getState().getResumeById(original.id);
    expect(originalAfter?.personalInfo.firstName).toBe('Modified');
  });
});

describe('persist middleware', () => {
  it('persists resumes to localStorage but not currentResume', () => {
    const resume = useResumeStore.getState().createResume();

    const raw = localStorage.getItem('resume-craft-storage');
    expect(raw).toBeTruthy();

    const parsed = JSON.parse(raw!);
    expect(parsed.state.resumes).toHaveLength(1);
    expect(parsed.state.resumes[0].id).toBe(resume.id);
    expect(parsed.state.currentResume).toBeUndefined();
  });

  it('rehydrates resumes but currentResume remains null', async () => {
    const resume = useResumeStore.getState().createResume();
    const raw = localStorage.getItem('resume-craft-storage');

    useResumeStore.setState({ resumes: [], currentResume: null });
    localStorage.setItem('resume-craft-storage', raw!);
    await useResumeStore.persist.rehydrate();

    const state = useResumeStore.getState();
    expect(state.resumes).toHaveLength(1);
    expect(state.resumes[0].id).toBe(resume.id);
    expect(state.currentResume).toBeNull();
  });
});
