import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import {
  doneForYouAuditLabel,
  doneForYouAuditUrl,
  publicOrigin,
  site,
  whiteLabelAuditLabel,
  whiteLabelAuditUrl,
} from "@/lib/site";

const path = "/done-for-you-audit";
const title = "Done-For-You AI Search Audit";
const description =
  "A $99 Done-For-You AI Search Audit: a written walkthrough for one public URL, delivered within 3 business days. CiteScore does not query live ChatGPT, Perplexity, or Google AI Overviews.";

export const metadata: Metadata = pageMeta({
  title,
  description,
  path,
});

const includes = [
  "One public URL",
  "A written walkthrough of the AI search audit",
  "Delivery within 3 business days",
];

const faqs = [
  {
    q: "What do I get for $99?",
    a: "A written walkthrough of the AI search audit for one public URL, delivered within 3 business days.",
  },
  {
    q: "Do you query ChatGPT?",
    a: "No. CiteScore does not log into ChatGPT, Perplexity, or Google AI Overviews. The walkthrough is written from the public page.",
  },
  {
    q: "How is this different from the $39 audit?",
    a: "The $39 audit is the self-serve PDF: a 0–100 CiteScore and about ten fixes, usually ready a few minutes after payment. This $99 audit is a written walkthrough, delivered within 3 business days.",
  },
];

export default function DoneForYouAuditPage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: doneForYouAuditLabel,
          description,
          url: `${origin}${path}`,
          provider: { "@type": "Organization", name: site.name, url: origin },
          offers: {
            "@type": "Offer",
            price: "99",
            priceCurrency: "USD",
            url: doneForYouAuditUrl,
          },
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
          <div className="mx-auto grid max-w-5xl gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.75fr)] lg:items-center lg:py-20">
            <div>
              <p className="kicker">Done for you</p>
              <h1 className="mt-4 font-serif text-[2.35rem] leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">
                {title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
                Send one public URL. You get a written walkthrough, delivered
                within 3 business days. The free check is still there if you
                want to look at the public files first.
              </p>
              <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
                <a
                  href={doneForYouAuditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream transition-colors hover:bg-forest-deep"
                >
                  Buy the $99 audit
                </a>
                <Link
                  href="/free-check"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink transition-colors hover:border-ink"
                >
                  Run the free check
                </Link>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">
                CiteScore reads public pages. It does not log into ChatGPT,
                Perplexity, or Google AI Overviews.
              </p>
            </div>
            <aside className="report-sheet rounded-2xl border border-ink bg-ink px-6 py-7 text-cream">
              <p className="kicker text-[#d7c7b0]">One URL</p>
              <p className="mt-3 font-serif text-6xl tracking-tight">$99</p>
              <p className="mt-2 text-sm text-[#d7c7b0]">
                Written walkthrough · 3 business days
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6">
                {includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d7c7b0]" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="border-b border-rule/80">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">What you receive</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl tracking-tight sm:text-4xl">
              A written walkthrough of one public page.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-rule bg-cream p-5">
                <p className="kicker">You send</p>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  One public URL. Skip pages behind a login. The page has to
                  be one you are allowed to have processed.
                </p>
              </div>
              <div className="rounded-2xl border border-rule bg-cream p-5">
                <p className="kicker">You get</p>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  A written walkthrough of the AI search audit for that URL.
                </p>
              </div>
              <div className="rounded-2xl border border-rule bg-cream p-5">
                <p className="kicker">When</p>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Within 3 business days of the order.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-7 text-ink-soft">
              The self-serve version is the{" "}
              <Link href="/geo-audit" className="text-forest underline">
                {site.priceLabel} GEO audit
              </Link>
              : a 0–100 CiteScore and about ten fixes, as a PDF, usually a
              few minutes after payment. Agencies who need an unbranded file
              for a client can buy the{" "}
              <a
                href={whiteLabelAuditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest underline"
              >
                {whiteLabelAuditLabel}
              </a>{" "}
              from the{" "}
              <Link href="/for-agencies" className="text-forest underline">
                agency page
              </Link>
              . That PDF is delivered within 3 business days.
            </p>
          </div>
        </section>

        <section id="faq">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">FAQ</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
              Before you buy.
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
            <a
              href={doneForYouAuditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-ink px-5 font-medium text-cream hover:bg-forest-deep"
            >
              Buy the $99 audit
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
