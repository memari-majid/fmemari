"use client";

import { useState } from "react";

const FAQS = [
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
];

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-zinc-200 dark:divide-zinc-800/60">
      {FAQS.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:text-base">
                {faq.q}
              </span>
              <svg
                className={`h-5 w-5 shrink-0 text-sky-600 transition-transform duration-300 dark:text-sky-400 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-[min(28rem,70vh)] pb-5" : "max-h-0"
              }`}
            >
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
