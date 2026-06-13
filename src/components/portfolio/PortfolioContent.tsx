"use client";

import { motion } from "framer-motion";
import { FloatingCard } from "@/components/portfolio/FloatingCard";
import { StaggerReveal } from "@/components/motion/Reveal";
import { heroTitle, listItem } from "@/lib/animations";
import type { Project } from "@/lib/data";

interface PortfolioContentProps {
  projects: Project[];
}

export function PortfolioContent({ projects }: PortfolioContentProps) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <StaggerReveal>
          <motion.p
            variants={listItem}
            className="mb-4 font-mono text-sm tracking-widest text-neutral-500 uppercase"
          >
            Work
          </motion.p>
          <motion.h2
            variants={heroTitle}
            className="font-display text-6xl font-bold text-neutral-50 md:text-8xl"
          >
            Projects
          </motion.h2>
        </StaggerReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <FloatingCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
