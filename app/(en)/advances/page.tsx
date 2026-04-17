import type { Metadata } from "next";
import { HomePageContent } from "@/app/components/HomePageContent";
import { JsonLd } from "@/app/components/JsonLd";
import { NavBar } from "@/app/components/NavBar";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Advances in cancer research",
  description:
    "Curated 2025 cancer-research breakthroughs closest to Dr. Memari's work — mRNA vaccines, KRAS-G12D inhibitors, CAR-T in solid tumors, AI liquid biopsy, and CRISPR-edited TILs.",
  alternates: { canonical: "/advances" },
};

export default function AdvancesPage() {
  const t = getDictionary("en");
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <JsonLd locale="en" />
      <NavBar t={t.nav} />
      <HomePageContent t={t} locale="en" sections={["news", "footer"]} />
    </div>
  );
}
