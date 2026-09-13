const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeSiteUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname.includes(".")) return null;
    if (url.hostname === "localhost" || url.hostname.endsWith(".local")) {
      return url.toString();
    }
    return url.toString();
  } catch {
    return null;
  }
}

export function isValidEmail(input: string): boolean {
  return EMAIL_RE.test(input.trim());
}
