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

## Open items (need confirmation from Dr. Memari)

The following placeholders are wired up but currently empty in `lib/site.ts`. Fill them in to enable the corresponding profile links in the footer / JSON-LD:

- ORCID iD (`SITE.orcid`)
- Scopus author ID (`SITE.scopus`)
- ResearchGate profile (`SITE.researchgate`)
- A profile photo (drop into `public/fereidoon-memari.jpg` and uncomment the photo block in `app/components/HomePageContent.tsx`)
- Whether a Farsi-language version is needed (currently English-only)
- Clinical appointments, teaching courses, and grants to highlight

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
