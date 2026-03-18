'use client';

import { useState, useRef, useEffect } from 'react';
import { getFieldSuggestions } from '@/lib/autocompleteData';
import { getSkillIcon } from '@/lib/iconRegistry';

interface SkillAutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SkillAutocompleteInput({
  value,
  onChange,
  placeholder = '',
  className = '',
}: SkillAutocompleteInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length >= 1) {
      const suggestions = getFieldSuggestions('skill', value);
      setSuggestions(suggestions);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        {value && <span className="flex-shrink-0">{getSkillIcon(value)}</span>}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border rounded-lg bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
          autoComplete="off"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion}-${index}`}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`px-3 py-2 cursor-pointer text-sm flex items-center gap-2 ${
                index === highlightedIndex ? 'bg-primary/10 text-primary' : 'hover:bg-surface'
              }`}
            >
              <span className="flex-shrink-0">{getSkillIcon(suggestion)}</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
