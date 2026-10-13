import Link from "next/link";
import { AuditCta } from "@/components/AuditCta";
import { CitationReadinessChecklist } from "@/components/CitationReadinessChecklist";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { citationChecks } from "@/lib/content/citation-checklist";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin, site } from "@/lib/site";

const path = "/checklist";
const title = "AI Citation Readiness Checklist";
const description =
  "Forty concrete checks for crawler access, llms.txt, structured data, answer-ready copy, evidence, and entity clarity. The full list is free on the page. The $39 audit scores one URL.";

export const metadata = pageMeta({
  title,
  description,
  path,
});

export default function ChecklistPage() {
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
          isAccessibleForFree: true,
          publisher: { "@type": "Organization", name: site.name, url: origin },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: title,
          numberOfItems: citationChecks.length,
          itemListElement: citationChecks.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.title,
          })),
        }}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">Checklist · free</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">{title}</h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">{description}</p>
        <div className="mt-8 max-w-2xl space-y-4 text-base leading-7 text-ink-soft">
          <p>
            All 40 checks are on this page. There is no email gate and no
            download. Marking a box stores the mark in this browser only.
            Checking a box does not submit the page, and it does not produce
            a score.
          </p>
          <p>
            The <Link href="/free-check">free check</Link> tests the public
            signals a crawler can see in seconds: homepage HTML, robots.txt
            for GPTBot, PerplexityBot, and Google-Extended, a non-empty{" "}
            <code>llms.txt</code>, a sitemap, and JSON-LD types.             It does not
            query ChatGPT, Perplexity, or Google AI Overviews. Where a check
            is outside that tool, the item says so.
          </p>
          <p>
            The <Link href="/geo-audit">{site.priceLabel} audit</Link> scores
            one public URL and returns about ten prioritized fixes. Use the
            list first. Pay for the score when you want the punch list for a
            specific page.
          </p>
        </div>
        <div className="mt-10">
          <CitationReadinessChecklist />
        </div>
        <AuditCta
          id="checklist-audit"
          title={`Score one URL for ${site.priceLabel}`}
          body="The checklist is the unpaid version. The audit is one public URL, a 0–100 CiteScore, and about ten fixes from the HTML we fetched. We do not log into ChatGPT, Perplexity, or Google AI Overviews."
        />
        <nav className="mt-10 border-t border-rule pt-6" aria-label="Related">
          <p className="kicker">Keep reading</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href="/free-check"
                className="text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                Free AI citation-readiness check
              </Link>
            </li>
            <li>
              <Link
                href="/geo-audit"
                className="text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                $39 GEO audit
              </Link>
            </li>
            <li>
              <Link
                href="/llms-txt-examples"
                className="text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                llms.txt examples from 10 SaaS sites
              </Link>
            </li>
            <li>
              <Link
                href="/geo-vs-seo"
                className="text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                GEO vs SEO
              </Link>
            </li>
          </ul>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
