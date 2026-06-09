'use client';

import type { TemplateType } from '@/types/resume';
import { templateDefinitions } from '@/lib/templates';

interface TemplateSelectorProps {
  selected: TemplateType;
  onSelect: (template: TemplateType) => void;
}

const templates = templateDefinitions;

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={`relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all cursor-pointer ${
            selected === template.id
              ? 'border-primary shadow-lg shadow-primary/20'
              : 'border-border hover:border-primary/50'
          }`}
        >
          {/* Preview */}
          <div
            style={{
              backgroundImage: template.background?.gradient || `linear-gradient(135deg, ${template.accentColor}, #1f1f1f)`,
            }}
            className="aspect-[3/4] rounded-lg p-4 mb-3"
          >
            <div className="h-full rounded-lg bg-white shadow-sm">
              <div className="h-full p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-200" />
                  <div className="space-y-1">
                    <div className="h-2 w-12 rounded bg-gray-200" />
                    <div className="h-1.5 w-10 rounded bg-gray-100" />
                  </div>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="h-1.5 w-full rounded bg-gray-100" />
                  <div className="h-1.5 w-4/5 rounded bg-gray-100" />
                </div>
              </div>
            </div>
          </div>

          {/* Selection indicator */}
          {selected === template.id && (
            <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
              <svg
                className="h-3 w-3 text-white"
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

          <h3 className="font-semibold">{template.name}</h3>
          <p className="text-sm text-foreground-secondary">{template.description}</p>
        </button>
      ))}
    </div>
  );
}
