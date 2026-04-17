export type ResearchTopic =
  | "surgical-oncology"
  | "ncrna"
  | "cancer-biology"
  | "immunotherapy"
  | "digital-health"
  | "neuropathic-pain"
  | "anesthesia";

export type Publication = {
  year: number;
  /** Citations as reported by Google Scholar; null = not yet indexed / new. */
  citations: number | null;
  title: string;
  /** Short list of authors or "et al." style summary. */
  authors?: string;
  venue: string;
  topic: ResearchTopic[];
  /** External URL — DOI, PubMed, journal page, or Google Scholar entry. */
  url?: string;
  /** Mark featured publications to surface in the hero / metrics. */
  featured?: boolean;
};

export const TOPIC_LABEL: Record<ResearchTopic, string> = {
  "surgical-oncology": "Surgical oncology",
  ncrna: "Non-coding RNAs",
  "cancer-biology": "Cancer biology",
  immunotherapy: "Immunotherapy",
  "digital-health": "Digital health",
  "neuropathic-pain": "Pain & spinal cord injury",
  anesthesia: "Anesthesia & airway",
};

/**
 * Peer-reviewed publications by Dr. Fereidoon Memari.
 *
 * Citation counts and ordering reflect the Google Scholar profile. Update this
 * list to add new entries; the publications section automatically picks up
 * changes (sort by year or citations, filter by topic).
 */
export const PUBLICATIONS: Publication[] = [
  {
    year: 2019,
    citations: 291,
    title: "siRNAs in cancer therapy: a nano-based approach",
    venue: "International Journal of Nanomedicine",
    topic: ["ncrna", "cancer-biology"],
    featured: true,
  },
  {
    year: 2019,
    citations: 78,
    title:
      "Biological function and molecular mechanism of piRNA in cancer",
    venue: "Practical Laboratory Medicine",
    topic: ["ncrna", "cancer-biology"],
    featured: true,
  },
  {
    year: 2020,
    citations: 36,
    title:
      "In silico analysis and design of a chimeric protein for colorectal cancer",
    venue: "Drug Design, Development and Therapy",
    topic: ["cancer-biology", "surgical-oncology"],
  },
  {
    year: 2018,
    citations: 36,
    title:
      "Immunotherapy, a new hope for cancer treatment (review)",
    venue: "Pakistan Journal of Biological Sciences",
    topic: ["immunotherapy"],
  },
  {
    year: 2019,
    citations: 24,
    title:
      "ANRIL and ANRASSF1 lncRNAs upregulated in gastric cancer",
    venue: "Journal of Cellular Biochemistry",
    topic: ["ncrna", "cancer-biology", "surgical-oncology"],
  },
  {
    year: 2022,
    citations: 19,
    title:
      "ceRNA networks in clear-cell renal cell carcinoma",
    venue: "Computers in Biology and Medicine",
    topic: ["ncrna", "cancer-biology"],
  },
  {
    year: 2017,
    citations: 18,
    title:
      "MicroRNA: a new gate in cancer and human disease (review)",
    venue: "Review article",
    topic: ["ncrna", "cancer-biology"],
  },
  {
    year: 2023,
    citations: 15,
    title:
      "Remote monitoring of colorectal cancer survivors via smartphone and IoT",
    venue: "JMIR Cancer",
    topic: ["digital-health", "surgical-oncology"],
    featured: true,
  },
  {
    year: 2015,
    citations: 14,
    title:
      "Magnesium sulfate post-injury for neuropathic pain after spinal cord injury",
    venue: "Behavioural Pharmacology",
    topic: ["neuropathic-pain"],
  },
  {
    year: 2021,
    citations: 11,
    title:
      "miRNAs targeting stemness and metastasis in gastric cancer",
    venue: "Journal of Gastroenterology and Hepatology",
    topic: ["ncrna", "surgical-oncology"],
  },
  {
    year: 2011,
    citations: 11,
    title: "Tongue cancer in Iranian patients",
    venue: "Acta Medica Iranica",
    topic: ["surgical-oncology"],
  },
  {
    year: 2021,
    citations: 9,
    title:
      "hsa_circ_001787 as a diagnostic biomarker for colorectal cancer",
    venue: "Saudi Journal of Biological Sciences",
    topic: ["ncrna", "surgical-oncology"],
  },
  {
    year: 2020,
    citations: 7,
    title:
      "ARSD and lncRNA ARSD-AS1 in breast cancer",
    venue: "Journal of B.U.ON.",
    topic: ["ncrna", "surgical-oncology"],
  },
  {
    year: 2025,
    citations: 6,
    title:
      "Anticoagulation regimen in microvascular head and neck reconstruction",
    venue: "Journal of Oral and Maxillofacial Surgery",
    topic: ["surgical-oncology"],
  },
  {
    year: 2021,
    citations: 6,
    title:
      "Lower GI cancer management during COVID-19 in Iran",
    venue: "Acta Medica Iranica",
    topic: ["surgical-oncology"],
  },
  {
    year: 2018,
    citations: 1,
    title:
      "Gelsolin gene expression in Iranian breast cancer patients",
    venue: "Basic & Clinical Cancer Research",
    topic: ["cancer-biology", "surgical-oncology"],
  },
  {
    year: 2025,
    citations: null,
    title:
      "Video laryngoscopy vs direct laryngoscopy in pediatric patients",
    venue: "Anesthesia journal (in press)",
    topic: ["anesthesia"],
  },
  {
    year: 2025,
    citations: null,
    title:
      "Tumor lysis syndrome in electrochemotherapy",
    venue: "European Journal of Cancer Care",
    topic: ["surgical-oncology", "cancer-biology"],
  },
  {
    year: 2021,
    citations: null,
    title:
      "miR-17, miR-24, miR-124 and miR-145 in metastatic gastric cancer",
    venue: "bioRxiv (preprint)",
    topic: ["ncrna", "cancer-biology"],
  },
  {
    year: 2021,
    citations: null,
    title: "Time management for surgical residents",
    venue: "Tehran University Medical Journal",
    topic: ["surgical-oncology"],
  },
];

export function publicationsSortedByCitations() {
  return [...PUBLICATIONS].sort(
    (a, b) => (b.citations ?? -1) - (a.citations ?? -1),
  );
}

export function publicationsSortedByYear() {
  return [...PUBLICATIONS].sort(
    (a, b) => b.year - a.year || (b.citations ?? 0) - (a.citations ?? 0),
  );
}
