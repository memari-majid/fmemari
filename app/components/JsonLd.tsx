import { SITE, SITE_URL, SCHOLAR_METRICS } from "@/lib/site";

export function JsonLd() {
  const sameAs = [
    SITE.scholar,
    SITE.orcid,
    SITE.scopus,
    SITE.researchgate,
    SITE.paziresh24,
    SITE.nobatIr,
  ].filter((s): s is string => Boolean(s && s.length > 0));

  const data = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: SITE.fullName,
    alternateName: [SITE.shortName, SITE.nameAlternate],
    honorificPrefix: SITE.honorific,
    url: SITE_URL,
    image: `${SITE_URL}/fereidoon-memari.jpg`,
    jobTitle: `${SITE.academicRank}, Surgical Oncologist`,
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    sameAs,
    medicalSpecialty: SITE.specialties,
    worksFor: {
      "@type": "MedicalOrganization",
      name: `${SITE.affiliation}, ${SITE.affiliationDetail}`,
      parentOrganization: {
        "@type": "CollegeOrUniversity",
        name: SITE.affiliationParent,
        url: "https://en.tums.ac.ir/",
      },
      address: {
        "@type": "PostalAddress",
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
        name: "Years of professional experience",
        value: SITE.experienceYears,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
