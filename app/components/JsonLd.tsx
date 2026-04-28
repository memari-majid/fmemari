import { CLINIC, SITE, SITE_URL, SCHOLAR_METRICS } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const PERSIAN_NAME = "دکتر فریدون معماری";
/** Persian name without the honorific — Iranians often search this way. */
const PERSIAN_NAME_BARE = "فریدون معماری";

export function JsonLd({ locale }: { locale: Locale }) {
  const sameAs = [
    SITE.scholar,
    SITE.orcid,
    SITE.scopus,
    SITE.researchgate,
    SITE.paziresh24,
    SITE.nobatIr,
  ].filter((s): s is string => Boolean(s && s.length > 0));

  // Cover every spelling people might search for — Latin script (with and
  // without the "Dr." prefix), the alternate transliteration "Fereydoon",
  // and Persian script (with and without "دکتر"). Helps Google associate
  // every variant with the same Person and surface the FA site for Persian
  // queries.
  const primaryName = locale === "fa" ? PERSIAN_NAME : SITE.fullName;
  const alternateNames = [
    SITE.fullName,
    SITE.shortName,
    SITE.nameAlternate,
    "Fereydoon Memari",
    PERSIAN_NAME,
    PERSIAN_NAME_BARE,
  ].filter((n) => n !== primaryName);

  const data = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}#person`,
    name: primaryName,
    alternateName: alternateNames,
    honorificPrefix: SITE.honorific,
    url: locale === "fa" ? `${SITE_URL}/fa` : SITE_URL,
    mainEntityOfPage: locale === "fa" ? `${SITE_URL}/fa` : SITE_URL,
    inLanguage: locale === "fa" ? "fa-IR" : "en",
    nationality: { "@type": "Country", name: "Iran" },
    image: `${SITE_URL}/fereidoon-memari.jpg`,
    jobTitle:
      locale === "fa"
        ? SITE.jobTitleFa
        : `${SITE.academicRank}, Surgical Oncologist`,
    description: locale === "fa" ? SITE.descriptionFa : SITE.description,
    email: `mailto:${SITE.email}`,
    sameAs,
    medicalSpecialty: SITE.specialties,
    worksFor: {
      "@type": "MedicalOrganization",
      name: `${SITE.affiliation}, ${SITE.affiliationDetail}`,
      url: SITE.affiliationUrl,
      parentOrganization: {
        "@type": "CollegeOrUniversity",
        name: SITE.affiliationParent,
        url: SITE.affiliationParentUrl,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.addressLocality,
        addressCountry: SITE.addressCountry,
      },
    },
    hasPOS: {
      "@type": "MedicalClinic",
      name:
        locale === "fa"
          ? "مطب دکتر فریدون معماری — ساختمان پزشکان توانیر"
          : "Dr. Fereidoon Memari's Office — Tavanir Physicians Building",
      telephone: CLINIC.phone,
      hasMap: CLINIC.mapsUrl,
      url: CLINIC.mapsUrl,
      openingHours: "Su,Tu,Th 16:00-18:00",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          locale === "fa" ? CLINIC.addressFa : CLINIC.addressEn,
        addressLocality: SITE.addressLocality,
        addressCountry: SITE.addressCountry,
      },
    },
    knowsAbout: [
      "Cancer biology",
      "Surgical oncology",
      "Breast cancer surgery",
      "Gastrointestinal cancer surgery",
      "Thyroid cancer surgery",
      "Oncoplastic surgery",
      "Reconstructive surgery",
      "Laparoscopic surgery",
      "Vascular surgery",
      "Non-coding RNA (siRNA, microRNA, piRNA, lncRNA, ceRNA)",
      "Cancer immunotherapy",
      "Digital health for cancer survivors",
    ],
    knowsLanguage: ["en", "fa"],
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Cancer surgery",
        procedureType: "Surgical",
        bodyLocation: ["Breast", "Stomach", "Colon", "Thyroid"],
      },
      {
        "@type": "MedicalProcedure",
        name: "Oncoplastic and reconstructive surgery",
        procedureType: "Surgical",
        bodyLocation: ["Breast", "Abdomen"],
      },
      {
        "@type": "MedicalProcedure",
        name: "Laparoscopic and minimally invasive surgery",
        procedureType: "Surgical",
      },
      {
        "@type": "MedicalProcedure",
        name: "Vascular procedures",
        procedureType: "Surgical",
      },
    ],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Medical license number",
        value: SITE.licenseNumber,
      },
      {
        "@type": "PropertyValue",
        name: "Practicing since",
        value: SITE.practiceSince,
      },
      {
        "@type": "PropertyValue",
        name: "h-index",
        value: SCHOLAR_METRICS.hIndex,
      },
      {
        "@type": "PropertyValue",
        name: "i10-index",
        value: SCHOLAR_METRICS.i10Index,
      },
      {
        "@type": "PropertyValue",
        name: "Total citations",
        value: SCHOLAR_METRICS.citationsTotal,
      },
    ],
  };

  // Locale-specific WebSite + WebPage nodes so Google reads each /fa URL
  // as authoritative Persian content and each / URL as authoritative English,
  // both pointing at the same Person via @id.
  const pageUrl = locale === "fa" ? `${SITE_URL}/fa` : SITE_URL;
  const pageLanguage = locale === "fa" ? "fa-IR" : "en";
  const pageName =
    locale === "fa"
      ? "دکتر فریدون معماری — جراح سرطان پستان"
      : `${SITE.fullName} — Breast Cancer Surgeon`;

  const siteAndPage = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE.fullName,
        alternateName: PERSIAN_NAME,
        inLanguage: ["en", "fa-IR"],
        publisher: { "@id": `${SITE_URL}#person` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageName,
        inLanguage: pageLanguage,
        isPartOf: { "@id": `${SITE_URL}#website` },
        about: { "@id": `${SITE_URL}#person` },
        primaryImageOfPage: `${SITE_URL}/fereidoon-memari.jpg`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteAndPage) }}
      />
    </>
  );
}
