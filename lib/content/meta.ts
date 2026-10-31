import type { Metadata } from "next";
import { site } from "@/lib/site";

/** Default card served by `app/opengraph-image.tsx`. */
export const socialImagePath = "/opengraph-image";

export const socialImageSize = {
  width: 1200,
  height: 630,
} as const;

export const socialImageAlt = `${site.name} — ${site.tagline}`;

export const socialImage = {
  url: socialImagePath,
  width: socialImageSize.width,
  height: socialImageSize.height,
  alt: socialImageAlt,
};

const rootTitle = `${site.name} — ${site.tagline}`;

export const rootOpenGraph = {
  title: rootTitle,
  description: site.description,
  type: "website" as const,
  siteName: site.name,
  locale: "en_US",
  images: [socialImage],
};

export const rootTwitter = {
  card: "summary_large_image" as const,
  title: rootTitle,
  description: site.description,
  images: [socialImagePath],
};

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
      images: [socialImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [socialImagePath],
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
