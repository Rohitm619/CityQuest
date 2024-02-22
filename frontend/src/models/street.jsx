import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/street.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[830.484, 7.175, 1219.099]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetlight1_streets_0.geometry}
          material={materials.streets}
          position={[-561.69, 5.191, -520.084]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetlight1_1_streets_0.geometry}
          material={materials.streets}
          position={[884.762, 5.191, -520.084]}
          rotation={[0, -0.926, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pilar_streets_0.geometry}
          material={materials.streets}
          position={[-262.46, 13.355, 513.483]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetlight1_2_streets_0.geometry}
          material={materials.streets}
          position={[963.464, 5.191, 1174.903]}
          rotation={[Math.PI, -1.545, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pilar_1_streets_0.geometry}
          material={materials.streets}
          position={[-113.996, 13.355, 661.52]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.manhole_streets_0.geometry}
          material={materials.streets}
          position={[-416.729, -4.21, -1.144]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetplane_streets_0.geometry}
          material={materials.streets}
          position={[1210.016, 10.167, -19.099]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetplane_1_streets_0.geometry}
          material={materials.streets}
          position={[1210.016, 10.167, -819.099]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetcornerOUt_streets_0.geometry}
          material={materials.streets}
          position={[410.016, -7.175, -19.099]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetcornerIN_streets_0.geometry}
          material={materials.streets}
          position={[410.016, -7.175, -19.099]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetstraight_streets_0.geometry}
          material={materials.streets}
          position={[-389.984, -7.175, -19.099]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetstraight_3_streets_0.geometry}
          material={materials.streets}
          position={[-1189.984, -7.175, -19.099]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetstraight_6_streets_0.geometry}
          material={materials.streets}
          position={[410.016, -7.175, 780.901]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetstraight_7_streets_0.geometry}
          material={materials.streets}
          position={[410.016, -7.175, 1580.901]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetstraight_4_streets_0.geometry}
          material={materials.streets}
          position={[-789.984, -7.175, -19.099]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetstraight_5_streets_0.geometry}
          material={materials.streets}
          position={[-1589.984, -7.175, -19.099]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetstraight_1_streets_0.geometry}
          material={materials.streets}
          position={[-389.984, -7.175, -19.099]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.streetstraight_2_streets_0.geometry}
          material={materials.streets}
          position={[410.016, -7.175, -19.099]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/street.glb");