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
    "Academic site of Dr. Fereidoon Memari — Associate Professor of Surgery at Tehran University of Medical Sciences and breast cancer surgeon at the Cancer Institute, Imam Khomeini Hospital Complex. Practicing surgery since 1992, with a focus on breast oncoplastic surgery alongside gastrointestinal and thyroid cancer cases, plus translational research in cancer biology, non-coding RNAs, immunotherapy, and digital health for cancer survivors.",
  /** Persian description used in JSON-LD when locale is fa, so Google reads
   *  the /fa pages as authoritative Persian content rather than translations. */
  descriptionFa:
    "وب‌سایت رسمی دکتر فریدون معماری — دانشیار جراحی دانشگاه علوم پزشکی تهران و فوق‌تخصص جراحی سرطان پستان در انستیتو کانسر، مجتمع بیمارستانی امام خمینی. با سابقه‌ی فعالیت جراحی از سال ۱۳۷۱، با تمرکز ویژه بر جراحی انکوپلاستی پستان در کنار جراحی سرطان‌های دستگاه گوارش و تیروئید، و پژوهش ترجمانی در زیست‌شناسی سرطان، RNAهای غیرکدکننده، ایمنی‌درمانی و سلامت دیجیتال برای بازماندگان سرطان.",
  /** Persian job title — used as `jobTitle` on the /fa Person schema. */
  jobTitleFa: "دانشیار جراحی، فوق‌تخصص جراحی سرطان پستان",
  email: "memarife@tums.ac.ir",
  emailDisplay: "memarife@tums.ac.ir",
  affiliation: "Cancer Institute of Iran",
  affiliationDetail: "Imam Khomeini Hospital Complex",
  affiliationParent: "Tehran University of Medical Sciences",
  /** Official Cancer Institute page on the TUMS English site. */
  affiliationUrl: "https://en.tums.ac.ir/en/page/56/cancer-institute",
  /** TUMS English homepage. */
  affiliationParentUrl: "https://en.tums.ac.ir/en",
  addressLocality: "Tehran",
  addressCountry: "IR",
  /** Iranian Medical Council license number. */
  licenseNumber: "26743",
  /** Year Dr. Memari began clinical practice. Used to render "since 1992" / "از سال ۱۳۷۱" without needing yearly updates. */
  practiceSince: 1992,
  /** Same year on the Iranian (Hijri Shamsi) calendar — 1992 Gregorian ≈ 1371. */
  practiceSinceFa: 1371,
  specialties: ["Surgical Oncology", "General Surgery"] as const,
  scholar:
    "https://scholar.google.com/citations?user=IirhdFIAAAAJ&hl=en",
  scholarLabel: "Google Scholar",
  // Open items — fill in once confirmed
  orcid: "" as string,
  scopus: "" as string,
  researchgate: "" as string,
  paziresh24: "" as string,
  nobatIr: "" as string,
} as const;

/**
 * Private clinic (مطب) details. This is the outpatient consultation office
 * where Dr. Memari sees non-hospital-admitted patients, separate from his
 * appointments at the Cancer Institute and Laleh / Sasan hospitals.
 *
 * Sources: published directory listings (nobat.ir, doctor-yab, paziresh24)
 * and the Balad/Neshan map record for the practice.
 */
export const CLINIC = {
  /** Full international phone, suitable for tel: links. */
  phone: "+982188879169",
  /** English display phone. */
  phoneDisplay: "+98 21 8887 9169",
  /** Farsi display phone (Iranian digits applied at render time). */
  phoneDisplayFa: "021-88879169",
  /** English street address for structured data / LTR UIs. */
  addressEn:
    "No. 30, Tavanir Physicians Building, 4th Floor, Unit 19, Tavanir St. (near Hemmat Expressway), Tehran, Iran",
  /** Farsi address. Western digits on purpose — the render helper converts. */
  addressFa:
    "تهران، خیابان توانیر، نرسیده به بزرگراه همت، پلاک 30، ساختمان پزشکان توانیر، طبقه 4، واحد 19",
  /** Short postal/locality line for the hero / footer. */
  locality: "Tavanir, Tehran",
  localityFa: "توانیر، تهران",
  /** Opening hours in OpenGraph-friendly form (ISO-8601-ish day tokens). */
  hoursEn: "Even-numbered days of the Iranian week, 4:00 PM – 6:00 PM",
  hoursFa: "روزهای زوج، ساعت 16 تا 18",
  /** Public map link. Neshan record for the clinic. */
  mapsUrl:
    "https://neshan.org/maps/places/bdc2e6cff263efebde2cf2ba612ee663",
  mapsLabel: "Neshan",
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
