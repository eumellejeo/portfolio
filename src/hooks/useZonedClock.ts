'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe wall clock for a given IANA time zone.
 * Returns `null` until mounted so server and first client render match
 * (prevents the hydration mismatch the original inline script would cause).
 */
export function useZonedClock(timeZone: string, intervalMs = 30_000): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));

    tick();
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [timeZone, intervalMs]);

  return time;
}
