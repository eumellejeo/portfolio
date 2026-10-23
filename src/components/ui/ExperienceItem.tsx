import type { ExperienceItem as ExperienceItemData } from '@/types/portfolio';

export interface ExperienceItemProps {
  item: ExperienceItemData;
  /** Label for the current-role marker. */
  currentLabel?: string;
}

export function ExperienceItem({ item, currentLabel = 'NOW' }: ExperienceItemProps) {
  const company = item.externalUrl ? (
    <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
      {item.company}
    </a>
  ) : (
    item.company
  );

  return (
    <li className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-paper sm:p-5">
      <div className="flex min-w-0 items-center gap-3.5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-contrast text-xs font-bold tracking-wider text-contrast-fg"
          aria-hidden="true"
        >
          {item.initials}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-medium text-ink">{company}</h3>
            {item.isCurrent && (
              <span className="rounded-sm bg-orange-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                {currentLabel}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-ink-muted">{item.role}</p>
        </div>
      </div>
      <span className="shrink-0 font-mono text-micro text-ink-faint">{item.period}</span>
    </li>
  );
}
