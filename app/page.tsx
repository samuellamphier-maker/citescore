import Link from "next/link";
import { AuditForm } from "@/components/AuditForm";
import { ScoreRing } from "@/components/ScoreRing";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { sampleReport } from "@/lib/sample-report";
import { site } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Paste the URL",
    body: "The public page you want cited — homepage, docs, or a landing URL you send to buyers.",
  },
  {
    n: "02",
    title: "We score AI visibility",
    body: "A CiteScore from 0–100 across ChatGPT, Perplexity, and Google AI Overviews, with a dimension breakdown.",
  },
  {
    n: "03",
    title: "You get ~10 concrete fixes",
    body: "A PDF you can action this week: what to write, where to put it, and why a model would then cite you.",
  },
];

const deliverables = [
  "Overall CiteScore (0–100) and a plain-language grade",
  "Per-engine snapshot: ChatGPT, Perplexity, Google AI Overviews",
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
    a: "Indie SaaS founders who cannot staff a GEO practice, and small SEO agencies that need a client-ready artifact without building an AI-visibility practice from scratch. If you already have an in-house content ops team, you may not need this.",
  },
  {
    q: "What do I actually get for $39?",
    a: "One scored report on one URL, delivered as a PDF (and a web view). About ten concrete fixes, ranked. No login, no seat, no monthly minimum. Weekly rescans at $29/mo are planned; they are not this product.",
  },
  {
    q: "What’s your refund policy?",
    a: "If the report is missing, unreadable, or clearly about the wrong URL, email us within 14 days and we refund the $39. We do not refund because you dislike the score or choose not to implement the fixes.",
  },
  {
    q: "You mention an LLM — what happens to my URL?",
    a: "The URL you submit, and publicly fetchable content from that site, may be sent to a large language model to help score visibility and draft fixes. Do not submit a URL whose public pages you are not allowed to have processed. We do not ask for passwords, sitemaps behind auth, or private docs. See Privacy.",
  },
  {
    q: "Is this live scoring or a pre-sell?",
    a: "This site is the pre-sell. Checkout collects payment (or your email if payments are not wired yet). The crawler, scorer, and PDF email ship in the next build. You are buying a real audit, fulfilled as that engine comes online — not a fake “instant AI” demo.",
  },
  {
    q: "How long until I get the report?",
    a: "Once the engine is live, typical turnaround is same day. During this pre-sell window we email you when your audit is ready. There is no account to babysit.",
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
              <p className="kicker">GEO audit · ChatGPT · Perplexity · AI Overviews</p>
              <h1 className="mt-4 font-serif text-[2.35rem] leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">
                Would ChatGPT cite your product — or a competitor’s blog post?
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
                CiteScore is a {site.priceLabel} AI-visibility audit for indie
                SaaS founders and small SEO shops. Paste a URL. Get a 0–100
                score and the concrete changes that would get you cited.
              </p>
              <div id="audit" className="mt-8 max-w-xl">
                <AuditForm id="hero-audit" />
              </div>
            </div>

            <aside className="report-sheet rounded-2xl border border-rule p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="kicker text-copper">Sample · not a real customer</p>
                  <p className="mt-2 font-serif text-2xl leading-tight">
                    {sampleReport.product}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {sampleReport.oneLiner}
                  </p>
                </div>
                <ScoreRing score={sampleReport.overall} size={112} />
              </div>
              <dl className="mt-6 space-y-3 border-t border-rule pt-5 text-sm">
                {sampleReport.engines.map((engine) => (
                  <div key={engine.engine} className="flex justify-between gap-4">
                    <dt className="text-ink-soft">{engine.engine}</dt>
                    <dd className="text-right font-medium">{engine.status}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/sample"
                className="mt-6 inline-flex text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                Read the full sample report
              </Link>
            </aside>
          </div>
        </section>

        <section className="border-b border-rule/80">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">How it works</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
              Three steps. A score. A short list.
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

        <section className="border-b border-rule/80 bg-paper-2/50">
          <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-2">
            <div>
              <p className="kicker">What you get</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                A report you can hand to a founder without translating it.
              </h2>
              <p className="mt-4 text-ink-soft leading-7">
                Agencies use it as the first artifact in a GEO engagement.
                Founders use it as a Monday punch list. Either way, it is a
                scored audit — not a chatbot transcript.
              </p>
            </div>
            <ul className="space-y-3">
              {deliverables.map((item) => (
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
              not a disguised testimonial.
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
                {site.priceLabel} once. Keep the PDF.
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft leading-7">
                One URL, one audit, one report. No trial that becomes a card
                on file. Weekly rescans at {site.subscriptionPriceLabel} are
                on the roadmap for teams who want to watch the score move —
                they are not required, and they are not for sale on this page.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                <li>— Refund if we send the wrong URL or a broken file</li>
                <li>— Built for one founder or one client engagement</li>
                <li>— Payment link checkout (Stripe or Lemon Squeezy)</li>
              </ul>
            </div>
            <div className="report-sheet rounded-2xl border border-ink bg-ink px-6 py-7 text-cream">
              <p className="kicker text-[#d7c7b0]">One-time audit</p>
              <p className="mt-3 font-serif text-6xl tracking-tight">
                {site.priceLabel}
              </p>
              <p className="mt-2 text-sm text-[#d7c7b0]">
                PDF report · ~10 fixes · no account
              </p>
              <Link
                href="/#audit"
                className="mt-6 flex h-12 items-center justify-center rounded-lg bg-cream text-ink hover:bg-paper"
              >
                Paste a URL to start
              </Link>
              <p className="mt-4 text-xs leading-5 text-[#d7c7b0]">
                Coming later: {site.subscriptionPriceLabel} weekly rescans.
                Mentioned so you know the roadmap — not so we upsell you today.
              </p>
            </div>
          </div>
        </section>

        <section id="faq">
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
                    {item.q.includes("LLM") ? (
                      <Link href="/privacy" className="text-forest underline">
                        Privacy
                      </Link>
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
