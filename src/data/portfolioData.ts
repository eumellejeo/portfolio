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

  techStack: [
    {
      id: 'languages',
      title: 'Programming Languages',
      position: 'top-left',
      skills: ['Python', 'JavaScript', 'C++', 'Dart', 'Verilog', 'VHDL', 'Assembly', 'Java'],
    },
    {
      id: 'frameworks',
      title: 'Frameworks & Libraries',
      position: 'bottom-left',
      skills: ['PyTorch', 'Flutter','React','Next.js','Node.js','OpenCV','scikit-learn'],
    },
    {
      id: 'backend',
      title: 'Databases & Backend',
      position: 'top-right',
      skills: ['PostgreSQL', 'Supabase', 'Cloudflare R2', 'Vercel'],
    },
    {
      id: 'tools',
      title: 'Engineering Tools',
      position: 'bottom-right',
      skills: ['MATLAB', 'Xinix ISE Design Suite', 'Git/GitHub', 'VS Code'],
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
      title: 'SAMPLE PROJECT',
      description: 'Sample Description',
      year: 2026,
      thumbnailUrl: '/images/projects/tidepool.jpg',
      thumbnailAlt: 'Tidepool mobile app mockup',
    },
    {
      title: 'SAMPLE PROJECT 2',
      description: 'Sample Description 2',
      year: 2026,
      thumbnailUrl: '/images/projects/tidepool.jpg',
      thumbnailAlt: 'Tidepool mobile app mockup',
    },
    {
      title: 'SAMPLE PROJECT 3',
      description: 'Sample Description 3',
      year: 2026,
      thumbnailUrl: '/images/projects/tidepool.jpg',
      thumbnailAlt: 'Tidepool mobile app mockup',
    },
    {
      title: 'SAMPLE PROJECT',
      description: 'Sample Description',
      year: 2026,
      thumbnailUrl: '/images/projects/tidepool.jpg',
      thumbnailAlt: 'Tidepool mobile app mockup',
    },
    {
      title: 'SAMPLE PROJECT 2',
      description: 'Sample Description 2',
      year: 2026,
      thumbnailUrl: '/images/projects/tidepool.jpg',
      thumbnailAlt: 'Tidepool mobile app mockup',
    },
    {
      title: 'SAMPLE PROJECT 3',
      description: 'Sample Description 3',
      year: 2026,
      thumbnailUrl: '/images/projects/tidepool.jpg',
      thumbnailAlt: 'Tidepool mobile app mockup',
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
