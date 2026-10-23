import Link from "next/link";
import { CheckLinks, preClass } from "@/components/articles/guide-links";

const productIntro =
  "https://developers.google.com/search/docs/appearance/structured-data/product";
const merchant =
  "https://developers.google.com/search/docs/appearance/structured-data/merchant-listing";
const aiFeatures =
  "https://developers.google.com/search/docs/appearance/ai-features";
const aiGuide =
  "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";

const example = `{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Example ceramic mug",
  "image": ["https://example.com/photos/mug-1x1.jpg"],
  "description": "A 12 oz ceramic mug sold on this page. Example markup only.",
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/ceramic-mug",
    "price": "18.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}`;

export function AiSearchVisibilityForEcommerceArticle() {
  return (
    <>
      <p>
        A shopping answer can only repeat a price, a name, and an
        availability that a crawler could read. Google documents that data
        as <a href={productIntro}>Product structured data</a> and, for pages
        where the shopper can buy, as{" "}
        <a href={merchant}>merchant listings</a>. Google does not publish a
        rate for how often an AI answer cites a product page. CiteScore does
        not query Google, an AI Mode shopping result, or any other engine.
      </p>
      <p>
        AI Overviews and AI Mode are still Search. The eligibility rules are
        on{" "}
        <Link href="/google-ai-overviews-optimization">
          Google AI Overviews optimization
        </Link>{" "}
        and{" "}
        <Link href="/google-ai-mode-optimization">
          Google AI Mode optimization
        </Link>
        . Markup for pages that are not a product is on{" "}
        <Link href="/schema-markup-for-ai-search">
          schema markup for AI search
        </Link>
        . The crawler tokens are on{" "}
        <Link href="/ai-crawlers">AI crawlers</Link> and{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        . A clinic or health-tech site is on{" "}
        <Link href="/ai-search-visibility-for-healthcare">
          AI search visibility for healthcare
        </Link>
        . A brokerage, an agent, or a property manager is on{" "}
        <Link href="/ai-search-visibility-for-real-estate">
          AI search visibility for real estate
        </Link>
        . A restaurant’s location, menu, and hours are on{" "}
        <Link href="/ai-search-visibility-for-restaurants">
          AI search visibility for restaurants
        </Link>
        . An accounting, CPA, or bookkeeping firm is on{" "}
        <Link href="/ai-search-visibility-for-accountants">
          AI search visibility for accountants
        </Link>
        . A dental practice’s office, services, and hours are on{" "}
        <Link href="/ai-search-visibility-for-dentists">
          AI search visibility for dentists
        </Link>
        . A plumbing business’s office, service area, and hours are on{" "}
        <Link href="/ai-search-visibility-for-plumbers">
          AI search visibility for plumbers
        </Link>
        . An HVAC company’s office, service area, and hours are on{" "}
        <Link href="/ai-search-visibility-for-hvac">
          AI search visibility for HVAC
        </Link>
        . A roofing contractor’s office, service area, and hours are on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. An electrical contractor’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A landscaping business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>. An auto repair business’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-auto-repair">AI search visibility for auto repair</Link>. A chiropractic office’s office, services, and hours are on <Link href="/ai-search-visibility-for-chiropractors">AI search visibility for chiropractors</Link>. An insurance agency’s office, lines of coverage, and hours are on <Link href="/ai-search-visibility-for-insurance-agents">AI search visibility for insurance agents</Link>. A veterinary clinic’s office, services, and hours are on <Link href="/ai-search-visibility-for-veterinarians">AI search visibility for veterinarians</Link>.
      </p>

      <h2>Two Product markups</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>What Google says it is for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Product snippets</th>
              <td>
                Pages where people cannot buy the product directly. More
                room for review fields, including pros and cons on an
                editorial review.
              </td>
            </tr>
            <tr>
              <th scope="row">Merchant listings</th>
              <td>
                Pages where the customer can purchase from you. More room
                for apparel size, shipping, and returns. The nested offer
                has to be an <code>Offer</code>, because the merchant is the
                seller. An <code>AggregateOffer</code> is not that offer.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Google says adding the merchant-listing properties can also make the
        page eligible for product snippets, and that the two features
        overlap. Provide the fields you actually sell with. Search
        experiences that show them — a product snippet, a shopping knowledge
        panel, annotated images — are listed as examples, and Google says
        the list is not exhaustive.
      </p>

      <h2>Fields a buying page has to include</h2>
      <p>
        For a merchant listing, Google requires <code>name</code>,{" "}
        <code>image</code>, and <code>offers</code> on the product. The
        offer needs an active price greater than zero and a{" "}
        <code>priceCurrency</code> in ISO 4217. A product snippet can omit a
        price; a merchant listing cannot. <code>availability</code> is
        recommended. When you include it, use one ItemAvailability value,
        such as <code>InStock</code> or <code>OutOfStock</code>, not several.
      </p>
      <p>
        Google’s technical guidelines add limits that change what you mark
        up:
      </p>
      <ul>
        <li>
          Only a page where a shopper can purchase the product is eligible
          for merchant listings. A page of links to other stores is not.
        </li>
        <li>
          The page focuses on one product, or variants of that product.
          “Shoes in our shop” is not a product. Prefer the product URL over
          the category URL.
        </li>
        <li>
          One currency per URL. A price in USD and a price in CAD are two
          URLs.
        </li>
        <li>
          Image URLs have to be crawlable, and the pictures have to show
          the product.
        </li>
        <li>
          JavaScript-rendered Product markup can make Shopping crawls less
          frequent. Price and stock change quickly. If the HTML response
          already contains the JSON-LD, the crawler does not have to execute
          the script to read them.
        </li>
      </ul>
      <pre className={preClass}>{example}</pre>
      <p>
        The{" "}
        <Link href="/product-schema-generator">Product schema generator</Link>{" "}
        copies that shape from fields you type: name, description, image,
        brand, SKU, price, currency, availability, and an optional aggregate
        rating. It stays in the browser. Use it only for facts the product
        page already shows. A guide or a blog post uses the{" "}
        <Link href="/article-schema-generator">Article schema generator</Link>{" "}
        instead.
      </p>
      <p>
        That block is an example. Do not add <code>aggregateRating</code> or{" "}
        <code>review</code> unless the page shows a rating you can support.
        Shipping and return policies can live once on the{" "}
        <code>Organization</code>, and a single product overrides them only
        when that product differs. Google recommends a Merchant Center feed
        as well as the on-page markup. Some experiences combine the two, and
        a snippet may use a feed price when the page has none.
      </p>

      <h2>What an answer can quote</h2>
      <p>
        The <a href={aiFeatures}>AI features guide</a> says important content
        should be available as text, structured data should match that text,
        and Merchant Center should stay current if you use it. The{" "}
        <a href={aiGuide}>optimization guide</a> says there is no special
        schema that makes a page appear in Google’s generative Search
        features. Product markup is still how Google documents price and
        availability for shopping experiences in Search. A page that cannot
        be indexed, or cannot show a snippet, is not eligible as a
        supporting link in AI Overviews or AI Mode.
      </p>
      <p>
        <code>Google-Extended</code> does not control those Search features.
        It controls Gemini training and grounding in Gemini Apps. That split
        is on{" "}
        <Link href="/how-to-get-cited-by-gemini">
          how to get cited by Gemini
        </Link>
        . A store that also wants Copilot has to be crawlable by Bingbot,
        which is a different token, covered on{" "}
        <Link href="/how-to-get-cited-by-copilot">
          how to get cited by Microsoft Copilot
        </Link>
        .{" "}
        <Link href="/answer-engine-optimization">
          Answer engine optimization
        </Link>{" "}
        is the name of the work, not a second feed.
      </p>

      <CheckLinks>
        The free check reads JSON-LD on the homepage. A product URL at
        another path is outside that fetch. Submit the product URL when
        that page is the one you need read.
      </CheckLinks>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={productIntro}>Introduction to Product structured data</a>.
          Snippets versus merchant listings, and Merchant Center.
        </li>
        <li>
          <a href={merchant}>Merchant listing structured data</a>. Required
          name, image, offer, price, and the single-product rules.
        </li>
        <li>
          <a href={aiFeatures}>AI features and your website</a> and{" "}
          <a href={aiGuide}>
            optimizing your website for generative AI features
          </a>
          . Text, matching structured data, and Merchant Center.
        </li>
      </ul>
    </>
  );
}
