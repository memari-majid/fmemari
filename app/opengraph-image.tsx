import { OG_CONTENT_TYPE, OG_SIZE, ogImageResponse } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Dr. Fereidoon Memari — Breast Cancer Surgeon";

export default function OpenGraphImage() {
  return ogImageResponse({
    eyebrow: "fmemari.com",
    title: "Dr. Fereidoon Memari",
    subtitle: "Associate Professor of Surgery, TUMS · Practicing surgery since 1993",
    dir: "ltr",
  });
}
