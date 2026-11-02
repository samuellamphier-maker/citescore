import type { Metadata } from "next";
import Link from "next/link";
import { CopySnippet } from "@/components/CopySnippet";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { FixPackOfferFacts } from "@/components/FixPackOfferFacts";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustLinks } from "@/components/TrustLinks";
import { pageMeta } from "@/lib/content/meta";
import { fixPackDeliverables } from "@/lib/fix-pack-offer";
import {
  sampleDirectories,
  sampleFixPackExampleBanner,
  sampleJsonLdInstallSteps,
  sampleJsonLdText,
  sampleLocalBusinessJsonLd,
  sampleProfileGaps,
  sampleRecheckRows,
  sampleReviewEmailBody,
  sampleReviewEmailSubject,
  sampleReviewRows,
  sampleReviewSms,
  sampleServiceJsonLd,
} from "@/lib/sample-fix-pack-example";
import {
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  sellerName,
} from "@/lib/site";

const localBusinessJson = sampleJsonLdText(sampleLocalBusinessJsonLd);
const serviceJson = sampleJsonLdText(sampleServiceJsonLd);

export const metadata: Metadata = {
  ...pageMeta({
    title: `Sample Fix Pack: what you get for ${fixPackIntroPriceLabel}`,
    description: `An illustrative example of the ${fixPackIntroPriceLabel} AI Visibility Fix Pack before you pay: Google Business Profile gaps, a review-gap plan and script, the directories an AI answer cited, placeholder LocalBusiness and Service JSON-LD with install steps, and a 14-day re-check for a fictional plumber. Not a real client or real results.`,
    path: "/sample-fix-pack",
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

function ExampleBanner() {
  return (
    <p className="rounded-xl border border-copper/50 bg-cream px-4 py-3 text-sm font-medium leading-6 text-ink">
      {sampleFixPackExampleBanner}
    </p>
  );
}

function SampleCtas() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <FixPackBuyLink compact />
      <Link
        href="/free-snapshot"
        className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink transition-colors hover:border-ink"
      >
        Get a free AI Answer Snapshot
      </Link>
    </div>
  );
}

export default function SampleFixPackPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <ExampleBanner />
        <p className="kicker mt-8">Sample Fix Pack</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Sample Fix Pack: what you get for {fixPackIntroPriceLabel}
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          The snapshot is free. The Fix Pack is the done-for-you work after
          you have seen who was named. Introductory price{" "}
          {fixPackIntroPriceLabel}. List price {fixPackListPriceLabel}. One
          business, one city, one service.
        </p>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Example prepared by the CiteScore Team. Sold by {sellerName}. The
          layout below is the {fixPackIntroPriceLabel} AI Visibility Fix Pack
          for Example Plumbing Co., a fictional plumber in Riverton, USA (a
          made-up place).
        </p>
        <div className="mt-8">
          <SampleCtas />
          <p className="mt-4 text-sm leading-6">
            <Link href="/fix-pack" className="font-medium text-forest underline">
              Fix Pack details
            </Link>
            <span className="text-ink-soft">
              . The free snapshot example for this same fictional business is
              on the{" "}
              <Link href="/sample-snapshot" className="text-forest underline">
                example AI Answer Snapshot
              </Link>
              .
            </span>
          </p>
          <FixPackOfferFacts className="mt-4" />
        </div>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          AI answers vary run to run. This is a snapshot, not a ranking. It
          is not a promise that any assistant will name the business.
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">What you get</h2>
        <ol className="mt-6 space-y-4">
          {fixPackDeliverables.map((item, index) => (
            <li key={item.title} className="rounded-2xl border border-rule bg-cream px-5 py-4">
              <p className="kicker text-copper">0{index + 1}</p>
              <h3 className="mt-2 font-serif text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ol>

        <article className="report-sheet mt-10 overflow-hidden rounded-2xl border border-rule">
          <header className="border-b border-rule px-5 py-6 sm:px-8">
            <ExampleBanner />
            <p className="kicker mt-5 text-copper">Example only · fictional business</p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight">
              Example Plumbing Co.
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Plumber · Riverton, USA (a made-up place) · example-plumbing.example
            </p>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Bracketed fields are placeholders. This illustration does not
              fill in a rating, a review count, or a phone number. On a real
              Fix Pack those fields come from the business you send and from
              the snapshot for that business.
            </p>
          </header>

          <section className="border-b border-rule px-5 py-6 sm:px-8">
            <p className="kicker text-copper">01 · Google Business Profile gap list</p>
            <h2 className="mt-2 font-serif text-2xl">Google Business Profile gap list</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Category, services, hours, photos, and Q&A, compared with the
              businesses the snapshot says AI named. In this illustration those
              businesses are the fictional names from the example snapshot:
              Sample Rooter Co., Fictional Fixture Works, and Demo Drain Co.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Placeholder Google Business Profile comparison for Example Plumbing Co. and the fictional businesses named in the example snapshot.
                </caption>
                <thead className="border-b border-rule text-xs uppercase tracking-wide text-ink-soft">
                  <tr>
                    <th className="py-3 pr-4 font-medium">Check</th>
                    <th className="py-3 pr-4 font-medium">Example Plumbing Co.</th>
                    <th className="py-3 font-medium">Named in the example snapshot</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleProfileGaps.map((row) => (
                    <tr key={row.check} className="border-b border-rule last:border-b-0">
                      <td className="py-3 pr-4 align-top font-medium">{row.check}</td>
                      <td className="py-3 pr-4 align-top text-ink-soft">{row.prospect}</td>
                      <td className="py-3 align-top text-ink-soft">{row.named}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="border-b border-rule px-5 py-6 sm:px-8">
            <p className="kicker text-copper">02 · Review-gap plan and script</p>
            <h2 className="mt-2 font-serif text-2xl">Review-gap plan and script</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              How your Google rating and review count compare, plus a
              copy-paste SMS and email you can send to ask for a review. The
              cells below stay in brackets.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Placeholder Google rating and review count for Example Plumbing Co. and three fictional competitors.
                </caption>
                <thead className="border-b border-rule text-xs uppercase tracking-wide text-ink-soft">
                  <tr>
                    <th className="py-3 pr-4 font-medium">Fictional business</th>
                    <th className="py-3 pr-4 font-medium">Google rating</th>
                    <th className="py-3 font-medium">Review count</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleReviewRows.map((row) => (
                    <tr key={row.business} className="border-b border-rule last:border-b-0">
                      <td className="py-3 pr-4 align-top">
                        <span className="font-medium">{row.business}</span>
                        <span className="mt-1 block text-xs text-ink-soft">{row.role}</span>
                      </td>
                      <td className="py-3 pr-4 align-top">{row.rating}</td>
                      <td className="py-3 align-top">{row.reviews}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 rounded-xl border border-rule px-4 py-4">
              <h3 className="font-medium">Copy-paste SMS</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{sampleReviewSms}</p>
              <CopySnippet value={sampleReviewSms} label="Copy the example review SMS" />
            </div>
            <div className="mt-4 rounded-xl border border-rule px-4 py-4">
              <h3 className="font-medium">Copy-paste email</h3>
              <p className="mt-2 text-sm leading-6">
                <span className="font-medium">Subject. </span>
                <span className="text-ink-soft">{sampleReviewEmailSubject}</span>
              </p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{sampleReviewEmailBody}</p>
              <CopySnippet
                value={`Subject: ${sampleReviewEmailSubject}\n\n${sampleReviewEmailBody}`}
                label="Copy the example review email"
              />
            </div>
          </section>

          <section className="border-b border-rule px-5 py-6 sm:px-8">
            <p className="kicker text-copper">03 · Directories the answer cited</p>
            <h2 className="mt-2 font-serif text-2xl">Directories the answer cited</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              The specific directories and trade bodies named in the snapshot
              for your trade and city, and where your business is missing. The
              names below are the fictional directories on the example
              snapshot. They are not a list of sites an assistant actually cited.
            </p>
            <ul className="mt-4 space-y-3">
              {sampleDirectories.map((source) => (
                <li key={source.name} className="rounded-xl border border-rule px-4 py-3 text-sm leading-6">
                  <p className="font-medium">{source.name}</p>
                  <p className="font-mono text-xs text-ink-soft">{source.where}</p>
                  <p className="mt-1 text-ink-soft">{source.cited}</p>
                  <p className="mt-1">{source.status}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-b border-rule px-5 py-6 sm:px-8">
            <p className="kicker text-copper">04 · LocalBusiness and Service JSON-LD</p>
            <h2 className="mt-2 font-serif text-2xl">
              Paste-ready LocalBusiness and Service JSON-LD
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Markup for your site, plus install steps for WordPress, Wix,
              Squarespace, and Shopify. The script matches the name, phone,
              and address already on the page. In this illustration every
              business field is a placeholder. Paste each block in its own
              script in the head of the public site, and keep every field
              visible on the page.
            </p>
            <h3 className="mt-5 font-medium">LocalBusiness</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl border border-rule bg-paper p-4 font-mono text-xs leading-6">
              {localBusinessJson}
            </pre>
            <CopySnippet value={localBusinessJson} label="Copy the example LocalBusiness JSON-LD" />
            <h3 className="mt-5 font-medium">Service</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl border border-rule bg-paper p-4 font-mono text-xs leading-6">
              {serviceJson}
            </pre>
            <CopySnippet value={serviceJson} label="Copy the example Service JSON-LD" />
            <h3 className="mt-6 font-medium">Where the JSON-LD goes</h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              The pack includes the script and these install steps. Paste it
              in the head of the public site, and keep every field visible on
              the page.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">
              {sampleJsonLdInstallSteps.map((step) => (
                <li key={step.platform}>
                  <strong className="text-ink">{step.platform}.</strong> {step.body}
                </li>
              ))}
            </ul>
          </section>

          <section className="px-5 py-6 sm:px-8">
            <p className="kicker text-copper">05 · 14-day re-check</p>
            <h2 className="mt-2 font-serif text-2xl">14-day re-check</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              The same prompts, run again 14 days later, with who is named the
              second time written next to the first snapshot. The prompts below
              are the example wording from the example snapshot. These prompts
              were not run for this page. The date on a real Fix Pack is the
              day the prompts were asked.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Placeholder re-check of the example prompts, with who is named left blank.
                </caption>
                <thead className="border-b border-rule text-xs uppercase tracking-wide text-ink-soft">
                  <tr>
                    <th className="py-3 pr-4 font-medium">Engine</th>
                    <th className="py-3 pr-4 font-medium">Example prompt</th>
                    <th className="py-3 pr-4 font-medium">First snapshot</th>
                    <th className="py-3 font-medium">14 days later</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleRecheckRows.map((row) => (
                    <tr key={`${row.engine}-${row.prompt}`} className="border-b border-rule last:border-b-0">
                      <td className="py-3 pr-4 align-top">{row.engine}</td>
                      <td className="py-3 pr-4 align-top">“{row.prompt}”</td>
                      <td className="py-3 pr-4 align-top text-ink-soft">{row.first}</td>
                      <td className="py-3 align-top text-ink-soft">{row.later}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <ExampleBanner />
            </div>
            <p className="mt-4 text-sm leading-6 text-ink-soft">
              AI answers vary run to run. This is a snapshot, not a ranking.
              It is not a promise that any assistant will name the business.
            </p>
          </section>
        </article>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">
          Price, delivery, and what to send
        </h2>
        <p className="mt-4 text-ink-soft leading-7">
          <span className="font-serif text-5xl text-ink">{fixPackIntroPriceLabel}</span>{" "}
          <span className="text-ink-soft line-through">{fixPackListPriceLabel}</span>{" "}
          introductory. One business, one city, one service. The free snapshot
          comes first. We email the Fix Pack within a few business days after
          payment, once we have the business name, city, service, and public
          site URL.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          After you pay, email the business name, city, main service, and
          public site URL. Do not send passwords, cookies, or pages behind a
          login.
        </p>
        <div className="mt-6">
          <SampleCtas />
        </div>
        <FixPackOfferFacts className="mt-4" />
        <div className="mt-4">
          <TrustLinks />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
