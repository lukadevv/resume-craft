import { describe, it, expect } from 'vitest';
import { calculateReadingTime } from '@/lib/reading-time';

describe('calculateReadingTime', () => {
  it('returns 2 minutes for 450 words at 225 wpm', () => {
    const content = Array(450).fill('word').join(' ');
    expect(calculateReadingTime(content)).toBe(2);
  });

  it('returns 1 minute for 100 words (rounds up from 0.44)', () => {
    const content = Array(100).fill('word').join(' ');
    expect(calculateReadingTime(content)).toBe(1);
  });

  it('returns 1 minute for empty content (minimum)', () => {
    expect(calculateReadingTime('')).toBe(1);
  });

  it('returns 1 minute for 225 words (exact boundary)', () => {
    const content = Array(225).fill('word').join(' ');
    expect(calculateReadingTime(content)).toBe(1);
  });

  it('returns 3 minutes for 500 words', () => {
    const content = Array(500).fill('word').join(' ');
    expect(calculateReadingTime(content)).toBe(3);
  });

  it('handles whitespace-only strings as zero words', () => {
    expect(calculateReadingTime('   \n  \t  ')).toBe(1);
  });
});
