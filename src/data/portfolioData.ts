import type { PortfolioData } from '@/types/portfolio';

/**
 * Single source of truth for all portfolio content (audit §6.2).
 *
 * TODO(content): The social URLs and `callBookingUrl` below are placeholders
 * drafted in the audit — the original Stitch export only had dead `href="#"`
 * links. Replace them with real profile URLs before publishing.
 */
export const portfolioData: PortfolioData = {
  profile: {
    name: 'Eumelle Jeo Mamacos',
    role: 'Computer Engineer',
    location: {
      city: 'Davao',
      countryCode: 'PH',
      timeZone: 'Asia/Manila',
      gmtOffset: 'GMT+8',
    },
    headline: {
      lead: 'Computer engineer,',
      highlight: 'development.',
      suffix: 'from idea to',
    },
    subtitle: 'Product design · Front-end · Motion · Design systems',
    manifesto: 'I’m a design engineer. I design products and build them myself —',
    manifestoHighlight: 'no handoff, nothing lost in between.',
    bookingStatus: {
      isAvailable: true,
      availableFromText: "Booking new projects — Nov '26",
    },
    avatar: {
      imageUrl: '/images/avatar.jpg',
      altText: 'E.J. Mamacos portrait',
    },
    contact: {
      email: 'ejmamacos30@gmail.com',
      callBookingUrl: 'https://cal.com/leomarlowe',
    },
    copyrightYear: 2026,
  },

  navigation: [
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience', hideOnMobile: true },
    { id: 'contact', label: 'Contact', hideOnMobile: true },
  ],

  sections: {
    heroDockLabel: 'Selected Work',
    about: {
      eyebrow: '(02) — ABOUT',
      toolboxLabel: 'DAILY TOOLBOX',
    },
    work: {
      eyebrow: '(04) — SELECTED WORK',
      title: 'Selected',
      titleHighlight: 'work',
      caption: '2023 — 2026',
    },
    experience: {
      eyebrow: '(05) — EXPERIENCE',
      title: 'Eight years of',
      titleHighlight: 'shipping things.',
      resumeCtaLabel: 'Full résumé on LinkedIn',
    },
    contact: {
      title: 'Let’s build',
      titleHighlight: 'something good.',
      callCtaLabel: 'Book a call',
      sayHiLabel: 'Say hi',
    },
  },

  strengths: [
    {
      id: 'design',
      title: 'Design',
      description: 'Flows, systems and pixel-tight interfaces.',
      iconType: 'design',
    },
    {
      id: 'engineer',
      title: 'Engineer',
      description: 'Production front-ends with motion and care.',
      iconType: 'code',
    },
    {
      id: 'ship',
      title: 'Ship',
      description: 'Launched, measured and kept improving.',
      iconType: 'ship',
    },
  ],

  toolbox: [
    { name: 'Figma', category: 'design' },
    { name: 'Framer', category: 'design' },
    { name: 'React', category: 'development' },
    { name: 'Next.js', category: 'development' },
    { name: 'TypeScript', category: 'development' },
    { name: 'Tailwind', category: 'development' },
    { name: 'Three.js', category: 'development' },
    { name: 'Rive', category: 'animation' },
    { name: 'Vercel', category: 'deployment' },
    { name: 'Cursor', category: 'development' },
  ],

  projects: [
    {
      id: 'tidepool',
      slug: 'tidepool',
      title: 'Tidepool',
      discipline: 'DESIGN',
      year: 2026,
      emoji: '🌊',
      dockBgColor: 'bg-cyan-950',
      thumbnailUrl: '/images/projects/tidepool.jpg',
      thumbnailAlt: 'Tidepool mobile app mockup',
    },
    {
      id: 'kiln-and-clay',
      slug: 'kiln-and-clay',
      title: 'Kiln & Clay',
      discipline: 'DEVELOPMENT',
      year: 2025,
      emoji: '🏺',
      dockBgColor: 'bg-amber-900',
      thumbnailUrl: '/images/projects/kiln-and-clay.jpg',
      thumbnailAlt: 'Kiln & Clay pottery craft',
    },
    {
      id: 'orbit-ledger',
      slug: 'orbit-ledger',
      title: 'Orbit Ledger',
      discipline: 'DESIGN',
      year: 2025,
      emoji: '🍃',
      dockBgColor: 'bg-emerald-900',
      thumbnailUrl: '/images/projects/orbit-ledger.jpg',
      thumbnailAlt: 'Orbit Ledger laptop mockup on mossy surface',
    },
    {
      id: 'fieldwork',
      slug: 'fieldwork',
      title: 'Fieldwork',
      discipline: 'DEVELOPMENT',
      year: 2024,
      emoji: '🧭',
      dockBgColor: 'bg-stone-800',
      thumbnailUrl: '/images/projects/fieldwork.jpg',
      thumbnailAlt: 'Fieldwork hikers on mountain ridge',
    },
    {
      id: 'parcel',
      slug: 'parcel',
      title: 'Parcel',
      discipline: 'DESIGN',
      year: 2024,
      emoji: '📦',
      dockBgColor: 'bg-indigo-950',
      thumbnailUrl: '/images/projects/parcel.jpg',
      thumbnailAlt: 'Parcel cardboard bag mockup',
    },
    {
      id: 'murmur',
      slug: 'murmur',
      title: 'Murmur',
      discipline: 'DEVELOPMENT',
      year: 2023,
      emoji: '🎙️',
      dockBgColor: 'bg-rose-950',
      thumbnailUrl: '/images/projects/murmur.jpg',
      thumbnailAlt: 'Murmur podcast microphone',
    },
  ],

  experience: [
    {
      id: 'studio-marlowe',
      company: 'Studio Marlowe',
      role: 'Independent design engineer',
      period: '2023 — NOW',
      initials: 'SM',
      isCurrent: true,
    },
    {
      id: 'pitchside',
      company: 'Pitchside',
      role: 'Lead Product Designer',
      period: '2020 — 2023',
      initials: 'Ps',
      isCurrent: false,
    },
    {
      id: 'common-room',
      company: 'Common Room',
      role: 'Front-end Engineer',
      period: '2018 — 2020',
      initials: 'CR',
      isCurrent: false,
    },
    {
      id: 'kettle-and-co',
      company: 'Kettle & Co.',
      role: 'Junior Designer & Front-end',
      period: '2016 — 2018',
      initials: 'Ke',
      isCurrent: false,
    },
  ],

  socials: [
    { 
      platform: 'LinkedIn', 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/eumelle-jeo/', 
      icon: '/images/socials/linkedin.svg',
      dockBgColor: 'bg-indigo-950',
    },
    { 
      platform: 'GitHub', 
      label: 'GitHub', 
      url: 'https://github.com/eumellejeo', 
      icon: '/images/socials/gitHub.svg',
      dockBgColor: 'bg-stone-800',
    },
    { 
      platform: 'Facebook', 
      label: 'Facebook', 
      url: 'https://www.facebook.com/eumelle.jeo/', 
      icon: '/images/socials/facebook.svg',
      dockBgColor: 'bg-cyan-950',
    },
  ],
};
