import { describe, it, expect } from 'vitest';
import { autoDetectIcon } from '@/lib/icons/auto-detect';

describe('autoDetectIcon', () => {
  describe('exact label match (case-insensitive)', () => {
    it('matches "React" → React icon', () => {
      const result = autoDetectIcon('React');
      expect(result).toBeDefined();
      expect(result?.key).toBe('react');
      expect(result?.label).toBe('React');
    });

    it('matches "typescript" lowercase → TypeScript icon', () => {
      const result = autoDetectIcon('typescript');
      expect(result).toBeDefined();
      expect(result?.key).toBe('typescript');
    });

    it('matches "Docker" → Docker icon', () => {
      const result = autoDetectIcon('Docker');
      expect(result).toBeDefined();
      expect(result?.key).toBe('docker');
    });
  });

  describe('search term match', () => {
    it('matches "js" via JavaScript search term', () => {
      const result = autoDetectIcon('js');
      expect(result).toBeDefined();
      expect(result?.key).toBe('javascript');
    });

    it('matches "ecmascript" via JavaScript search term', () => {
      const result = autoDetectIcon('ecmascript');
      expect(result).toBeDefined();
      expect(result?.key).toBe('javascript');
    });

    it('matches "k8s" via Kubernetes search term', () => {
      const result = autoDetectIcon('k8s');
      expect(result).toBeDefined();
      expect(result?.key).toBe('kubernetes');
    });

    it('matches "postgres" via PostgreSQL search term', () => {
      const result = autoDetectIcon('postgres');
      expect(result).toBeDefined();
      expect(result?.key).toBe('postgresql');
    });
  });

  describe('starts-with partial match', () => {
    it('matches "next" → Next.js (label starts with)', () => {
      const result = autoDetectIcon('next');
      expect(result).toBeDefined();
      expect(result?.key).toBe('nextdotjs');
    });

    it('matches "cloudflare w" via search term "cloudflare workers"', () => {
      const result = autoDetectIcon('cloudflare w');
      expect(result).toBeDefined();
      expect(result?.key).toBe('cloudflare');
    });
  });

  describe('includes (substring) partial match', () => {
    it('matches "sql" → finds a database icon containing sql', () => {
      const result = autoDetectIcon('sql');
      expect(result).toBeDefined();
      // Could match MySQL, PostgreSQL, SQLite, SQLAlchemy — any is valid
      expect(result?.category).toBe('database');
    });
  });

  describe('no match returns undefined', () => {
    it('returns undefined for completely unknown name', () => {
      expect(autoDetectIcon('foobar12345')).toBeUndefined();
    });

    it('returns undefined for empty string', () => {
      expect(autoDetectIcon('')).toBeUndefined();
    });

    it('returns undefined for whitespace-only string', () => {
      expect(autoDetectIcon('   ')).toBeUndefined();
    });
  });

  describe('tie-breaking (exact beats partial)', () => {
    it('exact label match beats starts-with match', () => {
      // "React" is an exact label match, should not match "React Native" or similar
      const result = autoDetectIcon('React');
      expect(result).toBeDefined();
      expect(result?.key).toBe('react');
    });
  });

  describe('cross-category matching', () => {
    it('matches icons across all categories', () => {
      // Programming language
      expect(autoDetectIcon('Python')?.key).toBe('python');
      // Framework
      expect(autoDetectIcon('React')?.key).toBe('react');
      // Database
      expect(autoDetectIcon('PostgreSQL')?.key).toBe('postgresql');
      // Cloud
      expect(autoDetectIcon('AWS')?.key).toBe('aws');
      // Tool
      expect(autoDetectIcon('Docker')?.key).toBe('docker');
    });
  });
});
