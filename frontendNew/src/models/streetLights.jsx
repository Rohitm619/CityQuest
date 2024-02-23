import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF(
    "/simple_collection_of_low_poly_street_lights.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.149}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[2.903, 3.085, 10.459]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.lamppost_wall_1_black_0.geometry}
              material={materials.black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.lamppost_wall_1_white_emiting_0.geometry}
              material={materials.white_emiting}
            />
          </group>
          <group position={[2.886, 0.266, 4.428]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.classic_street_light_2_black_0.geometry}
              material={materials.black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.classic_street_light_2_white_emiting_0.geometry}
              material={materials.white_emiting}
            />
          </group>
          <group position={[2.876, 0.266, 6.179]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.classic_street_light_4_black_0.geometry}
              material={materials.black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.classic_street_light_4_white_emiting_0.geometry}
              material={materials.white_emiting}
            />
          </group>
          <group
            position={[2.772, 2.758, 11.513]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.lamppost_wall_2_black_0.geometry}
              material={materials.black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.lamppost_wall_2_white_emiting_0.geometry}
              material={materials.white_emiting}
            />
          </group>
          <group
            position={[2.916, 0.267, 2.885]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.classic_street_light_black_0.geometry}
              material={materials.black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.classic_street_light_white_emiting_0.geometry}
              material={materials.white_emiting}
            />
          </group>
          <group position={[2.913, 0.271, 7.583]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.street_light_1_black_0.geometry}
              material={materials.black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.street_light_1_white_emiting_0.geometry}
              material={materials.white_emiting}
            />
          </group>
          <group position={[2.913, 0.271, 9.026]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.street_light_2_black_0.geometry}
              material={materials.black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.street_light_2_white_emiting_0.geometry}
              material={materials.white_emiting}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/simple_collection_of_low_poly_street_lights.glb");