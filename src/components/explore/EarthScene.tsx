"use client";



import { Suspense, useEffect, useRef, useState } from "react";

import { Canvas, useFrame } from "@react-three/fiber";

import { Stars } from "@react-three/drei";

import * as THREE from "three";

import { exploreSpots } from "@/lib/explore";

import { FACING_CAMERA_Y, lngToRotationY } from "./latLngToVector3";

import { EarthGlobe } from "./EarthGlobe";

import { LocationMarker } from "./LocationMarker";



const ROTATION_MIN = 0.9;

const ROTATION_MAX = 5.0;

// 以西欧为中心，向东大幅扫过亚洲，向西小幅到大西洋
const SWING_EAST = 2.1;

const SWING_WEST = 0.45;

const EARTH_RADIUS = 3.2;

const SPACE_BG = "#000008";



function clampRotation(y: number) {

  return Math.max(ROTATION_MIN, Math.min(ROTATION_MAX, y));

}



interface EarthGroupProps {

  selectedSpotId: string | null;

  focusLng: number | null;

  onSelectSpot: (id: string) => void;

}



function EarthGroup({

  selectedSpotId,

  focusLng,

  onSelectSpot,

}: EarthGroupProps) {

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const groupRef = useRef<THREE.Group>(null);

  const focusTarget = useRef<number | null>(null);



  useEffect(() => {

    if (focusLng === null) {

      focusTarget.current = null;

      return;

    }

    focusTarget.current = clampRotation(lngToRotationY(focusLng));

  }, [focusLng]);



  useFrame(({ clock }) => {

    if (!groupRef.current) return;



    if (focusTarget.current !== null) {

      const current = groupRef.current.rotation.y;

      const next = THREE.MathUtils.lerp(current, focusTarget.current, 0.03);

      groupRef.current.rotation.y = clampRotation(next);

      return;

    }



    const t = clock.getElapsedTime();
    const wave = Math.sin(t * 0.25);
    const swing = wave > 0 ? SWING_EAST : SWING_WEST;

    groupRef.current.rotation.y = clampRotation(
      FACING_CAMERA_Y - wave * swing
    );

  });



  const markerRadius = EARTH_RADIUS + 0.02;



  return (

    <group ref={groupRef} position={[2.4, -1.5, 0]}>

      <Suspense fallback={null}>

        <EarthGlobe radius={EARTH_RADIUS} />

      </Suspense>



      {exploreSpots.map((spot, index) => (

        <LocationMarker

          key={spot.id}

          spot={spot}

          index={index}

          radius={markerRadius}

          isHovered={hoveredId === spot.id}

          isSelected={selectedSpotId === spot.id}

          onHover={() => setHoveredId(spot.id)}

          onUnhover={() => setHoveredId(null)}

          onSelect={onSelectSpot}

        />

      ))}

    </group>

  );

}



function Lights() {

  return (

    <>

      <ambientLight intensity={0.15} />

      <directionalLight position={[5, 2, 3]} intensity={0.6} color="#fff5e0" />

    </>

  );

}



interface EarthSceneProps {

  selectedSpotId: string | null;

  focusLng: number | null;

  onSelectSpot: (id: string) => void;

}



export function EarthScene({

  selectedSpotId,

  focusLng,

  onSelectSpot,

}: EarthSceneProps) {

  return (

    <Canvas

      camera={{ position: [0, 0, 5], fov: 42 }}

      style={{ width: "100%", height: "100%", background: SPACE_BG }}

      gl={{ antialias: true, alpha: false }}

    >

      <color attach="background" args={[SPACE_BG]} />

      <Stars

        radius={100}

        depth={50}

        count={3000}

        factor={3}

        saturation={0}

        fade

        speed={0.3}

      />

      <Lights />

      <EarthGroup

        selectedSpotId={selectedSpotId}

        focusLng={focusLng}

        onSelectSpot={onSelectSpot}

      />

    </Canvas>

  );

}


