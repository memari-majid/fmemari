import type { Metadata } from "next";
import { HomePageContent } from "@/app/components/HomePageContent";
import { JsonLd } from "@/app/components/JsonLd";
import { NavBar } from "@/app/components/NavBar";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Teaching & mentorship",
  description:
    "Dr. Memari's teaching role at Tehran University of Medical Sciences, mentorship of graduate students and clinical fellows, and public-health awareness activities.",
  alternates: { canonical: "/teaching" },
};

export default function TeachingPage() {
  const t = getDictionary("en");
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <JsonLd locale="en" />
      <NavBar t={t.nav} />
      <HomePageContent t={t} locale="en" sections={["teaching", "footer"]} />
    </div>
  );
}
