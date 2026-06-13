"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { listItem, stagger } from "@/lib/animations";
import { allTravelVideos, type TravelVideoItem } from "@/lib/explore";
import { cn } from "@/lib/utils";

interface ExploreVideoRailProps {
  activeVideo: TravelVideoItem | null;
  onSelect: (video: TravelVideoItem) => void;
}

export function ExploreVideoRail({ activeVideo, onSelect }: ExploreVideoRailProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLUListElement>) => {
    const el = listRef.current;
    if (!el) return;

    e.stopPropagation();

    const { scrollTop, scrollHeight, clientHeight } = el;
    const canScrollUp = scrollTop > 0;
    const canScrollDown = scrollTop + clientHeight < scrollHeight - 1;

    if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="flex h-full w-[min(148px,14vw)] shrink-0 flex-col rounded-xl p-2 backdrop-blur-md"
      style={{
        background: "rgba(15, 20, 35, 0.75)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <p
        className="mb-2 shrink-0 px-1 font-mono text-[9px] tracking-[0.15em] uppercase"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        旅行 Vlog
      </p>
      <div className="relative min-h-0 flex-1">
        <motion.ul
          ref={listRef}
          initial="hidden"
          animate="visible"
          variants={stagger(0.05)}
          data-lenis-prevent
          onWheel={handleWheel}
          className="h-full space-y-2 overflow-y-auto overscroll-contain scrollbar-hidden"
        >
        {allTravelVideos.map((video) => {
          const isActive = activeVideo?.url === video.url;

          return (
            <motion.li key={video.url} variants={listItem}>
              <button
                type="button"
                onClick={() => onSelect(video)}
                className={cn(
                  "group w-full overflow-hidden rounded-lg text-left transition-colors",
                  isActive
                    ? "ring-1 ring-white/40"
                    : "hover:ring-1 hover:ring-white/20"
                )}
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: isActive
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.35)",
                }}
              >
                <div className="relative aspect-video w-full bg-black">
                  <video
                    src={video.url}
                    className="h-full w-full object-cover opacity-80"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-[10px] text-white">▶</span>
                  </div>
                </div>
                <div className="px-2 py-1.5">
                  <p className="truncate text-[10px] font-medium text-white">
                    {video.title}
                  </p>
                  <p
                    className="truncate text-[9px]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {video.spotCity}
                  </p>
                </div>
              </button>
            </motion.li>
          );
        })}
        </motion.ul>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[rgba(15,20,35,0.95)] to-transparent"
          aria-hidden
        />
      </div>
      <p
        className="mt-1.5 shrink-0 px-1 text-center font-mono text-[8px] leading-relaxed tracking-[0.08em]"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        滚轮滑动浏览
      </p>
    </div>
  );
}
