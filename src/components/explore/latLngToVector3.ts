import * as THREE from "three";

export function latLngToVector3(lat: number, lng: number, radius = 2.82) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** 屏幕正对相机时对应的 rotation.y（西欧/中欧） */
export const FACING_CAMERA_Y = 3.9;

/** 空闲自转时对准的经度（中欧） */
export const IDLE_CENTER_LNG = 15;

export function lngToRotationY(
  lng: number,
  facingY = FACING_CAMERA_Y,
  centerLng = IDLE_CENTER_LNG
) {
  return facingY + (-(lng - centerLng) * Math.PI) / 180;
}
