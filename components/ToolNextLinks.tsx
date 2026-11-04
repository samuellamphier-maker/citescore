import Link from "next/link";
import { fixPackIntroPriceLabel } from "@/lib/site";

export function ToolNextLinks({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      <Link href="/free-snapshot">Get a free AI Answer Snapshot</Link>
      {" · "}
      <Link href="/fix-pack">Fix Pack, {fixPackIntroPriceLabel}</Link>
      {" · "}
      <Link href="/free-check">Run the free check</Link>
    </p>
  );
}
