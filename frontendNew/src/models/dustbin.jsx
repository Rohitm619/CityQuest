import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import dustbin from "../assets/dustbin.glb";

export default function Dustbin(props) {
  const { nodes, materials } = useGLTF(dustbin);
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Trash006_trash_0.geometry}
          material={materials.trash}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Trash_trash_0.geometry}
          material={materials.trash}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Trash008_trash_0.geometry}
          material={materials.trash}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Trash003_trash_0.geometry}
          material={materials.trash}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Trash002_trash_0.geometry}
          material={materials.trash}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Trash004_trash_0.geometry}
          material={materials.trash}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Trash001_trash_0.geometry}
          material={materials.trash}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Trash007_trash_0.geometry}
          material={materials.trash}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Trash005_trash_0.geometry}
          material={materials.trash}
        />
      </group>
    </group>
  );
}

useGLTF.preload(dustbin);