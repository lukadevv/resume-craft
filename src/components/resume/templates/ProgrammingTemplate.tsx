import { BackgroundLayer } from '@/components/templates/shared/BackgroundLayer';
import { ContactIconList } from '@/components/templates/shared/ContactIconList';
import { EducationTimeline } from '@/components/templates/shared/EducationTimeline';
import { LanguageArc } from '@/components/templates/shared/LanguageArc';
import { SkillDotList } from '@/components/templates/shared/SkillDotList';
import { Resume } from '@/types/resume';
import { getTemplateDefinition } from '@/lib/templates';

const languageProficiencyValues: Record<string, number> = {
  native: 100,
  fluent: 90,
  advanced: 75,
  intermediate: 55,
  beginner: 35,
};

const skillLevelDots: Record<string, number> = {
  beginner: 3,
  intermediate: 5,
  advanced: 7,
  expert: 9,
};

interface ProgrammingTemplateProps {
  resume: Resume;
}

export function ProgrammingTemplate({ resume }: ProgrammingTemplateProps) {
  const definition = getTemplateDefinition('programming');

  const groupedSkills = resume.skills.reduce<Record<string, { filled: number; count: number }>>(
    (acc, skill) => {
      const key = skill.category || 'General';
      const filled = skillLevelDots[skill.level] || 4;
      if (!acc[key]) {
        acc[key] = { filled, count: 1 };
      } else {
        acc[key].filled += filled;
        acc[key].count += 1;
      }
      return acc;
    },
    {}
  );

  const skillGroups = Object.entries(groupedSkills).map(([category, { filled, count }]) => ({
    label: category,
    filled: Math.round(filled / count),
  }));

  const customSkillIcons = resume.customIcons
    .filter((icon) => icon.category === 'skill')
    .reduce<Record<string, string>>((acc, icon) => {
      acc[icon.label.toLowerCase()] = icon.url;
      return acc;
    }, {});

  const customContactIconMap = resume.customIcons
    .filter((icon) => icon.category === 'contact')
    .reduce<Record<string, string>>((acc, icon) => {
      acc[icon.label.toLowerCase()] = icon.url;
      return acc;
    }, {});

  const languageArcs = resume.languages.slice(0, 3).map((language) => ({
    ...language,
    value: languageProficiencyValues[language.proficiency] ?? 60,
  }));

  const contactItems = [
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      value: resume.personalInfo.email,
    },
    {
      id: 'phone',
      type: 'phone',
      label: 'Phone',
      value: resume.personalInfo.phone,
    },
    {
      id: 'website',
      type: 'website',
      label: 'Website',
      value: resume.personalInfo.website,
    },
    {
      id: 'linkedin',
      type: 'linkedin',
      label: 'LinkedIn',
      value: resume.personalInfo.linkedin,
    },
  ]
    .filter((item) => item.value)
    .map((item) => ({
      ...item,
      customIconUrl: customContactIconMap[item.id] ?? undefined,
    }));

  return (
    <BackgroundLayer
      className="rounded-[40px] overflow-hidden"
      imageUrl={definition.background?.imageUrl}
      gradient={definition.background?.gradient}
      overlayColor={definition.background?.overlayColor}
    >
      <div className="relative grid gap-10 px-8 py-10 text-white lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8 rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-widest text-orange-300">Software Engineer</p>
            <h1 className="text-4xl font-bold">
              {resume.personalInfo.firstName} {resume.personalInfo.lastName}
            </h1>
            <p className="text-sm text-white/70">{resume.personalInfo.summary}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {languageArcs.map((language) => (
              <LanguageArc
                key={language.id}
                label={language.name}
                value={language.value}
                primaryColor={definition.accentColor}
                secondaryColor="#FDBA74"
                backgroundColor="rgba(255,255,255,0.1)"
              />
            ))}
          </div>

          {contactItems.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-orange-200">Contact</p>
              <ContactIconList items={contactItems} accentColor={definition.accentColor} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <section className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Experience</h2>
            <div className="mt-4 space-y-5 text-sm text-white/80">
              {resume.workExperience.map((experience) => (
                <div key={experience.id} className="space-y-1 border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white">{experience.position}</p>
                    <span className="text-xs text-white/60">
                      {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-white/70">{experience.company}</p>
                  <p className="text-[13px] text-white/60 whitespace-pre-line">{experience.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Education</h2>
            <div className="mt-5">
              <EducationTimeline entries={resume.education} accentColor={definition.accentColor} />
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Skills</h2>
            <div className="mt-4 space-y-6">
              {skillGroups.map((group) => (
                <SkillDotList
                  key={group.label}
                  label={group.label}
                  dots={10}
                  filled={group.filled}
                  accentColor={definition.accentColor}
                  customIconUrl={customSkillIcons[group.label.toLowerCase()]}
                />
              ))}
            </div>
          </section>

          {resume.certifications.length > 0 && (
            <section className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur">
              <h2 className="text-lg font-semibold text-white">Certifications</h2>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                {resume.certifications.map((cert) => (
                  <li key={cert.id} className="flex items-start gap-2">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-orange-400" />
                    <span>
                      <span className="font-medium text-white">{cert.name}</span>
                      <span className="text-xs text-white/60"> - {cert.issuer}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </BackgroundLayer>
  );
}
