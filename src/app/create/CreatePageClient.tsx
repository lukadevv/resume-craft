'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResumeStore } from '@/store/resume';
import { TemplateType } from '@/types/resume';
import { Header } from '@/components/layout/Header';
import { TemplateSelector } from '@/components/resume/editor/TemplateSelector';
import { templateDefinitions } from '@/lib/templates';

function CreatePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createResume = useResumeStore((state) => state.createResume);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');

  const templateParam = searchParams.get('template') as TemplateType | null;
  useEffect(() => {
    if (templateParam && templateDefinitions.map((t) => t.id).includes(templateParam)) {
      setSelectedTemplate(templateParam);
    }
  }, [templateParam]);

  const handleCreate = () => {
    const newResume = createResume(selectedTemplate);
    router.push(`/resume/${newResume.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[72px]">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold md:text-4xl">Choose Your Template</h1>
            <p className="mt-2 text-foreground-secondary">
              Select a template to start building your resume
            </p>
          </div>

          <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleCreate}
              className="h-12 rounded-lg px-8 text-base font-medium gradient-primary text-white transition-all hover:brightness-105 hover:shadow-md"
            >
              Continue with {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}
            </button>
          </div>
        </div>
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
