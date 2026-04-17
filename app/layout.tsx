import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Dr. Fereidoon Memari — Surgical Oncologist & Cancer Researcher",
    template: "%s | Dr. Fereidoon Memari",
  },
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: SITE.fullName,
    description:
      "Associate Professor of Surgery at Tehran University of Medical Sciences and surgical oncologist at the Cancer Institute, Imam Khomeini Hospital Complex. 33+ years of surgical practice across breast, GI, and thyroid cancers, plus translational cancer research.",
    url: SITE_URL,
    siteName: SITE.name,
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/fereidoon-memari.jpg",
        width: 682,
        height: 1024,
        alt: SITE.fullName,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Dr. Fereidoon Memari — Associate Professor of Surgery, TUMS",
    description:
      "Surgical oncologist with 33+ years of practice. Cancer surgery, oncoplastic reconstruction, and translational cancer research at Tehran University of Medical Sciences.",
    images: ["/fereidoon-memari.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: SITE.fullName }],
  keywords: [
    "Fereidoon Memari",
    "Fereydoon Memari",
    "Dr. Memari",
    "Associate Professor",
    "Tehran University of Medical Sciences",
    "TUMS",
    "Cancer Institute of Iran",
    "Imam Khomeini Hospital Complex",
    "surgical oncology",
    "general surgery",
    "cancer surgery",
    "breast cancer surgery",
    "gastric cancer surgery",
    "colon cancer surgery",
    "thyroid cancer surgery",
    "oncoplastic surgery",
    "reconstructive surgery",
    "laparoscopic surgery",
    "minimally invasive surgery",
    "vascular surgery",
    "cancer research",
    "siRNA",
    "microRNA",
    "piRNA",
    "ncRNA",
    "immunotherapy",
    "head and neck cancer",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-w-0 overflow-x-hidden antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
