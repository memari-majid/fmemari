"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-base text-zinc-900 placeholder:text-zinc-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 sm:text-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100 dark:placeholder:text-zinc-500";

export function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [autoReply, setAutoReply] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setCategory(null);
    setAutoReply(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          source: "contact-form",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        category?: string;
        autoReply?: string;
      };
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          typeof data.error === "string" ? data.error : "Something went wrong.",
        );
        return;
      }
      setStatus("success");
      if (typeof data.category === "string") setCategory(data.category);
      if (typeof data.autoReply === "string") setAutoReply(data.autoReply);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg(t.networkError);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >
            {t.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder={t.namePlaceholder}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >
            {t.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder={t.emailPlaceholder}
            dir="ltr"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400"
        >
          {t.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
          placeholder={t.messagePlaceholder}
        />
      </div>
      <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
        {t.disclaimer}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60"
        >
          {status === "loading" ? t.submitting : t.submit}
        </button>
        {status === "success" && (
          <div className="w-full space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-start dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400">
              {t.successHeading}
            </p>
            {category && (
              <p className="text-xs text-zinc-600 dark:text-zinc-500">
                {t.routedAs}{" "}
                <span className="font-medium text-zinc-800 dark:text-zinc-300">
                  {t.categoryLabels[category] ?? category}
                </span>
              </p>
            )}
            {autoReply && (
              <p className="border-t border-zinc-200 pt-3 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800/80 dark:text-zinc-300">
                {autoReply}
              </p>
            )}
          </div>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
        )}
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-600">
        {t.preferEmail}{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="break-all text-emerald-600 hover:underline dark:text-emerald-400"
          dir="ltr"
        >
          {SITE.emailDisplay}
        </a>
        .
      </p>
    </form>
  );
}
