export type AiCrawlerAgent = {
  token: string;
  /** Value for the User-agent line. May differ in case from the display token. */
  robotsToken: string;
  operator: string;
  purpose: string;
  robots: string;
  /** Full robots.txt group, including a trailing newline. */
  snippet: string;
  snippetNote: string;
  sourceHref: string;
  sourceLabel: string;
};

function group(token: string, rule: string) {
  return `User-agent: ${token}\n${rule}\n`;
}

/**
 * Facts below were read from the linked operator pages on 18 October 2026.
 * A cell that says the operator does not document something is that finding.
 */
export const aiCrawlerAgents: AiCrawlerAgent[] = [
  {
    token: "GPTBot",
    robotsToken: "GPTBot",
    operator: "OpenAI",
    purpose:
      "Training. OpenAI says GPTBot crawls content that may be used to train generative AI foundation models. Disallowing it means that content should not be used for that training. The setting is independent of OAI-SearchBot.",
    robots:
      "OpenAI documents a robots.txt tag for GPTBot. OpenAI’s advertiser guidance says OpenAI crawlers respect robots.txt and stop when access is disallowed. The bots overview separately says ChatGPT-User may not follow those rules.",
    snippet: group("GPTBot", "Disallow: /"),
    snippetNote: "Opt-out of training. It does not set the OAI-SearchBot rule.",
    sourceHref: "https://developers.openai.com/api/docs/bots",
    sourceLabel: "OpenAI crawler docs",
  },
  {
    token: "OAI-SearchBot",
    robotsToken: "OAI-SearchBot",
    operator: "OpenAI",
    purpose:
      "Search. OpenAI says OAI-SearchBot surfaces sites in ChatGPT search. A site opted out of this token is not shown in ChatGPT search answers, though it can still appear as a navigational link.",
    robots:
      "OpenAI documents this as its own robots.txt tag and recommends allowing it, plus the published IP ranges, if you want the site in search results. OpenAI says a robots.txt change can take about 24 hours to affect search.",
    snippet: group("OAI-SearchBot", "Allow: /"),
    snippetNote: "Allow, which is what OpenAI recommends for ChatGPT search. Disallow: / is the opt-out.",
    sourceHref: "https://developers.openai.com/api/docs/bots",
    sourceLabel: "OpenAI crawler docs",
  },
  {
    token: "ChatGPT-User",
    robotsToken: "ChatGPT-User",
    operator: "OpenAI",
    purpose:
      "User-triggered fetch. OpenAI says ChatGPT-User visits a page for certain actions a person starts in ChatGPT or a Custom GPT, including GPT Actions. It is not an automatic crawl, and it is not the control for Search. Use OAI-SearchBot for that.",
    robots:
      "OpenAI says robots.txt rules may not apply, because a person started the action. Publishing a group is still possible. OpenAI does not say the group will be honored.",
    snippet: group("ChatGPT-User", "Disallow: /"),
    snippetNote: "A request only. OpenAI says robots.txt may not apply.",
    sourceHref: "https://developers.openai.com/api/docs/bots",
    sourceLabel: "OpenAI crawler docs",
  },
  {
    token: "ClaudeBot",
    robotsToken: "ClaudeBot",
    operator: "Anthropic",
    purpose:
      "Training. Anthropic says ClaudeBot collects web content that could contribute to training. Restricting it signals that the site’s future material should be excluded from training datasets.",
    robots:
      "Anthropic says its bots honor industry-standard robots.txt directives, including Crawl-delay where appropriate. A disallow has to be repeated for each bot and each subdomain. A file on www does not cover the bare host.",
    snippet: group("ClaudeBot", "Disallow: /"),
    snippetNote: "Anthropic’s published shape for a full-site block. It does not write Claude-User or Claude-SearchBot.",
    sourceHref:
      "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler",
    sourceLabel: "Anthropic crawler docs",
  },
  {
    token: "Claude-User",
    robotsToken: "Claude-User",
    operator: "Anthropic",
    purpose:
      "User-triggered fetch. Anthropic says Claude-User accesses a site when a person asks Claude a question. Disabling it prevents retrieval in response to that query, which Anthropic says may reduce visibility in user-directed web search.",
    robots:
      "Anthropic includes Claude-User in the bots that honor robots.txt. That is different from ChatGPT-User and Perplexity-User, where the operator says the user-triggered fetch may ignore the file.",
    snippet: group("Claude-User", "Disallow: /"),
    snippetNote: "Full-site block. Repeat it on every subdomain you want to opt out.",
    sourceHref:
      "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler",
    sourceLabel: "Anthropic crawler docs",
  },
  {
    token: "Claude-SearchBot",
    robotsToken: "Claude-SearchBot",
    operator: "Anthropic",
    purpose:
      "Search. Anthropic says Claude-SearchBot navigates the web to improve search-result quality. Disabling it prevents indexing for that search use, which Anthropic says may reduce visibility and accuracy in search results.",
    robots:
      "Same robots.txt statement as ClaudeBot: Anthropic’s bots honor standard directives. A ClaudeBot group does not write this token.",
    snippet: group("Claude-SearchBot", "Disallow: /"),
    snippetNote: "Full-site block for the search token, separate from ClaudeBot.",
    sourceHref:
      "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler",
    sourceLabel: "Anthropic crawler docs",
  },
  {
    token: "PerplexityBot",
    robotsToken: "PerplexityBot",
    operator: "Perplexity",
    purpose:
      "Search. Perplexity says PerplexityBot surfaces and links sites in Perplexity search results. It is not used to crawl content for AI foundation models.",
    robots:
      "Perplexity’s crawler docs tell you to allow this token in robots.txt, and the published IP ranges, if you want the site in search results. The setting is independent of Perplexity-User. Their help center says a disallow stops indexing of full or partial text. See the note under this table.",
    snippet: group("PerplexityBot", "Allow: /"),
    snippetNote: "Allow, which is what Perplexity recommends for search. Disallow: / is the opt-out.",
    sourceHref: "https://docs.perplexity.ai/docs/resources/perplexity-crawlers",
    sourceLabel: "Perplexity crawler docs",
  },
  {
    token: "Perplexity-User",
    robotsToken: "Perplexity-User",
    operator: "Perplexity",
    purpose:
      "User-triggered fetch. Perplexity says Perplexity-User visits a page when a person asks a question, so the answer can include a link. It is not used for web crawling or to collect content for training foundation models.",
    robots:
      "Perplexity says this fetcher generally ignores robots.txt, because a person requested the fetch. A group does not replace a firewall rule.",
    snippet: group("Perplexity-User", "Disallow: /"),
    snippetNote: "A request only. Perplexity says this fetcher generally ignores robots.txt.",
    sourceHref: "https://docs.perplexity.ai/docs/resources/perplexity-crawlers",
    sourceLabel: "Perplexity crawler docs",
  },
  {
    token: "Google-Extended",
    robotsToken: "Google-Extended",
    operator: "Google",
    purpose:
      "Training and grounding control, not a separate crawl. Google says the token manages whether content Google has crawled may train future Gemini models that power Gemini Apps and Vertex AI, and whether it may be used for grounding in Gemini Apps and Grounding with Google Search on Vertex AI. It does not change inclusion or ranking in Google Search.",
    robots:
      "Google documents it as a robots.txt control token. It has no separate HTTP user-agent, so it will not appear in an access log. The fetch is done by existing Google crawlers, which Google says obey robots.txt on automatic crawls.",
    snippet: group("Google-Extended", "Disallow: /"),
    snippetNote:
      "Full opt-out of that Gemini use. Google’s own example is a path rule, not a requirement to block the host.",
    sourceHref: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers",
    sourceLabel: "Google crawler docs",
  },
  {
    token: "Applebot-Extended",
    robotsToken: "Applebot-Extended",
    operator: "Apple",
    purpose:
      "Training control, not a crawler. Apple says publishers can opt out of content being used to train Apple’s foundation models for Apple Intelligence, Services, and Developer Tools. Pages that disallow it can still appear in Apple search. The crawl itself is Applebot.",
    robots:
      "Apple documents Applebot-Extended as a robots.txt token that decides how data Applebot already crawled may be used. Applebot-Extended does not fetch pages. Apple says Applebot respects standard robots.txt directives. Apple’s published example disallows a path, not necessarily the whole host.",
    snippet: group("Applebot-Extended", "Disallow: /"),
    snippetNote: "Full opt-out of foundation-model training. It does not block Applebot search.",
    sourceHref: "https://support.apple.com/en-us/119829",
    sourceLabel: "Applebot docs",
  },
  {
    token: "Bingbot",
    robotsToken: "Bingbot",
    operator: "Microsoft",
    purpose:
      "Search index. Microsoft says Bingbot is Bing’s standard crawler and finds pages for the Bing index. Microsoft does not document Bingbot on that page as a separate token for generative-model training. The HTTP user-agent string uses bingbot.",
    robots:
      "Microsoft’s crawler overview says a robots.txt file tells Bing crawlers how to interact with the site. Bing’s page on reporting a Bingbot issue says Bingbot honors robots.txt, including crawl-delay. Bing’s robots.txt guide says a Bingbot group ignores the * group, so general rules have to be repeated, and a page that is not crawled is not indexed. Disallow: / would ask Bing not to crawl the host.",
    snippet: group("Bingbot", "Disallow: /private/"),
    snippetNote: "A private-path example, not a suggestion to block Bing. Repeat any * rules inside this group.",
    sourceHref: "https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0",
    sourceLabel: "Bing crawler docs",
  },
  {
    token: "CCBot",
    robotsToken: "CCBot",
    operator: "Common Crawl",
    purpose:
      "Open web archive. Common Crawl says CCBot builds a public crawl dataset anyone can analyze. The CCBot page does not describe it as a search index, a user-triggered fetch, or a model Common Crawl trains. The HTTP user-agent they publish is CCBot/2.0.",
    robots:
      "Common Crawl publishes a CCBot group with Disallow: / as the way to stop the crawl. The page does not say that block deletes a copy already in an older crawl.",
    snippet: group("CCBot", "Disallow: /"),
    snippetNote: "Common Crawl’s published full-site block.",
    sourceHref: "https://commoncrawl.org/ccbot",
    sourceLabel: "Common Crawl CCBot docs",
  },
  {
    token: "Meta-ExternalAgent",
    robotsToken: "meta-externalagent",
    operator: "Meta",
    purpose:
      "Training or indexing. Meta says Meta-ExternalAgent crawls for uses such as training foundation models or improving products by indexing content directly. The user-agent string Meta publishes is meta-externalagent, lowercase.",
    robots:
      "Meta says to block a crawler by adding a disallow in robots.txt. Meta says Meta-ExternalFetcher may bypass robots.txt because a person requested the fetch, and that FacebookExternalHit might bypass it for security checks. Meta does not say Meta-ExternalAgent bypasses the file. Changes can take up to 24 hours.",
    snippet: group("meta-externalagent", "Disallow: /"),
    snippetNote:
      "Full-site block, using Meta’s documented token spelling. Meta’s example allows / and disallows /private/.",
    sourceHref: "https://developers.facebook.com/docs/sharing/webmasters/crawler",
    sourceLabel: "Meta crawler docs",
  },
  {
    token: "Bytespider",
    robotsToken: "Bytespider",
    operator: "ByteDance",
    purpose:
      "Not confirmed. The token is widely listed by third parties as ByteDance’s. On 18 October 2026, ByteDance’s Toutiao webmaster site returned a page whose HTML contained no Bytespider policy. This row does not assign a purpose.",
    robots:
      "Not documented by an operator page we could read. Treat the snippet as a request, then check your own logs. There is no published commitment here that Bytespider honors it.",
    snippet: group("Bytespider", "Disallow: /"),
    snippetNote: "A request, not a confirmed control.",
    sourceHref: "https://zhanzhang.toutiao.com/",
    sourceLabel: "Toutiao webmaster site",
  },
  {
    token: "Amazonbot",
    robotsToken: "Amazonbot",
    operator: "Amazon",
    purpose:
      "May be used for training. Amazon says Amazonbot improves products and services and may be used to train Amazon AI models. Search is a different token, Amzn-SearchBot. A user-triggered fetch is Amzn-User. Those two are not this row.",
    robots:
      "Amazon says automated crawling by the listed agents honors robots.txt allow and disallow, at the host level. Amazon says Amzn-User may not follow all robots.txt directives. That exception is not written for Amazonbot. They do not support crawl-delay.",
    snippet: group("Amazonbot", "Disallow: /"),
    snippetNote: "Full-site opt-out of Amazonbot. A path disallow is also valid. It does not write Amzn-SearchBot or Amzn-User.",
    sourceHref: "https://developer.amazon.com/amazonbot",
    sourceLabel: "Amazonbot docs",
  },
  {
    token: "DuckAssistBot",
    robotsToken: "DuckAssistBot",
    operator: "DuckDuckGo",
    purpose:
      "AI answers, not training. DuckDuckGo says DuckAssistBot crawls pages in real time for AI-assisted answers that cite sources, and that this data is not used to train AI models. Opting out does not change organic rankings or whether the site appears in DuckDuckGo search results.",
    robots:
      "DuckDuckGo says disallowing the user agent stops DuckAssistBot from crawling. The change takes effect after 72 hours.",
    snippet: group("DuckAssistBot", "Disallow: /"),
    snippetNote: "DuckDuckGo’s published opt-out. It does not block DuckDuckBot search.",
    sourceHref: "https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot",
    sourceLabel: "DuckDuckGo DuckAssistBot docs",
  },
  {
    token: "MistralAI-User",
    robotsToken: "MistralAI-User",
    operator: "Mistral",
    purpose:
      "User-triggered fetch. Mistral says MistralAI-User visits a page when a person asks Vibe a question, and may include a link to the source. It is not an automatic crawl and is not used to crawl content for generative AI training. Indexing is MistralAI-Index. Training is MistralAI-Training.",
    robots:
      "Mistral documents a robots.txt tag and says MistralAI-User governs which sites those user requests can reach. Mistral does not say, as OpenAI and Perplexity do for their user fetchers, that this token ignores robots.txt.",
    snippet: group("MistralAI-User", "Disallow: /"),
    snippetNote: "The robots.txt tag Mistral documents for this user fetcher. It does not write MistralAI-Index or MistralAI-Training.",
    sourceHref: "https://docs.mistral.ai/robots",
    sourceLabel: "Mistral crawler docs",
  },
  {
    token: "cohere-ai",
    robotsToken: "cohere-ai",
    operator: "Cohere",
    purpose:
      "Not documented under this name. Cohere’s crawler page says they do not currently use bots to crawl the web to train generative AI foundation models. The bot table on that page is empty. The example token they publish for a possible future crawler is Coherebot, not cohere-ai.",
    robots:
      "Cohere says its policy is that crawlers respect robots.txt. They do not document a live crawler named cohere-ai, so this page cannot say that token honors the file.",
    snippet: group("cohere-ai", "Disallow: /"),
    snippetNote:
      "People write this token. Cohere’s own example is User-agent: Coherebot and Disallow: /. Cohere does not list either as a live crawler.",
    sourceHref: "https://docs.cohere.com/docs/cohere-web-crawlers",
    sourceLabel: "Cohere crawler docs",
  },
];
