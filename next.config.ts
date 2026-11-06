import type { NextConfig } from "next";
import path from "node:path";
import { industryGuideRedirects } from "./lib/industry-redirects";

const modernPolyfill = path.join(process.cwd(), "lib/modern-browser-polyfill.js");

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfkit"],
  turbopack: {
    resolveAlias: {
      "next/dist/build/polyfills/polyfill-module": "./lib/modern-browser-polyfill.js",
      "next/dist/build/polyfills/polyfill-module.js": "./lib/modern-browser-polyfill.js",
    },
    rules: {
      "*": {
        condition: { path: /next\/dist\/build\/polyfills\/polyfill-module\.js$/ },
        loaders: [path.join(process.cwd(), "lib/modern-browser-polyfill-loader.cjs")],
        as: "*.js",
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["next/dist/build/polyfills/polyfill-module"] = modernPolyfill;
      config.resolve.alias["next/dist/build/polyfills/polyfill-module.js"] = modernPolyfill;
    }
    return config;
  },
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
        source: "/examples",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/example",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/industry",
        destination: "/industries",
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
        source: "/what-happens-after-you-buy",
        destination: "/fix-pack/next-steps",
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
      {
        source: "/free-audit",
        destination: "/free-snapshot",
        permanent: true,
      },
      {
        source: "/get-snapshot",
        destination: "/free-snapshot",
        permanent: true,
      },
      {
        source: "/start-here",
        destination: "/free-snapshot",
        permanent: true,
      },
      {
        source: "/offer",
        destination: "/free-snapshot",
        permanent: true,
      },
      {
        source: "/ai-answer-snapshot-sample",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/book",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/audit",
        destination: "/geo-audit",
        permanent: true,
      },
      {
        source: "/audit-39",
        destination: "/geo-audit",
        permanent: true,
      },
      {
        source: "/ai-visibility-audit",
        destination: "/geo-audit",
        permanent: true,
      },
      {
        source: "/results",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/guides",
        permanent: true,
      },
      {
        source: "/glossary",
        destination: "/guides",
        permanent: true,
      },
      {
        source: "/chatgpt-visibility",
        destination: "/how-to-get-cited-by-chatgpt",
        permanent: true,
      },
      {
        source: "/perplexity",
        destination: "/how-to-get-cited-by-perplexity",
        permanent: true,
      },
      {
        source: "/ai-search",
        destination: "/answer-engine-optimization",
        permanent: true,
      },
      {
        source: "/local-seo",
        destination: "/industries",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/press",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/changelog",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/status",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/partners",
        destination: "/for-agencies",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/fix-pack",
        permanent: true,
      },
      {
        source: "/fixpack",
        destination: "/fix-pack",
        permanent: true,
      },
      {
        source: "/fix",
        destination: "/fix-pack",
        permanent: true,
      },
      {
        source: "/pricing/fix-pack",
        destination: "/fix-pack",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/free-snapshot",
        permanent: true,
      },
      {
        source: "/sign-up",
        destination: "/free-snapshot",
        permanent: true,
      },
      {
        source: "/plans",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/sample",
        destination: "/sample-snapshot",
        permanent: true,
      },
      {
        source: "/signal-check",
        destination: "/free-check",
        permanent: true,
      },
      {
        source: "/file-check",
        destination: "/free-check",
        permanent: true,
      },
      {
        source: "/template-pack",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/agency-kit",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/white-label",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/geo",
        destination: "/geo-for-local-businesses",
        permanent: true,
      },
      {
        source: "/what-is-geo",
        destination: "/blog/what-is-geo",
        permanent: true,
      },
      ...industryGuideRedirects(),
    ];
  },
};

export default nextConfig;
