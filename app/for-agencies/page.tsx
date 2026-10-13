import type { Metadata } from "next";
import Link from "next/link";
import { AuditForm } from "@/components/AuditForm";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import {
  agencyKitLabel,
  agencyKitUrl,
  publicOrigin,
  site,
  whiteLabelAuditLabel,
  whiteLabelAuditUrl,
} from "@/lib/site";

const path = "/for-agencies";
const title = "GEO audits for SEO agencies";
const description =
  "How an SEO agency uses the free CiteScore check, the $39 audit, the $149 white-label PDF, and the $29 GEO Agency Kit. The check reads public files. It does not query ChatGPT.";

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

const auditIncludes = [
  "A 0–100 CiteScore and a plain-language grade for one public URL",
  "Dimension scores for answers, entities, evidence, markup, freshness, and crawler access",
  "An inferred snapshot for ChatGPT, Perplexity, and Google AI Overviews",
  "About ten prioritized fixes, with effort, impact, and the page to change",
  "A PDF by email, and a web copy of the same report",
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
    body: "A disallow on GPTBot, PerplexityBot, or Google-Extended is a line in robots.txt you can open together. A missing llms.txt, sitemap, or JSON-LD block is the same kind of fact.",
  },
  {
    n: "04",
    title: "Say what a pass means",
    body: "A passing row means that signal is present on the public file. It is the start of the conversation. The citation itself is what the $39 audit turns into a punch list.",
  },
];

const faqs = [
  {
    q: "Does the free check query ChatGPT for the client?",
    a: "No. It reads public files on the host: the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, llms.txt, a sitemap, and JSON-LD on the homepage. It does not log into ChatGPT, Perplexity, or Google AI Overviews.",
  },
  {
    q: "What do I hand over from the $39 audit?",
    a: "One PDF for one URL, plus a web copy of the same report. It has a 0–100 CiteScore, dimension scores, an inferred engine snapshot, and about ten prioritized fixes. The snapshot is an inference from the HTML we fetched. The report says so.",
  },
  {
    q: "What is the white-label audit?",
    a: "An unbranded PDF of the AI search audit, for $149, delivered within 3 business days. It is a separate purchase from the $39 self-serve audit and the $29 kit.",
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
      <main>
        <section className="border-b border-rule/80">
          <div className="mx-auto grid max-w-5xl gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:py-20">
            <div>
              <p className="kicker">For SEO agencies</p>
              <h1 className="mt-4 font-serif text-[2.35rem] leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">
                Sell an AI-search audit with a page you can show on the call.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
                The free check reads a client&apos;s public files. The{" "}
                {site.priceLabel} audit is the PDF. The {agencyKitLabel} is
                the proposal, the pricing, and the 30-day delivery around
                that PDF.
              </p>
              <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
                <Link
                  href="/free-check"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream transition-colors hover:bg-forest-deep"
                >
                  Run the free check
                </Link>
                <a
                  href={agencyKitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink transition-colors hover:border-ink"
                >
                  Get the kit — $29
                </a>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">
                CiteScore fetches public HTML. It does not log into ChatGPT,
                Perplexity, or Google AI Overviews.
              </p>
            </div>
            <aside className="report-sheet rounded-2xl border border-rule p-6">
              <p className="kicker text-copper">Two purchases, two jobs</p>
              <dl className="mt-4 space-y-5 text-sm leading-6">
                <div>
                  <dt className="font-medium text-ink">
                    {site.priceLabel} GEO audit
                  </dt>
                  <dd className="mt-1 text-ink-soft">
                    One client URL. A score and about ten fixes, as a PDF you
                    can forward.
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
            </aside>
          </div>
        </section>

        <section id="white-label" className="border-b border-rule/80 bg-ink text-cream">
          <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.7fr)] lg:items-center">
            <div>
              <p className="kicker text-[#d7c7b0]">For client delivery</p>
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
                <p className="kicker">{site.priceLabel} · one URL</p>
                <h3 className="mt-3 font-serif text-2xl">The audit</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  We fetch the URL you submit and a few same-host pages, such
                  as /about, /pricing, and /faq, plus robots.txt, llms.txt,
                  and the sitemap. When a language-model key is configured,
                  that review uses the HTML we fetched.{" "}
                  <Link href="/privacy" className="text-forest underline">
                    Privacy
                  </Link>{" "}
                  covers what may be sent.
                </p>
                <ul className="mt-5 space-y-3">
                  {auditIncludes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/geo-audit"
                  className="mt-6 inline-flex text-sm font-medium text-forest underline-offset-4 hover:underline"
                >
                  GEO audit methodology
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

        <section id="audit" className="border-b border-rule/80">
          <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)]">
            <div>
              <p className="kicker">The {site.priceLabel} audit</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                One client URL. One PDF you can send.
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft leading-7">
                Submit the public page you are allowed to have processed.
                Typical turnaround after payment is a few minutes. Refund
                within 14 days if the file is missing, unreadable, or about
                the wrong URL. Weekly rescans at {site.subscriptionPriceLabel}{" "}
                are on the roadmap. They are not for sale on this page.
              </p>
              <p className="mt-4 text-sm leading-6 text-ink-soft">
                Show the format first on the{" "}
                <Link href="/sample" className="text-forest underline">
                  sample report
                </Link>
                . The company on that page is fictional, and the page says so.
              </p>
              <div className="mt-8 max-w-xl">
                <AuditForm id="agencies-audit" />
              </div>
            </div>
            <div className="report-sheet rounded-2xl border border-ink bg-ink px-6 py-7 text-cream">
              <p className="kicker text-[#d7c7b0]">Client audit</p>
              <p className="mt-3 font-serif text-5xl tracking-tight">
                {site.priceLabel}
              </p>
              <p className="mt-2 text-sm text-[#d7c7b0]">
                One URL · PDF · about ten fixes
              </p>
              <p className="mt-6 text-sm leading-6 text-[#d7c7b0]">
                Paste the client URL in the form. Checkout is a one-time
                payment. The PDF is the file you forward.
              </p>
            </div>
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
                The kit is the delivery around the audit. Buy it once. Each
                URL you score is still a separate {site.priceLabel} audit.
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
      </main>
      <SiteFooter />
    </>
  );
}
