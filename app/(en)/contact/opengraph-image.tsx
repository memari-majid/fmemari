import { OG_CONTENT_TYPE, OG_SIZE, ogImageResponse } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImageResponse({
    eyebrow: "fmemari.com",
    title: "Contact & clinic",
    subtitle: "Academic inquiries · Tavanir clinic, Tehran",
    dir: "ltr",
  });
}
