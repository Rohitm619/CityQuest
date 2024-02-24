import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import luna_park_grass_field from "../assets/luna_park_grass_field.glb";



export default function GrassField(props){
  const { nodes, materials } = useGLTF(luna_park_grass_field);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={
          materials.GameMATERIALSM_Ground_Moss_M_albedo_Mat_M_Ground_Moss_M_albedo_Mat
        }
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(luna_park_grass_field);
