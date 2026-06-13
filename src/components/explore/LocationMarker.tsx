"use client";

import { useEffect, useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ExploreRegion, ExploreSpot } from "@/lib/explore";
import { latLngToVector3 } from "./latLngToVector3";

const MARKER_COLORS: Record<"asia" | "europe" | "middleeast", string> = {
  asia: "#ffffff",
  europe: "#a0c4ff",
  middleeast: "#ffd6a5",
};

function resolveRegionColor(region: ExploreRegion) {
  if (region === "southeastasia") return MARKER_COLORS.asia;
  return MARKER_COLORS[region];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function PulseSphere({
  color,
  coreSize,
  phaseOffset,
  isSelected,
}: {
  color: string;
  coreSize: number;
  phaseOffset: number;
  isSelected: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const material = ref.current.material as THREE.MeshBasicMaterial;

    if (isSelected) {
      ref.current.scale.setScalar(4);
      material.opacity = 0.2;
      return;
    }

    const t = ((clock.getElapsedTime() + phaseOffset) % 2) / 2;
    ref.current.scale.setScalar(1 + t * 3.5);
    material.opacity = 0.4 * (1 - t);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[coreSize, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </mesh>
  );
}

function MarkerPoint({
  color,
  baseCoreSize,
  middleCoreSize,
  displayCoreSize,
  isMobile,
  isHovered,
  isSelected,
  phaseOffset,
  cityName,
}: {
  color: string;
  baseCoreSize: number;
  middleCoreSize: number;
  displayCoreSize: number;
  isMobile: boolean;
  isHovered: boolean;
  isSelected: boolean;
  phaseOffset: number;
  cityName: string;
}) {
  const midScale = isSelected
    ? isMobile
      ? 1.5
      : 3
    : isHovered
      ? isMobile
        ? 1.3
        : 2.8
      : isMobile
        ? 1
        : 1.8;

  return (
    <>
      <mesh>
        <sphereGeometry args={[displayCoreSize, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <mesh scale={midScale}>
        <sphereGeometry args={[middleCoreSize, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHovered || isSelected ? 0.25 : 0.15}
        />
      </mesh>

      <PulseSphere
        color={color}
        coreSize={baseCoreSize}
        phaseOffset={phaseOffset}
        isSelected={isSelected}
      />

      {isHovered && (
        <Html
          position={[0, 0.12, 0]}
          center
          distanceFactor={6}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "20px",
              padding: "5px 12px",
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.12em",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            {cityName}
          </div>
        </Html>
      )}
    </>
  );
}

interface LocationMarkerProps {
  spot: ExploreSpot;
  index: number;
  radius?: number;
  isHovered: boolean;
  isSelected: boolean;
  onHover: () => void;
  onUnhover: () => void;
  onSelect: (id: string) => void;
}

export function LocationMarker({
  spot,
  index,
  radius = 3.22,
  isHovered,
  isSelected,
  onHover,
  onUnhover,
  onSelect,
}: LocationMarkerProps) {
  const isMobile = useIsMobile();
  const position = latLngToVector3(spot.lat, spot.lng, radius);
  const color = resolveRegionColor(spot.region);
  const baseCoreSize = isMobile ? 0.04 : 0.022;
  const middleCoreSize = isMobile ? 0.07 : 0.022;
  const displayCoreSize = isSelected
    ? isMobile
      ? 0.055
      : 0.035
    : baseCoreSize;
  const phaseOffset = index * 0.6;

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onUnhover();
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(spot.id);
      }}
    >
      <MarkerPoint
        color={color}
        baseCoreSize={baseCoreSize}
        middleCoreSize={middleCoreSize}
        displayCoreSize={displayCoreSize}
        isMobile={isMobile}
        isHovered={isHovered}
        isSelected={isSelected}
        phaseOffset={phaseOffset}
        cityName={spot.city}
      />
    </group>
  );
}
