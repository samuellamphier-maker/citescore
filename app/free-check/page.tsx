import type { Metadata } from "next";
import Link from "next/link";
import { AuditSecondaryNote } from "@/components/AuditSecondaryNote";
import { FreeCheckTool } from "@/components/FreeCheckTool";
import { InlineSnapshotRequest } from "@/components/InlineSnapshotRequest";
import { LlmsTxtCaveat } from "@/components/LlmsTxtCaveat";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StickySnapshotOffer } from "@/components/StickySnapshotOffer";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";
import { fixPackIntroPriceLabel, sellerName } from "@/lib/site";

const topic = getTopic("/free-check");

export const metadata: Metadata = {
  ...pageMeta({
    title: topic.title,
    description: topic.description,
    path: topic.path,
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

const related = [
  { href: "/sample-snapshot", label: "Example snapshot" },
  { href: "/sample-fix-pack", label: "Example Fix Pack" },
  { href: "/how-to-get-cited-by-chatgpt", label: "How to get cited by ChatGPT" },
  {
    href: "/how-to-check-if-chatgpt-mentions-your-brand",
    label: "How to check if ChatGPT mentions your brand",
  },
  { href: "/ai-crawler-robots-txt-checker", label: "AI crawler robots.txt checker" },
  { href: "/ai-crawler-user-agents", label: "AI crawler user agents" },
  { href: "/aeo-checklist", label: "AEO checklist" },
] as const;

export default function FreeCheckPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">{topic.kicker}</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">{topic.title}</h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">{topic.description}</p>
        <p className="mt-4 text-sm leading-6">
          <Link href="/sample-snapshot" className="font-medium text-forest underline">
            See an example snapshot
          </Link>
          <span className="text-ink-soft"> · </span>
          <Link href="/fix-pack" className="font-medium text-forest underline">
            Fix Pack, {fixPackIntroPriceLabel}
          </Link>
          <span className="text-ink-soft">
            . The example snapshot uses illustrative numbers.
          </span>
        </p>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Prepared by the CiteScore Team. Sold by {sellerName}.
        </p>
        <InlineSnapshotRequest source="/free-check" />

        <section className="mt-14 border-t border-rule pt-10" aria-labelledby="signal-check">
          <p className="kicker">Secondary</p>
          <h2 id="signal-check" className="mt-3 font-serif text-3xl tracking-tight">
            Public-file signal check
          </h2>
          <p className="mt-4 leading-7 text-ink-soft">
            This check is not the free snapshot. It reads robots.txt, the
            sitemap, JSON-LD, and the homepage. It does not query live
            ChatGPT or Perplexity.
          </p>
          <div className="mt-6">
            <FreeCheckTool />
          </div>
          <h3 className="mt-8 font-serif text-2xl tracking-tight">
            What this signal check looks at
          </h3>
          <p className="mt-4 leading-7 text-ink-soft">
            Five public-file basics: homepage reachability, AI-crawler rules
            in robots.txt (GPTBot, PerplexityBot, Google-Extended), sitemap,
            JSON-LD schema, and a meta description. CiteScore reads those
            files. It does not query live ChatGPT, Perplexity, or Google AI
            Overviews. llms.txt is <LlmsTxtCaveat />. The checker may note
            whether a file is present. A missing file is not a failed check.
          </p>
          <p className="mt-4 leading-7 text-ink-soft">
            Passing the public-file basics means those files are in place.
            Who an answer engine names is what the{" "}
            <Link href="/free-snapshot" className="text-forest underline">
              free AI Answer Snapshot
            </Link>{" "}
            shows. The{" "}
            <Link href="/fix-pack" className="text-forest underline">
              Fix Pack
            </Link>{" "}
            is the done-for-you work after that.
          </p>
        </section>
        <AuditSecondaryNote />
        <nav className="mt-10 border-t border-rule pt-6" aria-label="Related">
          <p className="kicker">Keep reading</p>
          <ul className="mt-3 space-y-2">
            {related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-forest underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <SiteFooter />
      <StickySnapshotOffer path="/free-check" />
    </>
  );
}
