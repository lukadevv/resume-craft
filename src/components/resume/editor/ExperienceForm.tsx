'use client';

import { WorkExperience } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface ExperienceFormProps {
  data: WorkExperience[];
  onUpdate: (data: WorkExperience[]) => void;
}

export function ExperienceForm({ data, onUpdate }: ExperienceFormProps) {
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
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <p className="text-foreground-secondary">Add your work history</p>
        </div>
        <Button onClick={addExperience} className="gap-2">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">No work experience added yet</p>
          <Button onClick={addExperience} variant="outline">
            Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((exp) => (
            <div key={exp.id} className="relative rounded-lg border border-border p-4">
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute right-4 top-4 text-foreground-secondary hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="Job Title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    placeholder="City, Country"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <span className="text-sm">I currently work here</span>
                </label>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
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
