import type { Metadata } from "next";
import Link from "next/link";
import { AuditForm } from "@/components/AuditForm";
import { FaqList } from "@/components/FaqList";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { FixPackOfferFacts } from "@/components/FixPackOfferFacts";
import { JsonLd } from "@/components/JsonLd";
import { ScoreRing } from "@/components/ScoreRing";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LlmsTxtCaveat } from "@/components/LlmsTxtCaveat";
import { SnapshotRequestForm } from "@/components/SnapshotRequestForm";
import { TrustLinks } from "@/components/TrustLinks";
import { rootOpenGraph, rootTwitter } from "@/lib/content/meta";
import { topicPages } from "@/lib/content/topics";
import { fixPackDeliverables } from "@/lib/fix-pack-offer";
import { faqPageJsonLd, snapshotOfferFaqs } from "@/lib/offer-faq";
import { sampleReport } from "@/lib/sample-report";
import {
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  site,
} from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...rootOpenGraph, url: "/" },
  twitter: rootTwitter,
};

const steps = [
  {
    n: "01",
    title: "Request a free snapshot",
    body: "Submit the business name, city, service, website, and email. We ask logged-out ChatGPT and Perplexity who they name for that trade and city. No payment.",
  },
  {
    n: "02",
    title: "See who was named",
    body: "The one-page snapshot lists who is named, which sources are cited, and how your Google rating and review count compare. AI answers vary run to run. This is a snapshot, not a ranking.",
  },
  {
    n: "03",
    title: `Fix Pack, ${fixPackIntroPriceLabel}`,
    body: `Introductory price, ${fixPackListPriceLabel} list. A Google Business Profile gap list, a review-gap plan and script, the directories AI cited, paste-ready LocalBusiness and Service JSON-LD with install steps, and a re-check 14 days later.`,
  },
];

const auditDeliverables = [
  "Overall CiteScore (0–100) and a plain-language grade",
  "Inferred snapshot for ChatGPT, Perplexity, and Google AI Overviews — not a live query",
  "Dimension scores — answers, entities, evidence, markup, freshness",
  "Ten prioritized fixes with effort, impact, and the exact page to change",
  "A print-ready PDF you can send to a founder or a client",
];

const faqs = [
  {
    q: "What is GEO?",
    a: "Generative Engine Optimization is the practice of making a site citable by AI search — ChatGPT, Perplexity, Google AI Overviews, and similar answer engines. Classic SEO still matters for blue links. GEO is about being the source those engines choose to quote.",
  },
  {
    q: "How is this different from an SEO audit?",
    a: "We do not grade your title-tag template or your backlink velocity. We look at whether a model can extract a definition, attribute a fact, and prefer you over a competitor’s blog. The output is a short list of page-level changes, not a 40-page crawl dump.",
  },
  {
    q: "Who is CiteScore for?",
    a: "Local service businesses that want to know who ChatGPT names for their trade and city, and the small agencies that serve them. The older $39 signal audit is still available for a founder who wants a score of public files.",
  },
  {
    q: "What do I actually get for $39?",
    a: "One scored report on one URL, delivered as a PDF (and a web view). About ten concrete fixes, ranked. No login, no seat, no monthly minimum. Weekly rescans at $29/mo are planned; they are not this product.",
  },
  {
    q: "What’s your refund policy?",
    a: "Full refund within 14 days if the Fix Pack is not useful. For the $39 audit, we refund within 14 days if the file is missing, unreadable, or about the wrong URL. The refunds page has both rules.",
  },
  {
    q: "You mention an LLM — what happens to my URL?",
    a: "The URL you submit, and publicly fetchable content from that site, may be sent to a large language model to help score visibility and draft fixes. Do not submit a URL whose public pages you are not allowed to have processed. We do not ask for passwords, sitemaps behind auth, or private docs. See Privacy.",
  },
  {
    q: "Do you actually query ChatGPT?",
    a: "The free AI Answer Snapshot does. We ask logged-out ChatGPT and Perplexity a local recommendation prompt and record who they name. The free signal check and the $39 audit do not. Those read public files and, for the paid audit, the HTML we fetch. AI answers vary run to run.",
  },
  {
    q: "How long until I get the report?",
    a: "After payment, typical turnaround is a few minutes. You get a PDF by email and a web copy of the same report. There is no account to babysit.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-rule/80">
          <div className="mx-auto grid max-w-5xl gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:py-20">
            <div>
              <p className="kicker">Free AI Answer Snapshot</p>
              <h1 className="mt-4 font-serif text-[2.35rem] leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">
                When customers ask ChatGPT for a plumber (or your trade) in
                your city, who does it name?
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
                Get a one-page snapshot of who is named, which sources are
                cited, and how your Google reviews compare. Then the Fix
                Pack, if you want the gaps closed.
              </p>
              <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
                <Link
                  href="/free-snapshot"
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream transition-colors hover:bg-forest-deep sm:w-auto"
                >
                  Get a free AI Answer Snapshot
                </Link>
                <FixPackBuyLink
                  compact
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink transition-colors hover:border-ink sm:w-auto"
                />
              </div>
              <p className="mt-4 text-sm leading-6">
                <Link
                  href="/fix-pack"
                  className="font-medium text-forest underline underline-offset-4 hover:underline"
                >
                  See what&apos;s in the Fix Pack
                </Link>
                <span className="text-ink-soft"> · </span>
                <Link
                  href="/sample-snapshot"
                  className="font-medium text-forest underline underline-offset-4 hover:underline"
                >
                  See an example snapshot
                </Link>
                <span className="text-ink-soft">
                  . Fictional business, illustrative numbers.
                </span>
              </p>
              <FixPackOfferFacts className="mt-4 max-w-xl" />
              <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">
                AI answers vary run to run. This is a snapshot, not a ranking.
                The{" "}
                <Link href="/free-check" className="text-forest underline">
                  free signal check
                </Link>{" "}
                is still available. It reads public files and does not ask
                ChatGPT who it names.
              </p>
            </div>

            <aside className="report-sheet rounded-2xl border border-rule p-6">
              <p className="kicker text-copper">Free · no checkout</p>
              <h2 className="mt-2 font-serif text-2xl leading-tight">
                Request the snapshot
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                Business name, city, service, website, and email. We reply with
                the one-page snapshot. Same request as the{" "}
                <Link href="/free-snapshot" className="text-forest underline">
                  free snapshot page
                </Link>
                .
              </p>
              <div className="mt-5">
                <SnapshotRequestForm />
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-rule/80">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">How it works</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
              Free snapshot first. Then the Fix Pack.
            </h2>
            <ol className="mt-10 grid gap-0 border-t border-rule sm:grid-cols-3">
              {steps.map((step) => (
                <li
                  key={step.n}
                  className="border-rule py-8 sm:border-r sm:px-6 sm:py-10 first:sm:pl-0 last:sm:border-r-0 last:sm:pr-0"
                >
                  <p className="kicker text-copper">{step.n}</p>
                  <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className="border-b border-rule/80">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <JsonLd data={faqPageJsonLd(snapshotOfferFaqs)} />
            <p className="kicker">FAQ</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
              Before you request a snapshot or the Fix Pack.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-ink-soft">
              What the one-page snapshot shows, what the {fixPackIntroPriceLabel}{" "}
              Fix Pack includes, and how to ask. More questions are on the{" "}
              <Link href="/faq" className="text-forest underline">
                FAQ
              </Link>{" "}
              page.
            </p>
            <FaqList items={snapshotOfferFaqs} />
          </div>
        </section>

        <section className="border-b border-rule/80 bg-paper-2/50">
          <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-2">
            <div>
              <p className="kicker">What you get</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                A one-page snapshot, then the fixes a local business can use.
              </h2>
              <p className="mt-4 text-ink-soft leading-7">
                The snapshot records a real answer from that day: who is
                named, which sources are cited, and how your Google rating
                and review count compare. The Fix Pack is the Google
                Business Profile, reviews, directories, and LocalBusiness
                markup that match what those answers cite. The{" "}
                {site.priceLabel} signal audit is still on this page, further
                down. It does not ask ChatGPT who it names.
              </p>
            </div>
            <div>
              <p className="kicker">In the Fix Pack</p>
              <ul className="mt-4 space-y-3">
                {fixPackDeliverables.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-xl border border-rule bg-cream px-4 py-3 text-sm leading-6"
                  >
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-ink-soft">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-rule/80">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="kicker">Sample report</p>
                <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                  See the artifact before you buy.
                </h2>
              </div>
              <Link
                href="/sample"
                className="text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                Open the Northbound sample
              </Link>
            </div>
            <p className="mt-4 max-w-2xl text-ink-soft leading-7">
              Fictional SaaS, real format. Score {sampleReport.overall}/100,
              eight dimensions, ten fixes. Labeled as a sample throughout —
              not a disguised testimonial. This preview is the older{" "}
              {site.priceLabel} signal audit.{" "}
              <Link href="/sample-snapshot" className="text-forest underline">
                The example AI Answer Snapshot
              </Link>{" "}
              is the one-page snapshot.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-rule report-sheet">
              <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
                <ScoreRing score={sampleReport.overall} />
                <div>
                  <p className="font-serif text-2xl">{sampleReport.product}</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {sampleReport.url} · {sampleReport.grade}
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">
                    {sampleReport.summary}
                  </p>
                </div>
              </div>
              <div className="grid border-t border-rule sm:grid-cols-4">
                {sampleReport.dimensions.slice(0, 4).map((dimension) => (
                  <div
                    key={dimension.id}
                    className="border-rule px-5 py-4 sm:border-r last:border-r-0"
                  >
                    <p className="kicker">{dimension.name}</p>
                    <p className="mt-2 font-serif text-3xl">{dimension.score}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="border-b border-rule/80">
          <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-[1fr_20rem]">
            <div>
              <p className="kicker">Pricing</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                Fix Pack, {fixPackIntroPriceLabel}. List {fixPackListPriceLabel}.
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft leading-7">
                One business, one city, one service. The snapshot is free.
                The Fix Pack is the gap list, the review script, the cited
                directories, the JSON-LD, and the 14-day re-check. Full
                refund within 14 days if it is not useful.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                <li>— Introductory {fixPackIntroPriceLabel}, list {fixPackListPriceLabel}</li>
                <li>— {fixPackIntroPriceLabel} card checkout on the buy button</li>
                <li>— The {site.priceLabel} signal audit remains available below</li>
              </ul>
              <div className="mt-6">
                <TrustLinks />
              </div>
              <div id="audit" className="mt-8 max-w-xl rounded-2xl border border-rule bg-cream p-5">
                <p className="kicker">Still available</p>
                <h3 className="mt-2 font-serif text-2xl">
                  {site.priceLabel} signal audit
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  One URL, one PDF, about ten fixes from public files. It
                  does not ask ChatGPT who it names. Weekly rescans at{" "}
                  {site.subscriptionPriceLabel} are not for sale.
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-ink-soft">
                  {auditDeliverables.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <AuditForm id="pricing-audit" />
                </div>
                <p className="mt-3 text-sm">
                  <a
                    href="/sample-audit.pdf"
                    className="font-medium text-forest underline underline-offset-4 hover:underline"
                  >
                    See a sample report (PDF)
                  </a>
                </p>
              </div>
            </div>
            <div className="report-sheet rounded-2xl border border-ink bg-ink px-6 py-7 text-cream">
              <p className="kicker text-[#d7c7b0]">Introductory</p>
              <p className="mt-3 font-serif text-6xl tracking-tight">
                {fixPackIntroPriceLabel}
              </p>
              <p className="mt-2 text-sm text-[#d7c7b0]">
                <span className="line-through">{fixPackListPriceLabel}</span>{" "}
                list · one business · 14-day re-check
              </p>
              <div className="mt-6">
                <FixPackBuyLink
                  tone="dark"
                  className="flex h-12 items-center justify-center rounded-lg bg-cream text-ink hover:bg-paper"
                />
              </div>
              <FixPackOfferFacts tone="dark" className="mt-4" />
            </div>
          </div>
        </section>

        <section className="border-b border-rule/80">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="kicker">Guides</p>
                <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                  Read the category before you buy another dashboard.
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                All guides
              </Link>
            </div>
            <p className="mt-4 max-w-2xl text-ink-soft leading-7">
              Editorial pages for founders searching GEO, ChatGPT citations,
              and Otterly-class alternatives. No invented testimonials.
            </p>
            <div className="mt-8 rounded-2xl border border-rule bg-cream p-5">
              <p className="kicker">Free on this page</p>
              <h3 className="mt-3 font-serif text-2xl tracking-tight">
                <Link href="/checklist" className="hover:text-forest">
                  AI Citation Readiness Checklist
                </Link>
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
                40 checks across crawler access, structured data,
                answer-ready content, evidence, and entity clarity. llms.txt
                is <LlmsTxtCaveat />. The full list is on the page. No email.
                The {site.priceLabel} audit scores one URL.
              </p>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              <li className="rounded-2xl border border-rule bg-cream p-5">
                <p className="kicker">Explainer</p>
                <h3 className="mt-3 font-serif text-xl">
                  <Link href="/blog/what-is-geo" className="hover:text-forest">
                    What is GEO?
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  Generative engine optimization, minus the prompt-hacking
                  folklore.
                </p>
              </li>
              <li className="rounded-2xl border border-rule bg-cream p-5">
                <p className="kicker">Checklist</p>
                <h3 className="mt-3 font-serif text-xl">
                  <Link
                    href="/blog/chatgpt-citation-checklist"
                    className="hover:text-forest"
                  >
                    ChatGPT citation checklist
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  Twelve on-page checks you can run on a SaaS homepage today.
                </p>
              </li>
              <li className="rounded-2xl border border-rule bg-cream p-5">
                <p className="kicker">Comparison</p>
                <h3 className="mt-3 font-serif text-xl">
                  <Link
                    href="/blog/citescore-vs-enterprise-geo-tools"
                    className="hover:text-forest"
                  >
                    vs enterprise GEO tools
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  {site.priceLabel} once versus Otterly-, Profound-, and
                  Peec-class monitors.{" "}
                  <Link
                    href="/alternatives/otterly"
                    className="text-forest underline"
                  >
                    vs Otterly
                  </Link>
                  {" · "}
                  <Link
                    href="/alternatives/peec-ai"
                    className="text-forest underline"
                  >
                    vs Peec AI
                  </Link>
                  {" · "}
                  <Link href="/geo-audit" className="text-forest underline">
                    GEO audit
                  </Link>
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className="border-b border-rule/80 bg-paper-2/50">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">Search pages</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
              Land on the page that matches the query.
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft leading-7">
              Separate URLs for a ChatGPT citation check, AI Overviews
              visibility, Perplexity footnotes, llms.txt, crawler tokens, AEO,
              Profound, and Peec AI. Same {site.priceLabel} audit. No second product
              hiding behind the headline.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {topicPages.map((page) => (
                <li
                  key={page.path}
                  className="rounded-2xl border border-rule bg-cream p-5"
                >
                  <p className="kicker">{page.kicker}</p>
                  <h3 className="mt-3 font-serif text-xl">
                    <Link href={page.path} className="hover:text-forest">
                      {page.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    {page.card}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="more-faq">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">FAQ</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
              Straight answers, including the uncomfortable ones.
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
                    {item.a}{" "}
                    {item.q === "What is GEO?" ? (
                      <Link
                        href="/blog/what-is-geo"
                        className="text-forest underline"
                      >
                        Longer explainer
                      </Link>
                    ) : null}
                    {item.q.includes("LLM") ? (
                      <Link href="/privacy" className="text-forest underline">
                        Privacy
                      </Link>
                    ) : null}
                    {item.q.includes("refund") ? (
                      <Link href="/refunds" className="text-forest underline">
                        Refunds
                      </Link>
                    ) : null}
                    {item.q.includes("actually query") ? (
                      <>
                        <Link href="/geo-audit" className="text-forest underline">
                          GEO audit methodology
                        </Link>
                        {" · "}
                        <Link
                          href="/chatgpt-citation-check"
                          className="text-forest underline"
                        >
                          ChatGPT citation check
                        </Link>
                      </>
                    ) : null}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
