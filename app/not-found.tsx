import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-xl flex-1 px-5 py-20">
        <p className="kicker">404</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          That page is not in the report.
        </h1>
        <p className="mt-4 text-ink-soft leading-7">
          The URL you opened is not part of this pre-sell site.
        </p>
        <div className="mt-8 flex gap-4 text-sm">
          <Link href="/" className="text-forest underline">
            Home
          </Link>
          <Link href="/sample" className="text-forest underline">
            Sample report
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
