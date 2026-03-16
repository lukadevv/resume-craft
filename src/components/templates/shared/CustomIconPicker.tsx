'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import { generateUUID } from '@/utils/random';
import { CustomIcon } from '@/types/resume';

interface CustomIconPickerProps {
  onIconSelect: (icon: CustomIcon) => void;
}

export function CustomIconPicker({ onIconSelect }: CustomIconPickerProps) {
  const [preview, setPreview] = useState<string>('');
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState<CustomIcon['category']>('custom');

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPreview('');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const url = loadEvent.target?.result;
      if (typeof url === 'string') {
        setPreview(url);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAdd = useCallback(() => {
    if (!preview || !label.trim()) return;

    onIconSelect({
      id: generateUUID(),
      label: label.trim(),
      url: preview,
      category,
    });

    setLabel('');
    setPreview('');
  }, [preview, label, category, onIconSelect]);

  return (
    <div className="space-y-3 rounded-lg border border-white/20 bg-slate-950/40 p-4 text-white">
      <p className="text-sm font-semibold">Upload a custom icon</p>
      <div className="flex flex-col gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-xs text-white/60 file:rounded-full file:border-none file:bg-white/10 file:px-3 file:py-1"
          aria-label="Upload icon"
        />
        {preview && (
          <div className="flex items-center gap-2">
            <img src={preview} alt="Icon preview" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-xs text-white/70">Preview ready</span>
          </div>
        )}
        <input
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder="Label (e.g., React logo)"
          className="rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-primary"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as CustomIcon['category'])}
          className="rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-primary"
        >
          <option value="skill">Skill</option>
          <option value="contact">Contact</option>
          <option value="custom">Custom</option>
        </select>
        <button
          type="button"
          onClick={handleAdd}
          className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          disabled={!preview || !label.trim()}
        >
          Add icon
        </button>
      </div>
    </div>
  );
}
