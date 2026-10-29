import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { FixPackOfferFacts } from "@/components/FixPackOfferFacts";
import { JsonLd } from "@/components/JsonLd";
import { SnapshotRequestForm } from "@/components/SnapshotRequestForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { faqPageJsonLd, snapshotOfferFaqs } from "@/lib/offer-faq";
import {
  contactEmail,
  fixPackGetCtaLabel,
  fixPackIntroPriceLabel,
  sellerName,
} from "@/lib/site";

const sonickStudy = "https://sonickmarketing.com/blog/chatgpt-local-business-study/";

const exampleBanner =
  "Example only: fictional business, fictional competitors, illustrative numbers.";

const prompts = [
  {
    engine: "ChatGPT, logged out",
    prompt: "best plumber in Riverton, USA",
    kind: "Primary prompt",
  },
  {
    engine: "ChatGPT, logged out",
    prompt: "best emergency plumber in Riverton, USA",
    kind: "Variant",
  },
  {
    engine: "Perplexity",
    prompt: "best plumber in Riverton, USA",
    kind: "Primary prompt",
  },
  {
    engine: "Perplexity",
    prompt: "best emergency plumber in Riverton, USA",
    kind: "Variant",
  },
];

const named = [
  {
    engine: "ChatGPT example",
    names: ["Sample Rooter Co.", "Fictional Fixture Works", "Demo Drain Co."],
    absent: "Example Plumbing Co. is not named on either prompt.",
  },
  {
    engine: "Perplexity example",
    names: ["Fictional Fixture Works", "Sample Rooter Co."],
    absent: "Example Plumbing Co. is not named on either prompt.",
  },
];

const sources = [
  {
    name: "Example Trades Directory",
    where: "example-trades.example/riverton",
    cited: "Cited in both the ChatGPT example and the Perplexity example.",
  },
  {
    name: "Example City List",
    where: "example.com/riverton-trades",
    cited: "Cited in the Perplexity example only.",
  },
];

const comparisons = [
  {
    business: "Example Plumbing Co.",
    role: "Prospect in this example",
    domain: "example-plumbing.example",
    named: "Not named",
    rating: "4.6",
    reviews: "22",
    versus: "Baseline for this example",
  },
  {
    business: "Sample Rooter Co.",
    role: "Fictional competitor",
    domain: "sample-rooter.example",
    named: "ChatGPT and Perplexity",
    rating: "4.9",
    reviews: "310",
    versus: "Higher illustrative rating and review count than 22",
  },
  {
    business: "Fictional Fixture Works",
    role: "Fictional competitor",
    domain: "fictional-fixtures.example",
    named: "ChatGPT and Perplexity",
    rating: "4.8",
    reviews: "180",
    versus: "Higher illustrative rating and review count than 22",
  },
  {
    business: "Demo Drain Co.",
    role: "Fictional competitor",
    domain: "demo-drain.example",
    named: "ChatGPT only",
    rating: "4.7",
    reviews: "95",
    versus: "Higher illustrative rating and review count than 22",
  },
];

const gaps = [
  {
    title: "Not named in the example answers",
    found:
      "Example Plumbing Co. does not appear in the ChatGPT example or the Perplexity example, on either prompt.",
    fix: "The Fix Pack would not promise that a later answer names the business. It would do the profile, review, directory, and markup work below, then ask the same prompts again 14 days later and write who is named the second time next to the first snapshot.",
  },
  {
    title: "Fewer illustrative reviews than the named competitors",
    found:
      "Example Plumbing Co. is written with an illustrative Google review count of 22. The named competitors are written with 95, 180, and 310.",
    fix: "The Fix Pack would include a review-gap plan that sets those counts side by side, plus a copy-paste SMS and email the business can send to ask for a Google review.",
  },
  {
    title: "Missing from the directories this example cites",
    found:
      "This example says both answers cite Example Trades Directory, and the Perplexity example also cites Example City List. Example Plumbing Co. is written as absent from both.",
    fix: "The Fix Pack would list the directories and trade bodies the snapshot’s answers cited, and mark where the business is missing. On a real snapshot those names come from that day’s answers. Here they are the fictional directories above.",
  },
  {
    title: "A thinner profile in the illustration",
    found:
      "The example writes Example Plumbing Co. with a shorter service list than Sample Rooter Co., no photos, and hours that do not match example-plumbing.example.",
    fix: "The Fix Pack would include a Google Business Profile gap list against the businesses the snapshot names: category, services, hours, photos, and Q&A.",
  },
  {
    title: "No LocalBusiness or Service JSON-LD",
    found:
      "example-plumbing.example is written with no LocalBusiness or Service script.",
    fix: "The Fix Pack would include paste-ready LocalBusiness and Service JSON-LD, plus install steps for WordPress, Wix, Squarespace, and Shopify. The script is written to match the name, phone, and address already on the page.",
  },
];

export const metadata: Metadata = {
  ...pageMeta({
    title: "Example AI Answer Snapshot",
    description:
      "Example only: a fictional AI Answer Snapshot for Example Plumbing Co. in Riverton, USA. Illustrative prompts, names, sources, and review counts. Not a customer result.",
    path: "/sample-snapshot",
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

function ExampleBanner() {
  return (
    <p className="rounded-xl border border-copper/50 bg-cream px-4 py-3 text-sm font-medium leading-6 text-ink">
      {exampleBanner}
    </p>
  );
}

function SnapshotCtas() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Link
        href="/free-snapshot"
        className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream transition-colors hover:bg-forest-deep"
      >
        Get a free AI Answer Snapshot
      </Link>
      <FixPackBuyLink compact label={fixPackGetCtaLabel()} />
      <Link
        href="/fix-pack"
        className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink transition-colors hover:border-ink"
      >
        Fix Pack, {fixPackIntroPriceLabel}
      </Link>
    </div>
  );
}

export default function SampleSnapshotPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <ExampleBanner />
        <p className="kicker mt-8">Example AI Answer Snapshot</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          What a one-page snapshot looks like.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          Same layout as the snapshot CiteScore sends. The business, the
          competitors, the city, the sources, the date, and every figure on
          this page were invented to show that layout.
        </p>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Example prepared by the CiteScore Team. Sold by {sellerName}. Not a
          customer result, and not a live ChatGPT or Perplexity answer.
        </p>
        <div className="mt-8">
          <SnapshotCtas />
          <FixPackOfferFacts className="mt-4" />
        </div>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          The button above opens the{" "}
          <Link href="/free-snapshot" className="text-forest underline">
            free snapshot request page
          </Link>
          . The form on this page is the same request. It sends the business
          name, city, service, website, and email through FlowForm to{" "}
          <a
            className="text-forest underline"
            href={`mailto:${contactEmail}?subject=${encodeURIComponent("Free AI Answer Snapshot")}`}
          >
            {contactEmail}
          </a>
          . If that send fails, the email button on the form opens a message
          to that address.
        </p>

        <article className="report-sheet mt-10 overflow-hidden rounded-2xl border border-rule">
          <header className="border-b border-rule px-5 py-6 sm:px-8">
            <ExampleBanner />
            <p className="kicker mt-5 text-copper">Example only · fictional business</p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight">
              Example Plumbing Co.
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Plumber · Riverton, USA (a made-up place) · 100 Example Street
            </p>
            <p className="mt-1 font-mono text-xs text-ink-soft">
              example-plumbing.example
            </p>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="kicker">Example date</dt>
                <dd className="mt-1 leading-6 text-ink-soft">
                  24 October 2026. A real snapshot prints the day the prompts
                  were asked. This date is a placeholder. These prompts were
                  not run.
                </dd>
              </div>
              <div>
                <dt className="kicker">Prepared by</dt>
                <dd className="mt-1 leading-6 text-ink-soft">
                  CiteScore Team, as an example. Seller: {sellerName}.
                </dd>
              </div>
            </dl>
          </header>

          <section className="border-b border-rule px-5 py-6 sm:px-8">
            <p className="kicker text-copper">Example only · prompts asked</p>
            <h2 className="mt-2 font-serif text-2xl">Prompts asked</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              A real snapshot records logged-out ChatGPT and Perplexity, one
              local prompt, and one variant. The lines below are the example
              wording, with an example date.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Example prompts for ChatGPT and Perplexity. The date is a placeholder.
                </caption>
                <thead className="border-b border-rule text-xs uppercase tracking-wide text-ink-soft">
                  <tr>
                    <th className="py-3 pr-4 font-medium">Engine</th>
                    <th className="py-3 pr-4 font-medium">Example prompt</th>
                    <th className="py-3 font-medium">Example date</th>
                  </tr>
                </thead>
                <tbody>
                  {prompts.map((row) => (
                    <tr key={`${row.engine}-${row.prompt}`} className="border-b border-rule last:border-b-0">
                      <td className="py-3 pr-4 align-top">
                        {row.engine}
                        <span className="mt-1 block text-xs text-ink-soft">{row.kind}</span>
                      </td>
                      <td className="py-3 pr-4 align-top">“{row.prompt}”</td>
                      <td className="py-3 align-top text-ink-soft">
                        24 October 2026, placeholder
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="border-b border-rule px-5 py-6 sm:px-8">
            <p className="kicker text-copper">Example only · who was named</p>
            <h2 className="mt-2 font-serif text-2xl">Who was named</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Written for this example. Not a transcript of an assistant.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {named.map((block) => (
                <div key={block.engine} className="rounded-xl border border-rule px-4 py-4">
                  <h3 className="font-medium">{block.engine}</h3>
                  <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-6">
                    {block.names.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ol>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{block.absent}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-b border-rule px-5 py-6 sm:px-8">
            <p className="kicker text-copper">Example only · sources cited</p>
            <h2 className="mt-2 font-serif text-2xl">Sources and directories cited</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Fictional directories on example domains. Not a list of sites an
              assistant actually cited.
            </p>
            <ul className="mt-4 space-y-3">
              {sources.map((source) => (
                <li key={source.name} className="rounded-xl border border-rule px-4 py-3 text-sm leading-6">
                  <p className="font-medium">{source.name}</p>
                  <p className="font-mono text-xs text-ink-soft">{source.where}</p>
                  <p className="mt-1 text-ink-soft">{source.cited}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-ink-soft">
              The example also says the answers pointed at Google Business
              Profile names for the businesses in the table. No rating below
              was looked up.
            </p>
          </section>

          <section className="border-b border-rule px-5 py-6 sm:px-8">
            <p className="kicker text-copper">Example only · ratings and reviews</p>
            <h2 className="mt-2 font-serif text-2xl">
              Rating and review comparison
            </h2>
            <ExampleBanner />
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Illustrative Google rating and review count, written so the
              comparison is visible. Not looked up. Not a research finding.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <caption className="sr-only">
                  Illustrative Google rating and review count for Example Plumbing Co. and three fictional competitors.
                </caption>
                <thead className="border-b border-rule text-xs uppercase tracking-wide text-ink-soft">
                  <tr>
                    <th className="py-3 pr-4 font-medium">Fictional business</th>
                    <th className="py-3 pr-4 font-medium">Named in this example</th>
                    <th className="py-3 pr-4 font-medium">Illustrative Google rating</th>
                    <th className="py-3 pr-4 font-medium">Illustrative reviews</th>
                    <th className="py-3 font-medium">Vs Example Plumbing Co.</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row) => (
                    <tr key={row.business} className="border-b border-rule last:border-b-0">
                      <td className="py-3 pr-4 align-top">
                        <span className="font-medium">{row.business}</span>
                        <span className="mt-1 block text-xs text-ink-soft">{row.role}</span>
                        <span className="mt-1 block font-mono text-xs text-ink-soft">{row.domain}</span>
                      </td>
                      <td className="py-3 pr-4 align-top">{row.named}</td>
                      <td className="py-3 pr-4 align-top">{row.rating}</td>
                      <td className="py-3 pr-4 align-top">{row.reviews}</td>
                      <td className="py-3 align-top text-ink-soft">{row.versus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="px-5 py-6 sm:px-8">
            <p className="kicker text-copper">Example only · gaps</p>
            <h2 className="mt-2 font-serif text-2xl">Five gaps in this example</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              A real snapshot lists the gaps from that day’s answers. These
              five were written to show how each one maps to the Fix Pack.
            </p>
            <ol className="mt-5 space-y-4">
              {gaps.map((gap, index) => (
                <li key={gap.title} className="rounded-xl border border-rule px-4 py-4">
                  <p className="kicker text-copper">Example gap 0{index + 1}</p>
                  <h3 className="mt-2 font-serif text-xl">{gap.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{gap.found}</p>
                  <p className="mt-3 text-sm leading-6">
                    <span className="font-medium">What the Fix Pack would do. </span>
                    <span className="text-ink-soft">{gap.fix}</span>
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <ExampleBanner />
            </div>
            <p className="mt-4 text-sm leading-6 text-ink-soft">
              AI answers vary run to run. This is a snapshot, not a ranking. A
              published test of local ChatGPT answers found that only 40% of
              businesses appeared in all three runs (
              <a href={sonickStudy} className="text-forest underline">
                SoNick Marketing
              </a>
              ).
            </p>
          </section>
        </article>

        <section id="faq" className="mt-12">
          <JsonLd data={faqPageJsonLd(snapshotOfferFaqs)} />
          <h2 className="font-serif text-3xl tracking-tight">FAQ</h2>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            A real snapshot uses the business, city, and service you submit.
            The example above is fictional.
          </p>
          <FaqList items={snapshotOfferFaqs} />
        </section>

        <section className="mt-12 rounded-2xl border border-rule bg-cream px-5 py-6 sm:px-8">
          <p className="kicker">Request</p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight">
            Get a snapshot for a real business.
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            The example above stays fictional. This form is the same request
            as the free snapshot page. It sends the business name, city,
            service, website, and email through FlowForm to {contactEmail}.
            No checkout.
          </p>
          <div className="mt-5">
            <SnapshotRequestForm />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <FixPackBuyLink compact label={fixPackGetCtaLabel()} />
            <Link
              href="/fix-pack"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-paper px-5 text-base font-medium text-ink hover:border-ink"
            >
              Fix Pack, {fixPackIntroPriceLabel}
            </Link>
          </div>
          <FixPackOfferFacts className="mt-4" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
