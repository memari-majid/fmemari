import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { SITE, SITE_URL } from "@/lib/site";

// Vazirmatn — the de-facto Persian web font. Includes both Arabic-script and
// Latin glyphs so English fragments (paper titles, journal names, the email
// address) render in the same family.
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "دکتر فریدون مماری — جراح انکولوژی و پژوهشگر سرطان",
    template: "%s | دکتر فریدون مماری",
  },
  description:
    "وب‌سایت رسمی دکتر فریدون مماری، دانشیار جراحی دانشگاه علوم پزشکی تهران و متخصص جراحی انکولوژی در انستیتو کانسر، مجتمع بیمارستانی امام خمینی. بیش از ۳۳ سال سابقه‌ی حرفه‌ای جراحی در حوزه‌ی سرطان‌های پستان، گوارش و تیروئید، همراه با پژوهش ترجمانی در زیست‌شناسی سرطان، RNAهای غیرکدکننده، ایمنی‌درمانی و سلامت دیجیتال برای بازماندگان سرطان.",
  alternates: {
    canonical: "/fa",
    languages: {
      en: "/",
      fa: "/fa",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "دکتر فریدون مماری",
    description:
      "دانشیار جراحی دانشگاه علوم پزشکی تهران و متخصص جراحی انکولوژی در انستیتو کانسر، مجتمع بیمارستانی امام خمینی. بیش از ۳۳ سال سابقه‌ی حرفه‌ای جراحی همراه با پژوهش ترجمانی در سرطان.",
    url: `${SITE_URL}/fa`,
    siteName: "دکتر فریدون مماری",
    type: "profile",
    locale: "fa_IR",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/fereidoon-memari.jpg",
        width: 682,
        height: 1024,
        alt: "دکتر فریدون مماری",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "دکتر فریدون مماری — دانشیار جراحی، دانشگاه علوم پزشکی تهران",
    description:
      "متخصص جراحی انکولوژی با بیش از ۳۳ سال سابقه‌ی حرفه‌ای. جراحی سرطان، بازسازی انکوپلاستیک و پژوهش ترجمانی در دانشگاه علوم پزشکی تهران.",
    images: ["/fereidoon-memari.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: SITE.fullName }, { name: "دکتر فریدون مماری" }],
  keywords: [
    "دکتر فریدون مماری",
    "دکتر مماری",
    "جراح انکولوژی",
    "جراح سرطان",
    "دانشگاه علوم پزشکی تهران",
    "انستیتو کانسر ایران",
    "بیمارستان امام خمینی",
    "جراحی پستان",
    "جراحی معده",
    "جراحی روده بزرگ",
    "جراحی تیروئید",
    "انکوپلاستی",
    "لاپاراسکوپی",
    "Fereidoon Memari",
    "Fereydoon Memari",
    "TUMS",
    "Cancer Institute of Iran",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function FaRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <body
        className={`${vazirmatn.className} min-w-0 overflow-x-hidden antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
