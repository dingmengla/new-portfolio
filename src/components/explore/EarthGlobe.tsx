"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface EarthGlobeProps {
  radius: number;
}

export function EarthGlobe({ radius }: EarthGlobeProps) {
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [nightMap, cloudsMap] = useTexture([
    "/images/earth-night.jpg",
    "/images/earth-clouds.png",
  ]);

  nightMap.colorSpace = THREE.SRGBColorSpace;
  cloudsMap.colorSpace = THREE.SRGBColorSpace;

  useFrame((_, delta) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.015;
    }
  });

  const ignoreRaycast = () => {};

  return (
    <>
      <mesh raycast={ignoreRaycast}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshPhongMaterial
          map={nightMap}
          emissiveMap={nightMap}
          emissive="#ffffff"
          emissiveIntensity={0.8}
          shininess={5}
        />
      </mesh>

      <mesh ref={cloudsRef} raycast={ignoreRaycast}>
        <sphereGeometry args={[radius + 0.03, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      <mesh raycast={ignoreRaycast}>
        <sphereGeometry args={[radius + 0.1, 64, 64]} />
        <meshPhongMaterial
          color="#1a3a6e"
          transparent
          opacity={0.12}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
