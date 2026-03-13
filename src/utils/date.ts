/**
 * Formats a date to ISO string (YYYY-MM-DD)
 *
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Formats a date to readable string
 *
 * @param date - Date to format
 * @returns Formatted date (e.g., "January 1, 2024")
 */
export function formatDateReadable(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats a date to short string
 *
 * @param date - Date to format
 * @returns Short formatted date (e.g., "Jan 1, 2024")
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Calculates years between two dates
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of years (decimal)
 */
export function yearsBetween(startDate: Date, endDate: Date): number {
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  return (endDate.getTime() - startDate.getTime()) / msPerYear;
}

/**
 * Gets current timestamp
 *
 * @returns Current Unix timestamp in milliseconds
 */
export function getTimestamp(): number {
  return Date.now();
}

/**
 * Parses a date string to Date object
 *
 * @param dateString - Date string to parse
 * @returns Parsed date or null if invalid
 */
export function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Checks if a date is valid
 *
 * @param date - Date to validate
 * @returns True if valid date
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Adds days to a date
 *
 * @param date - Base date
 * @param days - Number of days to add
 * @returns New date with days added
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

/**
 * Adds months to a date
 *
 * @param date - Base date
 * @param months - Number of months to add
 * @returns New date with months added
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Returns start of day for a date
 *
 * @param date - Date to process
 * @returns Start of day (midnight)
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Returns end of day for a date
 *
 * @param date - Date to process
 * @returns End of day (23:59:59.999)
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}
