import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { LlmsTxtGenerator } from "@/components/LlmsTxtGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/llms-txt-generator");

const related = [
  { href: "/llms-txt-generator", label: "llms.txt generator" },
  { href: "/robots-txt-ai-crawler-generator", label: "robots.txt AI crawler generator" },
  { href: "/faq-schema-generator", label: "FAQ schema generator" },
  { href: "/llms-txt", label: "llms.txt checker" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function LlmsTxtGeneratorPage() {
  return (
    <ArticleShell
      kicker={topic.kicker}
      title={topic.title}
      dek={topic.description}
      publishedAt={topic.publishedAt}
      minutes={topic.minutes}
      ctaId="llms-txt-generator"
      related={related.filter((item) => item.href !== topic.path)}
    >
      <LlmsTxtGenerator />
      <h2>What goes in the file</h2>
      <p>
        The proposal at llmstxt.org is a Markdown file, usually at <code>/llms.txt</code>. The H1 is the site or product name. The blockquote is one or two sentences a model can quote as the definition. Each H2 is a list of absolute URLs: the link text is the page title, and an optional note comes after a colon. A section titled Optional is the conventional place for a changelog, a blog, or anything a model can skip.
      </p>
      <p>
        CiteScore does not grade the writing inside the file. On a <Link href="/geo-audit">$39 audit</Link>, found means <code>/llms.txt</code> returned a non-empty body. A missing file does not zero the score. The page the file points at still has to answer the question. The <Link href="/llms-txt">llms.txt checker</Link> is the exact HTTP check.
      </p>
      <h2>Before you upload it</h2>
      <ul>
        <li>Use canonical URLs. Leave off campaign links and pages that 404.</li>
        <li>Match the homepage definition, so the file and the HTML do not describe two products.</li>
        <li>Serve it as text, not an HTML error page that happens to return 200.</li>
      </ul>
      <ToolNextLinks />
    </ArticleShell>
  );
}
