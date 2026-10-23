import type { ComponentType } from 'react';
import Image from 'next/image';
import { Dribbble, Facebook, Github, Globe, Linkedin, Mail, Twitter, type LucideProps } from 'lucide-react';
import type { SocialLink } from '@/types/portfolio';

/** Maps SocialLink platform or icon keys to Lucide icons. */
const icons: Record<string, ComponentType<LucideProps>> = {
  x: Twitter,
  twitter: Twitter,
  linkedin: Linkedin,
  dribbble: Dribbble,
  github: Github,
  facebook: Facebook,
  email: Mail,
};

export interface SocialButtonProps {
  link: SocialLink;
}

export function SocialButton({ link }: SocialButtonProps) {
  const isMail = link.url.startsWith('mailto:');
  const isSvgFile = link.icon.startsWith('/') || link.icon.endsWith('.svg');
  const Icon = icons[link.icon.toLowerCase()] ?? icons[link.platform.toLowerCase()] ?? Globe;

  return (
    <a
      href={link.url}
      aria-label={link.label}
      title={link.label}
      {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-line/5 bg-chip text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-chip-hover hover:text-ink"
    >
      {isSvgFile ? (
        <Image
          src={link.icon}
          alt=""
          width={16}
          height={16}
          className="h-4 w-4 object-contain opacity-75 transition-opacity hover:opacity-100 dark:invert"
          aria-hidden="true"
        />
      ) : (
        <Icon className="h-4 w-4" />
      )}
    </a>
  );
}
