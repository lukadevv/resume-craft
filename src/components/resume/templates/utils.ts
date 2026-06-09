/**
 * Detect if a gradient string's first hex color implies a dark background.
 *
 * Extracts the first 6-digit (or 3-digit short) hex color from a CSS gradient
 * string and computes its relative luminance. Returns `true` if luminance is
 * below 128 (perceptually dark).
 *
 * @param gradient - A CSS gradient string like `"linear-gradient(135deg, #0f172a, #111827)"`.
 * @returns `true` if the background should use light text (dark bg), `false` otherwise.
 */
export function isDarkBackground(gradient: string | undefined): boolean {
  if (!gradient) return false;

  const hexMatch = gradient.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/);
  if (!hexMatch) return false;

  let hex = hexMatch[1];
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Relative luminance (sRGB coefficients)
  return 0.299 * r + 0.587 * g + 0.114 * b < 128;
}
