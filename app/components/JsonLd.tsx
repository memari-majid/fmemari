import { SITE, SITE_URL, SCHOLAR_METRICS } from "@/lib/site";

export function JsonLd() {
  const sameAs = [SITE.scholar, SITE.orcid, SITE.scopus, SITE.researchgate]
    .filter((s): s is string => Boolean(s && s.length > 0));

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.fullName,
    alternateName: SITE.shortName,
    url: SITE_URL,
    jobTitle: "Surgical Oncologist & Cancer Researcher",
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    sameAs,
    worksFor: {
      "@type": "MedicalOrganization",
      name: SITE.affiliation,
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
      "Non-coding RNA (siRNA, microRNA, piRNA, lncRNA, ceRNA)",
      "Colorectal cancer",
      "Gastric cancer",
      "Breast cancer",
      "Renal cell carcinoma",
      "Head and neck oncology",
      "Cancer immunotherapy",
      "Digital health for cancer survivors",
    ],
    additionalProperty: [
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
