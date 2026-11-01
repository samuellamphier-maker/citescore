/** localStorage key. Value is the epoch ms when the dismissal expires. */
export const STICKY_SNAPSHOT_DISMISS_KEY = "citescore-sticky-snapshot-dismissed";

/** How long the close button hides the bar in this browser. */
export const STICKY_SNAPSHOT_DISMISS_DAYS = 14;

export const STICKY_SNAPSHOT_DISMISS_MS =
  STICKY_SNAPSHOT_DISMISS_DAYS * 24 * 60 * 60 * 1000;

export function stickySnapshotDismissed(raw: string | null, now = Date.now()): boolean {
  if (!raw) return false;
  const until = Number(raw);
  return Number.isFinite(until) && until > now;
}

/** True when this browser still has an unexpired dismissal. */
export function readStickySnapshotDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return stickySnapshotDismissed(window.localStorage.getItem(STICKY_SNAPSHOT_DISMISS_KEY));
  } catch {
    return false;
  }
}

/**
 * Runs in <head> before first paint. Sets data-sticky-snapshot="off" on
 * <html> when the dismissal is still active, so the bar and its spacer
 * stay display:none and the page does not shift.
 */
export function stickySnapshotHeadScript(): string {
  return `(function(){try{var until=Number(localStorage.getItem(${JSON.stringify(STICKY_SNAPSHOT_DISMISS_KEY)}));if(until>Date.now())document.documentElement.setAttribute("data-sticky-snapshot","off")}catch(e){}})();`;
}
