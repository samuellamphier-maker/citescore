import Link from "next/link";
import { AuditCta } from "@/components/AuditCta";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin, site } from "@/lib/site";

const topic = getTopic("/alternatives/profound");

const rows = [
  ["Job", "One scored PDF, about ten fixes, one URL", "Ongoing AI-visibility platform"],
  [
    "Live engine queries",
    "No. On-page signals plus an optional LLM review of fetched HTML",
    "Yes. Prompt and citation tracking across the engines on the plan",
  ],
  [
    "Public price (2026)",
    `${site.priceLabel} once`,
    "Self-serve reported from about $99/mo; Growth about $399/mo; Enterprise quoted",
  ],
  [
    "Seats, SSO, SOC 2",
    "None. No account.",
    "Part of the enterprise checklist Profound is sold on",
  ],
  [
    "Citation share",
    "Not measured. Off-site mentions are outside the crawl",
    "A core dashboard: who is cited, over time",
  ],
  [
    "Best first purchase",
    "The homepage still reads like a slogan",
    "A team that will review citation share every week",
  ],
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function ProfoundAlternativePage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "CiteScore vs Profound",
          description: topic.description,
          url: `${origin}${topic.path}`,
        }}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Comparison</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          CiteScore vs Profound
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          Profound is an enterprise AI-visibility platform: prompt tracking,
          citation share, and the security review a larger team expects.
          CiteScore is a {site.priceLabel} one-time{" "}
          <Link href="/geo-audit" className="text-forest underline">
            GEO audit
          </Link>{" "}
          of one public URL. Buying the platform before the page has a
          definition is how the dashboard fills up with “not cited.”
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          We are not affiliated with Profound, and we do not have affiliate
          links. The prices below are the 2026 figures already cited on our{" "}
          <Link
            href="/blog/citescore-vs-enterprise-geo-tools"
            className="text-forest underline"
          >
            enterprise comparison
          </Link>
          . Confirm them on Profound’s site before you budget. Third-party
          writeups put serious enterprise contracts higher than the
          self-serve tiers.
        </p>

        <div className="article-prose mt-10">
          <h2>The short version</h2>
          <p>
            If procurement needs SSO, SOC 2, an API, and a time series of who
            ChatGPT and AI Overviews cite, talk to Profound (or another
            suite in that class). If you need to know why a model would skip
            this homepage, and what to rewrite by Friday, buy CiteScore.
            Those are sequential jobs. They are not substitutes.
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th>CiteScore</th>
                  <th>Profound</th>
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

          <h2>What Profound is for</h2>
          <p>
            Profound sells the measurement layer a staffed program wants:
            which prompts mention the brand, how citation share moves, and
            coverage across the engines on the plan. Public self-serve in
            2026 started around $99 a month for narrower engine coverage and
            around $399 a month for a broader Growth plan. Enterprise is
            quoted. That is a real product for someone who will open it.
          </p>
          <p>
            It assumes you already have pages a model can quote, and someone
            whose job is to react when the graph moves. A two-person SaaS
            company with a metaphorical H1 will not get that value from a
            seat. The graph will be accurate and useless.
          </p>

          <h2>What CiteScore is for</h2>
          <p>
            We crawl the URL you paid for, score on-page GEO signals
            (definitions, entities, evidence, schema, freshness, crawler
            access), and email a PDF with about ten fixes. The engine
            snapshot — ChatGPT, Perplexity, Google AI Overviews — is inferred.
            An LLM may rewrite the summary from the public HTML. We never
            claim a live login.{" "}
            <Link href="/privacy">Privacy</Link> says what that model may
            see. The <Link href="/sample">sample report</Link> is a fictional
            company in the real format.
          </p>
          <p>
            There is no workspace and no card on file after the charge.
            Weekly rescans at {site.subscriptionPriceLabel} are planned, not
            sold. The <Link href="/chatgpt-citation-check">ChatGPT</Link>,{" "}
            <Link href="/ai-overviews">AI Overviews</Link>, and{" "}
            <Link href="/perplexity-citations">Perplexity</Link> pages
            explain each row.{" "}
            <Link href="/answer-engine-optimization">
              Answer engine optimization
            </Link>{" "}
            is the same audit under the other common label.
          </p>

          <h2>Use them in order, if you use both</h2>
          <p>
            Rewrite the page from the{" "}
            <Link href="/blog/chatgpt-citation-checklist">checklist</Link> or
            from a CiteScore report. Then, if you have a prompt list and a
            budget that starts near $99 a month, turn on a monitor and see
            whether citations move. The{" "}
            <Link href="/alternatives/otterly">Otterly comparison</Link> is
            the same argument against a lighter monitoring plan. Otterly is
            the closer sticker price. Profound is the closer fit when the
            buyer is a security review.
          </p>
          <p>
            The three-way writeup — CiteScore, Otterly-class, Profound-class
            — stays on{" "}
            <Link href="/blog/citescore-vs-enterprise-geo-tools">
              the enterprise guide
            </Link>
            . This page is only the Profound column, for the search that
            asked for it.
          </p>
        </div>

        <AuditCta
          id="profound-audit"
          title={`Fix the page before you buy citation share — ${site.priceLabel}`}
        />

        <p className="mt-8 text-sm text-ink-soft">
          More comparisons:{" "}
          <Link href="/alternatives" className="text-forest underline">
            alternatives index
          </Link>
          {" · "}
          <Link href="/alternatives/otterly" className="text-forest underline">
            vs Otterly
          </Link>
          {" · "}
          <Link href="/blog" className="text-forest underline">
            guides
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
