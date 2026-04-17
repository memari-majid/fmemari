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
 * Persian translations: produced from the English source with care for
 * medical terminology, but should be reviewed by Dr. Memari (or any native
 * Persian speaker familiar with surgical-oncology vocabulary) before being
 * treated as final.
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
    feedback: {
      eyebrow: string;
      bodyPrefix: string;
      bodySuffix: string;
      footnote: string;
    };
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
    };
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
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Research", href: "#research" },
      { label: "Publications", href: "#publications" },
      { label: "Teaching", href: "#teaching" },
      { label: "Contact", href: "#contact" },
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
    feedback: {
      eyebrow: "Patient experience",
      bodyPrefix: "Patients on ",
      bodySuffix:
        " describe Dr. Memari as a highly skilled and conscientious surgeon, highlighting his clear communication throughout the treatment process and his successful outcomes — particularly in breast and gastric cancer cases.",
      footnote:
        "Summarized from third-party patient platforms; this site does not host or moderate individual reviews.",
    },
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
    },
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
};

// ─────────────────────────────────────────────────────────────────────────────
// Persian (Farsi) dictionary
// ─────────────────────────────────────────────────────────────────────────────
//
// Translation notes:
//   • "دانشیار" = Associate Professor (academic rank)
//   • "متخصص جراحی انکولوژی" = Surgical Oncology specialist; "جراحی سرطان" =
//     cancer surgery (more accessible phrasing)
//   • "انستیتو کانسر" is the official transliteration used by TUMS for the
//     Cancer Institute (مرکز تخصصی سرطان); we use it for consistency with the
//     institution's English name
//   • Numerals are rendered with Persian digits (۰۱۲۳۴۵۶۷۸۹) where they appear
//     in prose; bibliographic citation counts in the publications list use
//     Western digits to stay consistent with the underlying Scholar data
//   • The translation should be reviewed by a native Persian speaker familiar
//     with surgical-oncology vocabulary before being treated as final.

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const toFaDigits = (n: number | string): string =>
  String(n).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);

export const fa: Dictionary = {
  locale: "fa",
  direction: "rtl",
  htmlLang: "fa-IR",

  nav: {
    items: [
      { label: "درباره", href: "#about" },
      { label: "تخصص‌ها", href: "#services" },
      { label: "پژوهش", href: "#research" },
      { label: "مقالات", href: "#publications" },
      { label: "تدریس", href: "#teaching" },
      { label: "تماس", href: "#contact" },
    ],
    cta: "تماس با ما",
    toggleLabel: "English",
    togglePath: "/",
    toggleAria: "Switch to English",
    monogramLine1: "دکتر",
    monogramLine2: "مماری",
  },

  hero: {
    role: "دانشیار · متخصص جراحی انکولوژی · پژوهشگر سرطان",
    title: "دکتر فریدون مماری",
    affiliation: "انستیتو کانسر ایران",
    affiliationDetail: "مجتمع بیمارستانی امام خمینی",
    affiliationParent: "دانشگاه علوم پزشکی تهران",
    locationSuffix: "تهران، ایران",
    description: (years) =>
      `دانشیار جراحی با بیش از **${toFaDigits(years)} سال** سابقه‌ی حرفه‌ای جراحی. پژوهش ترجمانی در تلاقی زیست‌شناسی سرطان، RNAهای غیرکدکننده، جراحی انکولوژی، ایمنی‌درمانی و سلامت دیجیتال برای بازماندگان سرطان.`,
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
    heading: "درباره‌ی دکتر مماری",
    badge: (years) => `${toFaDigits(years)}+ سال`,
    refClinical: "فعالیت بالینی",
    refAcademic: "سمت دانشگاهی",
    bio: {
      affiliationLine:
        "دکتر فریدون مماری **دانشیار جراحی** در {{tums}} و متخصص جراحی انکولوژی در {{cancerInstitute}} است. با بیش از **{{years}} سال سابقه‌ی حرفه‌ای جراحی**، فعالیت بالینی ایشان شامل موارد پیچیده‌ی سرطان و اعمال جراحی ترکیبی در سرطان‌های دستگاه گوارش، سر و گردن، پستان و کلیه است.",
      experienceLine: "",
      researchLine:
        "پژوهش ترجمانی ایشان بر نقش RNAهای غیرکدکننده — siRNA، microRNA، piRNA، lncRNA و شبکه‌های ceRNA — به‌عنوان اهداف درمانی و نشانگرهای زیستی نامزد در سرطان متمرکز است. کار اخیر همچنین به ایمنی‌درمانی سرطان، طراحی پروتئین‌های چیمریک، و استفاده از سامانه‌های مبتنی بر تلفن همراه و IoT برای پایش از راه دور بازماندگان سرطان می‌پردازد.",
      publicationsLine:
        "مقالات ایشان در نشریات داور-پسند منتشر شده است، از جمله *International Journal of Nanomedicine*، *Journal of Cellular Biochemistry*، *Computers in Biology and Medicine*، *JMIR Cancer*، و *Journal of Oral and Maxillofacial Surgery*.",
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
    eyebrow: "فعالیت بالینی",
    heading: "تخصص‌ها و خدمات بالینی",
    subtitleBefore:
      "سه حوزه‌ی تمرکز در جراحی سرطان، بازسازی انکوپلاستیک، و جراحی کم‌تهاجمی — در ",
    subtitleAfter: ".",
    cards: [
      {
        title: "جراحی سرطان",
        body: "تمرکز تخصصی بر سرطان‌های پستان، دستگاه گوارش و تیروئید — از مرحله‌بندی تا برداشتن قطعی و اعمال جراحی ترکیبی در موارد پیچیده.",
        bullets: ["سرطان پستان", "سرطان معده", "سرطان روده‌ی بزرگ", "سرطان تیروئید"],
      },
      {
        title: "جراحی انکوپلاستیک و بازسازی",
        body: "تلفیق برداشت تومور با تکنیک‌های زیبایی و بازسازی — به‌ویژه در انکوپلاستی پستان و اعمال شکمی — تا نتایج انکولوژیک و کیفیت زندگی همزمان ارتقا یابند.",
        bullets: ["انکوپلاستی پستان", "جراحی زیبایی شکم"],
      },
      {
        title: "تکنیک‌های پیشرفته‌ی جراحی",
        body: "رویکردهای کم‌تهاجمی (لاپاراسکوپی) و اعمال جراحی عروقی، در جراحی عمومی و موارد پیچیده‌ی انکولوژیک.",
        bullets: ["لاپاراسکوپی / کم‌تهاجمی", "اعمال جراحی عروقی"],
      },
    ],
    feedback: {
      eyebrow: "بازخورد بیماران",
      bodyPrefix: "بیماران در سامانه‌های ",
      bodySuffix:
        " دکتر مماری را جراحی ماهر و وظیفه‌شناس توصیف می‌کنند و بر شفافیت ارتباط ایشان در طول روند درمان و موفقیت نتایج جراحی — به‌ویژه در سرطان پستان و معده — تأکید می‌کنند.",
      footnote:
        "خلاصه‌ای از سامانه‌های شخص ثالث؛ این وب‌سایت بازخوردهای فردی را میزبانی یا ویرایش نمی‌کند.",
    },
  },

  research: {
    eyebrow: "حوزه‌های پژوهشی",
    heading: "محورهای پژوهش",
    subtitle:
      "چهار محور پژوهشی به‌هم‌پیوسته — زیست‌شناسی پایه‌ی سرطان، عمل جراحی، ایمنی‌درمانی، و پیگیری دیجیتال.",
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
        body: "پایش از راه دور مبتنی بر تلفن همراه و IoT برای بازماندگان سرطان روده‌ی بزرگ، با ورود نتایج گزارش‌شده توسط بیمار و داده‌های پیوسته به پیگیری بالینی.",
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
    eyebrow: "تدریس و کار بالینی",
    heading: "راهنمایی و فعالیت بالینی",
    body1Before: "به‌عنوان دانشیار در ",
    body1Middle: "، دکتر مماری دانشجویان تحصیلات تکمیلی، رزیدنت‌های جراحی و فلوها را تدریس و راهنمایی می‌کند. فعالیت بالینی و سرپرستی کارآموزان در ",
    body1After: " انجام می‌شود.",
    body2:
      "علاوه بر کار بالینی و دانشگاهی، دکتر مماری در برنامه‌های آگاهی‌بخشی سلامت عمومی نیز مشارکت می‌کند — برای نمونه، برنامه‌های بیمارستان ساسان در *هفته‌ی ملی سلامت مردان* ایران.",
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
      preferEmail: "ایمیل را ترجیح می‌دهید؟ با دکتر مماری تماس بگیرید:",
      networkError: "خطای شبکه. لطفاً دوباره تلاش کنید یا مستقیماً ایمیل بزنید.",
    },
    cards: {
      emailLabel: "ایمیل",
      emailNote: "پاسخ‌گویی متناسب با برنامه‌ی دکتر مماری انجام می‌شود.",
      affiliationLabel: "محل خدمت",
      locationLine: "تهران، ایران",
    },
  },

  faq: {
    heading: "پرسش‌های متداول",
    items: [
      {
        q: "چگونه می‌توانم متن کامل یا چاپ مجدد یک مقاله را درخواست کنم؟",
        a: "بیشتر مقالات فهرست‌شده شامل پیوند به نشریه یا DOI هستند. اگر از طریق دانشگاه خود به مقاله دسترسی ندارید، لطفاً با اشاره به عنوان مقاله از فرم تماس استفاده کنید — دکتر مماری در صورت اجازه‌ی ناشر، با کمال میل نسخه‌ی شخصی را در اختیار قرار می‌دهد.",
      },
      {
        q: "آیا برای همکاری پژوهشی در دسترس هستید؟",
        a: "بله. دکتر مماری از همکاری در زیست‌شناسی سرطان (به‌ویژه RNAهای غیرکدکننده و شبکه‌های ceRNA)، جراحی انکولوژی، ایمنی‌درمانی و سلامت دیجیتال برای بازماندگان سرطان استقبال می‌کند. لطفاً فرضیه، نوع مطالعه و انتظار خود از همکاری را در پیام شرح دهید.",
      },
      {
        q: "آیا دانشجویان یا فلوها را راهنمایی می‌کنید؟",
        a: "دکتر مماری دانشجویان تحصیلات تکمیلی و فلوهای بالینی فعال در پژوهش سرطان و جراحی انکولوژی در انستیتو کانسر ایران را راهنمایی می‌کند. لطفاً هنگام تماس، خلاصه‌ای از CV و حوزه‌ی علاقه‌ی خود را پیوست کنید.",
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
        a: "بله، دکتر مماری از سخنرانی‌های دعوتی، میزگردها و مصاحبه‌های رسانه‌ای در حوزه‌ی پژوهش سرطان و جراحی انکولوژی استقبال می‌کند. لطفاً تاریخ، مخاطبان و قالب برنامه را در پیام خود بیان کنید.",
      },
    ],
  },

  footer: {
    tagline: "متخصص جراحی انکولوژی و پژوهشگر سرطان · دانشگاه علوم پزشکی تهران.",
    profilesLabel: "پروفایل‌ها",
    copyright: (year) =>
      `© ${toFaDigits(year)} دکتر فریدون مماری · تهران، ایران`,
    disclaimer:
      "این وب‌سایت صرفاً با اهداف علمی و اطلاع‌رسانی است و توصیه‌ی پزشکی ارائه نمی‌دهد.",
    locationSuffix: "تهران، ایران",
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
