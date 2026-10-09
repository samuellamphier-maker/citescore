import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/ai-crawler-robots-txt-checker");
const html = "<h2>Check your robots.txt in seconds</h2><p>Paste your domain into the <a href=\"/free-check\">free AI visibility check</a>. It reads <code>/robots.txt</code> and reports whether GPTBot, PerplexityBot and Google-Extended are allowed, blocked, or falling back to the <code>*</code> group.</p><h2>The AI user agents that matter</h2><ul><li><strong>OAI-SearchBot</strong> \u2013 ChatGPT search results.</li><li><strong>GPTBot</strong> \u2013 OpenAI training crawl.</li><li><strong>ChatGPT-User</strong> \u2013 fetches when a user asks ChatGPT to open a link.</li><li><strong>PerplexityBot</strong> \u2013 Perplexity's index.</li><li><strong>ClaudeBot</strong> \u2013 Anthropic.</li><li><strong>Google-Extended</strong> \u2013 controls Gemini training use; it does not remove you from AI Overviews.</li></ul><h2>Allow answer engines, keep a private area private</h2><pre><code>User-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: *\nDisallow: /admin/\nSitemap: https://example.com/sitemap.xml</code></pre><h2>Common mistakes</h2><p>Blanket <code>Disallow: /</code> left over from staging; a WAF that 403s bots even when robots.txt allows them; and assuming blocking Google-Extended hides you from AI Overviews. See <a href=\"/ai-crawlers\">our crawler guide</a> for details.</p>";

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function AiCrawlerRobotsTxtCheckerPage() {
  return (
    <ArticleShell
      kicker={topic.kicker}
      title={topic.title}
      dek={topic.description}
      publishedAt={topic.publishedAt}
      minutes={topic.minutes}
      ctaId="ai-crawler-robots-txt-checker"
      related={[
        { href: "/free-check", label: "Free AI visibility check" },
        { href: "/how-to-get-cited-by-chatgpt", label: "How to get cited by ChatGPT" },
        { href: "/ai-crawler-robots-txt-checker", label: "AI crawler robots.txt checker" },
        { href: "/aeo-checklist", label: "AEO checklist" },
        { href: "/geo-audit", label: "$39 GEO audit" },
      ].filter((r) => r.href !== topic.path)}
    >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      <p><Link href="/free-check">Run the free check</Link></p>
    </ArticleShell>
  );
}
