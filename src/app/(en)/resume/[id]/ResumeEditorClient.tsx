'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
import { ResumePreview } from '@/components/resume/preview/ResumePreview';
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
 * Zustand persist hydration. Delegates the full editor to ResumeEditorContent
 * so hooks inside it always run in consistent order.
 */
export function ResumeEditorClient() {
  const params = useParams();
  const router = useTransitionRouter();
  const resumeId = params.id as string;

  const hydrated = useHydration();

  if (!hydrated) {
    return <FullPageLoading />;
  }

  return <ResumeEditorContent resumeId={resumeId} router={router} />;
}

function ResumeEditorContent({
  resumeId,
  router,
}: {
  resumeId: string;
  router: ReturnType<typeof useTransitionRouter>;
}) {
  const t = useTranslations('resume-form');

  const resume = useResumeStore((state) => state.getResumeById(resumeId));
  const updateResume = useResumeStore((state) => state.updateResume);

  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (!resume) {
      router.push('/create');
      return;
    }
    router.replace(`/resume/edit?id=${resumeId}`);
  }, [resumeId, resume, router]);

  if (!resume) {
    return null;
  }

  const handleUpdate = (data: Partial<Resume>) => {
    updateResume(resumeId, data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-[72px]">
        <div className="flex h-[calc(100vh-72px)]">
          {/* Sidebar */}
          <aside className="w-64 border-r border-border bg-surface overflow-y-auto hidden md:block">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-foreground-secondary mb-4">{t('labels.sections')}</h2>
              <nav className="space-y-1">
                {SECTIONS.map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
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

          {/* Preview Panel */}
          {isPreviewOpen && (
            <div className="w-[400px] border-l border-border bg-surface overflow-y-auto hidden lg:block">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">{t('labels.preview')}</h2>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="text-foreground-secondary hover:text-foreground cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <ResumePreview resume={resume} />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Preview Toggle */}
        <button
          onClick={() => setIsPreviewOpen(!isPreviewOpen)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full gradient-primary text-white shadow-lg flex items-center justify-center lg:hidden cursor-pointer"
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
      </main>
    </div>
  );
}
