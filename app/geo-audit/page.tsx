import type { Metadata } from "next";
import Link from "next/link";
import { AuditForm } from "@/components/AuditForm";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin, site } from "@/lib/site";

const description =
  "A one-time generative engine optimization audit. On-page GEO signals plus an LLM review of public HTML — not a live ChatGPT login. PDF with a 0–100 score and about ten fixes.";

export const metadata: Metadata = pageMeta({
  title: "GEO audit for SaaS — $39 AI-visibility report",
  description,
  path: "/geo-audit",
});

const included = [
  "Overall CiteScore (0–100) and a plain-language grade",
  "Inferred snapshot for ChatGPT, Perplexity, and Google AI Overviews",
  "Dimension scores: answers, entities, evidence, markup, freshness, crawlers",
  "About ten prioritized fixes with effort, impact, and the page to change",
  "A print-ready PDF, emailed, plus a web copy of the same report",
];

const faqs = [
  {
    q: "Do you query ChatGPT?",
    a: "No. We do not log into ChatGPT, Perplexity, or Google AI Overviews. The engine snapshot is inferred from on-page signals and, when configured, a language-model review of the HTML we fetched. The report says so.",
  },
  {
    q: "What URL should I submit?",
    a: "The public page you want cited — usually the homepage. Docs or a landing URL you send to buyers also work. Do not submit anything behind a login.",
  },
  {
    q: "How is this different from Otterly or Profound?",
    a: "Those products monitor live prompts over time and charge a monthly seat. CiteScore is a one-off punch list for $39. If you need a mention dashboard, buy a monitor after you fix the page.",
  },
];

export default function GeoAuditPage() {
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
          "@type": "Service",
          name: `${site.name} GEO audit`,
          provider: { "@type": "Organization", name: site.name, url: origin },
          description,
          offers: {
            "@type": "Offer",
            price: String(site.price),
            priceCurrency: "USD",
            url: `${origin}/#audit`,
          },
        }}
      />
      <SiteHeader />
      <main>
        <section className="border-b border-rule/80">
          <div className="mx-auto grid max-w-5xl gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] lg:py-20">
            <div>
              <p className="kicker">GEO audit</p>
              <h1 className="mt-4 font-serif text-[2.2rem] leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">
                A {site.priceLabel} generative engine optimization audit —
                one URL, one PDF.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
                Built for indie SaaS founders and small SEO shops who need
                to know whether ChatGPT <em>could</em> cite the page, and
                what to change this week. Not a live login. Not a monthly
                dashboard.
              </p>
              <div id="audit" className="mt-8 max-w-xl">
                <AuditForm id="geo-audit-form" />
              </div>
            </div>
            <aside className="report-sheet rounded-2xl border border-rule p-6">
              <p className="kicker text-copper">Methodology</p>
              <h2 className="mt-3 font-serif text-2xl">
                On-page signals + an LLM review.
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                We fetch publicly available HTML (and a few same-host
                pages such as /about, /pricing, /faq). We score definitions,
                entities, evidence, schema, freshness, and crawler access
                (GPTBot, PerplexityBot, Google-Extended, llms.txt). A
                language model, when configured, rewrites the summary and
                the fix list from those extracts.
              </p>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                We do not claim a screenshot of ChatGPT, Perplexity, or
                Google AI Overviews.{" "}
                <Link href="/privacy" className="text-forest underline">
                  Privacy
                </Link>{" "}
                covers what an LLM may see.
              </p>
            </aside>
          </div>
        </section>

        <section className="border-b border-rule/80 bg-paper-2/50">
          <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-2">
            <div>
              <p className="kicker">Deliverable</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight">
                The same artifact as the homepage — scored, ranked, emailed.
              </h2>
              <p className="mt-4 text-ink-soft leading-7">
                Typical turnaround after payment is a few minutes. Refund
                within 14 days if the file is missing, unreadable, or about
                the wrong URL — not if you dislike the score.
              </p>
              <p className="mt-4 text-sm leading-6 text-ink-soft">
                Preview the format on the{" "}
                <Link href="/sample" className="text-forest underline">
                  Northbound sample
                </Link>{" "}
                (fictional company, labeled throughout).
              </p>
            </div>
            <ul className="space-y-3">
              {included.map((item) => (
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
            <p className="kicker">Who this is for</p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="font-serif text-2xl">Buy this if</h2>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  You own a public SaaS page, you cannot staff a GEO
                  practice, and you want a Monday list — not another login.
                  Agencies use it as the first artifact in a client
                  engagement.
                </p>
              </div>
              <div>
                <h2 className="font-serif text-2xl">Skip this if</h2>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  You need daily prompt tracking, competitor citation share,
                  or SSO. That is{" "}
                  <Link
                    href="/alternatives/otterly"
                    className="text-forest underline"
                  >
                    Otterly
                  </Link>{" "}
                  or a{" "}
                  <Link
                    href="/blog/citescore-vs-enterprise-geo-tools"
                    className="text-forest underline"
                  >
                    Profound-class suite
                  </Link>
                  . Fix the page first; measure later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">FAQ</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight">
              The uncomfortable answers, again.
            </h2>
            <div className="mt-8 divide-y divide-rule border-y border-rule">
              {faqs.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="cursor-pointer list-none font-medium leading-7 marker:content-none [&::-webkit-details-marker]:hidden">
                    {item.q}
                  </summary>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-sm text-ink-soft">
              Further reading:{" "}
              <Link href="/blog/what-is-geo" className="text-forest underline">
                What is GEO?
              </Link>
              {" · "}
              <Link
                href="/blog/chatgpt-citation-checklist"
                className="text-forest underline"
              >
                ChatGPT citation checklist
              </Link>
              {" · "}
              <Link href="/blog" className="text-forest underline">
                All guides
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
