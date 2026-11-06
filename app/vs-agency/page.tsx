import type { Metadata } from "next";
import Link from "next/link";
import { IndustrySnapshotCta } from "@/components/IndustrySnapshotCta";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StickySnapshotOffer } from "@/components/StickySnapshotOffer";
import { pageMeta } from "@/lib/content/meta";
import {
  fixPackDeliverables,
  fixPackRefund,
  fixPackTurnaround,
} from "@/lib/fix-pack-offer";
import {
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
  sellerName,
  site,
} from "@/lib/site";

const path = "/vs-agency";
const title = "Fix Pack vs an agency retainer";
const description = `The Fix Pack is ${fixPackIntroPriceLabel} once, for one business, one city, and one service. An agency retainer is monthly. This page does not publish that fee.`;

export const metadata: Metadata = {
  ...pageMeta({
    title,
    description,
    path,
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

const rows = [
  [
    "What you pay CiteScore",
    `${fixPackIntroPriceLabel} introductory (${fixPackListPriceLabel} list), once`,
    "Nothing, unless the agency buys a CiteScore file. Their fee is theirs.",
  ],
  [
    "Shape of the purchase",
    "One business, one city, one service. Not a subscription and not a seat.",
    "A monthly engagement that continues until you end it.",
  ],
  [
    "Who asks ChatGPT",
    "The free snapshot asks logged-out ChatGPT and Perplexity. The free file check does not.",
    "Ask them. A file check is not a ChatGPT query.",
  ],
  [
    "What you receive",
    "The Fix Pack deliverables below, emailed after you send the business details.",
    "Whatever the contract says. Often ongoing work, not one file.",
  ],
  [
    "Delivery and refund",
    "Within a few business days after payment. Full refund within 14 days of delivery if the Fix Pack is not useful.",
    "Their contract. CiteScore does not publish a market rate for that fee.",
  ],
];

export default function VsAgencyPage() {
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
          author: { "@type": "Organization", name: "CiteScore Team", url: origin },
          publisher: { "@type": "Organization", name: site.name, url: origin },
        }}
      />
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">For local businesses</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          A {fixPackIntroPriceLabel} Fix Pack, or a monthly agency retainer.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          The AI Visibility Fix Pack is {fixPackIntroPriceLabel} introductory
          ({fixPackListPriceLabel} list), once, for one business, one city,
          and one service. Hiring a GEO or SEO agency on a retainer is a
          different purchase. CiteScore does not publish a market rate for
          agency fees, and this page does not invent one.
        </p>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Prepared by the CiteScore Team. Sold by {sellerName}. Weekly rescans
          at {site.subscriptionPriceLabel} are planned, not sold. The Fix Pack
          is not a retainer.
        </p>

        <div className="mt-8">
          <IndustrySnapshotCta variant="general" />
        </div>

        <div className="article-prose mt-10">
          <h2>Side by side</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th>Fix Pack</th>
                  <th>Agency retainer</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>What the Fix Pack includes</h2>
          <p>
            The free{" "}
            <Link href="/free-snapshot">AI Answer Snapshot</Link> comes first.
            It asks logged-out ChatGPT and Perplexity who they name. AI
            answers vary run to run. This is a snapshot, not a ranking. No
            payment. The Fix Pack is the done-for-you work after you have
            seen who was named.
          </p>
          <ul>
            {fixPackDeliverables.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.body}
              </li>
            ))}
          </ul>
          <p>
            {fixPackTurnaround} {fixPackRefund} The{" "}
            <Link href="/sample-snapshot">example snapshot</Link> and the{" "}
            <Link href="/sample-fix-pack">sample Fix Pack</Link> are fictional
            and labeled as samples. They are not customer results.
          </p>

          <h2>What a retainer is for</h2>
          <p>
            Hire an agency when you want a person on a monthly contract to
            keep running the work. CiteScore does not quote what that
            contract costs. Ask for the fee, what is included, and whether
            they query ChatGPT or only read public files.
          </p>
          <p>
            The{" "}
            <Link href="/free-check">free signal check</Link> reads public
            files. It does not query ChatGPT. The free snapshot does. A
            retainer before you know who is named spends the month measuring
            a page you have not changed yet.
          </p>
          <p>
            If you are the agency, start each local client on{" "}
            <Link href="/for-agencies">the agency page</Link>: the free
            snapshot, then the Fix Pack. Comparisons with monitoring
            platforms are on{" "}
            <Link href="/alternatives">the alternatives index</Link>.
          </p>
        </div>

        <div className="mt-12">
          <IndustrySnapshotCta variant="general" />
        </div>
        <p className="mt-8 text-sm leading-6">
          <Link href="/fix-pack" className="font-medium text-forest underline">
            What is in the Fix Pack
          </Link>
          {" · "}
          <Link href="/free-snapshot" className="font-medium text-forest underline">
            Free AI Answer Snapshot
          </Link>
          {" · "}
          <Link href="/pricing" className="font-medium text-forest underline">
            Pricing
          </Link>
        </p>
      </main>
      <SiteFooter />
      <StickySnapshotOffer path="/vs-agency" />
    </>
  );
}
