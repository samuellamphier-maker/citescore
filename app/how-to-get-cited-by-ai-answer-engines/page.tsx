import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/how-to-get-cited-by-ai-answer-engines");
const html = "<h2>1. Let every answer engine fetch you</h2><p>Each engine has its own crawler: OAI-SearchBot and GPTBot (ChatGPT), PerplexityBot (Perplexity), ClaudeBot (Claude), and Googlebot plus the Google-Extended token (Gemini and AI Overviews). Check that <code>robots.txt</code> and your CDN don\'t block them. The <a href=\"/free-check\">free check</a> shows what each one sees.</p><h2>2. Put the answer first</h2><p>Answer engines quote short passages that stand on their own. Under each H2, give a direct one or two sentence answer before the detail.</p><h2>3. Make claims citable</h2><p>Numbers, dates, named sources and first-hand data get footnoted. Marketing adjectives don\'t.</p><h2>4. Add structured data</h2><p>Organization, Product, Article and FAQPage JSON-LD make the facts machine-readable. Use the <a href=\"/llms-txt-generator\">llms.txt generator</a> to give models a map of your best URLs.</p><h2>5. Keep pages fast and crawlable</h2><p>Server-render the main content, keep a clean sitemap, and avoid gating answers behind JavaScript or logins.</p><h2>6. Earn mentions off-site</h2><p>Perplexity and ChatGPT lean on sources that are already referenced across the web: directories, reviews, comparisons and community threads.</p><h2>7. Measure one page at a time</h2><p>The <a href=\"/geo-audit\">$39 CiteScore audit</a> scores one URL on eight dimensions and returns about ten prioritized fixes.</p>";

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
