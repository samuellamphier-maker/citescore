/**
 * Home-services trades used by the four outreach guides and ?trade= on
 * /free-snapshot. Anything outside this allowlist is ignored.
 */

export const HOME_SERVICE_TRADE_IDS = ["plumber", "hvac", "roofer", "electrician"] as const;

export type HomeServiceTradeId = (typeof HOME_SERVICE_TRADE_IDS)[number];

export type HomeServiceTradeInfo = {
  id: HomeServiceTradeId;
  /** Written into the snapshot service field and the email subject. */
  service: string;
  /** "plumbing company" */
  company: string;
  /** "a plumber" — fits "asks for ___ in your city" */
  askFor: string;
  question: string;
  guidePath: string;
};

const trades: Record<HomeServiceTradeId, HomeServiceTradeInfo> = {
  plumber: {
    id: "plumber",
    service: "plumber",
    company: "plumbing company",
    askFor: "a plumber",
    question:
      "Does ChatGPT name your plumbing company when someone asks for a plumber in your city?",
    guidePath: "/ai-search-visibility-for-plumbers",
  },
  hvac: {
    id: "hvac",
    service: "HVAC",
    company: "HVAC company",
    askFor: "an HVAC company",
    question:
      "Does ChatGPT name your HVAC company when someone asks for an HVAC company in your city?",
    guidePath: "/ai-search-visibility-for-hvac",
  },
  roofer: {
    id: "roofer",
    service: "roofer",
    company: "roofing company",
    askFor: "a roofer",
    question:
      "Does ChatGPT name your roofing company when someone asks for a roofer in your city?",
    guidePath: "/ai-search-visibility-for-roofers",
  },
  electrician: {
    id: "electrician",
    service: "electrician",
    company: "electrical company",
    askFor: "an electrician",
    question:
      "Does ChatGPT name your electrical company when someone asks for an electrician in your city?",
    guidePath: "/ai-search-visibility-for-electricians",
  },
};

const allowed = new Set<string>(HOME_SERVICE_TRADE_IDS);

const byGuide = new Map<string, HomeServiceTradeInfo>(
  HOME_SERVICE_TRADE_IDS.map((id) => [trades[id].guidePath, trades[id]]),
);

export function isHomeServiceTradeId(value: string): value is HomeServiceTradeId {
  return allowed.has(value);
}

/** Exact allowlist match. Other values, including different casing, are ignored. */
export function parseHomeServiceTrade(value: string | null | undefined): HomeServiceTradeInfo | null {
  if (!value || !isHomeServiceTradeId(value)) return null;
  return trades[value];
}

export function homeServiceTradeForGuide(path: string): HomeServiceTradeInfo | null {
  return byGuide.get(path) ?? null;
}

export function freeSnapshotPath(trade: HomeServiceTradeId) {
  return `/free-snapshot?trade=${trade}`;
}

export const freeSnapshotHeadingDefault = "Request a free AI Answer Snapshot.";

export const freeSnapshotLeadDefault =
  "When customers ask ChatGPT or Perplexity for a plumber (or your trade) in your city, who do they name instead of the local business?";

export function freeSnapshotHeading(trade: HomeServiceTradeInfo | null) {
  if (!trade) return freeSnapshotHeadingDefault;
  return `Request a free AI Answer Snapshot for your ${trade.company}.`;
}

export function freeSnapshotLead(trade: HomeServiceTradeInfo | null) {
  if (!trade) return freeSnapshotLeadDefault;
  return `When customers ask ChatGPT or Perplexity for ${trade.askFor} in your city, who do they name instead of your ${trade.company}?`;
}

/**
 * Read ?trade= from the current URL.
 * Safe inside useSyncExternalStore's client snapshot. Do not call it during
 * render: window would disagree with the prerender and hydration would fail.
 */
export function readHomeServiceTradeParam(): HomeServiceTradeInfo | null {
  if (typeof window === "undefined") return null;
  return parseHomeServiceTrade(new URLSearchParams(window.location.search).get("trade"));
}
