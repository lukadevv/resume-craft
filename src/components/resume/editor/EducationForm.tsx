'use client';

import { useTranslations } from 'next-intl';
import { Education } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AutocompleteInput } from '@/components/ui/AutocompleteInput';
import { Plus, Trash2, Calendar } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

export function EducationForm({ data, onUpdate }: EducationFormProps) {
  const t = useTranslations('resume-form');

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      achievements: '',
    };
    onUpdate([...data, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    onUpdate(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)));
  };

  const removeEducation = (id: string) => {
    onUpdate(data.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('steps.education')}</h2>
          <p className="text-foreground-secondary">{t('stepDescriptions.education')}</p>
        </div>
        <Button onClick={addEducation} className="gap-2">
          <Plus className="h-4 w-4" /> {t('labels.add')}
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">{t('emptyStates.education')}</p>
          <Button onClick={addEducation} variant="outline">
            {t('labels.addEducation')}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((edu) => (
            <div key={edu.id} className="relative rounded-lg border border-border p-4">
              <button
                onClick={() => removeEducation(edu.id)}
                className="absolute right-4 top-4 text-foreground-secondary hover:text-destructive cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.school')}</Label>
                    <AutocompleteInput
                      value={edu.institution}
                      onChange={(value) => updateEducation(edu.id, 'institution', value)}
                      fieldType="university"
                      placeholder={t('placeholders.school')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('fields.location')}</Label>
                    <AutocompleteInput
                      value={edu.location}
                      onChange={(value) => updateEducation(edu.id, 'location', value)}
                      fieldType="city"
                      placeholder={t('placeholders.location')}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.degree')}</Label>
                    <AutocompleteInput
                      value={edu.degree}
                      onChange={(value) => updateEducation(edu.id, 'degree', value)}
                      fieldType="degree"
                      placeholder={t('placeholders.degree')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('fields.fieldOfStudy')}</Label>
                    <AutocompleteInput
                      value={edu.field}
                      onChange={(value) => updateEducation(edu.id, 'field', value)}
                      fieldType="field"
                      placeholder={t('placeholders.fieldOfStudy')}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.startDate')}</Label>
                    <div className="relative">
                      <Input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
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
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        disabled={edu.current}
                        className="pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0"
                      />
                      <Calendar className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={edu.current}
                    onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <span className="text-sm">{t('labels.currentlyStudying')}</span>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.gpa')}</Label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder={t('placeholders.gpa')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Achievements</Label>
                  <Textarea
                    value={edu.achievements}
                    onChange={(e) => updateEducation(edu.id, 'achievements', e.target.value)}
                    placeholder="Dean's List, Scholarships, etc."
                    className="min-h-[80px]"
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
