# Dr. Fereidoon Memari — Academic Site

Personal academic website for **Dr. Fereidoon Memari** — surgical oncologist and cancer
researcher at the Cancer Research Center, Cancer Institute of Iran, Tehran University of
Medical Sciences.

Live at [fmemari.com](https://fmemari.com)

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript 5.8
- [Vercel AI SDK](https://sdk.vercel.ai/) + OpenAI (optional contact-form inquiry classification)
- [Resend](https://resend.com) for outbound email (optional)
- Deployed on [Vercel](https://vercel.com) in `iad1`

## Sections

- **Hero** — name, affiliation, headline citation metrics (h-index, i10-index, total citations)
- **About** — biographical note and research focus
- **Research interests** — themed cards for cancer biology, surgical oncology, immunotherapy, digital health
- **Publications** — sortable, filterable list of peer-reviewed publications with citation counts and external links
- **Contact** — email, contact form (with AI inquiry classification), FAQ
- **Footer** — institutional links and Google Scholar profile

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Purpose |
| -------- | ------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (SEO, sitemap, JSON-LD). Default: `https://fmemari.com` |
| `OPENAI_API_KEY` | Optional. Powers contact-form inquiry classification + personalized auto-reply via the Vercel AI SDK. Without it, a generic acknowledgment is shown. |
| `CONTACT_CLASSIFY_MODEL` | Optional. Model for inquiry classification. Default: `gpt-4o-mini` |
| `RESEND_API_KEY` | Optional. If set, contact form sends email via [Resend](https://resend.com). |
| `RESEND_FROM_EMAIL` | Verified sender in Resend (e.g. `Dr. Fereidoon Memari <hello@fmemari.com>`). |
| `CONTACT_TO_EMAIL` | Inbox for inquiries. Default: `memarife@tums.ac.ir` |

Without `RESEND_API_KEY`, contact submissions are logged on the server only — configure Resend for production email delivery.

## Updating publications

Publication data lives in [`lib/publications.ts`](./lib/publications.ts) as a single typed array. To add or update an entry, edit that file — the homepage list automatically picks up sort and filter changes.

```ts
{
  year: 2024,
  citations: 0,
  title: "…",
  venue: "…",
  topic: ["surgical-oncology"],
  url: "https://doi.org/…", // optional
}
```

`SCHOLAR_METRICS` (h-index, total citations, etc.) lives in [`lib/site.ts`](./lib/site.ts) and is rendered in the hero.

## Languages (English + Persian)

The site is fully bilingual:

- **`/`** serves the English version (`<html lang="en" dir="ltr">`)
- **`/fa`** serves the Persian version (`<html lang="fa-IR" dir="rtl">`) with the [Vazirmatn](https://github.com/rastikerdar/vazirmatn) font (loaded via `next/font/google`) and Persian numerals throughout

The two versions share component code; only the dictionary differs. A small EN/FA toggle lives in the navbar on every page. Both pages emit `hreflang` `alternate` link tags pointing at the other language and the sitemap declares both URLs as alternates.

### Editing translations

All UI strings live in [`lib/i18n.ts`](./lib/i18n.ts) — one big typed `Dictionary` shape with two implementations (`en` and `fa`). To change a string in one language, edit the corresponding leaf in that dictionary and TypeScript will tell you if anything is missing in the other.

Some content stays in English on the Persian site by design — these are bibliographic records (paper titles, journal names) and the email address. This is standard practice on bilingual academic sites because the underlying citation records are English.

> **Translation review:** the Persian translations were produced from the English source with care for medical terminology, but should still be reviewed by a native Persian speaker familiar with surgical-oncology vocabulary before being treated as final.

## Open items (need confirmation from Dr. Memari)

The following placeholders are wired up but currently empty in `lib/site.ts`. Fill them in to enable the corresponding profile links in the footer / JSON-LD:

- ORCID iD (`SITE.orcid`)
- Scopus author ID (`SITE.scopus`)
- ResearchGate profile (`SITE.researchgate`)
- Clinical appointments, teaching courses, and grants to highlight

The profile photo lives at `public/fereidoon-memari.jpg`. To swap it, replace
the file with an updated portrait (any aspect ratio works — the About section
crops it to a circle, OG metadata declares 682×1024).

## Deploy (Vercel)

Region: `iad1`. Build command: `npm run vercel-build` → `npm run build`.

1. **Import** this Git repo into Vercel.
2. **Root Directory:** leave empty.
3. **Framework:** Next.js (auto-detected).
4. **Environment variables:** Project → **Settings** → **Environment Variables**.
5. **Domain:** Settings → Domains → attach `fmemari.com` and `www.fmemari.com`.
6. **CLI:** from this repo root, `npx vercel link` once, then `npx vercel deploy --prod`.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build locally
- `npm run lint` — ESLint

## Credits

Template adapted from [`memari-majid/nexus-website`](https://github.com/memari-majid/nexus-website).
