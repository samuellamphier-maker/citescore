import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function pageMeta({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const ogTitle = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      type,
      url: path,
      siteName: site.name,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary",
      title: ogTitle,
      description,
    },
  };
}

export function formatDisplayDate(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
