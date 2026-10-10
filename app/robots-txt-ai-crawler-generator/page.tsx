import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { RobotsTxtGenerator } from "@/components/RobotsTxtGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/robots-txt-ai-crawler-generator");

const related = [
  { href: "/llms-txt-generator", label: "llms.txt generator" },
  { href: "/robots-txt-ai-crawler-generator", label: "robots.txt AI crawler generator" },
  { href: "/faq-schema-generator", label: "FAQ schema generator" },
  { href: "/ai-crawler-robots-txt-checker", label: "AI crawler robots.txt checker" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function RobotsTxtAiCrawlerGeneratorPage() {
  return (
    <ArticleShell
      kicker={topic.kicker}
      title={topic.title}
      dek={topic.description}
      publishedAt={topic.publishedAt}
      minutes={topic.minutes}
      ctaId="robots-txt-ai-crawler-generator"
      related={related.filter((item) => item.href !== topic.path)}
    >
      <RobotsTxtGenerator />
      <h2>Which token does which job</h2>
      <p>
        A crawler uses the group that names it and ignores <code>User-agent: *</code>, so a private path has to be repeated on every Allow group. The generator does that. Unnamed agents, including Googlebot, follow the <code>*</code> group.
      </p>
      <ul>
        <li><strong>OAI-SearchBot</strong> — ChatGPT search. OpenAI says disallowing it keeps a site out of ChatGPT search answers.</li>
        <li><strong>ChatGPT-User</strong> — a fetch started by a person in ChatGPT. OpenAI says robots.txt may not apply.</li>
        <li><strong>GPTBot</strong> — OpenAI training. Independent of OAI-SearchBot.</li>
        <li><strong>PerplexityBot</strong> — Perplexity’s crawler. Perplexity-User is not listed; it follows <code>*</code>.</li>
        <li><strong>ClaudeBot</strong> — Anthropic. Claude-SearchBot is not listed; it follows <code>*</code>.</li>
        <li><strong>Google-Extended</strong> — Gemini Apps and Vertex AI training. Google says it does not change inclusion or ranking in Google Search, so it is not an <Link href="/ai-overviews">AI Overviews</Link> switch.</li>
      </ul>
      <h2>How to publish it</h2>
      <p>
        If you already have a robots.txt, copy the named groups in and merge the private paths with the rules you already wrote for Googlebot. Replacing the whole file can drop a Sitemap line or a Googlebot group you meant to keep. If you do not have a file, the copy is a complete starter.
      </p>
      <p>
        The <Link href="/free-check">free check</Link> reads the live file for GPTBot, PerplexityBot and Google-Extended. The <Link href="/geo-audit">$39 audit</Link> scores the page those crawlers would fetch. The longer notes on each token are on the <Link href="/ai-crawlers">crawler guide</Link>.
      </p>
      <ToolNextLinks />
    </ArticleShell>
  );
}
