import { portfolioData } from '@/data/portfolioData';
import { PillBadge } from '@/components/ui/PillBadge';
import { ProjectCard } from '@/components/ui/ProjectCard';

export function WorkSection() {
  const { projects, sections } = portfolioData;
  const heading = sections.work;

  return (
    <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-4xl scroll-mt-24 px-4 pb-16 pt-20">
      <header className="mb-12 text-center">
        {heading.eyebrow && (
          <PillBadge variant="mono-section" className="mb-2">
            {heading.eyebrow}
          </PillBadge>
        )}
        <h2 id="work-heading" className="font-serif-title text-4xl font-normal text-ink sm:text-5xl">
          {heading.title} {heading.titleHighlight && <span className="font-serif italic">{heading.titleHighlight}</span>}
        </h2>
        {heading.caption && <p className="mt-2 font-mono text-xs text-ink-faint">{heading.caption}</p>}
      </header>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} priority={index < 2} />
        ))}
      </div>
    </section>
  );
}
