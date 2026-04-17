import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: SITE_URL,
          fa: `${SITE_URL}/fa`,
          "x-default": SITE_URL,
        },
      },
    },
    {
      url: `${SITE_URL}/fa`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: SITE_URL,
          fa: `${SITE_URL}/fa`,
          "x-default": SITE_URL,
        },
      },
    },
  ];
}
