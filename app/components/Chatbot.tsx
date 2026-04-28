"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

type ChatbotStrings = {
  launcherLabel: string;
  title: string;
  subtitle: string;
  placeholder: string;
  send: string;
  greeting: string;
  sending: string;
  closeLabel: string;
  disclaimer: string;
};

/**
 * Floating chat assistant backed by the Vercel AI Gateway.
 *
 * Renders a pill-shaped launcher in the corner that opens a small chat
 * panel. Messages stream from /api/chat, which calls Claude via the
 * Gateway. Intentionally minimal — no history persistence, no file
 * uploads, no markdown rendering — since the main job is quick Q&A.
 */
export function Chatbot({
  locale,
  t,
}: {
  locale: Locale;
  t: ChatbotStrings;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isBusy = status === "submitted" || status === "streaming";

  // Auto-scroll to the latest message whenever content updates.
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, status]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isBusy) return;
    void sendMessage({ text: trimmed });
    setInput("");
  };

  // RTL sites anchor the launcher on the left edge so it doesn't collide
  // with the language / scroll-to-top button cluster on the right.
  const anchorClass =
    locale === "fa" ? "left-4 sm:left-6" : "right-4 sm:right-6";

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.launcherLabel}
        aria-expanded={open}
        className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] ${anchorClass} z-40 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/30 transition hover:bg-green-500 motion-safe:animate-[pulse_3s_ease-in-out_infinite]`}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
        </svg>
        <span>{t.launcherLabel}</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className={`fixed bottom-[calc(max(1rem,env(safe-area-inset-bottom))+72px)] ${anchorClass} z-40 flex h-[min(32rem,calc(100dvh-9rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950`}
          role="dialog"
          aria-label={t.title}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-zinc-200 bg-gradient-to-br from-green-50 to-emerald-50 px-4 py-3 dark:border-zinc-800 dark:from-green-950/40 dark:to-emerald-950/40">
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t.title}
              </p>
              <p className="text-[11px] leading-snug text-zinc-600 dark:text-zinc-400">
                {t.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.closeLabel}
              className="-me-1 -mt-1 rounded-md p-1.5 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm"
          >
            {messages.length === 0 && (
              <div className="rounded-xl bg-zinc-100 px-3 py-2 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {t.greeting}
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "ms-auto max-w-[85%] rounded-xl bg-green-600 px-3 py-2 text-white"
                    : "me-auto max-w-[85%] rounded-xl bg-zinc-100 px-3 py-2 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                }
              >
                {m.parts.map((part, i) =>
                  part.type === "text" ? (
                    <span key={i} className="whitespace-pre-wrap">
                      {part.text}
                    </span>
                  ) : null,
                )}
              </div>
            ))}
            {status === "submitted" && (
              <div className="me-auto inline-flex items-center gap-1 rounded-xl bg-zinc-100 px-3 py-2 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500">
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0s]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0.15s]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0.3s]" />
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={submit}
            className="flex items-center gap-2 border-t border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              disabled={isBusy}
              className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-green-500 focus:outline-none disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />
            <button
              type="submit"
              disabled={isBusy || input.trim().length === 0}
              className="shrink-0 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBusy ? t.sending : t.send}
            </button>
          </form>
          <p className="border-t border-zinc-200 bg-zinc-50 px-4 py-2 text-[10px] leading-snug text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-500">
            {t.disclaimer}
          </p>
        </div>
      )}
    </>
  );
}
