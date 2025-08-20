import type { MetadataRoute } from "next";
import { BASE_PATH } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/actions/", "/_next/", "/static/", "/*.json$"],
        crawlDelay: 1,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/actions/", "/_next/", "/static/", "/*.json$"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/actions/", "/_next/", "/static/", "/*.json$"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/actions/", "/_next/", "/static/", "/*.json$"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/actions/", "/_next/", "/static/", "/*.json$"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/actions/", "/_next/", "/static/", "/*.json$"],
      },
    ],
    sitemap: `${BASE_PATH}/sitemap.xml`,
    host: BASE_PATH,
  };
}
