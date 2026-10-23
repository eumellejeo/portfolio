import type { Config } from 'tailwindcss';

/**
 * Design tokens extracted from the Stitch export (audit §4.2).
 *
 * Theme-aware tokens resolve to CSS variables (see globals.css) so the
 * light values match the original hex codes exactly while dark mode can swap them.
 */
const themed = (cssVar: string) => `rgb(var(${cssVar}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: themed('--brand-bg'), //          #F5F4F0
          card: themed('--brand-card'), //      #ECEAE4
          surface: themed('--brand-surface'), // #EAE8E1
          dark: '#141413',
          terracotta: '#C85A32',
          muted: '#7A7873',
          border: 'var(--brand-border)', //     rgba(0, 0, 0, 0.07)
        },
        /** Text scale (replaces stone-900/700/500/400 from the export). */
        ink: {
          DEFAULT: themed('--ink'),
          soft: themed('--ink-soft'),
          muted: themed('--ink-muted'),
          faint: themed('--ink-faint'),
        },
        /** Inverted surfaces: dark buttons / monograms in light mode. */
        contrast: {
          DEFAULT: themed('--contrast'),
          fg: themed('--contrast-fg'),
        },
        /** Raised panels (originally bg-white/xx). */
        paper: themed('--paper'),
        /** Chips & secondary buttons (originally stone-100 / stone-200). */
        chip: {
          DEFAULT: themed('--chip'),
          hover: themed('--chip-hover'),
        },
        /** Hairline colour, use with opacity: border-line/[0.06]. */
        line: themed('--line'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['var(--font-serif-title)', 'Georgia', 'serif'],
      },
      borderRadius: {
        hero: '2.5rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }], // 10px
        micro: ['0.6875rem', { lineHeight: '1rem' }], //    11px
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        '2xs': '0 1px 1px 0 rgb(0 0 0 / 0.03)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
