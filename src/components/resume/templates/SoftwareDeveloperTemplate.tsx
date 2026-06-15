import { useTranslations } from 'next-intl';
import { BackgroundLayer } from '@/components/templates/shared/BackgroundLayer';
import { ContactIconList, type ContactItem } from '@/components/templates/shared/ContactIconList';
import { EducationTimeline } from '@/components/templates/shared/EducationTimeline';
import { LanguageArc } from '@/components/templates/shared/LanguageArc';
import { SkillDotList } from '@/components/templates/shared/SkillDotList';
import type { ContactType } from '@/lib/iconRegistry';
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

interface SoftwareDeveloperTemplateProps {
  resume: Resume;
}

export function SoftwareDeveloperTemplate({ resume }: SoftwareDeveloperTemplateProps) {
  const t = useTranslations('section');
  const definition = getTemplateDefinition('softwareDeveloper');

  const groupedSkills = (resume.skills || []).reduce<Record<string, { filled: number; count: number }>>(
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

  const customSkillIcons = (resume.customIcons || [])
    .filter((icon) => icon.category === 'skill')
    .reduce<Record<string, string>>((acc, icon) => {
      acc[icon.label.toLowerCase()] = icon.url;
      return acc;
    }, {});

  const customContactIconMap = (resume.customIcons || [])
    .filter((icon) => icon.category === 'contact')
    .reduce<Record<string, string>>((acc, icon) => {
      acc[icon.label.toLowerCase()] = icon.url;
      return acc;
    }, {});

  const languageArcs = resume.languages.slice(0, 3).map((language) => ({
    ...language,
    value: languageProficiencyValues[language.proficiency] ?? 60,
  }));

  const contactItems: ContactItem[] = [
    {
      id: 'email',
      type: 'email' as ContactType,
      label: 'Email',
      value: resume.personalInfo.email,
    },
    {
      id: 'phone',
      type: 'phone' as ContactType,
      label: 'Phone',
      value: resume.personalInfo.phone,
    },
    {
      id: 'website',
      type: 'website' as ContactType,
      label: 'Website',
      value: resume.personalInfo.website,
    },
    {
      id: 'linkedin',
      type: 'linkedin' as ContactType,
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
      className="w-full min-h-[1123px] @container"
      imageUrl={definition.background?.imageUrl}
      gradient={definition.background?.gradient}
      overlayColor={definition.background?.overlayColor}
    >
      <div className="relative flex flex-col gap-6 px-6 py-6 text-white @min-md:grid @min-md:grid-cols-[1fr_1fr]">
        <div className="space-y-6 border border-white/10 bg-black/40 p-6 backdrop-blur">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-orange-300">{t('summary')}</p>
            <h1 className="text-2xl font-bold">
              {resume.personalInfo.firstName} {resume.personalInfo.lastName}
            </h1>
            <p className="text-xs text-white/70">{resume.personalInfo.summary}</p>
          </div>

          <div className="grid gap-3 grid-cols-2">
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

          <section>
            <h2 className="text-sm font-semibold text-white">{t('skills')}</h2>
            <div className="mt-3 space-y-3">
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

          {contactItems.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-orange-200">{t('contact')}</p>
              <ContactIconList items={contactItems} accentColor={definition.accentColor} />
            </div>
          )}

          {resume.certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-white">{t('certifications')}</h2>
              <ul className="mt-2 space-y-1.5 text-xs text-white/80">
                {resume.certifications.map((cert) => (
                  <li key={cert.id} className="flex items-start gap-2">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-orange-400" />
                    <span>
                      <span className="font-medium text-white">{cert.name}</span>
                      <span className="text-[11px] text-white/60"> - {cert.issuer}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <section className="border border-white/10 bg-black/40 p-5 backdrop-blur">
            <h2 className="text-sm font-semibold text-white">{t('experience')}</h2>
            <div className="mt-3 space-y-4 text-xs text-white/80">
              {resume.workExperience.map((experience) => (
                <div
                  key={experience.id}
                  className="space-y-0.5 border-b border-white/5 pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white text-xs">{experience.position}</p>
                    <span className="text-[10px] text-white/60">
                      {experience.startDate} - {experience.current ? t('present') : experience.endDate}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70">{experience.company}</p>
                  <p className="text-[11px] text-white/60 whitespace-pre-line leading-relaxed">
                    {experience.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-white/10 bg-black/40 p-5 backdrop-blur">
            <h2 className="text-sm font-semibold text-white">{t('education')}</h2>
            <div className="mt-3">
              <EducationTimeline entries={resume.education} accentColor={definition.accentColor} />
            </div>
          </section>
        </div>
      </div>
    </BackgroundLayer>
  );
}
