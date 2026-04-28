import { fetchLatestOncologyPapers } from "@/lib/pubmed";
import { SITE, SITE_URL } from "@/lib/site";

/**
 * RSS 2.0 feed of the live PubMed cancer-news strip.
 *
 * Why: search engines and aggregators index RSS feeds independently of
 * the HTML page. Feed exposure → broader discovery → backlinks → SEO.
 * Re-uses `fetchLatestOncologyPapers` so the cache (2h revalidate) is
 * shared with the on-page LiveNewsFeed instead of doubling PubMed load.
 * The `pubmed-oncology` cache tag is revalidated on a schedule by
 * `/api/cron/revalidate-feed` (see `vercel.json`).
 */
export const revalidate = 7200;

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const papers = await fetchLatestOncologyPapers(20);
  const now = new Date().toUTCString();

  const items = papers
    .map((p) => {
      const pub = p.pubdate ? new Date(p.pubdate) : null;
      const pubDate =
        pub && !Number.isNaN(pub.getTime()) ? pub.toUTCString() : now;
      const description = [p.authors, p.journal].filter(Boolean).join(" — ");
      return `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${escape(p.url)}</link>
      <guid isPermaLink="true">${escape(p.url)}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>Breast cancer</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE.fullName)} — Breast cancer research feed</title>
    <link>${SITE_URL}/advances</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Latest breast-cancer research papers, curated from PubMed and refreshed every two hours.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <ttl>120</ttl>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=7200, stale-while-revalidate=86400",
    },
  });
}
