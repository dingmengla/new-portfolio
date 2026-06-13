"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useWave } from "@/context/WaveContext";
import { experiences, type Experience } from "@/lib/data";
import { renderHighlightedText } from "./highlightText";
import { ChapterHeader } from "@/components/layout/ChapterHeader";
import { fadeLeft, fadeRight, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const TIMELINE_IMAGE_WIDTH = 336;
const TIMELINE_IMAGE_HEIGHT = 504;

const HIGHLIGHT_CLASS = "font-bold text-white";

function TextBlock({
  align,
  children,
}: {
  align: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-full md:max-w-[460px]",
        align === "right" ? "ml-auto text-right" : "mr-auto text-left"
      )}
    >
      {children}
    </div>
  );
}

function HighlightedDescription({
  exp,
  align,
}: {
  exp: Experience;
  align: "left" | "right";
}) {
  return (
    <div className={cn(align === "right" && "text-right")}>
      <p
        className={cn(
          "text-[clamp(12.6px,1.35vw,16.2px)] leading-[1.85] font-normal md:text-[clamp(14px,1.5vw,18px)]",
          exp.unwritten && "italic"
        )}
        style={{ color: "rgba(255, 255, 255, 0.82)", marginBottom: "8px" }}
      >
        {renderHighlightedText(
          exp.description,
          exp.highlights,
          HIGHLIGHT_CLASS
        )}
      </p>
      <p
        className="text-[clamp(10.8px,1.08vw,13.5px)] leading-[1.8] font-normal md:text-[clamp(12px,1.2vw,15px)]"
        style={{ color: "rgba(255, 255, 255, 0.42)" }}
      >
        {renderHighlightedText(
          exp.descriptionEn,
          exp.highlightsEn,
          HIGHLIGHT_CLASS
        )}
      </p>
    </div>
  );
}

function TimelineImage({ exp, show }: { exp: Experience; show: boolean }) {
  if (!exp.image) {
    return <div className="hidden sm:block" aria-hidden />;
  }

  return (
    <motion.div
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay: 0.15 }}
      className="flex w-full items-start justify-center sm:justify-center"
    >
      <div
        className="flex w-[min(80vw,336px)] items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/30 p-1.5"
        style={{ height: TIMELINE_IMAGE_HEIGHT }}
      >
        <Image
          src={exp.image}
          alt={exp.org}
          width={TIMELINE_IMAGE_WIDTH}
          height={TIMELINE_IMAGE_HEIGHT}
          className="h-auto w-auto max-h-full max-w-full object-contain"
          style={{ maxHeight: TIMELINE_IMAGE_HEIGHT - 12 }}
          sizes="(max-width: 640px) 80vw, 336px"
        />
      </div>
    </motion.div>
  );
}

function TimelineContent({
  exp,
  align,
}: {
  exp: Experience;
  align: "left" | "right";
}) {
  return (
    <TextBlock align={align}>
      <p
        className="text-[clamp(19.8px,3.15vw,34.2px)] italic font-normal md:text-[clamp(22px,3.5vw,38px)]"
        style={{
          color: "rgba(255, 255, 255, 0.95)",
          marginBottom: "10px",
        }}
      >
        {exp.period}
      </p>
      <p
        className="text-[clamp(10.8px,1.26vw,14.4px)] md:text-[clamp(12px,1.4vw,16px)]"
        style={{
          color: "rgba(255, 255, 255, 0.5)",
          marginBottom: "20px",
        }}
      >
        {exp.periodEn}
      </p>

      <p
        className="text-[clamp(21.6px,2.7vw,36px)] font-bold md:text-[clamp(24px,3vw,40px)]"
        style={{
          color: "rgba(255, 255, 255, 1)",
          marginBottom: "6px",
        }}
      >
        {exp.org}
      </p>
      <p
        className="text-[clamp(11.7px,1.26vw,15.3px)] font-normal tracking-[0.04em] md:text-[clamp(13px,1.4vw,17px)]"
        style={{
          color: "rgba(255, 255, 255, 0.45)",
          marginBottom: "14px",
        }}
      >
        {exp.orgEn}
      </p>

      <p
        className={cn(
          "text-[clamp(14.4px,1.62vw,19.8px)] font-semibold md:text-[clamp(16px,1.8vw,22px)]",
          exp.unwritten && "italic"
        )}
        style={{
          color: "rgba(255, 255, 255, 0.92)",
          marginBottom: "4px",
        }}
      >
        {exp.role}
      </p>
      <p
        className="text-[clamp(10.8px,1.17vw,13.5px)] tracking-[0.06em] md:text-[clamp(12px,1.3vw,15px)]"
        style={{
          color: "rgba(255, 255, 255, 0.4)",
          marginBottom: "18px",
        }}
      >
        {exp.roleEn}
      </p>

      <HighlightedDescription exp={exp} align={align} />
    </TextBlock>
  );
}

function TimelineEntry({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  const isTextLeft = index % 2 === 0;
  const textAlign = isTextLeft ? "right" : "left";
  const { triggerWave } = useWave();
  const entryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(entryRef, {
    once: true,
    amount: 0.3,
    margin: "-80px",
  });
  const isWaveInView = useInView(entryRef, {
    margin: "-35% 0px -35% 0px",
    once: false,
  });
  const prevWaveInView = useRef(false);

  useEffect(() => {
    if (isWaveInView && !prevWaveInView.current) {
      triggerWave();
    }
    prevWaveInView.current = isWaveInView;
  }, [isWaveInView, triggerWave]);

  return (
    <div
      ref={entryRef}
      className={cn("relative", exp.unwritten && "opacity-70")}
    >
      <div
        className={cn(
          "absolute left-1/2 top-3 z-10 hidden -translate-x-1/2 shrink-0 rounded-full sm:block",
          exp.unwritten
            ? "h-5 w-5 border-2 border-dashed border-white/50 bg-transparent"
            : "h-5 w-5 bg-white"
        )}
      />

      <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-12 lg:gap-16">
        {isTextLeft ? (
          <>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeLeft}
            >
              <TimelineContent exp={exp} align={textAlign} />
            </motion.div>
            <div className="flex justify-center">
              <TimelineImage exp={exp} show={isInView} />
            </div>
          </>
        ) : (
          <>
            <div className="order-2 flex justify-center sm:order-1">
              <TimelineImage exp={exp} show={isInView} />
            </div>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeRight}
              className="order-1 sm:order-2"
            >
              <TimelineContent exp={exp} align={textAlign} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <section className="relative min-h-screen px-6 py-24 md:px-[60px]">
      <div className="mx-auto max-w-[1100px]">
        <ChapterHeader
          title="I Set Sail"
          intro="Every journey begins with a single step—or a restless heart. Here is the logbook of where I've been, what I've built, and how the horizon kept expanding."
          titleStyle={{ color: "rgba(255, 255, 255, 0.95)" }}
          introStyle={{ color: "rgba(255, 255, 255, 0.5)" }}
        />

        <div className="relative mt-20">
          <div
            className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 sm:block"
            style={{
              width: "1px",
              background: "rgba(255, 255, 255, 0.25)",
            }}
          />

          <div className="space-y-20 md:space-y-[120px]">
            {experiences.map((exp, i) => (
              <TimelineEntry key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
