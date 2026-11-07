"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { snapshotRequestCtaLabel } from "@/lib/site";
import {
  STICKY_SNAPSHOT_DISMISS_KEY,
  STICKY_SNAPSHOT_DISMISS_MS,
  funnelCtaIsInView,
  readStickySnapshotDismissed,
} from "@/lib/sticky-snapshot";

const label = snapshotRequestCtaLabel;

function rememberDismissal() {
  try {
    window.localStorage.setItem(
      STICKY_SNAPSHOT_DISMISS_KEY,
      String(Date.now() + STICKY_SNAPSHOT_DISMISS_MS),
    );
  } catch {
    // Private mode still closes the bar for this view.
  }
  document.documentElement.setAttribute("data-sticky-snapshot", "off");
}

/**
 * Short bar at the bottom of guide, blog, and generator pages.
 * A matching spacer keeps the footer above the bar until it is dismissed.
 * The bar does not animate. prefers-reduced-motion turns off any transition.
 */
export function TradeGuideStickyCta({ href }: { href: string }) {
  const [open, setOpen] = useState(true);
  const [yieldToPageCta, setYieldToPageCta] = useState(false);
  const asideRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (readStickySnapshotDismissed()) {
      document.documentElement.setAttribute("data-sticky-snapshot", "off");
      return;
    }

    function update() {
      const aside = asideRef.current;
      const nodes = document.querySelectorAll("[data-funnel-cta]");
      let visible = false;
      for (const node of nodes) {
        if (!(node instanceof HTMLElement)) continue;
        if (aside?.contains(node)) continue;
        if (funnelCtaIsInView(node.getBoundingClientRect(), window.innerHeight)) {
          visible = true;
          break;
        }
      }
      setYieldToPageCta(visible);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="sticky-snapshot-offer no-print motion-reduce:animate-none motion-reduce:transition-none">
      <div
        aria-hidden="true"
        className="h-[calc(10rem+env(safe-area-inset-bottom,0px))] sm:h-[calc(7.5rem+env(safe-area-inset-bottom,0px))]"
      />
      <aside
        ref={asideRef}
        inert={yieldToPageCta ? true : undefined}
        aria-hidden={yieldToPageCta || undefined}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-forest-deep bg-forest pb-[env(safe-area-inset-bottom,0px)] text-cream motion-reduce:animate-none motion-reduce:transition-none${yieldToPageCta ? " invisible pointer-events-none" : ""}`}
        aria-label="Free AI Answer Snapshot"
      >
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2">
          <p className="flex min-w-0 flex-1 flex-col text-sm leading-5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
            <Link
              href={href}
              aria-label={label}
              className="inline-flex min-h-11 items-center font-medium text-cream underline decoration-cream underline-offset-2 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              {label}
            </Link>
            <Link
              href="/sample-snapshot"
              className="inline-flex min-h-11 items-center text-cream underline decoration-cream underline-offset-2 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              See an example snapshot
            </Link>
          </p>
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-cream hover:bg-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            aria-label="Dismiss free snapshot offer"
            onClick={() => {
              rememberDismissal();
              setOpen(false);
            }}
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}
