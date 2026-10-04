import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/perplexity-citations");

const faqs = [
  {
    q: "Do you run my brand through Perplexity?",
    a: "No. The Perplexity row is inferred from public HTML: evidence, structured markup, comparison language, and whether robots.txt allows PerplexityBot. We do not have a Perplexity session.",
  },
  {
    q: "Why does the sample say Competitor cited?",
    a: "On the fictional Northbound report, the homepage is marketing copy while better-known tools in the same category publish definitions, tables, and dated posts. Competitor cited is the status we use when the page gives a model a reason to footnote someone else. It is not a measurement of Perplexity’s live source list.",
  },
  {
    q: "Does blocking PerplexityBot remove me from answers?",
    a: "It tells Perplexity’s crawler to stay out, and it lowers our AI-crawler dimension. Perplexity also documents a separate Perplexity-User agent for fetches triggered by a person. We do not parse Perplexity-User. A bot block is a policy choice. It is not something this audit can reverse by rewriting your H1.",
  },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function PerplexityCitationsPage() {
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
        title="Perplexity citations start as footnotes, not as brand mentions"
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        ctaId="perplexity-citations"
        related={[
          { href: "/chatgpt-citation-check", label: "ChatGPT citation check" },
          { href: "/ai-overviews", label: "Google AI Overviews visibility" },
          { href: "/ai-crawlers", label: "PerplexityBot in robots.txt" },
          {
            href: "/blog/chatgpt-citation-checklist",
            label: "On-page citation checklist",
          },
          { href: "/geo-audit", label: "GEO audit" },
          { href: "/sample", label: "Sample report" },
        ]}
      >
        <p>
          Perplexity answers with numbered sources. The thing a SaaS founder
          actually wants is to be one of those numbers for “best X” and “X vs
          Y,” and to have the footnote point at their site rather than a
          listicle. A Perplexity citation check that deserves the name has to
          admit the limit: we can score whether your page looks like a
          footnote, and we cannot show you today’s Perplexity thread.
        </p>
        <p>
          That score is a line in the{" "}
          <Link href="/geo-audit">$39 CiteScore PDF</Link>, next to ChatGPT
          and Google AI Overviews. The crawl is public HTML from the URL you
          submit, plus a few same-host pages such as <code>/about</code>,{" "}
          <code>/pricing</code>, and <code>/faq</code> when we can find them.
          An optional language-model pass rewrites the summary from those
          extracts. Nobody logs into Perplexity.
        </p>

        <h2>When the row says Competitor cited</h2>
        <p>
          The baseline is picky about evidence and structure. Named facts,
          counts, research language, and JSON-LD can support Mentioned. Thin
          evidence combined with no on-site comparison surface tends to land
          on Competitor cited. Absent is the leftover: not enough to quote,
          and not enough comparison language to say who took the footnote
          instead.
        </p>
        <p>
          Competitor cited is an inference, not a live source list. It means
          the page we fetched reads like a brochure next to the kind of URL
          Perplexity’s answers usually number: a definition, a table, a dated
          post, a methodology. The{" "}
          <Link href="/sample">Northbound sample</Link> uses that status and
          names Dovetail and Grain as the footnotes a model would prefer.
          Northbound is fictional. Those product names are there so you can
          see how specific the sentence is supposed to be. Your report names
          the gap on your pages. It does not invent a ranking of your market.
        </p>

        <h2>What earns the footnote shape</h2>
        <ul>
          <li>
            <strong>A page that answers “what is it?” in prose.</strong>{" "}
            Perplexity cites sources it can quote. A hero that says “Operate
            at the speed of thought” gives the model nothing safe.
          </li>
          <li>
            <strong>A comparison you wrote.</strong> Buyers ask “you vs the
            tool they already know.” If the only URL with that sentence is a
            third-party roundup, the roundup gets the number. An honest{" "}
            <code>/compare</code> or <code>/alternatives</code> page is the
            fix. We did the smaller version of that for{" "}
            <Link href="/alternatives/otterly">Otterly</Link> and{" "}
            <Link href="/alternatives/profound">Profound</Link>.
          </li>
          <li>
            <strong>One dated, sourced fact.</strong> A year and a method
            beat “trusted by teams.” The evidence dimension looks for
            numbers, years, and words like study, survey, or benchmark. It
            does not go check whether the study is real. You should.
          </li>
          <li>
            <strong>PerplexityBot allowed, if you want to be fetched.</strong>{" "}
            We record allow, disallow, or unspecified for PerplexityBot. We
            do not record Perplexity-User. See{" "}
            <Link href="/ai-crawlers">the three tokens we parse</Link>.
          </li>
        </ul>
        <p>
          The longer unpaid list is the{" "}
          <Link href="/blog/chatgpt-citation-checklist">
            citation checklist
          </Link>
          . It was written around SaaS homepages. The Perplexity line weighs
          the evidence and comparison items on that list harder than the
          ChatGPT line does.
        </p>

        <h2>Same PDF, three different bars</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Row</th>
                <th>What moves it</th>
                <th>What we do not do</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Perplexity</th>
                <td>Evidence, markup, on-site comparison language</td>
                <td>Open Perplexity and read the footnotes</td>
              </tr>
              <tr>
                <th scope="row">
                  <Link href="/chatgpt-citation-check">ChatGPT</Link>
                </th>
                <td>Definitional lead, evidence, GPTBot access</td>
                <td>Send a prompt to ChatGPT</td>
              </tr>
              <tr>
                <th scope="row">
                  <Link href="/ai-overviews">AI Overviews</Link>
                </th>
                <td>FAQ and entity markup, answer-shaped copy</td>
                <td>Scrape a Google results page</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          If you already know the page is thin and you want the fixes
          ordered, the audit is the shortcut. If you want a weekly graph of
          whether Perplexity mentioned you for a prompt list, buy a monitor
          after the page can survive being quoted. Measuring a slogan
          produces a clean chart of absence.
        </p>

        <h2>Questions this page gets</h2>
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
