"use client";

import { usePathname } from "next/navigation";
import { CLINIC } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/**
 * Floating "Call Us" launcher. Replaces the earlier chatbot button —
 * this one is a plain `tel:` link so it always works and feels native
 * on mobile (tap → dialer opens). On desktop browsers the click still
 * triggers whatever handler is registered for tel: URLs.
 *
 * Anchors itself on the left edge for RTL pages so it doesn't collide
 * with the scroll-to-top button stack that sits on the right in LTR.
 */
export function CallUsButton({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? "/";
  const isFa = locale === "fa" || pathname.startsWith("/fa");
  const anchorClass = isFa ? "left-4 sm:left-6" : "right-4 sm:right-6";

  return (
    <a
      href={`tel:${CLINIC.phone}`}
      aria-label={label}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] ${anchorClass} z-40 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-pink-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/30 transition hover:bg-pink-500`}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
      <span>{label}</span>
    </a>
  );
}
