/**
 * Dynamic font sizing utility for Builder Name and Tech Stack
 * Prevents text overflow for long names like "Alexander Christopher Williams"
 */
export function getResponsiveFontSize(
  text: string,
  baseSizeRem = 2.2,
  minSizeRem = 1.25,
  maxLengthForBase = 14
): string {
  if (!text) return `${baseSizeRem}rem`;
  const len = text.length;
  if (len <= maxLengthForBase) {
    return `${baseSizeRem}rem`;
  }
  // Decrease font size proportionally
  const factor = maxLengthForBase / len;
  const calculated = Math.max(minSizeRem, baseSizeRem * Math.pow(factor, 0.6));
  return `${calculated.toFixed(2)}rem`;
}
