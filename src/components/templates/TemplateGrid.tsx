'use client';

import { useState, useMemo } from 'react';
import { Link } from 'next-view-transitions';
import { ArrowRight, Check, Layout, Target, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Reveal } from '@/components/ui/Reveal';
import { templateDefinitions } from '@/lib/templates';
import type { TemplateType } from '@/types/resume';

interface TemplateDetails {
  idealFor: string[];
  keyFeatures: string[];
}

interface TemplateGridProps {
  templateDetails: Record<TemplateType, TemplateDetails>;
}

const layoutTypeLabels: Record<string, string> = {
  'single-column': 'Single Column',
  'two-column': 'Two Column',
  split: 'Split Layout',
  timeline: 'Timeline',
};

export function TemplateGrid({ templateDetails }: TemplateGridProps) {
  const [search, setSearch] = useState('');

  const filteredTemplates = useMemo(() => {
    if (!search.trim()) return templateDefinitions;

    const query = search.toLowerCase();
    return templateDefinitions.filter((template) => {
      const details = templateDetails[template.id];
      const searchFields = [
        template.name,
        template.description,
        template.layoutType,
        ...(details?.idealFor || []),
        ...(details?.keyFeatures || []),
      ];
      return searchFields.some((field) => field.toLowerCase().includes(query));
    });
  }, [search, templateDetails]);

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex justify-center">
          <div className="relative mx-auto md:mx-0 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
            <Input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Reveal>

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-foreground-secondary">No templates found for "{search}"</p>
          <Button variant="link" onClick={() => setSearch('')}>
            Clear search
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template, index) => {
            const details = templateDetails[template.id];

            return (
              <Reveal key={template.id} delayMs={(index % 3) * 150} className="group h-full">
                <article className="flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-6 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-black/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{template.name}</h2>
                      <p className="mt-1 text-sm text-foreground-secondary">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-background px-2.5 py-1 text-xs font-medium">
                      <Layout className="mr-1.5 h-3.5 w-3.5" />
                      {layoutTypeLabels[template.layoutType] || template.layoutType}
                    </span>
                  </div>

                  {details && (
                    <>
                      <div className="mt-5 border-t border-border pt-5">
                        <h3 className="flex items-center text-sm font-medium">
                          <Target className="mr-2 h-4 w-4 text-primary" />
                          Ideal For
                        </h3>
                        <ul className="mt-2 space-y-1">
                          {details.idealFor.slice(0, 3).map((role) => (
                            <li
                              key={role}
                              className="flex items-center text-sm text-foreground-secondary"
                            >
                              <Check className="mr-2 h-3.5 w-3.5 text-primary" />
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 border-t border-border pt-4">
                        <h3 className="text-sm font-medium">Key Features</h3>
                        <ul className="mt-2 space-y-1">
                          {details.keyFeatures.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center text-sm text-foreground-secondary"
                            >
                              <Check className="mr-2 h-3.5 w-3.5 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  <div className="mt-auto flex gap-3 pt-5">
                    <Link href={`/create?template=${template.id}`} className="flex-1">
                      <Button className="w-full gap-2" size="sm">
                        Use Template
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
