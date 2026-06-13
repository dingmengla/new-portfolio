"use client";

import { useCallback } from "react";
import { FloatingWall } from "@/components/observe/FloatingWall";
import { usePageNavigation } from "@/hooks/usePageNavigation";

export default function ObservePage() {
  const { navigateTo } = usePageNavigation();

  const handleNavigateNext = useCallback(() => {
    navigateTo("/explore");
  }, [navigateTo]);

  return (
    <main>
      <FloatingWall onNavigateNext={handleNavigateNext} />
    </main>
  );
}
