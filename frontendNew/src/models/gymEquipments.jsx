import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/gym_equipment.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.LowPolyModelsWorld}
        position={[0.222, 0.081, 4.073]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials.LowPolyModelsWorld}
        position={[-8.356, 0, 3.952]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_8.geometry}
        material={materials.LowPolyModelsWorld}
        position={[0.475, 0, -2.186]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_10.geometry}
        material={materials.LowPolyModelsWorld}
        position={[6.692, 0, 8.733]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_12.geometry}
        material={materials.LowPolyModelsWorld}
        position={[6.77, 0, 3.963]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_14.geometry}
        material={materials.LowPolyModelsWorld}
        position={[0.142, 0, -8.289]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_16.geometry}
        material={materials.LowPolyModelsWorld}
        position={[6.707, 0, -1.936]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_18.geometry}
        material={materials.LowPolyModelsWorld}
        position={[7.001, 0, -8.153]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_20.geometry}
        material={materials.LowPolyModelsWorld}
        position={[-0.113, 0, 9.128]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_22.geometry}
        material={materials.LowPolyModelsWorld}
        position={[-8.306, -0.084, -1.988]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_24.geometry}
        material={materials.LowPolyModelsWorld}
        position={[-8.012, -0.084, -8.602]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_26.geometry}
        material={materials.LowPolyModelsWorld}
        position={[-8.837, -0.133, 9.415]}
        scale={0.767}
      />
    </group>
  );
}

useGLTF.preload("/gym_equipment.glb");