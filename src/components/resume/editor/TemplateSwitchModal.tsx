'use client';

import { TemplateType } from '@/types/resume';
import { templateDefinitionMap } from '@/lib/templates';

interface TemplateSwitchModalProps {
  isOpen: boolean;
  currentTemplate: TemplateType;
  newTemplate: TemplateType;
  onConfirm: (action: 'keep' | 'replace' | 'cancel') => void;
}

export function TemplateSwitchModal({
  isOpen,
  currentTemplate,
  newTemplate,
  onConfirm,
}: TemplateSwitchModalProps) {
  if (!isOpen) return null;

  const currentTemplateDef = templateDefinitionMap[currentTemplate];
  const newTemplateDef = templateDefinitionMap[newTemplate];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Switch Template?</h2>
          <p className="text-sm text-foreground-secondary mt-1">
            You&apos;re changing from{' '}
            <span className="font-medium">{currentTemplateDef?.name}</span> to{' '}
            <span className="font-medium">{newTemplateDef?.name}</span>
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <p className="text-sm text-foreground-secondary">
            How would you like to handle your existing data?
          </p>

          <button
            onClick={() => onConfirm('replace')}
            className="w-full p-4 border rounded-lg text-left hover:border-primary hover:bg-surface transition-colors group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-gray-300 group-hover:border-primary flex-shrink-0" />
              <div>
                <h4 className="font-medium">Load template sample data</h4>
                <p className="text-xs text-foreground-secondary mt-1">
                  Replace current data with the new template&apos;s sample content
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onConfirm('keep')}
            className="w-full p-4 border rounded-lg text-left hover:border-primary hover:bg-surface transition-colors group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-gray-300 group-hover:border-primary flex-shrink-0" />
              <div>
                <h4 className="font-medium">Keep current data</h4>
                <p className="text-xs text-foreground-secondary mt-1">
                  Keep your existing information and adapt it to the new template
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-surface/50">
          <button
            onClick={() => onConfirm('cancel')}
            className="w-full py-2 text-center text-sm text-foreground-secondary hover:text-foreground transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
