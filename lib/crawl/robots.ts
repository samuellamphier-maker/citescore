import type { RobotsSignals } from "@/lib/crawl/types";

type Group = {
  agents: string[];
  rules: { allow: boolean; path: string }[];
};

function normalizeAgent(value: string) {
  return value.trim().toLowerCase();
}

export function parseRobotsTxt(text: string): Group[] {
  const groups: Group[] = [];
  let current: Group | null = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();

    if (key === "user-agent") {
      if (!current || current.rules.length > 0) {
        current = { agents: [normalizeAgent(value)], rules: [] };
        groups.push(current);
      } else {
        current.agents.push(normalizeAgent(value));
      }
      continue;
    }

    if (!current) {
      current = { agents: ["*"], rules: [] };
      groups.push(current);
    }

    if (key === "allow") current.rules.push({ allow: true, path: value || "/" });
    if (key === "disallow") current.rules.push({ allow: false, path: value });
  }

  return groups;
}

function matchingGroup(groups: Group[], agent: string) {
  const exact = groups.find((group) => group.agents.includes(agent));
  if (exact) return exact;
  return groups.find((group) => group.agents.includes("*")) ?? null;
}

function pathAllowed(group: Group | null, path: string) {
  if (!group) return true;
  let decision: boolean | null = null;
  let matchedLength = -1;
  for (const rule of group.rules) {
    const prefix = rule.path || "/";
    if (!path.startsWith(prefix) && prefix !== "/") continue;
    if (prefix.length >= matchedLength) {
      matchedLength = prefix.length;
      decision = rule.allow || prefix === "";
      if (prefix === "" && !rule.allow) decision = true;
    }
  }
  return decision ?? true;
}

export function robotPolicy(
  text: string,
  agent: string,
  path = "/",
): "allow" | "disallow" | "unspecified" {
  const groups = parseRobotsTxt(text);
  const group = matchingGroup(groups, agent.toLowerCase());
  if (!group) return "unspecified";
  return pathAllowed(group, path) ? "allow" : "disallow";
}

export function robotsSignals(text: string | null, status: number | null): RobotsSignals {
  if (!text) {
    return {
      fetched: false,
      status,
      allowsGeneric: true,
      gptBot: "unspecified",
      perplexityBot: "unspecified",
      googleExtended: "unspecified",
      rawSample: "",
    };
  }

  return {
    fetched: true,
    status,
    allowsGeneric: robotPolicy(text, "*", "/") !== "disallow",
    gptBot: robotPolicy(text, "gptbot"),
    perplexityBot: robotPolicy(text, "perplexitybot"),
    googleExtended: robotPolicy(text, "google-extended"),
    rawSample: text.slice(0, 1500),
  };
}
