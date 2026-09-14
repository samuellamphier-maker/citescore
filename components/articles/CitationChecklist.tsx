import Link from "next/link";

const items = [
  {
    title: "Lead with a definition, not a slogan",
    body: "If the H1 and the first 80 words cannot finish the sentence “This product is a … that helps …,” a model has nothing safe to lift. Slogans are fine in the nav. They are a poor citation.",
  },
  {
    title: "Repeat the product name as an entity",
    body: "Same spelling in the title, H1, and meta description. Then say it again in Organization or SoftwareApplication JSON-LD. Models attach claims to names; a nickname-only hero is easy to skip.",
  },
  {
    title: "Put a real Q→A on the homepage",
    body: "Two or three question headings (“What is …?”, “Who is it for?”, “How is this different from …?”) with short answers beat a wall of feature tiles. FAQPage markup on those pairs helps extraction.",
  },
  {
    title: "Offer one dated, named fact",
    body: "A number, a year, a method. “Used by 12,000 teams” is weak if it never changes and has no source. “In our 2026 survey of 180 agencies, 41% …” is something a model can quote with a straight face.",
  },
  {
    title: "Name a human on an About or authors surface",
    body: "Unattributed marketing pages are easy to treat as brochureware. A Person schema, a byline, or a short About with credentials raises source-worthiness. You do not need a thought-leadership blog to do this.",
  },
  {
    title: "Show that the page is alive",
    body: "A visible last-reviewed date, a changelog, or a /blog with a current year. Stale pages lose to last year’s roundup posts even when your product is better.",
  },
  {
    title: "Do not block the bots you want citations from",
    body: "Check robots.txt for GPTBot, PerplexityBot, and Google-Extended. A leftover ‘Disallow: /’ from a staging deploy is an own-goal. If you block them on purpose, say so — and do not buy an AI-visibility audit.",
  },
  {
    title: "Add llms.txt if you have a canonical explainer",
    body: "llms.txt is a small, plaintext map of the pages you want a model to read. It is not magic. It is a courtesy, and CiteScore treats its presence as a positive crawler-access signal.",
  },
  {
    title: "Ship a comparison or alternatives URL",
    body: "Buyers ask “X vs Y.” If you have no /compare or /alternatives page, the model will use a third-party listicle. Write the honest version yourself. We did that for Otterly; you should do it for your actual rivals.",
  },
  {
    title: "Keep key same-host pages fetchable",
    body: "Homepage, /about, /pricing, /faq, and one compare URL. A crawler that only sees a JS shell and a cookie wall will score the site as thin, because that is what it got.",
  },
  {
    title: "Give the page a canonical and sane Open Graph",
    body: "Canonical URLs stop the same product being split across www, trailing slashes, and campaign params. og:title / og:description are not vanity — they are another labeled copy of the entity.",
  },
  {
    title: "Write the answer you want quoted",
    body: "If you want ChatGPT to say “Northbound is a customer-interview repository for product teams,” that sentence has to exist on the page, early, in prose a human would also accept. Do not hide it in a screenshot.",
  },
];

export function CitationChecklistArticle() {
  return (
    <>
      <p>
        This is a homepage checklist, not a promise that ChatGPT will name
        you on Tuesday. CiteScore never logs into ChatGPT. We look at whether
        a model <em>could</em> extract a definition, an entity, and a fact
        from the public HTML — then we say so in the report. Use the list
        below before you pay anyone, including us.
      </p>
      <p>
        If you want the longer definition of the category, start with{" "}
        <Link href="/blog/what-is-geo">what GEO is</Link>. If you want the
        scored version of this list on your URL, that is the{" "}
        <Link href="/geo-audit">{`$39 GEO audit`}</Link>.
      </p>

      <ol>
        {items.map((item, index) => (
          <li key={item.title}>
            <h2>
              <span className="kicker text-copper">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block">{item.title}</span>
            </h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ol>

      <h2>What this checklist is not</h2>
      <p>
        It is not a live citation rank. Prompt wording, user location, and
        whether browsing is on will move any single ChatGPT answer. Enterprise
        monitors such as{" "}
        <Link href="/alternatives/otterly">Otterly</Link> or Profound exist
        to sample those prompts over time. That is a different product — and
        a different{" "}
        <Link href="/blog/citescore-vs-enterprise-geo-tools">price</Link>.
      </p>
      <p>
        It is also not an excuse to keyword-stuff “ChatGPT” into every H2.
        Answer engines are not impressed by that, and neither are buyers.
        Write the page for a skeptical founder. If a model can quote it, that
        is a side effect of being clear.
      </p>
      <p>
        See the{" "}
        <Link href="/sample">Northbound sample report</Link> for how these
        checks show up as dimension scores and a ten-item fix list. The
        company is fictional. The format is the one you buy.
      </p>
    </>
  );
}
