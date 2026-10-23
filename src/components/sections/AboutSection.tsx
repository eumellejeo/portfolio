import Image from 'next/image';
import { portfolioData } from '@/data/portfolioData';
import { PillBadge } from '@/components/ui/PillBadge';
import { StrengthCard } from '@/components/ui/StrengthCard';
import { TechStackDiagram } from '@/components/ui/TechStackDiagram';

export function AboutSection() {
  const { profile, strengths, techStack, sections } = portfolioData;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-5xl scroll-mt-24 px-4 pb-16 pt-24 sm:pt-28"
    >
      {/* Section Eyebrow at the top-most position */}
      <div className="mb-2 flex justify-center sm:mb-2">
        <PillBadge variant="mono-section">
          {sections.about.eyebrow}
        </PillBadge>
      </div>

      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 lg:gap-12">
        {/* Left Column: Portrait Image (borderless and static) */}
        <div className="flex justify-center md:col-span-5">
          <div className="relative flex w-full max-w-sm items-end justify-center sm:max-w-md md:max-w-none">
            <Image
              src="/images/about-image.png"
              alt={profile.name}
              width={1080}
              height={1920}
              priority
              className="h-auto max-h-[520px] w-full object-contain object-bottom"
            />
          </div>
        </div>

        {/* Right Column: About Header & Strength Cards */}
        <div className="flex flex-col items-center text-center md:col-span-7 md:items-start md:text-left">
          <h2
            id="about-heading"
            className="font-serif-title mb-8 text-3xl font-normal leading-[1.2] text-ink sm:text-4xl lg:text-[2.6rem]"
          >
            {profile.manifesto} <span className="font-serif italic text-ink-soft">{profile.manifestoHighlight}</span>
          </h2>

          <div className="grid w-full grid-cols-1 gap-3.5 sm:grid-cols-3">
            {strengths.map((strength) => (
              <StrengthCard key={strength.id} strength={strength} />
            ))}
          </div>
        </div>
      </div>

      {/* (03) — TECH STACK Diagram */}
      <div className="mt-16 flex flex-col items-center border-t border-line/[0.06] pt-12 text-center sm:mt-20">
        <h3 className="mb-10 font-mono text-xs uppercase tracking-widest text-ink-faint sm:mb-12">
          {'(03) — TECH STACK'}
        </h3>
        <TechStackDiagram categories={techStack} />
      </div>
    </section>
  );
}

