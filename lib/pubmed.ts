/**
 * Minimal PubMed (NCBI E-utilities) client for the "live cancer news" strip.
 *
 * Two-step protocol:
 *   1. `esearch.fcgi` → list of PMIDs matching our query, sorted by date.
 *   2. `esummary.fcgi` → metadata (title, authors, journal, pubdate) for each PMID.
 *
 * We don't need an API key since we fetch at most a few IDs a few times
 * an hour (Next.js `revalidate` caches each call). If we ever hit the
 * 3 req/s unauthenticated rate limit, set `PUBMED_API_KEY` and attach it
 * via the `api_key` query parameter.
 *
 * Reference: https://www.ncbi.nlm.nih.gov/books/NBK25501/
 */

const EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

export type PubmedPaper = {
  pmid: string;
  title: string;
  journal: string;
  authors: string;
  pubdate: string;
  url: string;
};

type EsearchResponse = {
  esearchresult?: { idlist?: string[] };
};

type EsummaryAuthor = { name: string };
type EsummaryResult = {
  uid?: string;
  title?: string;
  fulljournalname?: string;
  source?: string;
  pubdate?: string;
  authors?: EsummaryAuthor[];
};
type EsummaryResponse = {
  result?: Record<string, EsummaryResult | string[]>;
};

/**
 * Fetch the latest `count` PubMed papers matching a cancer-research query.
 * Returns an empty array on any upstream error — callers should render a
 * graceful fallback rather than a broken section.
 */
export async function fetchLatestOncologyPapers(
  count = 6,
): Promise<PubmedPaper[]> {
  const term = [
    "(cancer[tiab] OR oncology[tiab] OR tumor[tiab])",
    "(breakthrough[tiab] OR clinical trial[tiab] OR immunotherapy[tiab] OR CAR-T[tiab] OR mRNA vaccine[tiab] OR liquid biopsy[tiab])",
    "2025:2026[dp]",
  ].join(" AND ");

  // Cache upstream responses at the Next.js edge for 2 hours so a spike in
  // traffic doesn't walk into PubMed's rate limit.
  const fetchOpts = { next: { revalidate: 7200 } } as const;

  try {
    const searchUrl = `${EUTILS}/esearch.fcgi?db=pubmed&sort=date&retmode=json&retmax=${count}&term=${encodeURIComponent(
      term,
    )}`;
    const searchRes = await fetch(searchUrl, fetchOpts);
    if (!searchRes.ok) return [];
    const searchJson = (await searchRes.json()) as EsearchResponse;
    const ids = searchJson.esearchresult?.idlist ?? [];
    if (ids.length === 0) return [];

    const summaryUrl = `${EUTILS}/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(
      ",",
    )}`;
    const summaryRes = await fetch(summaryUrl, fetchOpts);
    if (!summaryRes.ok) return [];
    const summaryJson = (await summaryRes.json()) as EsummaryResponse;

    const papers: PubmedPaper[] = [];
    for (const id of ids) {
      const entry = summaryJson.result?.[id];
      if (!entry || Array.isArray(entry)) continue;
      const authorNames = (entry.authors ?? [])
        .map((a) => a.name)
        .filter(Boolean);
      const firstAuthor = authorNames[0] ?? "";
      const authors =
        authorNames.length > 1 ? `${firstAuthor} et al.` : firstAuthor;
      papers.push({
        pmid: id,
        title: (entry.title ?? "").replace(/\.$/, ""),
        journal: entry.fulljournalname ?? entry.source ?? "",
        authors,
        pubdate: entry.pubdate ?? "",
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
      });
    }
    return papers;
  } catch {
    return [];
  }
}
