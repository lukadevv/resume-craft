import type { IconDefinition } from './types';
import { getAllIcons } from './registry';

/**
 * Fuzzy, case-insensitive lookup that matches a technology name
 * against all registered icons' labels and search terms.
 *
 * Match priority (ties broken by shortest label):
 * 1. Exact label match (case-insensitive)
 * 2. Exact search term match (case-insensitive)
 * 3. Label starts with input
 * 4. Search term starts with input
 * 5. Label contains input (shortest match wins)
 *
 * @returns IconDefinition if found, undefined otherwise
 */
export function autoDetectIcon(name: string): IconDefinition | undefined {
  const normalized = name.toLowerCase().trim();
  if (!normalized) return undefined;

  const all = getAllIcons();

  let exactLabel: IconDefinition | undefined;
  let exactSearchTerm: IconDefinition | undefined;
  let startsWithLabel: IconDefinition | undefined;
  let startsWithSearchTerm: IconDefinition | undefined;
  let includesLabel: IconDefinition | undefined;

  for (const icon of all) {
    const label = icon.label.toLowerCase();

    // Priority 1: Exact label match
    if (label === normalized) {
      exactLabel = icon;
      break; // can't get more exact than this
    }

    // Priority 2: Exact search term match
    if (!exactSearchTerm && icon.searchTerms.some((t) => t.toLowerCase() === normalized)) {
      exactSearchTerm = icon;
    }

    // Priority 3: Label starts with input
    if (!startsWithLabel && label.startsWith(normalized)) {
      startsWithLabel = icon;
    }

    // Priority 4: Search term starts with input
    if (!startsWithSearchTerm && icon.searchTerms.some((t) => t.toLowerCase().startsWith(normalized))) {
      startsWithSearchTerm = icon;
    }

    // Priority 5: Label includes input (pick shortest label as best match)
    if (label.includes(normalized)) {
      if (!includesLabel || icon.label.length < includesLabel.label.length) {
        includesLabel = icon;
      }
    }
  }

  return (
    exactLabel ??
    exactSearchTerm ??
    startsWithLabel ??
    startsWithSearchTerm ??
    includesLabel ??
    undefined
  );
}
