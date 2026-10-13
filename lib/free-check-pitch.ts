export type FreeCheckSnapshot = {
  homepage: { reachable: boolean; hasMetaDescription: boolean };
  robots: {
    found: boolean;
    gptBot: string;
    perplexityBot: string;
    googleExtended: string;
  };
  llmsTxt: { found: boolean };
  sitemap: { found: boolean };
  schema: { found: boolean };
};

export type AuditPitch = {
  heading: string;
  detail: string;
};

const OFFER = "Get a prioritized page-level fix list for $39.";
const HONESTY =
  "CiteScore checks citation-readiness signals and does not query live ChatGPT or Perplexity.";

function joinList(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function issuesRemain(count: number) {
  return count === 1 ? "1 issue remains" : `${count} issues remain`;
}

function otherIssuesRemain(count: number) {
  return count === 1 ? "1 other issue remains" : `${count} other issues remain`;
}

export function freeCheckAuditPitch(result: FreeCheckSnapshot): AuditPitch {
  const blockedBots = [
    result.robots.gptBot === "disallow" ? "GPTBot" : "",
    result.robots.perplexityBot === "disallow" ? "PerplexityBot" : "",
    result.robots.googleExtended === "disallow" ? "Google-Extended" : "",
  ].filter(Boolean);

  const issues: string[] = [];
  if (!result.homepage.reachable) issues.push("the homepage did not load");
  if (!result.robots.found) issues.push("robots.txt is missing");
  else if (blockedBots.length > 0) {
    issues.push(
      `${joinList(blockedBots)} ${blockedBots.length === 1 ? "is" : "are"} blocked`,
    );
  }
  if (!result.llmsTxt.found) issues.push("llms.txt is missing");
  if (!result.sitemap.found) issues.push("no sitemap");
  if (result.homepage.reachable && !result.schema.found) issues.push("no JSON-LD");
  if (result.homepage.reachable && !result.homepage.hasMetaDescription) {
    issues.push("no meta description");
  }

  const crawlersAllowed = result.robots.found && blockedBots.length === 0;
  const open = issues.length
    ? `Still open: ${joinList(issues)}.`
    : "";

  if (!result.homepage.reachable) {
    const others = issues.length - 1;
    return {
      heading:
        others > 0
          ? `We could not load your homepage, and ${otherIssuesRemain(others)}.`
          : "We could not load your homepage.",
      detail: `${open} ${OFFER} ${HONESTY}`,
    };
  }

  if (crawlersAllowed && issues.length > 0) {
    return {
      heading: `Your site allows AI crawlers, but ${issuesRemain(issues.length)}.`,
      detail: `${open} ${OFFER} ${HONESTY}`,
    };
  }

  if (blockedBots.length > 0) {
    const others = issues.length - 1;
    return {
      heading:
        others > 0
          ? `Your robots.txt blocks ${joinList(blockedBots)}, and ${otherIssuesRemain(others)}.`
          : `Your robots.txt blocks ${joinList(blockedBots)}.`,
      detail: `${open} ${OFFER} ${HONESTY}`,
    };
  }

  if (!result.robots.found) {
    return {
      heading:
        issues.length > 1
          ? `No robots.txt was found, and ${otherIssuesRemain(issues.length - 1)}.`
          : "No robots.txt was found, so AI crawler access is unspecified.",
      detail: `${open} ${OFFER} ${HONESTY}`,
    };
  }

  return {
    heading:
      "Your site allows AI crawlers, and the six citation-readiness basics are in place.",
    detail: `The free check still cannot show a live citation. Get a prioritized, page-specific action plan for $39. ${HONESTY}`,
  };
}
