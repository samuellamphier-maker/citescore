import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { rootOpenGraph, rootTwitter, rssFeedAlternate } from "@/lib/content/meta";
import { publicOrigin, site } from "@/lib/site";
import { citeScoreOrganizationJsonLd, citeScoreWebsiteJsonLd } from "@/lib/site-schema";
import { stickySnapshotHeadScript } from "@/lib/sticky-snapshot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

// Headlines are the LCP text. Preload only the roman cut so the italic file
// does not compete with it on a slow mobile connection.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: "normal",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const newsreaderItalic = Newsreader({
  variable: "--font-newsreader-italic",
  subsets: ["latin"],
  style: "italic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(publicOrigin()),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  verification: {
    google: "MC5jDg5-OJHO_BrY01y1P9p-7FEBLfKLy9U639OOvG4",
    other: {
      "rightaichoice-verify": "rac-8lgpdJ41vFHB9CHY_J5vo1sYYfTPPf19",
    },
  },
  openGraph: rootOpenGraph,
  twitter: rootTwitter,
  alternates: rssFeedAlternate,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${newsreaderItalic.variable} h-full antialiased`}
      data-sticky-snapshot="on"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: stickySnapshotHeadScript() }} />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={citeScoreOrganizationJsonLd(publicOrigin())} />
        <JsonLd data={citeScoreWebsiteJsonLd(publicOrigin())} />
        {children}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
