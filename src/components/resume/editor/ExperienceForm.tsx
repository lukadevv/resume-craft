'use client';

import { useTranslations } from 'next-intl';
import { WorkExperience } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AutocompleteInput } from '@/components/ui/AutocompleteInput';
import { Plus, Trash2, Calendar } from 'lucide-react';

interface ExperienceFormProps {
  data: WorkExperience[];
  onUpdate: (data: WorkExperience[]) => void;
}

export function ExperienceForm({ data, onUpdate }: ExperienceFormProps) {
  const t = useTranslations('resume-form');

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onUpdate([...data, newExp]);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    onUpdate(data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)));
  };

  const removeExperience = (id: string) => {
    onUpdate(data.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('steps.experience')}</h2>
          <p className="text-foreground-secondary">{t('stepDescriptions.experience')}</p>
        </div>
        <Button onClick={addExperience} className="gap-2">
          <Plus className="h-4 w-4" /> {t('labels.add')}
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">{t('emptyStates.experience')}</p>
          <Button onClick={addExperience} variant="outline">
            {t('labels.addExperience')}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((exp) => (
            <div key={exp.id} className="relative rounded-lg border border-border p-4">
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute right-4 top-4 text-foreground-secondary hover:text-destructive cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.company')}</Label>
                    <AutocompleteInput
                      value={exp.company}
                      onChange={(value) => updateExperience(exp.id, 'company', value)}
                      fieldType="company"
                      placeholder={t('placeholders.company')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('fields.jobTitle')}</Label>
                    <AutocompleteInput
                      value={exp.position}
                      onChange={(value) => updateExperience(exp.id, 'position', value)}
                      fieldType="jobTitle"
                      placeholder={t('placeholders.jobTitle')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t('fields.location')}</Label>
                  <AutocompleteInput
                    value={exp.location}
                    onChange={(value) => updateExperience(exp.id, 'location', value)}
                    fieldType="city"
                    placeholder={t('placeholders.location')}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.startDate')}</Label>
                    <div className="relative">
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        className="pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0"
                      />
                      <Calendar className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>{t('fields.endDate')}</Label>
                    <div className="relative">
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.current}
                        className="pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0"
                      />
                      <Calendar className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <span className="text-sm">{t('labels.currentlyWorkHere')}</span>
                </label>

                <div className="space-y-2">
                  <Label>{t('fields.description')}</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    placeholder={t('placeholders.description')}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
