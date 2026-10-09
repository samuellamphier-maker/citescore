import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/aeo-checklist");
const html = "<h2>Access</h2><ul><li>robots.txt allows OAI-SearchBot, PerplexityBot and Googlebot.</li><li>No WAF/CDN block on AI user agents.</li><li>Sitemap present and declared in robots.txt.</li><li>Optional: a non-empty /llms.txt.</li></ul><p>Verify all four with the <a href=\"/free-check\">free check</a>.</p><h2>Content</h2><ul><li>Each key page answers its main question in the first 50 words.</li><li>H2s phrased as the questions people ask.</li><li>Specific numbers, dates and sources.</li><li>A clear statement of who you are and who it's for.</li></ul><h2>Markup</h2><ul><li>Organization JSON-LD on the homepage.</li><li>FAQPage or HowTo schema where it fits.</li><li>A meta description that reads as a standalone answer.</li><li>Server-rendered HTML (answer engines often skip JS-only content).</li></ul><h2>Score it</h2><p>The <a href=\"/geo-audit\">$39 audit</a> turns this checklist into a 0\u2013100 score for one page, with about ten prioritized fixes.</p>";

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function AeoChecklistPage() {
  return (
    <ArticleShell
      kicker={topic.kicker}
      title={topic.title}
      dek={topic.description}
      publishedAt={topic.publishedAt}
      minutes={topic.minutes}
      ctaId="aeo-checklist"
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
