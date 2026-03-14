import { Resume } from '@/types/resume';

interface MinimalTemplateProps {
  resume: Resume;
}

/**
 * Minimal template - Simple and elegant with focus on whitespace
 */
export function MinimalTemplate({ resume }: MinimalTemplateProps) {
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
  const themeColor = resume.themeColor || '#6B7280';

  const hasContent = (arr: unknown[]) => arr && arr.length > 0;
  const hasString = (str: string) => str && str.trim().length > 0;

  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      {/* Header - Minimal */}
      <header className="px-8 py-10 text-center">
        <h1 className="text-4xl font-light tracking-tight">
          {personalInfo.firstName} <span className="font-bold">{personalInfo.lastName}</span>
        </h1>

        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-500">
          {hasString(personalInfo.email) && <span>{personalInfo.email}</span>}
          {hasString(personalInfo.phone) && <span>{personalInfo.phone}</span>}
          {hasString(personalInfo.location) && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {/* Divider */}
      <div className="w-16 h-px mx-auto" style={{ backgroundColor: themeColor }} />

      {/* Summary */}
      {hasString(summary) && (
        <section className="px-8 py-6">
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto text-center">{summary}</p>
        </section>
      )}

      {/* Two Column Layout */}
      <div className="px-8 py-6 grid grid-cols-12 gap-8">
        {/* Left Column - Experience */}
        <div className="col-span-8">
          {hasContent(workExperience) && (
            <section className="mb-6">
              <h2
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: themeColor }}
              >
                Experience
              </h2>
              <div className="space-y-5">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l border-gray-200">
                    <div
                      className="absolute left-[-3px] top-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: themeColor }}
                    />
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-sm text-gray-500">{exp.company}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    {hasString(exp.description) && (
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasContent(projects) && (
            <section>
              <h2
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: themeColor }}
              >
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-medium">{proj.name}</h3>
                    {hasString(proj.description) && (
                      <p className="text-sm text-gray-600">{proj.description}</p>
                    )}
                    {hasContent(proj.technologies) && (
                      <p className="text-xs text-gray-400 mt-1">{proj.technologies.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Skills & Education */}
        <div className="col-span-4 space-y-8">
          {hasContent(skills) && (
            <section>
              <h2
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: themeColor }}
              >
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <p key={skill.id} className="text-sm text-gray-600">
                    {skill.name}
                  </p>
                ))}
              </div>
            </section>
          )}

          {hasContent(education) && (
            <section>
              <h2
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: themeColor }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-medium text-sm">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </p>
                    <p className="text-sm text-gray-500">{edu.institution}</p>
                    <p className="text-xs text-gray-400">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasContent(certifications) && (
            <section>
              <h2
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: themeColor }}
              >
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <p key={cert.id} className="text-sm text-gray-600">
                    {cert.name}
                  </p>
                ))}
              </div>
            </section>
          )}

          {hasContent(languages) && (
            <section>
              <h2
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: themeColor }}
              >
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <p key={lang.id} className="text-sm text-gray-600">
                    {lang.name}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
