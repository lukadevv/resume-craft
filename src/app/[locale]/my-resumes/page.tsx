'use client';

import { useState, useMemo } from 'react';
import { Link } from 'next-view-transitions';
import { useTransitionRouter } from 'next-view-transitions';
import { useTranslations } from 'next-intl';
import { useResumeStore } from '@/store/resume';
import { useHydration } from '@/hooks/use-hydration';
import { useLocalizedHref } from '@/lib/locale-utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FullPageLoading } from '@/components/ui/FullPageLoading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  EmptyState,
  ResumeCard,
  SearchAndSortBar,
  Pagination,
  BulkActionBar,
} from '@/components/my-resumes';
import type { SortField } from '@/components/my-resumes/SearchAndSortBar';
import type { BulkExportFormat } from '@/components/my-resumes/BulkActionBar';
import { Resume } from '@/types/resume';
import { templateDefinitionMap } from '@/lib/templates';
import {
  exportToText,
  exportToHTML,
  exportToJSON,
  exportToDOCX,
  downloadFile,
} from '@/lib/export/resume-export';

const PAGE_SIZE = 9;

export default function MyResumesPage() {
  const hydrated = useHydration();

  if (!hydrated) {
    return <FullPageLoading />;
  }

  return <MyResumesContent />;
}

function MyResumesContent() {
  const t = useTranslations('common');
  const router = useTransitionRouter();
  const lh = useLocalizedHref();
  const resumes = useResumeStore((state) => state.resumes);
  const deleteResume = useResumeStore((state) => state.deleteResume);
  const duplicateResume = useResumeStore((state) => state.duplicateResume);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('updatedAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds(new Set());
  };

  const filteredSorted = useMemo(() => {
    let result = [...resumes];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((r) => r.name.toLowerCase().includes(query));
    }
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'template':
          return (templateDefinitionMap[a.template]?.name || a.template).localeCompare(
            templateDefinitionMap[b.template]?.name || b.template
          );
        case 'updatedAt':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });
    return result;
  }, [resumes, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredSorted.slice(start, start + PAGE_SIZE);
  }, [filteredSorted, currentPage]);

  const safePage = Math.min(currentPage, totalPages);

  const handleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredSorted.map((r) => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleDuplicate = (id: string) => {
    const newResume = duplicateResume(id);
    if (newResume) {
      router.push(lh(`/resume/edit?id=${newResume.id}`));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm(t('myResumes.deleteConfirm'))) {
      deleteResume(id);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (
      confirm(
        t('myResumes.deleteBulkConfirm', { count: selectedIds.size })
      )
    ) {
      selectedIds.forEach((id) => deleteResume(id));
      setSelectedIds(new Set());
    }
  };

  const getSelectedResumes = (): Resume[] => {
    return resumes.filter((r) => selectedIds.has(r.id));
  };

  const handleBulkExport = async (format: BulkExportFormat) => {
    const selected = getSelectedResumes();
    if (selected.length === 0) return;

    for (let i = 0; i < selected.length; i++) {
      const resume = selected[i];
      const fileName = resume.name.replace(/\s+/g, '_').toLowerCase();

      switch (format) {
        case 'text': {
          const content = exportToText(resume);
          downloadFile(content, `${fileName}.txt`, 'text/plain');
          break;
        }
        case 'html': {
          const content = exportToHTML(resume);
          downloadFile(content, `${fileName}.html`, 'text/html');
          break;
        }
        case 'json': {
          const content = exportToJSON(resume);
          downloadFile(content, `${fileName}.json`, 'application/json');
          break;
        }
        case 'docx':
          exportToDOCX(resume);
          break;
      }

      if (i < selected.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[72px]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">{t('myResumes.title')}</h1>
              <p className="text-foreground-secondary mt-1">
                {t('myResumes.subtitle')}
              </p>
            </div>
            <Link href="/create">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t('myResumes.newResume')}
              </Button>
            </Link>
          </div>
          {resumes.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <SearchAndSortBar
                searchQuery={searchQuery}
                onSearchChange={(q) => {
                  setSearchQuery(q);
                  setCurrentPage(1);
                  setSelectedIds(new Set());
                }}
                sortBy={sortBy}
                onSortChange={(s) => {
                  setSortBy(s);
                  setCurrentPage(1);
                  setSelectedIds(new Set());
                }}
                className="mb-6"
              />
              <BulkActionBar
                selectedCount={selectedIds.size}
                totalCount={filteredSorted.length}
                onSelectAll={handleSelectAll}
                onDeleteSelected={handleBulkDelete}
                onExport={handleBulkExport}
                className="mb-4"
              />
              {filteredSorted.length === 0 && searchQuery.trim() ? (
                <EmptyState message={t('myResumes.noSearchResults')} />
              ) : (
                <>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {paginated.map((resume) => (
                      <ResumeCard
                        key={resume.id}
                        resume={resume}
                        selected={selectedIds.has(resume.id)}
                        onSelect={handleSelect}
                        onDuplicate={handleDuplicate}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={safePage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
