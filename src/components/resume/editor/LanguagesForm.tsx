'use client';

import { useTranslations } from 'next-intl';
import { Language } from '@/types/resume';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AutocompleteInput } from '@/components/ui/AutocompleteInput';
import { Plus, Trash2, Undo2, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { IconPicker } from '@/components/ui/IconPicker';
import { TechIcon } from '@/components/ui/TechIcon';

interface LanguagesFormProps {
  data: Language[];
  onUpdate: (data: Language[]) => void;
}

const PROFICIENCY_LEVELS = ['native', 'fluent', 'advanced', 'intermediate', 'beginner'] as const;

export function LanguagesForm({ data, onUpdate }: LanguagesFormProps) {
  const t = useTranslations('resume-form');

  const addLanguage = () => {
    const newLang: Language = {
      id: crypto.randomUUID(),
      name: '',
      proficiency: 'intermediate',
    };
    onUpdate([...data, newLang]);
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onUpdate(data.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)));
  };

  const clearIconKey = (id: string) => {
    onUpdate(data.map((lang) => (lang.id === id ? { ...lang, iconKey: undefined } : lang)));
  };

  const removeLanguage = (id: string) => {
    onUpdate(data.filter((lang) => lang.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('steps.languages')}</h2>
          <p className="text-foreground-secondary">{t('stepDescriptions.languages')}</p>
        </div>
        <Button onClick={addLanguage} className="gap-2">
          <Plus className="h-4 w-4" /> {t('labels.add')}
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">{t('emptyStates.languages')}</p>
          <Button onClick={addLanguage} variant="outline">
            {t('labels.addLanguage')}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((lang) => (
            <div
              key={lang.id}
              className="rounded-lg border border-border p-4"
            >
              <div className="grid gap-4 sm:grid-cols-[auto_2fr_1fr_auto]">
                {/* Flag picker */}
                <div className="space-y-2">
                  <Label>Flag</Label>
                  <div className="flex justify-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-surface cursor-pointer"
                        >
                          <TechIcon
                            name={lang.name}
                            iconKey={lang.iconKey}
                            showDefault={false}
                            className="flex-shrink-0 w-5 h-5"
                          />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64" align="start">
                        <div className="space-y-2">
                          <IconPicker
                            value={lang.iconKey}
                            onSelect={(key) => updateLanguage(lang.id, 'iconKey', key)}
                            category="country-flag"
                          />
                          {lang.iconKey && (
                            <button
                              type="button"
                              onClick={() => clearIconKey(lang.id)}
                              className="flex items-center gap-1.5 text-xs text-foreground-secondary hover:text-foreground cursor-pointer"
                            >
                              <Undo2 className="h-3 w-3" />
                              {t('labels.autoDetect')}
                            </button>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t('fields.language')}</Label>
                  <AutocompleteInput
                    value={lang.name}
                    onChange={(value) => updateLanguage(lang.id, 'name', value)}
                    fieldType="language"
                    placeholder={t('placeholders.language')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('fields.proficiency')}</Label>
                  <div className="relative">
                    <select
                      value={lang.proficiency}
                      onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm appearance-none pr-8"
                    >
                      {PROFICIENCY_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {t(`proficiencyLevels.${level}`)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
                  </div>
                </div>

                {/* Delete */}
                <div className="pt-[34px]">
                  <button
                    onClick={() => removeLanguage(lang.id)}
                    className="text-foreground-secondary hover:text-destructive cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
