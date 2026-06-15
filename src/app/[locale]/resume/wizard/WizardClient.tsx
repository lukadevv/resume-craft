'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useResumeStore } from '@/store/resume';
import { useLocale } from '@/lib/locale-utils';
import type { Resume } from '@/types/resume';
import { getSampleDataForTemplate } from '@/lib/sampleData';
import { Header } from '@/components/layout/Header';
import { StepSidebar } from '@/components/wizard/StepSidebar';
import { StepForm, type WizardStepId } from '@/components/wizard/StepForm';
import { StepPreview } from '@/components/wizard/StepPreview';
import { ReviewExport } from '@/components/wizard/ReviewExport';
import { Sparkles } from 'lucide-react';

const WIZARD_STEP_IDS: WizardStepId[] = [
  'personal',
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'additional',
  'review',
];

const stepKeyMap: Record<WizardStepId, string> = {
  personal: 'personalInfo',
  summary: 'summary',
  experience: 'experience',
  education: 'education',
  skills: 'skills',
  projects: 'projects',
  additional: 'additional',
  review: 'review',
};

const TOTAL_FORM_STEPS = WIZARD_STEP_IDS.length - 1; // exclude 'review'
const REVIEW_INDEX = WIZARD_STEP_IDS.length - 1;

function WizardContent() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get('id');
  const t = useTranslations('resume-form');
  const locale = useLocale();

  const updateResume = useResumeStore((s) => s.updateResume);

  const resume = useResumeStore((state) =>
    resumeId ? state.resumes.find((r) => r.id === resumeId) : undefined
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [previewOpen, setPreviewOpen] = useState(false);

  const wizardSteps = WIZARD_STEP_IDS.map((id) => ({
    id,
    label: t(`steps.${stepKeyMap[id]}`),
  }));

  const allFormStepsCompleted = WIZARD_STEP_IDS.slice(0, -1).every((s) => completedSteps.has(s));

  const handleStepClick = useCallback(
    (stepId: string) => {
      const stepIndex = WIZARD_STEP_IDS.findIndex((s) => s === stepId);
      if (stepIndex < 0) return;
      if (completedSteps.has(stepId)) {
        setCurrentStep(stepIndex);
      } else if (stepId === 'review' && allFormStepsCompleted) {
        setCurrentStep(stepIndex);
      }
    },
    [completedSteps, allFormStepsCompleted]
  );

  const handleUpdate = useCallback(
    (data: Partial<Resume>) => {
      if (resume) {
        updateResume(resume.id, data);
      }
    },
    [resume, updateResume]
  );

  const handleNext = useCallback(() => {
    const currentId = WIZARD_STEP_IDS[currentStep];

    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(currentId);
      if (currentStep + 1 === REVIEW_INDEX) {
        next.add(WIZARD_STEP_IDS[REVIEW_INDEX]);
      }
      return next;
    });

    if (currentStep < WIZARD_STEP_IDS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleLoadSample = useCallback(() => {
    if (!resume) return;
    const sampleData = getSampleDataForTemplate(resume.template, locale);
    updateResume(resume.id, sampleData);
  }, [resume, updateResume]);

  const handleEditStep = useCallback((step: WizardStepId) => {
    const stepIndex = WIZARD_STEP_IDS.findIndex((s) => s === step);
    if (stepIndex >= 0) {
      setCurrentStep(stepIndex);
    }
  }, []);

  if (!resume) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[72px] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-semibold mb-2">{t('wizard.resumeNotFound')}</h1>
            <p className="text-foreground-secondary">
              {t('wizard.resumeNotFoundDesc')}
            </p>
          </div>
        </main>
      </div>
    );
  }

  const isLastFormStep = currentStep === TOTAL_FORM_STEPS - 1;
  const isReviewStep = currentStep === REVIEW_INDEX;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[72px]">
        <div className="hidden xl:grid xl:grid-cols-[260px_0.9fr_1fr] h-[calc(100vh-72px)]">
          {/* Left: Step Sidebar */}
          <div className="border-r border-border bg-surface/30 overflow-hidden">
            <StepSidebar
              steps={wizardSteps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
              allFormStepsCompleted={allFormStepsCompleted}
            />
          </div>

          {/* Center: Form or Review */}
          <div className="overflow-hidden flex flex-col">
            {isReviewStep ? (
              <ReviewExport resume={resume} onEditStep={handleEditStep} />
            ) : (
              <>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <StepForm
                    step={WIZARD_STEP_IDS[currentStep]}
                    resume={resume}
                    onUpdate={handleUpdate}
                  />
                </div>
                {/* Navigation buttons */}
                <div className="flex-shrink-0 border-t border-border px-6 py-3 bg-surface/30">
                  <div className="max-w-[730px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={currentStep === 0}
                        onClick={handleBack}
                        data-testid="wizard-back"
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          currentStep === 0
                            ? 'border-border text-foreground-secondary/40 cursor-not-allowed'
                            : 'border-border text-foreground hover:bg-surface cursor-pointer'
                        }`}
                      >
                        {t('labels.back')}
                      </button>
                      <button
                        type="button"
                        onClick={handleLoadSample}
                        data-testid="wizard-load-sample"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-border text-foreground-secondary hover:bg-surface cursor-pointer transition-colors"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        {t('labels.loadSampleData')}
                      </button>
                    </div>

                    {!isReviewStep && (
                      <button
                        type="button"
                        onClick={handleNext}
                        data-testid="wizard-next"
                        className="px-5 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:brightness-105 cursor-pointer"
                      >
                        {isLastFormStep ? t('steps.review') : t('labels.next')}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: Preview */}
          <div className="border-l border-border bg-surface/20 overflow-y-auto">
            <StepPreview resume={resume} />
          </div>
        </div>

        {/* Tablet / Mobile: Stacked layout */}
        <div className="xl:hidden">
          <div className="flex flex-col h-[calc(100vh-72px)]">
            {/* Step indicator bar */}
            <div className="flex-shrink-0 border-b border-border bg-surface/30 px-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {t('wizard.stepOf', {
                    current: currentStep + 1,
                    total: wizardSteps.length,
                    label: wizardSteps[currentStep].label,
                  })}
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-hidden">
              {isReviewStep ? (
                <ReviewExport resume={resume} onEditStep={handleEditStep} />
              ) : (
                <StepForm
                  step={WIZARD_STEP_IDS[currentStep]}
                  resume={resume}
                  onUpdate={handleUpdate}
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex-shrink-0 border-t border-border px-4 py-3 bg-surface/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentStep === 0}
                    onClick={handleBack}
                    data-testid="wizard-back-mobile"
                    className={`px-4 py-2 text-sm font-medium border transition-colors ${
                      currentStep === 0
                        ? 'border-border text-foreground-secondary/40 cursor-not-allowed'
                        : 'border-border text-foreground hover:bg-surface cursor-pointer'
                    }`}
                  >
                    {t('labels.back')}
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    data-testid="wizard-load-sample-mobile"
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium border border-border text-foreground-secondary hover:bg-surface cursor-pointer transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{t('labels.loadSampleData')}</span>
                  </button>
                </div>
                {!isReviewStep && (
                  <button
                    type="button"
                    onClick={handleNext}
                    data-testid="wizard-next-mobile"
                    className="px-5 py-2 gradient-primary text-white text-sm font-medium hover:brightness-105 cursor-pointer"
                  >
                    {isLastFormStep ? t('steps.review') : t('labels.next')}
                  </button>
                )}
              </div>
            </div>

            {/* FAB for mobile preview toggle */}
            {!previewOpen && (
              <button
                onClick={() => setPreviewOpen(true)}
                className="fixed bottom-24 right-6 h-14 w-14 rounded-full gradient-primary text-white shadow-lg flex items-center justify-center cursor-pointer z-30"
                aria-label={t('labels.showPreview')}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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

            {/* Mobile preview overlay */}
            {previewOpen && (
              <div className="fixed inset-0 z-40 bg-background flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                  <h2 className="text-sm font-semibold text-foreground">{t('labels.preview')}</h2>
                  <button
                    onClick={() => setPreviewOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-surface transition-colors cursor-pointer"
                    aria-label={t('labels.closePreview')}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {t('labels.close')}
                  </button>
                </div>

                {/* Preview content */}
                <div className="flex-1 overflow-y-auto">
                  <StepPreview resume={resume} />
                </div>

                {/* Persistent bottom bar */}
                <div className="shrink-0 border-t border-border px-4 py-3 bg-background">
                  <button
                    onClick={() => setPreviewOpen(false)}
                    className="w-full py-2 text-sm font-medium border border-border text-foreground hover:bg-surface transition-colors cursor-pointer"
                  >
                    {t('labels.backToEditor')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export function WizardClient() {
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
      <WizardContent />
    </Suspense>
  );
}
