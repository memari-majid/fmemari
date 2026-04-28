import type { Metadata } from "next";
import { HomePageContent } from "@/app/components/HomePageContent";
import { JsonLd } from "@/app/components/JsonLd";
import { NavBar } from "@/app/components/NavBar";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "پژوهش‌ها و مقالات",
  description:
    "چهار محور پژوهشی — زیست‌شناسی سرطان و RNAهای غیرکدکننده، جراحی سرطان، ایمنی‌درمانی و سلامت دیجیتال — همراه با فهرست مقالات داوری‌شده‌ی منتخب.",
  alternates: { canonical: "/fa/research" },
};

export default function ResearchPageFa() {
  const t = getDictionary("fa");
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <JsonLd locale="fa" />
      <NavBar t={t.nav} />
      <HomePageContent
        t={t}
        locale="fa"
        sections={["research", "publications", "footer"]}
      />
    </div>
  );
}
