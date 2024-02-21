import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const model = (props) => {
  const { nodes, materials } = useGLTF("/Edificio.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[0.206, -2.701, 9.204]}
        rotation={[0.506, 0, -Math.PI]}
        scale={[0.384, 0.384, 0.012]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo003.geometry}
          material={materials["Base panel"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo003_1.geometry}
          material={materials["Panel solar"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo003_2.geometry}
          material={materials["Material.004"]}
        />
      </group>
      <group position={[0, 0, -0.395]} scale={[3.85, 3.85, 0.1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo002.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo002_1.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo002_2.geometry}
          material={materials["Material.002"]}
        />
      </group>
      <group position={[5.502, 4.47, -0.503]} scale={0.058}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002.geometry}
          material={materials["Black paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002_1.geometry}
          material={materials.Glass}
        />
      </group>
      <group position={[5.502, 1.47, -0.503]} scale={0.058}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001.geometry}
          material={materials["Black paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001_1.geometry}
          material={materials.Glass}
        />
      </group>
      <group position={[7.056, -2.561, 1.762]} scale={0.001}>
        <group position={[0, -49.248, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.sub01001_1.geometry}
            material={materials.leaf}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.sub01001_2.geometry}
            material={materials.bark}
          />
        </group>
        <group position={[-27822.402, 11986.256, 0]} rotation={[0, 0, 0.898]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.sub01002_1.geometry}
            material={materials.leaf}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.sub01002_2.geometry}
            material={materials.bark}
          />
        </group>
        <group position={[-6613.294, 18555.301, 0]} rotation={[0, 0, -2.072]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.sub01003_1.geometry}
            material={materials.leaf}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.sub01003_2.geometry}
            material={materials.bark}
          />
        </group>
        <group position={[-27822.398, -28220.9, 0]} rotation={[0, 0, -1.022]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.sub01004_1.geometry}
            material={materials.leaf}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.sub01004_2.geometry}
            material={materials.bark}
          />
        </group>
        <group position={[-48883.293, 498.497, 0]} rotation={[0, 0, -0.324]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.sub01005_1.geometry}
            material={materials.leaf}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.sub01005_2.geometry}
            material={materials.bark}
          />
        </group>
      </group>
      <group position={[8.502, -1.53, -0.503]} scale={0.058}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere006.geometry}
          material={materials["Black paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere006_1.geometry}
          material={materials.Glass}
        />
      </group>
      <group position={[5.502, -9.53, -0.503]} scale={0.058}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere005.geometry}
          material={materials["Black paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere005_1.geometry}
          material={materials.Glass}
        />
      </group>
      <group position={[5.502, -5.53, -0.503]} scale={0.058}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere004.geometry}
          material={materials["Black paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere004_1.geometry}
          material={materials.Glass}
        />
      </group>
      <group
        position={[2.606, 2.699, 9.204]}
        rotation={[-0.506, 0, 0]}
        scale={[0.384, 0.384, 0.012]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo001.geometry}
          material={materials["Base panel"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo001_1.geometry}
          material={materials["Panel solar"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo001_2.geometry}
          material={materials["Material.004"]}
        />
      </group>
      <group
        position={[-1.065, -0.794, 9.042]}
        rotation={[0, 0, -Math.PI]}
        scale={0.2}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo008.geometry}
          material={materials["Cuerpo aire"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo008_1.geometry}
          material={materials.Rejilla}
        />
      </group>
      <group
        position={[-0.631, -0.794, 9.042]}
        rotation={[0, 0, -Math.PI]}
        scale={0.2}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo007.geometry}
          material={materials["Cuerpo aire"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo007_1.geometry}
          material={materials.Rejilla}
        />
      </group>
      <group position={[-1.065, 0.754, 9.042]} scale={0.2}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo006.geometry}
          material={materials["Cuerpo aire"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo006_1.geometry}
          material={materials.Rejilla}
        />
      </group>
      <group position={[-0.631, 0.754, 9.042]} scale={0.2}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo_1.geometry}
          material={materials["Cuerpo aire"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo_2.geometry}
          material={materials.Rejilla}
        />
      </group>
      <group position={[-0.058, -0.081, -0.533]} scale={8.023}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plano.geometry}
          material={materials.grass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plano_1.geometry}
          material={materials.seto}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plano_2.geometry}
          material={materials.Losas}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plano_3.geometry}
          material={materials.seto2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plano_4.geometry}
          material={materials.seto3}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plano_5.geometry}
          material={materials["Material.003"]}
        />
      </group>
      <group position={[0, 0, 4.199]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.Base1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials.Base2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={materials.Chimenea}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_3.geometry}
          material={materials["Terminal chimenea"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_4.geometry}
          material={materials.Ventanas}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_5.geometry}
          material={materials.Tejado}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_6.geometry}
          material={materials.Tejado2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_7.geometry}
          material={materials.Franja}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_8.geometry}
          material={materials.Franja2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_9.geometry}
          material={materials.Marquesina}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_10.geometry}
          material={materials.Puerta}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_11.geometry}
          material={materials["Puerta tejado"]}
        />
      </group>
      <group position={[5.502, -1.53, -0.503]} scale={0.058}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials["Black paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={materials.Glass}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/Edificio.glb");

export default model;
