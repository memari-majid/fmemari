export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fmemari.com";

export const SITE = {
  name: "Dr. Fereidoon Memari",
  shortName: "Fereidoon Memari",
  fullName: "Dr. Fereidoon Memari",
  role: "Surgical Oncologist & Cancer Researcher",
  description:
    "Academic site of Dr. Fereidoon Memari — surgical oncologist and cancer researcher at the Cancer Research Center, Cancer Institute of Iran, Tehran University of Medical Sciences. Research interests include cancer biology, non-coding RNAs (siRNA, microRNA, piRNA, lncRNA), surgical oncology of gastrointestinal, head and neck, breast and renal cancers, immunotherapy, and digital health for cancer survivors.",
  email: "memarife@tums.ac.ir",
  emailDisplay: "memarife@tums.ac.ir",
  affiliation: "Cancer Research Center, Cancer Institute of Iran",
  affiliationParent: "Tehran University of Medical Sciences",
  addressLocality: "Tehran",
  addressCountry: "IR",
  scholar:
    "https://scholar.google.com/citations?user=BBKnRjgAAAAJ",
  scholarLabel: "Google Scholar",
  // Open items — fill in once confirmed
  orcid: "" as string,
  scopus: "" as string,
  researchgate: "" as string,
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
