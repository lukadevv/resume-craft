'use client';

import { Project } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
}

export function ProjectsForm({ data, onUpdate }: ProjectsFormProps) {
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
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-foreground-secondary">Showcase your notable projects</p>
        </div>
        <Button onClick={addProject} className="gap-2">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">No projects added yet</p>
          <Button onClick={addProject} variant="outline">
            Add Project
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((project) => (
            <div key={project.id} className="relative rounded-lg border border-border p-4">
              <button
                onClick={() => removeProject(project.id)}
                className="absolute right-4 top-4 text-foreground-secondary hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
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
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    placeholder="Describe what you built and your role..."
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
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={project.startDate}
                      onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={project.endDate}
                      onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                      disabled={project.current}
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={project.current}
                    onChange={(e) => updateProject(project.id, 'current', e.target.checked)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <span className="text-sm">Ongoing project</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
