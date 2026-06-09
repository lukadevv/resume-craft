import { Resume } from '@/types/resume';
import { getTemplateDefinition } from '@/lib/templates';
import { SectionRenderer, type SectionTextColors } from '@/components/templates/shared/SectionRenderer';
import { SkillBars } from '@/components/templates/shared/SkillBars';
import { MetricsCallout } from '@/components/templates/shared/MetricsCallout';
import { CertificationBadge } from '@/components/templates/shared/CertificationBadge';
import type { EmphasisComponent } from '@/lib/templates';
import { isDarkBackground } from './utils';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TwoColumnShellProps {
  resume: Resume;
}

export function TwoColumnShell({ resume }: TwoColumnShellProps) {
  const definition = getTemplateDefinition(resume.template);
  const isDark = isDarkBackground(definition.background?.gradient);

  const colors: SectionTextColors = isDark
    ? { heading: 'text-white', body: 'text-gray-300', muted: 'text-gray-400' }
    : { heading: 'text-gray-900', body: 'text-gray-600', muted: 'text-gray-500' };

  const hasEmphasis = (name: EmphasisComponent): boolean =>
    definition.emphasisComponents.includes(name);

  const renderEmphasis = () => {
    const components: React.ReactNode[] = [];

    if (hasEmphasis('skillBars')) {
      const skillEntries = (resume.skills || []).map((s) => ({
        name: s.name,
        level: s.level,
      }));
      components.push(
        <div key="skillBars" data-testid="emphasis-skillBars" className="mb-5">
          <SkillBars skills={skillEntries} accentColor={definition.accentColor} />
        </div>
      );
    }

    if (hasEmphasis('metricsCallout')) {
      // Build metrics from achievements as label/value pairs
      const achievementMetrics = (resume.achievements || []).map((a, i) => ({
        label: a.length > 20 ? a.substring(0, 20) + '…' : a,
        value: `${i + 1}`,
      }));
      components.push(
        <div key="metricsCallout" data-testid="emphasis-metricsCallout" className="mb-5">
          <MetricsCallout metrics={achievementMetrics} accentColor={definition.accentColor} />
        </div>
      );
    }

    if (hasEmphasis('certificationBadge')) {
      const certEntries = (resume.certifications || []).map((c) => ({
        id: c.id,
        name: c.name,
        issuer: c.issuer,
        date: c.date,
      }));
      components.push(
        <div key="certificationBadge" data-testid="emphasis-certificationBadge" className="mb-5">
          <CertificationBadge certifications={certEntries} accentColor={definition.accentColor} />
        </div>
      );
    }

    return components;
  };

  const emphasisElements = renderEmphasis();

  return (
    <div
      data-testid="two-column-shell"
      data-theme={isDark ? 'dark' : 'light'}
      className="@container"
    >
      <div className="bg-white">
        <div
          data-testid="a4-container"
          className="min-h-[1123px] mx-auto"
          style={{
            background: definition.background?.gradient,
          }}
        >
          {/* Header with personal info */}
          <div className="px-8 pt-8 pb-4">
            <h1 className={`text-3xl font-bold ${colors.heading}`}>
              {resume.personalInfo.firstName} {resume.personalInfo.lastName}
            </h1>
            {resume.personalInfo.summary && (
              <p className={`mt-1 text-sm ${colors.muted}`}>
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

          {/* Two-column grid — responsive: stack on narrow containers */}
          <div className="flex flex-col @min-md:grid @min-md:grid-cols-12 pb-8">
            {/* Left: primary sections */}
            <div data-testid="primary-column" className="@min-md:col-span-7 px-8">
              {definition.primarySections.map((section) => (
                <SectionRenderer
                  key={section}
                  section={section}
                  resume={resume}
                  accentColor={definition.accentColor}
                  colors={colors}
                />
              ))}
              {/* Emphasis in primary column (skillBars, metricsCallout) */}
              {emphasisElements.filter(
                (el) =>
                  el &&
                  typeof el === 'object' &&
                  'key' in el &&
                  (el.key === 'skillBars' || el.key === 'metricsCallout')
              )}
            </div>

            {/* Right: sidebar sections */}
            <div data-testid="sidebar-column" className="col-span-5 px-6">
              {definition.sidebarSections.map((section) => (
                <SectionRenderer
                  key={section}
                  section={section}
                  resume={resume}
                  accentColor={definition.accentColor}
                  colors={colors}
                />
              ))}
              {/* Emphasis in sidebar (certificationBadge) */}
              {emphasisElements.filter(
                (el) =>
                  el &&
                  typeof el === 'object' &&
                  'key' in el &&
                  el.key === 'certificationBadge'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
