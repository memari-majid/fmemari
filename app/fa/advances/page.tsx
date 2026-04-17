import type { Metadata } from "next";
import { HomePageContent } from "@/app/components/HomePageContent";
import { JsonLd } from "@/app/components/JsonLd";
import { LiveNewsFeed } from "@/app/components/LiveNewsFeed";
import { NavBar } from "@/app/components/NavBar";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "دستاوردهای تازه‌ی پژوهش سرطان",
  description:
    "گزیده‌ای از پیشرفت‌های سال ۲۰۲۵ نزدیک به خط کاری دکتر معماری؛ از واکسن‌های mRNA و مهارکننده‌های KRAS-G12D تا CAR-T در تومورهای جامد، بیوپسی مایع با هوش مصنوعی و TIL ویرایش‌شده با CRISPR. همراه با فید زنده‌ی تازه‌ترین مقالات PubMed.",
  alternates: { canonical: "/fa/advances" },
};

export default function AdvancesPageFa() {
  const t = getDictionary("fa");
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <JsonLd locale="fa" />
      <NavBar t={t.nav} />
      <HomePageContent t={t} locale="fa" sections={["news"]} />
      <LiveNewsFeed locale="fa" t={t.liveFeed} />
      <HomePageContent t={t} locale="fa" sections={["footer"]} />
    </div>
  );
}
