/** Minimal className joiner (avoids pulling in clsx for a handful of uses). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
