import { describe, it, expect } from 'vitest';
import {
  getAllIcons,
  getIconDefinition,
  getIconsByCategory,
  searchIcons,
  findIconKeyByLabel,
  getIconComponent,
} from '@/lib/icons';
import { frameworkIcons } from '@/lib/icons/categories/frameworks';
import { databaseIcons } from '@/lib/icons/categories/databases';
import { cloudInfraIcons } from '@/lib/icons/categories/cloud-infra';
import { toolIcons } from '@/lib/icons/categories/tools';
import type { IconDefinition } from '@/lib/icons/types';

describe('Icon Registry', () => {
  it('returns all icons from getAllIcons', () => {
    const icons = getAllIcons();
    expect(icons.length).toBeGreaterThan(0);
    expect(icons[0]).toHaveProperty('key');
    expect(icons[0]).toHaveProperty('category');
    expect(icons[0]).toHaveProperty('label');
    expect(icons[0]).toHaveProperty('Component');
    expect(icons[0]).toHaveProperty('searchTerms');
  });

  it('returns a specific icon definition by key', () => {
    const icon = getIconDefinition('javascript');
    expect(icon).toBeDefined();
    expect(icon?.label).toBe('JavaScript');
    expect(icon?.category).toBe('programming-language');
    expect(typeof icon?.Component).toBe('function');
  });

  it('returns undefined for unknown key', () => {
    expect(getIconDefinition('nonexistent')).toBeUndefined();
  });

  it('returns icons filtered by category', () => {
    const icons = getIconsByCategory('programming-language');
    expect(icons.length).toBeGreaterThan(0);
    icons.forEach((icon) => {
      expect(icon.category).toBe('programming-language');
    });
  });

  it('returns empty array for category with no icons', () => {
    const icons = getIconsByCategory('country-flag');
    expect(icons).toEqual([]);
  });

  it('searchIcons returns all icons when query is empty', () => {
    const all = getAllIcons();
    const result = searchIcons('');
    expect(result.length).toBe(all.length);
  });

  it('searchIcons filters by label', () => {
    const result = searchIcons('javascript');
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.some((i) => i.key === 'javascript')).toBe(true);
  });

  it('searchIcons filters by search terms', () => {
    const result = searchIcons('js');
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.some((i) => i.key === 'javascript')).toBe(true);
  });

  it('searchIcons filters by key', () => {
    const result = searchIcons('python');
    expect(result.length).toBe(1);
    expect(result[0].key).toBe('python');
  });

  it('searchIcons respects category filter', () => {
    const result = searchIcons('javascript', 'tool');
    expect(result.length).toBe(0);
    const inCategory = searchIcons('javascript', 'programming-language');
    expect(inCategory.length).toBeGreaterThanOrEqual(1);
    expect(inCategory.some((i) => i.key === 'javascript')).toBe(true);
  });

  it('findIconKeyByLabel maps exact label', () => {
    expect(findIconKeyByLabel('javascript')).toBe('javascript');
    expect(findIconKeyByLabel('JavaScript')).toBe('javascript');
  });

  it('findIconKeyByLabel maps search terms', () => {
    expect(findIconKeyByLabel('js')).toBe('javascript');
    expect(findIconKeyByLabel('ts')).toBe('typescript');
    expect(findIconKeyByLabel('golang')).toBe('go');
  });

  it('findIconKeyByLabel returns undefined for unknown', () => {
    expect(findIconKeyByLabel('cobol')).toBeUndefined();
    expect(findIconKeyByLabel('')).toBeUndefined();
  });

  it('getIconComponent returns a ReactNode', () => {
    const result = getIconComponent('javascript', 'h-4 w-4');
    expect(result).toBeTruthy();
  });

  it('getIconComponent returns null for unknown key', () => {
    const result = getIconComponent('nonexistent');
    expect(result).toBeNull();
  });
});

// ── New Category Tests ──

function assertValidIconDefinition(icon: IconDefinition, expectedCategory: string) {
  expect(icon).toHaveProperty('key');
  expect(typeof icon.key).toBe('string');
  expect(icon.key.length).toBeGreaterThan(0);
  expect(icon).toHaveProperty('category');
  expect(icon.category).toBe(expectedCategory);
  expect(icon).toHaveProperty('label');
  expect(typeof icon.label).toBe('string');
  expect(icon.label.length).toBeGreaterThan(0);
  expect(icon).toHaveProperty('Component');
  expect(typeof icon.Component).toBe('function');
  expect(icon).toHaveProperty('color');
  expect(typeof icon.color).toBe('string');
  expect(icon.color).toMatch(/^#/);
  expect(icon).toHaveProperty('searchTerms');
  expect(Array.isArray(icon.searchTerms)).toBe(true);
}

describe('Framework Icons', () => {
  it('exports a non-empty IconDefinition array', () => {
    expect(frameworkIcons.length).toBeGreaterThanOrEqual(20);
  });

  it('every icon has valid IconDefinition structure with category framework', () => {
    frameworkIcons.forEach((icon) => assertValidIconDefinition(icon, 'framework'));
  });

  it('contains React icon with brand color #61DAFB', () => {
    const react = frameworkIcons.find((i) => i.key === 'react');
    expect(react).toBeDefined();
    expect(react?.label).toBe('React');
    expect(react?.color).toBe('#61DAFB');
    expect(react?.searchTerms).toContain('reactjs');
  });

  it('contains Next.js icon with search term nextjs', () => {
    const next = frameworkIcons.find((i) => i.key === 'nextdotjs');
    expect(next).toBeDefined();
    expect(next?.searchTerms).toContain('nextjs');
  });

  it('contains Svelte icon', () => {
    const svelte = frameworkIcons.find((i) => i.key === 'svelte');
    expect(svelte).toBeDefined();
    expect(svelte?.label).toBe('Svelte');
    expect(svelte?.color).toBe('#FF3E00');
  });

  it('all keys are unique', () => {
    const keys = frameworkIcons.map((i) => i.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('Database Icons', () => {
  it('exports a non-empty IconDefinition array', () => {
    expect(databaseIcons.length).toBeGreaterThanOrEqual(19);
  });

  it('every icon has valid IconDefinition structure with category database', () => {
    databaseIcons.forEach((icon) => assertValidIconDefinition(icon, 'database'));
  });

  it('contains PostgreSQL icon with brand color #4169E1', () => {
    const pg = databaseIcons.find((i) => i.key === 'postgresql');
    expect(pg).toBeDefined();
    expect(pg?.label).toBe('PostgreSQL');
    expect(pg?.color).toBe('#4169E1');
    expect(pg?.searchTerms).toContain('postgres');
  });

  it('contains MongoDB icon with search term mongo', () => {
    const mongo = databaseIcons.find((i) => i.key === 'mongodb');
    expect(mongo).toBeDefined();
    expect(mongo?.searchTerms).toContain('mongo');
  });

  it('all keys are unique', () => {
    const keys = databaseIcons.map((i) => i.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('Cloud/Infra Icons', () => {
  it('exports a non-empty IconDefinition array', () => {
    expect(cloudInfraIcons.length).toBeGreaterThanOrEqual(16);
  });

  it('every icon has valid IconDefinition structure with category cloud', () => {
    cloudInfraIcons.forEach((icon) => assertValidIconDefinition(icon, 'cloud'));
  });

  it('contains AWS icon with brand color #FF9900', () => {
    const aws = cloudInfraIcons.find((i) => i.key === 'aws');
    expect(aws).toBeDefined();
    expect(aws?.label).toBe('AWS');
    expect(aws?.color).toBe('#FF9900');
    expect(aws?.searchTerms).toContain('amazon web services');
  });

  it('contains Vercel icon', () => {
    const vercel = cloudInfraIcons.find((i) => i.key === 'vercel');
    expect(vercel).toBeDefined();
    expect(vercel?.color).toBe('#000000');
  });

  it('contains both platform-level and service-level entries', () => {
    const platformKeys = new Set(['aws', 'azure', 'googlecloud', 'cloudflare', 'vercel', 'netlify', 'heroku', 'digitalocean', 'railway', 'flydotio']);
    const serviceKeys = new Set(['awslambda', 'amazons3', 'ec2', 'googlecloudfunctions', 'googlecloudrun', 'firebase-platform']);
    const allKeys = cloudInfraIcons.map((i) => i.key);
    for (const pk of platformKeys) {
      expect(allKeys).toContain(pk);
    }
    for (const sk of serviceKeys) {
      expect(allKeys).toContain(sk);
    }
  });

  it('firebase-platform has unique key distinct from database firebase', () => {
    const fbPlatform = cloudInfraIcons.find((i) => i.key === 'firebase-platform');
    expect(fbPlatform).toBeDefined();
    expect(fbPlatform?.label).toBe('Firebase');
  });

  it('all keys are unique', () => {
    const keys = cloudInfraIcons.map((i) => i.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('Tool Icons', () => {
  it('exports a non-empty IconDefinition array', () => {
    expect(toolIcons.length).toBeGreaterThanOrEqual(29);
  });

  it('every icon has valid IconDefinition structure with category tool', () => {
    toolIcons.forEach((icon) => assertValidIconDefinition(icon, 'tool'));
  });

  it('contains Git icon with brand color #F05032', () => {
    const git = toolIcons.find((i) => i.key === 'git');
    expect(git).toBeDefined();
    expect(git?.label).toBe('Git');
    expect(git?.color).toBe('#F05032');
  });

  it('contains Docker icon with brand color #2496ED', () => {
    const docker = toolIcons.find((i) => i.key === 'docker');
    expect(docker).toBeDefined();
    expect(docker?.label).toBe('Docker');
    expect(docker?.color).toBe('#2496ED');
  });

  it('contains Kubernetes icon with search term k8s', () => {
    const k8s = toolIcons.find((i) => i.key === 'kubernetes');
    expect(k8s).toBeDefined();
    expect(k8s?.searchTerms).toContain('k8s');
  });

  it('contains VS Code icon with search term vs code', () => {
    const vscode = toolIcons.find((i) => i.key === 'vscode');
    expect(vscode).toBeDefined();
    expect(vscode?.searchTerms).toContain('vs code');
  });

  it('all keys are unique', () => {
    const keys = toolIcons.map((i) => i.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('Registry merge — all 5 categories', () => {
  it('getAllIcons includes icons from all 5 categories', () => {
    const all = getAllIcons();
    const categories = new Set(all.map((i) => i.category));
    expect(categories).toContain('programming-language');
    expect(categories).toContain('framework');
    expect(categories).toContain('database');
    expect(categories).toContain('cloud');
    expect(categories).toContain('tool');
  });

  it('getAllIcons has no duplicate keys', () => {
    const all = getAllIcons();
    const keys = all.map((i) => i.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('getIconsByCategory returns non-empty for each category', () => {
    expect(getIconsByCategory('framework').length).toBeGreaterThan(0);
    expect(getIconsByCategory('database').length).toBeGreaterThan(0);
    expect(getIconsByCategory('cloud').length).toBeGreaterThan(0);
    expect(getIconsByCategory('tool').length).toBeGreaterThan(0);
  });

  it('searchIcons finds icons across new categories', () => {
    // React from frameworks
    const reactResults = searchIcons('react');
    expect(reactResults.some((i) => i.key === 'react')).toBe(true);

    // postgres from databases (via search term)
    const pgResults = searchIcons('postgres', 'database');
    expect(pgResults.some((i) => i.key === 'postgresql')).toBe(true);

    // docker from tools
    const dockerResults = searchIcons('docker', 'tool');
    expect(dockerResults.some((i) => i.key === 'docker')).toBe(true);

    // aws from cloud
    const awsResults = searchIcons('aws', 'cloud');
    expect(awsResults.some((i) => i.key === 'aws')).toBe(true);
  });
});
