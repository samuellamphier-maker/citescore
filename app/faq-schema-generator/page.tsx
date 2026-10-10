import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { FaqSchemaGenerator } from "@/components/FaqSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/faq-schema-generator");

const related = [
  { href: "/llms-txt-generator", label: "llms.txt generator" },
  { href: "/robots-txt-ai-crawler-generator", label: "robots.txt AI crawler generator" },
  { href: "/faq-schema-generator", label: "FAQ schema generator" },
  { href: "/aeo-checklist", label: "AEO checklist" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function FaqSchemaGeneratorPage() {
  return (
    <ArticleShell
      kicker={topic.kicker}
      title={topic.title}
      dek={topic.description}
      publishedAt={topic.publishedAt}
      minutes={topic.minutes}
      ctaId="faq-schema-generator"
      related={related.filter((item) => item.href !== topic.path)}
    >
      <FaqSchemaGenerator />
      <h2>What the script is</h2>
      <p>
        The copy block is a <code>script</code> tag with FAQPage JSON-LD: one Question per row, and one accepted answer. Paste it into the same page that shows those questions, in the HTML the server sends. Answer engines often skip text that only appears after JavaScript runs.
      </p>
      <h2>What it does not do</h2>
      <p>
        Google stopped showing FAQ rich results in May 2026. This markup will not bring back an accordion under a Google listing. Keep it when the questions are real and visible. The <Link href="/geo-audit">$39 audit</Link> looks for JSON-LD that matches the copy, and the <Link href="/free-check">free check</Link> reports the <code>@type</code> values it finds on the homepage.
      </p>
      <ul>
        <li>The question and the answer both need to be on the page. An expandable answer is fine if a person can open it.</li>
        <li>One answer per question. A page where visitors post competing answers is a QAPage, which this generator does not emit.</li>
        <li>Do not mark up the same FAQ on every URL. One canonical page is enough.</li>
      </ul>
      <ToolNextLinks />
    </ArticleShell>
  );
}
