/** Search Engine Land report of Google's statement that Search ignores llms.txt. */
export const LLMS_TXT_GOOGLE_URL =
  "https://searchengineland.com/google-says-llms-txt-files-wont-harm-or-help-your-search-rankings-480264";

export const LLMS_TXT_OPTIONAL_CLAIM =
  "optional; Google says it ignores llms.txt";

export function llmsTxtOptionalSentence() {
  return `llms.txt is ${LLMS_TXT_OPTIONAL_CLAIM} (${LLMS_TXT_GOOGLE_URL}).`;
}
