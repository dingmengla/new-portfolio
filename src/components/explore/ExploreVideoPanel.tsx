"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  getDefaultTravelVideo,
  getSpotVideos,
  type ExploreSpot,
  type TravelVideoItem,
} from "@/lib/explore";
import { springDefault } from "@/lib/animations";
import { cn } from "@/lib/utils";

const CARD_STYLE = {
  background: "rgba(15, 20, 35, 0.85)",
  border: "1px solid rgba(255,255,255,0.1)",
};

interface ExploreVideoPanelProps {
  spot: ExploreSpot | null;
  activeVideo: TravelVideoItem | null;
  videoIndex: number;
  onVideoIndexChange: (index: number) => void;
}

export function ExploreVideoPanel({
  spot,
  activeVideo,
  videoIndex,
  onVideoIndexChange,
}: ExploreVideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = activeVideo ?? getDefaultTravelVideo();
  const displaySpot = spot ?? null;
  const spotVideos = displaySpot ? getSpotVideos(displaySpot) : [];
  const showTabs = spotVideos.length > 1;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.load();
    el.play().catch(() => {});
  }, [current.url]);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={springDefault}
          className="w-full rounded-xl p-3 backdrop-blur-md"
          style={CARD_STYLE}
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
            <video
              ref={videoRef}
              key={current.url}
              src={current.url}
              className="h-full w-full object-cover"
              controls
              muted
              playsInline
              preload="metadata"
            />
          </div>

          {showTabs && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {spotVideos.map((video, i) => (
                <button
                  key={video.url}
                  type="button"
                  onClick={() => onVideoIndexChange(i)}
                  className={cn(
                    "rounded-full px-2.5 py-1 font-mono text-[10px] transition-colors",
                    i === videoIndex
                      ? "bg-white text-[#0f1423]"
                      : "text-white/50 hover:text-white/80"
                  )}
                  style={
                    i !== videoIndex
                      ? { background: "rgba(255,255,255,0.08)" }
                      : undefined
                  }
                >
                  {video.title}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
