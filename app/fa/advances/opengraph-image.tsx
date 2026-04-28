import { OG_CONTENT_TYPE, OG_SIZE, ogImageResponse } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImageResponse({
    eyebrow: "fmemari.com",
    title: "Advances in cancer research",
    subtitle: "Persian edition · live PubMed feed · fmemari.com/fa/advances",
    dir: "ltr",
  });
}
