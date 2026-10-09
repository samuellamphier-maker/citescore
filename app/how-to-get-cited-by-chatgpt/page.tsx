import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/how-to-get-cited-by-chatgpt");
const html = "<h2>1. Make sure ChatGPT can actually fetch you</h2><p>ChatGPT search uses OAI-SearchBot to find pages and GPTBot for training. If your <code>robots.txt</code> disallows them, or a CDN bot-fight mode returns 403, you are invisible no matter how good the page is. Run the <a href=\"/free-check\">free check</a> to see what your robots.txt says to each AI crawler.</p><h2>2. Answer the question in the first two sentences</h2><p>Answer engines lift short, self-contained passages. Put a direct answer under each H2, then the nuance. Pages that open with brand story and bury the answer get skipped for a competitor's FAQ.</p><h2>3. Show evidence a model can quote</h2><p>Specific numbers, dates, named sources and first-hand data are what get footnoted. Vague claims (\"industry-leading\") are not citable.</p><h2>4. Make the entity unambiguous</h2><p>Say plainly who you are, what you sell, where, and for whom. Add Organization and FAQPage JSON-LD so the facts are machine-readable.</p><h2>5. Keep a clean sitemap and an llms.txt</h2><p>A sitemap helps discovery; <a href=\"/llms-txt\">llms.txt</a> is an optional map of your best URLs. Neither guarantees a citation, both are cheap.</p><h2>6. Earn mentions elsewhere</h2><p>ChatGPT leans on pages that are already referenced across the web: directories, reviews, comparison posts, Reddit threads. One honest listing beats ten stuffed keywords.</p><h2>7. Measure the page, not the vibe</h2><p>The <a href=\"/geo-audit\">$39 CiteScore audit</a> scores one URL on eight dimensions and returns about ten fixes, so you know which of the steps above actually matter for that page.</p>";

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function HowToGetCitedByChatgptPage() {
  return (
    <ArticleShell
      kicker={topic.kicker}
      title={topic.title}
      dek={topic.description}
      publishedAt={topic.publishedAt}
      minutes={topic.minutes}
      ctaId="how-to-get-cited-by-chatgpt"
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
