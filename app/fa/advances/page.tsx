import type { Metadata } from "next";
import { HomePageContent } from "@/app/components/HomePageContent";
import { JsonLd } from "@/app/components/JsonLd";
import { NavBar } from "@/app/components/NavBar";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "پیشرفت‌های پژوهش سرطان",
  description:
    "گزیده‌ای از دستاوردهای ۲۰۲۵ پژوهش سرطان نزدیک به خط کاری دکتر معماری — واکسن‌های mRNA، مهارکننده‌های KRAS-G12D، CAR-T در تومورهای جامد، بیوپسی مایع با هوش مصنوعی و TIL ویرایش‌شده با CRISPR.",
  alternates: { canonical: "/fa/advances" },
};

export default function AdvancesPageFa() {
  const t = getDictionary("fa");
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <JsonLd locale="fa" />
      <NavBar t={t.nav} />
      <HomePageContent t={t} locale="fa" sections={["news", "footer"]} />
    </div>
  );
}
