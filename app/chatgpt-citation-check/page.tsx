import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/chatgpt-citation-check");

const faqs = [
  {
    q: "Do you open ChatGPT and search my brand?",
    a: "No. The ChatGPT row is inferred from on-page signals — definitions, entities, evidence, schema, freshness, and crawler access — plus an optional language-model review of the public HTML we fetched. The report says so.",
  },
  {
    q: "Can the status say Cited?",
    a: "The status set is Cited, Mentioned, Absent, or Competitor cited. We prefer Mentioned or Absent. Cited is reserved for when the HTML itself shows a third-party citation. Marketing copy alone does not count.",
  },
  {
    q: "How is this different from the citation checklist?",
    a: "The checklist is twelve things you can inspect yourself. This check is the scored PDF: a 0–100 CiteScore, a ChatGPT snapshot, and about ten ranked fixes for the URL you paid for.",
  },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function ChatgptCitationCheckPage() {
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
        title="A ChatGPT citation check that never opens ChatGPT"
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        ctaId="chatgpt-citation-check"
        related={[
          {
            href: "/blog/chatgpt-citation-checklist",
            label: "ChatGPT citation checklist — twelve on-page checks",
          },
          { href: "/ai-crawlers", label: "GPTBot, PerplexityBot, and Google-Extended" },
          { href: "/ai-overviews", label: "Google AI Overviews visibility" },
          { href: "/perplexity-citations", label: "Perplexity citations" },
          { href: "/geo-audit", label: "GEO audit — the same $39 PDF" },
          { href: "/sample", label: "Sample report (fictional company)" },
        ]}
      >
        <p>
          People search “ChatGPT citation check” when a buyer’s answer named
          a competitor and skipped the product. The honest version of that
          check is narrow. It asks whether the public page gives a model a
          definition, a name, and a fact it can lift — and whether the bots
          that fetch pages for training are blocked. It does not ask ChatGPT
          a prompt and screenshot the reply.
        </p>
        <p>
          CiteScore is that check, sold as a{" "}
          <Link href="/geo-audit">$39 GEO audit</Link> of one URL. You get a
          0–100 score, a per-engine snapshot that includes a ChatGPT line, and
          about ten fixes in a PDF. When a language-model key is configured,
          the model rewrites the summary and the fix list from the HTML we
          fetched. That review is optional infrastructure, disclosed on{" "}
          <Link href="/privacy">Privacy</Link>. It is not a ChatGPT account
          with your URL typed into the box.
        </p>

        <h2>What the ChatGPT row is allowed to say</h2>
        <p>
          The snapshot status is one of four words: Cited, Mentioned, Absent,
          or Competitor cited. For ChatGPT, the baseline is conservative.
          Poor AI-crawler access lands on Absent. A page with a definitional
          lead and something quotable — a number, a year, a named method —
          can move to Mentioned. We do not mint Cited because the homepage
          says the product is “loved by teams.” Cited is for when the HTML
          itself shows a third-party citation. The language-model pass may
          adjust wording and scores within a tight band. It is instructed not
          to invent a live citation.
        </p>
        <p>
          The fictional{" "}
          <Link href="/sample">Northbound sample</Link> shows the shape:
          ChatGPT “Mentioned,” with a sentence that the product shows up as a
          category example and almost never as the source. Northbound is not
          a customer. The format is the one you buy.
        </p>

        <h2>The signals behind that row</h2>
        <p>
          The score is weighted across eight dimensions. Three of them do
          most of the work for the ChatGPT line:
        </p>
        <ul>
          <li>
            <strong>Answer fitness.</strong> A self-contained “X is a Y that
            helps Z” in the first screen, plus question-shaped headings. A
            slogan under eight words with no period is treated as a weak lead.
          </li>
          <li>
            <strong>Citable evidence.</strong> Dates, counts, and research
            language. A comparison or alternatives URL on the same host helps.
            Off-site mention share is not crawled — the “mention share”
            dimension only sees comparison language on the site you submitted.
          </li>
          <li>
            <strong>AI-crawler access.</strong> We fetch <code>robots.txt</code>{" "}
            and record allow, disallow, or unspecified for GPTBot,
            PerplexityBot, and Google-Extended. We also fetch{" "}
            <code>/llms.txt</code>. Detail lives on the{" "}
            <Link href="/ai-crawlers">crawler page</Link> and the{" "}
            <Link href="/llms-txt">llms.txt page</Link>.
          </li>
        </ul>
        <p>
          Entity markup, FAQPage JSON-LD, author attribution, and visible
          dates still move the overall 0–100. They matter more for the{" "}
          <Link href="/ai-overviews">AI Overviews</Link> and{" "}
          <Link href="/perplexity-citations">Perplexity</Link> rows than they
          do for the ChatGPT threshold, which is why a single score can look
          “fine” while one engine line says Absent.
        </p>

        <h2>What a citation check cannot see</h2>
        <p>
          ChatGPT answers move with the prompt, the memory on that account,
          whether browsing is on, and the day the model was willing to fetch.
          A check of your homepage cannot reproduce that. If you need “for
          these 40 prompts, did ChatGPT mention us this week?”, that is a
          monitoring product.{" "}
          <Link href="/alternatives/otterly">Otterly</Link> and{" "}
          <Link href="/alternatives/profound">Profound</Link> sell that job.
          CiteScore sells the prior job: make the page worth mentioning
          before you pay to watch prompts.
        </p>
        <p>
          We also do not parse every OpenAI user-agent. GPTBot is the token
          on the crawler dimension. ChatGPT-User and OAI-SearchBot — the
          agents OpenAI documents for user-triggered browsing and search —
          are not read. Allowing those two while disallowing GPTBot is a real
          configuration. Our ChatGPT row will still treat the GPTBot disallow
          as a negative crawler signal. If that disallow is deliberate (you
          opted out of training crawls), read the crawler dimension with that
          policy in mind.
        </p>

        <h2>Checklist, then the paid check</h2>
        <p>
          The{" "}
          <Link href="/blog/chatgpt-citation-checklist">
            citation checklist
          </Link>{" "}
          is the unpaid version: twelve homepage checks, including the
          definition, the FAQ, the dated fact, and the robots.txt own-goal.
          Use it if you want to edit before you buy. Buy the check when you
          want those checks scored against the URL you actually ship, with
          the fixes ordered and written down.
        </p>
        <p>
          Same product as the{" "}
          <Link href="/blog/what-is-geo">GEO explainer</Link> describes. The
          URL is different because the search is different. One charge, one
          PDF, no account.
        </p>

        <h2>Questions the check gets</h2>
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
