import Link from "next/link";

export function GeoVsSeoArticle() {
  return (
    <>
      <p>
        SEO is the work of earning a click from a list of links. GEO —
        generative engine optimization — is the work of being a sentence an
        answer engine quotes when it answers the question itself. The same
        URL can do both. The decisions are not the same, and a rank report
        does not tell you whether a model can lift a true sentence from the
        page.
      </p>
      <p>
        The engines people mean are ChatGPT and its search mode, Perplexity,
        Google AI Overviews, Claude, and the copilot-style boxes that sit on
        top of a search results page. There is no public, stable formula for
        which source they pick. CiteScore does not log into those products.
        The <Link href="/free-check">free check</Link> reads public files.
        The <Link href="/geo-audit">$39 audit</Link> scores the HTML we can
        fetch. This page is the comparison. A shorter definition of the
        category is <Link href="/blog/what-is-geo">what GEO is</Link>.
      </p>

      <h2>Two jobs</h2>
      <p>
        Classic SEO asks whether a page can be crawled, understood, and
        ranked for a query, then clicked. The levers practitioners already
        know still apply there: a page Googlebot can fetch, a title that
        matches the query, internal links, and the authority other sites
        assign you. CiteScore does not grade title-tag templates or backlink
        velocity. Those are a different audit.
      </p>
      <p>
        GEO asks a narrower question. If a model has to write the answer,
        can it lift a definition, a product name, and a fact from your page,
        and can it tell which company those words belong to? The unit is a
        passage that still makes sense when it is pulled out of the layout.
        A page can rank and still be a slogan. A page can be clearly written
        and still be blocked.
      </p>

      <h2>What changes</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>SEO</th>
              <th>GEO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Question</th>
              <td>Will this URL earn a click from a results page?</td>
              <td>Can a model lift a true, attributed sentence from this page?</td>
            </tr>
            <tr>
              <th scope="row">Unit</th>
              <td>The URL, in a list.</td>
              <td>A passage that stands on its own.</td>
            </tr>
            <tr>
              <th scope="row">Who fetches</th>
              <td>Googlebot, Bingbot, and the other classic crawlers.</td>
              <td>
                Those, plus GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot,
                ClaudeBot, and Google-Extended. They do not do the same job.
              </td>
            </tr>
            <tr>
              <th scope="row">Markup that matters</th>
              <td>Titles, headings, canonicals, and schema that matches a rich result you still want.</td>
              <td>
                The same HTML, plus JSON-LD that names the entity and repeats
                questions a person can already read.
              </td>
            </tr>
            <tr>
              <th scope="row">The map</th>
              <td>sitemap.xml, for discovery.</td>
              <td>
                sitemap.xml still. An optional llms.txt is a reading list, not
                a second sitemap and not a ranking file.
              </td>
            </tr>
            <tr>
              <th scope="row">What you can measure</th>
              <td>Rank, impressions, clicks, in a search console.</td>
              <td>
                Whether the page contains a definition, an entity, and a
                sourced fact. A live citation moves with the prompt, the user,
                and whether browsing is on.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>The passage replaces the position</h2>
      <p>
        A results page can send a click to a URL whose answer sits halfway
        down, behind a hero. An answer engine quotes a short span. If the
        first 80 words do not say what the product is, who it is for, and
        what it does, the model has to guess or quote someone who did say
        it. Put that sentence in the HTML. A slogan can stay in the design.
        It cannot be the only sentence.
      </p>
      <p>
        Write H2s as the questions a buyer asks, and answer each one in the
        first sentence under the heading. Pricing belongs in text, with the
        unit and what is included. A comparison a buyer will ask — “you vs
        the tool they already pay for” — belongs on your domain, in your
        words. If you do not write it, the quoted source is someone else’s
        list.
      </p>
      <p>
        The same standard applies to evidence. A number, a date, and a method
        are quotable. “Industry-leading” is not. If the fact comes from
        someone else, link the original. The{" "}
        <Link href="/checklist">citation checklist</Link> turns this into 40
        checks you can run before you pay anyone, including us.
      </p>

      <h2>Crawlers split into jobs</h2>
      <p>
        SEO’s crawler question is mostly “can Googlebot and Bingbot fetch
        this?” GEO adds agents that do not share a switch. GPTBot is
        OpenAI’s training crawler. OAI-SearchBot is the search crawler.
        ChatGPT-User is a fetch a person triggered. PerplexityBot and
        Perplexity-User are the same kind of split. Google-Extended is
        Google’s token for whether content helps improve Gemini Apps and
        Vertex AI generative APIs. Google says it does not change inclusion
        or ranking in Google Search.
      </p>
      <p>
        The <Link href="/ai-crawlers">crawler page</Link> is the precise
        version of what a CiteScore audit records: GPTBot, PerplexityBot, and
        Google-Extended, each as allow, disallow, or unspecified. OAI-SearchBot,
        ChatGPT-User, ClaudeBot, and Googlebot are not in that trio. The AI
        Overviews row does not read Google-Extended. It reads answer-shaped
        copy and FAQ or entity markup. Blocking a training crawler on purpose
        is a policy. A leftover <code>Disallow: /</code> from staging is an
        accident. The <Link href="/free-check">free check</Link> shows the
        three tokens the audit uses. It does not query the answer engines.
      </p>
      <p>
        AI Overviews are a Google Search feature. A page Google cannot index
        is not a candidate for that surface. That is the part of SEO that
        GEO for Google still depends on. It is not a claim that a top-10
        rank guarantees the overview will quote you. We do not have a public
        overlap number, and we do not invent one.
      </p>

      <h2>Schema extracts. It does not rank.</h2>
      <p>
        Organization, SoftwareApplication, and FAQPage JSON-LD give a parser
        a labeled copy of facts that are already in the HTML. The{" "}
        <Link href="/organization-schema-generator">
          Organization schema generator
        </Link>{" "}
        copies that Organization block from a form. The{" "}
        <Link href="/product-schema-generator">Product schema generator</Link>{" "}
        and the{" "}
        <Link href="/article-schema-generator">Article schema generator</Link>{" "}
        do the same for a product page and an article. A location page uses
        the{" "}
        <Link href="/local-business-schema-generator">
          Local business schema generator
        </Link>
        . A visible trail uses the{" "}
        <Link href="/breadcrumb-schema-generator">
          Breadcrumb schema generator
        </Link>
        . A procedure uses the{" "}
        <Link href="/howto-schema-generator">HowTo schema generator</Link>. An
        app page uses the{" "}
        <Link href="/software-application-schema-generator">
          Software application schema generator
        </Link>
        . An author profile uses the{" "}
        <Link href="/person-schema-generator">Person schema generator</Link>.
        The homepage uses the{" "}
        <Link href="/website-schema-generator">WebSite schema generator</Link>.
        A watch page uses the{" "}
        <Link href="/video-schema-generator">Video schema generator</Link>.
        An event page uses the{" "}
        <Link href="/event-schema-generator">Event schema generator</Link>. A page that shows reviews of a product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>. A service page uses the <Link href="/service-schema-generator">Service schema generator</Link>. A course page uses the <Link href="/course-schema-generator">Course schema generator</Link>. A job page uses the <Link href="/job-posting-schema-generator">Job posting schema generator</Link>. A recipe page uses the <Link href="/recipe-schema-generator">Recipe schema generator</Link>. A forum or support page where people can submit answers uses the <Link href="/qa-page-schema-generator">QAPage schema generator</Link>. A page that names a short passage for text-to-speech uses the <Link href="/speakable-schema-generator">Speakable schema generator</Link>. An image with a visible credit, caption, or license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A book page uses the <Link href="/book-schema-generator">Book schema generator</Link>. A show page or an episode page uses the <Link href="/podcast-schema-generator">Podcast schema generator</Link>. A film page uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A dataset page uses the <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A vehicle page uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel page uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. A clinic page uses the <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>.
        The name in
        the schema has to match the name in the H1. FAQPage is for questions
        a person can read on that page. Google stopped showing FAQ rich
        results in May 2026, so this markup will not restore an accordion
        under a blue link. Keep it for extraction. Skip it when the questions
        are not on the page.
      </p>
      <p>
        <code>llms.txt</code> is the other file people add when they hear
        “AI search.” It is a curated reading list. It is not a ranking
        factor we have ever seen an engine publish, and a missing file does
        not zero a CiteScore audit. Ten live SaaS files, and the specific
        choice each one gets right, are on the{" "}
        <Link href="/llms-txt-examples">llms.txt examples</Link> page. The
        files were fetched. The citations were not inferred from them.
      </p>

      <h2>What you can measure, and what you cannot</h2>
      <p>
        Search Console will tell you impressions and clicks for a query. It
        will not tell you the sentence ChatGPT used last Tuesday. A single
        answer moves with the prompt, the user’s location and memory, and
        whether browsing or a tool was on. Anyone selling a stable “you are
        #4 in ChatGPT” number should show the prompt, the settings, and the
        raw answer, then show them again next month. CiteScore does not sell
        that number.
      </p>
      <p>
        What you can measure on the page is whether a careful reader, and
        therefore a model, has the raw material: a definition, one spelling
        of the product, a sourced fact, markup that matches the prose, and a
        crawler that is allowed to fetch it. Off-site mentions still matter.
        Answer engines lean on sources that are already cited elsewhere —
        docs, comparisons, directories, community threads. We do not crawl
        the web for those mentions. An enterprise monitor that samples
        prompts over time is a different product, compared on the{" "}
        <Link href="/blog/citescore-vs-enterprise-geo-tools">
          enterprise tools
        </Link>{" "}
        page.
      </p>

      <h2>What does not change</h2>
      <ul>
        <li>
          <strong>The page has to be true.</strong> A model repeats confident
          sentences. A statistic you would not put in a contract does not
          become safer because an answer engine might quote it.
        </li>
        <li>
          <strong>The page has to be fetchable.</strong> One canonical host,
          HTML in the first response, no accidental disallow of the whole
          site.
        </li>
        <li>
          <strong>The entity has to be one thing.</strong> The same spelling
          in the title, the H1, and the schema. If the company and the
          product have different names, say both.
        </li>
        <li>
          <strong>Classic search still sends customers.</strong> Blue links
          have not been replaced. GEO sits next to that work for the queries
          where the engine answers in prose.
        </li>
      </ul>

      <h2>Free check, then the $39 audit</h2>
      <p>
        Run the <Link href="/free-check">free check</Link> first. It looks
        at one host and reports whether the homepage responded, whether
        robots.txt allows or blocks GPTBot, PerplexityBot, and
        Google-Extended, whether <code>/llms.txt</code> is a non-empty text
        file, whether a sitemap is present, and which JSON-LD types appear
        on the homepage. A passing row means the signal is present. It is
        not a live answer from ChatGPT or Perplexity.
      </p>
      <p>
        The <Link href="/geo-audit">$39 GEO audit</Link> is one public URL,
        a 0–100 CiteScore, and about ten prioritized fixes, as a PDF. The
        score comes from on-page signals — definitions, entities, evidence,
        schema, freshness, crawler access — and, when a language-model key
        is configured, a review of the HTML we fetched. We do not log into
        ChatGPT, Perplexity, or Google AI Overviews. The per-engine snapshot
        is an inference, and the report says so.
      </p>
      <p>
        A practical order: the free check for the door, the{" "}
        <Link href="/checklist">40-point checklist</Link> for the page, the
        $39 audit when you want that page scored. Weekly rescans are on the
        roadmap. They are not this product.
      </p>
    </>
  );
}
