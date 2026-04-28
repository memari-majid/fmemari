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
    description: string;
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
    badge: string;
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
      experienceValue: string;
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

  // ---- Live PubMed feed (on /advances)
  liveFeed: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    sourceLabel: string;
    empty: string;
    openPaper: string;
    openSearch: string;
  };

  // ---- Floating call button
  callButton: {
    label: string;
  };

  // ---- Clinic map (on /contact)
  clinicMap: {
    heading: string;
    subtitle: string;
    iframeTitle: string;
    openNeshan: string;
    openGoogle: string;
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
    role: "Associate Professor · Breast Cancer Surgeon · Surgical Oncologist",
    title: "Dr. Fereidoon Memari",
    affiliation: "Cancer Institute of Iran",
    affiliationDetail: "Imam Khomeini Hospital Complex",
    affiliationParent: "Tehran University of Medical Sciences",
    locationSuffix: "Tehran, Iran",
    description:
      "Associate Professor of Surgery, practicing surgery **since 1993**. Translational research at the intersection of cancer biology, non-coding RNAs, surgical oncology, immunotherapy, and digital health for cancer survivors.",
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
    badge: "Since 1993",
    refClinical: "Clinical practice",
    refAcademic: "Academic appointment",
    bio: {
      affiliationLine:
        "Dr. Fereidoon Memari is an **Associate Professor of Surgery** at {{tums}} and a surgical oncologist at the {{cancerInstitute}}. Practicing surgery since {{since}}, his clinical practice spans complex cancer cases and combined procedures across gastrointestinal, head and neck, breast, and renal cancers.",
      experienceLine: "",
      researchLine:
        "His translational research focuses on the role of non-coding RNAs — siRNA, microRNA, piRNA, lncRNA, and ceRNA networks — as therapeutic levers and candidate biomarkers in cancer. Recent work also explores cancer immunotherapy, chimeric protein design, and the use of smartphone- and IoT-enabled systems for the remote monitoring of cancer survivors.",
      publicationsLine:
        "His publications span peer-reviewed venues including the *International Journal of Nanomedicine*, *Journal of Cellular Biochemistry*, *Computers in Biology and Medicine*, *JMIR Cancer*, and the *Journal of Oral and Maxillofacial Surgery*.",
    },
    credentialLabels: {
      academicRank: "Academic rank",
      experience: "Experience",
      experienceValue: "Since 1993",
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
      "Each patient is discussed in a multidisciplinary context (surgery, oncology, radiology, pathology) before the operative plan is set. Whenever it is oncologically safe, breast-conserving and oncoplastic techniques are preferred over mastectomy. When mastectomy is the right choice, skin- and nipple-sparing approaches with immediate reconstruction are considered to preserve quality of life. Follow-up combines standard surveillance with the patient-reported-outcome monitoring tools that feature in Dr. Memari's digital-health research. For asymptomatic women, the **National Breast Cancer Foundation's Early Detection Plan** and the **2024 USPSTF update** converge on a clear schedule: a monthly breast self-exam from age 20, a clinical breast exam every one to three years through age 39 (annually thereafter), and **biennial screening mammography from age 40 through 74**. Women at elevated lifetime risk — known BRCA1/BRCA2 carriers, strong family history, or prior chest radiation — should add **annual breast MRI alongside mammography starting at age 30** per the American Cancer Society.",
    cta: "Discuss a case",
    sourcesLabel: "Figures: WHO breast-cancer fact sheet and GLOBOCAN 2022. Screening guidance: National Breast Cancer Foundation (Early Detection Plan), U.S. Preventive Services Task Force (2024 update), and the American Cancer Society.",
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
    heading: "Recent advances in breast cancer",
    subtitle:
      "Curated 2024–2025 breakthroughs across breast-cancer therapy, screening, and surveillance — the lines most relevant to Dr. Memari's clinical practice.",
    items: [
      {
        tag: "HER2-low therapy",
        year: "2024",
        title: "Trastuzumab deruxtecan redefines HER2-low metastatic disease",
        body: "DESTINY-Breast06 phase-3 results extended trastuzumab deruxtecan's benefit to HER2-low and HER2-ultralow hormone-receptor-positive metastatic breast cancer, improving progression-free survival over chemotherapy and prompting regulatory label expansion in multiple regions.",
      },
      {
        tag: "Immunotherapy",
        year: "2025",
        title: "KEYNOTE-522 five-year update sustains TNBC benefit",
        body: "At five-year follow-up, neoadjuvant pembrolizumab plus chemotherapy continued to improve event-free survival in early-stage triple-negative breast cancer — cementing its role as a standard of care for high-risk early disease.",
      },
      {
        tag: "PARP inhibitors",
        year: "2025",
        title: "OlympiA confirms long-term olaparib benefit in BRCA-mutated breast cancer",
        body: "Updated OlympiA data showed adjuvant olaparib continues to deliver invasive disease-free and overall survival benefit in germline BRCA1/2-mutated, high-risk HER2-negative early breast cancer — reinforcing the case for universal BRCA testing in this population.",
      },
      {
        tag: "AI mammography",
        year: "2025",
        title: "AI-augmented mammography matches specialist readers at scale",
        body: "Large prospective studies in Sweden, Germany, and the UK showed AI-assisted mammography detects more cancers without raising false-positive rates, with several health systems beginning routine deployment alongside human radiologist review.",
      },
      {
        tag: "ctDNA monitoring",
        year: "2025",
        title: "Liquid biopsy flags breast cancer recurrence months before imaging",
        body: "Circulating tumor DNA assays now reliably detect molecular relapse 6–12 months before radiographic recurrence in early-stage breast cancer, with phase-3 trials evaluating ctDNA-guided escalation and de-escalation strategies.",
      },
    ],
    footnote:
      "Summaries from ASCO, SABCS, AACR, and peer-reviewed coverage. Individual trial results do not constitute medical advice.",
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

  liveFeed: {
    eyebrow: "Live from PubMed",
    heading: "Latest breast cancer research papers",
    subtitle:
      "Recently indexed breast-cancer papers — therapy, screening, and clinical trials — fetched directly from PubMed and refreshed every couple of hours.",
    sourceLabel: "Source: PubMed",
    empty:
      "The live feed is temporarily unavailable. Try the curated list above, or open PubMed directly.",
    openPaper: "Read on PubMed",
    openSearch: "Open full search in PubMed",
  },

  callButton: {
    label: "Call",
  },

  clinicMap: {
    heading: "Clinic location",
    subtitle:
      "Tavanir Physicians Building, 4th floor, Unit 19 — Tavanir St, near Hemmat Expressway, Tehran.",
    iframeTitle: "Map showing Dr. Memari's clinic at Tavanir Physicians Building, Tehran",
    openNeshan: "Open in Neshan",
    openGoogle: "Open in Google Maps",
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
      { label: "آموزش", href: "/fa/teaching" },
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
    role: "دانشیار · جراح سرطان پستان · فوق‌تخصص جراحی سرطان",
    title: "دکتر فریدون معماری",
    affiliation: "انستیتو کانسر ایران",
    affiliationDetail: "مجتمع بیمارستانی امام خمینی",
    affiliationParent: "دانشگاه علوم پزشکی تهران",
    locationSuffix: "تهران، ایران",
    description:
      "دکتر فریدون معماری دانشیار دانشگاه علوم پزشکی تهران و فلوشیپ (فوق تخصص) جراحی سرطان هستند.",
    licenseLine: (license, _specialties) =>
      `شماره‌ی نظام پزشکی ${toFaDigits(license)}`,
    specialtiesText: "جراحی سرطان · جراحی عمومی",
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
    badge: "از سال ۱۳۷۲",
    refClinical: "فعالیت بالینی",
    refAcademic: "سمت دانشگاهی",
    bio: {
      affiliationLine:
        "ایشان به عنوان **دانشیار** و عضو هیئت علمی رسمی {{tums}} فعالیت می‌کنند. بخش مهمی از فعالیت‌های ایشان شامل آموزش دانشجویان پزشکی و رزیدنت‌های جراحی در {{cancerInstitute}} است. ایشان همچنین مقالات پژوهشی متعددی در ژورنال‌های معتبر بین‌المللی در زمینه‌هایی مانند سرطان سینه، روش‌های نوین جراحی گوارش و ایمونوتراپی به چاپ رسانده‌اند.",
      experienceLine:
        "دکتر فریدون معماری (شماره نظام پزشکی: ۲۶۷۴۳) با سابقه‌ی فعالیت پزشکی از سال ۱۳۷۲، از فارغ‌التحصیلان ممتاز دانشگاه‌های برتر ایران است. ایشان پس از گذراندن دوره پزشکی عمومی و تخصص جراحی عمومی، با ادامه تحصیل در مقطع فلوشیپ جراحی سرطان، بر درمان تومورهای بدخیم و جراحی‌های پیچیده‌ی سرطان متمرکز شدند.",
      researchLine:
        "در حوزه پژوهش، کارهای ترجمانی ایشان از جمله نقش RNAهای غیرکدکننده (از جمله siRNA، microRNA، piRNA، lncRNA و شبکه‌های ceRNA) در سرطان، ایمنی‌درمانی، و پایش از راه دور بازماندگان سرطان روده بزرگ با تلفن همراه و اینترنت اشیاء را در بر می‌گیرد؛ از جمله مقاله‌ای در *JMIR Cancer* درباره همین موضوع پایش از راه دور.",
      publicationsLine:
        "نمونه‌ای از نشریات: *International Journal of Nanomedicine*، *Journal of Cellular Biochemistry*، *Computers in Biology and Medicine*، *JMIR Cancer*، و *Journal of Oral and Maxillofacial Surgery*.",
    },
    credentialLabels: {
      academicRank: "سمت دانشگاهی",
      experience: "سابقه",
      experienceValue: "از سال ۱۳۷۲",
      license: "نظام پزشکی",
      licenseValue: (n) => `شماره ${toFaDigits(n)}`,
    },
    academicRankValue: "دانشیار",
  },

  services: {
    eyebrow: "حوزه‌های تخصصی و درمانی",
    heading: "تخصص‌ها و خدمات بالینی",
    subtitleBefore:
      "سه محور اصلی در جراحی سرطان، جراحی ترمیمی و زیبایی، و روش‌های کم‌تهاجمی و عروقی — با محوریت فعالیت در ",
    subtitleAfter: ".",
    cards: [
      {
        title: "جراحی‌های سرطان",
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
    eyebrow: "حوزه‌ی تخصصی",
    heading: "سرطان پستان و جراحی آن",
    subtitle:
      "سرطان پستان شایع‌ترین سرطان زنان در جهان است. رویکرد دکتر معماری، ترکیب جراحی سرطان (برداشت کامل تومور) با تکنیک‌های انکوپلاستی و بازسازی است؛ تا درمان قطعی سرطان و حفظ ظاهر طبیعی پستان در یک طرح واحد انجام شود.",
    intro:
      "سرطان پستان در صورت تشخیص به‌موقع، یکی از قابل‌درمان‌ترین سرطان‌هاست. فاصله‌ی چشم‌گیر نتایج درمان میان کشورهای برخوردار و کم‌برخوردار بیشتر به دسترسی به غربالگری، تشخیص زودهنگام و درمان تیمی بازمی‌گردد تا تفاوت‌های زیستی. انتخاب تیم درست و طراحی دقیق عمل، به‌اندازه‌ی داروهای پس از جراحی اهمیت دارد.",
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
        name: "ماستکتومی (کامل، با حفظ پوست یا حفظ نوک پستان)",
        body: "برداشت کامل پستان در مواردی که جراحی پستان‌حفظ‌کننده مناسب نیست. نسخه‌های «حفظ پوست» و «حفظ نوک پستان» پوشش خارجی پستان را نگه می‌دارند تا بازسازی فوری با نتیجه‌ی زیبایی بهتری امکان‌پذیر باشد.",
        indication:
          "تومورهای بزرگ یا چندکانونی، DCIS وسیع، سرطان التهابی پستان، جهش‌های ژنتیکی پرخطر (مانند BRCA1/BRCA2) یا انتخاب آگاهانه‌ی بیمار.",
      },
      {
        name: "بازسازی انکوپلاستی",
        body: "ترکیب برداشت تومور با تکنیک‌های جراحی پلاستیک — بازآرایی بافت، جایگزینی حجم، متقارن‌سازی پستان سالم — در یک عمل واحد، تا پستان درمان‌شده شکلی طبیعی داشته باشد. بازسازی فوری یا تأخیری (با بافت خود بیمار یا ایمپلنت) در جلسه‌ی مشاوره با بیمار برنامه‌ریزی می‌شود.",
        indication:
          "نقص بزرگ ناشی از لامپکتومی، نسبت نامطلوب حجم تومور به حجم پستان، یا بیمارانی که علاوه بر درمان قطعی، اهمیت ویژه‌ای برای ظاهر نهایی قائل‌اند.",
      },
      {
        name: "بیوپسی گره‌ی سنتینل و جراحی هدفمند زیربغل",
        body: "شناسایی و برداشت نخستین گره (یا گره‌های) لنفاوی که مسیر تخلیه‌ی تومور هستند، برای بررسی درگیری غدد لنفاوی. در صورت پاک‌بودن این گره‌ها، از انجام تخلیه‌ی کامل غدد لنفاوی زیربغل (و عوارض آن) پرهیز می‌شود.",
        indication:
          "سرطان پستان با گره‌های لنفاوی از نظر بالینی منفی؛ نقشه‌برداری با رنگ‌های فلورسنت و رادیوایزوتوپ، دقت تشخیص را بالا می‌برد و خطر لنف‌ادم را کاهش می‌دهد.",
      },
    ],
    signsHeading: "چه زمانی باید به متخصص مراجعه کرد؟",
    signs: [
      "توده، سفتی یا ضخیم‌شدگی جدید در پستان یا زیربغل",
      "تغییر در اندازه، شکل یا بافت پوست پستان (فرورفتگی، چروک‌شدگی یا پوست پرتقالی)",
      "تغییر در نوک پستان — فرورفتگی، مسطح‌شدن، پوسته‌ریزی یا بثورات",
      "ترشح خودبه‌خودی و پایدار از نوک پستان، به‌ویژه اگر خونی یا تنها از یک مجرا باشد",
      "درد موضعی پایدار در پستان که با چرخه‌ی قاعدگی همراه نیست",
      "یافته‌ی مشکوک در ماموگرافی غربالگری، سونوگرافی یا MRI",
    ],
    signsFootnote:
      "بیشتر این یافته‌ها سرطان نیستند، اما همیشه باید ارزیابی شوند. ارزیابی زودهنگام طیف گزینه‌های درمانی را گسترش می‌دهد و معمولاً پیامد بلندمدت را بهتر می‌کند.",
    approachHeading: "رویکرد دکتر معماری",
    approachBody:
      "هر بیمار پیش از تعیین طرح عمل، در یک تیم چندتخصصی (جراحی، سرطان‌شناسی، رادیولوژی، پاتولوژی) بررسی می‌شود. هرجا که از نظر درمان سرطان امکان‌پذیر باشد، روش‌های پستان‌حفظ‌کننده و انکوپلاستی بر ماستکتومی ترجیح داده می‌شوند. در مواردی که ماستکتومی انتخاب درست است، رویکردهای «حفظ پوست» و «حفظ نوک پستان» همراه با بازسازی فوری، برای حفظ کیفیت زندگی در نظر گرفته می‌شود. پیگیری پس از عمل، مراقبت استاندارد را با ابزارهای پایش خودگزارش‌دهی بیمار — همان خط پژوهشی سلامت دیجیتال دکتر معماری — ترکیب می‌کند. برای زنان بدون علامت، **برنامه‌ی تشخیص زودهنگام بنیاد ملی سرطان پستان (NBCF)** و **به‌روزرسانی ۲۰۲۴ کارگروه خدمات پیشگیرانه‌ی آمریکا (USPSTF)** بر یک برنامه‌ی روشن همگرا هستند: خودآزمایی پستان به‌صورت ماهانه از سن ۲۰ سالگی، معاینه‌ی بالینی پستان هر یک تا سه سال در سنین ۲۰ تا ۳۹ (سالانه از ۴۰ به بعد)، و **ماموگرافی غربالگری هر دو سال یک‌بار از سن ۴۰ تا ۷۴ سالگی**. زنان در معرض خطر بالاتر — ناقلان جهش BRCA1/BRCA2، کسانی با سابقه‌ی خانوادگی قوی یا سابقه‌ی پرتودرمانی قفسه‌ی سینه — باید بنا بر توصیه‌ی انجمن سرطان آمریکا (ACS)، **MRI سالانه‌ی پستان را از سن ۳۰ سالگی همراه با ماموگرافی** انجام دهند.",
    cta: "مشاوره درباره‌ی پرونده",
    sourcesLabel: "ارقام از گزارش WHO در زمینه‌ی سرطان پستان و GLOBOCAN 2022. راهنمای غربالگری: بنیاد ملی سرطان پستان (NBCF؛ برنامه‌ی تشخیص زودهنگام)، کارگروه خدمات پیشگیرانه‌ی آمریکا (USPSTF ۲۰۲۴) و انجمن سرطان آمریکا (ACS).",
  },

  research: {
    eyebrow: "حوزه‌های پژوهشی",
    heading: "محورهای پژوهش",
    subtitle:
      "چهار محور به‌هم‌پیوسته: زیست‌شناسی سرطان و RNAهای غیرکدکننده، جراحی سرطان، ایمنی‌درمانی، و سلامت دیجیتال برای پیگیری بازماندگان.",
    cards: [
      {
        title: "زیست‌شناسی سرطان و RNAهای غیرکدکننده",
        body: "siRNA، microRNA، piRNA، lncRNA و شبکه‌های ceRNA در سرطان‌های روده‌ی بزرگ، معده، پستان و کلیه — هم به‌عنوان اهرم درمانی و هم نامزد نشانگر زیستی تشخیصی.",
      },
      {
        title: "جراحی سرطان",
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
    heading: "مقالات منتخب داوری‌شده",
    subtitleBefore: "قابل مرتب‌سازی و فیلتر بر اساس موضوع. برای درخواست متن کامل یا چاپ مجدد، لطفاً از ",
    subtitleLink: "فرم تماس",
    subtitleAfter: " استفاده کنید.",
    sortLabel: "ترتیب",
    sortMostCited: "پراستنادترین",
    sortMostRecent: "جدیدترین",
    topicLabel: "موضوع",
    topicAll: "همه‌ی موضوعات",
    topicLabels: {
      "surgical-oncology": "جراحی سرطان",
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
    eyebrow: "آموزش و فعالیت بالینی",
    heading: "آموزش، مراکز خدمت و سلامت عمومی",
    body1Before: "دکتر معماری به‌عنوان دانشیار و عضو هیئت علمی ",
    body1Middle:
      "، دانشجویان پزشکی و رزیدنت‌های جراحی را آموزش می‌دهد. فعالیت دولتی ایشان در ",
    body1After:
      " (مرکز اصلی ارجاع سرطان در ایران) و فعالیت خصوصی در بیمارستان‌های لاله و ساسان است. مطب شخصی ایشان در خیابان توانیر تهران، محل اصلی مشاوره و ویزیت بیماران غیربیمارستانی است.",
    body2:
      "دکتر معماری در برنامه‌های آگاهی‌بخشی سلامت عمومی نیز فعال است؛ از جمله در بیمارستان ساسان در چارچوب *هفته‌ی ملی سلامت مردان* ایران.",
    body3Before:
      "فهرست تفصیلی دروس، انتصابات بالینی و طرح‌های پژوهشی در حال آماده‌سازی است. در این فاصله، همکاران، کارآموزان و پژوهشگران مهمان می‌توانند ",
    body3Link: "تماس بگیرند",
    body3After: ".",
  },

  contact: {
    eyebrow: "تماس",
    heading: "تماس با ما",
    subtitle:
      "برای همکاری‌های پژوهشی، پرسش درباره‌ی مقالات، درخواست تحصیلی یا فلوشیپ، و دعوت برای سخنرانی. لطفاً از این فرم برای دریافت مشاوره‌ی پزشکی شخصی استفاده نکنید.",
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
    heading: "تازه‌ترین پیشرفت‌های سرطان پستان",
    subtitle:
      "گزیده‌ای از دستاوردهای سال‌های ۲۰۲۴–۲۰۲۵ در درمان، غربالگری و پایش سرطان پستان — همان خطوطی که در فعالیت بالینی دکتر معماری بیشترین اهمیت را دارند.",
    items: [
      {
        tag: "درمان HER2-پایین",
        year: "۲۰۲۴",
        title: "بازتعریف سرطان پستان متاستاتیک HER2-پایین با تراستوزوماب-دروکستکان",
        body: "نتایج فاز ۳ مطالعه‌ی DESTINY-Breast06 نشان داد که داروی تراستوزوماب-دروکستکان در سرطان پستان متاستاتیک HER2-پایین و حتی HER2-بسیارپایین با گیرنده‌ی هورمونی مثبت، بقای بدون پیشرفت بیماری را در مقایسه با شیمی‌درمانی بهبود می‌دهد — موضوعی که به گسترش مجوز دارو در چندین منطقه منجر شد.",
      },
      {
        tag: "ایمنی‌درمانی",
        year: "۲۰۲۵",
        title: "تأیید مزیت پنج‌ساله‌ی KEYNOTE-522 در TNBC",
        body: "پیگیری پنج‌ساله‌ی کارآزمایی KEYNOTE-522 نشان داد افزودن پمبرولیزوماب به شیمی‌درمانی نئوادجوانت در سرطان پستان سه‌گانه‌منفی مرحله اولیه، بقای بدون رویداد را به‌طور پایدار بهبود می‌بخشد و این رژیم را به استاندارد درمان در بیماری اولیه‌ی پرخطر تبدیل کرده است.",
      },
      {
        tag: "مهارکننده‌های PARP",
        year: "۲۰۲۵",
        title: "تأیید بلندمدت اولاپاریب در سرطان پستان BRCA-جهش‌یافته",
        body: "داده‌های به‌روزشده‌ی OlympiA نشان داد اولاپاریب کمکی همچنان در سرطان پستان اولیه‌ی پرخطر HER2-منفی با جهش زمینه‌ای BRCA1/2، بقای بدون بیماری مهاجم و بقای کلی را بهبود می‌دهد — تأییدی بر ضرورت آزمایش BRCA در این گروه از بیماران.",
      },
      {
        tag: "ماموگرافی هوش مصنوعی",
        year: "۲۰۲۵",
        title: "همتایی ماموگرافی به‌کمک هوش مصنوعی با خوانندگان متخصص در مقیاس بالا",
        body: "مطالعات گسترده در سوئد، آلمان و بریتانیا نشان داد ماموگرافی به‌کمک هوش مصنوعی، تعداد بیشتری سرطان را بدون افزایش مثبت‌های کاذب تشخیص می‌دهد و چندین نظام سلامت آن را به‌صورت روتین در کنار خوانش رادیولوژیست انسانی به کار گرفته‌اند.",
      },
      {
        tag: "پایش ctDNA",
        year: "۲۰۲۵",
        title: "تشخیص عود سرطان پستان توسط بیوپسی مایع، ماه‌ها پیش از تصویربرداری",
        body: "آزمایش‌های ctDNA اکنون می‌توانند عود مولکولی را در سرطان پستان مرحله اولیه ۶ تا ۱۲ ماه پیش از عود رادیوگرافیک تشخیص دهند و کارآزمایی‌های فاز ۳ در حال ارزیابی راهبردهای تشدید و کاهش درمان مبتنی بر ctDNA هستند.",
      },
    ],
    footnote:
      "برگرفته از گزارش‌های ASCO، SABCS، AACR و منابع داوری‌شده. نتایج کارآزمایی‌های منفرد جایگزین توصیه‌ی پزشکی نیستند.",
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
        a: "بله. دکتر معماری از همکاری در زیست‌شناسی سرطان (به‌ویژه RNAهای غیرکدکننده و شبکه‌های ceRNA)، جراحی سرطان، ایمنی‌درمانی و سلامت دیجیتال برای بازماندگان سرطان استقبال می‌کند. لطفاً فرضیه، نوع مطالعه و انتظار خود از همکاری را در پیام شرح دهید.",
      },
      {
        q: "آیا دانشجویان یا دستیاران فلوشیپ را راهنمایی می‌کنید؟",
        a: "دکتر معماری دانشجویان تحصیلات تکمیلی و دستیاران فلوشیپ بالینی فعال در پژوهش سرطان و جراحی سرطان در انستیتو کانسر ایران را راهنمایی می‌کند. لطفاً هنگام تماس، خلاصه‌ای از سوابق علمی و حوزه‌ی علاقه‌ی خود را پیوست کنید.",
      },
      {
        q: "آیا می‌توانم به آثار شما استناد یا از تصاویر آن‌ها استفاده کنم؟",
        a: "استناد همواره مورد استقبال است — لطفاً به نشریه‌ی اصلی فهرست‌شده ارجاع دهید. استفاده‌ی مجدد از تصاویر معمولاً نیازمند اجازه‌ی ناشر است؛ برای تصاویری که حق تکثیر آن‌ها در اختیار نویسندگان است، لطفاً مستقیماً با ما تماس بگیرید.",
      },
      {
        q: "آیا می‌توانید برای تشخیص شخصی من مشاوره‌ی پزشکی ارائه دهید؟",
        a: "متأسفانه خیر — این وب‌سایت نمی‌تواند مشاوره‌ی پزشکی شخصی ارائه دهد. لطفاً با پزشک متخصص سرطان معالج خود مشورت کنید یا برای دریافت خدمات بالینی با انستیتو کانسر ایران (دانشگاه علوم پزشکی تهران) تماس بگیرید.",
      },
      {
        q: "آیا برای سخنرانی‌های دعوتی یا مصاحبه در دسترس هستید؟",
        a: "بله، دکتر معماری از سخنرانی‌های دعوتی، میزگردها و مصاحبه‌های رسانه‌ای در حوزه‌ی پژوهش سرطان و جراحی سرطان استقبال می‌کند. لطفاً تاریخ، مخاطبان و قالب برنامه را در پیام خود بیان کنید.",
      },
    ],
  },

  footer: {
    tagline: "متخصص جراحی سرطان و پژوهشگر سرطان · دانشگاه علوم پزشکی تهران.",
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
      "سلام! می‌توانم در جهت‌یابی این سایت یا ارائه‌ی اطلاعات عمومی درباره‌ی کار دکتر معماری در جراحی سرطان کمک کنم. چه چیزی می‌خواهید بدانید؟",
    closeLabel: "بستن گفت‌وگو",
    disclaimer:
      "این دستیار توصیه‌ی پزشکی شخصی ارائه نمی‌دهد. برای پرسش‌های بالینی لطفاً با پزشک خود مشورت کنید.",
  },

  explore: {
    eyebrow: "بخش‌های سایت",
    heading: "کدام بخش را می‌خواهید ببینید؟",
    subtitle: "هر بخش صفحه‌ی اختصاصی خود را دارد؛ نزدیک‌ترین را به هدف‌تان انتخاب کنید.",
    cards: [
      {
        key: "breastCancer",
        title: "سرطان پستان",
        body: "آمار جهانی سرطان پستان، روش‌های جراحی (لامپکتومی، ماستکتومی، بازسازی انکوپلاستی و بیوپسی گره‌ی سنتینل) و نشانه‌های هشدار.",
        cta: "مطالعه‌ی بیشتر",
      },
      {
        key: "research",
        title: "پژوهش‌ها و مقالات",
        body: "چهار محور پژوهشی همراه با فهرست مقالات داوری‌شده، قابل جست‌وجو بر اساس موضوع.",
        cta: "مشاهده‌ی پژوهش‌ها",
      },
      {
        key: "advances",
        title: "دستاوردهای تازه",
        body: "پیشرفت‌های سال ۲۰۲۵ در درمان سرطان؛ از واکسن‌های mRNA و مهارکننده‌های KRAS تا CAR-T در تومورهای جامد و بیوپسی مایع با هوش مصنوعی.",
        cta: "مشاهده‌ی پیشرفت‌ها",
      },
      {
        key: "teaching",
        title: "آموزش و همکاری",
        body: "تدریس در دانشگاه علوم پزشکی تهران، راهنمایی دانشجویان و دستیاران فلوشیپ، پرسش‌های متداول، و فعالیت در حوزه‌ی سلامت عمومی.",
        cta: "اطلاعات بیشتر",
      },
      {
        key: "contact",
        title: "تماس",
        body: "فرم تماس، ایمیل و مشخصات مطب در ساختمان پزشکان توانیر؛ شامل آدرس و ساعات ویزیت.",
        cta: "تماس با ما",
      },
    ],
  },

  liveFeed: {
    eyebrow: "به‌روزرسانی زنده از PubMed",
    heading: "تازه‌ترین مقالات پژوهش سرطان پستان",
    subtitle:
      "مقالات تازه‌نمایه‌شده در سرطان پستان — درمان، غربالگری و کارآزمایی‌های بالینی — مستقیم از PubMed و با به‌روزرسانی هر چند ساعت یک‌بار.",
    sourceLabel: "منبع: PubMed",
    empty:
      "فید زنده موقتاً در دسترس نیست. می‌توانید از فهرست گزیده‌ی بالا استفاده کنید یا مستقیم به PubMed مراجعه کنید.",
    openPaper: "مشاهده در PubMed",
    openSearch: "باز کردن جست‌وجوی کامل در PubMed",
  },

  callButton: {
    label: "تماس",
  },

  clinicMap: {
    heading: "موقعیت مطب",
    subtitle:
      "ساختمان پزشکان توانیر، طبقه ۴، واحد ۱۹ — خیابان توانیر، نرسیده به بزرگراه همت، تهران.",
    iframeTitle: "نقشه‌ی مطب دکتر معماری در ساختمان پزشکان توانیر، تهران",
    openNeshan: "مشاهده در نشان",
    openGoogle: "مشاهده در گوگل مپ",
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
