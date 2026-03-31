/**
 * utils.ts — Small utility helpers
 */

/** Merge class names (lightweight cn — no clsx dependency needed) */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** Map a value from one range to another */
export function mapRange(
  value:  number,
  inMin:  number,
  inMax:  number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

/** Format a year range for experience entries */
export function formatPeriod(start: string, end?: string): string {
  return end ? `${start} — ${end}` : `${start} — Present`
}

/** Delay promise */
export const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))
