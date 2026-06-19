import { useTranslations } from 'next-intl';
import { Resume } from '@/types/resume';
import { TechIcon } from '@/components/ui/TechIcon';

interface MinimalTemplateProps {
  resume: Resume;
}

/**
 * Minimal template - Simple and elegant with focus on whitespace
 */
export function MinimalTemplate({ resume }: MinimalTemplateProps) {
  const t = useTranslations('section');
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
                {t('experience')}
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
                      {exp.startDate} - {exp.current ? t('present') : exp.endDate}
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
                {t('projects')}
              </h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-medium">{proj.name}</h3>
                    {hasString(proj.description) && (
                      <p className="text-sm text-gray-600">{proj.description}</p>
                    )}
                    {hasContent(proj.technologies) && (
                      <div className="inline-flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-gray-400 mt-1">
                        {proj.technologies.map((tech, i) => (
                          <span key={i} className="inline-flex items-center gap-0.5">
                            <TechIcon name={tech} className="flex-shrink-0 w-3 h-3" />
                            {tech}
                          </span>
                        ))}
                      </div>
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
                {t('skills')}
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <p key={skill.id} className="inline-flex items-center gap-1 text-sm text-gray-600">
                    <TechIcon name={skill.name} iconKey={skill.iconKey} className="flex-shrink-0 w-3.5 h-3.5" />
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
                {t('education')}
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-medium text-sm">
                      {edu.degree}
                      {edu.field && `${t('degreeField')}${edu.field}`}
                    </p>
                    <p className="text-sm text-gray-500">{edu.institution}</p>
                    <p className="text-xs text-gray-400">
                      {edu.startDate} - {edu.current ? t('present') : edu.endDate}
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
                {t('certifications')}
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
                {t('languages')}
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <p key={lang.id} className="text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1.5">
                      <TechIcon
                        name={lang.name}
                        iconKey={lang.iconKey}
                        showDefault={false}
                        className="flex-shrink-0 w-4 h-4"
                      />
                      {lang.name}
                    </span>
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
