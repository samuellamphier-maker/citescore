import { topicPages, type TopicPage } from "@/lib/content/topics";

export type ToolGroup = {
  id: string;
  title: string;
  intro: string;
  pages: TopicPage[];
};

function isChecker(path: string) {
  return path === "/free-check" || path.endsWith("-checker");
}

function isFileGenerator(path: string) {
  return path === "/llms-txt-generator" || path === "/robots-txt-ai-crawler-generator";
}

function isSchemaGenerator(path: string) {
  return path.endsWith("-schema-generator");
}

/** Short label already stored on the topic. Falls back to the page title. */
export function toolPageLabel(page: TopicPage) {
  return page.navLabel ?? page.title;
}

/**
 * Free tools already published: the public-file signal check, the robots.txt checker,
 * the llms.txt and robots.txt generators, and every schema generator.
 */
const groupDefs = [
  {
    id: "checks",
    title: "Checks",
    intro:
      "The public-file signal check and the robots.txt checker already on this site. The signal check does not query ChatGPT or Perplexity.",
    include: isChecker,
  },
  {
    id: "files",
    title: "llms.txt and robots.txt",
    intro: "The llms.txt generator and the robots.txt generator already on this site.",
    include: isFileGenerator,
  },
  {
    id: "schema",
    title: "Schema generators",
    intro: "Schema generators already on this site.",
    include: isSchemaGenerator,
  },
] as const;

export function toolGroups(): ToolGroup[] {
  return groupDefs.map((group) => ({
    id: group.id,
    title: group.title,
    intro: group.intro,
    pages: topicPages.filter((page) => group.include(page.path)),
  }));
}

/** Paths the hub must list: every published free check, checker, and generator. */
export function expectedToolHubPaths() {
  return topicPages
    .filter(
      (page) => isChecker(page.path) || isFileGenerator(page.path) || isSchemaGenerator(page.path),
    )
    .map((page) => page.path);
}
