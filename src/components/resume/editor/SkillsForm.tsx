'use client';

import { Skill } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface SkillsFormProps {
  data: Skill[];
  onUpdate: (data: Skill[]) => void;
}

const levels = ['beginner', 'intermediate', 'advanced', 'expert'] as const;
const categories = ['Technical', 'Soft Skills', 'Languages', 'Tools', 'Other'];

export function SkillsForm({ data, onUpdate }: SkillsFormProps) {
  const addSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: '',
      level: 'intermediate',
      category: 'Technical',
    };
    onUpdate([...data, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onUpdate(data.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)));
  };

  const removeSkill = (id: string) => {
    onUpdate(data.filter((skill) => skill.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-foreground-secondary">Add your relevant skills</p>
        </div>
        <Button onClick={addSkill} className="gap-2">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">No skills added yet</p>
          <Button onClick={addSkill} variant="outline">
            Add Skill
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-4 rounded-lg border border-border p-4"
            >
              <div className="flex-1 grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Skill Name</Label>
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    placeholder="JavaScript"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    value={skill.category}
                    onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Level</Label>
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-foreground-secondary hover:text-destructive mt-6 cursor-pointer"
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
