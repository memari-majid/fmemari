import type { Metadata } from "next";
import { HomePageContent } from "@/app/components/HomePageContent";
import { JsonLd } from "@/app/components/JsonLd";
import { NavBar } from "@/app/components/NavBar";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact & clinic",
  description:
    "Contact form, email, academic affiliation, and Dr. Memari's private-clinic address, phone, and consultation hours in Tehran.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const t = getDictionary("en");
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <JsonLd locale="en" />
      <NavBar t={t.nav} />
      <HomePageContent t={t} locale="en" sections={["contact", "footer"]} />
    </div>
  );
}
