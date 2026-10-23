import type { Metadata, Viewport } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import { portfolioData } from '@/data/portfolioData';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-serif-title',
  display: 'swap',
});

const { profile } = portfolioData;

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: `${profile.name} is a ${profile.role.toLowerCase()} based in ${profile.location.city}. ${profile.subtitle}.`,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.subtitle,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F4F0' },
    { media: '(prefers-color-scheme: dark)', color: '#141413' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply stored theme before paint to avoid a flash of the wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative min-h-screen">{children}</body>
    </html>
  );
}
