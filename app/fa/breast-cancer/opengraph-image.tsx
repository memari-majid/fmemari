import { OG_CONTENT_TYPE, OG_SIZE, ogImageResponse } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** OG renderer does not shape Arabic reliably; English art matches page topic for social previews. */
export default function Image() {
  return ogImageResponse({
    eyebrow: "fmemari.com",
    title: "Breast cancer & surgery",
    subtitle: "Dr. Memari — Persian edition · fmemari.com/fa",
    dir: "ltr",
  });
}
