"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  allTravelVideos,
  exploreSpots,
  getDefaultTravelVideo,
  type TravelVideoItem,
} from "@/lib/explore";
import { ChapterHeader } from "@/components/layout/ChapterHeader";
import { fadeLeft } from "@/lib/animations";
import { motion } from "framer-motion";
import { ExploreVideoPanel } from "./ExploreVideoPanel";
import { ExploreVideoRail } from "./ExploreVideoRail";

const SPACE_BG = "#000008";

const EarthScene = dynamic(
  () => import("./EarthScene").then((m) => m.EarthScene),
  { ssr: false, loading: () => <div className="h-full w-full" style={{ background: SPACE_BG }} /> }
);

export function ExploreWorld() {
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [focusLng, setFocusLng] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<TravelVideoItem | null>(null);
  const [videoIndex, setVideoIndex] = useState(0);

  const selectedSpot = useMemo(
    () => exploreSpots.find((s) => s.id === selectedSpotId) ?? null,
    [selectedSpotId]
  );

  const handleSelectSpot = useCallback((id: string) => {
    const spot = exploreSpots.find((s) => s.id === id);
    if (!spot) return;

    setSelectedSpotId(id);
    setFocusLng(spot.lng);

    if (spot.videos?.length) {
      setVideoIndex(0);
      setActiveVideo({
        ...spot.videos[0],
        spotId: spot.id,
        spotCity: spot.city,
      });
    }
  }, []);

  useEffect(() => {
    if (!selectedSpot?.videos?.length) return;

    const index = Math.min(videoIndex, selectedSpot.videos.length - 1);
    const video = selectedSpot.videos[index];
    setActiveVideo({
      ...video,
      spotId: selectedSpot.id,
      spotCity: selectedSpot.city,
    });
  }, [selectedSpot, videoIndex]);

  const handleSelectVideo = useCallback((video: TravelVideoItem) => {
    setActiveVideo(video);
    setSelectedSpotId(video.spotId);
    const spot = exploreSpots.find((s) => s.id === video.spotId);
    if (spot) setFocusLng(spot.lng);

    const spotVideos = spot?.videos ?? [];
    const idx = spotVideos.findIndex((v) => v.url === video.url);
    setVideoIndex(idx >= 0 ? idx : 0);
  }, []);

  useEffect(() => {
    if (!activeVideo && allTravelVideos.length > 0) {
      setActiveVideo(getDefaultTravelVideo());
    }
  }, [activeVideo]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: SPACE_BG }}
    >
      <div className="absolute inset-0">
        <EarthScene
          selectedSpotId={selectedSpotId}
          focusLng={focusLng}
          onSelectSpot={handleSelectSpot}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeLeft}
          className="pointer-events-auto absolute bottom-8 left-5 top-20 flex w-[min(960px,92vw)] gap-3 md:left-8"
        >
          <ExploreVideoRail
            activeVideo={activeVideo}
            onSelect={handleSelectVideo}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <ChapterHeader
              as="h1"
              title="I Explore"
              intro="From coordinates to cultures, from maps to memories. Every pin is a story, every path a discovery. The world is still full of unknowns—and I intend to meet them."
              titleClassName="whitespace-nowrap"
              titleStyle={{
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: "clamp(36px, 5.5vw, 72px)",
              }}
              introClassName="max-w-md"
              introStyle={{ color: "rgba(255, 255, 255, 0.5)" }}
            />

            <div className="mt-4 shrink-0">
              <ExploreVideoPanel
                spot={selectedSpot}
                activeVideo={activeVideo}
                videoIndex={videoIndex}
                onVideoIndexChange={setVideoIndex}
              />
            </div>
          </div>
        </motion.div>

        <p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.2em]"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          点击标记或左侧列表播放 Vlog
        </p>
      </div>
    </section>
  );
}
