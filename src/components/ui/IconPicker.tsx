'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { searchIcons, type IconCategory } from '@/lib/icons';
import { Input } from '@/components/ui/input';

interface IconPickerProps {
  value?: string;
  onSelect: (key: string) => void;
  category?: IconCategory;
  className?: string;
}

export function IconPicker({ value, onSelect, category, className }: IconPickerProps) {
  const [query, setQuery] = useState('');

  const icons = useMemo(() => searchIcons(query, category), [query, category]);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search icons..."
        className="h-8 text-xs"
      />
      <div className="grid max-h-48 w-64 grid-cols-6 gap-1 overflow-y-auto pr-1">
        {icons.map((icon) => {
          const Icon = icon.Component;
          const isSelected = icon.key === value;
          return (
            <button
              key={icon.key}
              type="button"
              title={icon.label}
              onClick={() => onSelect(icon.key)}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-md transition-colors cursor-pointer',
                isSelected
                  ? 'ring-2 ring-offset-2 ring-offset-background'
                  : 'hover:bg-surface'
              )}
              style={{
                color: icon.color,
                ...(isSelected ? { ringColor: icon.color } : {}),
              }}
            >
              <Icon size={18} />
            </button>
          );
        })}
        {icons.length === 0 && (
          <p className="col-span-6 py-4 text-center text-xs text-foreground-secondary">
            No icons found
          </p>
        )}
      </div>
    </div>
  );
}
