import { useTranslations } from 'next-intl';
import { Resume } from '@/types/resume';
import { Code, Database, Server, Terminal } from 'lucide-react';
import { TechIcon } from '@/components/ui/TechIcon';

interface TechnicalTemplateProps {
  resume: Resume;
}

/**
 * Technical template - Perfect for tech roles with skills matrix
 */
export function TechnicalTemplate({ resume }: TechnicalTemplateProps) {
  const t = useTranslations('section');
  const tForm = useTranslations('resume-form');
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
  const themeColor = resume.themeColor || '#10B981';

  const hasContent = (arr: unknown[]) => arr && arr.length > 0;
  const hasString = (str: string) => str && str.trim().length > 0;

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      const cat = skill.category || tForm('Other');
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  return (
    <div className="w-full min-h-[1123px] bg-gray-900 text-gray-100 font-mono text-sm @container">
      <header className="bg-gray-800 border-b-4" style={{ borderColor: themeColor }}>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-xs text-gray-400">resume.sh</span>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2">
            <Terminal className="h-8 w-8" style={{ color: themeColor }} />
            <h1 className="text-2xl font-bold">
              <span style={{ color: themeColor }}>const</span> {personalInfo.firstName}
            </h1>
          </div>

          <div className="mt-4">
            <p className="text-gray-400">// Contact</p>
            <p className="mt-1 text-sm" style={{ color: themeColor }}>
              {`{ email: "${personalInfo.email || ''}", phone: "${personalInfo.phone || ''}" }`}
            </p>
          </div>
        </div>
      </header>

      {hasString(summary) && (
        <section className="px-6 py-4 border-b border-gray-700">
          <p className="text-gray-400">// Summary</p>
          <p className="mt-1 text-gray-300">{summary}</p>
        </section>
      )}

      {/* Row 1: Experience + Skills + Languages */}
      <div className="flex flex-col @min-md:grid @min-md:grid-cols-12 border-b border-gray-700">
        <div className="@min-md:col-span-7 px-6 py-4 @min-md:border-r border-gray-700">
          {hasContent(workExperience) && (
            <section>
              <h2 className="flex items-center gap-2 text-lg font-bold" style={{ color: themeColor }}>
                <Server className="h-5 w-5" /> {t('experience')}()
              </h2>
              <div className="mt-3 space-y-1">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="py-2">
                    <p style={{ color: themeColor }}>{`{`}</p>
                    <p className="pl-4">
                      position: <span className="text-yellow-300">"{exp.position}"</span>
                    </p>
                    <p className="pl-4">
                      company: <span className="text-yellow-300">"{exp.company}"</span>
                    </p>
                    <p className="pl-4">
                      period:{' '}
                      <span className="text-yellow-300">
                        "{exp.startDate} - {exp.current ? t('present') : exp.endDate}"
                      </span>
                    </p>
                    {hasString(exp.description) && (
                      <p className="pl-4 text-gray-400 text-xs">
                        // {exp.description.substring(0, 80)}
                      </p>
                    )}
                    <p style={{ color: themeColor }}>{`}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="@min-md:col-span-5 px-6 py-4">
          {hasContent(skills) && (
            <section className="mb-4">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase" style={{ color: themeColor }}>
                <Code className="h-4 w-4" /> {t('skills')}
              </h2>
              <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <p className="text-blue-400 text-xs">{category}:</p>
                    <div className="pl-3">
                      {categorySkills.map((skill) => (
                        <p key={skill.id} className="text-gray-300 text-xs inline-flex items-center gap-0.5">
                          <TechIcon name={skill.name} iconKey={skill.iconKey} className="flex-shrink-0 w-3 h-3" />
                          • <span className="text-yellow-300">{skill.name}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasContent(languages) && (
            <section>
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase" style={{ color: themeColor }}>
                <Terminal className="h-4 w-4" /> {t('languages')}
              </h2>
              <div className="mt-1 space-y-0.5">
                {languages.map((lang) => (
                  <p key={lang.id} className="text-xs text-gray-300 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      <TechIcon
                        name={lang.name}
                        iconKey={lang.iconKey}
                        showDefault={false}
                        className="flex-shrink-0 w-3.5 h-3.5"
                      />
                      {lang.name}
                    </span>
                    : <span className="text-green-300">{t(`proficiencyLevels.${lang.proficiency}`)}</span>
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Row 2: Projects + Education + Certs */}
      <div className="flex flex-col @min-md:grid @min-md:grid-cols-12">
        <div className="@min-md:col-span-7 px-6 py-4 @min-md:border-r border-gray-700">
          {hasContent(projects) && (
            <section>
              <h2
                className="flex items-center gap-2 text-lg font-bold"
                style={{ color: themeColor }}
              >
                <Terminal className="h-5 w-5" /> {t('projects')}
              </h2>
              <div className="mt-3 space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id} className="pl-4">
                    <p className="text-green-300">• {proj.name}</p>
                    {hasString(proj.description) && (
                      <p className="text-gray-400 text-xs pl-2">
                        {proj.description.substring(0, 60)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="@min-md:col-span-5 px-6 py-4">
          {hasContent(education) && (
            <section className="mb-4">
              <h2
                className="flex items-center gap-2 text-sm font-bold uppercase"
                style={{ color: themeColor }}
              >
                <Database className="h-4 w-4" /> {t('education')}
              </h2>
              <div className="mt-2 space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-green-300 text-xs">{edu.degree}</p>
                    <p className="text-gray-400 text-xs">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasContent(certifications) && (
            <section>
              <h2
                className="flex items-center gap-2 text-sm font-bold uppercase"
                style={{ color: themeColor }}
              >
                <Code className="h-4 w-4" /> {t('certs')}
              </h2>
              <div className="mt-1 space-y-0.5">
                {certifications.map((cert) => (
                  <p key={cert.id} className="text-xs text-gray-300">
                    ✓ {cert.name}
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
