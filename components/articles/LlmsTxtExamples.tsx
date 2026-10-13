import Link from "next/link";

const fetchedOn = "13 October 2026";

export function LlmsTxtExamplesArticle() {
  return (
    <>
      <p>
        These are ten SaaS <code>llms.txt</code> files fetched on {fetchedOn}.
        Each note describes the HTTP response from that day: the heading, the
        blockquote if there was one, and how the links are organized. A
        company can edit or remove the file tomorrow. Nothing here claims
        that publishing the file caused a citation. No answer engine has
        published <code>llms.txt</code> as a ranking requirement.
      </p>
      <p>
        The proposal at llmstxt.org asks for a Markdown file, usually at{" "}
        <code>/llms.txt</code>: an H1, an optional blockquote that defines the
        project, then H2 sections of links. A note after a colon tells a model
        which link answers the question in front of it.{" "}
        <code>llms-full.txt</code> is a separate convention, a concatenated
        export, and it is not in the proposal. CiteScore’s own check is
        smaller than either idea. The{" "}
        <Link href="/free-check">free check</Link> and the{" "}
        <Link href="/geo-audit">$39 audit</Link> only ask whether{" "}
        <code>/llms.txt</code> returned a non-empty text body.
      </p>

      <h2>What was fetched</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Site</th>
              <th>URL that returned the file</th>
              <th>What that response gets right</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Vercel</th>
              <td>
                <a href="https://vercel.com/llms.txt">vercel.com/llms.txt</a>
              </td>
              <td>Short index, a one-sentence definition, a note on every link.</td>
            </tr>
            <tr>
              <th scope="row">Stripe</th>
              <td>
                <a href="https://stripe.com/llms.txt">stripe.com/llms.txt</a>
              </td>
              <td>Product sections, and a note after almost every link.</td>
            </tr>
            <tr>
              <th scope="row">Cloudflare</th>
              <td>
                <a href="https://developers.cloudflare.com/llms.txt">
                  developers.cloudflare.com/llms.txt
                </a>
              </td>
              <td>Each product links to its own llms.txt instead of inlining every page.</td>
            </tr>
            <tr>
              <th scope="row">Anthropic</th>
              <td>
                <a href="https://platform.claude.com/llms.txt">
                  platform.claude.com/llms.txt
                </a>
              </td>
              <td>The docs tree as Markdown links, plus a pointer to an MCP server.</td>
            </tr>
            <tr>
              <th scope="row">Supabase</th>
              <td>
                <a href="https://supabase.com/llms.txt">supabase.com/llms.txt</a>
              </td>
              <td>The full export is linked before the section lists.</td>
            </tr>
            <tr>
              <th scope="row">Perplexity</th>
              <td>
                <a href="https://docs.perplexity.ai/llms.txt">
                  docs.perplexity.ai/llms.txt
                </a>
              </td>
              <td>A tight API summary, Markdown URLs, and an Optional section.</td>
            </tr>
            <tr>
              <th scope="row">Zapier</th>
              <td>
                <a href="https://zapier.com/llms.txt">zapier.com/llms.txt</a>
              </td>
              <td>A product-site map with stable anchors and a note to fetchers.</td>
            </tr>
            <tr>
              <th scope="row">Linear</th>
              <td>
                <a href="https://linear.app/llms.txt">linear.app/llms.txt</a>
              </td>
              <td>A product definition, then docs grouped by job, almost all as .md.</td>
            </tr>
            <tr>
              <th scope="row">Notion</th>
              <td>
                <a href="https://www.notion.com/llms.txt">www.notion.com/llms.txt</a>
              </td>
              <td>Buyer-shaped sections, and a note on every link.</td>
            </tr>
            <tr>
              <th scope="row">Resend</th>
              <td>
                <a href="https://resend.com/llms.txt">resend.com/llms.txt</a>
              </td>
              <td>A one-sentence definition, then the actual API calls to make.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Counts below are from those responses. “Noted” means a bullet whose
        Markdown link is followed by a colon and a note.
      </p>

      <h2>1. Vercel — a short file a person can finish</h2>
      <p>
        <a href="https://vercel.com/llms.txt">https://vercel.com/llms.txt</a>{" "}
        returned <code>text/plain</code>, 65 lines, 25 Markdown links. All 25
        have a note. The H1 is “Vercel”. The blockquote is one sentence:
        “Vercel is a cloud platform for building, deploying, and scaling web
        applications and AI workloads.” A paragraph under it, with no heading,
        tells an agent to follow the linked indexes. Later H2s split
        documentation, the REST API, and an Optional section. The Optional
        links are secondary machine files: an agent catalog, a product
        taxonomy, and a documentation graph. The documentation section points
        at a full export, <code>https://vercel.com/docs/llms-full.txt</code>.
      </p>
      <p>
        That is the shape to copy when you have a real product and a handful
        of canonical URLs. The file is written for a coding agent — CLI, MCP,
        API auth — more than for a buyer asking what Vercel costs. That is a
        choice of audience. The definition in the blockquote still works for
        both.
      </p>

      <h2>2. Stripe — one product per section</h2>
      <p>
        <a href="https://stripe.com/llms.txt">https://stripe.com/llms.txt</a>{" "}
        returned 402 lines and 308 Markdown links. The H1 is “Stripe”. The
        blockquote starts “Stripe is a technology company that provides
        financial infrastructure for businesses.” H2s follow the catalog:
        Payments, Connect, Checkout, Billing, Radar, Issuing, and others — 31
        sections. Almost every bullet is a titled link with a colon and a
        note. Docs links often end in <code>.md</code>.
      </p>
      <p>
        A second file,{" "}
        <a href="https://docs.stripe.com/llms.txt">
          https://docs.stripe.com/llms.txt
        </a>
        , returned <code>text/markdown</code>, 710 lines, and 513 Markdown
        links, 505 of them ending in <code>.md</code>. It has no blockquote.
        It does include an H2 titled “Instructions for Large Language Model
        Agents: Best Practices for integrating Stripe”, and the prose under it
        tells an agent which guides to prefer and which API object to default
        to. The product file is a map of the company. The docs file is a map
        of the integration. They answer different questions, and Stripe
        publishes both.
      </p>
      <p>
        The limit is size. Four hundred lines is a catalog. The notes on the
        product file are marketing sentences, so a model still has to choose.
        A smaller SaaS can copy the pattern — H1, definition, one H2 per
        product, a note on every link — and stop at the pages a buyer actually
        needs.
      </p>

      <h2>3. Cloudflare — an index of indexes</h2>
      <p>
        <a href="https://developers.cloudflare.com/llms.txt">
          https://developers.cloudflare.com/llms.txt
        </a>{" "}
        returned 145 lines and 113 Markdown links. Every link has a note. The
        links point at another <code>llms.txt</code>, one per product
        (Cache, DNS, Workers-related products, and the rest), grouped under
        nine H2s such as Application performance and Application security. The
        blockquote says so directly: each product links to its own file, and
        that file is the recommended way to explore that product. A sentence
        sits between the H1 and the blockquote, so the summary is not the
        first line after the title.
      </p>
      <p>
        This is the right pattern when one host documents dozens of products.
        Inlining every page would make a file no model will read in full.
        Pointing at a second index keeps the top file small. The tradeoff is
        that an agent has to fetch twice before it sees a doc page.
      </p>

      <h2>4. Anthropic — coverage, and a search tool beside the list</h2>
      <p>
        Requesting <code>https://docs.anthropic.com/llms.txt</code> on{" "}
        {fetchedOn} returned a 301 to{" "}
        <code>https://platform.claude.com/docs/llms.txt</code>, which returned
        a 308 to <code>/llms.txt</code>. The file that answered is{" "}
        <a href="https://platform.claude.com/llms.txt">
          https://platform.claude.com/llms.txt
        </a>
        : 834 lines, H1 “Anthropic Developer Documentation”, no blockquote,
        761 Markdown links, 760 of them ending in <code>.md</code>. The file
        says the English docs are “760 pages” and that those pages are the
        ones included. Other languages are named with their page counts, and
        the file tells the reader to visit the site for that content. It also
        points at an MCP server on{" "}
        <code>https://platform.claude.com/docs/mcp</code> for search, instead
        of pretending the flat list is the only way in.
      </p>
      <p>
        Coverage is the thing this file gets right. The gaps are the ones a
        strict reading of the proposal would flag: no blockquote, and the
        body uses H3s under an “English” H2. Many links have no colon-note.
        It is a generated tree of the docs, useful as a corpus index, thin as
        a one-screen definition of Claude. It describes the developer
        platform, not the consumer chat app.
      </p>

      <h2>5. Supabase — the full export is on line 3</h2>
      <p>
        <a href="https://supabase.com/llms.txt">https://supabase.com/llms.txt</a>{" "}
        returned 56 lines and 42 Markdown links. There is no blockquote. The
        first sentence after the H1 is the useful one: the complete
        documentation is at{" "}
        <a href="https://supabase.com/llms-full.txt">
          https://supabase.com/llms-full.txt
        </a>
        . An agent that wants everything does not have to discover that URL.
        The rest of the file is a short section list (Auth, database, storage,
        and so on), then per-language reference files, including JavaScript,
        Dart, Swift, Kotlin, and Python, then pricing and a Management API
        OpenAPI spec.
      </p>
      <p>
        Most bullets have a title and no colon-note, and the titles repeat
        “Supabase -”. The file is easy to scan because it is short, and
        because the full export is labeled. It is a weak definition of the
        product. The homepage still has to say what Supabase is.
      </p>

      <h2>6. Perplexity — the API, summarized in the blockquote</h2>
      <p>
        <a href="https://docs.perplexity.ai/llms.txt">
          https://docs.perplexity.ai/llms.txt
        </a>{" "}
        returned 180 lines and 170 Markdown links. 163 end in <code>.md</code>.
        155 have a note. The H1 is “Perplexity”. The blockquote names the
        product this host actually documents: “Perplexity API documentation for
        building with the Agent API, the default for web-grounded AI and
        multi-provider applications, plus Search and Embeddings APIs.” The
        H2s are “OpenAPI Specs” and “Optional”.
      </p>
      <p>
        The notes are specific enough to choose a page (“Generate an API key
        and make your first call”). The structural miss is that the long link
        list sits before the first H2. The proposal puts file lists under H2
        sections. This file is the API docs, not the consumer Perplexity
        search product.
      </p>

      <h2>7. Zapier — a map of the product site</h2>
      <p>
        <a href="https://zapier.com/llms.txt">https://zapier.com/llms.txt</a>{" "}
        returned 180 lines, 116 Markdown links, and eight H2s. The blockquote
        is a navigation note, not a product definition: it points at a
        Surfaces section and a Topics section and says the anchors are stable.
        The definition lives under “What is Zapier”, in prose. Surfaces
        points at <code>https://docs.zapier.com/llms.txt</code> for the
        developer docs and names the help center and community hosts. “Notes
        for automated fetchers” tells an agent to fetch{" "}
        <code>/llms-full.txt</code> for expanded content, warns that the file
        is not a pricing spec, and lists the anchors that will not be renamed
        without a coordinated update.
      </p>
      <p>
        That is the rare non-docs example in this set. It treats{" "}
        <code>llms.txt</code> as a map of a marketing site with several
        subdomains. It also uses H3s and horizontal rules, which the proposal
        does not ask for. The useful habit is the one in the fetcher note:
        say what the file is not, and say which other file to open next.
      </p>

      <h2>8. Linear — docs grouped by the job</h2>
      <p>
        <a href="https://linear.app/llms.txt">https://linear.app/llms.txt</a>{" "}
        returned 198 lines and 136 Markdown links, 134 ending in{" "}
        <code>.md</code>. The H1 is “Linear”. The blockquote defines the
        product: “Linear is a purpose-built tool for planning and building
        products.” Two H2s, Documentation and Developers, contain H3 groups a
        user would recognize: Getting started, Intake, Projects and
        initiatives. The links do not have colon-notes. The title of the link
        is the only hint.
      </p>
      <p>
        Grouping by job is the part worth copying. A flat alphabetical dump
        makes a model read titles until one sounds relevant. “Intake” and
        “Projects” are already the questions. Adding a colon-note would make
        the same file easier to route, and the file does not do that today.
      </p>

      <h2>9. Notion — organized the way a buyer asks</h2>
      <p>
        <a href="https://www.notion.com/llms.txt">
          https://www.notion.com/llms.txt
        </a>{" "}
        returned 74 lines and 48 Markdown links. All 48 have a note. None of
        the URLs end in <code>.md</code>. The H1 is “Notion”. The blockquote
        starts “Notion is the connected workspace where better, faster work
        happens.” H2s follow a buyer’s path: Core Products, Solutions By Team
        Types, Solutions By Role, Getting Started. A separate file at{" "}
        <a href="https://developers.notion.com/llms.txt">
          developers.notion.com/llms.txt
        </a>{" "}
        is the developer docs. The marketing file and the API file are not
        the same map.
      </p>
      <p>
        The notes are short product descriptions, which is what a buyer-facing
        file needs. Under the blockquote, the file also prints a “Key terms”
        line of keywords. That line does not help a model choose a URL. The
        sections do.
      </p>

      <h2>10. Resend — the definition, then the request</h2>
      <p>
        <a href="https://resend.com/llms.txt">https://resend.com/llms.txt</a>{" "}
        returned 162 lines and 57 Markdown links. The H1 is “Resend”. The
        blockquote is the definition: “Resend is the email API for developers.
        Send transactional and marketing emails at scale with a simple, modern
        API.” The next H2, “When to use Resend”, is written as tasks, and the
        tasks name the HTTP call. Sending a transactional email is{" "}
        <code>POST https://api.resend.com/emails</code>. Batch send is named
        with its limit. Later sections point at a setup guide, the CLI, an
        MCP server, and an OpenAPI spec. A larger docs index lives at{" "}
        <a href="https://resend.com/docs/llms.txt">
          https://resend.com/docs/llms.txt
        </a>
        . The root file is the curated one.
      </p>
      <p>
        This is the example to copy if you do not have 700 documentation
        pages. Say what the product is. Say when to use it. Point at the
        three URLs an agent will actually need. Most of Resend’s bullets have
        no colon-note. The “when to use” prose carries that information
        instead, which works because the list is short.
      </p>

      <h2>A file fetched the same day that misses the menu</h2>
      <p>
        <a href="https://cursor.com/llms.txt">https://cursor.com/llms.txt</a>{" "}
        also returned <code>text/plain</code> on {fetchedOn}, 497 lines, H1
        “Cursor Documentation”, no blockquote. The links are bare URLs. There
        is no title and no note, so a model learns the path and nothing about
        the page. One changelog bullet is the literal string{" "}
        <code>https://cursor.comhttps://cursor.com/changelog.md</code> — the
        host is doubled. Other changelog links in the same file are
        well-formed. Markdown URLs are the useful habit in this file. Missing
        titles, and a broken host, are the miss. It is still a real SaaS
        file. It is not one of the ten above because the ten are there for a
        choice worth copying.
      </p>

      <h2>What to copy, and what to leave</h2>
      <ul>
        <li>
          <strong>One sentence that defines the product.</strong> Vercel,
          Resend, Linear, and Stripe’s product file all do this in a
          blockquote. Anthropic’s developer file and Supabase’s file do not,
          and the homepage still has to carry the definition.
        </li>
        <li>
          <strong>A note on the link.</strong> Vercel, Stripe’s product file,
          Cloudflare, and Notion annotate every bullet. Linear and Supabase
          mostly do not. The note is the routing instruction.
        </li>
        <li>
          <strong>Markdown when you have it.</strong> Anthropic, Perplexity,
          and Linear point at <code>.md</code> pages. Notion’s marketing file
          points at HTML. Both are legal. Markdown saves the model a scrape.
        </li>
        <li>
          <strong>Do not inline a catalog you would not read.</strong>{" "}
          Cloudflare links to per-product files. Supabase and Zapier point at
          a full export from the short file. Stripe’s docs file is large on
          purpose and then adds a section of instructions. A generated dump
          of every URL, with no notes, is the Cursor failure mode.
        </li>
        <li>
          <strong>Say which host is which.</strong> Stripe, Notion, Resend,
          and Zapier publish more than one file. The short file should name
          the others.
        </li>
      </ul>
      <p>
        Leave the keyword line. Leave the claim that the file itself gets you
        cited. The{" "}
        <Link href="/llms-txt">llms.txt checker</Link> page is the exact HTTP
        check CiteScore runs, including what a missing file does to the
        score. The <Link href="/llms-txt-generator">generator</Link> copies
        the H1, blockquote, and annotated-link shape into a file you can
        edit. It does not upload anything.
      </p>

      <h2>Check the file, then score the page</h2>
      <p>
        The <Link href="/free-check">free check</Link> fetches{" "}
        <code>/llms.txt</code> on the host you enter and reports whether the
        body is non-empty text. It also reads robots.txt for GPTBot,
        PerplexityBot, and Google-Extended, plus the sitemap and JSON-LD on
        the homepage. It does not query ChatGPT, Perplexity, or Google AI
        Overviews, and it does not grade the writing inside the file.
      </p>
      <p>
        The <Link href="/geo-audit">$39 audit</Link> scores one public URL. A
        found <code>llms.txt</code> is a positive mark on the crawler
        dimension only. The page the file points at still has to answer the
        question. The{" "}
        <Link href="/checklist">AI Citation Readiness Checklist</Link> is the
        unpaid list of those checks, including the six that apply to the file
        itself.
      </p>
    </>
  );
}
