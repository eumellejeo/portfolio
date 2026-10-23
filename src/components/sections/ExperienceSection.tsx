import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { ExperienceItem } from '@/components/ui/ExperienceItem';
import { PillBadge } from '@/components/ui/PillBadge';

export function ExperienceSection() {
  const { experience, socials, sections } = portfolioData;
  const heading = sections.experience;
  const linkedIn = socials.find((s) => s.platform === 'LinkedIn');

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-2xl scroll-mt-24 px-4 pb-24 pt-16 text-center"
    >
      {heading.eyebrow && (
        <PillBadge variant="mono-section" className="mb-2">
          {heading.eyebrow}
        </PillBadge>
      )}
      <h2 id="experience-heading" className="font-serif-title mb-10 text-3xl font-normal text-ink sm:text-4xl">
        {heading.title} {heading.titleHighlight && <span className="font-serif italic">{heading.titleHighlight}</span>}
      </h2>

      <ol className="mb-8 divide-y divide-line/[0.05] overflow-hidden rounded-3xl border border-line/[0.06] bg-paper/70 text-left shadow-xs">
        {experience.map((item) => (
          <ExperienceItem key={item.id} item={item} />
        ))}
      </ol>

      {linkedIn && (
        <a
          href={linkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-paper px-4 py-2 text-xs font-medium text-ink-soft shadow-2xs transition-all hover:border-line/30 hover:text-ink"
        >
          {heading.resumeCtaLabel}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
    </section>
  );
}
