import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { templatePackLabel, templatePackUrl } from "@/lib/site";

const topic = getTopic("/how-to-get-cited-by-ai-answer-engines");
const html = "<h2>1. Use the control each operator publishes</h2><p>ChatGPT search answers depend on OAI-SearchBot. GPTBot is OpenAI’s separate training crawler. Perplexity recommends allowing PerplexityBot, and requests from its published IP ranges, for Perplexity search. Google AI Overviews are a Search feature: the page has to be indexed and eligible for a snippet, and the site has to be included in Search generative AI features in Search Console. Google says Google-Extended does not change Google Search inclusion or ranking. xAI documents Grok web citations as a real-time Web Search tool and does not publish a robots.txt token for that fetch. Meta’s crawler page says allowing Meta-WebIndexer helps Meta AI cite and link to a page. Meta-ExternalAgent is a separate token for training or indexing, and that page does not list FacebookBot. DeepSeek’s Search and Fetch guide describes an in-house search API and a Markdown fetch of one page. It does not name a robots.txt token. Mistral’s product page says Le Chat is now Vibe. Its crawler page names MistralAI-User, MistralAI-Index, and MistralAI-Training. The page is <a href=\"/how-to-get-cited-by-mistral\">how to get cited by Mistral</a>. Brave Search’s crawler page says the crawler does not advertise a differentiated user agent, and that a page Googlebot cannot crawl is a page Brave will not crawl. AI Answers cite sources from Brave’s own index. The page is <a href=\"/how-to-get-cited-by-brave-search\">how to get cited by Brave Search</a>. Google AI Mode uses the same indexing and snippet rules as AI Overviews, and Search Console counts a follow-up inside AI Mode as a new query. The longer pages are <a href=\"/how-to-get-cited-by-chatgpt\">how to get cited by ChatGPT</a>, <a href=\"/how-to-get-cited-by-perplexity\">how to get cited by Perplexity</a>, <a href=\"/how-to-get-cited-by-grok\">how to get cited by Grok</a>, <a href=\"/how-to-get-cited-by-meta-ai\">how to get cited by Meta AI</a>, <a href=\"/how-to-get-cited-by-deepseek\">how to get cited by DeepSeek</a>, <a href=\"/how-to-get-cited-by-mistral\">how to get cited by Mistral</a>, <a href=\"/how-to-get-cited-by-brave-search\">how to get cited by Brave Search</a>, <a href=\"/google-ai-overviews-optimization\">Google AI Overviews optimization</a>, and <a href=\"/google-ai-mode-optimization\">Google AI Mode optimization</a>.</p><h2>2. Put the answer in text the crawler can fetch</h2><p>A product name, what it does, and who it is for belong in the HTML. OpenAI, Perplexity, and Google do not publish a word count or a citation rate for that sentence.</p><h2>3. Skip the files they do not ask for</h2><p>Google’s optimization guide says an llms.txt file neither helps nor harms Google Search, and that there is no special schema to add for AI Overviews. OpenAI’s crawler overview and Perplexity’s crawler page do not list a schema type. The <a href=\"/llms-txt-generator\">llms.txt generator</a> is there if you want the file for some other reader.</p><h2>4. Check the tokens the free tool actually reads</h2><p>The <a href=\"/free-check\">free check</a> reads GPTBot, PerplexityBot, and Google-Extended. It does not read OAI-SearchBot, and it does not query ChatGPT, Perplexity, or Google. A SaaS pass list is the <a href=\"/ai-search-readiness-checklist-for-saas\">AI search readiness checklist for SaaS</a>. The 40-point on-page list is the <a href=\"/checklist\">citation checklist</a>.</p><h2>5. Score one URL when you want the punch list</h2><p>The <a href=\"/geo-audit\">$39 CiteScore audit</a> scores one public URL from the HTML we fetch and returns about ten prioritized fixes. We do not log into the answer engines.</p>";

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function HowToGetCitedByAiAnswerEnginesPage() {
  return (
    <ArticleShell
      kicker={topic.kicker}
      title={topic.title}
      dek={topic.description}
      publishedAt={topic.publishedAt}
      minutes={topic.minutes}
      ctaId="how-to-get-cited-by-ai-answer-engines"
      guidePath={topic.path}
      related={[
        { href: "/free-check", label: "Free AI visibility check" },
        { href: "/how-to-get-cited-by-chatgpt", label: "How to get cited by ChatGPT" },
        { href: "/how-to-get-cited-by-grok", label: "How to get cited by Grok" },
        { href: "/how-to-get-cited-by-meta-ai", label: "How to get cited by Meta AI" },
        { href: "/how-to-get-cited-by-deepseek", label: "How to get cited by DeepSeek" },
        { href: "/how-to-get-cited-by-mistral", label: "How to get cited by Mistral" },
        { href: "/how-to-get-cited-by-brave-search", label: "How to get cited by Brave Search" },
        { href: "/website-schema-generator", label: "Free WebSite schema generator" },
        { href: "/video-schema-generator", label: "Free Video schema generator" },
        { href: "/event-schema-generator", label: "Free Event schema generator" },
        { href: "/review-schema-generator", label: "Free Review schema generator" },
        { href: "/service-schema-generator", label: "Free Service schema generator" },
        { href: "/google-ai-mode-optimization", label: "Google AI Mode optimization" },
        { href: "/ai-crawler-robots-txt-checker", label: "AI crawler robots.txt checker" },
        { href: "/aeo-checklist", label: "AEO checklist" },
        { href: "/geo-audit", label: "$39 GEO audit" },
      ].filter((r) => r.href !== topic.path)}
    >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      <p>
        <Link href="/free-check">Run the free check</Link>. The{" "}
        <a href={templatePackUrl} target="_blank" rel="noopener noreferrer">
          {templatePackLabel}
        </a>{" "}
        is a separate $19 purchase from the check and the audit.
      </p>
    </ArticleShell>
  );
}
