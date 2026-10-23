import { LLMS_TXT_GOOGLE_URL, LLMS_TXT_OPTIONAL_CLAIM } from "@/lib/llms-txt-note";

export function LlmsTxtCaveat({
  className = "text-forest underline",
}: {
  className?: string;
}) {
  return (
    <a href={LLMS_TXT_GOOGLE_URL} className={className}>
      {LLMS_TXT_OPTIONAL_CLAIM}
    </a>
  );
}
