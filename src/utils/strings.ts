/**
 * Truncates a string to specified length
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated string with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Converts a string to slug format
 *
 * @param text - Text to convert
 * @returns Slugified string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes first letter of a string
 *
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Converts string to camelCase
 *
 * @param text - Text to convert
 * @returns camelCase string
 */
export function toCamelCase(text: string): string {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Converts string to PascalCase
 *
 * @param text - Text to convert
 * @returns PascalCase string
 */
export function toPascalCase(text: string): string {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
      return word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Removes all whitespace from a string
 *
 * @param text - Text to process
 * @returns Text without whitespace
 */
export function removeWhitespace(text: string): string {
  return text.replace(/\s+/g, '');
}

/**
 * Escapes HTML special characters
 *
 * @param text - Text to escape
 * @returns Escaped HTML string
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Unescapes HTML entities
 *
 * @param text - Text to unescape
 * @returns Unescaped string
 */
export function unescapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
  };
  return text.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (m) => map[m]);
}

/**
 * Checks if string is a valid email
 *
 * @param email - Email to validate
 * @returns True if valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
