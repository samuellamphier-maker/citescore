import type { ReactNode } from "react";
import Link from "next/link";
import { fixPackIntroPriceLabel, templatePackLabel, templatePackUrl } from "@/lib/site";

export function GuideOffers({ freeCheck }: { freeCheck: ReactNode }) {
  return (
    <>
      <h2>Free AI Answer Snapshot, then the Fix Pack</h2>
      <p>
        The <Link href="/free-snapshot">free AI Answer Snapshot</Link> asks
        logged-out ChatGPT and Perplexity who they name for a local business
        and sends one page. AI answers vary run to run. No payment. The{" "}
        <Link href="/fix-pack">Fix Pack ({fixPackIntroPriceLabel})</Link> is
        the done-for-you work after you have seen who was named.
      </p>
      <p>{freeCheck}</p>
      <p>
        The <Link href="/geo-audit">$39 GEO audit</Link> is still available:
        one public URL, a 0–100 CiteScore, and about ten prioritized fixes,
        as a PDF. The score comes from on-page signals — definitions,
        entities, evidence, schema, freshness, crawler access — and, when a
        language-model key is configured, a review of the HTML we fetched. We
        do not log into ChatGPT, Perplexity, or Google AI Overviews. The
        per-engine snapshot is an inference, and the report says so.
      </p>
      <p>
        The{" "}
        <a href={templatePackUrl} target="_blank" rel="noopener noreferrer">
          {templatePackLabel}
        </a>{" "}
        is a separate $19 purchase from the check and the audit.
      </p>
    </>
  );
}
