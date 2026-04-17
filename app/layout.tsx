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
      "Surgical oncologist and cancer researcher at Tehran University of Medical Sciences. Cancer biology, ncRNAs, immunotherapy, and digital health for cancer survivors.",
    url: SITE_URL,
    siteName: SITE.name,
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Dr. Fereidoon Memari — Surgical Oncologist & Cancer Researcher",
    description:
      "Cancer biology, surgical oncology, immunotherapy, digital health for cancer survivors. Tehran University of Medical Sciences.",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: SITE.fullName }],
  keywords: [
    "Fereidoon Memari",
    "surgical oncology",
    "cancer research",
    "Tehran University of Medical Sciences",
    "Cancer Institute of Iran",
    "siRNA",
    "microRNA",
    "piRNA",
    "ncRNA",
    "immunotherapy",
    "colorectal cancer",
    "gastric cancer",
    "breast cancer",
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
