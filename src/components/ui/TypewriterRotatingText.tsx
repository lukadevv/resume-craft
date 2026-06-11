'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

type TypewriterRotatingTextProps = {
  words: string[];
  className?: string;
  typeMsPerChar?: number;
  deleteMsPerChar?: number;
  pauseMs?: number;
};

export function TypewriterRotatingText({
  words,
  className,
  typeMsPerChar = 60,
  deleteMsPerChar = 35,
  pauseMs = 900,
}: TypewriterRotatingTextProps) {
  const reducedMotion = usePrefersReducedMotion();
  const safeWords = words.length > 0 ? words : [''];

  const minWidthCh = useMemo(
    () => Math.max(...safeWords.map((w) => w.length)),
    [safeWords],
  );

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setText(safeWords[0] ?? '');
      return;
    }
  }, [reducedMotion, safeWords]);

  useEffect(() => {
    if (reducedMotion) return;

    const current = safeWords[wordIndex] ?? '';

    const clear = () => {
      if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };

    clear();

    if (mode === 'typing') {
      if (text.length < current.length) {
        timeoutRef.current = window.setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, typeMsPerChar);
      } else {
        timeoutRef.current = window.setTimeout(() => setMode('pausing'), pauseMs);
      }
    } else if (mode === 'pausing') {
      timeoutRef.current = window.setTimeout(() => setMode('deleting'), 1);
    } else {
      if (text.length > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setText((prev) => prev.slice(0, Math.max(0, prev.length - 1)));
        }, deleteMsPerChar);
      } else {
        setMode('typing');
        setWordIndex((prev) => (prev + 1) % safeWords.length);
      }
    }

    return clear;
  }, [deleteMsPerChar, mode, pauseMs, reducedMotion, safeWords, text, typeMsPerChar, wordIndex]);

  return (
    <span
      className={cn('inline-flex items-baseline whitespace-nowrap', className)}
      style={{ minWidth: `${minWidthCh}ch` }}
    >
      <span className={cn(text === "" && "invisible")}>{reducedMotion ? safeWords[0] : text === "" ? "%" : text}</span>
      {!reducedMotion && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[1em] w-px translate-y-[0.12em] bg-primary opacity-70"
        />
      )}
    </span>
  );
}
