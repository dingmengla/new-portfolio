"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { easeTween, springBounce } from "@/lib/animations";
import type { ObserveArticle } from "@/lib/observe";

interface ArticleDetailModalProps {
  article: ObserveArticle;
  onClose: () => void;
  onNavigateNext?: () => void;
}

export function ArticleDetailModal({
  article,
  onClose,
  onNavigateNext,
}: ArticleDetailModalProps) {
  const articleRef = useRef<HTMLElement>(null);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const el = articleRef.current;
    if (!el || !onNavigateNext) return;

    triggeredRef.current = false;

    const canNavigate = (deltaY: number) => {
      if (triggeredRef.current || deltaY <= 0) return false;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
      const noOverflow = el.scrollHeight <= el.clientHeight + 20;
      return atBottom || noOverflow;
    };

    const navigate = (deltaY: number) => {
      if (!canNavigate(deltaY)) return;
      triggeredRef.current = true;
      onNavigateNext();
    };

    const onWheel = (e: WheelEvent) => {
      if (!canNavigate(e.deltaY)) return;
      e.preventDefault();
      navigate(e.deltaY);
    };

    let lastTouchY = 0;

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentY;
      lastTouchY = currentY;
      navigate(deltaY);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [onNavigateNext]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={easeTween}
        className="fixed inset-0 z-[110]"
        style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        onClick={onClose}
      />

      <div className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center p-4">
        <motion.article
          ref={articleRef}
          layoutId={`observe-article-${article.id}`}
          transition={springBounce}
          className="pointer-events-auto relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-neutral-700 bg-[#1a1a1a] p-8 md:p-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="absolute right-5 top-5 rounded-full border border-neutral-700 p-2 text-neutral-400 transition-colors hover:border-neutral-500 hover:text-neutral-100"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M11 3L3 11M3 3l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <p className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
            {article.media}
            {article.views ? ` · 阅读量 ${article.views}` : ""} · {article.publishedAt}
          </p>

          <h2 className="mt-3 pr-8 font-display text-xl font-semibold text-neutral-50 md:text-2xl">
            {article.title.replace(/[《》]/g, "")}
          </h2>
          <p className="mt-1 text-sm italic text-neutral-500">{article.titleEn}</p>

          <div className="mt-6 hidden space-y-4 md:block">
            {article.quotes.map((quote, i) => (
              <blockquote
                key={i}
                className="border-l-2 border-neutral-700 pl-4 font-display text-[21px] font-bold leading-relaxed text-neutral-200 md:text-2xl"
              >
                &ldquo;{quote}&rdquo;
              </blockquote>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-neutral-400">{article.summary}</p>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-neutral-300 transition-colors hover:text-white"
          >
            click here →
          </a>
        </motion.article>
      </div>
    </>
  );
}
