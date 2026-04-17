import type { Metadata } from "next";
import { HomePageContent } from "@/app/components/HomePageContent";
import { JsonLd } from "@/app/components/JsonLd";
import { NavBar } from "@/app/components/NavBar";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "سرطان پستان و جراحی سرطان پستان",
  description:
    "آمار جهانی سرطان پستان، گزینه‌های جراحی (لامپکتومی، ماستکتومی، بازسازی انکوپلاستی، بیوپسی گره‌ی سنتینل)، علائم هشدار، و رویکرد چند-تخصصی دکتر معماری.",
  alternates: { canonical: "/fa/breast-cancer" },
};

export default function BreastCancerPageFa() {
  const t = getDictionary("fa");
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <JsonLd locale="fa" />
      <NavBar t={t.nav} />
      <HomePageContent t={t} locale="fa" sections={["breastCancer", "footer"]} />
    </div>
  );
}
