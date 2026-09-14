import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "CiteScore alternatives",
  description:
    "How a $39 one-off GEO audit compares with Otterly- and Profound-class AI-visibility platforms — and when to buy which.",
  path: "/alternatives",
});

const links = [
  {
    href: "/alternatives/otterly",
    title: "CiteScore vs Otterly",
    dek: "Otterly monitors live prompts across ChatGPT, AI Overviews, Perplexity, and Copilot. CiteScore is a one-time page audit.",
  },
  {
    href: "/blog/citescore-vs-enterprise-geo-tools",
    title: "CiteScore vs enterprise GEO tools",
    dek: "The longer comparison, including Profound-class citation dashboards and who each tool is actually for.",
  },
  {
    href: "/geo-audit",
    title: `The ${site.priceLabel} GEO audit`,
    dek: "If you already know you want the punch-list PDF, start here.",
  },
];

export default function AlternativesIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Comparisons</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          Alternatives — said plainly.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          CiteScore is not trying to replace a mention-tracking suite. These
          pages exist so a founder searching “Otterly alternative” or
          “Profound vs …” can see the honest split: {site.priceLabel} once
          versus a monthly monitor.
        </p>
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
      </main>
      <SiteFooter />
    </>
  );
}
