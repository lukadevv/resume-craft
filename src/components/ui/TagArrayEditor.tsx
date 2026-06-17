'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getFieldSuggestions } from '@/lib/autocomplete';
import { useLocaleStore } from '@/store/locale';

interface TagArrayEditorProps {
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  placeholder?: string;
  /** If set, enables autocomplete suggestions for this field type */
  autocompleteFieldType?: string;
  className?: string;
}

export function TagArrayEditor({
  value,
  onChange,
  label,
  placeholder = 'Type and press Enter or comma to add',
  autocompleteFieldType,
  className = '',
}: TagArrayEditorProps) {
  const locale = useLocaleStore((s) => s.locale);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const suppressShowRef = useRef(false);

  useEffect(() => {
    if (inputValue.length >= 1 && autocompleteFieldType) {
      const results = getFieldSuggestions(autocompleteFieldType, inputValue, locale);
      const filtered = results.filter((s) => !value.includes(s));
      setSuggestions(filtered);
      setHighlightedIndex(-1);
      if (isFocused && !suppressShowRef.current) {
        setShowSuggestions(filtered.length > 0);
      }
    } else {
      setSuggestions([]);
      if (!autocompleteFieldType) setShowSuggestions(false);
    }
  }, [inputValue, value, isFocused, locale, autocompleteFieldType]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.children;
      if (items[highlightedIndex]) {
        (items[highlightedIndex] as HTMLElement).scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dismissAndSuppress = useCallback(() => {
    setShowSuggestions(false);
    suppressShowRef.current = true;
    setTimeout(() => { suppressShowRef.current = false; }, 0);
  }, []);

  const addItem = (item: string) => {
    const trimmed = item.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue('');
    dismissAndSuppress();
    inputRef.current?.focus();
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
          return;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          return;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            addItem(suggestions[highlightedIndex]);
            return;
          }
          break;
        case 'Escape':
          setShowSuggestions(false);
          return;
      }
    }

    if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeItem(value.length - 1);
    }

    if ((e.key === ',' || e.key === 'Tab' || (e.key === 'Enter' && !autocompleteFieldType)) && inputValue.trim()) {
      e.preventDefault();
      addItem(inputValue.trim());
    }
  };

  return (
    <div ref={wrapperRef} className={`space-y-1.5 ${className}`}>
      <label className="text-sm font-medium">{label}</label>

      <div className="flex flex-wrap gap-1.5 rounded-md border border-input bg-background p-2 focus-within:ring-2 focus-within:ring-ring focus-within:border-ring min-h-10">
        {value.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-sm"
          >
            <span>{item}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeItem(index);
              }}
              className="ml-0.5 rounded-sm p-0.5 text-foreground-secondary hover:text-destructive hover:bg-destructive/10 cursor-pointer"
              aria-label={`Remove ${item}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] border-0 p-0 h-7 shadow-none focus-visible:ring-0 bg-transparent"
          autoComplete="off"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul ref={listRef} className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion}-${index}`}
              onClick={() => addItem(suggestion)}
              className={`px-3 py-2 cursor-pointer text-sm ${
                index === highlightedIndex ? 'bg-primary/10 text-primary' : 'hover:bg-surface'
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
