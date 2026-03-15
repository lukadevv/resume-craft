import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function useInView<T extends Element>({
  once = true,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    if (inView && once) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, once, rootMargin, threshold]);

  return { ref, inView } as const;
}

