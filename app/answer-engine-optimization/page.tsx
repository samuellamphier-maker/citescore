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

const topic = getTopic("/answer-engine-optimization");

const faqs = [
  {
    q: "What is answer engine optimization?",
    a: "Getting a local business named when someone asks an AI assistant for that trade in that city. GEO, LLMO, and AI search optimization are overlapping labels for that outcome. The next step is a free AI Answer Snapshot, then the Fix Pack.",
  },
  {
    q: "Is this an AEO rank tracker?",
    a: "No. Trackers watch a prompt list over time and charge monthly. CiteScore asks logged-out ChatGPT and Perplexity one local prompt and one variant, and records who they name. AI answers vary run to run. The Fix Pack is the done-for-you work after that.",
  },
  {
    q: "Where is the longer definition?",
    a: "The GEO explainer. This page is the plain-language version, and the offer: a free AI Answer Snapshot, then the Fix Pack.",
  },
];

const related = [
  { href: "/free-snapshot", label: "Free AI Answer Snapshot" },
  { href: "/fix-pack", label: `Fix Pack (${fixPackIntroPriceLabel})` },
  { href: "/sample-snapshot", label: "Example snapshot" },
  { href: "/sample-fix-pack", label: "Example Fix Pack" },
  { href: "/blog/what-is-geo", label: "What is GEO?" },
  { href: "/chatgpt-citation-check", label: "ChatGPT citation check" },
  { href: "/methodology", label: "How the snapshot is produced" },
  {
    href: "/blog/citescore-vs-enterprise-geo-tools",
    label: "CiteScore vs enterprise GEO tools",
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

export default function AnswerEngineOptimizationPage() {
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
          Answer engine optimization: free snapshot, then the{" "}
          {fixPackIntroPriceLabel} Fix Pack.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          Answer engine optimization — AEO — means being the business an AI
          answer recommends. ChatGPT, Perplexity, Google AI Overviews, and
          the copilot boxes on top of them are the engines in that sentence.
          GEO, LLMO, and “AI search optimization” are overlapping labels. The
          next step is a free AI Answer Snapshot, then the{" "}
          <Link href="/fix-pack" className="text-forest underline">
            Fix Pack
          </Link>{" "}
          at {fixPackIntroPriceLabel} introductory ({fixPackListPriceLabel}{" "}
          list). One business, one city, one service.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          CiteScore asks logged-out ChatGPT and Perplexity who they name for
          that trade and city. AI answers vary run to run. This is a
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
        <InlineSnapshotRequest source="/answer-engine-optimization" />

        <section className="mt-14 border-t border-rule pt-10">
          <h2 className="font-serif text-3xl tracking-tight">
            What people mean when they say AEO
          </h2>
          <p className="mt-4 leading-7 text-ink-soft">
            The phrase covers two jobs. They should not share a checkout.
          </p>
          <div className="mt-6 space-y-4">
            <article className="rounded-2xl border border-rule bg-cream p-6">
              <h3 className="font-serif text-2xl tracking-tight">
                Who is named, and what to change
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                For one local business, the free AI Answer Snapshot records
                who logged-out ChatGPT and Perplexity name. The{" "}
                {fixPackIntroPriceLabel} Fix Pack is the done-for-you work
                after that. The{" "}
                <Link href="/methodology" className="text-forest underline">
                  methodology
                </Link>{" "}
                is the prompt and the variant.
              </p>
            </article>
            <article className="rounded-2xl border border-rule bg-cream p-6">
              <h3 className="font-serif text-2xl tracking-tight">
                A prompt list, watched over time
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                That is{" "}
                <Link href="/alternatives/otterly" className="text-forest underline">
                  Otterly
                </Link>
                ,{" "}
                <Link href="/alternatives/peec-ai" className="text-forest underline">
                  Peec AI
                </Link>
                , or a{" "}
                <Link href="/alternatives/profound" className="text-forest underline">
                  Profound
                </Link>
                -class platform. Different price, different job. There is no
                monthly tracker for sale on this page.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            Four questions an answer engine is trying to finish
          </h2>
          <p className="mt-4 leading-7 text-ink-soft">
            The{" "}
            <Link
              href="/blog/chatgpt-citation-checklist"
              className="text-forest underline"
            >
              checklist
            </Link>{" "}
            has twelve homepage checks. Underneath them, the page is trying
            to answer four questions. The snapshot shows who got named. The
            Fix Pack is the work that follows.
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-ink-soft">
            <li>
              <strong className="font-medium text-ink">What is it?</strong> A
              definition in the first screen, not a slogan.
            </li>
            <li>
              <strong className="font-medium text-ink">Who says so?</strong>{" "}
              The same business name in the title, the H1, and JSON-LD, plus
              a person or an About page with a name on it.
            </li>
            <li>
              <strong className="font-medium text-ink">Compared with what?</strong>{" "}
              A comparison URL and one dated fact, on the site you own.
              Off-site share of voice is not in the crawl.
            </li>
            <li>
              <strong className="font-medium text-ink">
                May a model fetch the page?
              </strong>{" "}
              <Link href="/ai-crawlers" className="text-forest underline">
                GPTBot, PerplexityBot, and Google-Extended
              </Link>{" "}
              in robots.txt. llms.txt is <LlmsTxtCaveat />.
            </li>
          </ul>
          <p className="mt-4 leading-7 text-ink-soft">
            The{" "}
            <Link href="/blog/what-is-geo" className="text-forest underline">
              GEO explainer
            </Link>{" "}
            is the longer definition. Teams with a staffed program and a
            prompt library are shopping in a different aisle. The{" "}
            <Link
              href="/blog/citescore-vs-enterprise-geo-tools"
              className="text-forest underline"
            >
              enterprise comparison
            </Link>{" "}
            says that plainly. Re-check any public prices on that page before
            you budget.
          </p>
        </section>

        <section id="faq" className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            Questions about the label
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
      <StickySnapshotOffer path="/answer-engine-optimization" />
    </>
  );
}
