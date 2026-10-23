'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in the middle band of the viewport.
 * Uses IntersectionObserver with a narrow centre "trip wire".
 */
export function useScrollSpy<T extends string>(ids: readonly T[]): T | null {
  const [active, setActive] = useState<T | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id as T);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // `key` is a stable serialisation of `ids`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
