'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTransitionRouter } from 'next-view-transitions';
import { useResumeStore } from '@/store/resume';
import { useLocale } from '@/lib/locale-utils';
import { TemplateType, Resume } from '@/types/resume';
import { templateDefinitions, templateDefinitionMap } from '@/lib/templates';
import { getSampleDataForTemplate } from '@/lib/sampleData';
import { Header } from '@/components/layout/Header';
import { getTemplateComponent } from '@/components/resume/export/ExportMenu';
import { TemplateSwitchModal } from '@/components/resume/editor/TemplateSwitchModal';
import { FileDown, Monitor, LayoutGrid } from 'lucide-react';

type PreviewMode = 'pdf' | 'html';

function CreatePageContent() {
  const router = useTransitionRouter();
  const searchParams = useSearchParams();
  const { createResume, updateResume, getResumeById } = useResumeStore();
  const t = useTranslations('templates');
  const locale = useLocale();

  const resumeIdParam = searchParams.get('resumeId');
  const templateParam = searchParams.get('template') as TemplateType | null;
  const existingResume = resumeIdParam ? getResumeById(resumeIdParam) : null;

  const [resumeName, setResumeName] = useState('My Resume');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(() => {
    // Priority: existing resume template > URL query param > default
    if (existingResume?.template) return existingResume.template;
    if (templateParam && templateParam in templateDefinitionMap) return templateParam;
    return 'modern';
  });
  const [previewData, setPreviewData] = useState<Partial<Resume> | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<TemplateType | null>(null);
  const [hasExistingData, setHasExistingData] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [mode, setMode] = useState<PreviewMode>('pdf');
  const [previewOpen, setPreviewOpen] = useState(false);

  const isNameValid = resumeName.trim().length > 0;

  const templateListRef = useRef<HTMLDivElement>(null);

  // Scroll the selected template button into view whenever it changes
  useEffect(() => {
    const button = templateListRef.current?.querySelector<HTMLButtonElement>(
      `[data-template-id="${selectedTemplate}"]`
    );
    button?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedTemplate]);

  useEffect(() => {
    if (existingResume) {
      setPreviewData(existingResume);
      setHasExistingData(true);
      setResumeName(existingResume.name || '');
    } else {
      const sampleData = getSampleDataForTemplate(selectedTemplate, locale);
      setPreviewData(sampleData);
      setHasExistingData(false);
    }
  }, [existingResume, selectedTemplate]);

  const handleTemplateSelect = (template: TemplateType) => {
    if (template === selectedTemplate) return;

    if (hasExistingData || existingResume) {
      setPendingTemplate(template);
      setShowTemplateModal(true);
    } else {
      const sampleData = getSampleDataForTemplate(template, locale);
      setPreviewData(sampleData);
      setSelectedTemplate(template);
    }
  };

  const handleTemplateModalConfirm = (action: 'keep' | 'replace' | 'cancel') => {
    if (action === 'cancel') {
      setShowTemplateModal(false);
      setPendingTemplate(null);
      return;
    }

    if (action === 'replace' && pendingTemplate) {
      const sampleData = getSampleDataForTemplate(pendingTemplate, locale);
      setPreviewData(sampleData);
      setSelectedTemplate(pendingTemplate);
      setHasExistingData(true);
    } else if (action === 'keep' && pendingTemplate) {
      setSelectedTemplate(pendingTemplate);
    }

    setShowTemplateModal(false);
    setPendingTemplate(null);
  };

  const TemplateComponent = getTemplateComponent(selectedTemplate);

  const handleCreate = () => {
    if (!isNameValid || isCreating) return;
    setIsCreating(true);

    const templateDef = templateDefinitionMap[selectedTemplate];
    const themeColor = templateDef?.accentColor || '#3ECF8E';

    if (existingResume) {
      updateResume(existingResume.id, {
        ...previewData,
        template: selectedTemplate,
        themeColor,
      });
      router.push(`/resume/edit?id=${existingResume.id}`);
    } else {
      const newResume = createResume({
        template: selectedTemplate,
        name: resumeName.trim(),
        initialData: { themeColor },
      });
      router.push(`/resume/wizard?id=${newResume.id}`);
    }
  };

  const renderPreview = () => {
    if (!previewData) return null;
    const resumeData = { ...previewData, template: selectedTemplate } as Resume;

    if (mode === 'pdf') {
      return (
        <div className="overflow-x-auto py-8 px-4">
          <div className="mx-auto" style={{ width: 794 }}>
            <div className="bg-white shadow-xl" style={{ minHeight: 1123 }}>
              <TemplateComponent resume={resumeData} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="py-6 px-4 w-full @container">
        <TemplateComponent resume={resumeData} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[72px]">
        <div className="flex h-[calc(100vh-72px)]">
          {/* Left Panel - Template Selection */}
          <div ref={templateListRef} className="hidden md:block w-[400px] border-r overflow-y-auto p-6 bg-surface/30">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">{t('chooseTemplate')}</h1>
              <p className="text-sm text-foreground-secondary mt-1">
                {existingResume ? t('editWithNewTemplate') : t('selectTemplateStart')}
              </p>
            </div>

            {/* Resume Name Input */}
            <div className="mb-6">
              <label htmlFor="resume-name" className="block text-sm font-medium mb-1.5">
                {t('resumeName')}
              </label>
              <input
                id="resume-name"
                type="text"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                placeholder={t('resumeNamePlaceholder')}
                className="w-full px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none text-sm"
              />
            </div>

            <div className="space-y-3">
              {templateDefinitions.map((template) => (
                  <button
                  key={template.id}
                  data-template-id={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedTemplate === template.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50 hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0"
                      style={{
                        background: template.background?.gradient || template.accentColor,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{t(`${template.id}.name`, { fallback: template.name })}</h3>
                      <p className="text-xs text-foreground-secondary truncate">
                        {t(`${template.id}.description`, { fallback: template.description })}
                      </p>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Sticky header — uses site theme, not template colors */}
            <div className="sticky top-0 z-10 shrink-0 bg-surface/80 backdrop-blur-sm border-b border-border">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-semibold text-foreground">
                    {t('livePreview')}
                  </h2>
                  {/* Mode tabs */}
                  <div className="flex items-center gap-1 rounded-lg p-0.5 bg-black/5 dark:bg-white/10">
                    <button
                      type="button"
                      onClick={() => setMode('pdf')}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        mode === 'pdf'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-foreground-secondary hover:text-foreground'
                      }`}
                    >
                      <FileDown className="h-3.5 w-3.5" />
                      PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('html')}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        mode === 'html'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-foreground-secondary hover:text-foreground'
                      }`}
                    >
                      <Monitor className="h-3.5 w-3.5" />
                      HTML
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleCreate}
                  disabled={!isNameValid || isCreating}
                  className={`px-5 py-2 gradient-primary text-white text-sm font-medium transition-all cursor-pointer shrink-0 ${
                    !isNameValid || isCreating ? 'pointer-events-none opacity-50' : 'hover:brightness-105'
                  }`}
                >
                  {isCreating ? t('creating') : existingResume ? t('saveChanges') : t('startBuilding')}
                </button>
              </div>
            </div>

            {/* Scrollable preview area — uses site bg, not template bg */}
            <div className="flex-1 overflow-auto bg-background">
              {renderPreview()}
            </div>
          </div>
        </div>

        {/* Mobile: menu button to show template list */}
        {!previewOpen && (
          <button
            onClick={() => setPreviewOpen(true)}
            className="md:hidden fixed bottom-6 right-6 z-30 flex items-center gap-2 h-12 px-5 rounded-full gradient-primary text-white shadow-lg cursor-pointer"
            aria-label="Show templates"
          >
            <LayoutGrid className="h-5 w-5" />
            <span className="text-sm font-medium">{t('chooseTemplate')}</span>
          </button>
        )}

        {/* Mobile template list overlay */}
        {previewOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-background flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
              <h2 className="text-sm font-semibold text-foreground">{t('chooseTemplate')}</h2>
              <button
                onClick={() => setPreviewOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-surface transition-colors cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t('close')}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {templateDefinitions.map((template) => (
                  <button
                  key={template.id}
                  onClick={() => {
                    handleTemplateSelect(template.id);
                    setPreviewOpen(false);
                  }}
                  className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedTemplate === template.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50 hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0"
                      style={{
                        background: template.background?.gradient || template.accentColor,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{t(`${template.id}.name`, { fallback: template.name })}</h3>
                      <p className="text-xs text-foreground-secondary truncate">
                        {t(`${template.id}.description`, { fallback: template.description })}
                      </p>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Template Switch Modal */}
        <TemplateSwitchModal
          isOpen={showTemplateModal}
          currentTemplate={selectedTemplate}
          newTemplate={pendingTemplate || selectedTemplate}
          onConfirm={handleTemplateModalConfirm}
        />
      </main>
    </div>
  );
}

export function CreatePageClient() {
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
      <CreatePageContent />
    </Suspense>
  );
}
