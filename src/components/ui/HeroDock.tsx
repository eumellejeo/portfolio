import Image from 'next/image';
import { Mail } from 'lucide-react';
import type { SocialLink } from '@/types/portfolio';

export interface HeroDockProps {
  label: string;
  socials: SocialLink[];
  email: string;
  emailLabel: string;
}

/** macOS-style quick-jump dock: one tile per social link plus an email shortcut. */
export function HeroDock({ label, socials, email, emailLabel }: HeroDockProps) {
  return (
    <nav aria-label={label} className="flex flex-col items-center gap-3">
      <span className="text-xs font-medium uppercase tracking-widest text-ink-faint">{label}</span>
      <div className="flex items-center gap-2.5 rounded-2xl border border-line/5 bg-paper/80 p-2 shadow-sm backdrop-blur-md">
        {socials.map((social) => {
          const isMail = social.url.startsWith('mailto:');
          const isSvgIcon = social.icon.startsWith('/') || social.icon.endsWith('.svg');

          return (
            <a
              key={social.platform}
              href={social.url}
              title={social.label}
              aria-label={social.label}
              {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className={`${social.dockBgColor ?? 'bg-stone-800'} dock-tile flex h-11 w-11 items-center justify-center rounded-xl text-white/95 select-none`}
            >
              {isSvgIcon ? (
                <Image
                  src={social.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="h-6 w-6 object-contain brightness-0 invert opacity-90"
                  aria-hidden="true"
                />
              ) : (
                <span aria-hidden="true" className="text-sm font-semibold">
                  {social.platform.charAt(0)}
                </span>
              )}
            </a>
          );
        })}
        <span className="mx-1 h-8 w-px bg-line/10" aria-hidden="true" />
        <a
          href={`mailto:${email}`}
          title={emailLabel}
          aria-label={emailLabel}
          className="dock-tile flex h-11 w-11 items-center justify-center rounded-xl bg-chip text-ink-soft select-none hover:bg-chip-hover"
        >
          <Mail className="h-6 w-6" />
        </a>
      </div>
    </nav>
  );
}

