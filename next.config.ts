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
        source: "/thanks",
        destination: "/thank-you",
        permanent: true,
      },
      {
        source: "/confirmation",
        destination: "/thank-you",
        permanent: true,
      },
      {
        source: "/free-snapshot/thanks",
        destination: "/thank-you",
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
      {
        source: "/support",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/help",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/agencies",
        destination: "/for-agencies",
        permanent: true,
      },
      {
        source: "/compare",
        destination: "/alternatives",
        permanent: true,
      },
      {
        source: "/buy",
        destination: "/fix-pack",
        permanent: true,
      },
      {
        source: "/order",
        destination: "/fix-pack",
        permanent: true,
      },
      {
        source: "/purchase",
        destination: "/fix-pack",
        permanent: true,
      },
      {
        source: "/checkout-fix-pack",
        destination: "/fix-pack",
        permanent: true,
      },
      {
        source: "/order-fix-pack",
        destination: "/fix-pack",
        permanent: true,
      },
      {
        source: "/buy-fix-pack",
        destination: "/fix-pack",
        permanent: true,
      },
      {
        source: "/fix-pack/sample",
        destination: "/sample-fix-pack",
        permanent: true,
      },
      {
        source: "/what-you-get",
        destination: "/sample-fix-pack",
        permanent: true,
      },
      {
        source: "/get-started",
        destination: "/free-snapshot",
        permanent: true,
      },
      {
        source: "/start",
        destination: "/free-snapshot",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/testimonials",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/reviews",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/security",
        destination: "/.well-known/security.txt",
        permanent: true,
      },
      {
        source: "/vs",
        destination: "/alternatives",
        permanent: true,
      },
      {
        source: "/ai-visibility-checklist",
        destination: "/checklist",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
