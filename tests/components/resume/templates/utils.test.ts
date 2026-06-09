import { describe, it, expect } from 'vitest';
import { isDarkBackground } from '@/components/resume/templates/utils';

describe('isDarkBackground', () => {
  describe('dark gradients — returns true', () => {
    it('detects dark gradient from TwoColumnShell (technical)', () => {
      expect(isDarkBackground('linear-gradient(135deg, #0f172a, #111827)')).toBe(true);
    });

    it('detects dark gradient from SplitShell (creative)', () => {
      expect(isDarkBackground('linear-gradient(180deg, #1f1c2c, #3a1c71)')).toBe(true);
    });

    it('detects dark gradient from TimelineShell (projectManager)', () => {
      expect(isDarkBackground('linear-gradient(180deg, #1e1b4b, #4c1d95)')).toBe(true);
    });

    it('detects dark gradient — black (#020617)', () => {
      expect(isDarkBackground('linear-gradient(180deg, #020617, #0f172a)')).toBe(true);
    });

    it('detects dark gradient — navy (#164e63)', () => {
      expect(isDarkBackground('linear-gradient(135deg, #164e63, #0e7490)')).toBe(true);
    });

    it('detects dark short hex (#111)', () => {
      // #111 = #111111 → R=17, G=17, B=17 → luminance ≈ 17 < 128
      expect(isDarkBackground('linear-gradient(180deg, #111, #333)')).toBe(true);
    });
  });

  describe('light gradients — returns false', () => {
    it('detects light gradient from minimal template', () => {
      expect(isDarkBackground('linear-gradient(180deg, #ffffff, #f1f5f9)')).toBe(false);
    });

    it('detects light gradient from modern template', () => {
      expect(isDarkBackground('linear-gradient(135deg, #f9fafb, #ffffff)')).toBe(false);
    });

    it('detects light gradient from nurse template', () => {
      expect(isDarkBackground('linear-gradient(180deg, #f0fdf4, #dcfce7)')).toBe(false);
    });

    it('detects light yellow gradient', () => {
      expect(isDarkBackground('linear-gradient(180deg, #fffbeb, #fef3c7)')).toBe(false);
    });

    it('detects light short hex (#fff)', () => {
      // #fff = #ffffff → R=255, G=255, B=255 → luminance ≈ 255 > 128
      expect(isDarkBackground('linear-gradient(180deg, #fff, #eee)')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('returns false for undefined gradient', () => {
      expect(isDarkBackground(undefined)).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(isDarkBackground('')).toBe(false);
    });

    it('returns false for string with no hex color', () => {
      expect(isDarkBackground('linear-gradient(to right, transparent, rgba(0,0,0,0.5))')).toBe(false);
    });

    it('returns false for rgb() format (no hex)', () => {
      expect(isDarkBackground('linear-gradient(180deg, rgb(0,0,0), rgb(50,50,50))')).toBe(false);
    });

    it('handles middle gray (#808080) — at floating-point threshold', () => {
      // #808080 → R=128, G=128, B=128 → luminance ≈ 128.
      // Due to IEEE 754, 0.299+0.587+0.114 is slightly below 1.0,
      // so the computed luminance falls just under 128 → dark.
      expect(isDarkBackground('linear-gradient(180deg, #808080, #909090')).toBe(true);
    });

    it('detects slightly lighter gray (#818181) — just above threshold', () => {
      // #818181 → R=129, G=129, B=129 → definitely light
      expect(isDarkBackground('linear-gradient(180deg, #818181, #909090')).toBe(false);
    });

    it('detects border dark (#7f7f7f) — just below threshold', () => {
      // #7f7f7f → R=127, G=127, B=127 → luminance ≈ 127 < 128
      expect(isDarkBackground('linear-gradient(180deg, #7f7f7f, #808080)')).toBe(true);
    });
  });
});
