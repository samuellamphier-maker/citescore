import type { ReactNode } from "react";
import Link from "next/link";
import { templatePackLabel, templatePackUrl } from "@/lib/site";

export function GuideOffers({ freeCheck }: { freeCheck: ReactNode }) {
  return (
    <>
      <h2>Free check, the $39 audit, and the template pack</h2>
      <p>{freeCheck}</p>
      <p>
        The <Link href="/geo-audit">$39 GEO audit</Link> is one public URL,
        a 0–100 CiteScore, and about ten prioritized fixes, as a PDF. The
        score comes from on-page signals — definitions, entities, evidence,
        schema, freshness, crawler access — and, when a language-model key
        is configured, a review of the HTML we fetched. We do not log into
        ChatGPT, Perplexity, or Google AI Overviews. The per-engine snapshot
        is an inference, and the report says so.
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
