"use client";

import { useCallback, useRef } from "react";
import { WaveContext } from "@/context/WaveContext";
import { useWaveVideo } from "@/hooks/useWaveVideo";
import { usePageNavigation } from "@/hooks/usePageNavigation";
import { useScrollToNext } from "@/hooks/useScrollToNext";
import { HighlightCarousel } from "@/components/experience/HighlightCarousel";
import { Timeline } from "@/components/experience/Timeline";

export default function ExperiencePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { triggerWave } = useWaveVideo(videoRef);
  const { navigateTo } = usePageNavigation();

  useScrollToNext(
    useCallback(() => {
      navigateTo("/observe");
    }, [navigateTo])
  );

  return (
    <WaveContext.Provider value={{ triggerWave }}>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              opacity: 0.7,
              filter: "brightness(0.5) saturate(1.1)",
            }}
          >
            <source src="/videos/wave.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: [
              "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.6) 100%)",
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.55) 100%)",
            ].join(", "),
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 10 }}>
          <HighlightCarousel />
          <Timeline />
        </div>
      </div>
    </WaveContext.Provider>
  );
}
