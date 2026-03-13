/**
 * Formats a date to ISO string (YYYY-MM-DD)
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Formats a date to readable string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date (e.g., "January 1, 2024")
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
 * @param {Date} date - Date to format
 * @returns {string} Short formatted date (e.g., "Jan 1, 2024")
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
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {number} Number of years (decimal)
 */
export function yearsBetween(startDate: Date, endDate: Date): number {
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  return (endDate.getTime() - startDate.getTime()) / msPerYear;
}

/**
 * Gets current timestamp
 * @returns {number} Current Unix timestamp in milliseconds
 */
export function getTimestamp(): number {
  return Date.now();
}

/**
 * Parses a date string to Date object
 * @param {string} dateString - Date string to parse
 * @returns {Date} Parsed date or null if invalid
 */
export function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Checks if a date is valid
 * @param {Date} date - Date to validate
 * @returns {boolean} True if valid date
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Adds days to a date
 * @param {Date} date - Base date
 * @param {number} days - Number of days to add
 * @returns {Date} New date with days added
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Adds months to a date
 * @param {Date} date - Base date
 * @param {number} months - Number of months to add
 * @returns {Date} New date with months added
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Returns start of day for a date
 * @param {Date} date - Date to process
 * @returns {Date} Start of day (midnight)
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Returns end of day for a date
 * @param {Date} date - Date to process
 * @returns {Date} End of day (23:59:59.999)
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}
