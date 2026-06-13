"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type Props = {
  isActive: boolean;
  onComplete: () => void;
};

export default function PageTransition({ isActive, onComplete }: Props) {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#000000",
            zIndex: 9999,
            transformOrigin: "top",
            pointerEvents: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
}
