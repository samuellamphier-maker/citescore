import { ArticleShell } from "@/components/ArticleShell";
import { HowToGetCitedByChatgptArticle } from "@/components/articles/HowToGetCitedByChatgpt";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/how-to-get-cited-by-chatgpt");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function HowToGetCitedByChatgptPage() {
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
        ctaId="how-to-get-cited-by-chatgpt"
        guidePath={topic.path}
        related={[
          { href: "/free-check", label: "Free AI citation-readiness check" },
          { href: "/geo-audit", label: "$39 GEO audit" },
          { href: "/how-to-check-if-chatgpt-mentions-your-brand", label: "How to check if ChatGPT mentions your brand" },
          { href: "/chatgpt-citation-check", label: "ChatGPT citation check" },
          { href: "/how-to-get-cited-by-meta-ai", label: "How to get cited by Meta AI" },
          { href: "/how-to-get-cited-by-deepseek", label: "How to get cited by DeepSeek" },
          { href: "/how-to-get-cited-by-mistral", label: "How to get cited by Mistral" },
          { href: "/how-to-get-cited-by-brave-search", label: "How to get cited by Brave Search" },
          { href: "/how-to-get-cited-by-you-com", label: "How to get cited by You.com" },
          { href: "/how-to-get-cited-by-duckduckgo-ai", label: "How to get cited by DuckDuckGo" },
          { href: "/how-to-get-cited-by-perplexity-comet", label: "How to get cited by Perplexity Comet" },
          { href: "/checklist", label: "AI Citation Readiness Checklist" },
        ]}
      >
        <HowToGetCitedByChatgptArticle />
      </ArticleShell>
    </>
  );
}
