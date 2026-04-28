import { fetchLatestOncologyPapers, type PubmedPaper } from "@/lib/pubmed";
import type { Dictionary, Locale } from "@/lib/i18n";

/**
 * Server component that fetches the latest cancer-related papers from
 * PubMed and renders them as a live news strip. Results are cached by
 * Next.js (see `lib/pubmed.ts`), so every visitor shares the same
 * ~2-hour-old snapshot instead of hammering NCBI.
 *
 * Each paper is emitted twice: once as visible HTML, once as a
 * MedicalScholarlyArticle JSON-LD entry inside an enclosing ItemList
 * so Google understands this is a curated medical-research feed and
 * can surface individual entries as rich results.
 *
 * Intentionally tolerant: if PubMed is unreachable, `fetchLatestOncologyPapers`
 * returns an empty array and we render a small fallback with a direct link
 * to the PubMed search, keeping the page useful.
 */
export async function LiveNewsFeed({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary["liveFeed"];
}) {
  const papers = await fetchLatestOncologyPapers(12);

  // Public PubMed search the user can open to see fresh results live.
  // Mirrors the server-side query in lib/pubmed.ts so the feed and the
  // out-of-site link stay coherent.
  const searchUrl =
    'https://pubmed.ncbi.nlm.nih.gov/?term=("breast+cancer"%5Btiab%5D+OR+"breast+neoplasms"%5Bmh%5D)+AND+(clinical+trial%5Bpt%5D+OR+HER2%5Btiab%5D+OR+trastuzumab%5Btiab%5D+OR+pembrolizumab%5Btiab%5D+OR+oncoplastic%5Btiab%5D+OR+mammography%5Btiab%5D+OR+BRCA%5Btiab%5D)&sort=date';

  const itemListLd = papers.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.heading,
    description: t.subtitle,
    numberOfItems: papers.length,
    itemListElement: papers.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: p.url,
      item: {
        "@type": "MedicalScholarlyArticle",
        headline: p.title,
        url: p.url,
        identifier: `PMID:${p.pmid}`,
        ...(p.pubdate ? { datePublished: p.pubdate } : {}),
        ...(p.authors
          ? { author: { "@type": "Person", name: p.authors } }
          : {}),
        ...(p.journal
          ? { isPartOf: { "@type": "Periodical", name: p.journal } }
          : {}),
        about: "Breast cancer",
        inLanguage: "en",
        publisher: { "@type": "Organization", name: "PubMed (NCBI)" },
      },
    })),
  } : null;

  return (
    <section className="relative scroll-mt-20 overflow-hidden border-t border-zinc-200/80 bg-white px-4 py-16 sm:py-24 lg:py-32 dark:border-zinc-800/40 dark:bg-zinc-950 sm:px-6">
      {itemListLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
        />
      )}
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-2">
          <span
            aria-hidden
            className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(244,63,94,0.18)] motion-safe:animate-pulse"
          />
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {t.eyebrow}
          </p>
        </div>
        <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
          {t.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
          {t.subtitle}
        </p>

        {papers.length === 0 ? (
          <div className="mx-auto mt-10 max-w-xl rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
            <p>{t.empty}</p>
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-green-700 underline decoration-green-700/30 hover:decoration-green-700 dark:text-green-400"
            >
              {t.openSearch}
            </a>
          </div>
        ) : (
          <>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {papers.map((p: PubmedPaper) => (
                <li
                  key={p.pmid}
                  className="card relative flex flex-col overflow-hidden p-5"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-green-400 to-fuchsia-400 opacity-70"
                  />
                  <p
                    className="text-[11px] font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-300"
                    dir="ltr"
                  >
                    {p.journal || "PubMed"}
                  </p>
                  <h3
                    className="mt-2 text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-100"
                    dir="ltr"
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mt-2 text-xs text-zinc-600 dark:text-zinc-400"
                    dir="ltr"
                  >
                    {p.authors}
                    {p.pubdate ? ` · ${p.pubdate}` : ""}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-max items-center gap-1 text-xs font-medium text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                    dir="ltr"
                  >
                    {t.openPaper} <span aria-hidden>→</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-center gap-2 text-center">
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
              >
                {t.openSearch} →
              </a>
              <p
                className="text-[11px] text-zinc-500 dark:text-zinc-500"
                dir={locale === "fa" ? "rtl" : "ltr"}
              >
                {t.sourceLabel}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
