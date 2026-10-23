/** Shared theme constants — no 'use client', so Server Components can import them. */

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/**
 * Inline script injected in <head> to apply the stored/system theme before
 * first paint (prevents a light→dark flash).
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`;
