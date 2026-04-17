export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fmemari.com";

export const SITE = {
  name: "Dr. Fereidoon Memari",
  shortName: "Fereidoon Memari",
  fullName: "Dr. Fereidoon Memari",
  /** Alternate transliteration of his given name (Persian: فریدون) used by some directories. */
  nameAlternate: "Dr. Fereydoon Memari",
  honorific: "Dr.",
  role: "Associate Professor · Surgical Oncologist · Cancer Researcher",
  academicRank: "Associate Professor",
  description:
    "Academic site of Dr. Fereidoon Memari — Associate Professor of Surgery at Tehran University of Medical Sciences and surgical oncologist at the Cancer Institute, Imam Khomeini Hospital Complex. Over 33 years of professional surgical experience across breast, gastrointestinal, and thyroid cancers, with translational research in cancer biology, non-coding RNAs, immunotherapy, and digital health for cancer survivors.",
  email: "memarife@tums.ac.ir",
  emailDisplay: "memarife@tums.ac.ir",
  affiliation: "Cancer Institute of Iran",
  affiliationDetail: "Imam Khomeini Hospital Complex",
  affiliationParent: "Tehran University of Medical Sciences",
  addressLocality: "Tehran",
  addressCountry: "IR",
  /** Iranian Medical Council license number. */
  licenseNumber: "26743",
  experienceYears: 33,
  specialties: ["Surgical Oncology", "General Surgery"] as const,
  scholar:
    "https://scholar.google.com/citations?user=BBKnRjgAAAAJ",
  scholarLabel: "Google Scholar",
  // Open items — fill in once confirmed
  orcid: "" as string,
  scopus: "" as string,
  researchgate: "" as string,
  paziresh24: "" as string,
  nobatIr: "" as string,
} as const;

export const SCHOLAR_METRICS = {
  citationsTotal: 582,
  citationsSince2021: 481,
  hIndex: 11,
  hIndexSince2021: 9,
  i10Index: 11,
  i10IndexSince2021: 9,
  source: "Google Scholar",
} as const;
