import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfkit"],
  async redirects() {
    return [
      {
        source: "/snapshot",
        destination: "/free-snapshot",
        permanent: true,
      },
      {
        source: "/ai-answer-snapshot",
        destination: "/free-snapshot",
        permanent: true,
      },
      {
        source: "/free-ai-answer-snapshot",
        destination: "/free-snapshot",
        permanent: true,
      },
      {
        source: "/refund",
        destination: "/refunds",
        permanent: true,
      },
      {
        source: "/refund-policy",
        destination: "/refunds",
        permanent: true,
      },
      {
        source: "/guarantee",
        destination: "/refunds",
        permanent: true,
      },
      {
        source: "/site.webmanifest",
        destination: "/manifest.webmanifest",
        permanent: true,
      },
      {
        source: "/feed.xml",
        destination: "/rss.xml",
        permanent: true,
      },
      {
        source: "/example-snapshot",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/snapshot-example",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/sample-report",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/example-report",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/demo",
        destination: "/sample-snapshot",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
