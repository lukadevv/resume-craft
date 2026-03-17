'use client';

import { useState } from 'react';
import {
  Resume,
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  Project,
  Certification,
  Language,
} from '@/types/resume';
import { generateUUID } from '@/utils/random';

interface EditDetailsPanelProps {
  data: Partial<Resume>;
  onChange: (data: Partial<Resume>) => void;
  onClose: () => void;
}

type TabId =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages';

export function EditDetailsPanel({ data, onChange, onClose }: EditDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('personal');

  const tabs: { id: TabId; label: string }[] = [
    { id: 'personal', label: 'Personal' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'languages', label: 'Languages' },
  ];

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    onChange({
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      } as PersonalInfo,
    });
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: generateUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({
      workExperience: [...(data.workExperience || []), newExp],
    });
  };

  const updateWorkExperience = (
    id: string,
    field: keyof WorkExperience,
    value: string | boolean
  ) => {
    onChange({
      workExperience: (data.workExperience || []).map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeWorkExperience = (id: string) => {
    onChange({
      workExperience: (data.workExperience || []).filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: generateUUID(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      achievements: '',
    };
    onChange({
      education: [...(data.education || []), newEdu],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    onChange({
      education: (data.education || []).map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      education: (data.education || []).filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: generateUUID(),
      name: '',
      level: 'intermediate',
      category: 'General',
    };
    onChange({
      skills: [...(data.skills || []), newSkill],
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onChange({
      skills: (data.skills || []).map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  const removeSkill = (id: string) => {
    onChange({
      skills: (data.skills || []).filter((skill) => skill.id !== id),
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: generateUUID(),
      name: '',
      description: '',
      url: '',
      technologies: [],
      startDate: '',
      endDate: '',
      current: false,
    };
    onChange({
      projects: [...(data.projects || []), newProject],
    });
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[] | boolean) => {
    onChange({
      projects: (data.projects || []).map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      projects: (data.projects || []).filter((proj) => proj.id !== id),
    });
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: generateUUID(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: '',
    };
    onChange({
      certifications: [...(data.certifications || []), newCert],
    });
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange({
      certifications: (data.certifications || []).map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      certifications: (data.certifications || []).filter((cert) => cert.id !== id),
    });
  };

  const addLanguage = () => {
    const newLang: Language = {
      id: generateUUID(),
      name: '',
      proficiency: 'intermediate',
    };
    onChange({
      languages: [...(data.languages || []), newLang],
    });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onChange({
      languages: (data.languages || []).map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      languages: (data.languages || []).filter((lang) => lang.id !== id),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Edit Resume Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 py-2 border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-foreground-secondary hover:bg-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    value={data.personalInfo?.firstName || ''}
                    onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    value={data.personalInfo?.lastName || ''}
                    onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={data.personalInfo?.email || ''}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={data.personalInfo?.phone || ''}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={data.personalInfo?.location || ''}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <input
                  type="url"
                  value={data.personalInfo?.website || ''}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                <input
                  type="text"
                  value={data.personalInfo?.linkedin || ''}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Portfolio</label>
                <input
                  type="url"
                  value={data.personalInfo?.portfolio || ''}
                  onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div>
              <label className="block text-sm font-medium mb-1">Professional Summary</label>
              <textarea
                value={data.summary || ''}
                onChange={(e) => onChange({ summary: e.target.value })}
                rows={6}
                placeholder="Write a brief professional summary..."
                className="w-full px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none resize-none"
              />
              <p className="text-xs text-foreground-secondary mt-2">
                Write 2-4 sentences highlighting your experience, skills, and career goals.
              </p>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              {(data.workExperience || []).map((exp, index) => (
                <div key={exp.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Position {index + 1}</h4>
                    <button
                      onClick={() => removeWorkExperience(exp.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                        placeholder="YYYY-MM"
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">End Date</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="YYYY-MM"
                        disabled={exp.current}
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => updateWorkExperience(exp.id, 'current', e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-sm">
                      I currently work here
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addWorkExperience}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors"
              >
                + Add Work Experience
              </button>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              {(data.education || []).map((edu, index) => (
                <div key={edu.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Education {index + 1}</h4>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Location</label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Field of Study</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Start Date</label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        placeholder="YYYY-MM"
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">End Date</label>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        placeholder="YYYY-MM"
                        disabled={edu.current}
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">GPA</label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addEducation}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors"
              >
                + Add Education
              </button>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              {(data.skills || []).map((skill) => (
                <div key={skill.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    placeholder="Skill name"
                    className="flex-1 px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={addSkill}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors"
              >
                + Add Skill
              </button>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {(data.projects || []).map((proj, index) => (
                <div key={proj.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Project {index + 1}</h4>
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Project Name</label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Description</label>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">URL</label>
                    <input
                      type="url"
                      value={proj.url}
                      onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addProject}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors"
              >
                + Add Project
              </button>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              {(data.certifications || []).map((cert, index) => (
                <div key={cert.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Certification {index + 1}</h4>
                    <button
                      onClick={() => removeCertification(cert.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Name</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Issuer</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Date</label>
                      <input
                        type="text"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                        placeholder="YYYY-MM"
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Credential ID</label>
                      <input
                        type="text"
                        value={cert.credentialId}
                        onChange={(e) =>
                          updateCertification(cert.id, 'credentialId', e.target.value)
                        }
                        className="w-full px-2 py-1.5 text-sm border rounded bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addCertification}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors"
              >
                + Add Certification
              </button>
            </div>
          )}

          {/* Languages Tab */}
          {activeTab === 'languages' && (
            <div className="space-y-4">
              {(data.languages || []).map((lang) => (
                <div key={lang.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={lang.name}
                    onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                    placeholder="Language"
                    className="flex-1 px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <select
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                    className="px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="fluent">Fluent</option>
                    <option value="native">Native</option>
                  </select>
                  <button
                    onClick={() => removeLanguage(lang.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={addLanguage}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors"
              >
                + Add Language
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-surface transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
