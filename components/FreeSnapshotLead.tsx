"use client";

import { freeSnapshotHeading, freeSnapshotLead } from "@/lib/home-service-trade";
import { useHomeServiceTradeParam } from "@/components/useHomeServiceTrade";

export function FreeSnapshotLead() {
  const trade = useHomeServiceTradeParam();

  return (
    <>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
        {freeSnapshotHeading(trade)}
      </h1>
      <p className="mt-4 text-lg leading-8 text-ink-soft">{freeSnapshotLead(trade)}</p>
    </>
  );
}
