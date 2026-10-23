import Link from "next/link";
import { CheckLinks, preClass } from "@/components/articles/guide-links";
import { LlmsTxtCaveat } from "@/components/LlmsTxtCaveat";
import { LLMS_TXT_GOOGLE_URL } from "@/lib/llms-txt-note";

const spec = "https://llmstxt.org/";
const changes = "https://llmstxt.org/changes.html";
const aiGuide =
  "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";

const validFile = `# Example docs

> Example is a documentation site. This file lists the pages an agent should open first.

The H1 is the only required line. The blockquote is the short definition.

## Docs

- [Getting started](https://example.com/docs/start.md): Install and the first request
- [API reference](https://example.com/docs/api.md): Every public endpoint

## Optional

- [Changelog](https://example.com/changelog.md): Releases an agent can skip`;

export function LlmsTxtBestPracticesArticle() {
  return (
    <>
      <p>
        <code>llms.txt</code> is a proposal, not an engine requirement. The
        current text is v2 at <a href={spec}>llmstxt.org</a>, updated 10
        August 2026. It describes a Markdown file that tells an agent what a
        site is and which links to open. Google’s{" "}
        <a href={aiGuide}>AI optimization guide</a> says a special Markdown
        file neither helps nor harms visibility in Google Search. OpenAI and
        Perplexity do not list the file as a crawler control.         CiteScore does
        not log into an answer engine. llms.txt is <LlmsTxtCaveat />.
      </p>
      <p>
        Ten live files, and the one choice each gets right, are on{" "}
        <Link href="/llms-txt-examples">llms.txt examples</Link>. The
        generator that copies a starter file into your browser is the{" "}
        <Link href="/llms-txt-generator">llms.txt generator</Link>. What the
        file is not is on the <Link href="/llms-txt">llms.txt checker</Link>.
      </p>

      <h2>The order the spec describes</h2>
      <p>
        A file that follows the spec, at <code>/llms.txt</code> or at a
        subpath such as <code>/docs/llms.txt</code>, uses this order. A file
        covers the URLs under its path. Where more than one file applies,
        the spec says agents should use the most specific one.
      </p>
      <ol>
        <li>An optional byte-order mark.</li>
        <li>
          An H1 with the name of the project or site. This is the only
          required section.
        </li>
        <li>
          A blockquote with a short summary. The spec calls this the key
          information for understanding the rest of the file.
        </li>
        <li>
          Zero or more Markdown sections that are not headings: paragraphs
          or lists with details.
        </li>
        <li>
          Zero or more H2 sections. Each one is a list of links, written{" "}
          <code>[name](url)</code>, optionally followed by <code>:</code> and
          a note.
        </li>
      </ol>
      <p>
        The heading “Optional” is a convention for links an agent can skip.
        The <a href={changes}>changes page</a> says v2 removed the mechanical
        meaning that heading had for a context-expansion tool. A parser that
        drops everything under Optional is implementing the old tool, not
        the current spec.
      </p>
      <pre className={preClass}>{validFile}</pre>
      <p>
        The spec also asks that the links point at LLM-friendly content,
        such as a Markdown version of the page (<code>page.md</code> or{" "}
        <code>page.html.md</code>). It recommends{" "}
        <code>rel=&quot;alternate&quot;</code> with{" "}
        <code>type=&quot;text/markdown&quot;</code>, and{" "}
        <code>rel=&quot;describedby&quot;</code> pointing at the llms.txt
        that covers the page. Those can be HTML link elements or an HTTP{" "}
        <code>Link</code> header.
      </p>

      <h2>Mistakes that fail a read of the spec</h2>
      <ul>
        <li>
          <strong>No H1.</strong> The spec calls the H1 the only required
          section. A file that starts with a paragraph has no name.
        </li>
        <li>
          <strong>Headings before the file lists.</strong> The free-form
          block may not contain headings. An H3 in that block breaks the
          order.
        </li>
        <li>
          <strong>An H2 that is not a link list.</strong> After the first
          file-list heading, each section is a Markdown list of{" "}
          <code>[name](url)</code> items. A bare URL, or a title with no
          link, is not that item.
        </li>
        <li>
          <strong>HTML at the URL.</strong> A soft 404, a redirect to the
          homepage, or an error page that returns 200 is not the Markdown
          file. Open <code>/llms.txt</code> and read the first line.
        </li>
        <li>
          <strong>A second sitemap.</strong> The spec says a sitemap lists
          pages for search engines, is often too large for a context window,
          and does not mark which URLs matter. Curate the list. Leave the
          full URL set in <code>sitemap.xml</code>.
        </li>
        <li>
          <strong>Links that do not resolve.</strong> The spec says agents
          view the file and then follow the relevant links. A 404, a login
          wall, or a tracking URL with a session parameter is a link that
          does not lead to the page you named.
        </li>
        <li>
          <strong>Treating Optional as a command.</strong> In v2 it is a
          name for secondary links. Keep the section if you want a short
          list and a long list. Do not expect clients to implement the
          retired tool.
        </li>
      </ul>
      <p>
        <code>llms-full.txt</code> is not a section of this spec. The
        proposal does not require a second file that inlines every page.
      </p>

      <h2>How to validate</h2>
      <p>
        Read the file against the list above. Then request each URL in the
        H2 lists and confirm it returns the page the note describes. The{" "}
        <Link href="/llms-txt-generator">generator</Link> builds a file with
        an H1, a blockquote, and absolute links. It does not check that
        those URLs are live. The{" "}
        <Link href="/llms-txt">llms.txt checker</Link> describes CiteScore’s
        fetch: <code>/llms.txt</code> returned a successful response and a
        body that is not empty. That fetch does not parse headings, and it
        does not follow the links. An HTML error page with a 200 can still
        count as found. Validate the Markdown yourself.
      </p>
      <p>
        Robots.txt is a different file. A model that can read{" "}
        <code>llms.txt</code> still cannot fetch a page the search crawler
        is disallowed from crawling. Those tokens are on{" "}
        <Link href="/ai-crawlers">AI crawlers</Link> and{" "}
        <Link href="/robots-txt-for-ai-crawlers">
          robots.txt for AI crawlers
        </Link>
        . The cross-engine page is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        .
      </p>

      <CheckLinks>
        The free check records whether <code>/llms.txt</code> is a non-empty
        success. It does not grade the H1, the blockquote, or the links.
      </CheckLinks>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={spec}>The /llms.txt file, v2</a>. The section order, the
          H1 requirement, file lists, and where the file may live.
        </li>
        <li>
          <a href={changes}>Changes</a>. Why Optional no longer has a
          mechanical meaning.
        </li>
        <li>
          <a href={aiGuide}>
            Optimizing your website for generative AI features on Google
            Search
          </a>
          . Google’s statement that a special Markdown file is not required
          for Search.
        </li>
        <li>
          <a href={LLMS_TXT_GOOGLE_URL}>Search Engine Land</a>. Google says
          it ignores llms.txt: the file will not harm or help Search
          rankings.
        </li>
      </ul>
    </>
  );
}
