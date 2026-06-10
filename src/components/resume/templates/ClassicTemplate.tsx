import { Resume } from '@/types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import { TechIcon } from '@/components/ui/TechIcon';

interface ClassicTemplateProps {
  resume: Resume;
}

/**
 * Classic template - Traditional professional format
 */
export function ClassicTemplate({ resume }: ClassicTemplateProps) {
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
  const themeColor = resume.themeColor || '#374151';

  const hasContent = (arr: unknown[]) => arr && arr.length > 0;
  const hasString = (str: string) => str && str.trim().length > 0;

  return (
    <div className="w-full bg-white text-gray-900 font-times font-sans">
      {/* Header */}
      <header className="text-center border-b-4 pb-4" style={{ borderColor: themeColor }}>
        <h1 className="text-3xl font-bold uppercase tracking-wider" style={{ color: themeColor }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm">
          {hasString(personalInfo.email) && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> {personalInfo.email}
            </span>
          )}
          {hasString(personalInfo.phone) && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> {personalInfo.phone}
            </span>
          )}
          {hasString(personalInfo.location) && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {hasString(summary) && (
        <section className="mt-4">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ borderColor: themeColor, color: themeColor }}
          >
            Professional Summary
          </h2>
          <p className="mt-2 text-sm text-gray-700">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {hasContent(workExperience) && (
        <section className="mt-4">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ borderColor: themeColor, color: themeColor }}
          >
            Professional Experience
          </h2>
          <div className="mt-3 space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span className="text-sm italic">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-semibold">
                  {exp.company}
                  {exp.location && `, ${exp.location}`}
                </p>
                {hasString(exp.description) && (
                  <p className="mt-1 text-sm text-gray-700">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {hasContent(education) && (
        <section className="mt-4">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ borderColor: themeColor, color: themeColor }}
          >
            Education
          </h2>
          <div className="mt-3 space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <span className="text-sm italic">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p className="text-sm">
                  {edu.institution}
                  {edu.location && `, ${edu.location}`}
                </p>
                {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <section className="mt-4">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ borderColor: themeColor, color: themeColor }}
          >
            Skills
          </h2>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {skills.map((s) => (
              <span key={s.id} className="inline-flex items-center gap-1">
                <TechIcon name={s.name} className="flex-shrink-0 w-3.5 h-3.5" />
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <section className="mt-4">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ borderColor: themeColor, color: themeColor }}
          >
            Projects
          </h2>
          <div className="mt-3 space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-bold">{proj.name}</h3>
                {hasString(proj.description) && <p className="text-sm">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {hasContent(certifications) && (
        <section className="mt-4">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ borderColor: themeColor, color: themeColor }}
          >
            Certifications
          </h2>
          <p className="mt-2 text-sm">
            {certifications.map((c) => `${c.name} (${c.issuer})`).join(' • ')}
          </p>
        </section>
      )}

      {/* Languages */}
      {hasContent(languages) && (
        <section className="mt-4">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ borderColor: themeColor, color: themeColor }}
          >
            Languages
          </h2>
          <div className="mt-2 text-sm inline-flex flex-wrap gap-x-3 gap-y-1">
            {languages.map((l) => (
              <span key={l.id} className="inline-flex items-center gap-1.5">
                <TechIcon
                  name={l.name}
                  iconKey={l.iconKey}
                  showDefault={false}
                  className="flex-shrink-0 w-4 h-4"
                />
                {l.name} ({l.proficiency})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
