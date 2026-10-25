import type { ReactNode } from "react";
import Link from "next/link";
import {
  llmsTxtSourceUrl,
  sonickStudyUrl,
  type FaqItem,
} from "@/lib/offer-faq";
import { contactEmail } from "@/lib/site";

const phrases: { phrase: string; href: string; external?: boolean }[] = [
  { phrase: contactEmail, href: `mailto:${contactEmail}` },
  { phrase: "About page", href: "/about" },
  { phrase: "refunds page", href: "/refunds" },
  { phrase: "SoNick Marketing", href: sonickStudyUrl, external: true },
  { phrase: "Search Engine Land", href: llmsTxtSourceUrl, external: true },
];

function LinkedText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let rest = text;
  let index = 0;

  while (rest.length > 0) {
    let earliest: { at: number; item: (typeof phrases)[number] } | null = null;
    for (const item of phrases) {
      const at = rest.indexOf(item.phrase);
      if (at !== -1 && (earliest === null || at < earliest.at)) {
        earliest = { at, item };
      }
    }
    if (!earliest) {
      nodes.push(rest);
      break;
    }
    if (earliest.at > 0) nodes.push(rest.slice(0, earliest.at));
    const { item } = earliest;
    const className = "text-forest underline";
    nodes.push(
      item.external || item.href.startsWith("mailto:") ? (
        <a key={index} href={item.href} className={className}>
          {item.phrase}
        </a>
      ) : (
        <Link key={index} href={item.href} className={className}>
          {item.phrase}
        </Link>
      ),
    );
    index += 1;
    rest = rest.slice(earliest.at + item.phrase.length);
  }

  return <>{nodes}</>;
}

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="mt-6 divide-y divide-rule border-y border-rule">
      {items.map((item) => (
        <details key={item.q} className="group py-4">
          <summary className="cursor-pointer list-none font-medium leading-7 marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-6">
              {item.q}
              <span className="text-ink-soft group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
            <LinkedText text={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
