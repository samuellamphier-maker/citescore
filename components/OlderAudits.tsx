import type { ReactNode } from "react";
import {
  doneForYouAuditLabel,
  doneForYouAuditUrl,
  whiteLabelAuditLabel,
  whiteLabelAuditUrl,
} from "@/lib/site";

function externalBuy(href: string, label: string) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 flex h-12 items-center justify-center rounded-lg border border-ink/30 bg-cream text-ink hover:border-ink hover:bg-paper-2"
    >
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Collapsed checkout for the earlier PDF and written-audit SKUs.
 * The free snapshot and Fix Pack stay above this block.
 */
export function OlderAudits({ children }: { children: ReactNode }) {
  return (
    <details id="older-audits" className="group mt-10 border-t border-rule">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 py-3 marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          <span className="block font-medium text-ink">
            Older self-serve / written audits
          </span>
          <span className="mt-0.5 block text-sm font-normal leading-6 text-ink-soft">
            The self-serve PDF and the written audits for one public URL.
          </span>
        </span>
        <span
          aria-hidden="true"
          className="ml-auto text-xl leading-none text-ink-soft group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="space-y-4 pb-2">
        <p className="text-sm leading-6 text-ink-soft">
          These files are separate from the free AI Answer Snapshot and the
          Fix Pack. Prepared by the CiteScore Team.
        </p>
        {children}
        <article className="rounded-2xl border border-rule bg-cream p-6">
          <p className="font-serif text-2xl tracking-tight text-ink">{doneForYouAuditLabel}</p>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            A written walkthrough of one public URL, delivered within 3
            business days. CiteScore does not log into ChatGPT, Perplexity, or
            Google AI Overviews for this file.
          </p>
          {externalBuy(doneForYouAuditUrl, "Buy the $99 audit")}
          <a
            href="/sample-audit.pdf"
            className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-forest underline underline-offset-4"
          >
            See a sample report (PDF)
          </a>
        </article>
        <article className="rounded-2xl border border-rule bg-cream p-6">
          <p className="font-serif text-2xl tracking-tight text-ink">{whiteLabelAuditLabel}</p>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            An unbranded PDF of one public URL, delivered within 3 business
            days, with no CiteScore branding.
          </p>
          {externalBuy(whiteLabelAuditUrl, "Buy the white-label audit")}
        </article>
      </div>
    </details>
  );
}
