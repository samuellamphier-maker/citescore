"use client";

import { useSyncExternalStore } from "react";
import {
  readHomeServiceTradeParam,
  type HomeServiceTradeInfo,
} from "@/lib/home-service-trade";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

function getSnapshot(): HomeServiceTradeInfo | null {
  return readHomeServiceTradeParam();
}

function getServerSnapshot(): HomeServiceTradeInfo | null {
  return null;
}

/**
 * Allowlisted ?trade= value.
 * The server snapshot is null, so prerendered HTML matches a visit with no
 * query. After hydration the client snapshot reads the URL.
 */
export function useHomeServiceTradeParam() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
