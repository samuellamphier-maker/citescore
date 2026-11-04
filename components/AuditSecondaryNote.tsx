import Link from "next/link";
import { doneForYouAuditLabel, doneForYouAuditPath } from "@/lib/site";

/** Smaller mention of the self-serve PDF. The snapshot and Fix Pack stay the lead. */
export function AuditSecondaryNote({
  includeDoneForYou = false,
  className = "mt-6 text-sm leading-6 text-ink-soft",
}: {
  includeDoneForYou?: boolean;
  className?: string;
}) {
  return (
    <p className={className}>
      A separate{" "}
      <Link
        href="/geo-audit"
        className="font-medium text-forest underline underline-offset-4"
      >
        GEO audit
      </Link>{" "}
      PDF covers one public URL.
      {includeDoneForYou ? (
        <>
          {" "}
          The{" "}
          <Link
            href={doneForYouAuditPath}
            className="font-medium text-forest underline underline-offset-4"
          >
            {doneForYouAuditLabel}
          </Link>{" "}
          is a written walkthrough, delivered within 3 business days.
        </>
      ) : null}
    </p>
  );
}
