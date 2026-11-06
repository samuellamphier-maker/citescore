import type { Metadata } from "next";
import Link from "next/link";
import { AuditSecondaryNote } from "@/components/AuditSecondaryNote";
import { IndustrySnapshotCta } from "@/components/IndustrySnapshotCta";
import { SiteFooter } from "@/components/SiteFooter";
import { StickySnapshotOffer } from "@/components/StickySnapshotOffer";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { fixPackIntroPriceLabel } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "CiteScore alternatives",
  description:
    "How the free AI Answer Snapshot and the Fix Pack compare with Otterly, Profound, and Peec AI — ongoing AI-visibility monitors — and when to buy which.",
  path: "/alternatives",
});

const links = [
  {
    href: "/free-snapshot",
    title: "Free AI Answer Snapshot",
    dek: "Who ChatGPT and Perplexity name for a local business. One page. No payment.",
  },
  {
    href: "/fix-pack",
    title: `Fix Pack (${fixPackIntroPriceLabel})`,
    dek: "The done-for-you work after you have seen who was named.",
  },
  {
    href: "/alternatives/otterly",
    title: "CiteScore vs Otterly",
    dek: "Otterly monitors live prompts across ChatGPT, AI Overviews, Perplexity, and Copilot. CiteScore starts with a free snapshot and the Fix Pack.",
  },
  {
    href: "/alternatives/profound",
    title: "CiteScore vs Profound",
    dek: "Profound is the enterprise citation-share platform. CiteScore starts with a free snapshot and the Fix Pack.",
  },
  {
    href: "/alternatives/peec-ai",
    title: "CiteScore vs Peec AI",
    dek: "Peec AI is ongoing AI-search analytics for marketing teams. CiteScore starts with a free snapshot and the Fix Pack.",
  },
  {
    href: "/blog/citescore-vs-enterprise-geo-tools",
    title: "CiteScore vs enterprise GEO tools",
    dek: "The longer comparison: the free snapshot and the Fix Pack versus Profound-class citation dashboards.",
  },
  {
    href: "/vs-agency",
    title: "Fix Pack vs hiring an agency",
    dek: `The ${fixPackIntroPriceLabel} Fix Pack is one purchase for one local business. An agency retainer is monthly. This page does not invent a retainer price.`,
  },
];

export default function AlternativesIndexPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Comparisons</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          Alternatives — said plainly.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          CiteScore is not trying to replace a mention-tracking suite. These
          pages exist so a founder searching “Otterly alternative,”
          “Profound vs …,” or “Peec AI alternative” can see the honest
          split: a free snapshot and the {fixPackIntroPriceLabel} Fix Pack
          versus a monthly monitor. Local businesses start with the free
          snapshot.
        </p>
        <div className="mt-8">
          <IndustrySnapshotCta variant="general" />
        </div>
        <ul className="mt-10 divide-y divide-rule border-y border-rule">
          {links.map((item) => (
            <li key={item.href} className="py-5">
              <h2 className="font-serif text-2xl">
                <Link href={item.href} className="hover:text-forest">
                  {item.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                {item.dek}
              </p>
            </li>
          ))}
        </ul>
        <AuditSecondaryNote />
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          The <Link href="/free-check" className="text-forest underline">
            free signal check
          </Link>{" "}
          reads public files. It does not query ChatGPT. The free snapshot
          does.
        </p>
      </main>
      <SiteFooter />
      <StickySnapshotOffer path="/alternatives" />
    </>
  );
}
