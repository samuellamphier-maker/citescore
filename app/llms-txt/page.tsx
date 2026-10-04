import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/llms-txt");

const faqs = [
  {
    q: "Does a missing llms.txt fail the audit?",
    a: "No. Found means the response was successful and the body was not empty. Missing means that check is a negative on the AI-crawler dimension only. The other seven dimensions still score the page. Plenty of sites with no llms.txt can clear Mentioned on answer fitness and evidence.",
  },
  {
    q: "Do you grade the writing inside the file?",
    a: "No. We store a short sample so the report can quote what we saw. We do not score headings, link titles, or whether the file matches the community proposal’s outline. A one-line placeholder counts as found. It is a weak courtesy, and the rest of the audit will still judge the HTML.",
  },
  {
    q: "Do you fetch llms-full.txt?",
    a: "No. The proposal describes an optional expanded file. CiteScore requests /llms.txt on the same host as the URL you submitted, and stops there.",
  },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function LlmsTxtPage() {
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
          "@type": "WebPage",
          name: topic.title,
          description: topic.description,
          url: `${origin}${topic.path}`,
        }}
      />
      <ArticleShell
        kicker={topic.kicker}
        title="llms.txt is a map. The audit only checks that the map exists."
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        ctaId="llms-txt"
        related={[
          { href: "/ai-crawlers", label: "GPTBot, PerplexityBot, and Google-Extended" },
          { href: "/chatgpt-citation-check", label: "ChatGPT citation check" },
          {
            href: "/blog/chatgpt-citation-checklist",
            label: "Citation checklist (includes llms.txt)",
          },
          { href: "/geo-audit", label: "GEO audit" },
          { href: "/sample", label: "Sample report" },
        ]}
      >
        <p>
          <code>llms.txt</code> is a community proposal, published at
          llmstxt.org, for a plain Markdown file at the root of a site. The
          idea is small: give a model a curated list of URLs worth reading,
          with a one-line description of the project at the top, instead of
          making it guess from the homepage nav. It is not an OpenAI
          standard, a Google ranking factor, or a Perplexity requirement.
          Treating it as one of those is how the file turned into folklore.
        </p>
        <p>
          CiteScore’s check is smaller than the folklore. During a{" "}
          <Link href="/geo-audit">$39 audit</Link> we request{" "}
          <code>/llms.txt</code> on the host of the URL you submitted. Found
          means the response succeeded and the body, after trimming, was not
          empty. Anything else — 404, an empty 200, a network failure — is
          not found. We keep a short sample of the body for the report. We
          do not validate the Markdown outline, and we do not request{" "}
          <code>/llms-full.txt</code>.
        </p>

        <h2>How it moves the score</h2>
        <p>
          Presence is a positive mark on one dimension: AI-crawler access,
          alongside the <Link href="/ai-crawlers">robots.txt tokens</Link>.
          It does not add points to answer fitness, evidence, or markup. A
          beautiful <code>llms.txt</code> on a slogan homepage will not drag
          the overall score into the “citation-ready” band by itself. A
          missing file will not zero the audit.
        </p>
        <p>
          That is deliberate. The file is a courtesy index. The citable
          object is still the page: a definition, an entity, a fact, a FAQ.
          If those are missing, the{" "}
          <Link href="/chatgpt-citation-check">ChatGPT</Link>,{" "}
          <Link href="/perplexity-citations">Perplexity</Link>, and{" "}
          <Link href="/ai-overviews">AI Overviews</Link> rows have nothing to
          promote, whether or not the map exists.
        </p>

        <h2>A file that matches the proposal, using a fictional product</h2>
        <p>
          Northbound is the fictional company in the{" "}
          <Link href="/sample">sample report</Link>. This file is an
          illustration of the shape, not a template that earns citations, and
          not a file we host for them. The H1 is a project name. The
          blockquote is a one-sentence summary. The list is the handful of
          URLs a model should read before it reads the marketing site.
        </p>
        <pre className="overflow-x-auto rounded-xl border border-rule bg-cream p-4 text-sm leading-6 text-ink">
          {`# Northbound

> Customer-interview repository for product teams.

Northbound stores interview transcripts, tags themes, and exports clips for product decisions.

## Product
- [What it is](https://northbound.example/): definition, who it is for, what it replaces
- [Pricing](https://northbound.example/pricing): public plans
- [vs Dovetail](https://northbound.example/compare/dovetail): honest comparison

## Optional
- [Changelog](https://northbound.example/changelog): month-level product changes`}
        </pre>
        <p>
          Put the canonical URLs in the list, not campaign links. If the
          comparison page does not exist yet, leave it off. A map that points
          at 404s is worse than no map. Write the summary in the same words
          as the homepage definition, so the file and the HTML do not
          describe two products.
        </p>

        <h2>What to ignore in llms.txt advice</h2>
        <ul>
          <li>
            <strong>“Add the file and ChatGPT will cite you.”</strong> No
            engine has published that rule. Our own ChatGPT row can still say
            Absent when the HTML is thin.
          </li>
          <li>
            <strong>Keyword lists inside the file.</strong> The proposal is a
            reading list. Stuffing “ChatGPT citation” into every bullet does
            not create a source.
          </li>
          <li>
            <strong>A private or staging URL.</strong> We fetch the public
            host. A file that only exists behind your VPN is invisible to the
            check, and to everyone else.
          </li>
        </ul>
        <p>
          The <Link href="/blog/chatgpt-citation-checklist">checklist</Link>{" "}
          includes <code>llms.txt</code> as item eight of twelve, in one
          paragraph. This page is the longer version of that item: the exact
          HTTP check, the dimension it touches, and the claims it does not
          support.
        </p>

        <h2>Questions about the check</h2>
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </ArticleShell>
    </>
  );
}
