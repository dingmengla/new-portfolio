"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, fadeLeft, fadeRight, scaleIn } from "@/lib/animations";

type RevealProps = {
  children: React.ReactNode;
  variant?: "up" | "left" | "right" | "scale";
  delay?: number;
  className?: string;
};

const variants = { up: fadeUp, left: fadeLeft, right: fadeRight, scale: scaleIn };

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
