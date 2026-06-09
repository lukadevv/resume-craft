import { Resume } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Star } from 'lucide-react';
import { TechIcon } from '@/components/ui/TechIcon';

interface CreativeTemplateProps {
  resume: Resume;
}

/**
 * Creative template - Bold and eye-catching with visual impact
 */
export function CreativeTemplate({ resume }: CreativeTemplateProps) {
  const {
    personalInfo,
    workExperience,
    education,
    skills,
    projects,
    certifications,
    languages,
  } = resume;
  const themeColor = resume.themeColor || '#8B5CF6';

  const hasContent = (arr: unknown[]) => arr && arr.length > 0;
  const hasString = (str: string) => str && str.trim().length > 0;

  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      {/* Colorful Header */}
      <header className="relative overflow-hidden" style={{ backgroundColor: themeColor }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-10 translate-y-10" />
        </div>

        <div className="relative p-8 text-white">
          <h1 className="text-4xl font-bold">
            {personalInfo.firstName} <span className="font-light">{personalInfo.lastName}</span>
          </h1>

          {hasString(personalInfo.summary) && (
            <p className="mt-3 max-w-xl opacity-90">{personalInfo.summary}</p>
          )}

          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            {hasString(personalInfo.email) && (
              <span className="flex items-center gap-1 opacity-90">
                <Mail className="h-4 w-4" /> {personalInfo.email}
              </span>
            )}
            {hasString(personalInfo.phone) && (
              <span className="flex items-center gap-1 opacity-90">
                <Phone className="h-4 w-4" /> {personalInfo.phone}
              </span>
            )}
            {hasString(personalInfo.location) && (
              <span className="flex items-center gap-1 opacity-90">
                <MapPin className="h-4 w-4" /> {personalInfo.location}
              </span>
            )}
            {hasString(personalInfo.linkedin) && (
              <span className="flex items-center gap-1 opacity-90">
                <Linkedin className="h-4 w-4" /> {personalInfo.linkedin}
              </span>
            )}
            {hasString(personalInfo.website) && (
              <span className="flex items-center gap-1 opacity-90">
                <Globe className="h-4 w-4" /> {personalInfo.website}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <aside className="col-span-4 p-6 text-white" style={{ backgroundColor: `${themeColor}15` }}>
          {/* Skills */}
          {hasContent(skills) && (
            <section className="mb-6">
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color: themeColor }}
              >
                <Star className="h-4 w-4" /> Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width:
                            skill.level === 'expert'
                              ? '100%'
                              : skill.level === 'advanced'
                                ? '75%'
                                : skill.level === 'intermediate'
                                  ? '50%'
                                  : '25%',
                          backgroundColor: themeColor,
                        }}
                      />
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs w-20 truncate">
                      <TechIcon name={skill.name} iconKey={skill.iconKey} className="flex-shrink-0 w-3 h-3" />
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {hasContent(education) && (
            <section className="mb-6">
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color: themeColor }}
              >
                <Star className="h-4 w-4" /> Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-sm">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </p>
                    <p className="text-xs">{edu.institution}</p>
                    <p className="text-xs opacity-70">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
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
                className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color: themeColor }}
              >
                <Star className="h-4 w-4" /> Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <p key={lang.id} className="text-sm">
                    {lang.name}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {hasContent(certifications) && (
            <section>
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color: themeColor }}
              >
                <Star className="h-4 w-4" /> Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <p key={cert.id} className="text-xs">
                    {cert.name}
                  </p>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Main Content */}
        <main className="col-span-8 p-6">
          {/* Experience */}
          {hasContent(workExperience) && (
            <section className="mb-6">
              <h2
                className="text-lg font-bold uppercase tracking-wider mb-4"
                style={{ color: themeColor }}
              >
                Work Experience
              </h2>
              <div className="space-y-4">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-4">
                    <div
                      className="absolute left-0 top-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: themeColor }}
                    />
                    <h3 className="font-bold">{exp.position}</h3>
                    <p className="text-sm font-semibold" style={{ color: themeColor }}>
                      {exp.company}
                    </p>
                    <p className="text-xs text-gray-500">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    {hasString(exp.description) && (
                      <p className="mt-2 text-sm text-gray-700">{exp.description}</p>
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
                className="text-lg font-bold uppercase tracking-wider mb-4"
                style={{ color: themeColor }}
              >
                Notable Projects
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${themeColor}10` }}
                  >
                    <h3 className="font-bold text-sm">{proj.name}</h3>
                    {hasString(proj.description) && (
                      <p className="mt-1 text-xs text-gray-600">{proj.description}</p>
                    )}
                    {hasContent(proj.technologies) && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                            style={{ backgroundColor: themeColor, color: 'white' }}
                          >
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
