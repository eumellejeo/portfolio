import Image from 'next/image';
import type { ProjectItem } from '@/types/portfolio';

export interface ProjectCardProps {
  project: ProjectItem;
  /** Load eagerly for above-the-fold cards. */
  priority?: boolean;
}

/**
 * Project tile. Uses a single merged overlay layer (tint + emoji disc) instead
 * of the two stacked absolute divs from the export. Only rendered as a link
 * when the project actually has a destination — no fake `cursor-pointer`.
 */
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const discipline = project.discipline.charAt(0) + project.discipline.slice(1).toLowerCase();

  const media = (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line/5 bg-stone-900 shadow-md">
      <Image
        src={project.thumbnailUrl}
        alt={project.thumbnailAlt}
        fill
        priority={priority}
        sizes="(min-width: 896px) 432px, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-stone-900/20 transition-colors duration-300 group-hover:bg-transparent">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {project.emoji}
        </span>
      </div>
    </div>
  );

  const caption = (
    <div className="mt-4 text-center">
      <h3 className="font-serif-title text-xl text-ink">{project.title}</h3>
      <p className="mt-0.5 font-mono text-micro uppercase tracking-wider text-ink-faint">
        <span className="sr-only">{discipline}, </span>
        <span aria-hidden="true">
          {project.discipline} • {project.year}
        </span>
        <span className="sr-only">{project.year}</span>
      </p>
    </div>
  );

  return (
    <article id={`project-${project.slug}`} className="group scroll-mt-24">
      {project.externalUrl ? (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-terracotta"
        >
          {media}
          {caption}
        </a>
      ) : (
        <>
          {media}
          {caption}
        </>
      )}
    </article>
  );
}
