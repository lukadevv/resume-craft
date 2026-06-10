'use client';

import { Resume } from '@/types/resume';
import { TechIcon } from '@/components/ui/TechIcon';
import { capitalize } from '@/utils/strings';

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    projects,
    certifications,
    languages,
  } = resume;

  const hasContent = (section: unknown[]) => section && section.length > 0;
  const hasStringContent = (str: string) => str && str.trim().length > 0;

  return (
    <div className="bg-white text-gray-900 text-sm p-4 rounded-lg shadow-lg aspect-[210/297] overflow-hidden">
      {/* Header */}
      <div className="border-b-2 pb-3 mb-3" style={{ borderColor: resume.themeColor }}>
        <h1 className="text-xl font-bold" style={{ color: resume.themeColor }}>
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
      {hasStringContent(summary) && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase mb-1" style={{ color: resume.themeColor }}>
            Summary
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {hasContent(workExperience) && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase mb-1" style={{ color: resume.themeColor }}>
            Experience
          </h2>
          <div className="space-y-2">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-xs">{exp.position}</p>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {exp.company}
                  {exp.location && `, ${exp.location}`}
                </p>
                {exp.description && (
                  <p className="text-xs text-gray-700 mt-1 line-clamp-3">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {hasContent(education) && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase mb-1" style={{ color: resume.themeColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-xs">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </p>
                  <span className="text-xs text-gray-500">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {edu.institution}
                  {edu.location && `, ${edu.location}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase mb-1" style={{ color: resume.themeColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill) => (
              <span key={skill.id} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase mb-1" style={{ color: resume.themeColor }}>
            Projects
          </h2>
          <div className="space-y-1">
            {projects.map((proj) => (
              <div key={proj.id}>
                <p className="font-semibold text-xs">{proj.name}</p>
                {proj.description && (
                  <p className="text-xs text-gray-600 line-clamp-2">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {hasContent(languages) && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase mb-1" style={{ color: resume.themeColor }}>
            Languages
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {languages.map((lang) => (
              <span key={lang.id} className="inline-flex items-center gap-1.5">
                <TechIcon
                  name={lang.name}
                  iconKey={lang.iconKey}
                  showDefault={false}
                  className="flex-shrink-0 w-3.5 h-3.5"
                />
                {lang.name} ({capitalize(lang.proficiency)})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {hasContent(certifications) && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase mb-1" style={{ color: resume.themeColor }}>
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <p key={cert.id} className="text-xs">
                <span className="font-semibold">{cert.name}</span>
                {cert.issuer && ` - ${cert.issuer}`}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
