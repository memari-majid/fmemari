import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

export type OgCardProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Small line above the main title (e.g. localized tagline). */
  kicker?: string;
  /** Pass `"rtl"` for Persian route cards. */
  dir?: "ltr" | "rtl";
};

/**
 * Shared dynamic OpenGraph / Twitter card art (1200×630) for social previews.
 * Used by `opengraph-image.tsx` files in each route segment.
 */
export function ogImageResponse({
  eyebrow,
  title,
  subtitle,
  kicker,
  dir = "ltr",
}: OgCardProps) {
  const line = kicker ?? "Breast Cancer Surgeon · Tehran";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #16a34a 0%, #047857 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          direction: dir,
          textAlign: dir === "rtl" ? "right" : "left",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexDirection: dir === "rtl" ? "row-reverse" : "row",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="80"
            height="80"
            fill="none"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 3.75c0 4.5 3 6 3 6s3-1.5 3-6c0-1.243-1.343-2.25-3-2.25S9 2.507 9 3.75Z" />
            <path d="M12 9.75 7.5 21" />
            <path d="M12 9.75 16.5 21" />
            <path d="M12 9.75v6" />
          </svg>
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              opacity: 0.95,
            }}
          >
            {eyebrow}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            Breast Cancer Surgeon · Tehran
          </span>
          <span
            style={{
              fontSize: title.length > 42 ? 64 : 78,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 400,
              opacity: 0.92,
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
