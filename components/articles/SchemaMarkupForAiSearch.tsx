import Link from "next/link";
import { getTopic } from "@/lib/content/topics";
import { productionOrigin } from "@/lib/site";

const preClass =
  "overflow-x-auto rounded-xl border border-rule bg-cream p-4 font-mono text-[13px] leading-6 text-ink";

export const schemaFaqs = [
  {
    q: "Does JSON-LD make an answer engine cite the page?",
    a: "No. JSON-LD labels facts that are already in the HTML. It does not rank the page, and it does not create a citation. A fact that exists only inside the script, or only inside an image, is a fact a person on the page cannot see. Write the sentence first. Then repeat it in the script.",
  },
  {
    q: "Can FAQPage markup stand in for questions that are not on the page?",
    a: "No. The question and the answer both need to be in the HTML a person can read. Google’s Search Central changelog says FAQ rich results stopped appearing in Google Search on 7 May 2026, so this markup will not restore an accordion under a blue link. Keep it when the pairs on the page are real.",
  },
  {
    q: "Should the Product example include a star rating?",
    a: "Only when the page shows a rating you can support. CiteScore does not publish an aggregate rating or a review count, so the Product example on this page has neither aggregateRating nor review. Inventing either one describes a different product from the one on the page.",
  },
];

function script(data: unknown) {
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
}

export function organizationExample() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CiteScore",
    url: productionOrigin,
    description:
      "A one-time GEO audit for indie SaaS founders and small SEO agencies.",
  };
}

export function productExample() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "CiteScore GEO audit",
    description:
      "A one-time audit of one public URL: a 0–100 CiteScore and about ten prioritized fixes, delivered as a PDF.",
    brand: {
      "@type": "Brand",
      name: "CiteScore",
    },
    offers: {
      "@type": "Offer",
      price: "39",
      priceCurrency: "USD",
      url: `${productionOrigin}/geo-audit`,
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: schemaFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function articleJsonLd(origin: string) {
  const topic = getTopic("/schema-markup-for-ai-search");
  return {
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
    publisher: {
      "@type": "Organization",
      name: "CiteScore",
      url: origin,
    },
    mainEntityOfPage: `${origin}${topic.path}`,
  };
}

export function SchemaMarkupForAiSearchArticle({ origin }: { origin: string }) {
  return (
    <>
      <p>
        Schema markup is a labeled copy of facts the page already states.
        JSON-LD, a <code>script</code> tag with{" "}
        <code>type=&quot;application/ld+json&quot;</code>, is the format
        Google recommends because it is easier to keep next to the HTML than
        attributes scattered through the layout. The four blocks below are
        Organization, Product, FAQPage, and Article. Each one is valid only
        when a person can read the same facts on that URL.
      </p>
      <p>
        None of them is a ranking file, and none of them makes ChatGPT,
        Perplexity, Claude, or Google AI Overviews cite you. The{" "}
        <Link href="/free-check">free check</Link> lists the JSON-LD types
        on the homepage. The <Link href="/geo-audit">$39 audit</Link> looks
        for markup that matches the copy. We do not log into those products.
        A shorter comparison of what schema changes, and what a rank report
        still does not say, is <Link href="/geo-vs-seo">GEO vs SEO</Link>.
      </p>

      <h2>The rule before the script</h2>
      <ul>
        <li>
          The name in the script is the name in the title, the H1, and the
          footer. A nickname in JSON-LD and a legal name in the footer
          describes two entities.
        </li>
        <li>
          A price, a date, and a description in the script are the price,
          the date, and the description on the page. Do not add a field to
          fill a template.
        </li>
        <li>
          Leave out <code>aggregateRating</code> and <code>review</code>{" "}
          unless the page shows a rating you can support. This site does not
          publish one, so the Product example has none.
        </li>
        <li>
          Put the script in the HTML the server sends. Text that appears
          only after JavaScript runs is text many crawlers never read.
        </li>
      </ul>

      <h2>Organization</h2>
      <p>
        Use Organization on the page that identifies the company: the
        homepage or an About page. <code>name</code> and <code>url</code>{" "}
        are the fields that stop a parser guessing. Add <code>logo</code>{" "}
        only when that URL is a real image file a crawler can fetch. The
        CiteScore mark in the header is drawn in the page, not served as an
        image file, so this example has no logo. Add <code>sameAs</code>{" "}
        only for profiles that are actually yours. The description matches
        the footer on this site.
      </p>
      <pre className={preClass}>{script(organizationExample())}</pre>
      <p>
        If you copy this onto another site, replace the name, the URL, and
        the description. Pasting CiteScore’s name onto your domain describes
        the wrong organization. The{" "}
        <Link href="/organization-schema-generator">
          Organization schema generator
        </Link>{" "}
        builds the same shape from a name, URL, logo, description, profile
        URLs, and a contact email, and it can add a WebSite block. It
        uploads nothing.
      </p>

      <h2>Product</h2>
      <p>
        Use Product on the page that sells the thing, with an Offer for the
        price that page shows. This example is the CiteScore audit: one
        public URL, a 0–100 score, about ten fixes, delivered as a PDF for
        $39. The price is the number on the{" "}
        <Link href="/geo-audit">audit page</Link>. There is no availability
        field, because a checkout that is not configured on a given deploy
        should not be marked in stock by a template. There is no rating.
      </p>
      <pre className={preClass}>{script(productExample())}</pre>
      <p>
        Put this block on the URL in <code>offers.url</code>, not on every
        guide. A guide that mentions a price is not the product page.{" "}
        <code>price</code> is a string so a decimal such as{" "}
        <code>39.00</code> survives. <code>priceCurrency</code> is the ISO
        code, here <code>USD</code>. Change both if your price is different.
        Do not invent a <code>sku</code>, a <code>gtin</code>, or a review
        count to look complete.
      </p>

      <h2>FAQ</h2>
      <p>
        FAQPage is a list of questions the page itself answers, one accepted
        answer each. The three pairs below are the questions in the next
        section, and they are the FAQPage script this page publishes. The{" "}
        <Link href="/faq-schema-generator">FAQ schema generator</Link> emits
        the same shape from questions you type. It uploads nothing.
      </p>
      <pre className={preClass}>{script(faqJsonLd())}</pre>
      <p>
        Google’s Search Central changelog says FAQ rich results stopped
        appearing in Google Search on 7 May 2026. The markup will not bring
        back an accordion under a blue link. Keep the script when the
        questions are visible. Remove it when they are not. One canonical
        page is enough. Repeating the same FAQPage on every URL does not
        make the answers more true. A page where visitors post competing
        answers is a QAPage, which this example is not.
      </p>

      <h2>Article</h2>
      <p>
        Use Article on a page that is an article: a headline, a date, and an
        author a person can see. This page publishes the script below. The
        headline is the H1. The date is the date under the title. The author
        is CiteScore Team, the same byline. Add an <code>image</code>{" "}
        property only when the page shows that image. This page has no
        article image, so the script has none. Do not point it at a logo
        that is not the article image, and do not invent a thumbnail URL.
      </p>
      <pre className={preClass}>{script(articleJsonLd(origin))}</pre>
      <p>
        The author is an Organization because CiteScore Team is the team
        name on the byline, not a person. Use <code>Person</code> only when
        the page names a person. The publisher is CiteScore, the site. If
        you maintain several scripts, you can point Article’s{" "}
        <code>publisher</code> and <code>author</code> at an Organization{" "}
        <code>@id</code> you defined once. Separate script tags, as on this
        page, are easier to check. Both are JSON-LD.
      </p>

      <h2>Questions about the markup</h2>
      {schemaFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Free check, then the $39 audit</h2>
      <p>
        Run the <Link href="/free-check">free check</Link> first. It looks
        at one host and reports whether the homepage responded, whether
        robots.txt allows or blocks GPTBot, PerplexityBot, and
        Google-Extended, whether <code>/llms.txt</code> is a non-empty text
        file, whether a sitemap is present, and which JSON-LD{" "}
        <code>@type</code> values appear on the homepage. A passing schema
        row means the homepage has JSON-LD. It does not mean the types match
        the copy, and it is not a live answer from ChatGPT or Perplexity.
      </p>
      <p>
        The <Link href="/geo-audit">$39 GEO audit</Link> is one public URL,
        a 0–100 CiteScore, and about ten prioritized fixes, as a PDF. The
        score comes from on-page signals — definitions, entities, evidence,
        schema, freshness, crawler access — and, when a language-model key
        is configured, a review of the HTML we fetched. We do not log into
        ChatGPT, Perplexity, Claude, or Google AI Overviews. The per-engine
        snapshot is an inference, and the report says so.
      </p>
      <p>
        Who is allowed to fetch the page is the other half. Copy-paste
        groups for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and
        CCBot are on the{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link>.
      </p>
    </>
  );
}
