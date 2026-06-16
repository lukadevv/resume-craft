import { Resume } from '@/types/resume';
import { getTemplateDefinition } from '@/lib/templates';
import { SectionRenderer, type SectionTextColors } from '@/components/templates/shared/SectionRenderer';
import { isDarkBackground } from './utils';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface SingleColumnShellProps {
  resume: Resume;
}

export function SingleColumnShell({ resume }: SingleColumnShellProps) {
  const definition = getTemplateDefinition(resume.template);
  const isDark = isDarkBackground(definition.background?.gradient);

  const colors: SectionTextColors = isDark
    ? { heading: 'text-white', body: 'text-gray-300', muted: 'text-gray-400' }
    : { heading: 'text-gray-900', body: 'text-gray-600', muted: 'text-gray-500' };

  return (
    <div
      data-testid="single-column-shell"
      data-theme={isDark ? 'dark' : 'light'}
      className="w-full @container"
    >
      <div className="bg-white">
        <div
          data-testid="a4-container"
          className="min-h-[1123px] mx-auto px-10 py-8"
          style={{
            background: definition.background?.gradient,
          }}
        >
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className={`text-3xl font-light tracking-tight ${colors.heading}`}>
              {resume.personalInfo.firstName}{' '}
              <span className="font-bold">{resume.personalInfo.lastName}</span>
            </h1>
            <div className={`mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs ${colors.muted}`}>
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
          </header>

          {/* Divider */}
          <div
            className="w-16 h-px mx-auto mb-8"
            style={{ backgroundColor: definition.accentColor }}
          />

          {/* All sections in single flow: primarySections first, then sidebarSections */}
          <div>
            {definition.primarySections.map((section) => (
              <SectionRenderer
                key={`primary-${section}`}
                section={section}
                resume={resume}
                accentColor={definition.accentColor}
                colors={colors}
              />
            ))}
            {definition.sidebarSections.map((section) => (
              <SectionRenderer
                key={`sidebar-${section}`}
                section={section}
                resume={resume}
                accentColor={definition.accentColor}
                colors={colors}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
