import { useTranslations } from 'next-intl';
import { Resume } from '@/types/resume';
import { getTemplateDefinition } from '@/lib/templates';
import { SectionRenderer, type SectionTextColors } from '@/components/templates/shared/SectionRenderer';
import { TimelineGraphic } from '@/components/templates/shared/TimelineGraphic';
import { CertificationBadge } from '@/components/templates/shared/CertificationBadge';
import type { EmphasisComponent } from '@/lib/templates';
import { isDarkBackground } from './utils';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TimelineShellProps {
  resume: Resume;
}

export function TimelineShell({ resume }: TimelineShellProps) {
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
      data-testid="timeline-shell"
      data-theme={isDark ? 'dark' : 'light'}
      className="w-full @container"
    >
      <div className="bg-white">
        <div
          data-testid="a4-container"
          className="min-h-[1123px] mx-auto"
          style={{
            background: definition.background?.gradient,
          }}
        >
          {/* Header */}
          <header className="text-center border-b-4 pb-4 mx-8 pt-8">
            <h1
              className="text-3xl font-bold uppercase tracking-wider"
              style={{ color: definition.accentColor }}
            >
              {resume.personalInfo.firstName} {resume.personalInfo.lastName}
            </h1>
            <div
              className={`flex flex-wrap justify-center gap-4 mt-3 text-sm ${colors.body}`}
            >
              {resume.personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" style={{ color: definition.accentColor }} /> {resume.personalInfo.email}
                </span>
              )}
              {resume.personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" style={{ color: definition.accentColor }} /> {resume.personalInfo.phone}
                </span>
              )}
              {resume.personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" style={{ color: definition.accentColor }} /> {resume.personalInfo.location}
                </span>
              )}
              {resume.personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4" style={{ color: definition.accentColor }} /> {resume.personalInfo.linkedin}
                </span>
              )}
              {resume.personalInfo.website && (
                <span className="flex items-center gap-1">
                  <Globe className="h-4 w-4" style={{ color: definition.accentColor }} /> {resume.personalInfo.website}
                </span>
              )}
            </div>
          </header>

          {/* Content */}
          <div className="px-8 py-6 space-y-4">
            {/* Primary sections */}
            {definition.primarySections.map((section) => (
              <SectionRenderer
                key={`primary-${section}`}
                section={section}
                resume={resume}
                accentColor={definition.accentColor}
                colors={colors}
              />
            ))}

            {/* Sidebar sections */}
            {definition.sidebarSections.map((section) => (
              <SectionRenderer
                key={`sidebar-${section}`}
                section={section}
                resume={resume}
                accentColor={definition.accentColor}
                colors={colors}
              />
            ))}

            {/* Emphasis: timelineGraphic */}
            {hasEmphasis('timelineGraphic') && (
              <div data-testid="emphasis-timelineGraphic" className="mt-4">
                <h2
                  className="text-sm font-bold uppercase tracking-wider pb-1 border-b mb-4"
                  style={{ borderColor: definition.accentColor, color: definition.accentColor }}
                >
                  {t('experienceTimeline')}
                </h2>
                <TimelineGraphic
                  entries={resume.workExperience.map((exp) => ({
                    id: exp.id,
                    title: exp.position,
                    subtitle: exp.company,
                    date: `${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}`,
                    description: exp.description,
                  }))}
                  accentColor={definition.accentColor}
                />
              </div>
            )}

            {/* Emphasis: certificationBadge */}
            {hasEmphasis('certificationBadge') && (
              <div data-testid="emphasis-certificationBadge" className="mt-4">
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
