'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { ExperienceItem as ExperienceItemData } from '@/types/portfolio';
import { getInitials } from '@/lib/experience';
import { cn } from '@/lib/cn';

export type TimelineSide = 'left' | 'right';

export interface ExperienceItemProps {
  item: ExperienceItemData;
  /** Which side of the spine the card sits on (desktop). The period renders on the opposite side. */
  side: TimelineSide;
  /** Label for the current-role marker. */
  currentLabel?: string;
}

/* ------------------------------------------------------------------ */
/* Circular logo with a monogram fallback for missing/broken images.  */
/* ------------------------------------------------------------------ */
function Logo({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(!src);
  const imgRef = useRef<HTMLImageElement>(null);

  // Catch errors that fired before hydration attached `onError`.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-paper shadow-[0_2px_8px_-2px_rgb(0_0_0/0.12)] ring-1 ring-line/10 transition-transform duration-500 ease-out group-hover/card:scale-[1.06] sm:h-14 sm:w-14">
      {failed ? (
        <span
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-terracotta to-[#A9471F] text-xs font-semibold tracking-wider text-white"
          aria-hidden="true"
        >
          {getInitials(name)}
        </span>
      ) : (
        <Image
          ref={imgRef}
          src={src}
          alt={`${name} logo`}
          width={56}
          height={56}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

/**
 * A single node on the experience timeline: spine node + horizontal connector + card,
 * with the period rendered on the opposite side of the spine.
 *
 * Mobile (< md): spine sits on the left, the period stacks above the card.
 */
export function ExperienceItem({ item, side, currentLabel = 'Now' }: ExperienceItemProps) {
  const isRight = side === 'right';
  const [headline, ...details] = item.position.split('\n').map((line) => line.trim()).filter(Boolean);

  return (
    <li data-reveal data-side={side} className="tl-entry group relative pl-12 md:grid md:grid-cols-2 md:items-center md:pl-0">
      {/* ---- Spine node ------------------------------------------------ */}
      <span
        className="absolute left-5 top-[3px] z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
        aria-hidden="true"
      >
        <span className="tl-anim-node relative flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-brand-terracotta bg-brand-bg shadow-[0_0_0_4px_rgb(var(--brand-bg))] transition-shadow duration-300 group-hover:shadow-[0_0_0_4px_rgb(var(--brand-bg)),0_0_0_9px_rgb(200_90_50/0.18),0_0_18px_2px_rgb(200_90_50/0.35)]">
          <span className="h-1.5 w-1.5 scale-0 rounded-full bg-brand-terracotta transition-transform duration-300 group-hover:scale-100" />
          {item.isCurrent && (
            <span className="absolute inset-[-2px] animate-ping rounded-full bg-brand-terracotta/40" />
          )}
        </span>
      </span>

      {/* Mobile-only tick linking the node to the period */}
      <span className="tl-anim-connector absolute left-[1.6rem] top-[9px] h-px w-4 bg-brand-terracotta/50 md:hidden" aria-hidden="true" />

      {/* ---- Period (opposite side of the card) ----------------------- */}
      <div
        className={cn(
          'tl-anim-date mb-2.5 flex items-center gap-2 md:row-start-1 md:mb-0',
          isRight ? 'md:col-start-1 md:justify-end md:pr-10 lg:pr-12' : 'md:col-start-2 md:justify-start md:pl-10 lg:pl-12',
        )}
      >
        <time className="font-mono text-micro uppercase tracking-[0.12em] text-ink-muted transition-colors duration-300 group-hover:text-brand-terracotta">
          {item.period}
        </time>
        {item.isCurrent && (
          <span
            className={cn(
              'rounded-full border border-brand-terracotta/25 bg-brand-terracotta/10 px-2 py-0.5 font-mono text-2xs uppercase tracking-wider text-brand-terracotta',
              isRight && 'md:-order-1',
            )}
          >
            {currentLabel}
          </span>
        )}
      </div>

      {/* ---- Connector + card ----------------------------------------- */}
      <div className={cn('flex items-center md:row-start-1', isRight ? 'md:col-start-2' : 'md:col-start-1 md:flex-row-reverse')}>
        <span
          className={cn(
            'tl-anim-connector hidden h-[1.5px] w-8 shrink-0 from-brand-terracotta/80 to-brand-terracotta/20 opacity-70 transition-opacity duration-300 group-hover:opacity-100 md:block lg:w-14',
            isRight ? 'bg-gradient-to-r' : 'bg-gradient-to-l',
          )}
          aria-hidden="true"
        />

        <div className="tl-anim-card min-w-0 flex-1 md:max-w-md">
          <article
            className={cn(
              'group/card relative flex items-center gap-4 overflow-hidden rounded-2xl border border-line/[0.07] bg-paper/70 p-4 text-left shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)] backdrop-blur-md backdrop-saturate-150 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-terracotta/30 hover:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_18px_40px_-16px_rgb(200_90_50/0.35)] sm:p-5',
              isRight && 'md:flex-row-reverse md:text-right',
            )}
          >
            {/* Glass sheen */}
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/15"
              aria-hidden="true"
            />
            {/* Accent edge facing the spine */}
            <span
              className={cn(
                'pointer-events-none absolute inset-y-4 hidden w-[2px] rounded-full bg-brand-terracotta/0 transition-colors duration-300 group-hover/card:bg-brand-terracotta/70 md:block',
                isRight ? 'left-0' : 'right-0',
              )}
              aria-hidden="true"
            />

            <Logo src={item.logo} name={item.company} />

            <div className="min-w-0 flex-1">
              <h4 className="text-[15px] font-semibold leading-snug tracking-tight text-ink sm:text-base">{item.company}</h4>
              {headline && (
                <p className="mt-0.5 font-serif text-[15px] italic leading-snug text-ink-soft">{headline}</p>
              )}
              {details.length > 0 && (
                <ul className="mt-1.5 space-y-0.5 text-xs leading-relaxed text-ink-muted">
                  {details.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
              {item.description && <p className="mt-2 text-xs leading-relaxed text-ink-muted">{item.description}</p>}
            </div>
          </article>
        </div>
      </div>
    </li>
  );
}
