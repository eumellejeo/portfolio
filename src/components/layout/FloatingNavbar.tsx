'use client';

import { MessageCircle, Moon, Sun } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useTheme } from '@/hooks/useTheme';
import { useZonedClock } from '@/hooks/useZonedClock';
import { cn } from '@/lib/cn';
import type { SectionId } from '@/types/portfolio';

const SPY_IDS: readonly SectionId[] = ['hero', 'about', 'work', 'experience', 'contact'];

/**
 * Top-mounted glassmorphic pill dock (moved from bottom-fixed in the export).
 * - Scrollspy highlights the section in view
 * - SSR-safe live clock for the profile's time zone
 * - Functional light/dark toggle (was an inert button)
 */
export function FloatingNavbar() {
  const { profile, navigation, sections } = portfolioData;
  const active = useScrollSpy(SPY_IDS);
  const time = useZonedClock(profile.location.timeZone);
  const { theme, toggleTheme } = useTheme();

  const cityCode = profile.location.city.slice(0, 3).toUpperCase();
  const themeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className="pointer-events-none fixed left-1/2 top-4 z-50 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 sm:top-6">
      <nav
        id="dock-nav"
        aria-label="Primary"
        className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-line/10 bg-paper/85 px-2 py-1.5 text-xs font-medium text-ink-soft shadow-lg backdrop-blur-md transition-colors hover:bg-paper sm:gap-2 sm:px-3"
      >
        <a
          href="#hero"
          aria-label={`${profile.name} — back to top`}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-contrast font-serif text-micro font-bold text-contrast-fg transition-transform hover:scale-110"
        >
          {profile.name.charAt(0)}
        </a>

        <ul className="flex items-center">
          {navigation.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className={cn(item.hideOnMobile && 'hidden sm:block')}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'block rounded-full px-2.5 py-1 transition-colors duration-200 hover:text-ink',
                    isActive && 'bg-chip text-ink',
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <span className="inline-flex items-center gap-1 rounded-full bg-chip/80 px-2 py-0.5 font-mono text-micro text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          <time id="lisbon-time" suppressHydrationWarning aria-label={`Local time in ${profile.location.city}`}>
            {cityCode} {time ?? '--:--'}
          </time>
        </span>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={themeLabel}
          title={themeLabel}
          className="rounded-full p-1 text-ink-muted transition-colors hover:bg-chip hover:text-ink"
        >
          {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        </button>
      </nav>
    </header>
  );
}
