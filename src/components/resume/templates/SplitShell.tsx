import { useTranslations } from 'next-intl';
import { Resume } from '@/types/resume';
import { getTemplateDefinition } from '@/lib/templates';
import { SectionRenderer, type SectionTextColors } from '@/components/templates/shared/SectionRenderer';
import { SkillDotList } from '@/components/templates/shared/SkillDotList';
import { MetricsCallout } from '@/components/templates/shared/MetricsCallout';
import { CertificationBadge } from '@/components/templates/shared/CertificationBadge';
import type { EmphasisComponent } from '@/lib/templates';
import { isDarkBackground } from './utils';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface SplitShellProps {
  resume: Resume;
}

export function SplitShell({ resume }: SplitShellProps) {
  const t = useTranslations('section');
  const definition = getTemplateDefinition(resume.template);
  const isDark = isDarkBackground(definition.background?.gradient);

  const colors: SectionTextColors = isDark
    ? { heading: 'text-white', body: 'text-gray-300', muted: 'text-gray-400' }
    : { heading: 'text-gray-900', body: 'text-gray-600', muted: 'text-gray-500' };

  const hasEmphasis = (name: EmphasisComponent): boolean =>
    definition.emphasisComponents.includes(name);

  return (
    <div
      data-testid="split-shell"
      data-theme={isDark ? 'dark' : 'light'}
      className="@container"
    >
      <div className="bg-white">
        <div
          data-testid="a4-container"
          className="min-h-[1123px] mx-auto flex flex-col @min-md:flex-row"
          style={{
            background: definition.background?.gradient,
          }}
        >
          {/* Left column — primary sections */}
          <div
            data-testid="left-column"
            className="w-full @min-md:w-1/2 px-5 py-6"
            style={
              hasEmphasis('backgroundAccent')
                ? { backgroundColor: `${definition.accentColor}15` }
                : undefined
            }
          >
            {/* Name header */}
            <div className="mb-4">
              <h1 className={`text-3xl font-bold ${colors.heading}`}>
                {resume.personalInfo.firstName} {resume.personalInfo.lastName}
              </h1>
              {resume.personalInfo.summary && (
                <p className={`mt-1 text-xs ${colors.muted}`}>
                  {resume.personalInfo.summary}
                </p>
              )}
              {/* Contact info */}
              {(resume.personalInfo.email || resume.personalInfo.phone || resume.personalInfo.location || resume.personalInfo.linkedin || resume.personalInfo.website) && (
                <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs ${colors.muted}`}>
                  {resume.personalInfo.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {resume.personalInfo.email}
                    </span>
                  )}
                  {resume.personalInfo.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {resume.personalInfo.phone}
                    </span>
                  )}
                  {resume.personalInfo.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {resume.personalInfo.location}
                    </span>
                  )}
                  {resume.personalInfo.linkedin && (
                    <span className="flex items-center gap-1">
                      <Linkedin className="h-3 w-3" /> {resume.personalInfo.linkedin}
                    </span>
                  )}
                  {resume.personalInfo.website && (
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" /> {resume.personalInfo.website}
                    </span>
                  )}
                </div>
              )}
            </div>

            {definition.primarySections
              .filter((s) => !(hasEmphasis('skillDots') && s === 'skills'))
              .map((section) => (
                <SectionRenderer
                  key={section}
                  section={section}
                  resume={resume}
                  accentColor={definition.accentColor}
                  colors={colors}
                />
              ))}

            {/* Emphasis: skillDots */}
            {hasEmphasis('skillDots') && (
              <div data-testid="emphasis-skillDots" className="mb-3">
                <h2
                  className="mb-2 text-sm font-bold uppercase tracking-wider"
                  style={{ color: definition.accentColor }}
                >
                  {t('skills')}
                </h2>
                <div className="space-y-2">
                  {(resume.skills || []).map((skill) => {
                    const levelDots: Record<string, number> = {
                      expert: 9,
                      advanced: 7,
                      intermediate: 5,
                      beginner: 3,
                    };
                    return (
                      <SkillDotList
                        key={skill.id}
                        label={skill.name}
                        dots={10}
                        filled={levelDots[skill.level] || 4}
                        accentColor={definition.accentColor}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Emphasis: metricsCallout */}
            {hasEmphasis('metricsCallout') && (
              <div data-testid="emphasis-metricsCallout" className="mb-3">
                <MetricsCallout
                  metrics={(resume.achievements || []).map((a, i) => ({
                    label: a.length > 20 ? a.substring(0, 20) + '…' : a,
                    value: `${i + 1}`,
                  }))}
                  accentColor={definition.accentColor}
                />
              </div>
            )}
          </div>

          {/* Right column — sidebar sections */}
          <div
            data-testid="right-column"
            className="w-full @min-md:w-1/2 px-5 py-6"
            style={
              hasEmphasis('backgroundAccent')
                ? {
                    backgroundColor: isDark
                      ? 'rgba(0,0,0,0.3)'
                      : 'rgba(255,255,255,0.7)',
                  }
                : undefined
            }
          >
            {definition.sidebarSections
              .filter((s) => !(hasEmphasis('skillDots') && s === 'skills'))
              .map((section) => (
              <SectionRenderer
                key={section}
                section={section}
                resume={resume}
                accentColor={definition.accentColor}
                colors={colors}
              />
            ))}

            {/* Emphasis: certificationBadge */}
            {hasEmphasis('certificationBadge') && (
              <div data-testid="emphasis-certificationBadge" className="mb-3">
                <CertificationBadge
                  certifications={(resume.certifications || []).map((c) => ({
                    id: c.id,
                    name: c.name,
                    issuer: c.issuer,
                    date: c.date,
                  }))}
                  accentColor={definition.accentColor}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
