import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type PillVariant = 'default' | 'status-dot' | 'mono-section' | 'pulse';
type DotColor = 'emerald' | 'orange' | 'stone';

export interface PillBadgeProps {
  children: ReactNode;
  variant?: PillVariant;
  dotColor?: DotColor;
  className?: string;
}

const dotColors: Record<DotColor, string> = {
  emerald: 'bg-emerald-500',
  orange: 'bg-orange-500',
  stone: 'bg-ink-faint',
};

/**
 * Generic pill used for the hero identity tag, booking status, section eyebrows
 * and the "NOW" timeline marker.
 */
export function PillBadge({ children, variant = 'default', dotColor = 'emerald', className }: PillBadgeProps) {
  if (variant === 'mono-section') {
    return (
      <span className={cn('block font-mono text-s uppercase tracking-widest text-ink-faint', className)}>
        {children}
      </span>
    );
  }

  const hasDot = variant === 'status-dot' || variant === 'pulse';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line/5 px-3.5 py-1 text-xs text-ink-soft',
        className ?? 'bg-paper/80 shadow-xs',
      )}
    >
      {hasDot && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          {variant === 'pulse' && (
            <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-60', dotColors[dotColor])} />
          )}
          <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', dotColors[dotColor])} />
        </span>
      )}
      {children}
    </span>
  );
}
