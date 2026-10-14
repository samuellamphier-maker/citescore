import type { ReactNode } from "react";
import Link from "next/link";

export const preClass =
  "overflow-x-auto rounded-xl border border-rule bg-cream p-4 font-mono text-[13px] leading-6 text-ink";

const shared = [
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
      <h2>Check the public files</h2>
      <p>{children}</p>
      <p>
        Run the <Link href="/free-check">free check</Link> on the host. It
        reads the homepage, robots.txt for GPTBot, PerplexityBot, and
        Google-Extended, <code>/llms.txt</code>, a sitemap, and JSON-LD on
        the homepage. It does not log into an answer engine. One URL
        continues at <Link href="/checkout">checkout</Link>.
      </p>
    </>
  );
}
