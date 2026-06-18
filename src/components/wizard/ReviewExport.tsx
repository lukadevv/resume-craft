'use client';

import { useTranslations } from 'next-intl';
import type { Resume } from '@/types/resume';
import { ExportMenu } from '@/components/resume/export/ExportMenu';
import { Pencil } from 'lucide-react';

type WizardStepId =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'additional'
  | 'review';

interface ReviewExportProps {
  resume: Resume;
  onEditStep: (step: WizardStepId) => void;
}

interface SectionSummary {
  id: WizardStepId;
  labelKey: string;
  render: () => React.ReactNode;
}

export function ReviewExport({ resume, onEditStep }: ReviewExportProps) {
  const t = useTranslations('resume-form');
  const ts = useTranslations('section');

  const hasPersonalInfo =
    !!resume.personalInfo.firstName ||
    !!resume.personalInfo.email ||
    !!resume.personalInfo.phone;

  const hasAnyData =
    hasPersonalInfo ||
    !!resume.summary ||
    resume.workExperience.length > 0 ||
    resume.education.length > 0 ||
    resume.skills.length > 0 ||
    resume.projects.length > 0;

  const sections: SectionSummary[] = [
    {
      id: 'personal',
      labelKey: 'review.personalInfo',
      render: () =>
        hasPersonalInfo ? (
          <div className="space-y-1">
            <p className="font-medium">
              {resume.personalInfo.firstName} {resume.personalInfo.lastName}
            </p>
            {resume.personalInfo.email && (
              <p className="text-sm text-foreground-secondary">
                {resume.personalInfo.email}
              </p>
            )}
            {resume.personalInfo.phone && (
              <p className="text-sm text-foreground-secondary">
                {resume.personalInfo.phone}
              </p>
            )}
            {resume.personalInfo.location && (
              <p className="text-sm text-foreground-secondary">
                {resume.personalInfo.location}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-foreground-secondary/60 italic">
            {t('review.noPersonalInfo')}
          </p>
        ),
    },
    {
      id: 'summary',
      labelKey: 'review.summary',
      render: () =>
        resume.summary ? (
          <p className="text-sm text-foreground-secondary line-clamp-3">
            {resume.summary}
          </p>
        ) : (
          <p className="text-sm text-foreground-secondary/60 italic">
            {t('review.noSummary')}
          </p>
        ),
    },
    {
      id: 'experience',
      labelKey: 'review.experience',
      render: () =>
        resume.workExperience.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs text-foreground-secondary/80">
              {resume.workExperience.length} {t('review.entries', { count: resume.workExperience.length })}
            </p>
            {resume.workExperience.slice(0, 3).map((exp) => (
              <div key={exp.id}>
                <p className="text-sm font-medium">{exp.company}</p>
                <p className="text-xs text-foreground-secondary">
                  {exp.position}
                </p>
              </div>
            ))}
            {resume.workExperience.length > 3 && (
              <p className="text-xs text-foreground-secondary/60">
                {t('review.more', { count: resume.workExperience.length - 3 })}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-foreground-secondary/60 italic">
            {t('review.noExperience')}
          </p>
        ),
    },
    {
      id: 'education',
      labelKey: 'review.education',
      render: () =>
        resume.education.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs text-foreground-secondary/80">
              {resume.education.length} {t('review.entries', { count: resume.education.length })}
            </p>
            {resume.education.slice(0, 2).map((edu) => (
              <div key={edu.id}>
                <p className="text-sm font-medium">{edu.institution}</p>
                <p className="text-xs text-foreground-secondary">
                  {edu.degree}
                  {edu.field && `${ts('degreeField')}${edu.field}`}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-foreground-secondary/60 italic">
            {t('review.noEducation')}
          </p>
        ),
    },
    {
      id: 'skills',
      labelKey: 'review.skills',
      render: () =>
        resume.skills.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {resume.skills.slice(0, 8).map((skill) => (
              <span
                key={skill.id}
                className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary"
              >
                {skill.name}
              </span>
            ))}
            {resume.skills.length > 8 && (
              <span className="text-xs text-foreground-secondary/60">
                {t('review.more', { count: resume.skills.length - 8 })}
              </span>
            )}
          </div>
        ) : (
          <p className="text-sm text-foreground-secondary/60 italic">
            {t('review.noSkills')}
          </p>
        ),
    },
    {
      id: 'projects',
      labelKey: 'review.projects',
      render: () =>
        resume.projects.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs text-foreground-secondary/80">
              {resume.projects.length} {t('review.projects_count', { count: resume.projects.length })}
            </p>
            {resume.projects.slice(0, 2).map((proj) => (
              <div key={proj.id}>
                <p className="text-sm font-medium">{proj.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-foreground-secondary/60 italic">
            {t('review.noProjects')}
          </p>
        ),
    },
    {
      id: 'additional',
      labelKey: 'review.additional',
      render: () => {
        const hasCerts = resume.certifications.length > 0;
        const hasLangs = resume.languages.length > 0;
        const hasInterests = resume.interests.length > 0;
        const hasRefs = resume.references.length > 0;
        const total = [hasCerts, hasLangs, hasInterests, hasRefs].filter(
          Boolean
        ).length;

        if (total === 0) {
          return (
            <p className="text-sm text-foreground-secondary/60 italic">
              {t('review.noAdditional')}
            </p>
          );
        }

        return (
          <div className="space-y-1 text-sm text-foreground-secondary">
            {hasCerts && (
              <p>
                {resume.certifications.length} {t('review.certifications_count', { count: resume.certifications.length })}
              </p>
            )}
            {hasLangs && (
              <p>
                {resume.languages.length} {t('review.languages_count', { count: resume.languages.length })}
              </p>
            )}
            {hasInterests && (
              <p>
                {resume.interests.length} {t('review.interests_count', { count: resume.interests.length })}
              </p>
            )}
            {hasRefs && (
              <p>
                {resume.references.length} {t('review.references_count', { count: resume.references.length })}
              </p>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col h-full" data-testid="review-export">
      {/* Header with export */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 className="text-xl font-bold">{t('steps.review')}</h2>
        <div className="relative">
          <ExportMenu resume={resume} />
          {!hasAnyData && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center cursor-not-allowed z-10">
              <span className="text-xs text-destructive font-medium px-2 py-1 bg-destructive/10">
                {t('review.addDataFirst')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Section summaries */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-[730px] mx-auto space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="rounded-lg border border-border p-4 bg-surface/30"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">{t(section.labelKey)}</h3>
                <button
                  onClick={() => onEditStep(section.id)}
                  className="flex items-center gap-1 text-xs text-primary hover:underline cursor-pointer"
                >
                  <Pencil className="h-3 w-3" />
                  {t('review.edit')}
                </button>
              </div>
              {section.render()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
