/**
 * Calculates percentage of a value
 *
 * @param value - Current value
 * @param total - Total value
 * @returns Percentage (0-100)
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Clamps a number between min and max
 *
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Rounds a number to specified decimal places
 *
 * @param value - Value to round
 * @param decimals - Number of decimal places
 * @returns Rounded number
 */
export function roundToDecimals(value: number, decimals: number): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Formats a number with thousands separators
 *
 * @param value - Number to format
 * @returns Formatted number string
 */
export function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Calculates average of an array of numbers
 *
 * @param numbers - Array of numbers
 * @returns Average value
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

/**
 * Calculates sum of an array of numbers
 *
 * @param numbers - Array of numbers
 * @returns Sum of all numbers
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

/**
 * Finds the median of an array of numbers
 *
 * @param numbers - Array of numbers
 * @returns Median value
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

/**
 * Converts degrees to radians
 *
 * @param degrees - Angle in degrees
 * @returns Angle in radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees
 *
 * @param radians - Angle in radians
 * @returns Angle in degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Generates a random integer between min and max (inclusive)
 *
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer
 */
export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
