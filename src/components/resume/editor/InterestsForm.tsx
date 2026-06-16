'use client';

import { useTranslations } from 'next-intl';
import { Interest } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface InterestsFormProps {
  data: Interest[];
  onUpdate: (data: Interest[]) => void;
}

export function InterestsForm({ data, onUpdate }: InterestsFormProps) {
  const t = useTranslations('resume-form');

  const addInterest = () => {
    const newInterest: Interest = {
      id: crypto.randomUUID(),
      name: '',
    };
    onUpdate([...data, newInterest]);
  };

  const updateInterest = (id: string, name: string) => {
    onUpdate(data.map((interest) => (interest.id === id ? { ...interest, name } : interest)));
  };

  const removeInterest = (id: string) => {
    onUpdate(data.filter((interest) => interest.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('steps.interests')}</h2>
          <p className="text-foreground-secondary">{t('stepDescriptions.interests')}</p>
        </div>
        <Button onClick={addInterest} className="gap-2">
          <Plus className="h-4 w-4" /> {t('labels.add')}
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">{t('emptyStates.interests')}</p>
          <Button onClick={addInterest} variant="outline">
            {t('labels.addInterest')}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((interest) => (
            <div
              key={interest.id}
              className="rounded-lg border border-border p-4"
            >
              <div className="grid gap-4 grid-cols-[1fr_auto]">
                <div className="space-y-2">
                  <Label>Interest</Label>
                  <Input
                    value={interest.name}
                    onChange={(e) => updateInterest(interest.id, e.target.value)}
                    placeholder="Photography"
                  />
                </div>
                <div className="pt-[34px]">
                  <button
                    onClick={() => removeInterest(interest.id)}
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
