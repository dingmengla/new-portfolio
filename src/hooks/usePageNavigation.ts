"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { create } from "zustand";

interface NavigationStore {
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
}

const useNavigationStore = create<NavigationStore>((set) => ({
  isTransitioning: false,
  setIsTransitioning: (value) => set({ isTransitioning: value }),
}));

let isNavigating = false;

export function usePageNavigation() {
  const router = useRouter();
  const isTransitioning = useNavigationStore((s) => s.isTransitioning);
  const setIsTransitioning = useNavigationStore((s) => s.setIsTransitioning);

  const navigateTo = useCallback(
    (href: string) => {
      if (isNavigating) return;
      isNavigating = true;
      setIsTransitioning(true);

      setTimeout(() => {
        router.push(href);
        setTimeout(() => {
          setIsTransitioning(false);
          isNavigating = false;
        }, 400);
      }, 600);
    },
    [router, setIsTransitioning]
  );

  return { navigateTo, isTransitioning };
}
