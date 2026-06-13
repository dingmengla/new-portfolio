"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { fadeUp, springSnappy } from "@/lib/animations";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  project: Project;
}

export function FloatingCard({ project }: FloatingCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 250, damping: 30 });
  const springY = useSpring(y, { stiffness: 250, damping: 30 });

  const rotateX = useTransform(springY, [-80, 80], [6, -6]);
  const rotateY = useTransform(springX, [-80, 80], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Reveal variants={fadeUp} style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={springSnappy}
        className={cn(
          "group relative h-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-8",
          "cursor-default transition-colors duration-300 hover:border-neutral-600"
        )}
      >
        {project.featured && (
          <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-neutral-600 uppercase">
            Featured
          </p>
        )}

        <h3 className="text-xl font-semibold text-neutral-50">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-800 px-3 py-1 font-mono text-xs text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              Live ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              GitHub ↗
            </a>
          )}
        </div>

        {/* Hover radial glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </Reveal>
  );
}
