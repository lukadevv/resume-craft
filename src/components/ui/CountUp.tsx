'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

type CountUpProps = {
  to: number;
  start?: boolean;
  durationMs?: number;
  decimals?: number;
  format?: (n: number) => string;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({
  to,
  start = true,
  durationMs = 3200,
  decimals = 0,
  format,
}: CountUpProps) {
  const reducedMotion = usePrefersReducedMotion();
  const zeroText = useMemo(() => {
    const base = Number((0).toFixed(decimals));
    return format ? format(base) : base.toFixed(decimals);
  }, [decimals, format]);
  const finalText = useMemo(() => {
    const base = Number(to.toFixed(decimals));
    return format ? format(base) : base.toFixed(decimals);
  }, [decimals, format, to]);

  const [text, setText] = useState(reducedMotion ? finalText : zeroText);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setText(finalText);
      return;
    }
    if (!start) {
      setText(zeroText);
    }
  }, [finalText, reducedMotion, start, zeroText]);

  useEffect(() => {
    if (!start) return;
    if (reducedMotion) {
      setText(finalText);
      return;
    }

    const from = 0;
    const startTs = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTs) / durationMs);
      const eased = easeOutCubic(t);
      const value = from + (to - from) * eased;
      const rounded = Number(value.toFixed(decimals));
      setText(format ? format(rounded) : rounded.toFixed(decimals));

      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [decimals, durationMs, finalText, format, reducedMotion, start, to]);

  return <>{text}</>;
}
