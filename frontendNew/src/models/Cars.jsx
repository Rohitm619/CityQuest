import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import low_poly_cars from "../assets/low_poly_cars.glb";
 
export function Cars(props) {
  const { nodes, materials } = useGLTF(low_poly_cars);
 
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.2, 0.2, 0.2]} rotation={[0, -0.139, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.headLight}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
material={materials.black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_6.geometry}
              material={materials.carPlate}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_7.geometry}
              material={materials.bumper}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_8.geometry}
              material={materials.stopLight}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_9.geometry}
              material={materials["carPaint.001"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}
 
useGLTF.preload("/low_poly_cars.glb");
