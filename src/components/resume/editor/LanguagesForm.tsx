'use client';

import { Language } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface LanguagesFormProps {
  data: Language[];
  onUpdate: (data: Language[]) => void;
}

const proficiencyLevels = ['native', 'fluent', 'advanced', 'intermediate', 'beginner'] as const;

export function LanguagesForm({ data, onUpdate }: LanguagesFormProps) {
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

  const removeLanguage = (id: string) => {
    onUpdate(data.filter((lang) => lang.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Languages</h2>
          <p className="text-foreground-secondary">Add languages you speak</p>
        </div>
        <Button onClick={addLanguage} className="gap-2">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">No languages added yet</p>
          <Button onClick={addLanguage} variant="outline">
            Add Language
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((lang) => (
            <div
              key={lang.id}
              className="flex items-center gap-4 rounded-lg border border-border p-4"
            >
              <div className="flex-1 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Input
                    value={lang.name}
                    onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                    placeholder="English"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Proficiency</Label>
                  <select
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {proficiencyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => removeLanguage(lang.id)}
                className="text-foreground-secondary hover:text-destructive mt-6"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
