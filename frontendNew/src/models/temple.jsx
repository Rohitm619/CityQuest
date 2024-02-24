import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import hindu_temple from "../assets/hindu_temple.glb";

export default function Temple(props) {
  const { nodes, materials } = useGLTF(hindu_temple);
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.material_0}
        />
        <group position={[0, 1.154, 0]} scale={[0.098, 0.251, 0.098]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_12.geometry}
            material={materials.temple_outter}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_13.geometry}
            material={materials.linga}
          />
        </group>
        <group position={[0, 0.186, 0]} scale={0.341}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_27.geometry}
            material={materials.floor}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_28.geometry}
            material={materials.top_floor}
          />
        </group>
        <group
          position={[0.155, 0.585, 0.171]}
          rotation={[0, -Math.PI / 6, 0]}
          scale={0.004}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_34.geometry}
            material={materials["small_tomb.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_35.geometry}
            material={materials["small_tomb.001"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.bigtomb}
          position={[0, 0.618, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[0.015, 0.042, 0.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials.linga}
          position={[0, 0.218, -0.017]}
          scale={0.023}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials.bigtomb}
          position={[0, 0.618, 0]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[0.015, 0.042, 0.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_15.geometry}
          material={materials.temple_ground}
          position={[-0.033, 0.36, 0.009]}
          scale={0.098}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_17.geometry}
          material={materials.temple_top_design}
          position={[0, 0.79, 0]}
          scale={[0.098, 0.251, 0.098]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_19.geometry}
          material={materials.temple_top_design}
          position={[0, 0.79, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[0.098, 0.251, 0.098]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_21.geometry}
          material={materials.statue}
          position={[0, 0.543, 0]}
          rotation={[-Math.PI, -Math.PI / 4, -Math.PI]}
          scale={0.008}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_23.geometry}
          material={materials.statue}
          position={[0, 0.543, 0]}
          rotation={[0, -0.733, 0]}
          scale={0.008}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_25.geometry}
          material={materials.Stairs}
          position={[0, 0.088, 0]}
          scale={[0.07, 0.001, 0.07]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_30.geometry}
          material={materials.mid_fllor}
          position={[0, 0.46, 0]}
          scale={0.287}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_32.geometry}
          material={materials.pillar}
          position={[0, 0.288, 0]}
          scale={0.012}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_37.geometry}
          material={materials.statue}
          position={[0, 0.594, 0]}
          scale={0.011}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_39.geometry}
        material={materials.pillar_bell}
        position={[0.219, 2.212, 9.277]}
        scale={[0.399, 2.174, 0.399]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_41.geometry}
        material={materials.BASE_PILLAR}
        position={[0.219, 2.818, 9.277]}
        scale={[0.399, 2.174, 0.399]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_43.geometry}
        material={materials.base_illar2}
        position={[0.219, 2.818, 9.277]}
        scale={[0.399, 2.174, 0.399]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_45.geometry}
        material={materials.big_tomb}
        position={[0.219, 8.037, 9.277]}
        scale={[1.417, 1, 0.497]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_47.geometry}
        material={materials.small_tomb}
        position={[-1.716, 7.49, 9.277]}
        scale={0.453}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_49.geometry}
        material={materials.bell}
        position={[0.219, 2.212, 9.277]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_51.geometry}
        material={materials.metal_chain}
        position={[0.219, 5.894, 9.277]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.152}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_53.geometry}
        material={materials.metal_chain}
        position={[0.219, 4.288, 9.277]}
        rotation={[Math.PI / 2, 0, 2.418]}
        scale={0.152}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_55.geometry}
        material={materials.ball}
        position={[0.219, 2.389, 9.277]}
        scale={0.164}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_57.geometry}
        material={materials.metal_chain}
        position={[0.219, 2.201, 9.277]}
        rotation={[Math.PI / 2, 0, -2.221]}
        scale={0.081}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_59.geometry}
        material={materials.metal_chain}
        position={[0.219, 2.612, 9.277]}
        rotation={[Math.PI / 2, 0, 3.005]}
        scale={0.081}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_61.geometry}
        material={materials.metal_chain}
        position={[-12.774, 0, 9.277]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_63.geometry}
        material={materials.rope}
        position={[0.219, 3.362, 9.277]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.015, 0.705, 0.015]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_65.geometry}
        material={materials.rope}
        position={[0.217, 2.044, 9.284]}
        rotation={[0, -0.958, -Math.PI]}
        scale={[0.015, 0.705, 0.015]}
      />
    </group>
  );
}

useGLTF.preload(hindu_temple);