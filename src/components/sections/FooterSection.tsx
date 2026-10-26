import { ArrowUpRight, Mail } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { PillBadge } from '@/components/ui/PillBadge';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { SocialButton } from '@/components/ui/SocialButton';

/**
 * CTA card + footer credits. Removed vs. export: "HOW TO MAKE THE AVATAR"
 * link and the fixed "Made in Framer" badge. Watermark is aria-hidden.
 */
export function FooterSection() {
  const { profile, socials, sections } = portfolioData;
  const { contact, location, bookingStatus } = profile;
  const cta = sections.contact;

  return (
    <footer id="contact" aria-labelledby="contact-heading" className="relative mx-auto max-w-4xl scroll-mt-24 px-4 pb-8">
      <div className="relative overflow-hidden rounded-hero border border-line/[0.07] bg-paper/70 px-6 pb-16 pt-20 text-center shadow-xs sm:px-12">
        {bookingStatus.isAvailable && (
          <PillBadge variant="status-dot" dotColor="emerald" className="mb-8 bg-chip py-1.5">
            <span className="font-medium text-ink">{bookingStatus.availableFromText}</span>
          </PillBadge>
        )}

        <h2 id="contact-heading" className="font-serif-title mb-8 text-4xl font-normal tracking-tight text-ink sm:text-6xl">
          {cta.title}{' '}
          {cta.titleHighlight && <span className="font-serif italic text-brand-terracotta">{cta.titleHighlight}</span>}
        </h2>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-contrast px-6 py-3.5 text-xs font-medium text-contrast-fg shadow-md transition-all hover:-translate-y-0.5 hover:opacity-90 sm:text-sm"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {contact.email}
          </a>
        </div>

        <ul className="mb-14 flex items-center justify-center gap-2.5">
          {socials.map((link) => (
            <li key={link.platform}>
              <SocialButton link={link} />
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line/[0.05] pt-6 font-mono text-2xs uppercase tracking-wider text-ink-faint sm:flex-row">
          <span>
            © {profile.copyrightYear} {profile.name}
          </span>
          <div className="flex items-center gap-2">
            <span>
              {location.city}, {location.countryCode} · {location.gmtOffset}
            </span>
            <ScrollToTopButton />
          </div>
        </div>
      </div>

      {/* Decorative watermark — hidden from assistive tech */}
      <div className="pointer-events-none mt-2 select-none overflow-hidden text-center opacity-[0.07]" aria-hidden="true">
        <span className="font-serif-title block whitespace-nowrap text-[7rem] font-bold leading-none tracking-tight text-ink sm:text-[11rem]">
          {profile.name}
        </span>
      </div>
    </footer>
  );
}
