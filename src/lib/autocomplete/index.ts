import type { AutocompleteData } from './types';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { pt } from './pt';

/**
 * Locale registry. Each entry merges the English base with locale-specific overrides.
 * English is fully specified; all other locales are Partial<AutocompleteData>.
 */
const localeRegistry: Record<string, AutocompleteData> = {
  en,
  es: { ...en, ...es },
  fr: { ...en, ...fr },
  de: { ...en, ...de },
  pt: { ...en, ...pt },
};

/** Supported locale codes matching the project's i18n config. */
const SUPPORTED_LOCALES = ['en', 'es', 'de', 'fr', 'pt'];

/**
 * Normalise a locale code to a known supported code.
 * Falls back to 'en' for unsupported or undefined locales.
 */
function resolveLocale(locale?: string): string {
  if (locale && SUPPORTED_LOCALES.includes(locale)) return locale;
  return 'en';
}

/**
 * Get the locale-specific full autocomplete dataset.
 * Falls back to English for any missing keys automatically via the merge in localeRegistry.
 */
export function getAutocompleteData(locale?: string): AutocompleteData {
  const key = resolveLocale(locale);
  return localeRegistry[key] ?? en;
}

/**
 * Get autocomplete suggestions for a given field type, filtered by query.
 * @param fieldType - The field type key (e.g. 'jobTitle', 'company', 'skill')
 * @param query - The user's current input
 * @param locale - Optional locale code (defaults to 'en')
 * @returns Up to 10 matching suggestions
 */
export function getFieldSuggestions(
  fieldType: string,
  query: string,
  locale?: string,
): string[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  const data = getAutocompleteData(locale);

  switch (fieldType) {
    case 'jobTitle':
      return filterList(data.jobTitles, normalizedQuery);
    case 'company':
      return filterList(data.companies, normalizedQuery);
    case 'university':
      return filterList(data.universities, normalizedQuery);
    case 'degree':
      return filterList(data.degrees, normalizedQuery);
    case 'field':
      return filterList(data.fieldsOfStudy, normalizedQuery);
    case 'skill': {
      const allSkills = [
        ...data.skills.programming,
        ...data.skills.frontend,
        ...data.skills.backend,
        ...data.skills.databases,
        ...data.skills.cloud,
        ...data.skills.devops,
        ...data.skills.tools,
        ...data.skills.methodologies,
        ...data.skills.softSkills,
      ];
      return [...new Set(allSkills.filter((s) => s.toLowerCase().includes(normalizedQuery)))].slice(0, 10);
    }
    case 'certification':
      return filterList(data.certifications, normalizedQuery);
    case 'certificationIssuer':
      return filterList(data.certificationIssuers, normalizedQuery);
    case 'city':
      return filterList(data.locations.usCities, normalizedQuery);
    case 'state':
      return filterList(data.locations.states, normalizedQuery);
    case 'country':
      return filterList(data.locations.countries, normalizedQuery);
    case 'language':
      return filterList(data.languages, normalizedQuery);
    case 'skillLevel':
      return filterList(data.skillLevels, normalizedQuery);
    case 'languageProficiency':
      return filterList(data.proficiencyLevels, normalizedQuery);
    case 'relationship':
      return filterList(data.relationships, normalizedQuery);
    case 'coreCompetency':
      return filterList(data.coreCompetencies, normalizedQuery);
    case 'clinicalSkill':
      return filterList(data.clinicalSkills, normalizedQuery);
    case 'practiceArea':
      return filterList(data.practiceAreas, normalizedQuery);
    case 'securityClearance':
      return filterList(data.securityClearance, normalizedQuery);
    default:
      return [];
  }
}

/** Filter a string array by case-insensitive substring match, max 10 results. */
function filterList(list: string[], query: string): string[] {
  return list
    .filter((item) => item.toLowerCase().includes(query))
    .slice(0, 10);
}
