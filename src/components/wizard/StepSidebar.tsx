'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface StepSidebarStep {
  id: string;
  label: string;
}

interface StepSidebarProps {
  steps: StepSidebarStep[];
  currentStep: number;
  completedSteps: Set<string>;
  onStepClick: (id: string) => void;
  allFormStepsCompleted?: boolean;
}

export function StepSidebar({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  allFormStepsCompleted = false,
}: StepSidebarProps) {
  const t = useTranslations('resume-form');
  const totalSteps = steps.length;
  const completedCount = completedSteps.size;
  const progressPercent =
    totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const getStepState = (
    index: number,
    stepId: string
  ): 'completed' | 'current' | 'future' => {
    if (completedSteps.has(stepId)) return 'completed';
    if (index === currentStep) return 'current';
    return 'future';
  };

  const handleClick = (stepId: string, state: 'completed' | 'current' | 'future', index: number) => {
    // Allow clicking the review step (last step) if all form steps are completed
    const isReviewStep = index === steps.length - 1;
    if (isReviewStep && allFormStepsCompleted) {
      onStepClick(stepId);
      return;
    }
    if (state === 'future' || state === 'current') return;
    // completed steps are clickable
    onStepClick(stepId);
  };

  return (
    <nav className="flex flex-col h-full" data-testid="step-sidebar">
      {/* Progress bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-foreground-secondary">
            {t('progress')}
          </span>
          <span className="text-xs font-semibold">{progressPercent}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step list */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {steps.map((step, index) => {
          const state = getStepState(index, step.id);
          const stepNumber = index + 1;

          const baseClasses =
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors';

          const stateClasses: Record<string, string> = {
            completed:
              'text-foreground-secondary hover:bg-surface/50 cursor-pointer',
            current:
              'bg-primary/10 text-primary font-semibold cursor-default',
            future:
              step.id === 'review' && allFormStepsCompleted
                ? 'text-foreground-secondary hover:bg-surface/50 cursor-pointer'
                : 'text-foreground-secondary/40 cursor-default',
          };

          const numberClasses: Record<string, string> = {
            completed:
              'flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold',
            current:
              'flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold',
            future:
              'flex-shrink-0 w-6 h-6 rounded-full border-2 border-foreground-secondary/30 text-foreground-secondary/40 flex items-center justify-center text-xs font-medium',
          };

          return (
            <button
              key={step.id}
              disabled={state === 'future' && !(step.id === 'review' && allFormStepsCompleted)}
              onClick={() => handleClick(step.id, state, index)}
              className={`${baseClasses} ${stateClasses[state]}`}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              <span className={numberClasses[state]}>
                {state === 'completed' ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  stepNumber
                )}
              </span>
              <span className="truncate">{step.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
