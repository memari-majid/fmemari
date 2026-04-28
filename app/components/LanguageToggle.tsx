"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Tiny EN ↔ FA language toggle.
 *
 * On every page the button points at the same page in the other locale:
 *   /                     ↔ /fa
 *   /breast-cancer        ↔ /fa/breast-cancer
 *   /research#publications ↔ /fa/research#publications
 *
 * Uses `usePathname()` so a reader who has navigated to an internal page
 * lands on the matching internal page in the other language, not back on
 * the home page.
 */
export function LanguageToggle({
  label,
  ariaLabel,
  className = "",
}: {
  label: string;
  ariaLabel: string;
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const isFa = pathname === "/fa" || pathname.startsWith("/fa/");

  // Compute the equivalent path in the other locale.
  let target: string;
  if (isFa) {
    // /fa → / ; /fa/breast-cancer → /breast-cancer
    target = pathname === "/fa" ? "/" : pathname.replace(/^\/fa/, "");
  } else {
    // / → /fa ; /breast-cancer → /fa/breast-cancer
    target = pathname === "/" ? "/fa" : `/fa${pathname}`;
  }

  return (
    <Link
      href={target}
      hrefLang={isFa ? "en" : "fa"}
      aria-label={ariaLabel}
      className={`inline-flex h-11 min-h-[44px] items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 text-xs font-semibold text-zinc-700 transition hover:border-pink-500 hover:text-pink-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-pink-500 dark:hover:text-pink-400 ${className}`}
    >
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
      {label}
    </Link>
  );
}
