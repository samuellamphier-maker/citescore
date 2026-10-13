import Link from "next/link";
import { relatedGuidePages } from "@/lib/content/topics";

export function RelatedGuides({ current }: { current: string }) {
  const guides = relatedGuidePages(current);
  if (guides.length === 0) return null;

  return (
    <nav className="mt-10 border-t border-rule pt-6" aria-label="Related guides">
      <p className="kicker">Related guides</p>
      <ul className="mt-3 space-y-2">
        {guides.map((page) => (
          <li key={page.path}>
            <Link
              href={page.path}
              className="text-sm font-medium text-forest underline-offset-4 hover:underline"
            >
              {page.navLabel ?? page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
