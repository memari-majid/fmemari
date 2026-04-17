"use client";

import { useMemo, useState } from "react";
import {
  PUBLICATIONS,
  TOPIC_LABEL,
  publicationsSortedByCitations,
  publicationsSortedByYear,
  type Publication,
  type ResearchTopic,
} from "@/lib/publications";

type SortKey = "citations" | "year";
type TopicFilter = ResearchTopic | "all";

const TOPIC_OPTIONS: TopicFilter[] = [
  "all",
  ...(Object.keys(TOPIC_LABEL) as ResearchTopic[]),
];

function topicLabel(t: TopicFilter) {
  return t === "all" ? "All topics" : TOPIC_LABEL[t];
}

function PubItem({ p }: { p: Publication }) {
  return (
    <li className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:gap-5">
      <div className="flex shrink-0 flex-row items-center gap-3 sm:w-32 sm:flex-col sm:items-end sm:gap-1 sm:text-right">
        <span className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
          {p.citations ?? "—"}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          {p.citations === null ? "new / preprint" : "citations"}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
          {p.year}
          {p.venue ? ` · ${p.venue}` : ""}
        </p>
        <h3 className="mt-1 text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
          {p.url ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-emerald-700 dark:hover:text-emerald-400"
            >
              {p.title}
            </a>
          ) : (
            p.title
          )}
        </h3>
        {p.authors ? (
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-500">
            {p.authors}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.topic.map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-600 dark:border-zinc-700/80 dark:bg-zinc-800/60 dark:text-zinc-400"
            >
              {TOPIC_LABEL[t]}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

export function Publications() {
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

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-500">
          <span className="font-medium uppercase tracking-wider">Sort</span>
          <div className="inline-flex overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => setSortBy("citations")}
              className={`px-3 py-1.5 text-xs font-medium transition ${
                sortBy === "citations"
                  ? "bg-emerald-600 text-white"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              Most cited
            </button>
            <button
              type="button"
              onClick={() => setSortBy("year")}
              className={`px-3 py-1.5 text-xs font-medium transition ${
                sortBy === "year"
                  ? "bg-emerald-600 text-white"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              Most recent
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-500">
          <label
            htmlFor="topic-filter"
            className="font-medium uppercase tracking-wider"
          >
            Topic
          </label>
          <select
            id="topic-filter"
            value={topic}
            onChange={(e) => setTopic(e.target.value as TopicFilter)}
            className="min-h-[36px] rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-800 focus:border-emerald-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200"
          >
            {TOPIC_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {topicLabel(t)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
        Showing{" "}
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          {list.length}
        </span>{" "}
        of {PUBLICATIONS.length} publications. Citation counts are pulled from
        Google Scholar and may lag the latest indexing.
      </p>

      {list.length === 0 ? (
        <p className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-600 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:text-zinc-400">
          No publications match this filter.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {list.map((p) => (
            <PubItem key={`${p.year}-${p.title}`} p={p} />
          ))}
        </ul>
      )}
    </div>
  );
}
