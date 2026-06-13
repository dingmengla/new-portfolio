"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { fadeUp, stagger } from "@/lib/animations";

interface RevealProps extends HTMLMotionProps<"div"> {
  variants?: Variants;
  children: React.ReactNode;
}

export function Reveal({
  children,
  variants = fadeUp,
  className,
  ...props
}: RevealProps) {
  const { ref, isInView } = useReveal();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps extends HTMLMotionProps<"div"> {
  staggerTime?: number;
  children: React.ReactNode;
}

export function StaggerReveal({
  children,
  staggerTime = 0.08,
  className,
  ...props
}: StaggerRevealProps) {
  const { ref, isInView } = useReveal();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger(staggerTime)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
