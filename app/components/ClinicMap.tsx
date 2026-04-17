import { CLINIC } from "@/lib/site";
import type { Dictionary, Locale } from "@/lib/i18n";

/**
 * Embedded Google Maps view of the clinic address. Uses the `q=` text
 * query so no API key is required; Google resolves the address server-side
 * and renders an interactive map with the usual zoom / directions controls.
 *
 * A direct link to the Neshan record (the Iranian map service used earlier
 * in the clinic card) sits beneath the iframe so visitors who prefer
 * Neshan for turn-by-turn navigation have a first-class path to it.
 */
export function ClinicMap({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary["clinicMap"];
}) {
  // Text query varies by locale so the pin lands in the right place whichever
  // language Google geocodes from.
  const query =
    locale === "fa"
      ? "ساختمان پزشکان توانیر، خیابان توانیر، تهران"
      : "Tavanir Physicians Building, Tavanir St, Tehran, Iran";

  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    query,
  )}&hl=${locale}&output=embed`;

  return (
    <section className="border-t border-zinc-200/80 bg-white px-4 py-12 sm:py-16 lg:py-20 dark:border-zinc-800/40 dark:bg-zinc-950 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {t.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
          {t.subtitle}
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800">
          <iframe
            src={src}
            title={t.iframeTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[320px] w-full sm:h-[420px] lg:h-[480px]"
            allowFullScreen
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <a
            href={CLINIC.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            {t.openNeshan} →
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              query,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            {t.openGoogle} →
          </a>
        </div>
      </div>
    </section>
  );
}
