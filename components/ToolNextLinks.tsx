import Link from "next/link";

export function ToolNextLinks({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      <Link href="/free-check">Run the free check</Link>
      {" · "}
      <Link href="/geo-audit">Get the $39 GEO audit</Link>
    </p>
  );
}
