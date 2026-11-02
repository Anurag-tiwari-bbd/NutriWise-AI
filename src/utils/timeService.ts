/**
 * timeService.ts
 * Captures accurate network/online time with seamless offline local device fallback.
 */

export interface TimestampInfo {
  timestamp: string;
  dayOfWeek: string;
  formattedDate: string;
  timeSource: 'online' | 'device';
}

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

/**
 * Retrieves the current timestamp.
 * When online, verifies time via network; when offline (locally without internet),
 * seamlessly falls back to device clock.
 */
export async function getAccurateTimestamp(): Promise<TimestampInfo> {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  let date = new Date();
  let timeSource: 'online' | 'device' = 'device';

  if (isOnline) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 800);

      const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata', {
        signal: controller.signal,
        cache: 'no-store'
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.datetime) {
          date = new Date(data.datetime);
          timeSource = 'online';
        }
      }
    } catch {
      date = new Date();
      timeSource = 'device';
    }
  }

  const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
  const formattedDate = `${dayOfWeek}, ${date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })} • ${date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;

  return {
    timestamp: date.toISOString(),
    dayOfWeek,
    formattedDate,
    timeSource
  };
}

/**
 * Synchronous fallback helper for immediate formatting
 */
export function formatDeviceTimestamp(isoString?: string): TimestampInfo {
  const date = isoString ? new Date(isoString) : new Date();
  const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
  const formattedDate = `${dayOfWeek}, ${date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })} • ${date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;

  return {
    timestamp: date.toISOString(),
    dayOfWeek,
    formattedDate,
    timeSource: 'device'
  };
}
