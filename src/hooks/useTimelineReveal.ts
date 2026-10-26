'use client';

import { useEffect, useRef } from 'react';

/**
 * Drives the experience timeline motion without re-rendering React:
 *  - Adds `.is-visible` to every `[data-reveal]` descendant once it enters the viewport.
 *  - Writes a `--tl-progress` (0 → 1) CSS variable used to "draw" the spine as you scroll.
 *
 * Hidden initial states only apply once `data-tl-animate="true"` is set on mount,
 * so content stays visible without JS and for users preferring reduced motion.
 */
export function useTimelineReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.style.setProperty('--tl-progress', '1');
      return;
    }

    root.dataset.tlAnimate = 'true';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => observer.observe(el));

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const trigger = window.innerHeight * 0.65;
      const progress = Math.min(1, Math.max(0, (trigger - rect.top) / Math.max(rect.height, 1)));
      root.style.setProperty('--tl-progress', progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
