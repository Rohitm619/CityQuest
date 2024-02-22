import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/low_poly_cars.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[4.283, 0, 0.13]} rotation={[0, -0.139, 0]}>
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
          <group
            position={[-1.393, 0.804, 11.495]}
            rotation={[0, -0.139, -Math.PI / 2]}
            scale={[2.054, 0.543, 2.054]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_15.geometry}
              material={materials.wheel}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_16.geometry}
              material={materials.wheelLine}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_17.geometry}
              material={materials.wheelMetalic}
            />
          </group>
          <group position={[-19.917, 0, 8.799]} rotation={[0, 0.452, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_25.geometry}
              material={materials.material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_26.geometry}
              material={materials.headLight}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_27.geometry}
              material={materials.black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_28.geometry}
              material={materials.carPlate}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_29.geometry}
              material={materials.bumper}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_30.geometry}
              material={materials.stopLight}
            />
          </group>
          <group
            position={[-18.299, 0.804, 21.399]}
            rotation={[0, 0.452, -Math.PI / 2]}
            scale={[2.054, 0.543, 2.054]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_36.geometry}
              material={materials.wheel}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_37.geometry}
              material={materials.wheelLine}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_38.geometry}
              material={materials.wheelMetalic}
            />
          </group>
          <group position={[26.344, 0, 15.984]} rotation={[0, -0.809, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_44.geometry}
              material={materials.window}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_45.geometry}
              material={materials.headLight}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_46.geometry}
              material={materials.black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_47.geometry}
              material={materials.carPlate}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_48.geometry}
              material={materials.bumper}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_49.geometry}
              material={materials.stopLight}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_50.geometry}
              material={materials["carPaint.002"]}
            />
          </group>
          <group
            position={[14.84, 0.804, 21.373]}
            rotation={[0, -0.809, -Math.PI / 2]}
            scale={[2.054, 0.543, 2.054]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_56.geometry}
              material={materials.wheel}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_57.geometry}
              material={materials.wheelLine}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_58.geometry}
              material={materials.wheelMetalic}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_11.geometry}
            material={materials.window}
            position={[4.283, 0, 0.13]}
            rotation={[0, -0.139, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_13.geometry}
            material={materials.fakeInterior}
            position={[4.283, 0, 0.13]}
            rotation={[0, -0.139, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_19.geometry}
            material={materials.modelText}
            position={[1.989, 3.317, 16.518]}
            rotation={[Math.PI / 2, 0, 0.139]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_21.geometry}
            material={materials.modelText}
            position={[5.108, 3.091, -5.763]}
            rotation={[1.573, -0.014, -3.016]}
            scale={0.35}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_23.geometry}
            material={materials.ground}
            position={[2.501, -1.304, 4.489]}
            scale={39.76}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_32.geometry}
            material={materials.window}
            position={[-19.917, 0, 8.799]}
            rotation={[0, 0.452, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_34.geometry}
            material={materials.fakeInterior}
            position={[-19.917, 0, 8.799]}
            rotation={[0, 0.452, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_40.geometry}
            material={materials.modelText}
            position={[-12.691, 3.317, 23.686]}
            rotation={[Math.PI / 2, 0, -0.452]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_42.geometry}
            material={materials.modelText}
            position={[-22.515, 3.091, 3.445]}
            rotation={[1.565, -0.012, 2.676]}
            scale={0.35}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_52.geometry}
            material={materials.window}
            position={[26.344, 0, 15.984]}
            rotation={[0, -0.809, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_54.geometry}
            material={materials.fakeInterior}
            position={[26.344, 0, 15.984]}
            rotation={[0, -0.809, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_60.geometry}
            material={materials.modelText}
            position={[14.374, 3.122, 27.41]}
            rotation={[1.643, 0.076, 0.806]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_62.geometry}
            material={materials.modelText}
            position={[30.648, 3.091, 11.875]}
            rotation={[1.581, -0.01, -2.347]}
            scale={0.35}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/low_poly_cars.glb");