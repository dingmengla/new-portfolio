"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  observeArticles,
  observeQuoteSlides,
  type ObserveArticle,
  type ObserveQuoteSlide,
} from "@/lib/observe";
import { ChapterHeader } from "@/components/layout/ChapterHeader";
import { springDefault } from "@/lib/animations";
import { ArticleDetailModal } from "./ArticleDetailModal";
import { cn } from "@/lib/utils";

const CARD_COUNT = observeArticles.length;
const RADIUS = 520;
const CARD_WIDTH = 240;
const CARD_HEIGHT = 320;
const ANGLE_PER_CARD = 360 / CARD_COUNT;
const QUOTE_CYCLE_MS = 6000;

const tornShapes = [
  "polygon(0% 3%, 2% 0%, 5% 2%, 8% 0%, 12% 3%, 98% 0%, 100% 2%, 99% 98%, 100% 100%, 3% 98%, 0% 100%)",
  "polygon(1% 0%, 4% 2%, 7% 0%, 10% 1%, 100% 2%, 98% 5%, 100% 98%, 97% 100%, 2% 99%, 0% 97%, 1% 50%, 0% 3%)",
  "polygon(0% 2%, 3% 0%, 6% 3%, 9% 0%, 13% 2%, 97% 1%, 100% 0%, 99% 96%, 100% 100%, 4% 98%, 0% 100%)",
  "polygon(2% 0%, 5% 2%, 8% 0%, 100% 1%, 98% 4%, 100% 97%, 97% 100%, 3% 99%, 0% 96%, 1% 3%)",
  "polygon(0% 4%, 2% 0%, 6% 2%, 10% 0%, 99% 2%, 100% 5%, 98% 99%, 100% 100%, 2% 98%, 0% 100%)",
  "polygon(1% 2%, 4% 0%, 8% 3%, 11% 0%, 98% 1%, 100% 3%, 99% 97%, 100% 100%, 3% 99%, 0% 97%)",
] as const;

function getFrontCardIndex(rotation: number) {
  const index = Math.round(-rotation / ANGLE_PER_CARD) % CARD_COUNT;
  return ((index % CARD_COUNT) + CARD_COUNT) % CARD_COUNT;
}

function ObserveBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/observe-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.4) grayscale(1)" }}
          draggable={false}
        />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </>
  );
}

function CenterQuote({ slide }: { slide: ObserveQuoteSlide }) {
  const cleanTitle = slide.articleTitle.replace(/[《》]/g, "");

  return (
    <div className="pointer-events-none fixed inset-x-0 top-1/2 z-[100] flex -translate-y-1/2 items-center justify-center px-8 md:px-16">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={`${slide.articleId}-${slide.text.slice(0, 24)}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={springDefault}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-display text-[21px] font-bold leading-relaxed text-white/90 md:text-2xl md:leading-relaxed">
            &ldquo;{slide.text}&rdquo;
          </p>
          <footer className="mt-4 font-mono text-[15px] tracking-wide text-white/35 md:text-[18px]">
            —— 出自《{cleanTitle}》· {slide.articleMedia}
          </footer>
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
}

function CylinderCard({
  article,
  tornShape,
  isHovered,
  isHidden,
  onHover,
  onLeave,
  onClick,
}: {
  article: ObserveArticle;
  tornShape: string;
  isHovered: boolean;
  isHidden: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const noiseId = `observe-noise-${article.id}`;

  return (
    <motion.button
      type="button"
      layoutId={`observe-article-${article.id}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onClick={onClick}
      className={cn(
        "relative h-full w-full overflow-hidden p-4 text-left transition-transform duration-300",
        "bg-[rgba(30,30,30,0.55)] backdrop-blur-[2px]",
        isHovered && "scale-[1.03]",
        isHidden && "pointer-events-none opacity-0"
      )}
      style={{
        clipPath: tornShape,
        WebkitClipPath: tornShape,
      }}
      aria-label={article.title}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt=""
          draggable={false}
          className="max-h-[58%] max-w-[82%] object-contain grayscale"
          style={{ opacity: 0.55 }}
        />
      </div>

      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.08,
          pointerEvents: "none",
          inset: 0,
          zIndex: 1,
        }}
        aria-hidden
      >
        <filter id={noiseId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${noiseId})`} />
      </svg>

      <div className="relative z-[2] flex h-full flex-col gap-1.5">
        <p
          className="shrink-0 font-mono text-[10px] font-normal tracking-[0.12em] uppercase"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {article.media}
        </p>

        <h3
          className="shrink-0 text-[13px] font-medium leading-snug"
          style={{
            color: "rgba(255,255,255,0.88)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.title.replace(/[《》]/g, "")}
        </h3>

        <p
          className="shrink-0 text-[10px] italic leading-snug"
          style={{
            color: "rgba(255,255,255,0.45)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.titleEn}
        </p>

        <div
          className="mt-auto shrink-0 space-y-0.5 font-mono text-[9px]"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {article.views && <p>阅读量 {article.views}</p>}
          <p>{article.publishedAt}</p>
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 font-mono text-[10px] tracking-wide underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/70"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          click here
        </a>
      </div>
    </motion.button>
  );
}

const WHEEL_SENSITIVITY = 0.2;

export function FloatingWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const rotationRef = useRef(0);
  const autoSpeedRef = useRef(0.15);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const rafRef = useRef<number>();
  const wheelEndTimerRef = useRef<number>();

  const articleMap = useMemo(
    () => new Map(observeArticles.map((a) => [a.id, a])),
    []
  );

  const frontIndex = getFrontCardIndex(rotation);
  const frontArticleId = observeArticles[frontIndex]?.id ?? observeArticles[0].id;

  const hoveredSlides = useMemo(() => {
    if (!hoveredId) return null;
    return observeQuoteSlides.filter((s) => s.articleId === hoveredId);
  }, [hoveredId]);

  const frontSlides = useMemo(
    () => observeQuoteSlides.filter((s) => s.articleId === frontArticleId),
    [frontArticleId]
  );

  const activeSlides = hoveredSlides ?? frontSlides;

  const activeQuote =
    activeSlides[quoteIndex % activeSlides.length] ?? observeQuoteSlides[0];

  const selectedArticle = selectedId ? articleMap.get(selectedId) : null;

  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current && !selectedId) {
        rotationRef.current += autoSpeedRef.current;
        setRotation(rotationRef.current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [selectedId]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (selectedId) return;

      e.preventDefault();
      isDraggingRef.current = true;
      setIsDragging(true);

      rotationRef.current += e.deltaY * WHEEL_SENSITIVITY;
      setRotation(rotationRef.current);

      window.clearTimeout(wheelEndTimerRef.current);
      wheelEndTimerRef.current = window.setTimeout(() => {
        isDraggingRef.current = false;
        setIsDragging(false);
      }, 120);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(wheelEndTimerRef.current);
    };
  }, [selectedId]);

  useEffect(() => {
    setQuoteIndex(0);
  }, [hoveredId, frontArticleId]);

  useEffect(() => {
    if (selectedId) return;

    const timer = window.setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % activeSlides.length);
    }, QUOTE_CYCLE_MS);

    return () => window.clearInterval(timer);
  }, [selectedId, activeSlides.length]);

  const handlePointerDown = useCallback((clientX: number) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    lastXRef.current = clientX;
  }, []);

  const handlePointerMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return;
    const delta = clientX - lastXRef.current;
    rotationRef.current += delta * 0.3;
    setRotation(rotationRef.current);
    lastXRef.current = clientX;
  }, []);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <ObserveBackground />

      <ChapterHeader
        as="h1"
        className="pointer-events-auto absolute inset-x-0 top-20 z-30 px-6 md:top-24"
        title="I Observe"
        intro="Eyes open, mind curious. A collection of signals, stories, and shifts I've noticed along the way. Not just news—patterns that matter."
        titleStyle={{ color: "rgba(255, 255, 255, 0.95)" }}
        introClassName="max-w-xl"
        introStyle={{ color: "rgba(255, 255, 255, 0.45)" }}
      />

      {/* 圆柱场景层 */}
      <div
        className="absolute inset-0 z-10 flex cursor-grab items-center justify-center active:cursor-grabbing"
        style={{ touchAction: "none" }}
        onMouseEnter={() => {
          autoSpeedRef.current = 0.04;
        }}
        onMouseLeave={() => {
          autoSpeedRef.current = 0.15;
          handlePointerUp();
        }}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => {
          e.preventDefault();
          handlePointerMove(e.touches[0].clientX);
        }}
        onTouchEnd={handlePointerUp}
      >
        <div
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              position: "relative",
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotation}deg)`,
              transition: isDragging
                ? "none"
                : "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {observeArticles.map((article, i) => {
              const cardAngle = i * ANGLE_PER_CARD;
              const isHidden = selectedId === article.id;

              return (
                <div
                  key={article.id}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    marginLeft: `-${CARD_WIDTH / 2}px`,
                    marginTop: `-${CARD_HEIGHT / 2}px`,
                    transform: `rotateY(${cardAngle}deg) translateZ(${RADIUS}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <CylinderCard
                    article={article}
                    tornShape={tornShapes[i % tornShapes.length]}
                    isHovered={hoveredId === article.id}
                    isHidden={isHidden}
                    onHover={() => setHoveredId(article.id)}
                    onLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedId(article.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CenterQuote slide={activeQuote} />

      <p className="pointer-events-none fixed bottom-8 left-1/2 z-[110] -translate-x-1/2 font-mono text-xs tracking-[0.25em] text-white/30">
        滚动或拖动旋转
      </p>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleDetailModal article={selectedArticle} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}
