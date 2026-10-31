import { marketingPaths } from "@/lib/content/blog";
import { topicPages } from "@/lib/content/topics";
import {
  contactEmail,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  productionOrigin,
  sellerName,
  site,
} from "@/lib/site";

/**
 * Public /llms.txt. The blockquote is site.description. Link notes are the
 * page descriptions already published on those URLs. Seller and email come
 * from lib/site.ts.
 */
const aboutSummary = `CiteScore is operated by the CiteScore Team. The free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack are sold by ${sellerName}. Contact ${contactEmail}.`;

type LlmsLink = {
  title: string;
  path: string;
  note: string;
};

const guidePaths = [
  "/how-to-get-cited-by-chatgpt",
  "/how-to-get-cited-by-perplexity",
  "/how-to-get-cited-by-ai-answer-engines",
  "/geo-for-local-businesses",
  "/geo-vs-seo",
  "/llms-txt-best-practices",
] as const;

function guideLink(path: (typeof guidePaths)[number]): LlmsLink {
  const page = topicPages.find((item) => item.path === path);
  if (!page) {
    throw new Error(`llms.txt guide is not in the sitemap topics: ${path}`);
  }
  return {
    title: page.navLabel ?? page.title,
    path: page.path,
    note: page.description,
  };
}

export const llmsTxtSections: { heading: string; links: LlmsLink[] }[] = [
  {
    heading: "Offers",
    links: [
      {
        title: "Free AI Answer Snapshot",
        path: "/free-snapshot",
        note: `Request a free AI Answer Snapshot for one local business. We ask logged-out ChatGPT and Perplexity who they name for that trade and city, and reply with a one-page snapshot. The ${fixPackIntroPriceLabel} Fix Pack is optional.`,
      },
      {
        title: "Example AI Answer Snapshot",
        path: "/sample-snapshot",
        note: "Example only: a fictional AI Answer Snapshot for Example Plumbing Co. in Riverton, USA. Illustrative prompts, names, sources, and review counts. Not a customer result.",
      },
      {
        title: "AI Visibility Fix Pack",
        path: "/fix-pack",
        note: `The AI Visibility Fix Pack is ${fixPackIntroPriceLabel} introductory (${fixPackListPriceLabel} list): Google Business Profile gaps, a review plan, cited directories, LocalBusiness JSON-LD, and a 14-day re-check.`,
      },
    ],
  },
  {
    heading: "Site",
    links: [
      {
        title: "How it works",
        path: "/how-it-works",
        note: `Request a free AI Answer Snapshot. CiteScore asks logged-out ChatGPT and Perplexity who they name, then replies with a one-page snapshot by email. The ${fixPackIntroPriceLabel} Fix Pack is optional.`,
      },
      {
        title: "Pricing",
        path: "/pricing",
        note: `The AI Answer Snapshot is free. The AI Visibility Fix Pack is ${fixPackIntroPriceLabel} introductory (${fixPackListPriceLabel} list) for one business, one city, and one service, emailed within a few business days after payment.`,
      },
      {
        title: "FAQ",
        path: "/faq",
        note: `Answers about the free AI Answer Snapshot and the ${fixPackIntroPriceLabel} AI Visibility Fix Pack: what the snapshot checks, how to request it, how the form is handled, what the pack includes, delivery, and refunds.`,
      },
      {
        title: "About",
        path: "/about",
        note: aboutSummary,
      },
      {
        title: "Contact",
        path: "/contact",
        note: `Questions about CiteScore: email ${contactEmail}. Include the business name, website, and city or trade.`,
      },
    ],
  },
  {
    heading: "Policies",
    links: [
      {
        title: "Terms of Service",
        path: "/terms",
        note: "Terms for CiteScore digital audits, the Fix Pack, and downloads sold by CiteScore.",
      },
      {
        title: "Privacy",
        path: "/privacy",
        note: `How ${sellerName} handles URLs, snapshot requests, and language-model processing. Contact ${contactEmail}.`,
      },
      {
        title: "Refunds",
        path: "/refunds",
        note: `Full refund within 14 days if the CiteScore Fix Pack is not useful. Sold by ${sellerName}. Contact ${contactEmail}.`,
      },
    ],
  },
  {
    heading: "Guides",
    links: guidePaths.map((path) => guideLink(path)),
  },
];

export function sitemapSourcePaths() {
  return new Set([
    ...marketingPaths.map((item) => item.path),
    ...topicPages.map((item) => item.path),
  ]);
}

function linkLine(link: LlmsLink, known: Set<string>) {
  if (!known.has(link.path)) {
    throw new Error(`llms.txt links a path that is not in the sitemap source: ${link.path}`);
  }
  const note = link.note.replace(/\s+/g, " ").trim();
  return `- [${link.title}](${productionOrigin}${link.path}): ${note}`;
}

export function citeScoreLlmsTxt() {
  const known = sitemapSourcePaths();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    aboutSummary,
  ];
  for (const section of llmsTxtSections) {
    lines.push("", `## ${section.heading}`);
    for (const link of section.links) {
      lines.push(linkLine(link, known));
    }
  }
  return `${lines.join("\n")}\n`;
}
