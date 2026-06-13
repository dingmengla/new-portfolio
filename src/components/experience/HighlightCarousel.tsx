"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChapterHeader } from "@/components/layout/ChapterHeader";
import { springDefault } from "@/lib/animations";
import { highlights, type Highlight } from "@/lib/data";
import { cn } from "@/lib/utils";

const AUTO_PLAY_MS = 2000;

function HighlightImageCard({
  item,
  className,
  priority = false,
}: {
  item: Highlight;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/10 backdrop-blur-sm md:rounded-[2rem]",
        className
      )}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          priority={priority}
          className={cn(
            "origin-center object-contain",
            item.imageScale && "will-change-transform"
          )}
          style={
            item.imageScale
              ? { transform: `scale(${item.imageScale})` }
              : undefined
          }
          sizes="100vw"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-neutral-800/80 bg-neutral-950/75 px-6 py-4 backdrop-blur-sm md:px-8 md:py-5">
        <p className="font-display text-lg font-semibold text-neutral-100 md:text-xl">
          {item.caption}
        </p>
        <p className="mt-1 font-mono text-xs text-neutral-500">{item.captionEn}</p>
      </div>
    </div>
  );
}

const flipVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 72 : -72,
    opacity: 0,
    x: direction > 0 ? 48 : -48,
    scale: 0.96,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    x: 0,
    scale: 1,
    transition: springDefault,
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -72 : 72,
    opacity: 0,
    x: direction > 0 ? -48 : 48,
    scale: 0.96,
  }),
};

// 高光图片轮播 — 自动循环播放
export function HighlightCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const total = highlights.length;

  const paginate = useCallback(
    (step: number) => {
      setDirection(step > 0 ? 1 : -1);
      setIndex((prev) => (prev + step + total) % total);
    },
    [total]
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      const normalized = ((nextIndex % total) + total) % total;
      if (normalized === index) return;
      const forward = (normalized - index + total) % total;
      const backward = (index - normalized + total) % total;
      setDirection(forward <= backward ? 1 : -1);
      setIndex(normalized);
    },
    [index, total]
  );

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % total);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") paginate(1);
      if (event.key === "ArrowLeft") paginate(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [paginate]);

  return (
    <section className="flex min-h-screen flex-col px-2 pt-20 pb-6 md:px-4 md:pt-24 md:pb-8">
      <div className="mx-auto flex w-full max-w-[100rem] flex-1 flex-col">
        <ChapterHeader
          className="px-2 md:px-4"
          title="I Was There"
          intro="Not just milestones, but moments that left a mark. Where I stood, what I felt, and why it still matters."
          titleStyle={{ color: "rgba(255, 255, 255, 0.95)" }}
          introStyle={{ color: "rgba(255, 255, 255, 0.5)" }}
        />

        <div
          className="mx-auto flex w-full flex-1 flex-col"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div
            className="relative min-h-[calc(100vh-10rem)] w-full flex-1 md:min-h-[calc(100vh-11rem)]"
            style={{ perspective: "1400px" }}
          >
            {[1, 2].map((offset) => {
              const stackIndex = (index + offset) % total;
              return (
                <div
                  key={`stack-${stackIndex}-${offset}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    transform: `translateY(${offset * 14}px) scale(${1 - offset * 0.03})`,
                    zIndex: -offset,
                    opacity: 1 - offset * 0.1,
                  }}
                >
                  <HighlightImageCard item={highlights[stackIndex]} />
                </div>
              );
            })}

            <div className="relative h-full min-h-[calc(100vh-10rem)] w-full md:min-h-[calc(100vh-11rem)]">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={flipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={springDefault}
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <HighlightImageCard
                    item={highlights[index]}
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex w-full items-center justify-between gap-4 md:mt-10">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="上一页"
              className="font-mono text-xs tracking-widest text-neutral-500 uppercase transition-colors hover:text-neutral-200"
            >
              ← Prev
            </button>

            <div className="flex items-center gap-2">
              {highlights.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`第 ${i + 1} 页`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index
                      ? "w-6 bg-neutral-200"
                      : "w-1.5 bg-neutral-700 hover:bg-neutral-500"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="下一页"
              className="font-mono text-xs tracking-widest text-neutral-500 uppercase transition-colors hover:text-neutral-200"
            >
              Next →
            </button>
          </div>

          <p className="mt-4 text-center font-mono text-xs text-neutral-600">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
            {isPaused ? " · Paused" : " · Auto"}
          </p>
        </div>
      </div>
    </section>
  );
}
