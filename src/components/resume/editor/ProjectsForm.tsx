'use client';

import { useTranslations } from 'next-intl';
import { Project } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Calendar } from 'lucide-react';

interface ProjectsFormProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
}

export function ProjectsForm({ data, onUpdate }: ProjectsFormProps) {
  const t = useTranslations('resume-form');

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      url: '',
      technologies: [],
      startDate: '',
      endDate: '',
      current: false,
    };
    onUpdate([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[] | boolean) => {
    onUpdate(data.map((project) => (project.id === id ? { ...project, [field]: value } : project)));
  };

  const removeProject = (id: string) => {
    onUpdate(data.filter((project) => project.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('steps.projects')}</h2>
          <p className="text-foreground-secondary">{t('stepDescriptions.projects')}</p>
        </div>
        <Button onClick={addProject} className="gap-2">
          <Plus className="h-4 w-4" /> {t('labels.add')}
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">{t('emptyStates.projects')}</p>
          <Button onClick={addProject} variant="outline">
            {t('labels.addProject')}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((project) => (
            <div key={project.id} className="relative rounded-lg border border-border p-4">
              <button
                onClick={() => removeProject(project.id)}
                className="absolute right-4 top-4 text-foreground-secondary hover:text-destructive cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.projectName')}</Label>
                    <Input
                      value={project.name}
                      onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                      placeholder="My Awesome Project"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={project.url}
                      onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                      placeholder={t('placeholders.projectUrl')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t('fields.description')}</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    placeholder={t('placeholders.description')}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Technologies (comma-separated)</Label>
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) =>
                      updateProject(
                        project.id,
                        'technologies',
                        e.target.value.split(',').map((t) => t.trim())
                      )
                    }
                    placeholder={t('placeholders.techStack')}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.startDate')}</Label>
                    <div className="relative">
                      <Input
                        type="month"
                        value={project.startDate}
                        onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
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
                        value={project.endDate}
                        onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                        disabled={project.current}
                        className="pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0"
                      />
                      <Calendar className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={project.current}
                    onChange={(e) => updateProject(project.id, 'current', e.target.checked)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <span className="text-sm">{t('labels.ongoingProject')}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
