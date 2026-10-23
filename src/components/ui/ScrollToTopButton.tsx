'use client';

import { ArrowUp } from 'lucide-react';

export interface ScrollToTopButtonProps {
  label?: string;
}

/** Stateless smooth scroll-to-top control (replaces the dead `href="#"` arrow). */
export function ScrollToTopButton({ label = 'Back to top' }: ScrollToTopButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="flex h-5 w-5 items-center justify-center rounded-full bg-chip-hover/80 text-ink-soft transition-colors hover:bg-chip-hover hover:text-ink"
    >
      <ArrowUp className="h-3 w-3" />
    </button>
  );
}
