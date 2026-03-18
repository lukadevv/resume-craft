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

function isDarkBackground(gradient?: string): boolean {
  if (!gradient) return false;
  const darkKeywords = [
    '#1f1c2c',
    '#3a1c71',
    '#1b1d24',
    '#3e2417',
    '#0f172a',
    '#111827',
    '#1e1b4b',
    '#312e81',
    '#0c1222',
    '#1e3a5f',
    '#0f2922',
    '#134e4a',
    '#164e63',
    '#0e7490',
    '#1e293b',
    '#334155',
    '#020617',
  ];
  return darkKeywords.some((color) => gradient.toLowerCase().includes(color));
}

function getTextColors(templateDef: { background?: { gradient?: string; overlayColor?: string } }) {
  const isDark =
    templateDef.background?.gradient && isDarkBackground(templateDef.background.gradient);

  return {
    primary: isDark ? '#ffffff' : '#111827',
    secondary: isDark ? '#d1d5db' : '#4b5563',
    muted: isDark ? '#9ca3af' : '#9ca3af',
    border: isDark ? '#374151' : '#e5e7eb',
  };
}

export function PlaygroundPreview({ template, data }: PlaygroundPreviewProps) {
  const templateDef = templateDefinitionMap[template];
  const themeColor = templateDef?.accentColor || '#3ECF8E';
  const textColors = getTextColors(templateDef || {});

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

    const sidebarBg =
      textColors.primary === '#ffffff' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)';

    return (
      <div className="w-1/3 p-3 border-l" style={{ backgroundColor: sidebarBg }}>
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
                  style={{ backgroundColor: `${themeColor}30`, color: textColors.primary }}
                >
                  {skill.name}
                </span>
              ))}
              {skills.length > 8 && (
                <span className="text-[10px]" style={{ color: textColors.muted }}>
                  +{skills.length - 8} more
                </span>
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
                <p key={lang.id} className="text-[10px]" style={{ color: textColors.primary }}>
                  <span className="font-medium">{lang.name}</span>
                  <span style={{ color: textColors.muted }}> - {lang.proficiency}</span>
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
                  <p
                    className="text-[10px] font-semibold leading-tight"
                    style={{ color: textColors.primary }}
                  >
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </p>
                  <p className="text-[9px]" style={{ color: textColors.secondary }}>
                    {edu.institution}
                  </p>
                  <p className="text-[9px]" style={{ color: textColors.muted }}>
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
                <p
                  key={cert.id}
                  className="text-[10px] leading-tight"
                  style={{ color: textColors.primary }}
                >
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
      className="text-sm rounded-lg shadow-xl aspect-[210/297] overflow-hidden flex"
      style={{
        background:
          templateDef?.background?.gradient || `linear-gradient(135deg, #f9fafb, #ffffff)`,
        color: textColors.primary,
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
            <p className="text-xs" style={{ color: textColors.secondary }}>
              {personalInfo.email}
            </p>
          )}
          <div
            className="flex flex-wrap gap-2 mt-1 text-xs"
            style={{ color: textColors.secondary }}
          >
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
            <p
              className="text-xs leading-relaxed line-clamp-3"
              style={{ color: textColors.secondary }}
            >
              {summary}
            </p>
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
                    <p className="font-semibold text-xs" style={{ color: textColors.primary }}>
                      {exp.position}
                    </p>
                    <span className="text-[10px]" style={{ color: textColors.muted }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: textColors.secondary }}>
                    {exp.company}
                    {exp.location && `, ${exp.location}`}
                  </p>
                  {exp.description && (
                    <p
                      className="text-[10px] mt-1 line-clamp-2"
                      style={{ color: textColors.secondary }}
                    >
                      {exp.description}
                    </p>
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
                  <p className="font-semibold text-xs" style={{ color: textColors.primary }}>
                    {proj.name}
                  </p>
                  {proj.description && (
                    <p className="text-[10px] line-clamp-2" style={{ color: textColors.secondary }}>
                      {proj.description}
                    </p>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[9px] px-1 rounded"
                          style={{ backgroundColor: `${themeColor}30`, color: textColors.primary }}
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
                  style={{ backgroundColor: `${themeColor}30`, color: textColors.primary }}
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
