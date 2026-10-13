import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { FreeCheckTool } from "@/components/FreeCheckTool";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/free-check");


export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function FreeCheckPage() {
  return (
    <ArticleShell
      kicker={topic.kicker}
      title={topic.title}
      dek={topic.description}
      publishedAt={topic.publishedAt}
      minutes={topic.minutes}
      ctaId="free-check"
      related={[
        { href: "/free-check", label: "Free AI visibility check" },
        { href: "/how-to-get-cited-by-chatgpt", label: "How to get cited by ChatGPT" },
        { href: "/ai-crawler-robots-txt-checker", label: "AI crawler robots.txt checker" },
        { href: "/aeo-checklist", label: "AEO checklist" },
        { href: "/geo-audit", label: "$39 GEO audit" },
      ].filter((r) => r.href !== topic.path)}
    >
        <FreeCheckTool />
        <h2>What this free check looks at</h2>
        <p>Six public citation-readiness signals: homepage reachability, AI-crawler rules in robots.txt (GPTBot, PerplexityBot, Google-Extended), llms.txt, sitemap, JSON-LD schema, and a meta description. CiteScore reads those files. It does not query live ChatGPT, Perplexity, or Google AI Overviews.</p>
        <p>Passing all six means the basics are in place. Whether an answer engine cites the page depends on the content itself — that is what the <Link href="/geo-audit">$39 audit</Link> turns into a prioritized, page-specific fix list.</p>
      <p><Link href="/free-check">Run the free check</Link></p>
    </ArticleShell>
  );
}
