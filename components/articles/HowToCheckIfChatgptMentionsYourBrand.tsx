import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";

const botsDoc = "https://developers.openai.com/api/docs/bots";

export const mentionCheckFaqs = [
  {
    q: "Does one ChatGPT answer tell me whether the brand is cited?",
    a: "No. One chat is one observation. A new chat, a different model, a logged-in memory, and a slightly different prompt can name a different source. Write down the exact prompt, the product, the date, whether your name appeared, and whether a link to your domain appeared. Repeat the same prompt later. OpenAI does not publish a citation rate, so a single answer is not a share of voice.",
  },
  {
    q: "Is a mention the same as a citation?",
    a: "No. A mention means the brand name appeared in the answer. A citation, for this check, means the answer linked or quoted a URL on your domain. An answer can name you and link a competitor, or link you without using the product name in the sentence. Record those as separate columns. Do not collapse them into one score.",
  },
  {
    q: "Will the free check or the $39 audit open ChatGPT and search the brand?",
    a: "No. The free check reads public files on one host: the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, llms.txt, a sitemap, and JSON-LD on the homepage. It does not read OAI-SearchBot, and it does not query ChatGPT. The $39 audit scores one public URL from those signals and the HTML we fetch. The ChatGPT row is an inference. The report says so.",
  },
  {
    q: "Does blocking GPTBot stop ChatGPT from mentioning the brand?",
    a: "OpenAI says the settings are independent. OAI-SearchBot is the token OpenAI ties to search results in ChatGPT. GPTBot is the training crawl. Disallowing GPTBot does not disallow OAI-SearchBot. ChatGPT-User is a fetch a person started, and OpenAI says robots.txt may not apply to it. A blocked crawler is also not the only way a name enters an answer: a page you do not control can still describe the brand.",
  },
];

export function HowToCheckIfChatgptMentionsYourBrandArticle() {
  return (
    <>
      <p>
        A mention check is a log of what an assistant said when you asked, plus a look at whether your own pages can
        be fetched. It is not a ranking report, and it is not a dashboard that queries ChatGPT for you. OpenAI does
        not publish a citation rate, a required schema type, or a word count. CiteScore does not log into ChatGPT.
        The steps below are things you can do in a browser, and the limits are stated when a step is only a fetch.
      </p>
      <p>
        ChatGPT is one product. Perplexity, Claude, Gemini, Microsoft Copilot, and Meta AI are separate products with
        separate crawlers. Run the same prompt in each product you care about, and keep the rows separate. The
        published control for ChatGPT search is on{" "}
        <Link href="/how-to-get-cited-by-chatgpt">how to get cited by ChatGPT</Link>. The short map of the other
        controls is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">how to get cited by AI answer engines</Link>.
      </p>

      <h2>Write the prompts before you open a chat</h2>
      <p>
        Decide the wording first. Changing one word is a different test. Four kinds of question cover most of what
        people mean by “does it mention us”:
      </p>
      <ul>
        <li>The brand name on its own, and a “what is” question that includes the name.</li>
        <li>The job the product does, without the brand name. This is the question a buyer asks before they know you.</li>
        <li>A comparison that names one alternative a buyer would actually consider.</li>
        <li>A specific question the site already answers, such as what the product costs or who it is for.</li>
      </ul>
      <p>
        Keep the list short enough that you will repeat it. Five to ten prompts is a workable set. A list of fifty
        becomes a log nobody updates. Use the words a customer would type, not a slogan from the homepage.
      </p>

      <h2>Ask in a fresh chat, and write down what came back</h2>
      <p>
        Open a new chat for each prompt. A thread that already talked about your product can repeat that context.
        A logged-in account can also carry memory from earlier chats. Neither is wrong. They are different tests
        from what a new person sees, so label the row if you were signed in.
      </p>
      <p>For each answer, record:</p>
      <ul>
        <li>The date, the product, and the exact prompt.</li>
        <li>Whether your brand name appeared.</li>
        <li>Whether the answer linked or quoted a URL on your domain.</li>
        <li>Which other brands were named, and whether those answers linked them.</li>
        <li>Whether the product showed sources. Some answers do not.</li>
      </ul>
      <p>
        Ask the same prompt once more in another new chat if you want to see whether the name keeps appearing. Two
        different answers are two rows, not an average. These products do not publish a share of voice, and this page
        does not invent one. The{" "}
        <Link href="/chatgpt-citation-check">ChatGPT citation check</Link> describes the inferred ChatGPT row in a
        CiteScore report. That row is not this manual log.
      </p>

      <h2>Keep the same sheet over time</h2>
      <p>
        A spreadsheet is enough. Columns that stay useful are date, product, prompt, mentioned, cited with your URL,
        other names, and a short note. Pick an interval you will actually keep, such as once a month, and do not
        change the prompt text between runs. If the product adds a source panel or changes the model, note that in
        the row rather than treating the new answer as comparable to the old one without a label.
      </p>
      <p>
        Mentioned and cited stay separate. An answer that names you and links a review site is a mention plus a
        third-party URL. An answer that links your pricing page is a citation of that URL, even if the sentence is
        short. A competitor named in the same answer gets its own cell. Do not turn the sheet into a 0–100 score.
        The only 0–100 number CiteScore publishes is the audit score, and that score is not this log.
      </p>

      <h2>Check whether a crawler can fetch your pages</h2>
      <p>
        A manual prompt can still name a brand whose site blocks the search crawler, because the name may have come
        from somewhere else, or from an older fetch. The check that matches OpenAI’s own documentation is the
        robots.txt group for OAI-SearchBot. OpenAI says a site that disallows that token is not shown in ChatGPT
        search answers. GPTBot is the training crawl. ChatGPT-User is a fetch a person started, and OpenAI says
        robots.txt may not apply. The three tokens, and the lines to paste, are on{" "}
        <Link href="/how-to-get-cited-by-chatgpt">how to get cited by ChatGPT</Link>. The interaction between a
        named group and <code>User-agent: *</code> is on{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt for AI crawlers</Link>.
      </p>
      <p>
        Open <code>/robots.txt</code> on the host and read the OAI-SearchBot group yourself. The{" "}
        <Link href="/ai-crawler-robots-txt-checker">AI crawler robots.txt checker</Link> points at the free check,
        which reads GPTBot, PerplexityBot, and Google-Extended. It does not read OAI-SearchBot. The{" "}
        <Link href="/robots-txt-ai-crawler-generator">robots.txt generator</Link> can write the OpenAI groups. A file
        that says Allow can still sit behind a firewall that returns 403. OpenAI also publishes IP ranges. Use the
        live list on <a href={botsDoc}>OpenAI’s crawler overview</a> rather than a copied one.
      </p>

      <h2>llms.txt is a reading list, not a mention switch</h2>
      <p>
        <code>llms.txt</code> is an optional Markdown file, usually at <code>/llms.txt</code>, that lists pages you
        want a reader to open. OpenAI’s crawler overview does not list it as a requirement for ChatGPT search.
        Google says an <code>llms.txt</code> file neither helps nor harms visibility or rankings in Google Search,
        because Google Search ignores it. That statement is Google’s, for Google Search, and the page that carries it
        here is <Link href="/google-ai-overviews-optimization">Google AI Overviews optimization</Link>. A missing
        file does not mean ChatGPT will not mention the brand, and a present file does not mean it will.
      </p>
      <p>
        If you keep the file, the H1 is the site name and the links are canonical URLs of pages that answer real
        questions. The <Link href="/llms-txt-generator">llms.txt generator</Link> copies that shape in the browser.
        The <Link href="/llms-txt">llms.txt checker</Link> is what a CiteScore fetch looks for: a non-empty{" "}
        <code>/llms.txt</code>. The <Link href="/llms-txt-best-practices">best-practices note</Link> is the section
        order and the mistakes that break the file.
      </p>

      <h2>Structured data repeats facts. It does not create a mention</h2>
      <p>
        JSON-LD is a labeled copy of facts a person can already read on the page. Organization names the publisher.
        WebSite names the site. Product, Article, FAQPage, and VideoObject name the thing that page is about. A
        parser can use those labels. The script does not make an assistant mention you. OpenAI’s crawler overview
        does not list a required schema type.
      </p>
      <p>
        Match the visible page. A name in the script and a different name in the title describes two entities. The{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link> and the{" "}
        <Link href="/website-schema-generator">WebSite schema generator</Link> copy those two blocks. A watch page
        uses the <Link href="/video-schema-generator">Video schema generator</Link>. An event page
        uses the <Link href="/event-schema-generator">Event schema generator</Link>. A page that shows reviews of a product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>. A service page uses the <Link href="/service-schema-generator">Service schema generator</Link>. A course page uses the <Link href="/course-schema-generator">Course schema generator</Link>. A job page uses the <Link href="/job-posting-schema-generator">Job posting schema generator</Link>. A recipe page uses the <Link href="/recipe-schema-generator">Recipe schema generator</Link>. A forum or support page where people can submit answers uses the <Link href="/qa-page-schema-generator">QAPage schema generator</Link>. A page that names a short passage for text-to-speech uses the <Link href="/speakable-schema-generator">Speakable schema generator</Link>. An image with a visible credit, caption, or license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A book page uses the <Link href="/book-schema-generator">Book schema generator</Link>. A show page or an episode page uses the <Link href="/podcast-schema-generator">Podcast schema generator</Link>. A film page uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A dataset page uses the <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A vehicle page uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel page uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. A clinic page uses the <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>. A law office page uses the <Link href="/attorney-schema-generator">Attorney schema generator</Link>. A dental office page uses the <Link href="/dentist-schema-generator">Dentist schema generator</Link>. An agent office page uses the <Link href="/real-estate-agent-schema-generator">Real estate agent schema generator</Link>. The field list, and what to
        leave out, is the <Link href="/schema-markup-for-ai-search">schema guide</Link>.
      </p>

      <h2>Look at pages you do not control</h2>
      <p>
        Search the web for the brand name and for the question you are testing. Note public pages that describe you
        and that you do not publish: a review, a docs page, a directory, a partner page, a comparison. An assistant
        can name the brand from one of those URLs, or name a competitor from theirs. When the product shows sources,
        write down which URL it used. When it does not show sources, you cannot tell which page it read. Absence of
        a link is not proof your site was skipped, and a link is not proof the mention will still be there next
        month.
      </p>
      <p>
        What you can align is the name. The homepage, the title, and profiles you actually control should use the
        same string. Two public pages that describe the same product under two names give a model two entities. That
        is entity clarity. It is not a citation guarantee, and this guide does not tell you to buy mentions.
      </p>

      <GuideOffers
        freeCheck={
          <>
            Run the <Link href="/free-check">free check</Link> on the host you care about. It reports whether the
            homepage responded, whether robots.txt allows or blocks GPTBot, PerplexityBot, and Google-Extended,
            whether <code>/llms.txt</code> is a non-empty text file, whether a sitemap is present, and which JSON-LD
            types appear on the homepage. It does not read OAI-SearchBot, and it does not ask ChatGPT whether the
            brand was mentioned. You still open a chat for that, and you still open the robots file for the search
            group. A passing row means the signal is present.
          </>
        }
      />

      <h2>Questions about checking a mention</h2>
      {mentionCheckFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={botsDoc}>Overview of OpenAI Crawlers</a>. OAI-SearchBot, GPTBot, and ChatGPT-User are separate
          controls. A site opted out of OAI-SearchBot is not shown in ChatGPT search answers.
        </li>
        <li>
          <a href="https://developers.google.com/search/docs/appearance/structured-data/video">
            Google’s video structured data documentation
          </a>
          . Relevant only if the page you are checking is a watch page. VideoObject does not create a ChatGPT
          mention.
        </li>
      </ul>
    </>
  );
}
