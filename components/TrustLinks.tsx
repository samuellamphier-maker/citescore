import Link from "next/link";
import { contactEmail, sellerName } from "@/lib/site";

export function TrustLinks({ className = "text-sm leading-6 text-ink-soft" }: { className?: string }) {
  return (
    <p className={className}>
      Sold by {sellerName}.{" "}
      <a href={`mailto:${contactEmail}`} className="text-forest underline">
        {contactEmail}
      </a>
      {" · "}
      <Link href="/about" className="text-forest underline">
        About
      </Link>
      {" · "}
      <Link href="/terms" className="text-forest underline">
        Terms
      </Link>
      {" · "}
      <Link href="/privacy" className="text-forest underline">
        Privacy
      </Link>
      {" · "}
      <Link href="/refunds" className="text-forest underline">
        Refunds
      </Link>
    </p>
  );
}
