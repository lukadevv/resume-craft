'use client';

import {
  Resume,
  TemplateType,
  WorkExperience,
  Education,
  Skill,
  Project,
  Certification,
  Language,
} from '@/types/resume';
import { templateDefinitionMap } from '@/lib/templates';

interface PlaygroundPreviewProps {
  template: TemplateType;
  data: Partial<Resume>;
}

export function PlaygroundPreview({ template, data }: PlaygroundPreviewProps) {
  const templateDef = templateDefinitionMap[template];
  const themeColor = templateDef?.accentColor || '#3ECF8E';

  const personalInfo = data.personalInfo || {
    firstName: 'Your Name',
    lastName: '',
    email: 'your@email.com',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    portfolio: '',
    summary: '',
  };

  const summary = data.summary || '';
  const workExperience = data.workExperience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const projects = data.projects || [];
  const certifications = data.certifications || [];
  const languages = data.languages || [];

  const hasContent = (section: unknown[]) => section && section.length > 0;
  const hasStringContent = (str: string) => str && str.trim().length > 0;

  const layoutType = templateDef?.layoutType || 'single-column';
  const isTwoColumn = layoutType === 'two-column' || layoutType === 'split';
  const primarySections = templateDef?.primarySections || [];
  const sidebarSections = templateDef?.sidebarSections || [];

  const renderSidebar = () => {
    if (!isTwoColumn) return null;

    return (
      <div className="w-1/3 bg-gray-50 p-3 border-l">
        {/* Skills */}
        {hasContent(skills) && sidebarSections.includes('skills') && (
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase mb-2" style={{ color: themeColor }}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 8).map((skill: Skill) => (
                <span
                  key={skill.id}
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                >
                  {skill.name}
                </span>
              ))}
              {skills.length > 8 && (
                <span className="text-[10px] text-gray-500">+{skills.length - 8} more</span>
              )}
            </div>
          </div>
        )}

        {/* Languages */}
        {hasContent(languages) && sidebarSections.includes('languages') && (
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase mb-2" style={{ color: themeColor }}>
              Languages
            </h3>
            <div className="space-y-1">
              {languages.map((lang: Language) => (
                <p key={lang.id} className="text-[10px]">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-gray-500"> - {lang.proficiency}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {hasContent(education) && sidebarSections.includes('education') && (
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase mb-2" style={{ color: themeColor }}>
              Education
            </h3>
            <div className="space-y-2">
              {education.slice(0, 2).map((edu: Education) => (
                <div key={edu.id}>
                  <p className="text-[10px] font-semibold leading-tight">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </p>
                  <p className="text-[9px] text-gray-600">{edu.institution}</p>
                  <p className="text-[9px] text-gray-500">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {hasContent(certifications) && sidebarSections.includes('certifications') && (
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase mb-2" style={{ color: themeColor }}>
              Certifications
            </h3>
            <div className="space-y-1">
              {certifications.slice(0, 3).map((cert: Certification) => (
                <p key={cert.id} className="text-[10px] leading-tight">
                  <span className="font-semibold">{cert.name}</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="bg-white text-gray-900 text-sm rounded-lg shadow-xl aspect-[210/297] overflow-hidden flex"
      style={{
        background:
          templateDef?.background?.gradient || `linear-gradient(135deg, #f9fafb, #ffffff)`,
      }}
    >
      {/* Main Content */}
      <div className={`flex-1 p-4 ${isTwoColumn ? 'w-2/3' : 'w-full'}`}>
        {/* Header */}
        <div className="border-b-2 pb-3 mb-3" style={{ borderColor: themeColor }}>
          <h1 className="text-lg font-bold" style={{ color: themeColor }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {hasStringContent(personalInfo.email) && (
            <p className="text-xs text-gray-600">{personalInfo.email}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-600">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
          </div>
        </div>

        {/* Summary */}
        {hasStringContent(summary) && primarySections.includes('summary') && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase mb-1" style={{ color: themeColor }}>
              Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {hasContent(workExperience) && primarySections.includes('workExperience') && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase mb-1" style={{ color: themeColor }}>
              Experience
            </h2>
            <div className="space-y-2">
              {workExperience.slice(0, 3).map((exp: WorkExperience) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-xs">{exp.position}</p>
                    <span className="text-[10px] text-gray-500">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {exp.company}
                    {exp.location && `, ${exp.location}`}
                  </p>
                  {exp.description && (
                    <p className="text-[10px] text-gray-700 mt-1 line-clamp-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasContent(projects) && primarySections.includes('projects') && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase mb-1" style={{ color: themeColor }}>
              Projects
            </h2>
            <div className="space-y-1">
              {projects.slice(0, 2).map((proj: Project) => (
                <div key={proj.id}>
                  <p className="font-semibold text-xs">{proj.name}</p>
                  {proj.description && (
                    <p className="text-[10px] text-gray-600 line-clamp-2">{proj.description}</p>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[9px] px-1 rounded"
                          style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills (for single column) */}
        {!isTwoColumn && hasContent(skills) && primarySections.includes('skills') && (
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase mb-1" style={{ color: themeColor }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 10).map((skill: Skill) => (
                <span
                  key={skill.id}
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      {renderSidebar()}
    </div>
  );
}
