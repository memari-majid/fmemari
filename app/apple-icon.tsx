import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="120"
          height="120"
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
      </div>
    ),
    { ...size },
  );
}
