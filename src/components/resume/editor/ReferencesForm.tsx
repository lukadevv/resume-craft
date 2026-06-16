'use client';

import { useTranslations } from 'next-intl';
import { Reference } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface ReferencesFormProps {
  data: Reference[];
  onUpdate: (data: Reference[]) => void;
}

export function ReferencesForm({ data, onUpdate }: ReferencesFormProps) {
  const t = useTranslations('resume-form');

  const addReference = () => {
    const newRef: Reference = {
      id: crypto.randomUUID(),
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      relationship: '',
    };
    onUpdate([...data, newRef]);
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    onUpdate(data.map((ref) => (ref.id === id ? { ...ref, [field]: value } : ref)));
  };

  const removeReference = (id: string) => {
    onUpdate(data.filter((ref) => ref.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('steps.references')}</h2>
          <p className="text-foreground-secondary">{t('stepDescriptions.references')}</p>
        </div>
        <Button onClick={addReference} className="gap-2">
          <Plus className="h-4 w-4" /> {t('labels.add')}
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">{t('emptyStates.references')}</p>
          <Button onClick={addReference} variant="outline">
            {t('labels.addReference')}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((ref) => (
            <div key={ref.id} className="relative rounded-lg border border-border p-4">
              <button
                onClick={() => removeReference(ref.id)}
                className="absolute right-4 top-4 text-foreground-secondary hover:text-destructive cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.fullName')}</Label>
                    <Input
                      value={ref.name}
                      onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                      placeholder={t('placeholders.fullName')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('fields.jobTitle')}</Label>
                    <Input
                      value={ref.title}
                      onChange={(e) => updateReference(ref.id, 'title', e.target.value)}
                      placeholder={t('placeholders.title')}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.company')}</Label>
                    <Input
                      value={ref.company}
                      onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                      placeholder={t('placeholders.company')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('fields.relationship')}</Label>
                    <Input
                      value={ref.relationship}
                      onChange={(e) => updateReference(ref.id, 'relationship', e.target.value)}
                      placeholder={t('placeholders.relationship')}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.email')}</Label>
                    <Input
                      type="email"
                      value={ref.email}
                      onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                      placeholder={t('placeholders.email')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('fields.phone')}</Label>
                    <Input
                      type="tel"
                      value={ref.phone}
                      onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                      placeholder={t('placeholders.phone')}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
