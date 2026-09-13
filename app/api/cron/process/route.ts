import { authorizeAdminOrCron } from "@/lib/admin-auth";
import { listStuckJobs } from "@/lib/jobs/store";
import { processJob } from "@/lib/pipeline";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function run(request: Request) {
  const auth = authorizeAdminOrCron(request);
  if (!auth.ok) {
    return Response.json({ error: auth.reason }, { status: 401 });
  }

  const stuck = await listStuckJobs();
  const results = [];
  for (const job of stuck) {
    const next = await processJob(job.id, { force: true });
    results.push({ id: next.id, status: next.status, error: next.error });
  }
  return Response.json({ processed: results.length, results });
}

export async function GET(request: Request) {
  return run(request);
}

export async function POST(request: Request) {
  return run(request);
}
