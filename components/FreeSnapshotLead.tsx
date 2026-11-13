"use client";

import { freeSnapshotHeading, freeSnapshotLead, freeSnapshotLeadForService } from "@/lib/home-service-trade";
import { snapshotServiceAskPhrase } from "@/lib/industry-snapshot";
import { useHomeServiceTradeParam } from "@/components/useHomeServiceTrade";

export function FreeSnapshotLead({ service = "" }: { service?: string }) {
  const trade = useHomeServiceTradeParam();
  const named = service.trim();

  return (
    <>
      <h1 className="mt-1 font-serif text-3xl tracking-tight max-lg:order-1 lg:mt-3 lg:text-5xl">
        {freeSnapshotHeading(trade)}
      </h1>
      <p className="mt-2 text-base leading-6 text-ink-soft max-lg:order-3 lg:mt-4 lg:text-lg lg:leading-8">
        {trade || !named
          ? freeSnapshotLead(trade)
          : freeSnapshotLeadForService(snapshotServiceAskPhrase(named))}
      </p>
    </>
  );
}
