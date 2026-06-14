'use client';

import { useTranslations } from 'next-intl';
import type { Resume } from '@/types/resume';
import { PersonalInfoForm } from '@/components/resume/editor/PersonalInfoForm';
import { SummaryForm } from '@/components/resume/editor/SummaryForm';
import { ExperienceForm } from '@/components/resume/editor/ExperienceForm';
import { EducationForm } from '@/components/resume/editor/EducationForm';
import { SkillsForm } from '@/components/resume/editor/SkillsForm';
import { ProjectsForm } from '@/components/resume/editor/ProjectsForm';
import { CertificationsForm } from '@/components/resume/editor/CertificationsForm';
import { LanguagesForm } from '@/components/resume/editor/LanguagesForm';
import { InterestsForm } from '@/components/resume/editor/InterestsForm';
import { ReferencesForm } from '@/components/resume/editor/ReferencesForm';

export type WizardStepId =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'additional'
  | 'review';

interface StepFormProps {
  step: WizardStepId;
  resume: Resume;
  onUpdate: (data: Partial<Resume>) => void;
}

export function StepForm({ step, resume, onUpdate }: StepFormProps) {
  const t = useTranslations('resume-form');

  const renderForm = () => {
    switch (step) {
      case 'personal':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{t('sectionHeadings.personalInformation')}</h2>
              <p className="text-foreground-secondary text-sm mt-1">
                {t('stepDescriptions.personal')}
              </p>
            </div>
            <PersonalInfoForm
              data={resume.personalInfo}
              onUpdate={(data) => onUpdate({ personalInfo: data })}
            />
          </div>
        );

      case 'summary':
        return (
          <SummaryForm
            data={resume.summary}
            onUpdate={(data) => onUpdate({ summary: data })}
          />
        );

      case 'experience':
        return (
          <ExperienceForm
            data={resume.workExperience}
            onUpdate={(data) => onUpdate({ workExperience: data })}
          />
        );

      case 'education':
        return (
          <EducationForm
            data={resume.education}
            onUpdate={(data) => onUpdate({ education: data })}
          />
        );

      case 'skills':
        return (
          <SkillsForm
            data={resume.skills}
            onUpdate={(data) => onUpdate({ skills: data })}
          />
        );

      case 'projects':
        return (
          <ProjectsForm
            data={resume.projects}
            onUpdate={(data) => onUpdate({ projects: data })}
          />
        );

      case 'additional':
        return (
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('sectionHeadings.additionalInformation')}</h2>
            </div>
            <section>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                {t('sectionHeadings.certifications')}
              </h3>
              <CertificationsForm
                data={resume.certifications}
                onUpdate={(data) => onUpdate({ certifications: data })}
              />
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                {t('sectionHeadings.languages')}
              </h3>
              <LanguagesForm
                data={resume.languages}
                onUpdate={(data) => onUpdate({ languages: data })}
              />
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                {t('sectionHeadings.interests')}
              </h3>
              <InterestsForm
                data={resume.interests}
                onUpdate={(data) => onUpdate({ interests: data })}
              />
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                {t('sectionHeadings.references')}
              </h3>
              <ReferencesForm
                data={resume.references}
                onUpdate={(data) => onUpdate({ references: data })}
              />
            </section>
          </div>
        );

      case 'review':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-foreground-secondary text-lg">
              {t('stepDescriptions.reviewPlaceholder')}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full" data-testid="step-form">
      {/* Form content */}
      <div className="flex-1 overflow-y-scroll px-6 pt-6">
        <div className="max-w-[730px] mx-auto">
          {renderForm()}
        </div>
      </div>
    </div>
  );
}
