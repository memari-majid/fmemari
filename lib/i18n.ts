/**
 * Bilingual dictionary for fmemari.com.
 *
 * Strategy:
 * - English is the default locale, served at /. Persian (Farsi) is served at /fa.
 * - Paper titles and journal names stay in English even on the Persian site —
 *   this is standard practice on bilingual academic sites because the underlying
 *   publications are in English-language venues and citations use the original
 *   bibliographic record.
 * - Topic labels, section headings, navigation, and prose are translated.
 *
 * Persian (`fa`): primary prose for the /fa locale is supplied directly in
 * Farsi (not English-to-Persian translation). Publication titles and journal
 * names stay in English in the publications list, which is standard for
 * bilingual academic sites.
 */

import type { ResearchTopic } from "@/lib/publications";

export type Locale = "en" | "fa";
export const locales: readonly Locale[] = ["en", "fa"] as const;
export const defaultLocale: Locale = "en";

export type Direction = "ltr" | "rtl";

export type Dictionary = {
  locale: Locale;
  direction: Direction;
  /** ISO BCP-47 language tag, e.g. "en", "fa-IR". */
  htmlLang: string;

  // ---- Navigation
  nav: {
    items: { label: string; href: string }[];
    cta: string;
    /** Label for the language toggle (always shows the OTHER language). */
    toggleLabel: string;
    /** Path the toggle navigates to. */
    togglePath: string;
    /** Aria label for the toggle button. */
    toggleAria: string;
    monogramLine1: string;
    monogramLine2: string;
  };

  // ---- Hero
  hero: {
    role: string;
    title: string;
    affiliation: string;
    affiliationDetail: string;
    affiliationParent: string;
    locationSuffix: string;
    description: (years: number) => string;
    licenseLine: (license: string, specialties: string) => string;
    specialtiesText: string;
    metrics: {
      citations: string;
      hIndex: string;
      i10Index: string;
      sinceLabel: (n: number) => string;
      sourcePrefix: string;
      viewProfile: string;
    };
    ctas: {
      browsePublications: string;
      getInTouch: string;
    };
  };

  // ---- About
  about: {
    eyebrow: string;
    heading: string;
    badge: (years: number) => string;
    refClinical: string;
    refAcademic: string;
    bio: {
      affiliationLine: string; // Will be assembled with links inline
      experienceLine: string;
      researchLine: string;
      publicationsLine: string;
    };
    credentialLabels: {
      academicRank: string;
      experience: string;
      experienceValue: (years: number) => string;
      license: string;
      licenseValue: (n: string) => string;
    };
    academicRankValue: string;
  };

  // ---- Services
  services: {
    eyebrow: string;
    heading: string;
    subtitleBefore: string;
    subtitleAfter: string;
    cards: {
      title: string;
      body: string;
      bullets: string[];
    }[];
    /** Cancer-awareness ribbon labels for the first card's bullets, in order. */
    awarenessLabels: string[];
    feedback: {
      eyebrow: string;
      bodyPrefix: string;
      bodySuffix: string;
      footnote: string;
    };
  };

  // ---- Breast cancer deep-dive
  breastCancer: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    intro: string;
    stats: { value: string; label: string; source: string }[];
    proceduresHeading: string;
    procedures: { name: string; body: string; indication: string }[];
    signsHeading: string;
    signs: string[];
    signsFootnote: string;
    approachHeading: string;
    approachBody: string;
    cta: string;
    sourcesLabel: string;
  };

  // ---- Research interests
  research: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    cards: { title: string; body: string }[];
  };

  // ---- Publications
  publications: {
    eyebrow: string;
    heading: string;
    subtitleBefore: string;
    subtitleLink: string;
    subtitleAfter: string;
    sortLabel: string;
    sortMostCited: string;
    sortMostRecent: string;
    topicLabel: string;
    topicAll: string;
    topicLabels: Record<ResearchTopic, string>;
    showingPrefix: string;
    showingMiddle: string;
    showingSuffix: string;
    citationsLabel: string;
    newPreprintLabel: string;
    fullList: string;
    noMatches: string;
  };

  // ---- Teaching / clinical work
  teaching: {
    eyebrow: string;
    heading: string;
    body1Before: string;
    body1Middle: string;
    body1After: string;
    body2: string;
    body3Before: string;
    body3Link: string;
    body3After: string;
  };

  // ---- Contact
  contact: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      disclaimer: string;
      submit: string;
      submitting: string;
      successHeading: string;
      routedAs: string;
      categoryLabels: Record<string, string>;
      preferEmail: string;
      networkError: string;
    };
    cards: {
      emailLabel: string;
      emailNote: string;
      affiliationLabel: string;
      locationLine: string;
      clinicLabel: string;
      clinicName: string;
      clinicPhoneLabel: string;
      clinicHoursLabel: string;
      clinicMapsLabel: string;
    };
  };

  // ---- Research news / breakthroughs
  news: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    items: {
      tag: string;
      title: string;
      body: string;
      year: string;
    }[];
    footnote: string;
  };

  // ---- FAQ
  faq: {
    heading: string;
    items: { q: string; a: string }[];
  };

  // ---- Footer
  footer: {
    tagline: string;
    profilesLabel: string;
    copyright: (year: number) => string;
    disclaimer: string;
    locationSuffix: string;
  };

  // ---- Chatbot
  chatbot: {
    launcherLabel: string;
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    sending: string;
    greeting: string;
    closeLabel: string;
    disclaimer: string;
  };

  // ---- Explore cards (home-page navigation tiles)
  explore: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    cards: {
      key: "breastCancer" | "research" | "advances" | "teaching" | "contact";
      title: string;
      body: string;
      cta: string;
    }[];
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// English dictionary (canonical source)
// ─────────────────────────────────────────────────────────────────────────────

export const en: Dictionary = {
  locale: "en",
  direction: "ltr",
  htmlLang: "en",

  nav: {
    items: [
      { label: "About", href: "/#about" },
      { label: "Services", href: "/#services" },
      { label: "Breast cancer", href: "/breast-cancer" },
      { label: "Research", href: "/research" },
      { label: "Advances", href: "/advances" },
      { label: "Teaching", href: "/teaching" },
      { label: "Contact", href: "/contact" },
    ],
    cta: "Get in Touch",
    toggleLabel: "فارسی",
    togglePath: "/fa",
    toggleAria: "Switch to Persian",
    monogramLine1: "Dr.",
    monogramLine2: "Memari",
  },

  hero: {
    role: "Associate Professor · Surgical Oncologist · Cancer Researcher",
    title: "Dr. Fereidoon Memari",
    affiliation: "Cancer Institute of Iran",
    affiliationDetail: "Imam Khomeini Hospital Complex",
    affiliationParent: "Tehran University of Medical Sciences",
    locationSuffix: "Tehran, Iran",
    description: (years) =>
      `Associate Professor of Surgery with **${years}+ years** of professional surgical experience. Translational research at the intersection of cancer biology, non-coding RNAs, surgical oncology, immunotherapy, and digital health for cancer survivors.`,
    licenseLine: (license, _specialties) =>
      `Medical license № ${license}`,
    specialtiesText: "Surgical Oncology · General Surgery",
    metrics: {
      citations: "Citations",
      hIndex: "h-index",
      i10Index: "i10-index",
      sinceLabel: (n) => `${n} since 2021`,
      sourcePrefix: "Source:",
      viewProfile: "View profile",
    },
    ctas: {
      browsePublications: "Browse publications",
      getInTouch: "Get in touch",
    },
  },

  about: {
    eyebrow: "About",
    heading: "About Dr. Memari",
    badge: (years) => `${years}+ years`,
    refClinical: "Clinical practice",
    refAcademic: "Academic appointment",
    bio: {
      affiliationLine:
        "Dr. Fereidoon Memari is an **Associate Professor of Surgery** at {{tums}} and a surgical oncologist at the {{cancerInstitute}}. With more than **{{years}} years of professional surgical experience**, his clinical practice spans complex cancer cases and combined procedures across gastrointestinal, head and neck, breast, and renal cancers.",
      experienceLine: "",
      researchLine:
        "His translational research focuses on the role of non-coding RNAs — siRNA, microRNA, piRNA, lncRNA, and ceRNA networks — as therapeutic levers and candidate biomarkers in cancer. Recent work also explores cancer immunotherapy, chimeric protein design, and the use of smartphone- and IoT-enabled systems for the remote monitoring of cancer survivors.",
      publicationsLine:
        "His publications span peer-reviewed venues including the *International Journal of Nanomedicine*, *Journal of Cellular Biochemistry*, *Computers in Biology and Medicine*, *JMIR Cancer*, and the *Journal of Oral and Maxillofacial Surgery*.",
    },
    credentialLabels: {
      academicRank: "Academic rank",
      experience: "Experience",
      experienceValue: (years) => `${years}+ years`,
      license: "Medical license",
      licenseValue: (n) => `№ ${n}`,
    },
    academicRankValue: "Associate Professor",
  },

  services: {
    eyebrow: "Clinical practice",
    heading: "Clinical expertise & services",
    subtitleBefore:
      "Three areas of focus across cancer surgery, oncoplastic reconstruction, and minimally invasive technique — practiced at the ",
    subtitleAfter: ".",
    cards: [
      {
        title: "Cancer surgery",
        body: "Specialized focus on cancers of the breast, gastrointestinal tract, and thyroid — from staging to definitive resection and combined procedures in complex cases.",
        bullets: ["Breast cancer", "Stomach cancer", "Colon cancer", "Thyroid cancer"],
      },
      {
        title: "Oncoplastic & reconstructive surgery",
        body: "Combining cancer resection with aesthetic and reconstructive technique — particularly for breast oncoplasty and abdominal procedures — so that oncologic outcomes and quality of life advance together.",
        bullets: ["Breast oncoplasty", "Abdominal aesthetic surgery"],
      },
      {
        title: "Advanced surgical techniques",
        body: "Minimally invasive (laparoscopic) approaches and vascular procedures applied to both general surgery and complex oncologic cases.",
        bullets: ["Laparoscopic / minimally invasive", "Vascular procedures"],
      },
    ],
    awarenessLabels: [
      "Pink ribbon — breast cancer awareness",
      "Periwinkle-blue ribbon — stomach cancer awareness",
      "Dark-blue ribbon — colorectal cancer awareness",
      "Teal ribbon — thyroid cancer awareness",
    ],
    feedback: {
      eyebrow: "Patient experience",
      bodyPrefix: "Patients on ",
      bodySuffix:
        " describe Dr. Memari as a highly skilled and conscientious surgeon, highlighting his clear communication throughout the treatment process and his successful outcomes — particularly in breast and gastric cancer cases.",
      footnote:
        "Summarized from third-party patient platforms; this site does not host or moderate individual reviews.",
    },
  },

  breastCancer: {
    eyebrow: "Focus area",
    heading: "Breast cancer & breast cancer surgery",
    subtitle:
      "Breast cancer is the most-diagnosed cancer in women worldwide. Dr. Memari's practice combines oncologic resection with oncoplastic and reconstructive technique — so that complete cancer treatment and a good long-term breast appearance are planned together.",
    intro:
      "Breast cancer is also one of the most curable cancers when detected early. The gap between outcomes in high- and low-income regions is driven mostly by access to screening, timely diagnosis, and multidisciplinary treatment — not by biology. A well-coordinated team and surgical plan matter as much as the drugs used afterward.",
    stats: [
      {
        value: "2.3M",
        label: "new cases worldwide each year",
        source: "WHO / GLOBOCAN",
      },
      {
        value: "~1 in 20",
        label: "women diagnosed in their lifetime",
        source: "WHO",
      },
      {
        value: "670,000",
        label: "deaths worldwide in 2022",
        source: "WHO",
      },
      {
        value: "> 90%",
        label: "5-year survival for localized disease in high-HDI regions",
        source: "GLOBOCAN",
      },
    ],
    proceduresHeading: "Surgical procedures for breast cancer",
    procedures: [
      {
        name: "Lumpectomy (breast-conserving surgery)",
        body: "Removes the tumor with a margin of healthy tissue while preserving the rest of the breast. Usually combined with radiotherapy and, when oncologically appropriate, with oncoplastic reshaping of the remaining tissue.",
        indication: "Early-stage invasive cancer and DCIS where tumor size and location allow clear margins with good cosmetic outcome.",
      },
      {
        name: "Mastectomy (total or skin- / nipple-sparing)",
        body: "Removes the entire breast when breast-conserving surgery is not appropriate. Skin- and nipple-sparing variants preserve the breast envelope for immediate reconstruction and better aesthetic outcome.",
        indication: "Larger or multifocal tumors, extensive DCIS, inflammatory disease, high-risk genetic mutations (e.g. BRCA1 / BRCA2), or patient preference.",
      },
      {
        name: "Oncoplastic reconstruction",
        body: "Combines cancer resection with plastic-surgery technique — tissue rearrangement, volume replacement, symmetrization — in the same operation, so the treated breast keeps a natural shape. Immediate or delayed autologous / implant-based reconstruction is planned with the patient.",
        indication: "Larger lumpectomy defects, unfavorable tumor-to-breast volume ratio, or patients prioritizing aesthetic outcome alongside oncologic clearance.",
      },
      {
        name: "Sentinel lymph node biopsy & targeted axillary surgery",
        body: "Identifies and removes only the first (sentinel) lymph node(s) draining the tumor to check for spread, avoiding the complications of a full axillary dissection when the sentinel nodes are clear.",
        indication: "Clinically node-negative breast cancer; modern fluorescent / radioisotope mapping improves accuracy and lowers lymphedema risk.",
      },
    ],
    signsHeading: "When to see a specialist",
    signs: [
      "A new lump, thickening, or hardness in the breast or underarm",
      "A change in breast size, shape, or skin texture (dimpling, puckering, or orange-peel skin)",
      "Nipple changes — inversion, flattening, scaling, or rash",
      "Spontaneous, persistent nipple discharge, especially if bloody or from one duct",
      "Localized persistent breast pain that does not follow the menstrual cycle",
      "A suspicious finding on screening mammography, ultrasound, or MRI",
    ],
    signsFootnote:
      "Most of these findings are not cancer, but they should always be evaluated. Early assessment widens the available treatment options and usually improves the long-term outcome.",
    approachHeading: "Dr. Memari's approach",
    approachBody:
      "Each patient is discussed in a multidisciplinary context (surgery, oncology, radiology, pathology) before the operative plan is set. Whenever it is oncologically safe, breast-conserving and oncoplastic techniques are preferred over mastectomy. When mastectomy is the right choice, skin- and nipple-sparing approaches with immediate reconstruction are considered to preserve quality of life. Follow-up combines standard surveillance with the patient-reported-outcome monitoring tools that feature in Dr. Memari's digital-health research.",
    cta: "Discuss a case",
    sourcesLabel: "Figures: WHO breast-cancer fact sheet, GLOBOCAN 2022, and peer-reviewed reviews.",
  },

  research: {
    eyebrow: "Research interests",
    heading: "Where my work lives",
    subtitle:
      "Four interlocking research themes — basic biology of cancer, surgical practice, immunotherapy, and digital follow-up.",
    cards: [
      {
        title: "Cancer biology & non-coding RNAs",
        body: "siRNA, microRNA, piRNA, lncRNA, and ceRNA networks in colorectal, gastric, breast, and renal cancers — both as therapeutic levers and as candidate diagnostic biomarkers.",
      },
      {
        title: "Surgical oncology",
        body: "Clinical and translational work across gastrointestinal, head and neck, breast, and renal cancers, including microvascular reconstruction and management during disrupted care (e.g. COVID-19).",
      },
      {
        title: "Cancer immunotherapy",
        body: "Reviews and translational studies on the evolving immunotherapy landscape — including chimeric protein design and tumor lysis syndrome in electrochemotherapy.",
      },
      {
        title: "Digital health for cancer survivors",
        body: "Smartphone- and IoT-enabled remote monitoring for colorectal cancer survivors, bringing patient-reported outcomes and continuous data into clinical follow-up.",
      },
    ],
  },

  publications: {
    eyebrow: "Publications",
    heading: "Selected peer-reviewed work",
    subtitleBefore: "Sortable and filterable by topic. For requests of a full text or reprint, please use the ",
    subtitleLink: "contact form",
    subtitleAfter: ".",
    sortLabel: "Sort",
    sortMostCited: "Most cited",
    sortMostRecent: "Most recent",
    topicLabel: "Topic",
    topicAll: "All topics",
    topicLabels: {
      "surgical-oncology": "Surgical oncology",
      ncrna: "Non-coding RNAs",
      "cancer-biology": "Cancer biology",
      immunotherapy: "Immunotherapy",
      "digital-health": "Digital health",
      "neuropathic-pain": "Pain & spinal cord injury",
      anesthesia: "Anesthesia & airway",
    },
    showingPrefix: "Showing ",
    showingMiddle: " of ",
    showingSuffix: " publications. Citation counts are pulled from Google Scholar and may lag the latest indexing.",
    citationsLabel: "citations",
    newPreprintLabel: "new / preprint",
    fullList: "Full list on Google Scholar",
    noMatches: "No publications match this filter.",
  },

  teaching: {
    eyebrow: "Teaching & clinical work",
    heading: "Mentorship & clinical practice",
    body1Before: "As an Associate Professor at ",
    body1Middle: ", Dr. Memari teaches and mentors graduate students, surgical residents, and fellows. Clinical practice and trainee supervision take place at the ",
    body1After: ".",
    body2:
      "Beyond clinical and academic work, Dr. Memari participates in public-health awareness initiatives — for example, Sasan Hospital's programs for *Men's National Health Week* in Iran.",
    body3Before:
      "A detailed list of current courses, clinical appointments, and grants is being prepared. In the meantime, prospective collaborators, trainees, and visiting researchers are welcome to ",
    body3Link: "reach out",
    body3After: ".",
  },

  contact: {
    eyebrow: "Contact",
    heading: "Get in touch",
    subtitle:
      "For research collaborations, publication questions, student or fellowship inquiries, and invited talks. Please do not use this form for individual medical advice.",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@institution.edu",
      message: "Message",
      messagePlaceholder: "Briefly describe your collaboration, citation question, or invitation.",
      disclaimer:
        "This form is not intended for individual medical advice. For clinical questions, please consult your treating physician or contact the Cancer Institute of Iran directly.",
      submit: "Send message",
      submitting: "Sending…",
      successHeading: "Message received",
      routedAs: "Routed as:",
      categoryLabels: {
        collaboration: "Research collaboration",
        publication: "Publication inquiry",
        student: "Student / supervision",
        speaking: "Speaking & invited talks",
        clinical: "Clinical inquiry",
        general: "General",
      },
      preferEmail: "Prefer email? Reach Dr. Memari at",
      networkError: "Network error. Please try again or email directly.",
    },
    cards: {
      emailLabel: "Email",
      emailNote: "Replied to as Dr. Memari's schedule allows.",
      affiliationLabel: "Affiliation",
      locationLine: "Tehran, Iran",
      clinicLabel: "Private clinic",
      clinicName: "Tavanir Physicians Building",
      clinicPhoneLabel: "Phone",
      clinicHoursLabel: "Consultation hours",
      clinicMapsLabel: "Open in Neshan Maps",
    },
  },

  news: {
    eyebrow: "Field updates",
    heading: "Recent advances in cancer research",
    subtitle:
      "A curated, non-exhaustive view of 2025 breakthroughs closest to Dr. Memari's research lines — surgical oncology, non-coding RNAs and immunotherapy, and digital / AI-assisted detection.",
    items: [
      {
        tag: "mRNA vaccines",
        year: "2024–2025",
        title: "Personalized mRNA cancer vaccines cross the clinical threshold",
        body: "Phase-2 data for mRNA-4157 with pembrolizumab showed a ~44% reduction in melanoma recurrence, and a pancreatic-cancer trial at Memorial Sloan Kettering with BioNTech reported vaccine-induced T-cell responses persisting for nearly four years after treatment.",
      },
      {
        tag: "KRAS inhibitors",
        year: "2025",
        title: "First-in-class KRAS-G12D drugs enter human trials",
        body: "A phase-1 inhibitor targeting KRAS-G12D produced substantial tumor shrinkage in roughly 61% of early non-small-cell lung-cancer patients — the first drug against a mutation long considered undruggable. Pan-KRAS compounds and PROTAC degraders are advancing in parallel for pancreatic cancer.",
      },
      {
        tag: "Cellular therapy",
        year: "2025",
        title: "CAR-T crosses into solid tumors",
        body: "CLDN18.2-directed CAR-T cells demonstrated survival benefits in advanced gastric and gastroesophageal-junction cancers — the first clear solid-tumor CAR-T win — while off-the-shelf allogeneic CAR-T platforms continued progressing through phase 1/2 trials.",
      },
      {
        tag: "Multi-cancer early detection",
        year: "2025",
        title: "AI-powered liquid biopsy approaches multi-cancer screening",
        body: "A cell-free-RNA assay combined with AI classifiers detected colorectal, lung, prostate, pancreatic, and breast cancers across 1,000+ patient samples with a 92% AUC and 80% sensitivity for stage-I disease — moving multi-cancer early detection (MCED) blood tests closer to primary-care use.",
      },
      {
        tag: "Gene editing",
        year: "2025",
        title: "CRISPR-edited TILs erase metastases in gastrointestinal cancer",
        body: "A University of Minnesota team reported that CRISPR-edited tumor-infiltrating lymphocytes cleared metastatic disease in a patient with advanced gastrointestinal cancer — an early but striking demonstration of gene-edited adoptive cell therapy in solid tumors.",
      },
    ],
    footnote:
      "Summaries from AACR, ASCO, and peer-reviewed coverage. Individual trial results do not constitute medical advice.",
  },

  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        q: "How can I request a reprint or full text of a publication?",
        a: "Most publications listed here include external links to the journal or DOI. If you cannot access a paper through your institution, please use the contact form and mention the title — Dr. Memari is happy to share a personal copy where the publisher's policy allows.",
      },
      {
        q: "Are you available for research collaboration?",
        a: "Yes. Dr. Memari welcomes collaboration in cancer biology (especially non-coding RNAs and ceRNA networks), surgical oncology, immunotherapy, and digital health for cancer survivors. Please describe your hypothesis, study type, and what you would need from the collaboration in your message.",
      },
      {
        q: "Do you supervise students or fellows?",
        a: "Dr. Memari mentors graduate students and clinical fellows working on cancer research and surgical oncology at the Cancer Institute of Iran. Please include a short CV and your area of interest when reaching out.",
      },
      {
        q: "Can I cite or use figures from your work?",
        a: "Citations are always welcome — please cite the original journal as listed. Reuse of figures normally requires permission from the publisher; for figures whose copyright is held by the authors, please contact us directly.",
      },
      {
        q: "Can you give me medical advice for my own diagnosis?",
        a: "Unfortunately no — this site cannot provide individualized medical advice. Please consult your treating oncologist or contact the Cancer Institute of Iran (Tehran University of Medical Sciences) for clinical care.",
      },
      {
        q: "Are you available for invited talks or interviews?",
        a: "Yes, Dr. Memari accepts invited talks, panels, and media interviews on cancer research and surgical oncology topics. Please share the date, audience, and format in your message.",
      },
    ],
  },

  footer: {
    tagline: "Surgical oncologist and cancer researcher · Tehran University of Medical Sciences.",
    profilesLabel: "Profiles",
    copyright: (year) => `© ${year} Dr. Fereidoon Memari · Tehran, Iran`,
    disclaimer:
      "This site is for academic and informational purposes only and does not provide medical advice.",
    locationSuffix: "Tehran, Iran",
  },

  chatbot: {
    launcherLabel: "Ask Me",
    title: "Ask Me",
    subtitle: "Questions about Dr. Memari's work or this site.",
    placeholder: "Type your question…",
    send: "Send",
    sending: "…",
    greeting:
      "Hello! I can help you navigate the site or share general information about Dr. Memari's work in surgical oncology. What would you like to know?",
    closeLabel: "Close chat",
    disclaimer:
      "This assistant does not provide individual medical advice. For clinical questions, please consult a physician.",
  },

  explore: {
    eyebrow: "Explore",
    heading: "Where would you like to go?",
    subtitle: "Each section has its own page — pick the one closest to what you came for.",
    cards: [
      {
        key: "breastCancer",
        title: "Breast cancer & surgery",
        body: "Global stats, surgical options — lumpectomy, mastectomy, oncoplastic reconstruction, sentinel node biopsy — and warning signs.",
        cta: "Read the deep-dive",
      },
      {
        key: "research",
        title: "Research & publications",
        body: "Four research themes and the selected peer-reviewed publications list, filterable by topic.",
        cta: "Browse research",
      },
      {
        key: "advances",
        title: "Recent advances",
        body: "Curated 2025 breakthroughs — mRNA vaccines, KRAS inhibitors, CAR-T in solid tumors, AI liquid biopsy.",
        cta: "See advances",
      },
      {
        key: "teaching",
        title: "Teaching & mentorship",
        body: "Faculty role at TUMS, mentorship of students and fellows, FAQ, and public-health involvement.",
        cta: "Read more",
      },
      {
        key: "contact",
        title: "Contact & clinic",
        body: "Contact form, email, and the private clinic at Tavanir Physicians Building with address and consultation hours.",
        cta: "Get in touch",
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Persian (Farsi) dictionary — direct Farsi copy (see file header)
// ─────────────────────────────────────────────────────────────────────────────

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const toFaDigits = (n: number | string): string =>
  String(n).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);

/**
 * Convert any Western-digit runs in a string to Persian digits when the
 * locale is `fa`. Safe for mixed Farsi + ASCII text like addresses and
 * opening hours.
 */
export function localizeDigits(s: string, locale: Locale): string {
  return locale === "fa" ? toFaDigits(s) : s;
}

export const fa: Dictionary = {
  locale: "fa",
  direction: "rtl",
  htmlLang: "fa-IR",

  nav: {
    items: [
      { label: "درباره", href: "#about" },
      { label: "تخصص‌ها", href: "/fa#services" },
      { label: "سرطان پستان", href: "/fa/breast-cancer" },
      { label: "پژوهش", href: "/fa/research" },
      { label: "پیشرفت‌ها", href: "/fa/advances" },
      { label: "تدریس", href: "/fa/teaching" },
      { label: "تماس", href: "/fa/contact" },
    ],
    cta: "تماس با ما",
    toggleLabel: "English",
    togglePath: "/",
    toggleAria: "Switch to English",
    monogramLine1: "دکتر",
    monogramLine2: "معماری",
  },

  hero: {
    role: "دانشیار · جراحی عمومی و فلوشیپ جراحی سرطان · پژوهشگر سرطان",
    title: "دکتر فریدون معماری",
    affiliation: "انستیتو کانسر ایران",
    affiliationDetail: "مجتمع بیمارستانی امام خمینی",
    affiliationParent: "دانشگاه علوم پزشکی تهران",
    locationSuffix: "تهران، ایران",
    description: (_years) =>
      "دکتر فریدون معماری دانشیار دانشگاه علوم پزشکی تهران و فلوشیپ (فوق تخصص) جراحی سرطان هستند.",
    licenseLine: (license, _specialties) =>
      `شماره‌ی نظام پزشکی ${toFaDigits(license)}`,
    specialtiesText: "جراحی انکولوژی · جراحی عمومی",
    metrics: {
      citations: "ارجاعات",
      hIndex: "شاخص h",
      i10Index: "شاخص i10",
      sinceLabel: (n) => `${toFaDigits(n)} از سال ۲۰۲۱`,
      sourcePrefix: "منبع:",
      viewProfile: "مشاهده پروفایل",
    },
    ctas: {
      browsePublications: "مشاهده مقالات",
      getInTouch: "تماس با ما",
    },
  },

  about: {
    eyebrow: "درباره",
    heading: "زندگی‌نامه و پیشینه حرفه‌ای",
    badge: (years) => `${toFaDigits(years)}+ سال`,
    refClinical: "فعالیت بالینی",
    refAcademic: "سمت دانشگاهی",
    bio: {
      affiliationLine:
        "ایشان به عنوان **دانشیار** و عضو هیئت علمی رسمی {{tums}} فعالیت می‌کنند. بخش مهمی از فعالیت‌های ایشان شامل آموزش دانشجویان پزشکی و رزیدنت‌های جراحی در {{cancerInstitute}} است. ایشان همچنین مقالات پژوهشی متعددی در ژورنال‌های معتبر بین‌المللی در زمینه‌هایی مانند سرطان سینه، روش‌های نوین جراحی گوارش و ایمونوتراپی به چاپ رسانده‌اند.",
      experienceLine:
        "دکتر فریدون معماری (شماره نظام پزشکی: ۲۶۷۴۳) با بیش از ۳۳ سال تجربه در حوزه پزشکی، از فارغ‌التحصیلان ممتاز دانشگاه‌های برتر ایران است. ایشان پس از گذراندن دوره پزشکی عمومی و تخصص جراحی عمومی، با ادامه تحصیل در مقطع فلوشیپ جراحی سرطان، بر درمان تومورهای بدخیم و جراحی‌های پیچیده انکولوژی متمرکز شدند.",
      researchLine:
        "در حوزه پژوهش، کارهای ترجمانی ایشان از جمله نقش RNAهای غیرکدکننده (از جمله siRNA، microRNA، piRNA، lncRNA و شبکه‌های ceRNA) در سرطان، ایمنی‌درمانی، و پایش از راه دور بازماندگان سرطان روده بزرگ با تلفن همراه و IoT را در بر می‌گیرد؛ از جمله مقاله‌ای در *JMIR Cancer* درباره همین موضوع پایش از راه دور.",
      publicationsLine:
        "نمونه‌ای از نشریات: *International Journal of Nanomedicine*، *Journal of Cellular Biochemistry*، *Computers in Biology and Medicine*، *JMIR Cancer*، و *Journal of Oral and Maxillofacial Surgery*.",
    },
    credentialLabels: {
      academicRank: "سمت دانشگاهی",
      experience: "سابقه",
      experienceValue: (years) => `${toFaDigits(years)}+ سال`,
      license: "نظام پزشکی",
      licenseValue: (n) => `شماره ${toFaDigits(n)}`,
    },
    academicRankValue: "دانشیار",
  },

  services: {
    eyebrow: "حوزه‌های تخصصی و درمانی",
    heading: "تخصص‌ها و خدمات بالینی",
    subtitleBefore:
      "سه محور اصلی در جراحی انکولوژی، جراحی ترمیمی و زیبایی، و روش‌های کم‌تهاجمی و عروقی — با محوریت فعالیت در ",
    subtitleAfter: ".",
    cards: [
      {
        title: "جراحی‌های انکولوژی",
        body: "جراحی تخصصی سرطان‌های سینه (پستان)، معده، روده بزرگ (کولورکتال)، تیروئید و غدد.",
        bullets: ["سرطان پستان", "سرطان معده", "سرطان روده بزرگ", "سرطان تیروئید"],
      },
      {
        title: "جراحی‌های ترمیمی و زیبایی",
        body: "انجام جراحی‌های همزمان درمان سرطان و بازسازی (Oncoplastic)، ماموپلاستی، ابدومینوپلاستی و جراحی‌های زیبایی شکم.",
        bullets: ["ماموپلاستی", "ابدومینوپلاستی"],
      },
      {
        title: "روش‌های کم‌تهاجمی و جراحی عروق",
        body: "تسلط بر جراحی‌های لاپاراسکوپی که باعث کاهش دوره نقاهت و درد پس از عمل می‌شود؛ همچنین تجربه گسترده در مدیریت جراحی‌های اضطراری و عروقی.",
        bullets: ["لاپاراسکوپی", "جراحی‌های اضطراری و عروقی"],
      },
    ],
    awarenessLabels: [
      "روبان صورتی — آگاهی از سرطان پستان",
      "روبان آبی روشن — آگاهی از سرطان معده",
      "روبان آبی تیره — آگاهی از سرطان روده‌ی بزرگ",
      "روبان فیروزه‌ای — آگاهی از سرطان تیروئید",
    ],
    feedback: {
      eyebrow: "ویژگی‌های اخلاقی و حرفه‌ای",
      bodyPrefix: "در نظرسنجی‌های مراجعین در سامانه‌های ",
      bodySuffix:
        " و بیماران، دکتر معماری به عنوان پزشکی صبور، دقیق و با اخلاق شناخته می‌شوند. بیماران ایشان همواره از توانایی بالای وی در توضیح مراحل درمان و آرامش‌بخشی به بیمار در شرایط سخت بیماری‌های سرطانی تقدیر کرده‌اند.",
      footnote:
        "خلاصه‌ای از سامانه‌های شخص ثالث؛ این وب‌سایت بازخوردهای فردی را میزبانی یا ویرایش نمی‌کند.",
    },
  },

  breastCancer: {
    eyebrow: "کانون تخصصی",
    heading: "سرطان پستان و جراحی سرطان پستان",
    subtitle:
      "سرطان پستان شایع‌ترین سرطان زنان در جهان است. رویکرد دکتر معماری در درمان این بیماری، ترکیب جراحی انکولوژیک (برداشت کامل تومور) با تکنیک‌های انکوپلاستی و بازسازی است؛ به‌گونه‌ای که درمان قطعی سرطان و حفظ ظاهر طبیعی پستان در یک طرح واحد برنامه‌ریزی می‌شوند.",
    intro:
      "سرطان پستان در صورت تشخیص زودهنگام، یکی از قابل‌درمان‌ترین سرطان‌هاست. فاصله‌ی چشم‌گیر پیامد درمان میان کشورهای برخوردار و کم‌برخوردار، بیش از آن‌که ناشی از تفاوت زیست‌شناختی باشد، نتیجه‌ی تفاوت در دسترسی به غربالگری، تشخیص به‌موقع و درمان چند-تخصصی است. یک تیم منسجم و طرح جراحی درست، به‌اندازه‌ی خود داروها اهمیت دارد.",
    stats: [
      {
        value: "۲٫۳ میلیون",
        label: "مورد جدید در جهان در هر سال",
        source: "WHO / GLOBOCAN",
      },
      {
        value: "حدود ۱ از هر ۲۰",
        label: "زنان در طول زندگی مبتلا می‌شوند",
        source: "WHO",
      },
      {
        value: "۶۷۰٬۰۰۰",
        label: "مرگ در جهان در سال ۲۰۲۲",
        source: "WHO",
      },
      {
        value: "بیش از ۹۰٪",
        label: "بقای ۵‌ساله در بیماری موضعی در کشورهای با HDI بالا",
        source: "GLOBOCAN",
      },
    ],
    proceduresHeading: "روش‌های جراحی در سرطان پستان",
    procedures: [
      {
        name: "لامپکتومی (جراحی پستان‌حفظ‌کننده)",
        body: "برداشت تومور به‌همراه حاشیه‌ی ایمن از بافت سالم، با حفظ باقی پستان. معمولاً همراه با پرتودرمانی انجام می‌شود و در صورت نیاز، با تکنیک‌های انکوپلاستی بافت باقی‌مانده بازآرایی می‌شود تا ظاهر طبیعی حفظ بماند.",
        indication:
          "سرطان مهاجم در مراحل اولیه و DCIS، هنگامی که اندازه و محل تومور امکان حاشیه‌ی پاک همراه با پیامد زیبایی مناسب را می‌دهد.",
      },
      {
        name: "ماستکتومی (کامل، با حفظ پوست یا حفظ نیپل)",
        body: "برداشت کامل پستان در مواردی که جراحی پستان‌حفظ‌کننده مناسب نیست. نسخه‌های «حفظ پوست» و «حفظ نیپل» پوشش خارجی پستان را نگه می‌دارند تا بازسازی فوری با نتیجه‌ی زیبایی بهتری امکان‌پذیر باشد.",
        indication:
          "تومورهای بزرگ یا چند-کانونی، DCIS وسیع، سرطان التهابی پستان، جهش‌های ژنتیکی پرخطر (مانند BRCA1/BRCA2) یا انتخاب آگاهانه‌ی بیمار.",
      },
      {
        name: "بازسازی انکوپلاستی",
        body: "ترکیب برداشت تومور با تکنیک‌های جراحی پلاستیک — بازآرایی بافت، جایگزینی حجم، متقارن‌سازی پستان سالم — در یک عمل واحد، تا پستان درمان‌شده شکلی طبیعی داشته باشد. بازسازی فوری یا تأخیری (با بافت خود بیمار یا ایمپلنت) در جلسه‌ی مشاوره با بیمار برنامه‌ریزی می‌شود.",
        indication:
          "نقص بزرگ ناشی از لامپکتومی، نسبت نامطلوب حجم تومور به حجم پستان، یا بیمارانی که علاوه بر درمان قطعی، اهمیت ویژه‌ای برای ظاهر نهایی قائل‌اند.",
      },
      {
        name: "بیوپسی گره‌ی سنتینل و جراحی هدفمند زیربغل",
        body: "شناسایی و برداشت نخستین گره (یا گره‌های) لنفاوی که مسیر تخلیه‌ی تومور هستند، برای بررسی درگیری غدد لنفاوی. در صورت پاک‌بودن این گره‌ها، از انجام دایسکسیون کامل زیربغل (و عوارض آن) پرهیز می‌شود.",
        indication:
          "سرطان پستان با گره‌های لنفاوی از نظر بالینی منفی؛ نقشه‌برداری با رنگ‌های فلورسنت و رادیوایزوتوپ، دقت تشخیص را بالا می‌برد و خطر لنف‌ادم را کاهش می‌دهد.",
      },
    ],
    signsHeading: "چه زمانی باید به متخصص مراجعه کرد؟",
    signs: [
      "توده، سفتی یا ضخیم‌شدگی جدید در پستان یا زیربغل",
      "تغییر در اندازه، شکل یا بافت پوست پستان (فرورفتگی، چروک‌شدگی یا پوست پرتقالی)",
      "تغییر در نیپل — فرورفتگی، مسطح‌شدن، پوسته‌ریزی یا بثورات",
      "ترشح خودبه‌خودی و پایدار از نیپل، به‌ویژه اگر خونی یا تنها از یک مجرا باشد",
      "درد موضعی پایدار در پستان که با چرخه‌ی قاعدگی همراه نیست",
      "یافته‌ی مشکوک در ماموگرافی غربالگری، سونوگرافی یا MRI",
    ],
    signsFootnote:
      "بیشتر این یافته‌ها سرطان نیستند، اما همیشه باید ارزیابی شوند. ارزیابی زودهنگام طیف گزینه‌های درمانی را گسترش می‌دهد و معمولاً پیامد بلندمدت را بهتر می‌کند.",
    approachHeading: "رویکرد دکتر معماری",
    approachBody:
      "هر بیمار پیش از تعیین طرح عمل، در یک تیم چند-تخصصی (جراحی، انکولوژی، رادیولوژی، پاتولوژی) بررسی می‌شود. هرجا که از نظر انکولوژیک امکان‌پذیر باشد، روش‌های پستان‌حفظ‌کننده و انکوپلاستی بر ماستکتومی ترجیح داده می‌شوند. در مواردی که ماستکتومی انتخاب درست است، رویکردهای «حفظ پوست» و «حفظ نیپل» همراه با بازسازی فوری، برای حفظ کیفیت زندگی در نظر گرفته می‌شود. پیگیری پس از عمل، مراقبت استاندارد را با ابزارهای پایش خودگزارش‌دهی بیمار — همان خط پژوهشی سلامت دیجیتال دکتر معماری — ترکیب می‌کند.",
    cta: "مشاوره درباره‌ی پرونده",
    sourcesLabel: "ارقام از گزارش WHO در زمینه‌ی سرطان پستان، GLOBOCAN 2022 و مرورهای داور-پسند.",
  },

  research: {
    eyebrow: "حوزه‌های پژوهشی",
    heading: "محورهای پژوهش",
    subtitle:
      "چهار محور به‌هم‌پیوسته: زیست‌شناسی سرطان و RNAهای غیرکدکننده، جراحی انکولوژی، ایمنی‌درمانی، و سلامت دیجیتال برای پیگیری بازماندگان.",
    cards: [
      {
        title: "زیست‌شناسی سرطان و RNAهای غیرکدکننده",
        body: "siRNA، microRNA، piRNA، lncRNA و شبکه‌های ceRNA در سرطان‌های روده‌ی بزرگ، معده، پستان و کلیه — هم به‌عنوان اهرم درمانی و هم نامزد نشانگر زیستی تشخیصی.",
      },
      {
        title: "جراحی انکولوژی",
        body: "کار بالینی و ترجمانی در سرطان‌های دستگاه گوارش، سر و گردن، پستان و کلیه، شامل بازسازی میکروواسکولار و مدیریت در شرایط مختل (مانند کووید-۱۹).",
      },
      {
        title: "ایمنی‌درمانی سرطان",
        body: "مرورها و مطالعات ترجمانی در چشم‌انداز در حال تحول ایمنی‌درمانی — از جمله طراحی پروتئین چیمریک و سندرم لیز توموری در الکتروکموتراپی.",
      },
      {
        title: "سلامت دیجیتال برای بازماندگان سرطان",
        body: "در مقاله‌ای در *JMIR Cancer* (۲۰۲۳)، پایش از راه دور بازماندگان سرطان روده بزرگ با تلفن همراه و اینترنت اشیاء بررسی شده است؛ این همان خط پژوهشی است که در فهرست مقالات هم آمده است.",
      },
    ],
  },

  publications: {
    eyebrow: "مقالات",
    heading: "مقالات منتخب داور-پسند",
    subtitleBefore: "قابل مرتب‌سازی و فیلتر بر اساس موضوع. برای درخواست متن کامل یا چاپ مجدد، لطفاً از ",
    subtitleLink: "فرم تماس",
    subtitleAfter: " استفاده کنید.",
    sortLabel: "ترتیب",
    sortMostCited: "پراستنادترین",
    sortMostRecent: "جدیدترین",
    topicLabel: "موضوع",
    topicAll: "همه‌ی موضوعات",
    topicLabels: {
      "surgical-oncology": "جراحی انکولوژی",
      ncrna: "RNAهای غیرکدکننده",
      "cancer-biology": "زیست‌شناسی سرطان",
      immunotherapy: "ایمنی‌درمانی",
      "digital-health": "سلامت دیجیتال",
      "neuropathic-pain": "درد و آسیب نخاعی",
      anesthesia: "بیهوشی و راه هوایی",
    },
    showingPrefix: "نمایش ",
    showingMiddle: " از ",
    showingSuffix: " مقاله. تعداد ارجاعات از Google Scholar گرفته شده و ممکن است نسبت به آخرین نمایه‌سازی تأخیر داشته باشد.",
    citationsLabel: "ارجاع",
    newPreprintLabel: "جدید / پیش‌چاپ",
    fullList: "فهرست کامل در Google Scholar",
    noMatches: "هیچ مقاله‌ای با این فیلتر مطابقت ندارد.",
  },

  teaching: {
    eyebrow: "تدریس، مراکز فعالیت و مشارکت عمومی",
    heading: "آموزش، مراکز خدمت و سلامت عمومی",
    body1Before: "به‌عنوان دانشیار و عضو هیئت علمی رسمی ",
    body1Middle:
      "، دکتر معماری به آموزش دانشجویان پزشکی و رزیدنت‌های جراحی می‌پردازد. بخش دولتی: فعالیت در ",
    body1After:
      " (مرکز اصلی ارجاع سرطان در ایران). بخش خصوصی: بیمارستان‌های لاله و ساسان. مطب شخصی در خیابان توانیر تهران، مرکز اصلی مشاوره و ویزیت بیماران غیربیمارستانی.",
    body2:
      "علاوه بر موارد فوق، ایشان در برنامه‌های آگاهی‌بخشی سلامت عمومی نیز مشارکت می‌کنند — از جمله در بیمارستان ساسان در چارچوب *هفته ملی سلامت مردان* ایران.",
    body3Before:
      "فهرست تفصیلی دروس، انتصابات بالینی و طرح‌های پژوهشی در حال آماده‌سازی است. در این فاصله، همکاران، کارآموزان و پژوهشگران مهمان می‌توانند ",
    body3Link: "تماس بگیرند",
    body3After: ".",
  },

  contact: {
    eyebrow: "تماس",
    heading: "ارتباط با ما",
    subtitle:
      "برای همکاری‌های پژوهشی، پرسش‌های مرتبط با مقالات، درخواست‌های تحصیلی یا فلوشیپ، و دعوت برای سخنرانی. لطفاً از این فرم برای دریافت توصیه‌ی پزشکی شخصی استفاده نکنید.",
    form: {
      name: "نام",
      namePlaceholder: "نام شما",
      email: "ایمیل",
      emailPlaceholder: "you@institution.edu",
      message: "پیام",
      messagePlaceholder: "همکاری، پرسش پژوهشی یا دعوت خود را به‌اختصار توضیح دهید.",
      disclaimer:
        "این فرم برای ارائه‌ی توصیه‌ی پزشکی شخصی نیست. برای پرسش‌های بالینی لطفاً با پزشک معالج خود مشورت کنید یا مستقیماً با انستیتو کانسر ایران تماس بگیرید.",
      submit: "ارسال پیام",
      submitting: "در حال ارسال…",
      successHeading: "پیام دریافت شد",
      routedAs: "دسته‌بندی:",
      categoryLabels: {
        collaboration: "همکاری پژوهشی",
        publication: "پرسش درباره‌ی مقاله",
        student: "دانشجو / راهنمایی",
        speaking: "سخنرانی و دعوت",
        clinical: "پرسش بالینی",
        general: "عمومی",
      },
      preferEmail: "ایمیل را ترجیح می‌دهید؟ با دکتر معماری تماس بگیرید:",
      networkError: "خطای شبکه. لطفاً دوباره تلاش کنید یا مستقیماً ایمیل بزنید.",
    },
    cards: {
      emailLabel: "ایمیل",
      emailNote: "پاسخ‌گویی متناسب با برنامه‌ی دکتر معماری انجام می‌شود.",
      affiliationLabel: "محل خدمت",
      locationLine: "تهران، ایران",
      clinicLabel: "مطب شخصی",
      clinicName: "ساختمان پزشکان توانیر",
      clinicPhoneLabel: "تلفن",
      clinicHoursLabel: "ساعات ویزیت",
      clinicMapsLabel: "مشاهده روی نقشه نشان",
    },
  },

  news: {
    eyebrow: "رویدادهای علمی",
    heading: "تازه‌ترین پیشرفت‌های پژوهش سرطان",
    subtitle:
      "گزیده‌ای از مهم‌ترین دستاوردهای سال ۲۰۲۵ در زمینه‌های نزدیک به خط پژوهشی دکتر معماری — جراحی انکولوژی، RNAهای غیرکدکننده و ایمنی‌درمانی، و تشخیص دیجیتال با کمک هوش مصنوعی.",
    items: [
      {
        tag: "واکسن‌های mRNA",
        year: "۲۰۲۴–۲۰۲۵",
        title: "عبور واکسن‌های شخصی‌سازی‌شده mRNA از آستانه‌ی بالینی",
        body: "داده‌های فاز ۲ واکسن mRNA-4157 همراه با پمبرولیزوماب حدود ۴۴ درصد کاهش عود ملانوم را نشان داد و کارآزمایی سرطان پانکراس در مرکز اسلون‌کترینگ با همکاری BioNTech گزارش کرد که پاسخ سلول‌های T حاصل از واکسن تا حدود چهار سال پس از درمان پایدار مانده است.",
      },
      {
        tag: "مهارکننده‌های KRAS",
        year: "۲۰۲۵",
        title: "ورود نخستین داروهای KRAS-G12D به کارآزمایی‌های انسانی",
        body: "یک مهارکننده‌ی فاز ۱ علیه جهش KRAS-G12D در حدود ۶۱ درصد از بیماران سرطان ریه‌ی غیرسلول‌کوچک، کاهش قابل‌توجه اندازه‌ی تومور ایجاد کرد — نخستین داروی موفق علیه جهشی که تا امروز «غیرقابل مهار» دانسته می‌شد. ترکیبات پان-KRAS و تخریب‌کننده‌های PROTAC نیز به‌موازات برای سرطان پانکراس در دست توسعه‌اند.",
      },
      {
        tag: "سلول‌درمانی",
        year: "۲۰۲۵",
        title: "گذر CAR-T به تومورهای جامد",
        body: "در مهم‌ترین نشست‌های علمی ۲۰۲۵، سلول‌های CAR-T هدف‌گرفته با CLDN18.2 در سرطان‌های پیشرفته‌ی معده و محل اتصال معده و مری، مزیت بقا نشان دادند — نخستین پیروزی روشن CAR-T در یک تومور جامد. سکوهای CAR-T آلوژنیک و «آماده‌مصرف» نیز در کارآزمایی‌های فاز ۱/۲ پیش رفتند.",
      },
      {
        tag: "تشخیص زودهنگام چند-سرطانی",
        year: "۲۰۲۵",
        title: "نزدیک‌شدن بیوپسی مایع مبتنی بر هوش مصنوعی به غربالگری چندگانه",
        body: "یک آزمایش مبتنی بر RNAی خارج‌سلولی همراه با طبقه‌بندی‌کننده‌های هوش مصنوعی در بیش از ۱۰۰۰ نمونه، پنج سرطان روده‌ی بزرگ، ریه، پروستات، پانکراس و پستان را با AUC حدود ۹۲٪ و حساسیت ۸۰٪ برای بیماری مرحله‌ی I تشخیص داد؛ گامی مهم برای نزدیک‌تر شدن آزمایش‌های خون MCED به مراقبت اولیه.",
      },
      {
        tag: "ویرایش ژن",
        year: "۲۰۲۵",
        title: "پاک‌سازی متاستاز سرطان گوارش با TIL ویرایش‌شده با CRISPR",
        body: "پژوهشگران دانشگاه مینه‌سوتا گزارش کردند که لنفوسیت‌های نفوذکننده به تومور (TIL) پس از ویرایش با CRISPR توانستند بیماری متاستاتیک را در یک بیمار مبتلا به سرطان پیشرفته‌ی گوارش از بین ببرند — نمایشی اولیه اما چشم‌گیر از سلول‌درمانی اتولوگ ویرایش‌شده‌ی ژنی در تومورهای جامد.",
      },
    ],
    footnote:
      "برگرفته از گزارش‌های AACR، ASCO و منابع داور-پسند. نتایج کارآزمایی‌های منفرد جایگزین توصیه‌ی پزشکی نیستند.",
  },

  faq: {
    heading: "پرسش‌های متداول",
    items: [
      {
        q: "چگونه می‌توانم متن کامل یا چاپ مجدد یک مقاله را درخواست کنم؟",
        a: "بیشتر مقالات فهرست‌شده شامل پیوند به نشریه یا DOI هستند. اگر از طریق دانشگاه خود به مقاله دسترسی ندارید، لطفاً با اشاره به عنوان مقاله از فرم تماس استفاده کنید — دکتر معماری در صورت اجازه‌ی ناشر، با کمال میل نسخه‌ی شخصی را در اختیار قرار می‌دهد.",
      },
      {
        q: "آیا برای همکاری پژوهشی در دسترس هستید؟",
        a: "بله. دکتر معماری از همکاری در زیست‌شناسی سرطان (به‌ویژه RNAهای غیرکدکننده و شبکه‌های ceRNA)، جراحی انکولوژی، ایمنی‌درمانی و سلامت دیجیتال برای بازماندگان سرطان استقبال می‌کند. لطفاً فرضیه، نوع مطالعه و انتظار خود از همکاری را در پیام شرح دهید.",
      },
      {
        q: "آیا دانشجویان یا فلوها را راهنمایی می‌کنید؟",
        a: "دکتر معماری دانشجویان تحصیلات تکمیلی و فلوهای بالینی فعال در پژوهش سرطان و جراحی انکولوژی در انستیتو کانسر ایران را راهنمایی می‌کند. لطفاً هنگام تماس، خلاصه‌ای از CV و حوزه‌ی علاقه‌ی خود را پیوست کنید.",
      },
      {
        q: "آیا می‌توانم به آثار شما استناد یا از تصاویر آن‌ها استفاده کنم؟",
        a: "استناد همواره مورد استقبال است — لطفاً به نشریه‌ی اصلی فهرست‌شده ارجاع دهید. استفاده‌ی مجدد از تصاویر معمولاً نیازمند اجازه‌ی ناشر است؛ برای تصاویری که حق تکثیر آن‌ها در اختیار نویسندگان است، لطفاً مستقیماً با ما تماس بگیرید.",
      },
      {
        q: "آیا می‌توانید برای تشخیص شخصی من مشاوره‌ی پزشکی ارائه دهید؟",
        a: "متأسفانه خیر — این وب‌سایت نمی‌تواند مشاوره‌ی پزشکی شخصی ارائه دهد. لطفاً با پزشک انکولوژیست معالج خود مشورت کنید یا برای دریافت خدمات بالینی با انستیتو کانسر ایران (دانشگاه علوم پزشکی تهران) تماس بگیرید.",
      },
      {
        q: "آیا برای سخنرانی‌های دعوتی یا مصاحبه در دسترس هستید؟",
        a: "بله، دکتر معماری از سخنرانی‌های دعوتی، میزگردها و مصاحبه‌های رسانه‌ای در حوزه‌ی پژوهش سرطان و جراحی انکولوژی استقبال می‌کند. لطفاً تاریخ، مخاطبان و قالب برنامه را در پیام خود بیان کنید.",
      },
    ],
  },

  footer: {
    tagline: "متخصص جراحی انکولوژی و پژوهشگر سرطان · دانشگاه علوم پزشکی تهران.",
    profilesLabel: "پروفایل‌ها",
    copyright: (year) =>
      `© ${toFaDigits(year)} دکتر فریدون معماری · تهران، ایران`,
    disclaimer:
      "این وب‌سایت صرفاً با اهداف علمی و اطلاع‌رسانی است و توصیه‌ی پزشکی ارائه نمی‌دهد.",
    locationSuffix: "تهران، ایران",
  },

  chatbot: {
    launcherLabel: "از من بپرسید",
    title: "از من بپرسید",
    subtitle: "پرسش درباره‌ی کار دکتر معماری یا راهنمایی در این سایت.",
    placeholder: "پرسش خود را بنویسید…",
    send: "ارسال",
    sending: "…",
    greeting:
      "سلام! می‌توانم در جهت‌یابی این سایت یا ارائه‌ی اطلاعات عمومی درباره‌ی کار دکتر معماری در جراحی انکولوژی کمک کنم. چه چیزی می‌خواهید بدانید؟",
    closeLabel: "بستن گفت‌وگو",
    disclaimer:
      "این دستیار توصیه‌ی پزشکی شخصی ارائه نمی‌دهد. برای پرسش‌های بالینی لطفاً با پزشک خود مشورت کنید.",
  },

  explore: {
    eyebrow: "کاوش",
    heading: "به کجا می‌خواهید بروید؟",
    subtitle: "هر بخش صفحه‌ی جداگانه دارد — نزدیک‌ترین را به هدف خود انتخاب کنید.",
    cards: [
      {
        key: "breastCancer",
        title: "سرطان پستان و جراحی",
        body: "آمار جهانی، گزینه‌های جراحی — لامپکتومی، ماستکتومی، بازسازی انکوپلاستی، بیوپسی گره‌ی سنتینل — و علائم هشدار.",
        cta: "مشاهده‌ی جزئیات",
      },
      {
        key: "research",
        title: "پژوهش و مقالات",
        body: "چهار محور پژوهشی و فهرست مقالات داور-پسند منتخب، قابل فیلتر بر اساس موضوع.",
        cta: "مرور پژوهش‌ها",
      },
      {
        key: "advances",
        title: "پیشرفت‌های اخیر",
        body: "گزیده‌ی دستاوردهای ۲۰۲۵ — واکسن‌های mRNA، مهارکننده‌های KRAS، CAR-T در تومورهای جامد، بیوپسی مایع با هوش مصنوعی.",
        cta: "مشاهده‌ی پیشرفت‌ها",
      },
      {
        key: "teaching",
        title: "تدریس و راهنمایی",
        body: "نقش هیئت علمی در TUMS، راهنمایی دانشجویان و فلوها، پرسش‌های متداول و مشارکت در سلامت عمومی.",
        cta: "اطلاعات بیشتر",
      },
      {
        key: "contact",
        title: "تماس و مطب",
        body: "فرم تماس، ایمیل و مطب خصوصی در ساختمان پزشکان توانیر به‌همراه آدرس و ساعات ویزیت.",
        cta: "ارتباط با ما",
      },
    ],
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, fa };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Format a number using Persian digits when locale is fa, Western otherwise. */
export function formatNumber(n: number, locale: Locale): string {
  if (locale === "fa") return toFaDigits(n);
  return String(n);
}

/** Render a number with locale-aware thousands separator. */
export function formatNumberLocalized(n: number, locale: Locale): string {
  if (locale === "fa") return n.toLocaleString("fa-IR");
  return n.toLocaleString("en-US");
}
