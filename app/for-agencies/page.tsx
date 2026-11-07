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
  sellerName,
  site,
  whiteLabelAuditLabel,
  whiteLabelAuditUrl,
} from "@/lib/site";

const path = "/for-agencies";
const title = "Free snapshot and Fix Pack for agencies";
const description = `Agencies start each local client with the free AI Answer Snapshot, then the ${fixPackIntroPriceLabel} Fix Pack. The file check does not query ChatGPT. The snapshot does.`;

export const metadata: Metadata = {
  ...pageMeta({
    title,
    description,
    path,
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

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
    title: "Get a free AI Answer Snapshot",
    body: "Ask for the business name, the city, the main service, and the public site. The form is on the free snapshot page. No CiteScore account, and no payment.",
  },
  {
    n: "02",
    title: "Walk who was named",
    body: "One page: who is named, which sources are cited, and how the Google rating and review count compare. AI answers vary run to run. This is a snapshot, not a ranking.",
  },
  {
    n: "03",
    title: "Sell the Fix Pack",
    body: `The Fix Pack is ${fixPackIntroPriceLabel} introductory (${fixPackListPriceLabel} list), for one business, one city, and one service. Sell that pack, or pass those deliverables to the client under the engagement you already run. Do not present CiteScore as your staff.`,
  },
  {
    n: "04",
    title: "Keep the file check separate",
    body: "The free signal check reads public files. It does not query ChatGPT. Use it when you want those rows. Do not hand a client the check and call it the snapshot.",
  },
];

const faqs = [
  {
    q: "How does an agency start a local client?",
    a: `Request the free AI Answer Snapshot for the business, the city, the service, and the public site. It asks logged-out ChatGPT and Perplexity who they name and sends one page. Then sell the ${fixPackIntroPriceLabel} Fix Pack, or pass those deliverables to the client under the engagement you already run. AI answers vary run to run. This is a snapshot, not a ranking.`,
  },
  {
    q: "Does the free snapshot query ChatGPT?",
    a: "Yes. It asks logged-out ChatGPT and Perplexity who they name for that trade and city. AI answers vary run to run. It is a snapshot, not a ranking, and not a promise that any assistant will name the business.",
  },
  {
    q: "Does the free signal check query ChatGPT?",
    a: "No. The free check reads public files: the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, llms.txt, a sitemap, and JSON-LD on the homepage. It does not log into ChatGPT, Perplexity, or Google AI Overviews. Do not hand a client the file check and call it the snapshot.",
  },
  {
    q: "What is in the Fix Pack?",
    a: `Introductory price ${fixPackIntroPriceLabel}. List price ${fixPackListPriceLabel}. One business, one city, one service. A Google Business Profile gap list, a review-gap plan and script, the directories an AI answer cited, paste-ready LocalBusiness and Service JSON-LD, and a re-check 14 days later. It is not a promise that any assistant will name the business. The Fix Pack email comes from CiteScore. It is not an unbranded file.`,
  },
  {
    q: "Can I show the format before a client pays?",
    a: "Yes. The example snapshot and the sample Fix Pack are fictional and the pages say so. They show the layout. They are not customer results.",
  },
  {
    q: "Are the white-label audit and the kit still for sale?",
    a: `Yes, as separate older files, not as the way to start a client. The ${whiteLabelAuditLabel} is an unbranded PDF, delivered within 3 business days. The ${agencyKitLabel} is a client report template, a pitch email sequence, pricing tiers, a one-pager, and a 30-day delivery SOP. Checkout for both stays in the closed section on this page.`,
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
              <p className="kicker">For SEO and GEO agencies</p>
              <h1 className="mt-4 font-serif text-[2.35rem] leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.1]">
                Start every local client with a free AI Answer Snapshot.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
                Then sell the Fix Pack ({fixPackIntroPriceLabel} introductory,{" "}
                {fixPackListPriceLabel} list), or pass those deliverables to
                the client under the engagement you already run. The snapshot
                asks logged-out ChatGPT and Perplexity who they name. The free
                file check does not.
              </p>
              <div className="mt-8 max-w-xl">
                <IndustrySnapshotCta variant="general" />
              </div>
              <p className="mt-4 text-sm leading-6 text-ink-soft">
                Prepared by the CiteScore Team. If you own the business, the
                comparison with hiring an agency is on{" "}
                <Link href="/vs-agency" className="text-forest underline">
                  Fix Pack vs an agency retainer
                </Link>
                .
              </p>
            </div>
            <aside className="report-sheet rounded-2xl border border-rule p-6">
              <p className="kicker">The client path</p>
              <dl className="mt-4 space-y-5 text-sm leading-6">
                <div>
                  <dt className="font-medium text-ink">
                    <Link href="/free-snapshot" className="text-forest underline">
                      Free AI Answer Snapshot
                    </Link>
                  </dt>
                  <dd className="mt-1 text-ink-soft">
                    Who is named, which sources are cited, and how the Google
                    rating and review count compare. No payment.
                  </dd>
                </div>
                <div className="border-t border-rule pt-5">
                  <dt className="font-medium text-ink">
                    <Link href="/fix-pack" className="text-forest underline">
                      Fix Pack, {fixPackIntroPriceLabel}
                    </Link>
                  </dt>
                  <dd className="mt-1 text-ink-soft">
                    The done-for-you work after the client has seen who was
                    named. One business, one city, one service.
                  </dd>
                </div>
              </dl>
              <Link
                href="/sample-snapshot"
                className="mt-6 inline-flex text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                Example snapshot — fictional, labeled
              </Link>
              <Link
                href="/sample-fix-pack"
                className="mt-3 inline-flex text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                Sample Fix Pack — illustrative, not a client
              </Link>
            </aside>
          </div>
        </section>

        <section className="border-b border-rule/80">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">What you sell next</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl tracking-tight sm:text-4xl">
              The snapshot shows who was named. The Fix Pack is the work after that.
            </h2>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-rule bg-cream p-6">
                <p className="kicker">Free · no payment</p>
                <h3 className="mt-3 font-serif text-2xl">The AI Answer Snapshot</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  CiteScore asks logged-out ChatGPT and Perplexity who they
                  name for that trade and city. The client gets one page. AI
                  answers vary run to run. This is a snapshot, not a ranking.
                </p>
                <Link
                  href="/free-snapshot"
                  className="mt-6 inline-flex text-sm font-medium text-forest underline-offset-4 hover:underline"
                >
                  Get a free AI Answer Snapshot
                </Link>
              </div>
              <div className="rounded-2xl border border-rule p-6">
                <p className="kicker">After the snapshot</p>
                <h3 className="mt-3 font-serif text-2xl">
                  The Fix Pack ({fixPackIntroPriceLabel})
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Introductory price {fixPackIntroPriceLabel}. List price{" "}
                  {fixPackListPriceLabel}. One business, one city, one
                  service. It is not a promise that any assistant will name
                  the business.
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
                  See what&apos;s in the Fix Pack
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-rule/80 bg-paper-2/50">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">With a client</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl tracking-tight sm:text-4xl">
              Snapshot first. Fix Pack second.
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
            <p className="mt-6 max-w-2xl text-sm leading-6 text-ink-soft">
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
          <div className="mx-auto max-w-5xl px-5 py-14">
            <p className="kicker">A different tool</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl tracking-tight sm:text-4xl">
              The free signal check does not query ChatGPT.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-soft">
              The snapshot does. The check reads public files on the host. Use
              it when you want those rows on a call. Do not hand a client the
              check and call it the snapshot. llms.txt is <LlmsTxtCaveat />.
            </p>
            <ul className="mt-6 max-w-2xl space-y-3">
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
              Open the free signal check
            </Link>
          </div>
        </section>

        <section className="border-b border-rule/80">
          <div className="mx-auto max-w-5xl px-5 py-6">
            <details id="white-label" className="group border-t border-rule">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 py-3 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">
                  <span className="block font-medium text-ink">
                    Older agency files
                  </span>
                  <span className="mt-0.5 block text-sm font-normal leading-6 text-ink-soft">
                    The {whiteLabelAuditLabel} and the {agencyKitLabel}. Separate
                    from the snapshot and the Fix Pack.
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto text-xl leading-none text-ink-soft group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="grid gap-4 pb-6 lg:grid-cols-2">
                <article className="rounded-2xl border border-rule bg-cream p-6">
                  <p className="font-serif text-2xl tracking-tight text-ink">
                    {whiteLabelAuditLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    An unbranded PDF of one public URL, delivered within 3
                    business days, with no CiteScore branding, so you can hand
                    it to a client. This is not the Fix Pack.
                  </p>
                  <a
                    href={whiteLabelAuditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex h-12 items-center justify-center rounded-lg border border-ink/30 bg-cream text-ink hover:border-ink hover:bg-paper-2"
                  >
                    Buy the white-label audit
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <a
                    href="/sample-audit.pdf"
                    className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-forest underline underline-offset-4"
                  >
                    See a sample report (PDF)
                  </a>
                </article>
                <article className="rounded-2xl border border-rule bg-cream p-6">
                  <p className="font-serif text-2xl tracking-tight text-ink">
                    {agencyKitLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    The writing around a client delivery. Buy it once. It is
                    not a scored URL, and it is separate from the Fix Pack.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {kitContents.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={agencyKitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex h-12 items-center justify-center rounded-lg border border-ink/30 bg-cream text-ink hover:border-ink hover:bg-paper-2"
                  >
                    Buy the GEO Agency Kit
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </article>
              </div>
              <p className="pb-4 text-sm leading-6 text-ink-soft">
                The business on the{" "}
                <Link href="/sample-snapshot" className="text-forest underline">
                  example snapshot
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
            </details>
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
