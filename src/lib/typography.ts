import type { CSSProperties } from "react";
import type { Transition } from "framer-motion";

export const chapterTitleStyle: CSSProperties = {
  fontSize: "clamp(52px, 9vw, 110px)",
  fontWeight: 500,
  letterSpacing: "0.04em",
  lineHeight: 1.1,
};

export const titleWordSpring: Transition = {
  type: "spring",
  stiffness: 70,
  damping: 16,
  mass: 1.2,
};

export const introEaseInOut: Transition = {
  duration: 0.9,
  ease: "easeInOut",
};
