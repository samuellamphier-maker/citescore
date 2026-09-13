import { authorizeAdmin } from "@/lib/admin-auth";
import { getJobById } from "@/lib/jobs/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = authorizeAdmin(request);
  if (!auth.ok) {
    return Response.json({ error: auth.reason }, { status: 401 });
  }
  const { id } = await context.params;
  const job = await getJobById(id);
  if (!job) return Response.json({ error: "Job not found." }, { status: 404 });
  return Response.json({ job });
}
