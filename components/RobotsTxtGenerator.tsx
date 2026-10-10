"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  AI_CRAWLERS,
  buildRobotsTxt,
  matchingPreset,
  policiesForPreset,
  type CrawlerId,
  type CrawlerPolicy,
  type RobotsPreset,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

const PRESETS: { id: RobotsPreset; label: string }[] = [
  { id: "allow", label: "Allow every crawler listed" },
  { id: "search", label: "Allow AI search, block training crawlers" },
  { id: "block", label: "Block every crawler listed" },
];

export function RobotsTxtGenerator() {
  const [policies, setPolicies] = useState(policiesForPreset("allow"));
  const [privatePaths, setPrivatePaths] = useState("");
  const [sitemap, setSitemap] = useState("");
  const preset = matchingPreset(policies);
  const { text, sitemapError, ignoredRoot } = useMemo(
    () => buildRobotsTxt({ policies, privatePaths, sitemap }),
    [policies, privatePaths, sitemap],
  );

  function setPolicy(id: CrawlerId, policy: CrawlerPolicy) {
    setPolicies({ ...policies, [id]: policy });
  }

  return (
    <form
      className="rounded-2xl border border-rule bg-cream p-5 text-ink"
      onSubmit={(event) => event.preventDefault()}
    >
      <fieldset>
        <legend className="text-sm font-medium">Starting point</legend>
        <div className="mt-2 grid gap-2">
          {PRESETS.map((item) => (
            <label key={item.id} className="flex items-start gap-2 text-sm">
              <input
                type="radio"
                name="preset"
                className="mt-1"
                checked={preset === item.id}
                onChange={() => setPolicies(policiesForPreset(item.id))}
              />
              {item.label}
            </label>
          ))}
          {preset === "custom" ? <p className="text-sm text-ink-soft">Custom mix of the rows below.</p> : null}
        </div>
      </fieldset>

      <div className="mt-6 border-y border-rule">
        {AI_CRAWLERS.map((crawler) => (
          <div key={crawler.id} className="flex flex-col gap-2 border-b border-rule py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">{crawler.token}</p>
              <p className="text-xs leading-5 text-ink-soft">{crawler.blurb}</p>
            </div>
            <label className="shrink-0 text-sm">
              <span className="sr-only">{crawler.token} policy</span>
              <select
                className="rounded-lg border border-rule bg-white px-3 py-2 text-sm"
                value={policies[crawler.id]}
                onChange={(event) => setPolicy(crawler.id, event.target.value as CrawlerPolicy)}
              >
                <option value="allow">Allow</option>
                <option value="disallow">Block</option>
              </select>
            </label>
          </div>
        ))}
      </div>

      <label className="mt-6 block text-sm font-medium">
        Private paths
        <span className="mt-0.5 block text-xs font-normal text-ink-soft">
          One path per line. Repeated on every Allow group, because a named crawler ignores <code>User-agent: *</code>.
        </span>
        <textarea
          className={`${field} mt-1 font-mono`}
          value={privatePaths}
          onChange={(event) => setPrivatePaths(event.target.value)}
          placeholder={"/admin/\n/account/"}
          rows={3}
        />
      </label>
      {ignoredRoot ? (
        <p className="mt-2 text-sm text-copper" role="alert">
          A path of <code>/</code> would block the whole site, so it was left out.
        </p>
      ) : null}

      <label className="mt-4 block text-sm font-medium">
        Sitemap URL
        <span className="mt-0.5 block text-xs font-normal text-ink-soft">Optional. A bare domain becomes /sitemap.xml.</span>
        <input
          className={`${field} mt-1`}
          value={sitemap}
          onChange={(event) => setSitemap(event.target.value)}
          placeholder="https://example.com/sitemap.xml"
          inputMode="url"
        />
      </label>
      {sitemapError ? (
        <p className="mt-2 text-sm text-copper" role="alert">
          {sitemapError}
        </p>
      ) : null}

      <CopyBlock label="robots.txt" value={text} empty="" />
      <p className="mt-3 text-xs text-ink-soft">
        If you already have a robots.txt, merge these named groups into it. Replacing the file can drop a Googlebot rule you meant to keep.
      </p>
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
