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
import { LLMS_TXT_GOOGLE_URL, LLMS_TXT_OPTIONAL_CLAIM } from "@/lib/llms-txt-note";
import {
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
  sellerName,
} from "@/lib/site";

const topic = getTopic("/llms-txt");

const faqs = [
  {
    q: "Does a missing llms.txt keep a business out of AI answers?",
    a: `No. llms.txt is ${LLMS_TXT_OPTIONAL_CLAIM} (${LLMS_TXT_GOOGLE_URL}). A missing file is not a failed check. The free AI Answer Snapshot records who ChatGPT and Perplexity name. It does not require the file.`,
  },
  {
    q: "Do you grade the writing inside the file?",
    a: "No. A non-empty /llms.txt can be noted. CiteScore does not score headings, link titles, or whether the file matches the community proposal’s outline. A one-line placeholder counts as found.",
  },
  {
    q: "Do you fetch llms-full.txt?",
    a: "No. The proposal describes an optional expanded file. CiteScore requests /llms.txt on the host and stops there.",
  },
];

const related = [
  { href: "/free-snapshot", label: "Free AI Answer Snapshot" },
  { href: "/fix-pack", label: `Fix Pack (${fixPackIntroPriceLabel})` },
  { href: "/sample-snapshot", label: "Example snapshot" },
  { href: "/sample-fix-pack", label: "Example Fix Pack" },
  { href: "/free-check", label: "Public-file signal check" },
  { href: "/llms-txt-best-practices", label: "llms.txt best practices" },
  { href: "/llms-txt-examples", label: "llms.txt examples" },
  { href: "/llms-txt-generator", label: "llms.txt generator" },
  { href: "/ai-crawlers", label: "GPTBot, PerplexityBot, and Google-Extended" },
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

export default function LlmsTxtPage() {
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
          llms.txt is optional. Free snapshot, then the {fixPackIntroPriceLabel}{" "}
          Fix Pack.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          A local business that wants to see who ChatGPT and Perplexity
          name starts with a free AI Answer Snapshot, then the{" "}
          <Link href="/fix-pack" className="text-forest underline">
            Fix Pack
          </Link>{" "}
          at {fixPackIntroPriceLabel} introductory ({fixPackListPriceLabel}{" "}
          list). <code>llms.txt</code> is <LlmsTxtCaveat />. It is a community
          proposal for a Markdown reading list, usually at{" "}
          <code>/llms.txt</code>. It is not an OpenAI standard, a Google
          ranking factor, or a Perplexity requirement.
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
        <InlineSnapshotRequest source="/llms-txt" />

        <section className="mt-14 border-t border-rule pt-10" aria-labelledby="llms-check">
          <p className="kicker">Secondary</p>
          <h2 id="llms-check" className="mt-3 font-serif text-3xl tracking-tight">
            What an llms.txt check looks at
          </h2>
          <p className="mt-4 leading-7 text-ink-soft">
            The file is a courtesy index, published at llmstxt.org: a
            one-line description of the project, then a curated list of URLs.
            The check requests <code>/llms.txt</code> on the host. Found means
            the response succeeded and the body, after trimming, was not
            empty. A 404, an empty 200, or a network failure is not found.
            The check does not validate the Markdown outline, and it does not
            request <code>/llms-full.txt</code>. It does not query ChatGPT or
            Perplexity.
          </p>
          <p className="mt-4 leading-7 text-ink-soft">
            A missing file does not lower a score, and a present file does
            not raise one. The{" "}
            <Link href="/free-check" className="text-forest underline">
              public-file signal check
            </Link>{" "}
            may note whether the file is present. Who an answer engine names
            is what the snapshot shows. llms.txt is <LlmsTxtCaveat />.
          </p>

          <h3 className="mt-8 font-serif text-2xl tracking-tight">
            A file that matches the proposal, using a fictional product
          </h3>
          <p className="mt-4 leading-7 text-ink-soft">
            Northbound is a fictional company from an older illustrative
            audit. This file illustrates the shape. It is not a template that
            earns citations, and not a file hosted for them. The current
            examples are the{" "}
            <Link href="/sample-snapshot" className="text-forest underline">
              example snapshot
            </Link>{" "}
            and the{" "}
            <Link href="/sample-fix-pack" className="text-forest underline">
              example Fix Pack
            </Link>
            .
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-rule bg-cream p-4 text-sm leading-6 text-ink">
            {`# Northbound

> Customer-interview repository for product teams.

Northbound stores interview transcripts, tags themes, and exports clips for product decisions.

## Product
- [What it is](https://northbound.example/): definition, who it is for, what it replaces
- [Pricing](https://northbound.example/pricing): public plans
- [vs Dovetail](https://northbound.example/compare/dovetail): honest comparison

## Optional
- [Changelog](https://northbound.example/changelog): month-level product changes`}
          </pre>
          <p className="mt-4 leading-7 text-ink-soft">
            Put the canonical URLs in the list, not campaign links. If the
            comparison page does not exist yet, leave it off. A map that
            points at 404s is a worse courtesy than no map. Write the summary
            in the same words as the homepage definition. A{" "}
            <Link href="/llms-txt-generator" className="text-forest underline">
              generator
            </Link>{" "}
            can assemble that Markdown in the browser. Nothing is uploaded.
          </p>

          <h3 className="mt-8 font-serif text-2xl tracking-tight">
            What to ignore in llms.txt advice
          </h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-ink-soft">
            <li>
              <strong className="font-medium text-ink">
                “Add the file and ChatGPT will cite you.”
              </strong>{" "}
              No engine has published that rule. llms.txt is <LlmsTxtCaveat />.
            </li>
            <li>
              <strong className="font-medium text-ink">
                Keyword lists inside the file.
              </strong>{" "}
              The proposal is a reading list. Stuffing a phrase into every
              bullet does not create a source.
            </li>
            <li>
              <strong className="font-medium text-ink">
                A private or staging URL.
              </strong>{" "}
              The check fetches the public host. A file that only exists
              behind a VPN is invisible to the check, and to everyone else.
            </li>
          </ul>
          <p className="mt-4 leading-7 text-ink-soft">
            The{" "}
            <Link
              href="/blog/chatgpt-citation-checklist"
              className="text-forest underline"
            >
              checklist
            </Link>{" "}
            includes <code>llms.txt</code> as one item of twelve. Longer
            notes are on{" "}
            <Link href="/llms-txt-best-practices" className="text-forest underline">
              best practices
            </Link>{" "}
            and{" "}
            <Link href="/llms-txt-examples" className="text-forest underline">
              examples
            </Link>
            .
          </p>
        </section>

        <section id="faq" className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            Questions about the file
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
      <StickySnapshotOffer path="/llms-txt" />
    </>
  );
}
