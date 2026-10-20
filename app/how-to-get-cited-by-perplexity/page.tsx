import { ArticleShell } from "@/components/ArticleShell";
import { HowToGetCitedByPerplexityArticle } from "@/components/articles/HowToGetCitedByPerplexity";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/how-to-get-cited-by-perplexity");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function HowToGetCitedByPerplexityPage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: topic.title,
          description: topic.description,
          datePublished: topic.publishedAt,
          url: `${origin}${topic.path}`,
          author: {
            "@type": "Organization",
            name: "CiteScore Team",
            url: origin,
          },
          publisher: { "@type": "Organization", name: "CiteScore", url: origin },
        }}
      />
      <ArticleShell
        kicker={topic.kicker}
        title={topic.title}
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        author="CiteScore Team"
        ctaId="how-to-get-cited-by-perplexity"
        guidePath={topic.path}
        related={[
          { href: "/free-check", label: "Free AI citation-readiness check" },
          { href: "/geo-audit", label: "$39 GEO audit" },
          { href: "/perplexity-citations", label: "Perplexity citations" },
          { href: "/how-to-get-cited-by-meta-ai", label: "How to get cited by Meta AI" },
          { href: "/how-to-get-cited-by-deepseek", label: "How to get cited by DeepSeek" },
          { href: "/how-to-get-cited-by-mistral", label: "How to get cited by Mistral" },
          { href: "/how-to-get-cited-by-brave-search", label: "How to get cited by Brave Search" },
          { href: "/how-to-get-cited-by-you-com", label: "How to get cited by You.com" },
          { href: "/robots-txt-ai-crawler-generator", label: "Free robots.txt AI crawler generator" },
        ]}
      >
        <HowToGetCitedByPerplexityArticle />
      </ArticleShell>
    </>
  );
}
