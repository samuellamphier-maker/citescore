import type { Metadata } from "next";
import Link from "next/link";
import { InlineSnapshotRequest } from "@/components/InlineSnapshotRequest";
import { IndustrySnapshotCta } from "@/components/IndustrySnapshotCta";
import { JsonLd } from "@/components/JsonLd";
import { LlmsTxtCaveat } from "@/components/LlmsTxtCaveat";
import { SiteFooter } from "@/components/SiteFooter";
import { StickySnapshotOffer } from "@/components/StickySnapshotOffer";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { fixPackDeliverables } from "@/lib/fix-pack-offer";
import {
  agencyKitLabel,
  agencyKitUrl,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
  site,
  whiteLabelAuditLabel,
  whiteLabelAuditUrl,
} from "@/lib/site";

const path = "/for-agencies";
const title = "GEO audits for SEO agencies";
const description =
  "How an SEO agency starts a local client with the free AI Answer Snapshot and the $49 Fix Pack. The free check, the white-label PDF, and the $29 GEO Agency Kit are separate. The check reads public files. It does not query ChatGPT.";

export const metadata: Metadata = pageMeta({
  title,
  description,
  path,
});

const freeSignals = [
  "Homepage: whether it responded, plus the title and whether a meta description is present",
  "robots.txt: GPTBot, PerplexityBot, and Google-Extended, each recorded as allow, disallow, or not mentioned",
  "llms.txt: a non-empty text file at /llms.txt, or none",
  "Sitemap: a sitemap on the host, or a Sitemap line in robots.txt",
  "JSON-LD: the types found on the homepage",
];

const kitContents = [
  "Client report template",
  "Pitch email sequence",
  "Pricing tiers",
  "One-pager",
  "30-day delivery SOP",
];

const clientSteps = [
  {
    n: "01",
    title: "Ask for a public host",
    body: "The page they want cited, usually the homepage. Skip anything behind a login. You do not need a CiteScore account, and neither do they.",
  },
  {
    n: "02",
    title: "Run the free check live",
    body: "Paste the host on the free-check page during a call, or before you write the proposal. The result stays in that browser. There is no saved link to forward.",
  },
  {
    n: "03",
    title: "Walk the rows",
    body: (
      <>
        A disallow on GPTBot, PerplexityBot, or Google-Extended is a line in
        robots.txt you can open together. A missing sitemap or JSON-LD block
        is the same kind of fact. llms.txt is <LlmsTxtCaveat />.
      </>
    ),
  },
  {
    n: "04",
    title: "Say what a pass means",
    body: "A passing row means that signal is present on the public file. It is the start of the conversation. Who an answer engine names is what the free AI Answer Snapshot shows. The Fix Pack is the done-for-you work after that.",
  },
];

const faqs = [
  {
    q: "Does the free check query ChatGPT for the client?",
    a: "No. It reads public files on the host: the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, llms.txt, a sitemap, and JSON-LD on the homepage. It does not log into ChatGPT, Perplexity, or Google AI Overviews.",
  },
  {
    q: "What do I hand over from the free snapshot?",
    a: "One page: who is named, which sources are cited, and how the Google rating and review count compare. AI answers vary run to run. This is a snapshot, not a ranking. The Fix Pack is the done-for-you work after the client has seen who was named.",
  },
  {
    q: "What is the white-label audit?",
    a: "An unbranded PDF of the AI search audit, for $149, delivered within 3 business days. It is a separate purchase from the Fix Pack and the $29 kit.",
  },
  {
    q: "What is in the $29 kit?",
    a: "A client report template, a pitch email sequence, pricing tiers, a one-pager, and a 30-day delivery SOP. The kit is separate from the audit. The score still comes from running CiteScore on a URL.",
  },
  {
    q: "Can I show the report format before a client pays?",
    a: "Yes. The sample report is a fictional company, labeled as a sample on the page. It shows the layout. It is not a customer result.",
  },
];

export default function ForAgenciesPage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: `${origin}${path}`,
          publisher: { "@type": "Organization", name: site.name, url: origin },
        }}
      />
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
      <SiteHeader />
      <main id="main">
        <section className="border-b border-rule/80">
          <div className="mx-auto grid max-w-5xl gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:py-20">
            <div>
              <p className="kicker">For SEO agencies</p>
              <h1 className="mt-4 font-serif text-[2.35rem] leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">
                Show a local client who ChatGPT names before you sell an audit.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
                The free AI Answer Snapshot asks logged-out ChatGPT and
                Perplexity who they name and sends one page. AI answers vary
                run to run. No payment. The Fix Pack is {fixPackIntroPriceLabel}{" "}
                for the done-for-you work after that. The white-label PDF and
                the {agencyKitLabel} stay available as separate purchases.
              </p>
              <div className="mt-8 max-w-xl">
                <IndustrySnapshotCta variant="general" />
              </div>
            </div>
            <aside className="report-sheet rounded-2xl border border-rule p-6">
              <p className="kicker">Still for sale</p>
              <dl className="mt-4 space-y-5 text-sm leading-6">
                <div>
                  <dt className="font-medium text-ink">
                    <Link href="/fix-pack" className="text-forest underline">
                      Fix Pack ({fixPackIntroPriceLabel})
                    </Link>
                  </dt>
                  <dd className="mt-1 text-ink-soft">
                    The done-for-you work after the client has seen who was
                    named. One business, one city, one service.
                  </dd>
                </div>
                <div className="border-t border-rule pt-5">
                  <dt className="font-medium text-ink">{agencyKitLabel}</dt>
                  <dd className="mt-1 text-ink-soft">
                    The writing around the audit: report template, pitch
                    emails, pricing tiers, a one-pager, and a 30-day SOP.
                  </dd>
                </div>
              </dl>
              <Link
                href="/sample"
                className="mt-6 inline-flex text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                Sample report — fictional, labeled
              </Link>
              <Link
                href="/free-check"
                className="mt-3 inline-flex text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                Run the free check
              </Link>
            </aside>
          </div>
        </section>

        <section id="white-label" className="border-b border-rule/80 bg-ink text-cream">
          <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.7fr)] lg:items-center">
            <div>
              <p className="kicker on-ink">For client delivery</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-5xl sm:leading-[1.1]">
                {whiteLabelAuditLabel}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-[#d7c7b0]">
                An unbranded PDF. Delivered within 3 business days. You send
                one public URL. The file you get back has no CiteScore
                branding, so you can hand it to a client under your own name.
              </p>
            </div>
            <div>
              <p className="font-serif text-6xl tracking-tight">$149</p>
              <p className="mt-2 text-sm leading-6 text-[#d7c7b0]">
                Unbranded PDF · 3 business days
              </p>
              <a
                href={whiteLabelAuditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex h-12 items-center justify-center rounded-lg bg-cream text-ink hover:bg-paper"
              >
                Buy the white-label audit
              </a>
              <a
                href="/sample-audit.pdf"
                className="mt-4 inline-flex text-sm font-medium text-[#d7c7b0] underline underline-offset-4 hover:text-cream"
              >
                See a sample report (PDF)
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-rule/80">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">What CiteScore checks</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl tracking-tight sm:text-4xl">
              Public files first. A scored page when the client wants the list.
            </h2>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-rule bg-cream p-6">
                <p className="kicker">Free · no signup</p>
                <h3 className="mt-3 font-serif text-2xl">The free check</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  One host. Six signals from files a crawler can request.
                  OAI-SearchBot is not one of them. You still read that group
                  in robots.txt yourself if ChatGPT search is in the pitch.
                </p>
                <ul className="mt-5 space-y-3">
                  {freeSignals.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/free-check"
                  className="mt-6 inline-flex text-sm font-medium text-forest underline-offset-4 hover:underline"
                >
                  Open the free check
                </Link>
              </div>
              <div className="rounded-2xl border border-rule p-6">
                <p className="kicker">After the snapshot</p>
                <h3 className="mt-3 font-serif text-2xl">The Fix Pack</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  The free snapshot comes first. The Fix Pack is{" "}
                  {fixPackIntroPriceLabel} introductory (
                  {fixPackListPriceLabel} list): a Google Business Profile gap
                  list, a review-gap plan and script, the directories an AI
                  answer cited, paste-ready LocalBusiness and Service JSON-LD,
                  and a re-check 14 days later. It is not a promise that any
                  assistant will name the business.
                </p>
                <ul className="mt-5 space-y-3">
                  {fixPackDeliverables.map((item) => (
                    <li key={item.title} className="flex gap-3 text-sm leading-6">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                      {item.title}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/fix-pack"
                  className="mt-6 inline-flex text-sm font-medium text-forest underline-offset-4 hover:underline"
                >
                  What is in the Fix Pack
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-rule/80 bg-paper-2/50">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">With a client</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl tracking-tight sm:text-4xl">
              Use the free check as the first screen, not as the deliverable.
            </h2>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2">
              {clientSteps.map((step) => (
                <li
                  key={step.n}
                  className="rounded-2xl border border-rule bg-cream p-5"
                >
                  <p className="kicker text-copper">{step.n}</p>
                  <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
              The longer on-page list you can leave with them, unpaid, is the{" "}
              <Link href="/checklist" className="text-forest underline">
                40-point checklist
              </Link>
              . How GEO differs from a rank report is{" "}
              <Link href="/geo-vs-seo" className="text-forest underline">
                GEO vs SEO
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="border-b border-rule/80">
          <div className="mx-auto max-w-5xl px-5 py-10">
            <p className="max-w-2xl text-sm leading-7 text-ink-soft">
              A separate{" "}
              <Link href="/geo-audit" className="text-forest underline">
                GEO audit
              </Link>{" "}
              PDF for one public URL is still for sale. The company on the{" "}
              <Link href="/sample" className="text-forest underline">
                sample report
              </Link>{" "}
              is fictional, and the page says so.{" "}
              <Link href="/terms" className="text-forest underline">
                Terms
              </Link>
              {" · "}
              <Link href="/refunds" className="text-forest underline">
                Refunds
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="border-b border-rule/80 bg-paper-2/50">
          <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.8fr)]">
            <div>
              <p className="kicker">The kit · $29</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                {agencyKitLabel}
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft leading-7">
                The kit is the writing around a client delivery. Buy it once.
                It is separate from the Fix Pack.
              </p>
              <ul className="mt-6 space-y-3">
                {kitContents.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-rule bg-cream px-4 py-3 text-sm leading-6"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-2xl border border-rule bg-cream p-6">
              <p className="kicker text-copper">Separate purchase</p>
              <p className="mt-3 font-serif text-5xl tracking-tight">$29</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                Template, pitch sequence, pricing tiers, one-pager, and a
                30-day SOP.
              </p>
              <a
                href={agencyKitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex h-12 items-center justify-center rounded-lg bg-ink text-cream hover:bg-forest-deep"
              >
                Buy the GEO Agency Kit
              </a>
            </aside>
          </div>
        </section>

        <section id="faq">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">FAQ</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
              What you can tell a client.
            </h2>
            <div className="mt-8 divide-y divide-rule border-y border-rule">
              {faqs.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="cursor-pointer list-none font-medium leading-7 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-6">
                      {item.q}
                      <span className="text-ink-soft group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <div className="mx-auto w-full max-w-2xl px-5 pb-14">
          <InlineSnapshotRequest source="/for-agencies" />
        </div>
      </main>
      <SiteFooter />
      <StickySnapshotOffer path="/for-agencies" />
    </>
  );
}
