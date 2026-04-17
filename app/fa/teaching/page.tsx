import type { Metadata } from "next";
import { HomePageContent } from "@/app/components/HomePageContent";
import { JsonLd } from "@/app/components/JsonLd";
import { NavBar } from "@/app/components/NavBar";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "آموزش و همکاری",
  description:
    "نقش دکتر معماری به‌عنوان عضو هیئت علمی دانشگاه علوم پزشکی تهران، راهنمایی دانشجویان تحصیلات تکمیلی و فلوهای بالینی، و فعالیت در برنامه‌های سلامت عمومی.",
  alternates: { canonical: "/fa/teaching" },
};

export default function TeachingPageFa() {
  const t = getDictionary("fa");
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <JsonLd locale="fa" />
      <NavBar t={t.nav} />
      <HomePageContent t={t} locale="fa" sections={["teaching", "footer"]} />
    </div>
  );
}
