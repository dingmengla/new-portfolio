"use client";

import { create } from "zustand";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

let router: AppRouterInstance | null = null;

export function setTransitionRouter(r: AppRouterInstance) {
  router = r;
}

interface TransitionStore {
  isTransitioning: boolean;
  triggerTransition: (
    href: string,
    fromImage?: string,
    toImage?: string
  ) => void;
}

export const useTransitionStore = create<TransitionStore>((set) => ({
  isTransitioning: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  triggerTransition: (href, _fromImage, _toImage) => {
    set({ isTransitioning: true });
    router?.push(href);
  },
}));
