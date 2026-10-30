"use client";

import { useState } from "react";
import Link from "next/link";

const label = "Free AI Answer Snapshot: see who ChatGPT recommends instead of you";

/**
 * Phone-only bar for industry guides. Desktop stays clear via md:hidden.
 * A matching spacer keeps the footer above the bar until it is dismissed.
 */
export function TradeGuideStickyCta({ href }: { href: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="no-print md:hidden">
      <div
        aria-hidden="true"
        className="h-[calc(6.5rem+env(safe-area-inset-bottom,0px))]"
      />
      <aside
        className="fixed inset-x-0 bottom-0 z-40 border-t border-forest-deep bg-forest pb-[env(safe-area-inset-bottom,0px)] text-cream"
        aria-label="Free AI Answer Snapshot"
      >
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-2.5">
          <Link
            href={href}
            aria-label={label}
            className="flex min-h-11 flex-1 items-center py-1 text-sm font-medium leading-5 text-cream underline decoration-cream underline-offset-2 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            {label}
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-cream hover:bg-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            aria-label="Dismiss free snapshot offer"
            onClick={() => setOpen(false)}
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
