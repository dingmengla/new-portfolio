"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  chapterTitleStyle,
  introEaseInOut,
  titleWordSpring,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

const WORD_STAGGER = 0.12;

interface ChapterHeaderProps {
  title: string;
  intro: string;
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
  introClassName?: string;
  titleStyle?: React.CSSProperties;
  introStyle?: React.CSSProperties;
}

export function ChapterHeader({
  title,
  intro,
  as: Tag = "h2",
  className,
  titleClassName,
  introClassName,
  titleStyle,
  introStyle,
}: ChapterHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const words = title.split(" ");
  const introDelay = words.length * WORD_STAGGER + 0.25;

  return (
    <div ref={ref} className={className}>
      <Tag
        className={cn(
          "group relative inline-block cursor-default font-sans text-white",
          titleClassName
        )}
        style={{ ...chapterTitleStyle, ...titleStyle }}
      >
        <span className="relative z-[1] rounded-sm px-1 -mx-1 transition-colors duration-300 group-hover:bg-white/[0.05]">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{
                ...titleWordSpring,
                delay: i * WORD_STAGGER,
              }}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </span>
        <span
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-px w-0 bg-white/50 transition-[width] duration-[400ms] ease-in-out group-hover:w-full"
          aria-hidden
        />
      </Tag>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          ...introEaseInOut,
          delay: introDelay,
        }}
        className={cn("mt-4 max-w-2xl leading-relaxed", introClassName)}
        style={{
          fontSize: "1rem",
          letterSpacing: "0.02em",
          color: "rgba(255, 255, 255, 0.55)",
          ...introStyle,
        }}
      >
        {intro}
      </motion.p>
    </div>
  );
}
