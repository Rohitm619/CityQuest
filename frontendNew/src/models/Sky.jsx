import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import skyScene from "../assets/sky.glb";
 
export function Sky({ isRotating }) {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();
 
  // Animation loop for rotating the sky
  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.25 * delta; // Adjust rotation speed as needed
    }
  });
 
  return (
    <mesh ref={skyRef} position={[0, 0, -20]} scale={[0.7, 0.7, 0.7]}> {/* Adjust position and scale */}
      <primitive object={sky.scene} />
    </mesh>
  );
}
