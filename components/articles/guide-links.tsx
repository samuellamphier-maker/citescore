import type { ReactNode } from "react";
import Link from "next/link";
import { fixPackIntroPriceLabel } from "@/lib/site";

export const preClass =
  "overflow-x-auto rounded-xl border border-rule bg-cream p-4 font-mono text-[13px] leading-6 text-ink";

const shared = [
  { href: "/free-snapshot", label: "Free AI Answer Snapshot" },
  { href: "/fix-pack", label: `Fix Pack (${fixPackIntroPriceLabel})` },
  { href: "/free-check", label: "Free check" },
  { href: "/checkout", label: "Checkout" },
  { href: "/ai-crawlers", label: "GPTBot, PerplexityBot, and Google-Extended" },
  {
    href: "/how-to-get-cited-by-ai-answer-engines",
    label: "How to get cited by AI answer engines",
  },
  { href: "/answer-engine-optimization", label: "Answer engine optimization" },
];

export function guideLinks(extra: { href: string; label: string }[] = []) {
  const seen = new Set<string>();
  return [...shared, ...extra].filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

export function CheckLinks({ children }: { children: ReactNode }) {
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
      <p>{children}</p>
      <p>
        Run the <Link href="/free-check">free check</Link> on the host. It
        reads the homepage, robots.txt for GPTBot, PerplexityBot, and
        Google-Extended, <code>/llms.txt</code>, a sitemap, and JSON-LD on
        the homepage. It does not log into an answer engine. Paid files are
        listed at <Link href="/checkout">checkout</Link>.
      </p>
    </>
  );
}
