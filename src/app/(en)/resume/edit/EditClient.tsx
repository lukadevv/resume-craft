'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTransitionRouter } from 'next-view-transitions';
import { useTranslations } from 'next-intl';
import { useResumeStore } from '@/store/resume';
import { useHydration } from '@/hooks/use-hydration';
import { Resume } from '@/types/resume';
import { Header } from '@/components/layout/Header';
import { FullPageLoading } from '@/components/ui/FullPageLoading';
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
import { StepPreview } from '@/components/wizard/StepPreview';
import { ExportMenu } from '@/components/resume/export/ExportMenu';

type Section =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'interests'
  | 'references';

const sectionKeyMap: Record<Section, string> = {
  personal: 'personalInfo',
  summary: 'summary',
  experience: 'experience',
  education: 'education',
  skills: 'skills',
  projects: 'projects',
  certifications: 'certifications',
  languages: 'languages',
  interests: 'interests',
  references: 'references',
};

const SECTIONS: Section[] = [
  'personal',
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
  'interests',
  'references',
];

/**
 * Outer wrapper — only renders hooks that are safe to call before
 * Zustand persist hydration. Delegates the full editor to EditContentInner
 * so hooks inside it always run in consistent order.
 */
function EditContent() {
  const searchParams = useSearchParams();
  const router = useTransitionRouter();
  const resumeId = searchParams.get('id');

  const hydrated = useHydration();

  if (!hydrated) {
    return <FullPageLoading />;
  }

  return <EditContentInner resumeId={resumeId} router={router} />;
}

function EditContentInner({
  resumeId,
  router,
}: {
  resumeId: string | null;
  router: ReturnType<typeof useTransitionRouter>;
}) {
  const t = useTranslations('resume-form');

  const resumes = useResumeStore((state) => state.resumes);
  const currentResume = useResumeStore((state) => state.currentResume);
  const updateResume = useResumeStore((state) => state.updateResume);
  const setCurrentResume = useResumeStore((state) => state.setCurrentResume);

  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);

  const resume = resumeId
    ? resumes.find((r) => r.id === resumeId) ?? currentResume
    : currentResume;

  useEffect(() => {
    if (resumeId && resume) {
      setCurrentResume(resumeId);
    }
  }, [resumeId, resume, setCurrentResume]);

  useEffect(() => {
    if (!resume) {
      router.push('/create');
    }
  }, [resume, router]);

  if (!resume) {
    return null;
  }

  const handleUpdate = (data: Partial<Resume>) => {
    updateResume(resume.id, data);
  };

  const sectionsNav = (onSectionClick?: () => void) => (
    <>
      <h2 className="text-sm font-semibold text-foreground-secondary mb-4">{t('labels.sections')}</h2>
      <nav className="space-y-1">
        {SECTIONS.map((section) => (
          <button
            key={section}
            onClick={() => {
              setActiveSection(section);
              onSectionClick?.();
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
              activeSection === section
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-foreground-secondary hover:bg-surface hover:text-foreground'
            }`}
          >
            {t(`steps.${sectionKeyMap[section]}`)}
          </button>
        ))}
      </nav>

      <div className="mt-6 pt-4 border-t border-border">
        <ExportMenu resume={resume} />
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-[72px]">
        <div className="flex h-[calc(100vh-72px)] min-[1200px]:grid min-[1200px]:grid-cols-[16rem_1fr_1.2fr]">
          {/* Desktop Sidebar — shows from lg (1024px) in flex layout, always visible */}
          <aside className="border-r border-border bg-surface overflow-y-auto hidden lg:block w-64 min-[1200px]:w-auto">
            <div className="p-4">
              {sectionsNav()}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto p-6">
              {activeSection === 'personal' && (
                <PersonalInfoForm
                  data={resume.personalInfo}
                  onUpdate={(data) => handleUpdate({ personalInfo: data })}
                />
              )}
              {activeSection === 'summary' && (
                <SummaryForm
                  data={resume.summary}
                  onUpdate={(data) => handleUpdate({ summary: data })}
                />
              )}
              {activeSection === 'experience' && (
                <ExperienceForm
                  data={resume.workExperience}
                  onUpdate={(data) => handleUpdate({ workExperience: data })}
                />
              )}
              {activeSection === 'education' && (
                <EducationForm
                  data={resume.education}
                  onUpdate={(data) => handleUpdate({ education: data })}
                />
              )}
              {activeSection === 'skills' && (
                <SkillsForm
                  data={resume.skills}
                  onUpdate={(data) => handleUpdate({ skills: data })}
                />
              )}
              {activeSection === 'projects' && (
                <ProjectsForm
                  data={resume.projects}
                  onUpdate={(data) => handleUpdate({ projects: data })}
                />
              )}
              {activeSection === 'certifications' && (
                <CertificationsForm
                  data={resume.certifications}
                  onUpdate={(data) => handleUpdate({ certifications: data })}
                />
              )}
              {activeSection === 'languages' && (
                <LanguagesForm
                  data={resume.languages}
                  onUpdate={(data) => handleUpdate({ languages: data })}
                />
              )}
              {activeSection === 'interests' && (
                <InterestsForm
                  data={resume.interests}
                  onUpdate={(data) => handleUpdate({ interests: data })}
                />
              )}
              {activeSection === 'references' && (
                <ReferencesForm
                  data={resume.references}
                  onUpdate={(data) => handleUpdate({ references: data })}
                />
              )}
            </div>
          </div>

          {/* Desktop Preview Panel — only from 1200px+ */}
          <div className="border-l border-border bg-surface/20 overflow-hidden hidden min-[1200px]:block">
            <StepPreview resume={resume} />
          </div>
        </div>

        {/* Mobile/Tablet: sections toggle FAB (left) — hidden on lg+ */}
        {!isSectionsOpen && !isPreviewOpen && (
          <button
            onClick={() => setIsSectionsOpen(true)}
            className="fixed bottom-6 left-6 z-30 h-14 w-14 rounded-full gradient-primary text-white shadow-lg flex items-center justify-center lg:hidden cursor-pointer"
            aria-label={t('labels.showSections')}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Mobile/Tablet: preview toggle FAB (right) — hidden from 1200px+ */}
        {!isPreviewOpen && !isSectionsOpen && (
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full gradient-primary text-white shadow-lg flex items-center justify-center min-[1200px]:hidden cursor-pointer"
            aria-label={t('labels.showPreview')}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        )}

        {/* Mobile/Tablet: fullscreen sections sidebar overlay */}
        {isSectionsOpen && (
          <div className="fixed inset-0 z-40 bg-background flex flex-col lg:hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0 bg-surface/80 backdrop-blur-sm">
              <h2 className="text-sm font-semibold text-foreground">{t('labels.sections')}</h2>
              <button
                onClick={() => setIsSectionsOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-surface transition-colors cursor-pointer"
                aria-label={t('labels.closeSections')}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t('labels.close')}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {sectionsNav(() => setIsSectionsOpen(false))}
            </div>
          </div>
        )}

        {/* Mobile/Tablet: fullscreen preview overlay — hidden from 1200px+ */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-40 bg-background flex flex-col min-[1200px]:hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0 bg-surface/80 backdrop-blur-sm">
              <h2 className="text-sm font-semibold text-foreground">{t('labels.preview')}</h2>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-surface transition-colors cursor-pointer"
                aria-label={t('labels.closePreview')}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t('labels.close')}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <StepPreview resume={resume} />
            </div>

            <div className="shrink-0 border-t border-border px-4 py-3 bg-background">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="w-full py-2 text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors cursor-pointer rounded-lg"
              >
                {t('labels.backToEditor')}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export function EditClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-[72px] flex items-center justify-center">
            <div className="text-foreground-secondary">Loading...</div>
          </main>
        </div>
      }
    >
      <EditContent />
    </Suspense>
  );
}
