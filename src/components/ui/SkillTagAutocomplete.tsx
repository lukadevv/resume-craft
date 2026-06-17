'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getFieldSuggestions } from '@/lib/autocomplete';
import { getSkillIcon } from '@/lib/iconRegistry';
import { useLocaleStore } from '@/store/locale';

interface SkillTagAutocompleteProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function SkillTagAutocomplete({
  value,
  onChange,
  placeholder = 'Type a skill...',
  className = '',
}: SkillTagAutocompleteProps) {
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
    if (inputValue.length >= 1) {
      const results = getFieldSuggestions('skill', inputValue, locale);
      const filtered = results.filter((s) => !value.includes(s));
      setSuggestions(filtered);
      setHighlightedIndex(-1);
      if (isFocused && !suppressShowRef.current) {
        setShowSuggestions(filtered.length > 0);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, value, isFocused, locale]);

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

  const addSkill = (skill: string) => {
    if (skill.trim() && !value.includes(skill.trim())) {
      onChange([...value, skill.trim()]);
    }
    setInputValue('');
    dismissAndSuppress();
    inputRef.current?.focus();
  };

  const removeSkill = (index: number) => {
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
            addSkill(suggestions[highlightedIndex]);
            return;
          }
          break;
        case 'Escape':
          setShowSuggestions(false);
          return;
      }
    }

    // Backspace on empty input removes last tag
    if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeSkill(value.length - 1);
    }

    // Comma or Tab adds current input as a raw tag
    if ((e.key === ',' || e.key === 'Tab') && inputValue.trim()) {
      e.preventDefault();
      addSkill(inputValue.trim());
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    addSkill(suggestion);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        className="flex flex-wrap gap-1.5 rounded-md border border-input bg-background p-2 focus-within:ring-2 focus-within:ring-ring focus-within:border-ring min-h-10"
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-sm"
          >
            <span className="flex-shrink-0">{getSkillIcon(skill)}</span>
            <span>{skill}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeSkill(index);
              }}
              className="ml-0.5 rounded-sm p-0.5 text-foreground-secondary hover:text-destructive hover:bg-destructive/10 cursor-pointer"
              aria-label={`Remove ${skill}`}
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
