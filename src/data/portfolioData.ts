import type { PortfolioData } from '@/types/portfolio';

/*
 * Single source of truth for all portfolio content (audit §6.2).
 *
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
    subtitle: 'Machine Learning · Computer Vision · Full-Stack Web · Mobile Dev · Embedded & IoT',
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
    tech: {
      eyebrow: '(03) — TECH STACK',
      title: 'Technological',
      titleHighlight: 'Skills',
    },
    work: {
      eyebrow: '(04) — PROJECTS',
      title: 'My',
      titleHighlight: 'projects',
      caption: '2023 — 2026',
    },
    experience: {
      eyebrow: '(05) — EXPERIENCE',
      title: 'Overall',
      titleHighlight: 'experience.',
    }
  },

  strengths: [
    {
      title: 'Intelligence',
      description: 'Training high-precision object detection, and combinatorial feature selection models.',
      iconType: 'ship',
    },
    {
      title: 'Infrastructure',
      description: 'Architecting zero-trust Supabase schemas, pipelines, and serverless GPU workers.',
      iconType: 'code',
    },
    {
      title: 'Interface',
      description: 'Building responsive web dashboards, geospatial views, and mobile UIs.',
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
      category: 'work',
      company: 'Chung Yuan Christian University (CYCU)',
      position: 'Taiwan International Research Delegate',
      period: 'July - August 2026',
      logo: '/images/experience/cycu.svg',
      isCurrent: false,
    },
    {
      category: 'work',
      company: 'SF Group of Companies',
      position: 'Lead Developer Intern',
      period: 'June - July 2026',
      logo: '/images/experience/sfgc.png',
      isCurrent: false,
    },
    {
      category: 'work',
      company: 'SF Group of Companies',
      position: 'Machine Learning Research Intern',
      period: 'April - June 2026',
      logo: '/images/experience/sfgc.png',
      isCurrent: false,
    },
    {
      category: 'education',
      company: 'Mapua Malayan Colleges Mindanao',
      position: 'College\nBachelor of Science in Computer Engineering\nMagna Cum Laude\nTop 1 BSCpE of Batch 2026',
      period: '2022 - 2026',
      logo: '/images/experience/mapua.png',
      isCurrent: false,
    },
    {
      category: 'education',
      company: 'Mapua Malayan Colleges Mindanao',
      position: 'Senior High School (SHS)\nScience, Technology, Engineering, and Mathematics (STEM)\nAcademic Excellence Awardee',
      period: '2020 - 2022',
      logo: '/images/experience/mapua.png',
      isCurrent: false,
    },
    {
      category: 'education',
      company: 'Colegio de San Ignacio',
      position: 'Elementary - Junior High School',
      period: '2010 - 2020',
      logo: '/images/experience/cdsi.png',
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
