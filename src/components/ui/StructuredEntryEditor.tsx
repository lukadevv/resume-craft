'use client';

import { useRef } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export interface EntryField {
  key: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'url' | 'month';
  className?: string;
}

interface StructuredEntryEditorProps<T extends { id: string }> {
  value: T[];
  onChange: (value: T[]) => void;
  fields: EntryField[];
  createEmpty: () => T;
  label: string;
  description?: string;
}

export function StructuredEntryEditor<T extends { id: string }>({
  value,
  onChange,
  fields,
  createEmpty,
  label,
  description,
}: StructuredEntryEditorProps<T>) {
  const idCounterRef = useRef(0);

  const addEntry = () => {
    const entry = createEmpty();
    // Ensure unique ID even for empty entries
    if (!entry.id) {
      (entry as Record<string, unknown>).id = `entry-${++idCounterRef.current}-${Date.now()}`;
    }
    onChange([...value, entry]);
  };

  const updateEntry = (id: string, fieldKey: string, fieldValue: string) => {
    onChange(
      value.map((entry) =>
        entry.id === id ? { ...entry, [fieldKey]: fieldValue } : entry
      )
    );
  };

  const removeEntry = (id: string) => {
    onChange(value.filter((entry) => entry.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold">{label}</h4>
          {description && (
            <p className="text-xs text-foreground-secondary">{description}</p>
          )}
        </div>
        <Button onClick={addEntry} size="sm" variant="outline" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>

      {value.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-border rounded-lg">
          <p className="text-sm text-foreground-secondary">{label} not added yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {value.map((entry) => (
            <div
              key={entry.id}
              className="relative rounded-lg border border-border p-3"
            >
              <button
                type="button"
                onClick={() => removeEntry(entry.id)}
                className="absolute right-2.5 top-2.5 text-foreground-secondary hover:text-destructive cursor-pointer"
                aria-label="Remove"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>

              <div className="grid gap-2 pr-8">
                {fields.map((field) => (
                  <div key={field.key} className={field.className || ''}>
                    {field.type === 'month' ? (
                      <div className="space-y-0.5">
                        <Label className="text-xs">{field.label}</Label>
                        <div className="relative">
                          <Input
                            type="month"
                            value={(entry as Record<string, string>)[field.key] || ''}
                            onChange={(e) => updateEntry(entry.id, field.key, e.target.value)}
                            className="pr-9 text-xs h-8 [&::-webkit-calendar-picker-indicator]:opacity-0"
                          />
                          <Calendar className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground-secondary" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-0.5">
                        {field.label && (
                          <Label className="text-xs">{field.label}</Label>
                        )}
                        <Input
                          type={field.type || 'text'}
                          value={(entry as Record<string, string>)[field.key] || ''}
                          onChange={(e) => updateEntry(entry.id, field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="h-8 text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
