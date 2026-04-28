"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { LanguageToggle } from "@/app/components/LanguageToggle";
import type { Dictionary } from "@/lib/i18n";

export function NavBar({ t }: { t: Dictionary["nav"] }) {
  const pathname = usePathname() ?? "/";
  const isFa = pathname === "/fa" || pathname.startsWith("/fa/");
  const homeHref = isFa ? "/fa" : "/";
  const contactHref = isFa ? "/fa/contact" : "/contact";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200/80 bg-white/90 shadow-lg shadow-zinc-900/5 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/90 dark:shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex min-w-0 max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:py-4">
        <Link
          href={homeHref}
          className="group flex min-h-[44px] min-w-0 shrink-0 items-center gap-2.5"
        >
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 text-sm font-bold text-white shadow-sm"
          >
            FM
          </span>
          <span className="min-w-0 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t.monogramLine1}
            <span className="text-pink-600 dark:text-pink-400">
              {" "}
              {t.monogramLine2}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-3 lg:flex lg:gap-3 xl:gap-6">
          {t.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
          <LanguageToggle label={t.toggleLabel} ariaLabel={t.toggleAria} />
          <ThemeToggle />
          <Link
            href={contactHref}
            className="whitespace-nowrap rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-pink-500"
          >
            {t.cta}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle label={t.toggleLabel} ariaLabel={t.toggleAria} />
          <ThemeToggle />
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="max-h-[min(70vh,calc(100dvh-env(safe-area-inset-top)-5rem))] space-y-3 overflow-y-auto border-t border-zinc-200/80 bg-white/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/95 lg:hidden">
          {t.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg bg-pink-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-pink-500"
          >
            {t.cta}
          </Link>
        </div>
      )}
    </nav>
  );
}
