export type CitationCheck = {
  id: string;
  title: string;
  body: string;
};

export type CitationCheckGroup = {
  id: string;
  title: string;
  intro: string;
  items: CitationCheck[];
};

/** Forty checks a founder can run on a public page. The page shows every item. */
export const citationCheckGroups: CitationCheckGroup[] = [
  {
    id: "crawlers",
    title: "Crawler access",
    intro:
      "These checks ask whether a crawler can fetch the page. An allow rule is access. It is not a citation.",
    items: [
      {
        id: "robots-is-text",
        title: "robots.txt is a real text file",
        body: "Open /robots.txt. You want a successful response whose body is robots rules. An HTML page, a login wall, or an app shell that happens to return 200 is not a robots file. The free check treats a body that looks like HTML as missing.",
      },
      {
        id: "no-blanket-disallow",
        title: "User-agent: * does not disallow the whole site",
        body: "A staging template often leaves `User-agent: *` and `Disallow: /` in production. Every agent without its own group inherits that block. Remove it if the block is an accident. If the site is meant to be private, it is the wrong URL to audit.",
      },
      {
        id: "gptbot-intentional",
        title: "The GPTBot rule is a decision, not a leftover",
        body: "GPTBot is OpenAI’s training crawler. It is separate from OAI-SearchBot (search) and ChatGPT-User (a person triggered a fetch). Allow it if you want that training crawl. Disallow it if that is the policy. The paid audit records a disallow as a lower crawler score, and you can ignore that slice when the block is intentional.",
      },
      {
        id: "oai-searchbot",
        title: "OAI-SearchBot can fetch pages you want in ChatGPT search",
        body: "If ChatGPT search is a surface you care about, search the robots file for OAI-SearchBot and confirm it is not disallowed. The free check and the $39 audit do not parse this token. They parse GPTBot. You still have to read this one yourself.",
      },
      {
        id: "chatgpt-user",
        title: "ChatGPT-User can fetch when a person clicks",
        body: "ChatGPT-User is the agent for a fetch a person triggered inside ChatGPT or a Custom GPT. OpenAI’s crawler overview says robots.txt rules may not apply, because a person started the fetch, and that ChatGPT-User is not used to decide whether content appears in Search. The search control is OAI-SearchBot. The CiteScore crawl does not score ChatGPT-User.",
      },
      {
        id: "perplexitybot",
        title: "PerplexityBot is not blocked by accident",
        body: "PerplexityBot is the crawler the audit records for Perplexity. Perplexity-User is a different agent and is not parsed. A disallow lowers the crawler dimension. It does not, by itself, set the Perplexity row to a footnote or to absent.",
      },
      {
        id: "googlebot-vs-extended",
        title: "Googlebot and Google-Extended are separate decisions",
        body: "Googlebot is what gets a page into Google Search. Google-Extended is Google’s token for whether content helps improve Gemini Apps and Vertex AI generative APIs. Google says that token does not change inclusion or ranking in Google Search. The audit’s AI Overviews row does not read Google-Extended. It reads answer-shaped copy and FAQ or entity markup. Opting out of Google-Extended is a policy choice, not an AI Overviews switch.",
      },
      {
        id: "html-in-first-response",
        title: "The answer is in the first HTML response",
        body: "View the page source, or fetch the URL with a plain client. The definition should be in that HTML. A client-rendered shell, a cookie wall, or a login gate is what a polite crawler receives. The audit fetches public HTML. It does not execute your app.",
      },
    ],
  },
  {
    id: "llms-txt",
    title: "llms.txt",
    intro:
      "llms.txt is a community proposal for a Markdown reading list, usually at /llms.txt. It is optional; Google says it ignores llms.txt (https://searchengineland.com/google-says-llms-txt-files-wont-harm-or-help-your-search-rankings-480264). It is not an OpenAI standard or a Perplexity requirement.",
    items: [
      {
        id: "llms-nonempty",
        title: "/llms.txt returns a non-empty text body",
        body: "Fetch /llms.txt. Found means a successful response and a body that is not empty and not an HTML document. That is the entire CiteScore check. A one-line placeholder counts as found. A missing file does not lower the score. llms.txt is optional; Google says it ignores llms.txt.",
      },
      {
        id: "llms-h1",
        title: "The file opens with an H1 that names the product",
        body: "The proposal’s only required element is a level-1 heading. Use the product or site name, spelled the way the homepage spells it. A file that opens with `## Pages` skips the one required line.",
      },
      {
        id: "llms-blockquote",
        title: "The blockquote matches the homepage definition",
        body: "A blockquote under the H1 should be one or two sentences a model can quote: what the product is, and who it is for. Use the same sentence as the homepage. A slogan, or a keyword list, gives the model nothing safe to lift.",
      },
      {
        id: "llms-notes",
        title: "H2 sections group links, and each link has a note",
        body: "Sections are H2s. Each item is a Markdown link, then a colon, then a short note that says what the page answers. The note is how a model chooses among the links. Bare URLs, and titles with no note, force it to fetch everything.",
      },
      {
        id: "llms-live-urls",
        title: "Every linked URL is canonical and currently returns a page",
        body: "Use the same host and path you want cited. Leave off campaign parameters, staging hosts, and pages that 404. A map of dead links is a worse courtesy than no file. Spot-check a handful after every docs deploy.",
      },
      {
        id: "llms-full-pointer",
        title: "A full export is linked from the short file, if you publish one",
        body: "llms-full.txt is a community convention, not part of the proposal: one file with the docs concatenated. If you publish it, point at it from /llms.txt so an agent can find it. CiteScore does not fetch llms-full.txt. The short file is the only check.",
      },
    ],
  },
  {
    id: "structured-data",
    title: "Structured data",
    intro:
      "JSON-LD makes a fact easier to extract. It does not create a ranking, and it does not bring back a Google FAQ rich result.",
    items: [
      {
        id: "jsonld-in-html",
        title: "JSON-LD is in the server HTML",
        body: "Search the homepage source for `application/ld+json`. A tag that only appears after JavaScript, or only inside a tag manager the crawler never runs, is invisible to the free check. The free check reports the `@type` values it finds in that HTML.",
      },
      {
        id: "organization-name",
        title: "Organization names the same company as the page",
        body: "If you publish Organization JSON-LD, the name matches the company name in the footer and on the About page. A nickname in schema and a legal name in the footer describes two entities.",
      },
      {
        id: "product-type",
        title: "Product or SoftwareApplication is used only when the page is the product",
        body: "Use SoftwareApplication or Product on the page that describes the product, with the same name as the H1. Skip it on a blog post, a legal page, or a comparison that is mostly about someone else.",
      },
      {
        id: "faq-visible",
        title: "FAQPage markup repeats questions that are visible on the page",
        body: "Each Question needs the question and the answer in the HTML a person can read. Google stopped showing FAQ rich results in May 2026. The markup will not restore an accordion under a blue link. Keep it when the pairs are real. The FAQ schema generator on this site emits that JSON-LD and nothing else.",
      },
      {
        id: "meta-description",
        title: "The meta description can stand alone as an answer",
        body: "Read the meta description with the title covered. It should say what the product is. The free check only reports whether a description tag exists. It does not grade the sentence. A keyword list fails this check even when the tag is present.",
      },
      {
        id: "canonical",
        title: "The canonical is the URL you want cited",
        body: "The canonical link should be the preferred host and path: one of www or the apex, one trailing-slash style, no campaign parameters. Conflicting canonicals split one product across several URLs.",
      },
    ],
  },
  {
    id: "answer-ready",
    title: "Answer-ready content",
    intro:
      "Answer engines lift short passages. The passage has to be true, and it has to be on the page.",
    items: [
      {
        id: "first-screen-definition",
        title: "The first screen defines the product",
        body: "In the first 80 words, finish the sentence: this is a [category] that [does the job] for [whom]. A slogan can sit in the hero. It cannot be the only sentence.",
      },
      {
        id: "h1-is-name-or-definition",
        title: "The H1 is the product name or the definition",
        body: "The H1 should be the name a buyer would type, or the definition itself. A five-word mood line with the name buried in the logo image gives a parser the wrong title.",
      },
      {
        id: "h2-answers",
        title: "Each major H2 is a question, answered in the first sentence",
        body: "Write the H2 as the question (“What does it cost?”, “Who is it for?”, “How is this different from X?”). The first sentence under it answers that question. Detail comes after.",
      },
      {
        id: "comparison-url",
        title: "A comparison page exists on your domain",
        body: "Buyers ask “X vs Y.” If you have no page that answers it, the quoted source will be someone else’s list. Write the honest version: where you fit, and where you do not. Leave the page off llms.txt until it returns 200.",
      },
      {
        id: "pricing-in-text",
        title: "Pricing is stated in text",
        body: "The price, the unit, and what is included should be in HTML. A screenshot of a pricing table, or a “contact sales” page with no range, gives a model nothing it can quote without inventing a number.",
      },
      {
        id: "no-contradiction",
        title: "Homepage, pricing, and docs describe one product",
        body: "Read the three pages in one sitting. The product name, the buyer, and the primary job should match. A homepage that says “platform” and docs that say “API for one email” will be quoted as two products.",
      },
      {
        id: "not-only-images",
        title: "The answer is not trapped in an image or a video",
        body: "If the definition, the price, or the proof exists only inside a PNG, a chart, or a demo video, a text crawler does not have it. Repeat the fact in a sentence next to the media.",
      },
      {
        id: "visible-date",
        title: "A reader can see when the page was last updated",
        body: "A visible updated date, a changelog, or a docs version tells a model the page is maintained. The audit treats a sitemap as a freshness signal. It does not walk every URL in it. A date on the page is still the fact a person can check.",
      },
    ],
  },
  {
    id: "evidence",
    title: "Evidence and sourcing",
    intro:
      "A model would rather quote a sourced fact than invent one. An unsourced superlative is not that fact.",
    items: [
      {
        id: "one-concrete-fact",
        title: "The page contains one concrete, quotable fact",
        body: "A number, a date, a limit, or a method, written in a sentence. “Industry-leading” and “used by teams everywhere” are not quotable. “The batch endpoint accepts up to 100 messages per request” is.",
      },
      {
        id: "fact-has-a-source",
        title: "That fact has a source a reader can find",
        body: "Link the study, name the dataset, or describe the method and the date. A first-party number is fine when you say how you measured it and when. A number with no source asks the model to trust a brochure.",
      },
      {
        id: "proof-is-named",
        title: "Customer proof is named, or it is labeled as anonymous",
        body: "A quote with a company name and a role can be checked. An anonymous “40% lift” with no method cannot. If the customer cannot be named, say so, and do not dress the line up as a case study.",
      },
      {
        id: "defendable-stat",
        title: "You would defend the statistic outside a marketing page",
        body: "If you would not put the number in a contract, a help center, or a reply to a customer, do not put it where you hope a model will quote it. Answer engines repeat confident sentences.",
      },
      {
        id: "third-party-linked",
        title: "Third-party numbers link to the original",
        body: "A statistic from an analyst, a paper, or another company should link to the original, with the year. Quoting a roundup that quoted a roundup is how a figure detaches from its source.",
      },
      {
        id: "measured-vs-guessed",
        title: "Measured claims and estimates are labeled differently",
        body: "Say which sentences are measurements and which are estimates. A page that presents a guess in the same voice as a log line will be quoted as if both were measurements.",
      },
    ],
  },
  {
    id: "entity",
    title: "Entity clarity",
    intro:
      "Models attach claims to names. One product, spelled one way, operated by a company a reader can identify.",
    items: [
      {
        id: "same-spelling",
        title: "The product name is spelled the same way everywhere",
        body: "Title, H1, meta description, schema name, and llms.txt H1 use one spelling. A space, a hyphen, or a dropped word is a second entity. “Acme Mail” in the H1 and “AcmeMail” in JSON-LD will be treated as cousins.",
      },
      {
        id: "company-vs-product",
        title: "The company and the product are distinguished when they differ",
        body: "If the company name and the product name are not the same, say both, once, in prose. “Northwind Labs makes Harbor, a status-page tool” is a fact. A logo with no sentence is not.",
      },
      {
        id: "about-surface",
        title: "An About surface names a company or a person",
        body: "A short About page, a footer legal name, or an author byline gives the product an operator. Unattributed marketing pages are easy to treat as brochureware. You do not need a thought-leadership blog to do this.",
      },
      {
        id: "category-in-buyer-words",
        title: "The category is in words a buyer would type",
        body: "Name the category the way a buyer searches it: “transactional email API,” “issue tracker,” “payments infrastructure.” A coined adjective with no category leaves the model to guess the shelf you sit on.",
      },
      {
        id: "one-host",
        title: "One host is the host you want cited",
        body: "Pick the canonical host. Staging, campaign subdomains, and duplicate help centers should canonical back, or stay out of the index. The audit fetches the host of the URL you submit. A second host with a different story will be scored as a different site.",
      },
      {
        id: "sameas-real",
        title: "Profile links point at profiles you control",
        body: "If you publish sameAs, or a row of social links, each URL should be a profile you actually operate: docs, GitHub, LinkedIn, a status page. A link to a hashtag, a shared Drive folder, or a dead Twitter handle does not clarify the entity.",
      },
    ],
  },
];

export const citationChecks: CitationCheck[] = citationCheckGroups.flatMap(
  (group) => group.items,
);

if (citationChecks.length !== 40) {
  throw new Error(
    `AI Citation Readiness Checklist must list 40 checks, found ${citationChecks.length}.`,
  );
}
