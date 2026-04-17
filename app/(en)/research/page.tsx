import type { Metadata } from "next";
import { HomePageContent } from "@/app/components/HomePageContent";
import { JsonLd } from "@/app/components/JsonLd";
import { NavBar } from "@/app/components/NavBar";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Research & publications",
  description:
    "Four research themes — cancer biology and non-coding RNAs, surgical oncology, immunotherapy, and digital health for survivors — alongside the selected peer-reviewed publications list.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  const t = getDictionary("en");
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <JsonLd locale="en" />
      <NavBar t={t.nav} />
      <HomePageContent
        t={t}
        locale="en"
        sections={["research", "publications", "footer"]}
      />
    </div>
  );
}
