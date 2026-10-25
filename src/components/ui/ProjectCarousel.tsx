'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectItem } from '@/types/portfolio';
import { ProjectCard } from '@/components/ui/ProjectCard';

export interface ProjectCarouselProps {
  projects: ProjectItem[];
  /** Accessible label for the carousel region. */
  label?: string;
}

/** Minimum horizontal travel (px) for a pointer drag to count as a swipe. */
const SWIPE_THRESHOLD = 50;

/**
 * Signed shortest circular distance from the active index, so the carousel
 * always lays out cards as (… -2, -1, 0, +1, +2 …) around the focused card
 * regardless of where we are in the list — this is what makes it infinite.
 */
function circularOffset(index: number, active: number, total: number): number {
  let d = (index - active + total) % total;
  if (d > total / 2) d -= total;
  return d;
}

/** Visual layer for a given offset. Positions use the `--spread` CSS var. */
function layerStyle(offset: number): CSSProperties {
  const abs = Math.abs(offset);
  const dir = Math.sign(offset);

  if (abs === 0) {
    return {
      transform: 'translate3d(0,0,0) scale(1)',
      filter: 'grayscale(0) brightness(1)',
      opacity: 1,
      zIndex: 30,
    };
  }

  if (abs === 1) {
    return {
      transform: `translate3d(calc(var(--spread) * ${dir}), 0, 0) scale(0.82)`,
      filter: 'grayscale(1) brightness(0.75)',
      opacity: 0.7,
      zIndex: 20,
    };
  }

  // Off-stage cards wait just behind the side cards, ready to slide in.
  return {
    transform: `translate3d(calc(var(--spread) * ${dir * 1.5}), 0, 0) scale(0.66)`,
    filter: 'grayscale(1) brightness(0.6)',
    opacity: 0,
    zIndex: 10,
  };
}

/**
 * Infinite 3-card layered (coverflow) carousel.
 * - Arrows / ←→ keys / swipe / clicking a side card all navigate.
 * - Index math wraps in both directions: (i ± 1 + n) % n.
 */
export function ProjectCarousel({ projects, label = 'Selected projects' }: ProjectCarouselProps) {
  const total = projects.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + total) % total);
  }, [total]);

  // Guard against the data shrinking (e.g. HMR while editing portfolioData).
  useEffect(() => {
    if (activeIndex >= total && total > 0) setActiveIndex(0);
  }, [activeIndex, total]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') return; // swipe is for touch / pen
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const dx = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (dx <= -SWIPE_THRESHOLD) goNext();
    else if (dx >= SWIPE_THRESHOLD) goPrev();
  };

  if (total === 0) return null;

  const hasNavigation = total > 1;
  const activeProject = projects[activeIndex] ?? projects[0];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative rounded-hero focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand-terracotta"
    >
      {/* Stage wrapper: viewport + arrows share a box so arrows stay centred on the card */}
      <div className="relative">
      {/*
        Viewport: clips side cards with a soft horizontal edge fade. Bottom padding is
        deliberately generous (> shadow offset + blur) so the active card's shadow decays
        fully before the clip edge instead of being cut off.
      */}
      <div className="relative overflow-hidden pb-28 pt-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {/* Ambient glow behind the active card */}
        <div
          className="pointer-events-none absolute left-1/2 top-[calc(50%-2rem)] h-2/3 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-terracotta/10 blur-3xl"
          aria-hidden="true"
        />

        {/* Stage: sized to the center card; others are absolutely layered on top */}
        <div
          className="relative mx-auto aspect-[4/5] w-[70%] max-w-[500px] touch-pan-y select-none [--spread:66%] sm:aspect-[4/3] sm:w-[56%] sm:[--spread:62%]"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => (pointerStartX.current = null)}
        >
          {projects.map((project, index) => {
            const offset = circularOffset(index, activeIndex, total);
            const isActive = offset === 0;
            const isSide = Math.abs(offset) === 1;

            return (
              <div
                key={`${project.title}-${index}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${total}: ${project.title}`}
                aria-hidden={!isActive}
                inert={!isActive}
                className="absolute inset-0 origin-center transition-[transform,filter,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none"
                style={{
                  ...layerStyle(offset),
                  pointerEvents: isActive || isSide ? 'auto' : 'none',
                }}
              >
                <ProjectCard
                  project={project}
                  isActive={isActive}
                  priority={index === 0 || index === 1 || index === total - 1}
                />

                {/* Side cards are click-to-focus */}
                {isSide && (
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={offset > 0 ? goNext : goPrev}
                    className="absolute inset-0 cursor-pointer rounded-3xl transition-colors duration-300 hover:bg-white/5"
                    aria-label={`Show ${project.title}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Flanking arrows */}
      {hasNavigation && (
        <>
          <CarouselArrow direction="prev" onClick={goPrev} />
          <CarouselArrow direction="next" onClick={goNext} />
        </>
      )}
      </div>

      {/* Footer: counter + progress dots (pulled up into the shadow runway) */}
      {hasNavigation && (
        <div className="relative z-10 -mt-16 flex items-center justify-center gap-4">
          <span className="font-mono text-micro tabular-nums text-ink-faint">
            <span className="text-ink">{String(activeIndex + 1).padStart(2, '0')}</span>
            {' / '}
            {String(total).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1.5">
            {projects.map((project, index) => {
              const isCurrent = index === activeIndex;
              return (
                <button
                  key={`dot-${project.title}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to ${project.title}`}
                  aria-current={isCurrent}
                  className={[
                    'h-1.5 rounded-full transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terracotta',
                    isCurrent ? 'w-6 bg-brand-terracotta' : 'w-1.5 bg-ink-faint/40 hover:bg-ink-faint',
                  ].join(' ')}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Screen-reader announcement of the focused project */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {`Project ${activeIndex + 1} of ${total}: ${activeProject.title}`}
      </p>
    </div>
  );
}

interface CarouselArrowProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

function CarouselArrow({ direction, onClick }: CarouselArrowProps) {
  const isPrev = direction === 'prev';
  const Icon = isPrev ? ChevronLeft : ChevronRight;
  const label = isPrev ? 'Previous project' : 'Next project';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={[
        'group/arrow absolute top-[calc(50%-2rem)] z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full sm:h-12 sm:w-12',
        'border border-line/10 bg-paper/70 text-ink shadow-xs backdrop-blur-md',
        'transition-all duration-300 ease-out',
        'hover:scale-105 hover:border-transparent hover:bg-contrast hover:text-contrast-fg hover:shadow-lg active:scale-95',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terracotta',
        isPrev ? 'left-0 sm:left-2' : 'right-0 sm:right-2',
      ].join(' ')}
    >
      <Icon
        className={[
          'h-5 w-5 transition-transform duration-300 ease-out',
          isPrev ? 'group-hover/arrow:-translate-x-0.5' : 'group-hover/arrow:translate-x-0.5',
        ].join(' ')}
        strokeWidth={1.75}
      />
    </button>
  );
}
