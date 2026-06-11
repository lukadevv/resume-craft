'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Copy, MoreVertical } from 'lucide-react';
import { Resume, TemplateType } from '@/types/resume';
import {
  templateDefinitionMap,
  getLandingPresentation,
  TemplateDefinition,
} from '@/lib/templates';
import { cn } from '@/lib/utils';

interface ResumeCardProps {
  resume: Resume;
  selected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

function formatResumeDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getTemplateLabel(template: TemplateType): string {
  const def = templateDefinitionMap[template];
  return def?.name || template;
}

function deriveCardStyle(resume: Resume): React.CSSProperties {
  const def: TemplateDefinition | undefined =
    templateDefinitionMap[resume.template as TemplateType];
  if (!def) {
    return { '--accent': '#3ECF8E' } as React.CSSProperties;
  }
  const lp = def.landingPresentation ?? getLandingPresentation(def.accentColor);
  return {
    '--card-bg-light': lp.cardBackground.light,
    '--card-bg-dark': lp.cardBackground.dark,
    '--hover-overlay-light': lp.hoverOverlay.light,
    '--hover-overlay-dark': lp.hoverOverlay.dark,
    '--accent': def.accentColor,
  } as React.CSSProperties;
}

export function ResumeCard({
  resume,
  selected = false,
  onSelect,
  onDuplicate,
  onDelete,
  className,
}: ResumeCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const style = deriveCardStyle(resume);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect?.(resume.id, e.target.checked);
  };

  return (
    <div
      className={cn(
        'group relative rounded-lg border border-border overflow-hidden transition-shadow hover:shadow-lg',
        className
      )}
      style={style}
    >
      {/* Mini Preview — CSS abstract shapes */}
      <div
        className="h-20 w-full relative overflow-hidden"
        style={{
          background: 'var(--card-bg-light)',
        }}
      >
        {/* Abstract sidebar bar */}
        <div
          className="absolute left-0 top-0 h-full w-1/4 rounded-r-sm"
          style={{
            backgroundColor: `color-mix(in srgb, var(--accent) 20%, transparent)`,
          }}
        />
        {/* Content column bars */}
        <div className="absolute left-[30%] top-3 right-4 space-y-1.5">
          <div
            className="h-1.5 rounded-sm w-3/5"
            style={{
              backgroundColor: `color-mix(in srgb, var(--accent) 30%, transparent)`,
            }}
          />
          <div className="h-1 rounded-sm w-4/5 bg-foreground/10" />
          <div className="h-1 rounded-sm w-2/3 bg-foreground/10" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Top row: checkbox + info + menu */}
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <label className="flex-shrink-0 pt-0.5 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
              checked={selected}
              onChange={handleCheckboxChange}
            />
          </label>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{resume.name}</h3>
            <p className="text-sm text-foreground-secondary mt-0.5">
              {getTemplateLabel(resume.template)} &bull;{' '}
              {formatResumeDate(resume.updatedAt)}
            </p>
          </div>

          {/* Menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-md hover:bg-surface cursor-pointer"
              aria-label="More actions"
            >
              <MoreVertical className="h-4 w-4 text-foreground-secondary" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 z-10 w-40 rounded-md border border-border bg-background shadow-lg">
                <Link
                  href={`/resume/edit?id=${resume.id}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-surface"
                  onClick={() => setMenuOpen(false)}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>
                <button
                  onClick={() => {
                    onDuplicate?.(resume.id);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-surface cursor-pointer"
                >
                  <Copy className="h-4 w-4" />
                  Duplicate
                </button>
                <button
                  onClick={() => {
                    onDelete?.(resume.id);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-surface cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom: Edit button */}
        <div className="mt-4">
          <Link href={`/resume/edit?id=${resume.id}`} className="block">
            <span className="inline-flex items-center justify-center gap-2 h-9 rounded-md px-3 text-sm font-medium border border-border bg-background hover:bg-surface hover:text-foreground transition-all duration-150 w-full cursor-pointer">
              <Edit className="h-3 w-3" />
              Edit
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
