import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '@/types/portfolio';

export interface ProjectCardProps {
  project: ProjectItem;
  /** Whether this card is the focused (center) slide of the carousel. */
  isActive: boolean;
  /** Load eagerly for the initially visible cards. */
  priority?: boolean;
}

/**
 * Presentational carousel card: full-bleed thumbnail, bottom gradient scrim and
 * title/description pinned bottom-left. Layer positioning (scale / offset /
 * grayscale) is owned by `ProjectCarousel`; this component only renders content.
 * Rendered as a link only when the project has a destination AND is active.
 */
export function ProjectCard({ project, isActive, priority = false }: ProjectCardProps) {
  const isLinked = Boolean(project.externalUrl) && isActive;

  const body = (
    <div
      className={[
        'relative isolate aspect-[4/5] w-full overflow-hidden rounded-3xl bg-brand-card sm:aspect-[4/3]',
        'transition-[box-shadow,transform] duration-500 ease-out',
        isActive
          ? 'shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45),0_12px_24px_-12px_rgb(0_0_0/0.25)] group-hover:-translate-y-1 group-hover:shadow-[0_40px_70px_-20px_rgb(0_0_0/0.5),0_16px_28px_-12px_rgb(0_0_0/0.3)]'
          : 'shadow-md',
      ].join(' ')}
    >
      <Image
        src={project.thumbnailUrl}
        alt={project.thumbnailAlt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 540px, (min-width: 640px) 58vw, 72vw"
        className={[
          'object-cover transition-transform duration-700 ease-out',
          isActive ? 'group-hover:scale-[1.04]' : '',
        ].join(' ')}
      />

      {/* Legibility scrim */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
        aria-hidden="true"
      />

      {/* Year chip (terracotta glass) */}
      <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-gradient-to-b from-brand-terracotta/70 to-brand-terracotta/45 px-2.5 py-1 font-mono text-2xs uppercase tracking-wider text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_4px_14px_-4px_rgb(200_90_50/0.65)] backdrop-blur-md backdrop-saturate-150 sm:left-5 sm:top-5">
        {project.year}
      </span>

      {/* External link affordance */}
      {project.externalUrl && (
        <span
          className={[
            'absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md sm:right-5 sm:top-5',
            'transition-all duration-300 ease-out',
            isActive ? 'opacity-80 group-hover:rotate-0 group-hover:bg-brand-terracotta group-hover:opacity-100' : 'opacity-0',
            '-rotate-12',
          ].join(' ')}
          aria-hidden="true"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-7">
        <h3 className="font-serif-title text-2xl leading-tight text-white sm:text-3xl">{project.title}</h3>
        {project.description && (
          <p className="mt-1.5 line-clamp-2 max-w-md text-sm leading-relaxed text-white/75">{project.description}</p>
        )}
        <span
          className={[
            'mt-4 block h-px origin-left bg-gradient-to-r from-brand-terracotta to-transparent transition-transform duration-700 ease-out',
            isActive ? 'scale-x-100' : 'scale-x-0',
          ].join(' ')}
          aria-hidden="true"
        />
      </div>
    </div>
  );

  if (isLinked) {
    return (
      <a
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} (opens in a new tab)`}
        className="group block rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-terracotta"
      >
        {body}
      </a>
    );
  }

  return <div className="group">{body}</div>;
}
