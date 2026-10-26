import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { ExperienceTimeline } from '@/components/ui/ExperienceTimeline';
import { PillBadge } from '@/components/ui/PillBadge';

export function ExperienceSection() {
  const { experience, socials, sections } = portfolioData;
  const heading = sections.experience;
  const linkedIn = socials.find((s) => s.platform === 'LinkedIn');

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-5xl scroll-mt-24 px-4 pb-24 pt-16 text-center"
    >
      {heading.eyebrow && (
        <PillBadge variant="mono-section" className="mb-2">
          {heading.eyebrow}
        </PillBadge>
      )}
      <h2 id="experience-heading" className="font-serif-title mb-10 text-3xl font-normal text-ink sm:mb-14 sm:text-4xl">
        {heading.title} {heading.titleHighlight && <span className="font-serif italic">{heading.titleHighlight}</span>}
      </h2>

      <div className="mb-8">
        <ExperienceTimeline items={experience} />
      </div>
    </section>
  );
}
