import React, { useRef } from "react";
import { meshBounds, useGLTF } from "@react-three/drei";
import { a } from "@react-spring/three";
import cars from "../assets/cars.glb";

export default function Cars({ isRotating, ...props }) {
  const { scene } = useGLTF(cars);
  return (
    <mesh {...props}>
      <primitive object={scene} />
    </mesh>
  );
}

useGLTF.preload(cars);
