"use client";

import { freeSnapshotHeading, freeSnapshotLead, freeSnapshotLeadForService } from "@/lib/home-service-trade";
import { snapshotServiceAskPhrase } from "@/lib/industry-snapshot";
import { useHomeServiceTradeParam } from "@/components/useHomeServiceTrade";

export function FreeSnapshotLead({ service = "" }: { service?: string }) {
  const trade = useHomeServiceTradeParam();
  const named = service.trim();

  return (
    <>
      <h1 className="mt-1 font-serif text-3xl tracking-tight sm:mt-3 sm:text-5xl">
        {freeSnapshotHeading(trade)}
      </h1>
      <p className="mt-2 text-base leading-6 text-ink-soft sm:mt-4 sm:text-lg sm:leading-8">
        {trade || !named
          ? freeSnapshotLead(trade)
          : freeSnapshotLeadForService(snapshotServiceAskPhrase(named))}
      </p>
    </>
  );
}
