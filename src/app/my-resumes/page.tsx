'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useResumeStore } from '@/store/resume';
import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Edit, Trash2, Copy, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function MyResumesPage() {
  const router = useRouter();
  const resumes = useResumeStore((state) => state.resumes);
  const deleteResume = useResumeStore((state) => state.deleteResume);
  const duplicateResume = useResumeStore((state) => state.duplicateResume);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      deleteResume(id);
    }
    setMenuOpen(null);
  };

  const handleDuplicate = (id: string) => {
    const newResume = duplicateResume(id);
    if (newResume) {
      router.push(`/resume/${newResume.id}`);
    }
    setMenuOpen(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTemplateLabel = (template: string) => {
    const labels: Record<string, string> = {
      modern: 'Modern',
      classic: 'Classic',
      minimal: 'Minimal',
      creative: 'Creative',
      technical: 'Technical',
    };
    return labels[template] || template;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-[72px]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Resumes</h1>
              <p className="text-foreground-secondary mt-1">Manage your saved resumes</p>
            </div>

            <Link href="/create">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Resume
              </Button>
            </Link>
          </div>

          {resumes.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-foreground-secondary" />
              </div>
              <h2 className="text-xl font-semibold">No resumes yet</h2>
              <p className="text-foreground-secondary mt-2 mb-6">
                Create your first resume to get started
              </p>
              <Link href="/create">
                <Button>Create Resume</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resumes.map((resume) => (
                <Card key={resume.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold truncate">{resume.name}</h3>
                        <p className="text-sm text-foreground-secondary">
                          {getTemplateLabel(resume.template)} • {formatDate(resume.updatedAt)}
                        </p>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => setMenuOpen(menuOpen === resume.id ? null : resume.id)}
                          className="p-1 rounded-md hover:bg-surface"
                        >
                          <MoreVertical className="h-4 w-4 text-foreground-secondary" />
                        </button>

                        {menuOpen === resume.id && (
                          <div className="absolute right-0 top-8 z-10 w-40 rounded-md border border-border bg-background shadow-lg">
                            <Link
                              href={`/resume/${resume.id}`}
                              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-surface"
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDuplicate(resume.id)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-surface"
                            >
                              <Copy className="h-4 w-4" />
                              Duplicate
                            </button>
                            <button
                              onClick={() => handleDelete(resume.id)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-surface"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link href={`/resume/${resume.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full gap-2">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
