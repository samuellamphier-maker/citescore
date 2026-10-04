import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/ai-overviews");

const faqs = [
  {
    q: "Do you query Google and screenshot the Overview?",
    a: "No. The Google AI Overviews row is inferred from on-page signals, especially answer-shaped copy and structured markup. It is not a live Search scrape, and it is not a rank.",
  },
  {
    q: "If I allow Google-Extended, will I show up in AI Overviews?",
    a: "No. Google’s documentation describes Google-Extended as a control for whether your content helps improve Gemini Apps and Vertex AI generative APIs. Google says that token does not change inclusion or ranking in Google Search. AI Overviews are part of Search. We still record the token, because publishers set it, and a disallow lowers our crawler dimension. That is our score, not Google’s.",
  },
  {
    q: "What should I change if the Overview row says Absent?",
    a: "Usually a visible FAQ with matching FAQPage JSON-LD, a definition in the first screen, and a clear product entity (Organization or SoftwareApplication). The PDF lists about ten fixes for the URL you submitted. The checklist is the unpaid version of the same ideas.",
  },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function AiOverviewsPage() {
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
        title="Google AI Overviews visibility, read from the page"
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        ctaId="ai-overviews"
        related={[
          { href: "/ai-crawlers", label: "What Google-Extended actually is" },
          { href: "/chatgpt-citation-check", label: "ChatGPT citation check" },
          { href: "/perplexity-citations", label: "Perplexity citations" },
          { href: "/blog/what-is-geo", label: "What is GEO?" },
          { href: "/geo-audit", label: "The $39 GEO audit" },
          { href: "/sample", label: "Sample report" },
        ]}
      >
        <p>
          Google AI Overviews are the generated answers above classic blue
          links, with a short list of sources beside or under the paragraph.
          “AI overview visibility” is the search founders use when their
          product is missing from that box and a roundup blog is sitting in
          it. There is no published, stable formula for earning the slot.
          What you can inspect is whether your page is the kind of source an
          answer can lift: a direct definition, a named entity, a question
          with a short reply, and a URL Google can already crawl.
        </p>
        <p>
          CiteScore’s AI Overviews line is that inspection, priced as the
          same <Link href="/geo-audit">$39 audit</Link> as the ChatGPT and
          Perplexity lines. We fetch public HTML. We do not run your query
          through Google.
        </p>

        <h2>How the Overview row is decided</h2>
        <p>
          The baseline looks at two dimensions more than the others.
          Structured markup covers JSON-LD types, with extra weight when
          FAQPage, Question, or SoftwareApplication is present, plus a
          canonical URL. Answer fitness covers a definitional lead,
          question-shaped headings, on-page FAQ pairs, and whether the H1 is
          a slogan. When both are in decent shape, the status can be
          Mentioned. Otherwise it stays Absent.
        </p>
        <p>
          Mentioned means “this page has the shape Overviews tend to quote.”
          It does not mean we saw your brand in an Overview this morning.
          Absent means the FAQ and entity layer looked thin — the usual state
          of a homepage that opens on a metaphor and a row of feature tiles.
          The language-model review, when configured, may nudge the score by
          a limited amount and rewrite the note. It is told not to claim a
          live Search result.
        </p>
        <p>
          On the{" "}
          <Link href="/sample">Northbound sample</Link> the Overview line is
          Absent, with the note that head terms have no inclusion and FAQ /
          SoftwareApplication markup is missing. That company is fictional.
          The sentence is the kind of sentence the report writes.
        </p>

        <h2>Google-Extended is a different switch</h2>
        <p>
          We fetch <code>robots.txt</code> and store a policy for
          Google-Extended: allow, disallow, or unspecified. Publishers treat
          that token as “the AI opt-out.” Google’s own description is
          narrower. Google-Extended controls whether a site’s content is used
          to improve Gemini Apps and Vertex AI generative APIs. Google says
          it does not affect inclusion or ranking in Google Search.
        </p>
        <p>
          So a Disallow of Google-Extended does not, on Google’s published
          terms, remove you from AI Overviews. It does lower CiteScore’s
          AI-crawler dimension, alongside GPTBot and PerplexityBot. If you
          blocked Google-Extended on purpose, treat that part of the crawler
          score as a record of your policy. The Overview row itself is driven
          by answer fitness and markup, not by that token. The{" "}
          <Link href="/ai-crawlers">crawler page</Link> lists the three
          tokens we parse and the ones we skip.
        </p>

        <h2>Page changes that match the row</h2>
        <p>
          These are the edits the Overview line is built to notice. They are
          also ordinary good pages. None of them is a trick.
        </p>
        <ul>
          <li>
            <strong>A definition before the slogan.</strong> The first screen
            should be liftable: what the product is, who it is for, what it
            replaces.
          </li>
          <li>
            <strong>Two or three real questions.</strong> “What is …?”, “Who
            is it for?”, “How is it different from …?” with short answers,
            and FAQPage JSON-LD that matches the visible text. Hidden FAQ
            markup with no visible FAQ is a bad trade.
          </li>
          <li>
            <strong>One entity, spelled the same way.</strong> Title, H1, and
            Organization or SoftwareApplication JSON-LD. Overviews cite
            sources. A source with three names for one product is harder to
            attach a claim to.
          </li>
          <li>
            <strong>A date a human would trust.</strong> Last reviewed, a
            changelog, or a current-year article. Freshness is its own
            dimension. We also note whether <code>/sitemap.xml</code>{" "}
            contains a <code>urlset</code>.
          </li>
        </ul>
        <p>
          Classic rankings still sit under the Overview. We do not audit
          backlinks, Core Web Vitals, or index coverage. If the page is
          noindexed or blocked for Googlebot, fix that in Search Console
          before you buy an AI-visibility PDF. Our crawler records the
          generic <code>User-agent: *</code> policy and the three AI tokens.
          It is not a substitute for a Search audit.
        </p>

        <h2>Where this sits next to the other engines</h2>
        <p>
          The same PDF has a{" "}
          <Link href="/chatgpt-citation-check">ChatGPT citation check</Link>{" "}
          and a <Link href="/perplexity-citations">Perplexity</Link> line.
          They share the crawl and diverge on which signals they weigh.
          ChatGPT is harsher about crawler access. Perplexity is harsher
          about thin evidence and missing comparison pages. Overviews are
          harsher about FAQ and entity markup. A founder who only reads the
          overall number will miss that split. The dimension table is the
          point of the report.
        </p>
        <p>
          For the category language — GEO, AEO, “AI visibility” — start with{" "}
          <Link href="/blog/what-is-geo">what GEO is</Link> or the{" "}
          <Link href="/answer-engine-optimization">AEO page</Link>. They
          describe the same $39 deliverable. This page is only the Overview
          slice.
        </p>

        <h2>Questions the Overview line gets</h2>
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
