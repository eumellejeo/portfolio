import type { ExperienceCategory, ExperienceItem } from '@/types/portfolio';

/* ------------------------------------------------------------------ */
/* Category metadata — order here is the order rendered on the spine. */
/* ------------------------------------------------------------------ */
export interface ExperienceCategoryMeta {
  id: ExperienceCategory;
  label: string;
  icon: string;
}

export const EXPERIENCE_CATEGORIES: readonly ExperienceCategoryMeta[] = [
  { id: 'work', label: 'Work', icon: '/images/experience/work.svg' },
  { id: 'education', label: 'Education', icon: '/images/experience/education.svg' },
];

export interface ExperienceGroup extends ExperienceCategoryMeta {
  items: ExperienceItem[];
}

/* ------------------------------------------------------------------ */
/* Period parsing                                                      */
/* Supports free-form strings such as "July - August 2026",           */
/* "2022 - 2026", "Mar 2024 – Present".                                */
/* ------------------------------------------------------------------ */
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

function parsePoint(raw: string, edge: 'start' | 'end', fallbackYear?: number): number {
  const text = raw.trim().toLowerCase();
  if (/present|current|now/.test(text)) return Number.POSITIVE_INFINITY;

  const yearMatch = text.match(/\d{4}/);
  const year = yearMatch ? Number(yearMatch[0]) : fallbackYear ?? 0;
  const month = MONTHS.findIndex((m) => text.includes(m));

  // Year-only values span the whole year.
  return year * 12 + (month >= 0 ? month : edge === 'end' ? 11 : 0);
}

/** Returns `[end, start]` as comparable month indices. */
function periodKey(period: string): [number, number] {
  const parts = period.split(/\s*[-–—]\s*|\s+to\s+/i).filter(Boolean);
  const startRaw = parts[0] ?? '';
  const endRaw = parts[parts.length - 1] ?? startRaw;

  const endYear = endRaw.match(/\d{4}/)?.[0];
  const end = parsePoint(endRaw, 'end');
  // "July - August 2026": the start inherits the end's year.
  const start = parsePoint(startRaw, 'start', endYear ? Number(endYear) : undefined);
  return [end, start];
}

/** Reverse-chronological (newest first). Current roles always float to the top; ties keep data order. */
export function sortByRecency(items: ExperienceItem[]): ExperienceItem[] {
  return items
    .map((item, index) => ({ item, index, key: periodKey(item.period) }))
    .sort((a, b) => {
      if (a.item.isCurrent !== b.item.isCurrent) return a.item.isCurrent ? -1 : 1;
      if (a.key[0] !== b.key[0]) return b.key[0] - a.key[0];
      if (a.key[1] !== b.key[1]) return b.key[1] - a.key[1];
      return a.index - b.index;
    })
    .map(({ item }) => item);
}

/** Groups experience by category (in `EXPERIENCE_CATEGORIES` order), skipping empty groups. */
export function groupExperience(items: ExperienceItem[]): ExperienceGroup[] {
  return EXPERIENCE_CATEGORIES.map((meta) => ({
    ...meta,
    items: sortByRecency(items.filter((item) => item.category === meta.id)),
  })).filter((group) => group.items.length > 0);
}

/** Short monogram used when a logo is missing, e.g. "Chung Yuan … (CYCU)" → "CY". */
export function getInitials(name: string): string {
  const acronym = name.match(/\(([A-Z]{2,})\)/)?.[1];
  if (acronym) return acronym.slice(0, 2);
  return name
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('');
}

/** Stable key — the data has no ids. */
export function experienceKey(item: ExperienceItem): string {
  return `${item.category}-${item.company}-${item.position.split('\n')[0]}-${item.period}`;
}
