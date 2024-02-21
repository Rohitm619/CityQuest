import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";

import buildingScene from "../assets/island.glb";

export function Island(props) {
  const { nodes, materials } = useGLTF(buildingScene);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials.tower}
        position={[0.013, 1.395, -2.93]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials.house1}
        position={[0.013, 1.036, -2.055]}
        scale={[0.35, 0.445, 0.35]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["House-pad"].geometry}
        material={materials.floor}
      />
      <group position={[0.013, 0.712, -1.294]} scale={[0.35, 0.445, 0.35]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005_1.geometry}
          material={materials.roof}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005_2.geometry}
          material={materials.bg}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={materials.Woodtile}
        position={[-0.207, 1.188, -1.211]}
        scale={[0.215, 0.445, 0.35]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={materials.Woodtile}
        position={[-0.044, 1.147, -1.225]}
        rotation={[-0.048, 0, 0]}
        scale={[0.215, 0.445, 0.35]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={materials.Woodtile}
        position={[0.215, 1.187, -1.216]}
        rotation={[0.009, 0, 0]}
        scale={[0.215, 0.445, 0.35]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={materials.Woodtile}
        position={[0.152, 1.067, -1.235]}
        scale={[0.35, 0.445, 0.35]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={materials.roof}
        position={[0.013, 1.036, -2.055]}
        scale={[0.35, 0.445, 0.35]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube017.geometry}
        material={nodes.Cube017.material}
        position={[0.015, 3.559, -2.585]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube018.geometry}
        material={materials.Woodtile}
        position={[0.015, 3.235, -3.109]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube019.geometry}
        material={materials["tower-top"]}
        position={[0.015, 4.434, -3.109]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube021.geometry}
        material={materials.house1}
        position={[0.771, 0.888, -3.095]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.269, 0.342, 0.269]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube025.geometry}
        material={materials.roof}
        position={[0.771, 0.888, -3.095]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.269, 0.342, 0.269]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.deck}
        position={[0.421, 0.323, -0.064]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane031.geometry}
        material={materials.deck}
        position={[1.348, 0.067, 2.17]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.79}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence001.geometry}
        material={materials["tiles-stone"]}
        position={[2.53, 0.23, -1.006]}
        rotation={[0.01, -0.006, -1.113]}
        scale={0.519}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence002.geometry}
        material={materials["tiles-stone"]}
        position={[2.61, 0.098, -1.258]}
        rotation={[0.024, -0.029, -0.983]}
        scale={[0.519, 0.519, 0.392]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence003.geometry}
        material={materials["tiles-stone"]}
        position={[2.513, 0.279, -1.771]}
        rotation={[0.024, -0.029, -0.983]}
        scale={[0.519, 0.519, 0.392]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence004.geometry}
        material={materials["tiles-stone"]}
        position={[1.919, 0.415, -1.135]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.854, 0.292, 0.854]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence005.geometry}
        material={materials["tiles-stone"]}
        position={[2.67, 0.173, -2.403]}
        rotation={[0.081, -0.124, -0.94]}
        scale={0.519}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence006.geometry}
        material={materials["tiles-stone"]}
        position={[2.711, 0.253, -3.165]}
        rotation={[0.049, -0.073, -1.069]}
        scale={0.519}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence007.geometry}
        material={materials["tiles-stone"]}
        position={[2.825, 0.086, -3.421]}
        rotation={[0.046, -0.067, -1.085]}
        scale={0.519}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence008.geometry}
        material={materials["tiles-stone"]}
        position={[1.693, 0.219, -0.546]}
        rotation={[0.913, -1.464, -0.371]}
        scale={0.519}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence009.geometry}
        material={materials["tiles-stone"]}
        position={[1.294, 0.057, -0.478]}
        rotation={[1.074, -1.468, -0.093]}
        scale={0.519}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence010.geometry}
        material={materials["tiles-stone"]}
        position={[2.157, 0.274, -0.58]}
        rotation={[1.074, -1.468, -0.093]}
        scale={0.459}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence011.geometry}
        material={materials["tiles-stone"]}
        position={[1.972, 0.082, -0.496]}
        rotation={[1.074, -1.468, -0.093]}
        scale={0.372}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence012.geometry}
        material={materials["tiles-stone"]}
        position={[3.52, 0.178, -3.748]}
        rotation={[1.197, -1.538, 0]}
        scale={0.519}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence013.geometry}
        material={materials["tiles-stone"]}
        position={[3.846, 0.297, -3.795]}
        rotation={[1.197, -1.538, 0]}
        scale={0.519}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence014.geometry}
        material={materials["tiles-stone"]}
        position={[1.124, 0.415, -1.374]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence015.geometry}
        material={materials["tiles-stone"]}
        position={[0.998, 0.415, -2.68]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.89, 0.304, 0.89]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence016.geometry}
        material={materials["tiles-stone"]}
        position={[0.525, 0.415, -1.395]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.805, 0.275, 0.805]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence017.geometry}
        material={materials["tiles-stone"]}
        position={[1.765, 0.415, -2.061]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.846, 0.289, 0.846]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence018.geometry}
        material={nodes.Fence018.material}
        position={[1.3, 0.415, -3.596]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.69, 0.236, 0.69]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence019.geometry}
        material={materials["tiles-stone"]}
        position={[1.719, 0.415, -1.439]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence020.geometry}
        material={materials["tiles-stone"]}
        position={[1.46, 0.415, -1.745]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence021.geometry}
        material={materials["tiles-stone"]}
        position={[2.056, 0.415, -1.745]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence022.geometry}
        material={materials["tiles-stone"]}
        position={[2.081, 0.415, -2.494]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.846, 0.289, 0.846]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence023.geometry}
        material={materials["tiles-stone"]}
        position={[1.861, 0.415, -2.793]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.846, 0.289, 0.846]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence024.geometry}
        material={materials["tiles-stone"]}
        position={[1.754, 0.415, -3.479]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.65, 0.222, 0.65]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence025.geometry}
        material={materials["tiles-stone"]}
        position={[0.784, 0.415, -1.72]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.71, 0.242, 0.71]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence026.geometry}
        material={materials["tiles-stone"]}
        position={[2.304, 0.415, -3.836]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.718, 0.245, 0.718]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence027.geometry}
        material={materials["tiles-stone"]}
        position={[1.832, 0.415, -3.717]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.65, 0.222, 0.65]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence028.geometry}
        material={materials["tiles-stone"]}
        position={[1.702, 0.415, -3.973]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.65, 0.222, 0.65]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence029.geometry}
        material={materials["tiles-stone"]}
        position={[-1.517, 0.415, -1.135]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.854, 0.292, 0.854]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence030.geometry}
        material={materials["tiles-stone"]}
        position={[-2.312, 0.415, -1.373]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence031.geometry}
        material={materials["tiles-stone"]}
        position={[-1.671, 0.415, -2.06]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.846, 0.289, 0.846]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence032.geometry}
        material={materials["tiles-stone"]}
        position={[-1.716, 0.415, -1.438]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence033.geometry}
        material={materials["tiles-stone"]}
        position={[-1.975, 0.415, -1.744]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence034.geometry}
        material={materials["tiles-stone"]}
        position={[-1.379, 0.415, -1.744]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence035.geometry}
        material={materials["tiles-stone"]}
        position={[-0.562, 0.415, -2.341]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence036.geometry}
        material={materials["tiles-stone"]}
        position={[-0.416, 0.415, -1.251]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.718, 0.245, 0.718]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence037.geometry}
        material={materials["tiles-stone"]}
        position={[-2.965, 0.415, -2.281]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.854, 0.292, 0.854]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence038.geometry}
        material={materials["tiles-stone"]}
        position={[-2.127, 0.415, -3.282]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence039.geometry}
        material={materials["tiles-stone"]}
        position={[-3.119, 0.415, -3.206]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.846, 0.289, 0.846]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence040.geometry}
        material={materials["tiles-stone"]}
        position={[-3.164, 0.415, -2.584]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence041.geometry}
        material={materials["tiles-stone"]}
        position={[-3.423, 0.415, -2.89]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence042.geometry}
        material={materials["tiles-stone"]}
        position={[-2.827, 0.415, -2.89]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence043.geometry}
        material={materials["tiles-stone"]}
        position={[-2.803, 0.415, -3.64]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.846, 0.289, 0.846]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence044.geometry}
        material={materials["tiles-stone"]}
        position={[-3.023, 0.415, -3.939]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.846, 0.289, 0.846]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence045.geometry}
        material={materials["tiles-stone"]}
        position={[-0.562, 0.415, -3.892]}
        rotation={[Math.PI, -1.564, Math.PI]}
        scale={[0.892, 0.305, 0.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_Cube002.geometry}
        material={nodes.Cube_Cube002.material}
        position={[-4.358, -0.088, -2.182]}
        rotation={[Math.PI / 2, 0, -2.684]}
        scale={[1.24, 1.24, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_Cube001.geometry}
        material={materials["Material.004"]}
        position={[-3.641, -0.343, -0.421]}
        rotation={[Math.PI / 2, 0, -2.684]}
        scale={[1.278, 1.278, 1.03]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_Cube003.geometry}
        material={materials["Material.004"]}
        position={[4.064, -0.545, -1.734]}
        rotation={[Math.PI / 2, 0, -2.684]}
        scale={[1.829, 1.829, 1.475]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials.roof}
        position={[0.461, 0.777, -1.523]}
        rotation={[0, 0, -0.511]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={materials.house1}
        position={[0.459, 0.664, -1.87]}
        scale={[0.123, 0.123, 0.382]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={nodes.Plane003.material}
        position={[-0.235, 2.796, -2.509]}
        rotation={[1.521, 0, 0]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={nodes.Plane004.material}
        position={[0.26, 2.706, -2.504]}
        rotation={[1.521, 0, 0]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={nodes.Plane005.material}
        position={[0.264, 2.113, -2.475]}
        rotation={[1.521, 0, 0]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={nodes.Plane006.material}
        position={[-0.29, 2.031, -2.471]}
        rotation={[1.521, 0, 0]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={nodes.Plane007.material}
        position={[-0.16, 2.2, -2.479]}
        rotation={[1.521, 0, 0]}
        scale={[0.229, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane008.geometry}
        material={nodes.Plane008.material}
        position={[0.664, 2.656, -2.915]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane009.geometry}
        material={nodes.Plane009.material}
        position={[0.669, 2.552, -3.361]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        material={nodes.Plane010.material}
        position={[0.674, 2.461, -3.228]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011.geometry}
        material={nodes.Plane011.material}
        position={[0.697, 1.981, -2.906]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012.geometry}
        material={nodes.Plane012.material}
        position={[0.702, 1.886, -3.324]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane013.geometry}
        material={nodes.Plane013.material}
        position={[0.707, 1.781, -3.087]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.232, 0.052, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane014.geometry}
        material={nodes.Plane014.material}
        position={[0.718, 1.569, -2.764]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane015.geometry}
        material={nodes.Plane015.material}
        position={[0.729, 1.343, -3.379]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane016.geometry}
        material={nodes.Plane016.material}
        position={[0.734, 1.244, -3.372]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.232, 0.052, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane017.geometry}
        material={nodes.Plane017.material}
        position={[-0.235, 4.215, -2.579]}
        rotation={[1.521, 0, 0]}
        scale={[0.249, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane018.geometry}
        material={nodes.Plane018.material}
        position={[-0.1, 4.303, -2.583]}
        rotation={[1.521, 0, 0]}
        scale={[0.222, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane019.geometry}
        material={nodes.Plane019.material}
        position={[0.308, 4.154, -2.576]}
        rotation={[1.521, 0, 0]}
        scale={[0.177, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane020.geometry}
        material={nodes.Plane020.material}
        position={[-0.023, 4.019, -2.569]}
        rotation={[1.521, 0, 0]}
        scale={[0.193, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane021.geometry}
        material={nodes.Plane021.material}
        position={[0.653, 2.877, -3.078]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.23, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane022.geometry}
        material={nodes.Plane022.material}
        position={[0.592, 4.108, -2.935]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane023.geometry}
        material={nodes.Plane023.material}
        position={[0.597, 4.005, -3.376]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.215, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane024.geometry}
        material={nodes.Plane024.material}
        position={[0.602, 3.916, -3.013]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.215, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane025.geometry}
        material={nodes.Plane025.material}
        position={[0.586, 4.231, -3.303]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.164, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane026.geometry}
        material={nodes.Plane026.material}
        position={[0.581, 4.345, -2.947]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.215, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane027.geometry}
        material={nodes.Plane027.material}
        position={[0.61, 3.743, -2.794]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.121, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane028.geometry}
        material={nodes.Plane028.material}
        position={[0.617, 3.619, -3.137]}
        rotation={[1.567, 0.049, -1.571]}
        scale={[0.281, 0.075, 0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere.geometry}
        material={nodes.Icosphere.material}
        position={[-5.182, -0.091, -2.2]}
        scale={[0.243, 0.163, 0.243]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere002.geometry}
        material={nodes.Icosphere002.material}
        position={[-5.279, -0.121, -1.953]}
        rotation={[0, 1.098, 0]}
        scale={[0.283, 0.137, 0.283]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere003.geometry}
        material={materials["Material.004"]}
        position={[-5.306, -0.329, -2.625]}
        rotation={[0.852, 0.981, Math.PI]}
        scale={[0.334, 0.427, 0.334]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_Sphere001.geometry}
        material={materials["Material.004"]}
        position={[-4.653, -0.184, -2.909]}
        rotation={[1.067, -0.66, -2.304]}
        scale={[1.762, 1.175, 1.206]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_Sphere003.geometry}
        material={materials["Material.004"]}
        position={[-4.725, -0.375, -2.456]}
        rotation={[1.123, 0.855, 0]}
        scale={[1.361, 1.457, 1.475]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001_Sphere.geometry}
        material={materials["Material.004"]}
        position={[-4.378, -0.218, -1.675]}
        rotation={[-1.503, 0, 0]}
        scale={1.345}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere005.geometry}
        material={materials["Material.004"]}
        position={[-3.932, -0.168, -1.14]}
        rotation={[-1.383, 0, 0]}
        scale={1.264}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere001.geometry}
        material={materials["Material.004"]}
        position={[-4.414, -0.122, -1.156]}
        scale={[0.243, 0.163, 0.243]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_Sphere002.geometry}
        material={materials["Material.004"]}
        position={[-3.033, -0.42, -0.531]}
        rotation={[1.123, 0.855, 0]}
        scale={[1.361, 1.457, 1.475]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001_Sphere001.geometry}
        material={materials["Material.004"]}
        position={[-2.315, -0.349, -0.396]}
        rotation={[-1.506, 0.022, 0.326]}
        scale={1.165}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001_Sphere002.geometry}
        material={materials["Material.004"]}
        position={[-1.8, -0.527, -0.396]}
        rotation={[-1.506, 0.022, 0.326]}
        scale={[0.78, 1.139, 3.123]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_Sphere004.geometry}
        material={materials["Material.004"]}
        position={[3.037, -0.42, -3.699]}
        rotation={[1.123, 0.855, 0]}
        scale={[1.361, 1.457, 1.475]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001_Sphere003.geometry}
        material={materials["Material.004"]}
        position={[3.755, -0.163, -3.564]}
        rotation={[-1.506, 0.022, 0.326]}
        scale={[1.165, 1.167, 1.525]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001_Sphere004.geometry}
        material={materials["Material.004"]}
        position={[4.27, -0.527, -3.564]}
        rotation={[-1.506, 0.022, 0.326]}
        scale={[0.78, 1.139, 3.123]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_Sphere005.geometry}
        material={materials["Material.004"]}
        position={[3.128, -0.653, -2.615]}
        rotation={[1.123, 0.855, 0]}
        scale={[1.361, 1.457, 1.475]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere004.geometry}
        material={materials["Material.004"]}
        position={[2.841, -0.288, -1.954]}
        rotation={[-1.388, -0.045, -0.237]}
        scale={[1.264, 1.301, 1.214]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere006.geometry}
        material={materials["Material.004"]}
        position={[3.609, -0.243, -2.949]}
        rotation={[-Math.PI, 1.368, -Math.PI]}
        scale={[0.505, 0.339, 0.505]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029.geometry}
        material={materials["tiles-stone.001"]}
        position={[0, -0.67, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials.Water}
        position={[0, 0.008, 0]}
        scale={[0.991, 0.901, 0.991]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane030.geometry}
        material={materials.bg}
        position={[0, -0.99, 0]}
        scale={35.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Woodtile}
        position={[0.015, 1.652, -1.155]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials.Flag}
        position={[0.015, 6.16, -3.094]}
      />
      <group
        position={[1.515, 0.219, 0.827]}
        rotation={[0.381, 0, 0]}
        scale={[1, 0.11, 0.696]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane032_1.geometry}
          material={materials.deck}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane032_2.geometry}
          material={materials.roof}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.roof}
        position={[1.666, -0.203, 3.241]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={materials.roof}
        position={[1.666, -0.211, 1.101]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials.roof}
        position={[1.015, -0.151, 1.101]}
        rotation={[0, 0.912, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials.roof}
        position={[1.015, -0.186, 2.163]}
        rotation={[-Math.PI, 0.011, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder005.geometry}
        material={materials.roof}
        position={[1.666, -0.151, 2.17]}
        rotation={[Math.PI, -0.901, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006.geometry}
        material={materials.roof}
        position={[1.758, 0.086, 0.337]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007.geometry}
        material={materials.roof}
        position={[1.758, 0.064, -0.385]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder008.geometry}
        material={materials.roof}
        position={[-0.881, 0.102, 0.337]}
        rotation={[Math.PI, -1.015, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder009.geometry}
        material={materials.roof}
        position={[-0.881, 0.047, -0.385]}
        rotation={[0, 1.52, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder010.geometry}
        material={materials.roof}
        position={[0.541, 0.064, 0.337]}
        rotation={[0, -1.075, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder011.geometry}
        material={materials.roof}
        position={[0.541, 0.076, -0.385]}
        rotation={[Math.PI, -1.261, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials.roof}
        position={[1.025, -0.203, 3.241]}
        rotation={[Math.PI, -0.156, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.tower}
        position={[1.345, 0.476, 3.225]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials.Flag}
        position={[1.089, 0.396, 3.315]}
        rotation={[Math.PI / 2, 0.232, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text001.geometry}
        material={materials.Flag}
        position={[1.561, 0.411, 3.315]}
        rotation={[Math.PI / 2, -0.208, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text002.geometry}
        material={materials["tower-top"]}
        position={[1.326, 0.444, 3.315]}
        rotation={[Math.PI / 2, 0.009, 0]}
      />
      <group
        position={[-2.704, 0.581, 3.282]}
        rotation={[0, -0.478, 0]}
        scale={0.517}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_1.geometry}
          material={materials.Planebody}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_2.geometry}
          material={materials["Material.005"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={materials.Planebody}
        position={[-2.704, 0.581, 3.282]}
        rotation={[0, -0.478, 0]}
        scale={0.517}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle003.geometry}
        material={materials.Wings}
        position={[-1.066, 0.908, 1.066]}
        rotation={[0, -0.478, 0]}
        scale={0.517}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane032.geometry}
        material={materials.Wings}
        position={[-2.742, 1.083, 3.355]}
        rotation={[0, -0.478, 0]}
        scale={0.517}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle004.geometry}
        material={materials.Wings}
        position={[-2.444, 0.364, 3.26]}
        rotation={[0, -0.478, 0]}
        scale={0.517}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle005.geometry}
        material={materials["tower-top"]}
        position={[-3.2, 0.581, 4.24]}
        rotation={[Math.PI / 2, 0, 0.478]}
        scale={0.517}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane033.geometry}
          material={materials.Wings}
          position={[0, -0.056, 0]}
          scale={1.13}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane034.geometry}
          material={materials.Wings}
          position={[0, -0.056, 0]}
          rotation={[Math.PI, -1.027, Math.PI]}
          scale={1.13}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane035.geometry}
          material={materials.Wings}
          position={[0, -0.056, 0]}
          rotation={[-Math.PI, 0.989, -Math.PI]}
          scale={1.13}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle006.geometry}
        material={nodes.Circle006.material}
        position={[-2.556, 0.581, 2.996]}
        rotation={[0, -0.478, 0]}
        scale={0.517}
      />
    </group>
  );
}

useGLTF.preload(buildingScene);

export default Island;
