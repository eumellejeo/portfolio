/**
 * Portfolio domain types.
 * Interfaces SiteProfile → DailyTool mirror Section 6.1 of portfolio-audit.md exactly.
 * NavigationItem / SectionHeading / PortfolioData are additive so that section
 * headings and nav labels are also data-driven (no hardcoded copy in JSX).
 */

export interface SiteProfile {
  name: string;
  role: string;
  location: {
    city: string;
    countryCode: string;
    timeZone: string;
    gmtOffset: string;
  };
  subtitle: string;
  avatar: {
    imageUrl: string;
    altText: string;
  };
  contact: {
    email: string;
    callBookingUrl?: string;
  };
  copyrightYear: number;
}

export interface ProjectItem {
  title: string;
  description?: string;
  year: number;
  thumbnailUrl: string;
  thumbnailMobile: string;
  externalUrl?: string;
}

export interface CoreStrength {
  title: string;
  description: string;
  iconType: string;
}

export type ExperienceCategory = 'education' | 'work';

export interface ExperienceItem {
  category: ExperienceCategory;
  /** Company or school name. */
  company: string;
  /** Position or degree. Use `\n` for extra lines (first line = headline, rest = details/honours). */
  position: string;
  period: string;
  logo: string;
  isCurrent: boolean;
  description?: string;
}

export interface SocialLink {
  platform: 'X' | 'LinkedIn' | 'Facebook' | 'GitHub' | 'Email';
  label: string;
  url: string;
  icon: string;
  dockBgColor?: string;
}

export interface DailyTool {
  name: string;
  category?: 'design' | 'development' | 'animation' | 'deployment';
}

export interface TechCategory {
  id: string;
  title: string;
  position: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
  skills: string[];
}

/* ------------------------------------------------------------------ */
/* Additive types (not in the audit) for fully data-driven UI copy.    */
/* ------------------------------------------------------------------ */

export type SectionId = 'hero' | 'about' | 'work' | 'experience' | 'contact';

export interface NavigationItem {
  id: SectionId;
  label: string;
  /** Hide the label on very small screens to keep the pill dock compact. */
  hideOnMobile?: boolean;
}

export interface SectionHeading {
  /** Mono eyebrow, e.g. "(02) — ABOUT". */
  eyebrow?: string;
  title: string;
  /** Italic serif tail appended to the title. */
  titleHighlight?: string;
  /** Small mono caption under the title, e.g. "2023 — 2026". */
  caption?: string;
}

export interface PortfolioData {
  profile: SiteProfile;
  navigation: NavigationItem[];
  sections: {
    heroDockLabel: string;
    /** About title is profile.manifesto, so only the eyebrow lives here. */
    about: { eyebrow: string; toolboxLabel: string };
    tech: {
      eyebrow: string;
      title: string;
      titleHighlight: string;
    };
    work: SectionHeading;
    experience: SectionHeading;
  };
  strengths: CoreStrength[];
  techStack: TechCategory[];
  toolbox?: DailyTool[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  socials: SocialLink[];
}
