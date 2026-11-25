/**
 * Splits a stat like "20+", "1,368" or "5M" into the number to count up to and
 * the text after it. Returns null for values that shouldn't animate, such as
 * "Apr ’24" or "24/7".
 */
export function parseCount(value: string): { target: number; suffix: string } | null {
  if (value.includes('/')) return null
  const match = /^(\d{1,3}(?:,\d{3})+|\d+)(.*)$/.exec(value)
  if (!match) return null
  return { target: Number(match[1].replaceAll(',', '')), suffix: match[2] }
}

/** Formats a count the way the original value was written (keeps thousands separators). */
export function formatCount(n: number, original: string): string {
  const rounded = Math.round(n)
  return /^\d{1,3},\d{3}/.test(original) ? rounded.toLocaleString('en-US') : String(rounded)
}
