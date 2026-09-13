import { addWaitlistEntry } from "@/lib/waitlist";
import { isValidEmail, normalizeSiteUrl } from "@/lib/urls";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: { email?: unknown; url?: unknown };

  try {
    payload = (await request.json()) as { email?: unknown; url?: unknown };
  } catch {
    return Response.json({ error: "Send JSON with email and url." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email : "";
  const rawUrl = typeof payload.url === "string" ? payload.url : "";
  const url = normalizeSiteUrl(rawUrl);

  if (!isValidEmail(email)) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!url) {
    return Response.json({ error: "A valid http(s) URL is required." }, { status: 400 });
  }

  const entry = await addWaitlistEntry({ email, url });
  return Response.json({ ok: true, id: entry.id });
}
