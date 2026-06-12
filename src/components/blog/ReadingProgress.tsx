'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-[72px] left-0 right-0 z-40 h-1 bg-background/80 backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
