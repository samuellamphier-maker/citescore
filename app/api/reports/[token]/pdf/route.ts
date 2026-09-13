import { getJobByDownloadToken } from "@/lib/jobs/store";
import { renderReportPdf, reportFilename } from "@/lib/report/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const job = await getJobByDownloadToken(token);
  if (!job?.report) {
    return Response.json({ error: "Report not found." }, { status: 404 });
  }

  const pdf = await renderReportPdf(job.report);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${reportFilename(job.report)}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
