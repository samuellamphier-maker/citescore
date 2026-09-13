import { authorizeAdminOrCron } from "@/lib/admin-auth";
import { getJobById } from "@/lib/jobs/store";
import { toPublicJob } from "@/lib/jobs/types";
import { processJob } from "@/lib/pipeline";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = authorizeAdminOrCron(request);
  if (!auth.ok) {
    return Response.json({ error: auth.reason }, { status: 401 });
  }

  const { id } = await context.params;
  const existing = await getJobById(id);
  if (!existing) {
    return Response.json({ error: "Job not found." }, { status: 404 });
  }

  const job = await processJob(id, { force: true });
  return Response.json({ job: toPublicJob(job) });
}
