import React from "react";
import { useGLTF } from "@react-three/drei";
import giant_swimming_pool from "../assets/giant_swimming_pool.glb";
 
export function SwimmingPool(props) {
  const { nodes, materials } = useGLTF(giant_swimming_pool.default);
 
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[5094.552, 65.804, 109.992]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[5252.477, 10573.981, 1431.59]}
        />
        {/* Other mesh components */}
      </group>
    </group>
  );
}
 
useGLTF.preload(giant_swimming_pool.default);
