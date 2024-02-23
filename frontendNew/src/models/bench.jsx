import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import bench from "../assets/bench.glb";
import { a } from "@react-spring/three";

export default function Bench(props) {
  const { nodes, materials } = useGLTF(bench);
  return (
    <a.group {...props} scale={0.01} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_SVGMat001_0.geometry}
        material={materials["SVGMat.001"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[-10, -11, -11]}
        position={[-281.315, 241.394, 313.924]}
      />
    </a.group>
  );
}

useGLTF.preload(bench);
