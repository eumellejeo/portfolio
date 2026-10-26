'use client';

import type { CSSProperties } from 'react';
import type { ExperienceItem as ExperienceItemData } from '@/types/portfolio';
import { ExperienceItem, type TimelineSide } from '@/components/ui/ExperienceItem';
import { experienceKey, groupExperience, type ExperienceGroup } from '@/lib/experience';
import { useTimelineReveal } from '@/hooks/useTimelineReveal';

export interface ExperienceTimelineProps {
  items: ExperienceItemData[];
}

/* ------------------------------------------------------------------ */
/* Hexagonal category badge anchored on the spine.                    */
/* ------------------------------------------------------------------ */
function CategoryHeader({ group }: { group: ExperienceGroup }) {
  const headingId = `experience-${group.id}-heading`;

  return (
    <div data-reveal className="tl-header relative flex h-24 items-center md:h-28">
      <div className="absolute left-5 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
        <div className="tl-anim-hex group/hex relative drop-shadow-[0_10px_18px_rgb(200_90_50/0.35)]">
          {/* Soft halo */}
          <span className="tl-hex absolute -inset-2 bg-brand-terracotta/10 transition-transform duration-500 group-hover/hex:scale-110" aria-hidden="true" />
          {/* Outer ring */}
          <div className="tl-hex relative grid h-[58px] w-[50px] place-items-center bg-brand-terracotta/30 md:h-[70px] md:w-[61px]">
            {/* Core */}
            <div className="tl-hex grid h-[52px] w-[45px] place-items-center bg-[linear-gradient(160deg,#DD7A52_0%,#C85A32_55%,#A9471F_100%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] md:h-[63px] md:w-[55px]">
              <span
                className="tl-icon h-5 w-5 bg-white transition-transform duration-500 group-hover/hex:scale-110 md:h-6 md:w-6"
                style={{ '--tl-icon': `url(${group.icon})` } as CSSProperties}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-12 top-1/2 -translate-y-1/2 md:left-[calc(50%+3rem)]">
        <div className="tl-anim-label flex items-center gap-2.5">
          <h3 id={headingId} className="font-mono text-2xs font-medium uppercase tracking-[0.28em] text-ink-soft">
            {group.label}
          </h3>
          <span className="h-px w-6 bg-line/15" aria-hidden="true" />
          <span className="font-mono text-2xs tabular-nums text-ink-faint">{String(group.items.length).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Alternating vertical timeline for work & education.
 * Each category restarts the alternation with its newest entry on the right.
 */
export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const ref = useTimelineReveal<HTMLDivElement>();
  const groups = groupExperience(items);

  return (
    <div ref={ref} className="tl-root relative text-left">
      {/* ---- Spine: faint base + scroll-drawn accent ------------------ */}
      <div
        className="tl-spine pointer-events-none absolute bottom-0 left-5 top-12 w-px -translate-x-1/2 bg-line/10 md:left-1/2 md:top-14"
        aria-hidden="true"
      >
        <span className="tl-spine-progress absolute inset-0 bg-gradient-to-b from-brand-terracotta via-brand-terracotta to-brand-terracotta/40" />
      </div>

      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`experience-${group.id}-heading`} className="relative pb-10 md:pb-14">
          <CategoryHeader group={group} />
          <ol className="mt-4 space-y-8 md:mt-6 md:space-y-10">
            {group.items.map((item, index) => {
              const side: TimelineSide = index % 2 === 0 ? 'right' : 'left';
              return <ExperienceItem key={experienceKey(item)} item={item} side={side} />;
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
