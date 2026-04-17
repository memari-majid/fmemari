import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedCounter } from "@/app/components/AnimatedCounter";
import { ContactForm } from "@/app/components/ContactForm";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import {
  AwarenessRibbon,
  CellClusterBackground,
  DnaHelixBackground,
  MolecularBonds,
} from "@/app/components/MedicalDecorations";
import { Publications } from "@/app/components/Publications";
import { Reveal } from "@/app/components/Reveal";
import { ScrollToTop } from "@/app/components/ScrollToTop";
import { CLINIC, SCHOLAR_METRICS, SITE } from "@/lib/site";
import {
  formatNumber,
  localizeDigits,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";

/**
 * Cancer-awareness ribbon Tailwind text colors per international convention.
 * Order matches the Cancer Surgery card bullets (en + fa share the same
 * order): breast → stomach → colon → thyroid.
 *
 * Each color comes with a slightly brighter dark-mode variant so the ribbon
 * stays legible on the dark emerald-tinted pill background.
 */
const CANCER_RIBBON_COLORS: readonly string[] = [
  "text-pink-500 dark:text-pink-300", // breast cancer
  "text-sky-500 dark:text-sky-300", // stomach cancer
  "text-blue-700 dark:text-blue-400", // colorectal cancer
  "text-teal-500 dark:text-teal-300", // thyroid cancer
];

/* ------------------------------------------------------------------ */
/*  Tiny inline-markdown renderer                                      */
/*  Supports **bold** and *italic* — just enough for the dictionary    */
/*  prose without pulling in a real markdown library.                  */
/* ------------------------------------------------------------------ */

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let cursor = 0;
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > cursor) parts.push(text.slice(cursor, m.index));
    if (m[1] !== undefined) {
      parts.push(
        <strong key={key++} className="text-zinc-900 dark:text-zinc-100">
          {m[1]}
        </strong>,
      );
    } else if (m[2] !== undefined) {
      parts.push(<em key={key++}>{m[2]}</em>);
    }
    cursor = re.lastIndex;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

/**
 * Render the affiliation-line bio text, replacing the {{tums}} and
 * {{cancerInstitute}} tokens with proper external links and the {{years}}
 * token with the locale-formatted experience.
 */
function renderAffiliationLine(
  template: string,
  links: { tums: ReactNode; cancerInstitute: ReactNode; years: ReactNode },
): ReactNode[] {
  const out: ReactNode[] = [];
  const tokenRe = /\{\{(tums|cancerInstitute|years)\}\}/g;
  let cursor = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(template)) !== null) {
    if (m.index > cursor) {
      const slice = template.slice(cursor, m.index);
      out.push(<span key={key++}>{renderInline(slice)}</span>);
    }
    out.push(
      <span key={key++}>{links[m[1] as "tums" | "cancerInstitute" | "years"]}</span>,
    );
    cursor = tokenRe.lastIndex;
  }
  if (cursor < template.length) {
    out.push(<span key={key++}>{renderInline(template.slice(cursor))}</span>);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function ResearchIcon({ kind }: { kind: string }) {
  const map: Record<string, ReactNode> = {
    dna: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3v3M4.5 9c0 4.5 15 6 15 12M4.5 12c0 4.5 15 4.5 15 9M4.5 6c0 4.5 15 4.5 15 9M19.5 3v3M19.5 18v3M4.5 18v3" />
      </svg>
    ),
    scalpel: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 0 1-1.591.659H9.061a2.25 2.25 0 0 1-1.591-.659L5 14.5m14 0V17a2.25 2.25 0 0 1-2.25 2.25H7.25A2.25 2.25 0 0 1 5 17v-2.5" />
      </svg>
    ),
    shield: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0 0 12 2.714Z" />
      </svg>
    ),
    device: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    ribbon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c0 4.5 3 6 3 6s3-1.5 3-6c0-1.243-1.343-2.25-3-2.25S9 2.507 9 3.75Zm3 6L7.5 21M12 9.75 16.5 21M12 9.75v6" />
      </svg>
    ),
    laparoscope: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h6m6 0h6M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm0 0V6a3 3 0 1 1 6 0v6m-6 0v6a3 3 0 0 0 6 0v-6" />
      </svg>
    ),
  };
  return (
    <span className="text-emerald-600 dark:text-emerald-400">
      {map[kind] ?? map.dna}
    </span>
  );
}

const RESEARCH_ICONS = ["dna", "scalpel", "shield", "device"] as const;
const SERVICE_ICONS = ["scalpel", "ribbon", "laparoscope"] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HomePageContent({
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
}) {
  const year = new Date().getFullYear();
  const profileLinks = [
    SITE.scholar
      ? {
          href: SITE.scholar,
          label: SITE.scholarLabel ?? "Google Scholar",
        }
      : null,
    SITE.orcid ? { href: SITE.orcid, label: "ORCID" } : null,
    SITE.scopus ? { href: SITE.scopus, label: "Scopus" } : null,
    SITE.researchgate ? { href: SITE.researchgate, label: "ResearchGate" } : null,
  ].filter((l): l is { href: string; label: string } => l !== null);

  return (
    <>
      {/* ============== HERO ============== */}
      <section
        id="top"
        className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 pb-16 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:min-h-[92vh] sm:px-6 sm:pb-20 sm:pt-[calc(6rem+env(safe-area-inset-top))]"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.16),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/90 via-zinc-100/70 to-zinc-50 dark:from-zinc-950/40 dark:via-zinc-950/70 dark:to-zinc-950" />

          {/* Subtle molecular-bond accents in the corners — soft scientific
              motif that signals the cancer-research focus without competing
              with the headline copy. */}
          <MolecularBonds className="absolute start-6 top-24 hidden h-20 w-20 text-emerald-600/30 dark:text-emerald-400/25 sm:block sm:h-28 sm:w-28" />
          <MolecularBonds className="absolute end-6 bottom-32 hidden h-24 w-24 -rotate-12 text-teal-600/25 dark:text-teal-400/20 sm:block sm:h-32 sm:w-32" />
        </div>

        <div className="relative z-10 mx-auto min-w-0 max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            {/* Awareness-ribbon cluster — signals the cancer-research focus
                through the four cancer-specialties Dr. Memari operates on:
                breast, stomach, colorectal, and thyroid. The ribbons are
                decorative, but the SVG `<title>` provides accessible labels. */}
            <div
              aria-hidden={false}
              aria-label={
                locale === "fa"
                  ? "نمادهای آگاهی از سرطان"
                  : "Cancer-awareness ribbons"
              }
              className="mb-4 flex items-center justify-center gap-1.5"
            >
              {CANCER_RIBBON_COLORS.map((color, i) => (
                <span key={i} className={color}>
                  <AwarenessRibbon
                    className="h-4 w-3 drop-shadow-sm"
                    title={t.services.awarenessLabels[i]}
                  />
                </span>
              ))}
            </div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {t.hero.role}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl sm:leading-[1.05]">
              {t.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
              <a
                href={SITE.affiliationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text font-medium hover:underline"
              >
                {t.hero.affiliation}
              </a>
              <span className="block text-sm text-zinc-500 dark:text-zinc-500 sm:text-base">
                <a
                  href={SITE.affiliationParentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
                >
                  {t.hero.affiliationParent}
                </a>{" "}
                · {t.hero.locationSuffix}
              </span>
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {renderInline(t.hero.description(SITE.experienceYears))}
            </p>
            <p className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-500">
              <span>{t.hero.licenseLine(SITE.licenseNumber, t.hero.specialtiesText)}</span>
              <span aria-hidden>·</span>
              <span>{t.hero.specialtiesText}</span>
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="#publications"
                className="rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                {t.hero.ctas.browsePublications}
              </a>
              <a
                href="#contact"
                className="rounded-full border border-zinc-300 bg-white/60 px-7 py-3.5 text-sm font-medium text-zinc-800 backdrop-blur transition hover:border-zinc-400 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:border-zinc-500"
              >
                {t.hero.ctas.getInTouch}
              </a>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-x-4 gap-y-8 border-t border-zinc-200/80 pt-12 dark:border-zinc-800/60 sm:mt-20 sm:grid-cols-3 sm:gap-6 sm:pt-16">
              <HeroMetric
                value={SCHOLAR_METRICS.citationsTotal}
                label={t.hero.metrics.citations}
                sub={t.hero.metrics.sinceLabel(SCHOLAR_METRICS.citationsSince2021)}
                locale={locale}
              />
              <HeroMetric
                value={SCHOLAR_METRICS.hIndex}
                label={t.hero.metrics.hIndex}
                sub={t.hero.metrics.sinceLabel(SCHOLAR_METRICS.hIndexSince2021)}
                locale={locale}
              />
              <HeroMetric
                value={SCHOLAR_METRICS.i10Index}
                label={t.hero.metrics.i10Index}
                sub={t.hero.metrics.sinceLabel(SCHOLAR_METRICS.i10IndexSince2021)}
                locale={locale}
              />
            </div>
            <p className="mt-6 text-[11px] text-zinc-500 dark:text-zinc-500">
              {t.hero.metrics.sourcePrefix} {SCHOLAR_METRICS.source}.{" "}
              {SITE.scholar ? (
                <a
                  href={SITE.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
                >
                  {t.hero.metrics.viewProfile}
                </a>
              ) : null}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============== ABOUT ============== */}
      <section
        id="about"
        className="scroll-mt-20 border-t border-zinc-200/80 bg-white px-4 py-32 dark:border-zinc-800/40 dark:bg-zinc-950 sm:px-6"
      >
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {t.about.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              {t.about.heading}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 md:grid-cols-5 md:items-start">
            <Reveal delay={80} className="md:col-span-2">
              <div className="relative mx-auto w-fit md:mx-0">
                <DnaHelixBackground className="pointer-events-none absolute -inset-6 -z-10 h-[calc(100%+3rem)] w-[calc(100%+3rem)] text-emerald-500/15 dark:text-emerald-400/10" />

                <div
                  className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-transparent blur-2xl"
                  aria-hidden
                />

                <div className="relative h-80 w-64 overflow-hidden rounded-2xl shadow-xl shadow-emerald-900/10 ring-1 ring-zinc-200 dark:shadow-emerald-950/40 dark:ring-zinc-700 sm:h-96 sm:w-72">
                  <Image
                    src="/fereidoon-memari.jpg"
                    alt={`${t.hero.title} — ${t.hero.role}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 256px, 288px"
                    priority
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950/40 to-transparent"
                    aria-hidden
                  />
                </div>

                {/* Floating credential badge — uses logical positioning so it
                    sits at the reading-end side of the photo in both LTR/RTL */}
                <div className="absolute -bottom-3 -end-3 flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-lg dark:border-emerald-900/50 dark:bg-zinc-900 dark:text-emerald-400">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M12 3v18" />
                    <path d="M9 5c0 2 1.5 3 3 3s3-1 3-3" />
                    <path d="M9 10c0 2 1.5 3 3 3s3-1 3-3" />
                    <path d="M9 15c0 2 1.5 3 3 3s3-1 3-3" />
                  </svg>
                  <span>{t.about.badge(SITE.experienceYears)}</span>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <a
                  href={SITE.affiliationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white p-3 transition hover:border-emerald-400 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:hover:border-emerald-600"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m4.5-6H16.5m-1.5 3H16.5m-1.5 3H16.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                      {t.about.refClinical}
                    </span>
                    <span className="block text-sm font-semibold text-zinc-900 group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                      {t.hero.affiliation}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-zinc-500 dark:text-zinc-500">
                      {t.hero.affiliationDetail}
                    </span>
                  </span>
                </a>
                <a
                  href={SITE.affiliationParentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white p-3 transition hover:border-emerald-400 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:hover:border-emerald-600"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                      {t.about.refAcademic}
                    </span>
                    <span className="block text-sm font-semibold text-zinc-900 group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                      {t.hero.affiliationParent}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-zinc-500 dark:text-zinc-500">
                      {t.about.academicRankValue}
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={140} className="md:col-span-3">
              <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                {t.about.bio.experienceLine ? (
                  <p>{renderInline(t.about.bio.experienceLine)}</p>
                ) : null}
                <p>
                  {renderAffiliationLine(t.about.bio.affiliationLine, {
                    tums: (
                      <a
                        href={SITE.affiliationParentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
                      >
                        {t.hero.affiliationParent}
                      </a>
                    ),
                    cancerInstitute: (
                      <a
                        href={SITE.affiliationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-zinc-900 underline decoration-zinc-300 hover:decoration-emerald-600 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-emerald-400"
                      >
                        {t.hero.affiliation}, {t.hero.affiliationDetail}
                      </a>
                    ),
                    years: (
                      <strong className="text-zinc-900 dark:text-zinc-100">
                        {formatNumber(SITE.experienceYears, locale)}
                      </strong>
                    ),
                  })}
                </p>
                <p>{renderInline(t.about.bio.researchLine)}</p>
                <p>{renderInline(t.about.bio.publicationsLine)}</p>

                <dl className="grid grid-cols-2 gap-3 pt-2 text-xs sm:grid-cols-3">
                  <CredentialCard
                    label={t.about.credentialLabels.academicRank}
                    value={t.about.academicRankValue}
                  />
                  <CredentialCard
                    label={t.about.credentialLabels.experience}
                    value={t.about.credentialLabels.experienceValue(SITE.experienceYears)}
                  />
                  <CredentialCard
                    label={t.about.credentialLabels.license}
                    value={t.about.credentialLabels.licenseValue(SITE.licenseNumber)}
                    mono
                  />
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== CLINICAL EXPERTISE & SERVICES ============== */}
      <section
        id="services"
        className="scroll-mt-20 border-t border-zinc-200/80 px-4 py-32 dark:border-zinc-800/40 sm:px-6"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {t.services.eyebrow}
            </p>
            <h2 className="mt-4 text-center text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              {t.services.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
              {t.services.subtitleBefore}
              <a
                href={SITE.affiliationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
              >
                {t.hero.affiliation}, {t.hero.affiliationDetail}
              </a>
              {t.services.subtitleAfter}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.cards.map((card, i) => {
              const isCancerCard = i === 0;
              return (
                <Reveal key={card.title} delay={i * 60}>
                  <div className="card flex h-full flex-col p-6">
                    <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      <ResearchIcon kind={SERVICE_ICONS[i] ?? "scalpel"} />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-500">
                      {card.body}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {card.bullets.map((b, j) => (
                        <li
                          key={b}
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/60 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300"
                        >
                          {isCancerCard ? (
                            <span className={CANCER_RIBBON_COLORS[j] ?? ""}>
                              <AwarenessRibbon
                                className="h-3 w-2"
                                title={t.services.awarenessLabels[j]}
                              />
                            </span>
                          ) : null}
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 px-5 py-6 dark:border-emerald-900/40 dark:bg-emerald-950/20 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {t.services.feedback.eyebrow}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                {t.services.feedback.bodyPrefix}
                <a
                  href={SITE.paziresh24 || "https://paziresh24.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
                >
                  Paziresh24
                </a>{" "}
                &amp;{" "}
                <a
                  href={SITE.nobatIr || "https://www.nobat.ir/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
                >
                  Nobat.ir
                </a>
                {t.services.feedback.bodySuffix}
              </p>
              <p className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-500">
                {t.services.feedback.footnote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== RESEARCH ============== */}
      <section
        id="research"
        className="relative scroll-mt-20 overflow-hidden border-t border-zinc-200/80 bg-white px-4 py-32 dark:border-zinc-800/40 dark:bg-zinc-950 sm:px-6"
      >
        {/* Microscopic cell-cluster watermark — calls out the cancer-biology
            focus of the research themes below */}
        <CellClusterBackground className="pointer-events-none absolute inset-0 -z-0 h-full w-full text-emerald-600/10 dark:text-emerald-400/[0.06]" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {t.research.eyebrow}
            </p>
            <h2 className="mt-4 text-center text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              {t.research.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
              {t.research.subtitle}
            </p>
          </Reveal>
          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {t.research.cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 60}>
                <div className="card flex h-full flex-col p-6">
                  <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    <ResearchIcon kind={RESEARCH_ICONS[i] ?? "dna"} />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-500">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== NEWS / ADVANCES ============== */}
      <section
        id="news"
        className="relative scroll-mt-20 overflow-hidden border-t border-zinc-200/80 bg-zinc-50/70 px-4 py-32 dark:border-zinc-800/40 dark:bg-zinc-900/40 sm:px-6"
      >
        {/* Subtle helix motif — ties the news strip visually to the research
            themes (ncRNA, CAR-T, gene editing) while keeping the card area
            readable. */}
        <DnaHelixBackground className="pointer-events-none absolute -top-10 end-0 -z-0 hidden h-80 w-80 rotate-12 text-emerald-500/10 dark:text-emerald-400/[0.08] sm:block" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-center justify-center gap-2">
              <span
                aria-hidden
                className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)] motion-safe:animate-pulse"
              />
              <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                {t.news.eyebrow}
              </p>
            </div>
            <h2 className="mt-4 text-center text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              {t.news.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
              {t.news.subtitle}
            </p>
          </Reveal>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.news.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <article className="card group relative flex h-full flex-col overflow-hidden p-6">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 opacity-70"
                  />
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                      <span className="text-pink-500 dark:text-pink-300">
                        <AwarenessRibbon className="h-3 w-2" />
                      </span>
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
              {t.news.footnote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============== PUBLICATIONS ============== */}
      <section
        id="publications"
        className="scroll-mt-20 border-t border-zinc-200/80 px-4 py-32 dark:border-zinc-800/40 sm:px-6"
      >
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {t.publications.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              {t.publications.heading}
            </h2>
            <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
              {t.publications.subtitleBefore}
              <a
                href="#contact"
                className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
              >
                {t.publications.subtitleLink}
              </a>
              {t.publications.subtitleAfter}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Publications t={t.publications} locale={locale} />
          </Reveal>

          {SITE.scholar ? (
            <Reveal delay={140}>
              <div className="mt-12 text-center">
                <a
                  href={SITE.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-800 transition hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-emerald-500"
                >
                  {t.publications.fullList}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5M16.5 3h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* ============== TEACHING / CLINICAL ============== */}
      <section
        id="teaching"
        className="scroll-mt-20 border-t border-zinc-200/80 bg-zinc-50 px-4 py-32 dark:border-zinc-800/40 dark:bg-zinc-900/30 sm:px-6"
      >
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {t.teaching.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              {t.teaching.heading}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="card mt-10 p-8">
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                {t.teaching.body1Before}
                <a
                  href={SITE.affiliationParentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-zinc-900 underline decoration-zinc-300 hover:decoration-emerald-600 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-emerald-400"
                >
                  {t.hero.affiliationParent}
                </a>
                {t.teaching.body1Middle}
                <a
                  href={SITE.affiliationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-zinc-900 underline decoration-zinc-300 hover:decoration-emerald-600 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-emerald-400"
                >
                  {t.hero.affiliation}, {t.hero.affiliationDetail}
                </a>
                {t.teaching.body1After}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                {renderInline(t.teaching.body2)}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                {t.teaching.body3Before}
                <Link
                  href="#contact"
                  className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
                >
                  {t.teaching.body3Link}
                </Link>
                {t.teaching.body3After}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== CONTACT + FAQ ============== */}
      <section
        id="contact"
        className="scroll-mt-20 border-t border-zinc-200/80 bg-white px-4 py-32 dark:border-zinc-800/40 dark:bg-zinc-950 sm:px-6"
      >
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {t.contact.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              {t.contact.heading}
            </h2>
            <p className="mt-4 max-w-lg text-zinc-600 dark:text-zinc-400">
              {t.contact.subtitle}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-8">
              <ContactForm t={t.contact.form} />
            </div>
          </Reveal>

          <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={80}>
              <a
                href={`mailto:${SITE.email}`}
                className="card group flex flex-col gap-1 p-6"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {t.contact.cards.emailLabel}
                </p>
                <p
                  className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-400"
                  dir="ltr"
                >
                  {SITE.emailDisplay}
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                  {t.contact.cards.emailNote}
                </p>
              </a>
            </Reveal>
            <Reveal delay={120}>
              <a
                href={SITE.affiliationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex flex-col gap-1 p-6"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {t.contact.cards.affiliationLabel}
                </p>
                <p className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                  {t.hero.affiliation}
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                  {t.hero.affiliationDetail}
                  <br />
                  {t.hero.affiliationParent}
                  <br />
                  {t.contact.cards.locationLine}
                </p>
              </a>
            </Reveal>
            <Reveal delay={160}>
              <div className="card flex flex-col gap-2 p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {t.contact.cards.clinicLabel}
                </p>
                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {t.contact.cards.clinicName}
                </p>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {localizeDigits(
                    locale === "fa" ? CLINIC.addressFa : CLINIC.addressEn,
                    locale,
                  )}
                </p>
                <div className="mt-1 flex flex-col gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-baseline gap-2">
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                      {t.contact.cards.clinicPhoneLabel}
                    </span>
                    <a
                      href={`tel:${CLINIC.phone}`}
                      dir="ltr"
                      className="font-medium text-zinc-800 transition-colors hover:text-emerald-700 dark:text-zinc-200 dark:hover:text-emerald-400"
                    >
                      {locale === "fa"
                        ? localizeDigits(CLINIC.phoneDisplayFa, locale)
                        : CLINIC.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                      {t.contact.cards.clinicHoursLabel}
                    </span>
                    <span>
                      {localizeDigits(
                        locale === "fa" ? CLINIC.hoursFa : CLINIC.hoursEn,
                        locale,
                      )}
                    </span>
                  </div>
                </div>
                <a
                  href={CLINIC.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-max items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  {t.contact.cards.clinicMapsLabel}
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>

          <div id="faq" className="mt-24 scroll-mt-24">
            <Reveal>
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {t.faq.heading}
              </h3>
            </Reveal>
            <Reveal delay={40}>
              <div className="mt-8">
                <FaqAccordion items={t.faq.items} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="border-t border-zinc-200/80 bg-zinc-50 px-4 py-16 dark:border-zinc-800/40 dark:bg-zinc-900/30 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 text-[11px] font-bold text-white"
                >
                  FM
                </span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {t.hero.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-500">
                {t.footer.tagline}
              </p>
            </div>

            <nav
              aria-label="Footer"
              className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              {t.nav.items.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {profileLinks.length > 0 ? (
              <div className="w-full max-w-xs lg:w-auto">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                  {t.footer.profilesLabel}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {profileLinks.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-600 transition hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 border-t border-zinc-200/80 pt-8 text-center dark:border-zinc-800/40 sm:flex-row sm:justify-between sm:text-start">
            <p className="text-xs text-zinc-600 dark:text-zinc-500">
              {t.footer.copyright(year)}
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-500">
              {t.footer.disclaimer}
            </p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Small inline helpers                                               */
/* ------------------------------------------------------------------ */

function HeroMetric({
  value,
  label,
  sub,
  locale,
}: {
  value: number;
  label: string;
  sub: string;
  locale: Locale;
}) {
  return (
    <div className="text-center">
      <p className="text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        <AnimatedCounter end={value} locale={locale} />
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
        {label}
      </p>
      <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-500">{sub}</p>
    </div>
  );
}

function CredentialCard({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-3 py-2 dark:border-zinc-800/60 dark:bg-zinc-900/40">
      <dt className="font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
        {label}
      </dt>
      <dd
        className={`mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-zinc-100 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
