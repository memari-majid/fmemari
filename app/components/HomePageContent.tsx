import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedCounter } from "@/app/components/AnimatedCounter";
import { ContactForm } from "@/app/components/ContactForm";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { Publications } from "@/app/components/Publications";
import { Reveal } from "@/app/components/Reveal";
import { ScrollToTop } from "@/app/components/ScrollToTop";
import { SCHOLAR_METRICS, SITE } from "@/lib/site";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const HERO_METRICS = [
  {
    value: SCHOLAR_METRICS.citationsTotal,
    label: "Citations",
    sub: `${SCHOLAR_METRICS.citationsSince2021} since 2021`,
  },
  {
    value: SCHOLAR_METRICS.hIndex,
    label: "h-index",
    sub: `${SCHOLAR_METRICS.hIndexSince2021} since 2021`,
  },
  {
    value: SCHOLAR_METRICS.i10Index,
    label: "i10-index",
    sub: `${SCHOLAR_METRICS.i10IndexSince2021} since 2021`,
  },
];

const CLINICAL_SERVICES: {
  title: string;
  body: string;
  icon: string;
  bullets: string[];
}[] = [
  {
    title: "Cancer surgery",
    body: "Specialized focus on cancers of the breast, gastrointestinal tract, and thyroid — from staging to definitive resection and combined procedures in complex cases.",
    icon: "scalpel",
    bullets: [
      "Breast cancer",
      "Stomach cancer",
      "Colon cancer",
      "Thyroid cancer",
    ],
  },
  {
    title: "Oncoplastic & reconstructive surgery",
    body: "Combining cancer resection with aesthetic and reconstructive technique — particularly for breast oncoplasty and abdominal procedures — so that oncologic outcomes and quality of life advance together.",
    icon: "ribbon",
    bullets: ["Breast oncoplasty", "Abdominal aesthetic surgery"],
  },
  {
    title: "Advanced surgical techniques",
    body: "Minimally invasive (laparoscopic) approaches and vascular procedures applied to both general surgery and complex oncologic cases.",
    icon: "laparoscope",
    bullets: ["Laparoscopic / minimally invasive", "Vascular procedures"],
  },
];

const RESEARCH_INTERESTS: { title: string; body: string; icon: string }[] = [
  {
    title: "Cancer biology & non-coding RNAs",
    body: "siRNA, microRNA, piRNA, lncRNA, and ceRNA networks in colorectal, gastric, breast, and renal cancers — both as therapeutic levers and as candidate diagnostic biomarkers.",
    icon: "dna",
  },
  {
    title: "Surgical oncology",
    body: "Clinical and translational work across gastrointestinal, head and neck, breast, and renal cancers, including microvascular reconstruction and management during disrupted care (e.g. COVID-19).",
    icon: "scalpel",
  },
  {
    title: "Cancer immunotherapy",
    body: "Reviews and translational studies on the evolving immunotherapy landscape — including chimeric protein design and tumor lysis syndrome in electrochemotherapy.",
    icon: "shield",
  },
  {
    title: "Digital health for cancer survivors",
    body: "Smartphone- and IoT-enabled remote monitoring for colorectal cancer survivors, bringing patient-reported outcomes and continuous data into clinical follow-up.",
    icon: "device",
  },
];

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "Teaching", href: "#teaching" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function ResearchIcon({ kind }: { kind: string }) {
  const map: Record<string, ReactNode> = {
    dna: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 3v3M4.5 9c0 4.5 15 6 15 12M4.5 12c0 4.5 15 4.5 15 9M4.5 6c0 4.5 15 4.5 15 9M19.5 3v3M19.5 18v3M4.5 18v3"
        />
      </svg>
    ),
    scalpel: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 0 1-1.591.659H9.061a2.25 2.25 0 0 1-1.591-.659L5 14.5m14 0V17a2.25 2.25 0 0 1-2.25 2.25H7.25A2.25 2.25 0 0 1 5 17v-2.5"
        />
      </svg>
    ),
    shield: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0 0 12 2.714Z"
        />
      </svg>
    ),
    device: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
    ),
    ribbon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3.75c0 4.5 3 6 3 6s3-1.5 3-6c0-1.243-1.343-2.25-3-2.25S9 2.507 9 3.75Zm3 6L7.5 21M12 9.75 16.5 21M12 9.75v6"
        />
      </svg>
    ),
    laparoscope: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12h6m6 0h6M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm0 0V6a3 3 0 1 1 6 0v6m-6 0v6a3 3 0 0 0 6 0v-6"
        />
      </svg>
    ),
  };
  return (
    <span className="text-emerald-600 dark:text-emerald-400">
      {map[kind] ?? map.dna}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HomePageContent() {
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
        </div>

        <div className="relative z-10 mx-auto min-w-0 max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {SITE.role}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl sm:leading-[1.05]">
              {SITE.fullName}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
              <span className="gradient-text font-medium">
                {SITE.affiliation}
              </span>
              <span className="block text-sm text-zinc-500 dark:text-zinc-500 sm:text-base">
                {SITE.affiliationParent} · Tehran, Iran
              </span>
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Associate Professor of Surgery with{" "}
              <strong className="text-zinc-800 dark:text-zinc-200">
                {SITE.experienceYears}+ years
              </strong>{" "}
              of professional surgical experience. Translational research at the
              intersection of cancer biology, non-coding RNAs, surgical oncology,
              immunotherapy, and digital health for cancer survivors.
            </p>
            <p className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-500">
              <span>
                Medical license № {SITE.licenseNumber}
              </span>
              <span aria-hidden>·</span>
              <span>{SITE.specialties.join(" · ")}</span>
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="#publications"
                className="rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                Browse publications
              </a>
              <a
                href="#contact"
                className="rounded-full border border-zinc-300 bg-white/60 px-7 py-3.5 text-sm font-medium text-zinc-800 backdrop-blur transition hover:border-zinc-400 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:border-zinc-500"
              >
                Get in touch
              </a>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-x-4 gap-y-8 border-t border-zinc-200/80 pt-12 dark:border-zinc-800/60 sm:mt-20 sm:grid-cols-3 sm:gap-6 sm:pt-16">
              {HERO_METRICS.map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                    <AnimatedCounter end={m.value} />
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    {m.label}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-500">
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11px] text-zinc-500 dark:text-zinc-500">
              Source: {SCHOLAR_METRICS.source}.{" "}
              {SITE.scholar ? (
                <a
                  href={SITE.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
                >
                  View profile
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
              About
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              About Dr. Memari
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 md:grid-cols-3 md:items-start">
            <Reveal delay={80} className="md:col-span-1">
              <div className="relative mx-auto h-40 w-40 md:mx-0">
                <Image
                  src="/fereidoon-memari.jpg"
                  alt="Dr. Fereidoon Memari — surgical oncologist and cancer researcher"
                  fill
                  className="rounded-full object-cover object-top shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700"
                  sizes="160px"
                  priority
                />
                <div
                  className="pointer-events-none absolute -inset-2 animate-[pulse-glow_6s_ease-in-out_infinite] rounded-full border border-emerald-300/30 dark:border-emerald-600/30"
                  aria-hidden
                />
              </div>
            </Reveal>

            <Reveal delay={140} className="md:col-span-2">
              <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                <p>
                  Dr. Fereidoon Memari is an{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    Associate Professor of Surgery
                  </strong>{" "}
                  at{" "}
                  <a
                    href="https://en.tums.ac.ir/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
                  >
                    {SITE.affiliationParent}
                  </a>{" "}
                  and a surgical oncologist at the{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    {SITE.affiliation}, {SITE.affiliationDetail}
                  </strong>
                  . With more than{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    {SITE.experienceYears} years of professional surgical
                    experience
                  </strong>
                  , his clinical practice spans complex cancer cases and
                  combined procedures across gastrointestinal, head and neck,
                  breast, and renal cancers.
                </p>
                <p>
                  His translational research focuses on the role of non-coding
                  RNAs — siRNA, microRNA, piRNA, lncRNA, and ceRNA networks —
                  as therapeutic levers and candidate biomarkers in cancer.
                  Recent work also explores cancer immunotherapy, chimeric
                  protein design, and the use of smartphone- and IoT-enabled
                  systems for the remote monitoring of cancer survivors.
                </p>
                <p>
                  His publications span peer-reviewed venues including the{" "}
                  <em>International Journal of Nanomedicine</em>,{" "}
                  <em>Journal of Cellular Biochemistry</em>,{" "}
                  <em>Computers in Biology and Medicine</em>,{" "}
                  <em>JMIR Cancer</em>, and the{" "}
                  <em>Journal of Oral and Maxillofacial Surgery</em>.
                </p>
                <dl className="grid grid-cols-2 gap-3 pt-2 text-xs sm:grid-cols-3">
                  <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-3 py-2 dark:border-zinc-800/60 dark:bg-zinc-900/40">
                    <dt className="font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                      Academic rank
                    </dt>
                    <dd className="mt-0.5 font-semibold text-zinc-900 dark:text-zinc-100">
                      {SITE.academicRank}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-3 py-2 dark:border-zinc-800/60 dark:bg-zinc-900/40">
                    <dt className="font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                      Experience
                    </dt>
                    <dd className="mt-0.5 font-semibold text-zinc-900 dark:text-zinc-100">
                      {SITE.experienceYears}+ years
                    </dd>
                  </div>
                  <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-3 py-2 dark:border-zinc-800/60 dark:bg-zinc-900/40">
                    <dt className="font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                      Medical license
                    </dt>
                    <dd className="mt-0.5 font-mono font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
                      № {SITE.licenseNumber}
                    </dd>
                  </div>
                </dl>
                {profileLinks.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {profileLinks.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-emerald-500"
                      >
                        {l.label}
                        <svg
                          className="h-3 w-3"
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
                    ))}
                  </div>
                ) : null}
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
              Clinical practice
            </p>
            <h2 className="mt-4 text-center text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              Clinical expertise &amp; services
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
              Three areas of focus across cancer surgery, oncoplastic
              reconstruction, and minimally invasive technique — practiced at
              the Cancer Institute, Imam Khomeini Hospital Complex.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CLINICAL_SERVICES.map((card, i) => (
              <Reveal key={card.title} delay={i * 60}>
                <div className="card flex h-full flex-col p-6">
                  <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    <ResearchIcon kind={card.icon} />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-500">
                    {card.body}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {card.bullets.map((b) => (
                      <li
                        key={b}
                        className="rounded-full border border-emerald-200/80 bg-emerald-50/60 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 px-5 py-6 dark:border-emerald-900/40 dark:bg-emerald-950/20 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Patient experience
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                Patients on{" "}
                <a
                  href={SITE.paziresh24 || "https://paziresh24.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
                >
                  Paziresh24
                </a>{" "}
                and{" "}
                <a
                  href={SITE.nobatIr || "https://www.nobat.ir/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
                >
                  Nobat.ir
                </a>{" "}
                describe Dr. Memari as a highly skilled and conscientious
                surgeon, highlighting his clear communication throughout the
                treatment process and his successful outcomes — particularly in
                breast and gastric cancer cases.
              </p>
              <p className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-500">
                Summarized from third-party patient platforms; this site does
                not host or moderate individual reviews.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== RESEARCH ============== */}
      <section
        id="research"
        className="scroll-mt-20 border-t border-zinc-200/80 bg-white px-4 py-32 dark:border-zinc-800/40 dark:bg-zinc-950 sm:px-6"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Research interests
            </p>
            <h2 className="mt-4 text-center text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              Where my work lives
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
              Four interlocking research themes — basic biology of cancer,
              surgical practice, immunotherapy, and digital follow-up.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {RESEARCH_INTERESTS.map((card, i) => (
              <Reveal key={card.title} delay={i * 60}>
                <div className="card flex h-full flex-col p-6">
                  <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    <ResearchIcon kind={card.icon} />
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

      {/* ============== PUBLICATIONS ============== */}
      <section
        id="publications"
        className="scroll-mt-20 border-t border-zinc-200/80 px-4 py-32 dark:border-zinc-800/40 sm:px-6"
      >
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Publications
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              Selected peer-reviewed work
            </h2>
            <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
              Sortable and filterable by topic. For requests of a full text or
              reprint, please use the{" "}
              <a
                href="#contact"
                className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
              >
                contact form
              </a>
              .
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Publications />
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
                  Full list on Google Scholar
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

      {/* ============== TEACHING / CLINICAL (placeholder) ============== */}
      <section
        id="teaching"
        className="scroll-mt-20 border-t border-zinc-200/80 bg-zinc-50 px-4 py-32 dark:border-zinc-800/40 dark:bg-zinc-900/30 sm:px-6"
      >
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Teaching &amp; clinical work
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              Mentorship &amp; clinical practice
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="card mt-10 p-8">
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                As an{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">
                  Associate Professor at {SITE.affiliationParent}
                </strong>
                , Dr. Memari teaches and mentors graduate students, surgical
                residents, and fellows. Clinical practice and trainee
                supervision take place at the{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">
                  {SITE.affiliation}, {SITE.affiliationDetail}
                </strong>
                .
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                Beyond clinical and academic work, Dr. Memari participates in
                public-health awareness initiatives — for example, Sasan
                Hospital&apos;s programs for{" "}
                <em>Men&apos;s National Health Week</em> in Iran.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                A detailed list of current courses, clinical appointments, and
                grants is being prepared. In the meantime, prospective
                collaborators, trainees, and visiting researchers are welcome
                to{" "}
                <Link
                  href="#contact"
                  className="text-emerald-700 underline decoration-emerald-700/30 hover:decoration-emerald-700 dark:text-emerald-400"
                >
                  reach out
                </Link>
                .
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
              Contact
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              Get in touch
            </h2>
            <p className="mt-4 max-w-lg text-zinc-600 dark:text-zinc-400">
              For research collaborations, publication questions, student or
              fellowship inquiries, and invited talks. Please do not use this
              form for individual medical advice.
            </p>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="mt-20 grid gap-4 sm:grid-cols-2">
            <Reveal delay={80}>
              <a
                href={`mailto:${SITE.email}`}
                className="card group flex flex-col gap-1 p-6"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Email
                </p>
                <p className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                  {SITE.emailDisplay}
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                  Replied to as Dr. Memari&apos;s schedule allows.
                </p>
              </a>
            </Reveal>
            <Reveal delay={120}>
              <div className="card flex flex-col gap-1 p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Affiliation
                </p>
                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {SITE.affiliation}
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                  {SITE.affiliationParent}
                  <br />
                  Tehran, Iran
                </p>
              </div>
            </Reveal>
          </div>

          <div id="faq" className="mt-24 scroll-mt-24">
            <Reveal>
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Frequently asked questions
              </h3>
            </Reveal>
            <Reveal delay={40}>
              <div className="mt-8">
                <FaqAccordion />
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
                  {SITE.fullName}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-500">
                Surgical oncologist and cancer researcher · Tehran University
                of Medical Sciences.
              </p>
            </div>

            <nav
              aria-label="Footer"
              className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              {FOOTER_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#faq"
                className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                FAQ
              </a>
            </nav>

            {profileLinks.length > 0 ? (
              <div className="w-full max-w-xs lg:w-auto">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                  Profiles
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

          <div className="mt-14 flex flex-col items-center gap-4 border-t border-zinc-200/80 pt-8 text-center dark:border-zinc-800/40 sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs text-zinc-600 dark:text-zinc-500">
              © {year} {SITE.fullName} · Tehran, Iran
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-500">
              This site is for academic and informational purposes only and
              does not provide medical advice.
            </p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </>
  );
}
