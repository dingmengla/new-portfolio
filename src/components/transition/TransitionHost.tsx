"use client";

import PageTransition from "@/components/transition/PageTransition";
import { usePageNavigation } from "@/hooks/usePageNavigation";

export function TransitionHost() {
  const { isTransitioning } = usePageNavigation();

  return (
    <PageTransition isActive={isTransitioning} onComplete={() => {}} />
  );
}
