// import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import grass_lawn from "../assets/grass_lawn.glb";


export default function Grass(props) {
    const { nodes, materials } = useGLTF(grass_lawn);
    return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2?.geometry}
        material={
          materials.GameMATERIALSM_Ground_Moss_M_albedo_Mat_M_Ground_Moss_M_albedo_Mat
        }
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(grass_lawn);