import type { Metadata } from "next";
import Link from "next/link";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { InlineSnapshotRequest } from "@/components/InlineSnapshotRequest";
import { JsonLd } from "@/components/JsonLd";
import { LlmsTxtCaveat } from "@/components/LlmsTxtCaveat";
import { OtherDigitalProducts } from "@/components/OtherDigitalProducts";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StickySnapshotOffer } from "@/components/StickySnapshotOffer";
import { TrustLinks } from "@/components/TrustLinks";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";
import {
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
  sellerName,
} from "@/lib/site";

const topic = getTopic("/chatgpt-citation-check");

const faqs = [
  {
    q: "Do you ask ChatGPT who it names?",
    a: "Yes. The free AI Answer Snapshot asks logged-out ChatGPT and Perplexity a local prompt such as “best {service} in {city},” plus one variant, and records who they name. AI answers vary run to run. This is a snapshot, not a ranking, and not a promise that any assistant will name the business.",
  },
  {
    q: "Does the signal check query ChatGPT?",
    a: "No. The public-file signal check reads the homepage, robots.txt, a sitemap, JSON-LD, and whether /llms.txt returned a non-empty body. It does not query ChatGPT, Perplexity, or Google AI Overviews.",
  },
  {
    q: "What is the paid next step?",
    a: `The Fix Pack is ${fixPackIntroPriceLabel} introductory (${fixPackListPriceLabel} list) for one business, one city, and one service. It is the done-for-you work after you have seen who was named. The refunds page has the rules.`,
  },
];

const related = [
  { href: "/free-snapshot", label: "Get a free AI Answer Snapshot" },
  { href: "/fix-pack", label: `Fix Pack, ${fixPackIntroPriceLabel}` },
  { href: "/sample-snapshot", label: "Example snapshot" },
  { href: "/sample-fix-pack", label: "Example Fix Pack" },
  { href: "/free-check", label: "Public-file signal check" },
  { href: "/methodology", label: "How the snapshot is produced" },
  {
    href: "/how-to-check-if-chatgpt-mentions-your-brand",
    label: "How to check if ChatGPT mentions your brand",
  },
  {
    href: "/blog/chatgpt-citation-checklist",
    label: "ChatGPT citation checklist",
  },
] as const;

export const metadata: Metadata = {
  ...pageMeta({
    title: topic.title,
    description: topic.description,
    path: topic.path,
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

export default function ChatgptCitationCheckPage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: topic.title,
          description: topic.description,
          url: `${origin}${topic.path}`,
        }}
      />
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">{topic.kicker}</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Free ChatGPT citation check, then the {fixPackIntroPriceLabel} Fix Pack.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          A real ChatGPT citation check asks who was named. The free AI Answer
          Snapshot asks logged-out ChatGPT and Perplexity who they name
          instead of a local business, and records the answer. The{" "}
          <Link href="/fix-pack" className="text-forest underline">
            Fix Pack
          </Link>{" "}
          is {fixPackIntroPriceLabel}. AI answers vary run to run. This is a
          snapshot, not a ranking, and not a promise that any assistant will
          name the business.
        </p>
        <p className="mt-4 text-sm leading-6">
          <Link href="/sample-snapshot" className="font-medium text-forest underline">
            See an example snapshot
          </Link>
          <span className="text-ink-soft"> · </span>
          <Link href="/sample-fix-pack" className="font-medium text-forest underline">
            See an example Fix Pack
          </Link>
          <span className="text-ink-soft">
            . Example pages use illustrative numbers. Not a customer result.
          </span>
        </p>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Prepared by the CiteScore Team. Sold by {sellerName}.
        </p>
        <div
          data-funnel-cta
          className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <Link
            href="#snapshot"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
          >
            Get a free AI Answer Snapshot
          </Link>
          <FixPackBuyLink
            compact
            className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
          />
        </div>
        <div className="mt-4">
          <TrustLinks />
        </div>
        <InlineSnapshotRequest source="/chatgpt-citation-check" />

        <section className="mt-14 border-t border-rule pt-10" aria-labelledby="signal-check">
          <p className="kicker">Secondary</p>
          <h2 id="signal-check" className="mt-3 font-serif text-3xl tracking-tight">
            Public-file signal check
          </h2>
          <p className="mt-4 leading-7 text-ink-soft">
            This check is not the citation. It reads public files on one host.
            It does not query ChatGPT or Perplexity. Run it on the{" "}
            <Link href="/free-check" className="text-forest underline">
              free check
            </Link>{" "}
            page.
          </p>
          <h3 className="mt-8 font-serif text-2xl tracking-tight">
            What the signal check can see
          </h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-ink-soft">
            <li>
              <strong className="font-medium text-ink">Answer fitness.</strong>{" "}
              A self-contained “X is a Y that helps Z” in the first screen,
              plus question-shaped headings. A slogan under eight words with
              no period is a weak lead.
            </li>
            <li>
              <strong className="font-medium text-ink">Citable evidence.</strong>{" "}
              Dates, counts, and a comparison URL on the same host. Off-site
              mention share is not crawled.
            </li>
            <li>
              <strong className="font-medium text-ink">Crawler access.</strong>{" "}
              Allow, disallow, or unspecified in <code>robots.txt</code> for
              GPTBot, PerplexityBot, and Google-Extended, plus whether{" "}
              <code>/llms.txt</code> returned a non-empty body. llms.txt is{" "}
              <LlmsTxtCaveat />. Detail is on the{" "}
              <Link href="/ai-crawlers" className="text-forest underline">
                crawler page
              </Link>
              .
            </li>
          </ul>
          <p className="mt-4 leading-7 text-ink-soft">
            The signal check reads GPTBot. It does not read ChatGPT-User or
            OAI-SearchBot, the agents OpenAI documents for user-triggered
            browsing and search. Allowing those two while disallowing GPTBot
            is a real configuration. The snapshot still asks the assistants
            who they name.
          </p>
          <p className="mt-4 leading-7 text-ink-soft">
            A file check cannot reproduce a prompt, the memory on an account,
            or a different day. If you need a prompt list watched over time,
            that is{" "}
            <Link href="/alternatives/otterly" className="text-forest underline">
              Otterly
            </Link>
            ,{" "}
            <Link href="/alternatives/peec-ai" className="text-forest underline">
              Peec AI
            </Link>
            , or{" "}
            <Link href="/alternatives/profound" className="text-forest underline">
              Profound
            </Link>
            . CiteScore asks one local prompt and one variant, records who is
            named, then the Fix Pack is the work on the business.
          </p>
          <p className="mt-4 leading-7 text-ink-soft">
            The{" "}
            <Link
              href="/blog/chatgpt-citation-checklist"
              className="text-forest underline"
            >
              citation checklist
            </Link>{" "}
            is twelve homepage checks you can run yourself. It is not the
            snapshot.
          </p>
        </section>

        <section id="faq" className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            Questions about the check
          </h2>
          {faqs.map((item) => (
            <div key={item.q}>
              <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
              <p className="mt-2 leading-7 text-ink-soft">{item.a}</p>
            </div>
          ))}
        </section>

        <OtherDigitalProducts />

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
      <StickySnapshotOffer path="/chatgpt-citation-check" />
    </>
  );
}
