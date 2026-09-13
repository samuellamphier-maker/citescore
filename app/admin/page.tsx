import type { Metadata } from "next";
import { AdminConsole } from "@/components/AdminConsole";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Jobs",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-14">
        <p className="kicker">Operations</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">Audit queue</h1>
        <p className="mt-4 max-w-2xl text-ink-soft leading-7">
          Status for paid and manual jobs. Use the same{" "}
          <code className="font-mono text-xs">ADMIN_TOKEN</code> you set in
          Vercel. Retry a failed row after you fix keys or the target URL.
        </p>
        <AdminConsole />
      </main>
      <SiteFooter />
    </>
  );
}
