import type { Resume } from '@/types/resume';
import type { TemplateSection } from '@/lib/templates';
import { TechIcon } from '@/components/ui/TechIcon';

export interface SectionTextColors {
  heading: string;
  body: string;
  muted: string;
}

interface SectionRendererProps {
  section: TemplateSection;
  resume: Resume;
  accentColor: string;
  colors: SectionTextColors;
}

function hasContent(arr: unknown[] | undefined | null): boolean {
  return Array.isArray(arr) && arr.length > 0;
}

function hasString(str: string | undefined | null): boolean {
  return typeof str === 'string' && str.trim().length > 0;
}

export function SectionRenderer({
  section,
  resume,
  accentColor,
  colors,
}: SectionRendererProps) {
  const sectionId = `section-${section}`;

  switch (section) {
    // ── Core sections ──
    case 'summary': {
      if (!hasString(resume.summary)) {
        return <div data-testid={sectionId} />;
      }
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>
          <p className={`text-sm leading-relaxed ${colors.body}`}>
            {resume.summary}
          </p>
        </div>
      );
    }

    case 'workExperience': {
      if (!hasContent(resume.workExperience)) {
        return <div data-testid={sectionId} />;
      }
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-4 text-sm font-bold uppercase tracking-wider border-b pb-1"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Work Experience
          </h2>
          <div className="space-y-2">
            {resume.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-semibold text-sm ${colors.heading}`}>
                      {exp.position}
                    </h3>
                    <p className={`text-xs ${colors.body}`}>
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ''}
                    </p>
                  </div>
                  <span className={`text-xs whitespace-nowrap ${colors.muted}`}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {hasString(exp.description) && (
                  <p className={`mt-1 text-xs leading-relaxed whitespace-pre-line ${colors.body}`}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'education': {
      if (!hasContent(resume.education)) {
        return <div data-testid={sectionId} />;
      }
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <p className={`font-semibold text-sm ${colors.heading}`}>
                  {edu.degree}
                  {edu.field ? ` in ${edu.field}` : ''}
                </p>
                <p className={`text-xs ${colors.body}`}>{edu.institution}</p>
                <p className={`text-xs ${colors.muted}`}>
                  {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                  {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'skills': {
      if (!hasContent(resume.skills)) {
        return <div data-testid={sectionId} />;
      }
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.map((skill) => (
              <span
                key={skill.id}
                className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${colors.body}`}
                style={{ borderColor: accentColor }}
              >
                <TechIcon name={skill.name} iconKey={skill.iconKey} className="flex-shrink-0 w-3.5 h-3.5" />
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      );
    }

    case 'projects': {
      if (!hasContent(resume.projects)) {
        return <div data-testid={sectionId} />;
      }
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Projects
          </h2>
          <div className="space-y-3">
            {resume.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className={`font-semibold text-sm ${colors.heading}`}>
                  {proj.name}
                </h3>
                {hasString(proj.description) && (
                  <p className={`text-xs ${colors.body}`}>{proj.description}</p>
                )}
                {hasContent(proj.technologies) && (
                  <div className="inline-flex flex-wrap gap-1 mt-0.5">
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1 text-[11px] ${colors.muted}`}
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
        </div>
      );
    }

    case 'certifications': {
      if (!hasContent(resume.certifications)) {
        return <div data-testid={sectionId} />;
      }
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Certifications
          </h2>
          <div className="space-y-1.5">
            {resume.certifications.map((cert) => (
              <p key={cert.id} className={`text-xs ${colors.body}`}>
                <span className="font-medium">{cert.name}</span>
                {cert.issuer ? (
                  <span className={colors.muted}> — {cert.issuer}</span>
                ) : null}
              </p>
            ))}
          </div>
        </div>
      );
    }

    case 'languages': {
      if (!hasContent(resume.languages)) {
        return <div data-testid={sectionId} />;
      }
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Languages
          </h2>
          <div className="space-y-1">
            {resume.languages.map((lang) => (
              <p key={lang.id} className={`text-sm ${colors.body}`}>
                <span className="font-medium">{lang.name}</span>
                <span className={colors.muted}> — {lang.proficiency}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }

    case 'references': {
      if (!hasContent(resume.references)) {
        return <div data-testid={sectionId} />;
      }
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            References
          </h2>
          <div className="space-y-2">
            {resume.references.map((ref) => (
              <div key={ref.id}>
                <p className={`font-medium text-sm ${colors.heading}`}>
                  {ref.name}
                </p>
                <p className={`text-xs ${colors.body}`}>
                  {ref.title}
                  {ref.company ? `, ${ref.company}` : ''}
                </p>
                <p className={`text-xs ${colors.muted}`}>
                  {ref.email}
                  {ref.phone ? ` · ${ref.phone}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ── Role-specific / extended sections ──
    case 'contact': {
      const { personalInfo } = resume;
      const items: string[] = [];
      if (hasString(personalInfo.email)) items.push(personalInfo.email.trim());
      if (hasString(personalInfo.phone)) items.push(personalInfo.phone.trim());
      if (hasString(personalInfo.location)) items.push(personalInfo.location.trim());
      if (hasString(personalInfo.linkedin)) items.push(personalInfo.linkedin.trim());
      if (hasString(personalInfo.website)) items.push(personalInfo.website.trim());

      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Contact
          </h2>
          <div className={`space-y-1 text-xs ${colors.body}`}>
            {items.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </div>
      );
    }

    case 'customSections': {
      if (!hasContent(resume.customSections)) {
        return <div data-testid={sectionId} />;
      }
      return (
        <div data-testid={sectionId} className="mb-3">
          {resume.customSections.map((cs) => (
            <div key={cs.id} className="mb-4">
              <h2
                className="mb-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: accentColor }}
              >
                {cs.title}
              </h2>
              <div className="space-y-2">
                {cs.items.map((item) => (
                  <div key={item.id}>
                    <p className={`font-medium text-xs ${colors.heading}`}>
                      {item.title}
                    </p>
                    <p className={`text-xs ${colors.body}`}>{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    case 'tools':
      if (!hasContent(resume.tools)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Tools & Technologies
          </h2>
          <div className={`inline-flex flex-wrap gap-x-3 gap-y-1 text-xs ${colors.body}`}>
            {resume.tools.map((tool, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                <TechIcon name={tool} className="flex-shrink-0 w-3.5 h-3.5" />
                {tool}
              </span>
            ))}
          </div>
        </div>
      );

    case 'coreCompetencies':
      if (!hasContent(resume.coreCompetencies)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Core Competencies
          </h2>
          <ul className={`list-disc list-inside text-xs ${colors.body} space-y-0.5`}>
            {resume.coreCompetencies.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case 'achievements':
      if (!hasContent(resume.achievements)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Achievements
          </h2>
          <ul className={`list-disc list-inside text-xs ${colors.body} space-y-0.5`}>
            {resume.achievements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case 'awards':
      if (!hasContent(resume.awards)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Awards
          </h2>
          <ul className={`list-disc list-inside text-xs ${colors.body} space-y-0.5`}>
            {resume.awards.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case 'affiliations':
      if (!hasContent(resume.affiliations)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Affiliations
          </h2>
          <ul className={`list-disc list-inside text-xs ${colors.body} space-y-0.5`}>
            {resume.affiliations.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case 'portfolio':
      if (!hasString(resume.portfolio)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Portfolio
          </h2>
          <p className={`text-xs ${colors.body}`}>{resume.portfolio}</p>
        </div>
      );

    case 'publications':
      if (!hasContent(resume.publications)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Publications
          </h2>
          <div className="space-y-2">
            {resume.publications.map((pub) => (
              <div key={pub.id}>
                <p className={`font-medium text-xs ${colors.heading}`}>{pub.title}</p>
                <p className={`text-xs ${colors.body}`}>
                  {pub.publisher}
                  {pub.date ? ` · ${pub.date}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'grantsFellowships':
      if (!hasContent(resume.grantsFellowships)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Grants & Fellowships
          </h2>
          <div className="space-y-2">
            {resume.grantsFellowships.map((grant) => (
              <div key={grant.id}>
                <p className={`font-medium text-xs ${colors.heading}`}>{grant.name}</p>
                <p className={`text-xs ${colors.body}`}>
                  {grant.amount}
                  {grant.date ? ` · ${grant.date}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'conferences':
      if (!hasContent(resume.conferences)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Conferences
          </h2>
          <div className="space-y-2">
            {resume.conferences.map((conf) => (
              <div key={conf.id}>
                <p className={`font-medium text-xs ${colors.heading}`}>{conf.name}</p>
                <p className={`text-xs ${colors.body}`}>
                  {conf.role}
                  {conf.date ? ` · ${conf.date}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'clinicalSkills':
      if (!hasContent(resume.clinicalSkills)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Clinical Skills
          </h2>
          <p className={`text-xs ${colors.body}`}>
            {resume.clinicalSkills.join(' · ')}
          </p>
        </div>
      );

    case 'licenses':
      if (!hasContent(resume.licenses)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Licenses
          </h2>
          <div className="space-y-1.5">
            {resume.licenses.map((lic) => (
              <p key={lic.id} className={`text-xs ${colors.body}`}>
                <span className="font-medium">{lic.name}</span>
                {lic.issuer ? (
                  <span className={colors.muted}> — {lic.issuer}</span>
                ) : null}
                {lic.date ? (
                  <span className={colors.muted}> · {lic.date}</span>
                ) : null}
              </p>
            ))}
          </div>
        </div>
      );

    case 'barAdmission':
      if (!hasContent(resume.barAdmission)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Bar Admissions
          </h2>
          <div className="space-y-1">
            {resume.barAdmission.map((bar) => (
              <p key={bar.id} className={`text-xs ${colors.body}`}>
                <span className="font-medium">{bar.state}</span>
                {bar.date ? (
                  <span className={colors.muted}> · {bar.date}</span>
                ) : null}
              </p>
            ))}
          </div>
        </div>
      );

    case 'practiceAreas':
      if (!hasContent(resume.practiceAreas)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Practice Areas
          </h2>
          <ul className={`list-disc list-inside text-xs ${colors.body} space-y-0.5`}>
            {resume.practiceAreas.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case 'securityClearance':
      if (!hasString(resume.securityClearance)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Security Clearance
          </h2>
          <p className={`text-xs ${colors.body}`}>{resume.securityClearance}</p>
        </div>
      );

    case 'teachingPhilosophy':
      if (!hasString(resume.teachingPhilosophy)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Teaching Philosophy
          </h2>
          <p className={`text-xs ${colors.body}`}>{resume.teachingPhilosophy}</p>
        </div>
      );

    case 'classroomExperience':
      if (!hasString(resume.classroomExperience)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Classroom Experience
          </h2>
          <p className={`text-xs ${colors.body}`}>{resume.classroomExperience}</p>
        </div>
      );

    case 'teachingExperience':
      if (!hasContent(resume.teachingExperience)) return <div data-testid={sectionId} />;
      return (
        <div data-testid={sectionId} className="mb-3">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Teaching Experience
          </h2>
          <div className="space-y-2">
            {resume.teachingExperience.map((te) => (
              <div key={te.id}>
                <p className={`font-medium text-xs ${colors.heading}`}>
                  {te.subject}
                </p>
                <p className={`text-xs ${colors.body}`}>
                  {te.institution}
                  {te.date ? ` · ${te.date}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <div data-testid={sectionId} />;
  }
}
