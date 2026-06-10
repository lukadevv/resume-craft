import { ReactNode } from 'react';
import { IconDefinition, IconCategory } from './types';
import { programmingLanguageIcons } from './categories/programming-languages';
import { frameworkIcons } from './categories/frameworks';
import { databaseIcons } from './categories/databases';
import { cloudInfraIcons } from './categories/cloud-infra';
import { toolIcons } from './categories/tools';
import { countryFlagIcons } from './categories/country-flags';

const allIcons: IconDefinition[] = [
  ...programmingLanguageIcons,
  ...frameworkIcons,
  ...databaseIcons,
  ...cloudInfraIcons,
  ...toolIcons,
  ...countryFlagIcons,
];

const iconByKey = new Map<string, IconDefinition>(
  allIcons.map((icon) => [icon.key, icon])
);

const iconsByCategory = new Map<IconCategory, IconDefinition[]>();
for (const icon of allIcons) {
  const list = iconsByCategory.get(icon.category) || [];
  list.push(icon);
  iconsByCategory.set(icon.category, list);
}

const labelByKey = new Map<string, string>();
for (const icon of allIcons) {
  labelByKey.set(icon.key, icon.label.toLowerCase());
  for (const term of icon.searchTerms) {
    labelByKey.set(term.toLowerCase(), icon.key);
  }
}

export function getAllIcons(): IconDefinition[] {
  return allIcons;
}

export function getIconDefinition(key: string): IconDefinition | undefined {
  return iconByKey.get(key);
}

export function getIconsByCategory(category: IconCategory): IconDefinition[] {
  return iconsByCategory.get(category) || [];
}

export function searchIcons(
  query: string,
  category?: IconCategory
): IconDefinition[] {
  const normalized = query.toLowerCase().trim();
  const pool = category
    ? (iconsByCategory.get(category) || [])
    : allIcons;

  if (!normalized) return pool;

  return pool.filter((icon) => {
    if (icon.label.toLowerCase().includes(normalized)) return true;
    if (icon.key.includes(normalized)) return true;
    return icon.searchTerms.some((term) => term.includes(normalized));
  });
}

export function findIconKeyByLabel(text: string): string | undefined {
  const normalized = text.toLowerCase().trim();
  if (!normalized) return undefined;
  return labelByKey.get(normalized);
}

export function getIconComponent(
  key: string,
  className?: string,
  size?: number,
  color?: string
): ReactNode {
  const def = iconByKey.get(key);
  if (!def) return null;
  return <def.Component className={className} size={size} style={color ? { color } : undefined} />;
}

export function getIconColor(key: string): string | undefined {
  return iconByKey.get(key)?.color;
}
