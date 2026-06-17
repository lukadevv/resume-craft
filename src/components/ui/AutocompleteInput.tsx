'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { getFieldSuggestions } from '@/lib/autocomplete';
import { useLocaleStore } from '@/store/locale';

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  fieldType: string;
  placeholder?: string;
  className?: string;
}

export function AutocompleteInput({
  value,
  onChange,
  fieldType,
  placeholder = '',
  className = '',
}: AutocompleteInputProps) {
  const locale = useLocaleStore((s) => s.locale);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const suppressShowRef = useRef(false);

  useEffect(() => {
    if (value.length >= 1) {
      const suggestions = getFieldSuggestions(fieldType, value, locale);
      setSuggestions(suggestions);
      setHighlightedIndex(-1);
      // Only auto-show if we're focused and haven't just made a selection
      if (isFocused && !suppressShowRef.current) {
        setShowSuggestions(suggestions.length > 0);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value, fieldType, isFocused, locale]);

  // Scroll highlighted item into view
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
    // Re-enable after the next input change cycle
    setTimeout(() => { suppressShowRef.current = false; }, 0);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          onChange(suggestions[highlightedIndex]);
          dismissAndSuppress();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    dismissAndSuppress();
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setIsFocused(true);
          if (suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        autoComplete="off"
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul ref={listRef} className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion}-${index}`}
              onClick={() => handleSelectSuggestion(suggestion)}
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
