import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin, site } from "@/lib/site";

const topic = getTopic("/answer-engine-optimization");

const faqs = [
  {
    q: "Is AEO a different discipline from GEO?",
    a: "In vendor decks, sometimes. On a two-person SaaS site, no. Both phrases point at the same outcome: an answer engine quotes your page. CiteScore uses GEO because the PDF is about generative engines. If you searched AEO, you are in the right product.",
  },
  {
    q: "Is this an AEO rank tracker?",
    a: "No. Trackers watch a prompt list over time and charge monthly. This is one URL, a 0–100 score, and about ten fixes, for $39. Live ChatGPT, Perplexity, and Google AI Overviews sessions are not included.",
  },
  {
    q: "What should I read if I want the long definition?",
    a: "The GEO explainer. This page only maps the labels onto the audit so the search that said AEO still lands somewhere accurate.",
  },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function AnswerEngineOptimizationPage() {
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
        title="Answer engine optimization is the search. The PDF is a GEO audit."
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        ctaId="aeo"
        related={[
          { href: "/blog/what-is-geo", label: "What is GEO? — the longer definition" },
          { href: "/geo-audit", label: "GEO audit — what the $39 buys" },
          { href: "/chatgpt-citation-check", label: "ChatGPT citation check" },
          { href: "/ai-overviews", label: "Google AI Overviews visibility" },
          {
            href: "/blog/chatgpt-citation-checklist",
            label: "ChatGPT citation checklist",
          },
          {
            href: "/blog/citescore-vs-enterprise-geo-tools",
            label: "CiteScore vs enterprise GEO tools",
          },
        ]}
      >
        <p>
          Answer engine optimization — AEO — is the phrase for making a page
          the source an answer engine quotes. The engines in that sentence
          are the ones buyers already use: ChatGPT, Perplexity, Google AI
          Overviews, and the copilot boxes that sit on top of them. GEO
          (generative engine optimization), LLMO, and “AI search
          optimization” show up in the same articles. They are overlapping
          labels. They are not four methods with four toolchains.
        </p>
        <p>
          CiteScore picked GEO because the product is a generative-engine
          audit: one public URL, a 0–100 score, about ten fixes, {site.priceLabel}{" "}
          once. If you searched “AEO audit” and landed here, the deliverable
          is that PDF. The <Link href="/blog/what-is-geo">GEO explainer</Link>{" "}
          is the longer definition of the work. This page exists so the AEO
          wording is not a dead end.
        </p>

        <h2>What people are buying when they say AEO</h2>
        <p>
          The term covers two purchases that should not share a checkout.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Search</th>
                <th>The job</th>
                <th>CiteScore</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">AEO audit, AI visibility score</th>
                <td>
                  Tell me whether this URL can be quoted, and what to edit
                  this week.
                </td>
                <td>
                  Yes. On-page signals plus an optional LLM review of the
                  HTML we fetched.{" "}
                  <Link href="/geo-audit">The audit page</Link> lists the
                  PDF.
                </td>
              </tr>
              <tr>
                <th scope="row">AEO tracker, prompt monitoring</th>
                <td>
                  For this list of prompts, who got cited this week?
                </td>
                <td>
                  No. That is{" "}
                  <Link href="/alternatives/otterly">Otterly</Link> or a{" "}
                  <Link href="/alternatives/profound">Profound</Link>-class
                  platform. Different price, different job.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We do not log into ChatGPT, Perplexity, or Google to produce the
          score. The engine lines are inferred. A{" "}
          <Link href="/chatgpt-citation-check">ChatGPT citation check</Link>,
          an <Link href="/ai-overviews">AI Overviews</Link> read, and a{" "}
          <Link href="/perplexity-citations">Perplexity</Link> read are three
          slices of the same report, written up separately because the
          searches are separate.
        </p>

        <h2>Four questions AEO is actually asking</h2>
        <p>
          The <Link href="/blog/chatgpt-citation-checklist">checklist</Link>{" "}
          has twelve homepage checks. Underneath them, an answer engine is
          trying to finish four questions. Each one maps to a dimension in
          the PDF:
        </p>
        <ul>
          <li>
            <strong>What is it?</strong> Answer fitness. A definition in the
            first screen, not a slogan.
          </li>
          <li>
            <strong>Who says so?</strong> Entity clarity and
            source-worthiness. The same product name in the title, the H1,
            and JSON-LD, plus a person or an About page with a name on it.
          </li>
          <li>
            <strong>Compared with what?</strong> Citable evidence and the
            on-site mention-share signal. A comparison URL and one dated
            fact. Off-site share of voice is not in the crawl.
          </li>
          <li>
            <strong>Is this current, and may a model fetch it?</strong>{" "}
            Freshness, plus AI-crawler access:{" "}
            <Link href="/ai-crawlers">GPTBot, PerplexityBot, Google-Extended</Link>
            , and <Link href="/llms-txt">llms.txt</Link>.
          </li>
        </ul>
        <p>
          If those four are already in good shape, you do not need another
          acronym. You may need a monitor, later, once there is something
          worth counting. If they are not, a {site.priceLabel} punch list is
          the whole AEO engagement a small team can finish.
        </p>

        <h2>Who the label is for</h2>
        <p>
          Indie SaaS founders and small SEO shops use the audit as a Monday
          list or as the first artifact in a client engagement. Teams with a
          staffed GEO or AEO program, SSO requirements, and a prompt library
          are shopping in a different aisle. The{" "}
          <Link href="/blog/citescore-vs-enterprise-geo-tools">
            enterprise comparison
          </Link>{" "}
          says that plainly, including 2026 public prices you should
          re-check before you budget.
        </p>
        <p>
          Weekly rescans at {site.subscriptionPriceLabel} are on our roadmap.
          They are not for sale on this page. There is no seat and no card
          left on file after the one charge.
        </p>

        <h2>Questions about the label</h2>
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
