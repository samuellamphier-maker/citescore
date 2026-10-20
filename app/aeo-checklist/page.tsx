import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/aeo-checklist");
const html = "<h2>Access</h2><ul><li>robots.txt allows OAI-SearchBot, PerplexityBot and Googlebot.</li><li>No WAF/CDN block on AI user agents.</li><li>Sitemap present and declared in robots.txt.</li><li>Optional: a non-empty /llms.txt.</li><li>The wider token list, with what each operator publishes about robots.txt, is the <a href=\"/ai-crawler-user-agents\">AI crawler user-agent reference</a>.</li></ul><p>Verify all four with the <a href=\"/free-check\">free check</a>.</p><h2>Content</h2><ul><li>Each key page answers its main question in the first 50 words.</li><li>H2s phrased as the questions people ask.</li><li>Specific numbers, dates and sources.</li><li>A clear statement of who you are and who it's for.</li></ul><h2>Markup</h2><ul><li>Organization JSON-LD on the homepage. The <a href=\"/organization-schema-generator\">Organization schema generator</a> copies a script from the name, URL, logo, description, profiles, and email already on the page.</li><li>WebSite JSON-LD on the homepage. The <a href=\"/website-schema-generator\">WebSite schema generator</a> copies the site name, URL, an optional alternate name, an optional search URL template, and an optional publisher.</li><li>Product JSON-LD on a page that sells one product. The <a href=\"/product-schema-generator\">Product schema generator</a> copies the name, image, price, and availability already on the page.</li><li>SoftwareApplication JSON-LD on a page that describes one app. The <a href=\"/software-application-schema-generator\">Software application schema generator</a> copies the name, operating system, category, and price already on the page.</li><li>Article or BlogPosting on a guide or a post. The <a href=\"/article-schema-generator\">Article schema generator</a> copies the headline, dates, author, and publisher already on the page.</li><li>Person JSON-LD on a page that names a person. The <a href=\"/person-schema-generator\">Person schema generator</a> copies the name, job title, profiles, employer, and topics already on the page. A team byline stays an Organization.</li><li>FAQPage where the page answers questions. The <a href=\"/faq-schema-generator\">FAQ schema generator</a> copies questions that are already visible.</li><li>HowTo on a page that shows a procedure. The <a href=\"/howto-schema-generator\">HowTo schema generator</a> copies the name, time, cost, supplies, tools, and steps already on the page.</li><li>LocalBusiness JSON-LD on a location page. The <a href=\"/local-business-schema-generator\">Local business schema generator</a> copies the name, address, phone, and hours already on the page.</li><li>BreadcrumbList on a page that shows a trail. The <a href=\"/breadcrumb-schema-generator\">Breadcrumb schema generator</a> numbers each name and URL in order.</li><li>VideoObject on a watch page. The <a href=\"/video-schema-generator\">Video schema generator</a> copies the title, description, thumbnail, upload date, duration, and file or player URL already on the page.</li><li>Event JSON-LD on a page for one event. The <a href=\"/event-schema-generator\">Event schema generator</a> copies the name, start, attendance mode, place or virtual URL, and any price already on the page.</li><li>Review and AggregateRating on a product or app page that already shows them. The <a href=\"/review-schema-generator\">Review schema generator</a> copies that rating and review text. It does not write a self-serving review of your own LocalBusiness or Organization.</li><li>A meta description that reads as a standalone answer.</li><li>Server-rendered HTML (answer engines often skip JS-only content).</li></ul><h2>Score it</h2><p>The <a href=\"/geo-audit\">$39 audit</a> turns this checklist into a 0\u2013100 score for one page, with about ten prioritized fixes.</p>";

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
