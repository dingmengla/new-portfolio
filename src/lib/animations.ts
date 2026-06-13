import { Variants } from "framer-motion";

// ── Spring 配置 ──────────────────

export const springHeavy = {
  type: "spring" as const,
  stiffness: 60,
  damping: 18,
  mass: 1.4,
};

export const springDefault = {
  type: "spring" as const,
  stiffness: 180,
  damping: 22,
  mass: 0.9,
};

export const springSnappy = {
  type: "spring" as const,
  stiffness: 380,
  damping: 22,
};

export const springBounce = {
  type: "spring" as const,
  stiffness: 280,
  damping: 14,
  mass: 0.8,
};

export const easeTween = {
  type: "tween" as const,
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

// ── 元素入场 Variants ─────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springDefault,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springDefault,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springDefault,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springBounce,
  },
};

export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springHeavy,
  },
};

export const stagger = (staggerTime = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerTime,
      delayChildren: 0.1,
    },
  },
});

export const listItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springDefault,
  },
};
