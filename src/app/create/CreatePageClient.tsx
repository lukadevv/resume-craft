'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResumeStore } from '@/store/resume';
import { TemplateType, Resume } from '@/types/resume';
import { templateDefinitions, templateDefinitionMap } from '@/lib/templates';
import { getSampleDataForTemplate } from '@/lib/sampleData';
import { Header } from '@/components/layout/Header';
import { PlaygroundPreview } from '@/components/resume/editor/PlaygroundPreview';
import { EditDetailsPanel } from '@/components/resume/editor/EditDetailsPanel';
import { TemplateSwitchModal } from '@/components/resume/editor/TemplateSwitchModal';

function CreatePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createResume, updateResume, getResumeById } = useResumeStore();

  const resumeIdParam = searchParams.get('resumeId');
  const existingResume = resumeIdParam ? getResumeById(resumeIdParam) : null;

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(
    existingResume?.template || 'modern'
  );
  const [previewData, setPreviewData] = useState<Partial<Resume> | null>(null);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<TemplateType | null>(null);
  const [hasExistingData, setHasExistingData] = useState(false);

  useEffect(() => {
    if (existingResume) {
      setPreviewData(existingResume);
      setHasExistingData(true);
    } else {
      const sampleData = getSampleDataForTemplate(selectedTemplate);
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
      const sampleData = getSampleDataForTemplate(template);
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
      const sampleData = getSampleDataForTemplate(pendingTemplate);
      setPreviewData(sampleData);
      setSelectedTemplate(pendingTemplate);
      setHasExistingData(true);
    } else if (action === 'keep' && pendingTemplate) {
      setSelectedTemplate(pendingTemplate);
    }

    setShowTemplateModal(false);
    setPendingTemplate(null);
  };

  const handleDataChange = (data: Partial<Resume>) => {
    setPreviewData(data);
    setHasExistingData(true);
  };

  const handleCreate = () => {
    if (!previewData) return;

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
      const newResume = createResume(selectedTemplate, {
        ...previewData,
        themeColor,
      });
      router.push(`/resume/edit?id=${newResume.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[72px]">
        <div className="flex h-[calc(100vh-72px)]">
          {/* Left Panel - Template Selection */}
          <div className="w-[400px] border-r overflow-y-auto p-6 bg-surface/30">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Choose Your Template</h1>
              <p className="text-sm text-foreground-secondary mt-1">
                {existingResume
                  ? 'Edit your resume with a new template'
                  : 'Select a template to start building your resume'}
              </p>
            </div>

            <div className="space-y-3">
              {templateDefinitions.map((template) => (
                <button
                  key={template.id}
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
                      <h3 className="font-medium text-sm">{template.name}</h3>
                      <p className="text-xs text-foreground-secondary truncate">
                        {template.description}
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
          <div className="flex-1 overflow-y-auto p-8 bg-gray-100/50">
            <div className="max-w-3xl mx-auto">
              {/* Actions */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Live Preview</h2>
                  <p className="text-sm text-foreground-secondary">
                    Template: {templateDefinitionMap[selectedTemplate]?.name}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditingDetails(true)}
                    className="px-4 py-2 border rounded-lg hover:bg-surface transition-colors text-sm font-medium cursor-pointer"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={handleCreate}
                    className="px-6 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:brightness-105 transition-all cursor-pointer"
                  >
                    {existingResume ? 'Save Changes' : 'Create Resume'}
                  </button>
                </div>
              </div>

              {/* Preview */}
              {previewData && (
                <div className="transform scale-[0.85] origin-top">
                  <PlaygroundPreview template={selectedTemplate} data={previewData} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Details Modal */}
        {isEditingDetails && previewData && (
          <EditDetailsPanel
            data={previewData}
            onChange={handleDataChange}
            onClose={() => setIsEditingDetails(false)}
          />
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
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-foreground-secondary">Loading...</div>
        </div>
      }
    >
      <CreatePageContent />
    </Suspense>
  );
}
