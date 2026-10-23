'use client';

import { useCallback, useEffect, useState } from 'react';
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

/** Light/dark theme state, synced with the `.dark` class on <html> and localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* storage unavailable (private mode) — ignore */
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
