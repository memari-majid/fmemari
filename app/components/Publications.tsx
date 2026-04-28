"use client";

import { useMemo, useState } from "react";
import {
  PUBLICATIONS,
  publicationsSortedByCitations,
  publicationsSortedByYear,
  type Publication,
  type ResearchTopic,
} from "@/lib/publications";
import { formatNumber, type Dictionary, type Locale } from "@/lib/i18n";

type SortKey = "citations" | "year";
type TopicFilter = ResearchTopic | "all";

const TOPIC_OPTIONS: TopicFilter[] = [
  "all",
  "surgical-oncology",
  "ncrna",
  "cancer-biology",
  "immunotherapy",
  "digital-health",
  "neuropathic-pain",
  "anesthesia",
];

function PubItem({
  p,
  t,
  locale,
}: {
  p: Publication;
  t: Dictionary["publications"];
  locale: Locale;
}) {
  return (
    <li className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:gap-5">
      <div className="flex shrink-0 flex-row items-center gap-3 sm:w-32 sm:flex-col sm:items-end sm:gap-1 sm:text-end">
        <span className="text-2xl font-bold tabular-nums text-pink-600 dark:text-pink-400">
          {p.citations === null ? "—" : formatNumber(p.citations, locale)}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          {p.citations === null ? t.newPreprintLabel : t.citationsLabel}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500" dir="ltr">
          {p.year}
          {p.venue ? ` · ${p.venue}` : ""}
        </p>
        <h3
          className="mt-1 text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-100"
          dir="ltr"
        >
          {p.url ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-pink-700 dark:hover:text-pink-400"
            >
              {p.title}
            </a>
          ) : (
            p.title
          )}
        </h3>
        {p.authors ? (
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-500" dir="ltr">
            {p.authors}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.topic.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-600 dark:border-zinc-700/80 dark:bg-zinc-800/60 dark:text-zinc-400"
            >
              {t.topicLabels[topic]}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

export function Publications({
  t,
  locale,
}: {
  t: Dictionary["publications"];
  locale: Locale;
}) {
  const [sortBy, setSortBy] = useState<SortKey>("citations");
  const [topic, setTopic] = useState<TopicFilter>("all");

  const list = useMemo(() => {
    const sorted =
      sortBy === "citations"
        ? publicationsSortedByCitations()
        : publicationsSortedByYear();
    if (topic === "all") return sorted;
    return sorted.filter((p) => p.topic.includes(topic));
  }, [sortBy, topic]);

  const topicLabel = (key: TopicFilter): string =>
    key === "all" ? t.topicAll : t.topicLabels[key];

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-500">
          <span className="font-medium uppercase tracking-wider">
            {t.sortLabel}
          </span>
          <div className="inline-flex overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => setSortBy("citations")}
              className={`px-3 py-1.5 text-xs font-medium transition ${
                sortBy === "citations"
                  ? "bg-pink-600 text-white"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {t.sortMostCited}
            </button>
            <button
              type="button"
              onClick={() => setSortBy("year")}
              className={`px-3 py-1.5 text-xs font-medium transition ${
                sortBy === "year"
                  ? "bg-pink-600 text-white"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {t.sortMostRecent}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-500">
          <label
            htmlFor="topic-filter"
            className="font-medium uppercase tracking-wider"
          >
            {t.topicLabel}
          </label>
          <select
            id="topic-filter"
            value={topic}
            onChange={(e) => setTopic(e.target.value as TopicFilter)}
            className="min-h-[36px] rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-800 focus:border-pink-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200"
          >
            {TOPIC_OPTIONS.map((key) => (
              <option key={key} value={key}>
                {topicLabel(key)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
        {t.showingPrefix}
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          {formatNumber(list.length, locale)}
        </span>
        {t.showingMiddle}
        {formatNumber(PUBLICATIONS.length, locale)}
        {t.showingSuffix}
      </p>

      {list.length === 0 ? (
        <p className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-600 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:text-zinc-400">
          {t.noMatches}
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {list.map((p) => (
            <PubItem
              key={`${p.year}-${p.title}`}
              p={p}
              t={t}
              locale={locale}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
