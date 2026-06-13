"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/lib/lenis";

export function useScrollToNext(
  onReachBottom: () => void,
  threshold = 100
) {
  const triggered = useRef(false);
  const cooldown = useRef(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      if (cooldown.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const isNearBottom =
        scrollTop + windowHeight >= docHeight - threshold;

      if (isNearBottom && !triggered.current) {
        triggered.current = true;
        cooldown.current = true;
        onReachBottom();
      }
    };

    if (lenis) {
      lenis.on("scroll", handleScroll);
      return () => lenis.off("scroll", handleScroll);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onReachBottom, threshold, lenis]);
}
