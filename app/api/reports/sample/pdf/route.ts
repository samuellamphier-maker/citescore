import { renderReportPdf, reportFilename } from "@/lib/report/pdf";
import { sampleReport } from "@/lib/sample-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const pdf = await renderReportPdf(sampleReport);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${reportFilename(sampleReport)}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
