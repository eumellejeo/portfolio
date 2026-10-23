import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { HeroDock } from '@/components/ui/HeroDock';
import { PillBadge } from '@/components/ui/PillBadge';

/**
 * Full-bleed hero. The boxed card from the Stitch export is gone: the card
 * colour + dot grid now span the full viewport width, content stays centred,
 * and a smooth gradient slowly transitions the background from the Hero color
 * (#ECEAE4) to the About section color (#F5F4F0) instead of a separating line.
 */
export function HeroSection() {
  const { profile, sections, socials } = portfolioData;
  const { headline, location } = profile;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full scroll-mt-24 bg-gradient-to-b from-brand-card to-brand-bg"
    >
      {/* Dot grid pattern with soft radial fade-out from center to edges */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern mask-radial-fade" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 pt-28 text-center sm:pb-20 sm:pt-32">
        {/* Avatar — flattened to a single wrapper */}
        <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full shadow-md sm:h-40 sm:w-40">
          <Image
            src={profile.avatar.imageUrl}
            alt={profile.avatar.altText}
            width={160}
            height={160}
            priority
            className="h-full w-full object-cover"
          />
        </div>

        <PillBadge variant="pulse" dotColor="orange" className="mb-8 bg-paper/80 shadow-xs">
          <span className="font-medium text-ink">{profile.name}</span>
          <span className="text-ink-faint/60" aria-hidden="true">
            |
          </span>
          <span className="flex items-center gap-1 text-ink-muted">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {location.city}, {location.countryCode}
          </span>
        </PillBadge>

        <h1
          id="hero-heading"
          className="font-serif-title mb-6 max-w-2xl text-4xl font-normal leading-[1.08] tracking-tight text-ink sm:text-6xl md:text-[4.2rem]"
        >
          {'Computer engineer,'}
          <br className="hidden sm:inline" /> {'from '}
          <span className="font-serif italic text-brand-terracotta">{'idea '}</span> {'to '}
          <span className="font-serif italic text-brand-terracotta">{headline.highlight}</span>
        </h1>

        <p className="mb-10 text-xs font-normal tracking-wide text-ink-muted sm:text-sm">{profile.subtitle}</p>

        <HeroDock
          label={'CONTACT ME'}
          socials={socials}
          email={profile.contact.email}
          emailLabel={profile.contact.email}
        />
      </div>
    </section>
  );
}
