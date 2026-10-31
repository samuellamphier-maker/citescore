import { citeScoreHumansTxt } from "@/lib/humans-txt";

export const dynamic = "force-static";

export function GET() {
  return new Response(citeScoreHumansTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
