import type { ReactNode } from "react";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import type { TopicPage } from "@/lib/content/topics";
import { publicOrigin } from "@/lib/site";

export function GuideDocument({
  topic,
  related,
  children,
}: {
  topic: TopicPage;
  related: { href: string; label: string }[];
  children: ReactNode;
}) {
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
        ctaId={topic.path.slice(1)}
        guidePath={topic.path}
        showAuditCta={false}
        related={related}
      >
        {children}
      </ArticleShell>
    </>
  );
}
