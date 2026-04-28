import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Called by Vercel Cron (`vercel.json`) to invalidate the PubMed-backed data
 * cache (`pubmed-oncology` tag) and the `/feed.xml` route so the live news
 * strip and RSS stay fresh before the 2h fetch TTL elapses.
 *
 * Set `CRON_SECRET` in Vercel → Project → Settings → Environment Variables;
 * Vercel sends `Authorization: Bearer <CRON_SECRET>` on cron invocations.
 *
 * @see https://vercel.com/docs/cron-jobs
 */
export async function GET(request: Request) {
  if (process.env.VERCEL === "1") {
    const auth = request.headers.get("authorization");
    if (
      !process.env.CRON_SECRET ||
      auth !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  revalidateTag("pubmed-oncology");
  revalidatePath("/feed.xml");

  return NextResponse.json({
    revalidated: true,
    tag: "pubmed-oncology",
    at: new Date().toISOString(),
  });
}
