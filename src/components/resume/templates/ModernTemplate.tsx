import { useTranslations } from 'next-intl';
import { Resume } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import { TechIcon } from '@/components/ui/TechIcon';

interface ModernTemplateProps {
  resume: Resume;
}

/**
 * Modern template - Clean and contemporary design with accent colors
 */
export function ModernTemplate({ resume }: ModernTemplateProps) {
  const t = useTranslations('section');
  const {
    personalInfo,
    workExperience,
    education,
    skills,
    projects,
    certifications,
    languages,
  } = resume;
  const themeColor = resume.themeColor || '#3ECF8E';

  const hasContent = (arr: unknown[]) => arr && arr.length > 0;
  const hasString = (str: string) => str && str.trim().length > 0;

  return (
    <div className="w-full bg-white text-gray-900 font-sans @container">
      {/* Header */}
      <header
        className="bg-gradient-to-r from-gray-50 to-white border-b-2"
        style={{ borderColor: themeColor }}
      >
        <div className="p-6">
          <h1 className="text-3xl font-bold" style={{ color: themeColor }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {hasString(personalInfo.summary) && (
            <p className="mt-2 text-gray-600 max-w-2xl">{personalInfo.summary}</p>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            {hasString(personalInfo.email) && (
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" style={{ color: themeColor }} />
                {personalInfo.email}
              </span>
            )}
            {hasString(personalInfo.phone) && (
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" style={{ color: themeColor }} />
                {personalInfo.phone}
              </span>
            )}
            {hasString(personalInfo.location) && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" style={{ color: themeColor }} />
                {personalInfo.location}
              </span>
            )}
            {hasString(personalInfo.linkedin) && (
              <span className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" style={{ color: themeColor }} />
                {personalInfo.linkedin}
              </span>
            )}
            {hasString(personalInfo.website) && (
              <span className="flex items-center gap-1">
                <Globe className="h-4 w-4" style={{ color: themeColor }} />
                {personalInfo.website}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-col @min-md:grid @min-md:grid-cols-12">
        {/* Left Sidebar */}
        <aside className="@min-md:col-span-4 bg-gray-50 p-6">
          {/* Skills */}
          {hasContent(skills) && (
            <section className="mb-6">
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: themeColor }}
              >
                {t('skills')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 text-xs bg-white px-3 py-1 rounded-full border"
                    style={{ borderColor: themeColor, color: themeColor }}
                  >
                    <TechIcon name={skill.name} iconKey={skill.iconKey} className="flex-shrink-0 w-3.5 h-3.5" />
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {hasContent(education) && (
            <section className="mb-6">
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: themeColor }}
              >
                {t('education')}
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-sm">
                      {edu.degree}
                      {edu.field && `${t('degreeField')}${edu.field}`}
                    </p>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} - {edu.current ? t('present') : edu.endDate}
                      {edu.gpa && ` • ${t('gpa')}${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {hasContent(languages) && (
            <section className="mb-6">
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: themeColor }}
              >
                {t('languages')}
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <p key={lang.id} className="text-sm flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      <TechIcon
                        name={lang.name}
                        iconKey={lang.iconKey}
                        showDefault={false}
                        className="flex-shrink-0 w-4 h-4"
                      />
                      <span className="font-medium">{lang.name}</span>
                    </span>
                    <span className="text-gray-500"> - {t(`proficiencyLevels.${lang.proficiency}`)}</span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {hasContent(certifications) && (
            <section>
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: themeColor }}
              >
                {t('certifications')}
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <p key={cert.id} className="text-xs">
                    <span className="font-medium">{cert.name}</span>
                    <span className="text-gray-500"> - {cert.issuer}</span>
                  </p>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Main Content */}
        <main className="@min-md:col-span-8 p-6">
          {/* Experience */}
          {hasContent(workExperience) && (
            <section className="mb-6">
              <h2
                className="text-lg font-bold uppercase tracking-wider mb-4 pb-2 border-b"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {t('workExperience')}
              </h2>
              <div className="space-y-4">
                {workExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{exp.position}</h3>
                        <p className="text-sm text-gray-600">
                          {exp.company}
                          {exp.location && ` • ${exp.location}`}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {exp.startDate} - {exp.current ? t('present') : exp.endDate}
                      </span>
                    </div>
                    {hasString(exp.description) && (
                      <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {hasContent(projects) && (
            <section>
              <h2
                className="text-lg font-bold uppercase tracking-wider mb-4 pb-2 border-b"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {t('projects')}
              </h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-semibold">{proj.name}</h3>
                    {hasString(proj.description) && (
                      <p className="text-sm text-gray-700">{proj.description}</p>
                    )}
                    {hasContent(proj.technologies) && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {proj.technologies.map((tech, i) => (
                          <span key={i} className="inline-flex items-center gap-1 text-xs text-gray-500">
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
        </main>
      </div>
    </div>
  );
}
