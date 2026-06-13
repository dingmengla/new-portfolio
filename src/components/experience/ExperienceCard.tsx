"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { easeTween, springBounce } from "@/lib/animations";
import type { Experience } from "@/lib/data";
import { renderHighlightedText } from "./highlightText";

interface ExperienceCardProps {
  experience: Experience;
  onClose: () => void;
}

function Bilingual({
  primary,
  secondary,
  primaryClassName,
}: {
  primary: string;
  secondary: string;
  primaryClassName?: string;
}) {
  return (
    <div>
      <p className={primaryClassName}>{primary}</p>
      <p className="mt-0.5 font-mono text-xs text-neutral-600">{secondary}</p>
    </div>
  );
}

export function ExperienceCard({ experience, onClose }: ExperienceCardProps) {
  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={easeTween}
        className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        key="card"
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 48, scale: 0.96 }}
        transition={springBounce}
        className="fixed inset-x-4 bottom-0 z-[120] mx-auto max-h-[90vh] max-w-2xl overflow-y-auto rounded-t-3xl border border-neutral-800 bg-neutral-900 p-8 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:rounded-3xl"
      >
        {experience.image && (
          <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-950/50 p-2">
            <Image
              src={experience.image}
              alt={experience.org}
              width={800}
              height={600}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        )}

        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="space-y-4">
            <Bilingual
              primary={experience.period}
              secondary={experience.periodEn}
              primaryClassName="font-mono text-xs text-neutral-500"
            />
            <Bilingual
              primary={experience.org}
              secondary={experience.orgEn}
              primaryClassName="text-2xl font-semibold text-neutral-50"
            />
            <Bilingual
              primary={experience.role}
              secondary={experience.roleEn}
              primaryClassName="text-neutral-400"
            />
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full border border-neutral-700 p-2 text-neutral-400 transition-colors hover:border-neutral-400 hover:text-neutral-50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div>
          <p className="leading-relaxed text-neutral-300">
            {renderHighlightedText(
              experience.description,
              experience.highlights,
              "font-semibold text-neutral-100"
            )}
          </p>
          <p className="mt-2 font-mono text-xs leading-relaxed text-neutral-600">
            {renderHighlightedText(
              experience.descriptionEn,
              experience.highlightsEn,
              "font-semibold text-neutral-400"
            )}
          </p>
        </div>
      </motion.div>
    </>
  );
}
