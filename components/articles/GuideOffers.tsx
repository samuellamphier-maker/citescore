import type { ReactNode } from "react";
import Link from "next/link";
import { fixPackPageLinkLabel, templatePackLabel, templatePackUrl } from "@/lib/site";

export function GuideOffers({ freeCheck }: { freeCheck: ReactNode }) {
  return (
    <>
      <h2>Free AI Answer Snapshot, then the Fix Pack</h2>
      <p>
        The <Link href="/free-snapshot">free AI Answer Snapshot</Link> asks
        logged-out ChatGPT and Perplexity who they name for a local business
        and sends one page. AI answers vary run to run. No payment. The{" "}
        <Link href="/fix-pack">{fixPackPageLinkLabel()}</Link> is
        the done-for-you work after you have seen who was named.
      </p>
      <p>{freeCheck}</p>
      <p>
        The{" "}
        <a href={templatePackUrl} target="_blank" rel="noopener noreferrer">
          {templatePackLabel}
        </a>{" "}
        is a separate $19 purchase from the check and the Fix Pack.
      </p>
    </>
  );
}
