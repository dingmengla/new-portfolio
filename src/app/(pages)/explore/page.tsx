"use client";

import { useCallback } from "react";
import { ExploreWorld } from "@/components/explore/ExploreWorld";
import { usePageNavigation } from "@/hooks/usePageNavigation";
import { useScrollToNext } from "@/hooks/useScrollToNext";

export default function ExplorePage() {
  const { navigateTo } = usePageNavigation();

  useScrollToNext(
    useCallback(() => {
      navigateTo("/cover");
    }, [navigateTo])
  );

  return (
    <main>
      <ExploreWorld />
    </main>
  );
}
