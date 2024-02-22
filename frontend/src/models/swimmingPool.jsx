import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/giant_swimming_pool.glb");
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
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_Material001_0.geometry}
          material={materials["Material.001"]}
          position={[5094.552, -156.465, 67.388]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[4944.791, 9950.629, 1150.879]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_Material003_0.geometry}
          material={materials["Material.003"]}
          position={[161.068, -137.514, -1127.548]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={[132.597, 38.586, 1606.218]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_Material003_0.geometry}
          material={materials["Material.003"]}
          position={[161.068, -137.514, 89.7]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={[132.597, 38.586, 1606.218]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_Material003_0.geometry}
          material={materials["Material.003"]}
          position={[181.126, -1367.715, -519.645]}
          rotation={[0, 0, Math.PI]}
          scale={[58.163, 37.693, 584.131]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005_Material_0.geometry}
          material={materials.Material}
          position={[181.7, 1203.483, 22.772]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[411.71, 67.609, 297.727]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006_Material_0.geometry}
          material={materials.Material}
          position={[5126.591, 1203.483, -276.602]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[409.149, 72.488, 297.727]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/giant_swimming_pool.glb");
