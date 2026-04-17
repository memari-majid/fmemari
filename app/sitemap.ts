import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Mirrored EN / FA routes. Each page exists at both `/path` (English) and
 * `/fa/path` (Persian), with the bare `/` / `/fa` pair acting as the home.
 */
const PAGES: readonly { en: string; fa: string; priority: number }[] = [
  { en: "", fa: "/fa", priority: 1 },
  { en: "/breast-cancer", fa: "/fa/breast-cancer", priority: 0.9 },
  { en: "/research", fa: "/fa/research", priority: 0.9 },
  { en: "/advances", fa: "/fa/advances", priority: 0.8 },
  { en: "/teaching", fa: "/fa/teaching", priority: 0.7 },
  { en: "/contact", fa: "/fa/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const page of PAGES) {
    const enUrl = `${SITE_URL}${page.en}`;
    const faUrl = `${SITE_URL}${page.fa}`;
    const alternates = {
      languages: {
        en: enUrl,
        fa: faUrl,
        "x-default": enUrl,
      },
    };
    entries.push({
      url: enUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: page.priority,
      alternates,
    });
    entries.push({
      url: faUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: Math.max(0.5, page.priority - 0.1),
      alternates,
    });
  }
  return entries;
}
