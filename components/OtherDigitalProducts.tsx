import Link from "next/link";

/**
 * Closed disclosure for the older audit pages.
 * Checkout for those files stays on the linked pages.
 */
export function OtherDigitalProducts() {
  return (
    <details className="group mt-12 border-t border-rule">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 py-3 marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          <span className="block font-medium text-ink">Other digital products</span>
          <span className="mt-0.5 block text-sm font-normal leading-6 text-ink-soft">
            Also available. Separate from the free snapshot and the Fix Pack.
          </span>
        </span>
        <span
          aria-hidden="true"
          className="ml-auto text-xl leading-none text-ink-soft group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="space-y-3 pb-4 text-sm leading-6 text-ink-soft">
        <p>
          Prepared by the CiteScore Team. These files do not query ChatGPT or
          Perplexity.
        </p>
        <ul className="space-y-2">
          <li>
            <Link href="/geo-audit" className="font-medium text-forest underline">
              GEO audit
            </Link>
            . A self-serve PDF for one public URL. It reads public HTML and
            scores on-page signals.
          </li>
          <li>
            <Link
              href="/done-for-you-audit"
              className="font-medium text-forest underline"
            >
              Written audit
            </Link>
            . A written walkthrough of one public URL, delivered within 3
            business days.
          </li>
        </ul>
      </div>
    </details>
  );
}
