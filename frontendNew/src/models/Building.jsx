import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import residentialComplex from "../assets/residentialComplex.glb";
import { a } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import cars from "../assets/cars.glb";
import bench from "../assets/bench.glb";
import parkingLot from "../assets/parking_lot.glb";
import swimmingPool from "../assets/giant_swimming_pool.glb";
import cloud from "../assets/cloud_test.glb";

export function Building({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  isCars,
  isBench,
  isParkingLot,
  isSwimmingPool,
  ...props
}) {
  const { nodes, materials } = useGLTF(residentialComplex);
  const islandRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  const { scene: carScene } = useGLTF(cars);
  const { scene: benchScene } = useGLTF(bench);
  const { scene: parkingLotScene } = useGLTF(parkingLot);
  const { scene: swimmingPoolScene } = useGLTF(swimmingPool);
  const { scene: cloudScene } = useGLTF(cloud);

  return (
    <a.group {...props} ref={islandRef} dispose={null}>
      <group scale={0.01}>
        {isCars ? (
          <mesh
            castShadow
            receiveShadow
            position={[-26.459, 250.394, 1500.042]}
            rotation={[6.2, 0, 0]}
            scale={[19.865, 17.155, 15.939]}
          >
            <primitive object={carScene} />
          </mesh>
        ) : (
          ""
        )}

        {true ? (
          <mesh
            castShadow
            receiveShadow
            position={[2760, 190, -550]}
            rotation={[0, -1.575, 0]}
            scale={[590.865, 570.155, 500.939]}
          >
            <primitive object={parkingLotScene} />
          </mesh>
        ) : (
          ""
        )}

        {true ? (
          <mesh
            castShadow
            receiveShadow
            position={[-500, 190, -3000]}
            rotation={[0, 1.6, 0]}
            scale={[10, 10, 10]}
          >
            <primitive object={swimmingPoolScene} />
          </mesh>
        ) : (
          ""
        )}

        {true ? (
          <mesh
            castShadow
            receiveShadow
            position={[-500, 190, -3000]}
            rotation={[0, 1.6, 0]}
            scale={[10, 10, 10]}
          >
            <primitive object={cloudScene} />
          </mesh>
        ) : (
          ""
        )}

        {isBench ? (
          <a.group>
            <mesh
              castShadow
              receiveShadow
              position={[-1460.459, 250.394, 0]}
              rotation={[0, 0, 0]}
              scale={[0.05, 0.05, 0.05]}
            >
              <primitive object={benchScene.clone()} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              position={[1360.459, 250.394, 0]}
              rotation={[0, 3.1, 0]}
              scale={[0.05, 0.05, 0.05]}
            >
              <primitive object={benchScene.clone()} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              position={[1360.459, 250.394, 300]}
              rotation={[0, 3.1, 0]}
              scale={[0.05, 0.05, 0.05]}
            >
              <primitive object={benchScene.clone()} />
            </mesh>
          </a.group>
        ) : (
          ""
        )}

        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line001_Material_#16_0"].geometry}
          material={materials.Material_16}
          position={[-26.459, 241.394, -273.042]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line002_Material_#16_0"].geometry}
          material={materials.Material_16}
          position={[-27.497, 569.374, -257.474]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line005_Material_#16_0"].geometry}
          material={materials.Material_16}
          position={[507.127, 2018.968, -654.729]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line006_nardeh_0.geometry}
          material={materials.nardeh}
          position={[-281.315, 241.394, 313.924]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle001_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-895.059, 389.178, -152.112]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle002_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-895.06, 389.178, 136.269]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle003_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-638.757, 389.178, 919.766]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle004_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.955, 389.178, 884.495]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle005_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.955, 389.178, 587.255]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle006_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[268.186, 389.178, 104.563]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle007_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.955, 389.178, 1174.269]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle008_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[40.22, 389.178, 1307.201]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box001_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-892.701, 389.604, -135.121]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box002_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-892.702, 389.604, 152.89]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box003_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[270.59, 389.604, 96.663]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box004_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.358, 389.604, 610.463]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box005_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.358, 389.604, 904.296]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box006_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.358, 389.604, 1192.329]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box007_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-636.346, 389.604, 939.247]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box008_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[47.827, 389.604, 1300.326]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box009_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-278.567, 389.604, 1202.4]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle009_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-286.221, 389.178, 1204.428]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box010_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-460.511, 389.604, 1202.4]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle010_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-468.165, 389.178, 1204.428]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line007_Material_#25_0"].geometry}
          material={materials.Material_25}
          position={[-280.952, 539.76, 301.419]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box011_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-365.576, 270.83, 1204.626]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box012_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-633.842, 389.604, 646.261]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box013_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-633.842, 389.604, 489.145]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box014_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.42, 270.83, 571.126]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[17.155, 19.865, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle011_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.19, 389.178, 639.651]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle012_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.191, 389.178, 482.536]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box015_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[270.597, 389.604, 245.627]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle013_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[268.194, 389.178, 253.527]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box016_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-892.702, 717.074, 152.89]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle014_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-895.06, 716.649, 152.446]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box017_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-892.701, 717.074, -138.242]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle015_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-895.059, 716.649, -138.686]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box018_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-633.842, 688.046, 646.261]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box019_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-633.842, 688.046, 489.145]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box020_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.42, 569.272, 571.126]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[17.155, 19.865, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle016_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.19, 687.62, 639.651]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle017_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.191, 687.62, 482.536]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box021_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-636.346, 717.112, 937.148]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle018_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-638.757, 716.687, 935.071]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box022_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-278.567, 687.996, 1035.456]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box023_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-460.511, 687.996, 1035.456]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle019_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-286.221, 687.571, 1037.483]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle020_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-468.165, 687.571, 1037.483]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box025_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[47.827, 717.302, 1319.572]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle021_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[40.173, 716.876, 1321.6]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box026_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.358, 717.318, 610.463]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box027_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.358, 717.318, 904.296]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box028_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.358, 717.318, 1192.329]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle022_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.955, 716.893, 900.975]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle023_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.955, 716.893, 606.354]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle024_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.955, 716.893, 1192.344]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box030_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[447.33, 687.996, 22.803]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle026_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[439.676, 687.571, 24.831]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box031_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[269.135, 717.318, 133.983]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle027_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[266.732, 716.893, 129.875]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box032_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[530.11, 717.318, -272.637]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle028_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[527.707, 716.893, -276.745]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box033_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[530.111, 717.318, -537.764]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle029_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[527.707, 716.893, -541.872]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line009_Material_#25_0"].geometry}
          material={materials.Material_25}
          position={[-281.315, 897.358, 313.924]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box034_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-892.702, 1074.663, 152.89]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box035_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-892.701, 1074.663, -138.242]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box036_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-633.842, 1045.635, 646.261]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box037_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-633.842, 1045.635, 489.145]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box039_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-636.346, 1074.701, 937.148]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box040_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-278.567, 1045.585, 1035.456]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box041_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-460.511, 1045.585, 1035.456]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box043_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[47.827, 1074.89, 1319.572]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box044_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.358, 1074.907, 610.463]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box045_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.358, 1074.907, 904.296]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box046_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.358, 1074.907, 1192.329]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box047_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[448.876, 1045.585, 22.803]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box048_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[269.135, 1074.907, 133.983]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box049_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[530.11, 1074.907, -272.637]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box050_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[530.111, 1074.907, -537.764]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line010_Material_#16_0"].geometry}
          material={materials.Material_16}
          position={[-27.497, 926.963, -257.474]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line011_Material_#25_0"].geometry}
          material={materials.Material_25}
          position={[-281.315, 1991.212, 313.924]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle030_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-895.06, 1074.238, 152.446]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle031_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-895.059, 1074.238, -138.686]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle032_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.19, 1045.209, 639.651]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle033_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.191, 1045.209, 482.536]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle034_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-638.757, 1074.276, 935.071]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle035_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-286.221, 1045.16, 1037.483]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle036_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-468.165, 1045.16, 1037.483]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle037_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[40.173, 1074.465, 1321.6]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle038_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.955, 1074.482, 900.975]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle039_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.955, 1074.482, 606.354]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle040_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.955, 1074.482, 1192.344]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle041_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[441.222, 1045.16, 24.83]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle042_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[266.732, 1074.482, 129.875]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle043_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[527.707, 1074.482, -276.745]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle044_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[527.707, 1074.482, -541.872]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box051_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.04, 2166.225, 137.262]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle045_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.637, 2165.8, 133.154]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box052_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[527.488, 2166.44, -277.031]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box053_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[528.009, 2166.439, -540.784]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle046_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[525.084, 2166.014, -281.139]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle047_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[525.606, 2166.014, -544.892]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box054_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-631.611, 2166.563, 305.58]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle048_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-633.97, 2166.137, 305.135]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box055_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.358, 2167.071, 610.463]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box056_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[266.358, 2167.071, 904.296]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle049_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.955, 2166.645, 900.769]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle050_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[263.955, 2166.645, 602.413]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box057_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[47.827, 2166.614, 1095.278]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle051_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[40.173, 2166.188, 1097.305]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box058_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-278.567, 2139.788, 855.22]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box059_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-460.511, 2139.788, 855.22]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle052_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-286.221, 2139.362, 857.247]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle053_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-468.165, 2139.362, 857.247]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box061_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-631.611, 2166.563, 626.325]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.155, 9.939, 8.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle054_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-633.97, 2166.137, 625.881]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[13.498, 7.82, 15.631]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box062_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-243.256, 2166.536, -694.763]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.346, 9.939, 9.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle055_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-242.858, 2166.11, -697.399]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[12.075, 7.82, 17.473]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box063_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[60.928, 2166.536, -694.763]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.346, 9.939, 9.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle056_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[61.325, 2166.11, -697.399]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[12.075, 7.82, 17.473]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box064_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[364.024, 2166.536, -694.763]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.346, 9.939, 9.494]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle057_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[364.422, 2166.11, -697.399]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[12.075, 7.82, 17.473]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box065_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[448.876, 2138.413, 33.121]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle058_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[441.222, 2137.987, 35.149]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box066_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-370.144, 2139.788, -81.612]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[22.206, 9.939, 6.561]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box067_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-370.144, 2139.788, -284.993]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[22.206, 9.939, 6.561]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle059_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-371.957, 2139.362, -90.167]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[17.473, 7.82, 12.075]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle060_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-371.958, 2139.362, -293.549]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[17.473, 7.82, 12.075]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line012_rail_0.geometry}
          material={materials.rail}
          position={[-282.335, 2346.939, 313.924]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line013_Material_#16_0"].geometry}
          material={materials.Material_16}
          position={[8.833, 2376.625, 203.554]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box069_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-260.493, 2495.194, 519.11]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box070_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-442.437, 2495.194, 519.11]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle061_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-268.147, 2494.768, 521.137]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle062_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-450.091, 2494.768, 521.137]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box072_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-168.132, 2495.194, 643.16]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[22.206, 9.939, 6.561]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box073_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-168.132, 2495.194, 439.778]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[22.206, 9.939, 6.561]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle063_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-169.946, 2494.768, 634.604]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[17.473, 7.82, 12.075]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle064_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-169.946, 2494.768, 431.222]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[17.473, 7.82, 12.075]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box075_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-58.939, 2539.56, 807.925]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle065_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-66.593, 2539.134, 809.953]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box076_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[151.005, 2539.56, 807.925]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle066_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[143.351, 2539.134, 809.953]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box077_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[269.33, 2539.56, 647.207]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[22.206, 9.939, 6.561]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle067_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[271.143, 2539.134, 655.763]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.473, 7.82, 12.075]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box078_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[530.035, 2539.56, 243.815]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[22.206, 9.939, 6.561]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle068_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[531.849, 2539.134, 252.371]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.473, 7.82, 12.075]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box079_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[272.176, 2539.56, -171.931]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[22.206, 9.939, 6.561]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle069_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[273.99, 2539.134, -163.375]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[17.473, 7.82, 12.075]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line014_rail_0.geometry}
          material={materials.rail}
          position={[-2.113, 2704.614, 263.973]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.159, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box080_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[108.381, 2539.56, -336.386]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle070_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[116.034, 2539.135, -338.414]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box081_wall_dor_0.geometry}
          material={materials.wall_dor}
          position={[-123.586, 2539.56, -336.386]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[19.865, 9.939, 7.335]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle071_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-115.933, 2539.135, -338.414]}
          scale={[15.631, 7.82, 13.498]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Shape002_wall_0.geometry}
          material={materials.wall}
          position={[-281.315, 897.399, 313.924]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Shape003_wall_0.geometry}
          material={materials.wall}
          position={[-281.315, 1991.06, 308.581]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Shape004_wall_0.geometry}
          material={materials.wall}
          position={[-280.952, 1377.385, 318.854]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes._wall_0.geometry}
          material={materials.wall}
          position={[-281.315, 2346.949, 313.924]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Shape_wall_0.geometry}
          material={materials.wall}
          position={[-2.113, 2704.614, 263.973]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.159, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Shape007_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-2.113, 2702.484, 263.973]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.396, 9.376, 10.227]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Shape009_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-281.315, 2346.186, 313.924]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Shape011_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-281.315, 1991.026, 308.581]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Shape013_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-281.315, 896.522, 313.924]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Shape015_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-280.952, 1377.385, 318.854]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line015_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-487.667, 301.902, 1282.63]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line017_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 601.866, 1301.462]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line019_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 967.611, 1301.462]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line024_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 2451.937, 1078.146]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line026_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 2067.656, 1076.866]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line027_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 2092.844, 1076.866]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line028_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[504.568, 967.611, 330.245]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line029_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[504.568, 995.421, 330.245]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line030_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[670.92, 611.181, 330.245]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line032_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[497.915, 2058.316, 330.245]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line033_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[497.915, 2086.126, 330.245]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line034_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[670.92, 630.003, 330.245]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line035_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-1000.477, 967.611, 687.011]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line036_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-1000.477, 995.421, 687.011]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line037_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-1000.477, 604.766, 687.011]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line038_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-1000.477, 632.576, 687.011]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line039_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-1000.477, 301.147, 687.011]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line040_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-1000.477, 328.957, 687.011]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line042_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-612.931, 2092.844, -106.92]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line043_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-612.931, 2064.971, -106.92]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box082_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-907.382, 318.245, 382.272]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box083_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-907.382, 318.245, 555.771]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box084_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-907.547, 318.245, 717.593]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box085_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-661.831, 318.245, 717.593]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box086_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.543, 626.27, 390.596]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box087_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.543, 626.27, 564.095]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box088_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.708, 626.27, 727.01]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box089_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-661.831, 626.27, 726.669]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box090_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.071, 981.026, 390.596]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box091_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-912.651, 981.026, 564.095]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box092_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.717, 981.025, 722.933]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box093_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-664.585, 981.025, 723.474]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box094_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.071, 2075.875, 390.596]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box095_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-912.651, 2075.875, 564.095]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box096_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.717, 2075.875, 722.933]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box097_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.071, 2075.875, 208.968]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box098_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.071, 2075.875, 27.34]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box099_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.071, 2075.875, -154.288]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box100_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-915.459, 2075.875, -360.544]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box101_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-650.587, 2075.875, -360.544]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box102_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-418.921, 2075.875, -360.545]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box103_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.108, 624.486, -502.771]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box104_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-549.568, 624.486, -502.632]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box105_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-549.568, 624.486, -881.975]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box106_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-343.513, 624.486, -906.46]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box107_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-137.458, 624.486, -906.46]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box108_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[68.596, 624.486, -906.46]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box109_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[274.65, 624.486, -906.46]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box110_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[480.705, 624.486, -906.46]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box111_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[703.421, 624.486, -907.097]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box112_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[703.421, 624.486, -626.288]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box113_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[703.421, 624.486, -353.892]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box114_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[703.421, 624.486, -111.374]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box115_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[703.421, 624.486, 163.015]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box116_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[703.421, 624.486, 501.669]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box117_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[479.812, 624.486, 501.669]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box118_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[296.944, 624.486, 501.669]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box119_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[550.515, 983.141, 290.139]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box121_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[551.57, 983.338, 497.041]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box122_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[296.944, 983.37, 498.066]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box123_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[550.515, 983.141, 56.652]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box124_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[553.552, 2077.528, 286.278]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box125_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[553.381, 2077.352, 495.445]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box126_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[299.937, 2077.261, 495.759]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box127_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[553.552, 2077.528, 66.134]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box128_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-681.021, 2075.875, 722.933]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box129_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-659.248, 2075.875, 902.002]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box130_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-659.248, 2075.875, 1127.538]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box134_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-88.736, 2075.875, 1346.946]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box135_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[99.799, 2075.875, 1346.946]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box136_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[294.816, 2075.875, 1346.946]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box137_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[294.816, 2075.875, 1126.01]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box138_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-659.248, 2431.808, 1118.795]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box139_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-457.88, 2431.808, 1118.795]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box140_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-266.638, 2431.808, 1118.795]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box141_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-88.736, 2431.808, 1118.795]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box142_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[99.799, 2431.808, 1118.795]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box143_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[294.816, 2431.808, 1118.795]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box144_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[294.816, 2431.808, 897.859]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box145_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-659.248, 2431.808, 907.906]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box146_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-659.248, 2431.808, 724.164]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box147_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.533, 2431.808, 724.164]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box148_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.533, 2431.808, 367.626]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box149_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.533, 2431.808, 11.088]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box150_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-913.533, 2431.808, -354.193]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box151_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-638.405, 2431.808, -354.193]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box152_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-396.023, 2431.808, -354.193]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box153_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-396.023, 2431.808, -520.733]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box154_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-396.023, 2431.808, -713.989]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box155_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-203.719, 2431.808, -713.989]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box156_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-11.416, 2431.808, -713.989]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box157_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[180.888, 2431.808, -713.989]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box158_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[373.191, 2431.808, -713.989]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box159_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[550.413, 2431.808, -713.989]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box160_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[550.413, 2431.808, -539.137]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box161_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[550.413, 2431.808, -357.006]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box162_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[550.413, 2431.808, -176.509]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box163_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[550.413, 2431.808, -0.801]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line044_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 2424.021, 1078.146]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line045_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 2484.95, 1078.146]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line046_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-612.931, 2128.912, -106.92]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line047_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-1000.477, 1034.436, 687.011]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line048_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-1000.477, 680.815, 687.011]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line049_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-1000.477, 372.321, 687.011]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line050_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[670.92, 677.493, 330.245]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line051_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 2128.568, 1076.866]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box167_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-650.117, 318.113, 1210.041]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box169_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-334.798, 318.113, 1332.356]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box170_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-199.867, 318.113, 1332.356]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line052_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-487.667, 332.05, 1282.63]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line053_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-487.667, 371.432, 1282.63]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box171_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-657.762, 620.526, 1202.098]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box172_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-657.762, 620.526, 1065.027]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box175_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-206.504, 620.526, 1343.841]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line054_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 630.98, 1301.462]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line055_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 674.209, 1301.462]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box176_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-657.762, 981.887, 1202.098]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box177_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-657.762, 981.887, 1065.027]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box180_Material_#6_0"].geometry}
          material={materials.Material_6}
          position={[-206.504, 982.631, 1343.841]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line056_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 1000.47, 1301.462]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line057_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[-502.827, 1034.334, 1301.462]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[8.151, 9.111, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box181_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.42, 926.585, 571.126]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[17.155, 19.865, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box182_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-365.576, 568.963, 1037.047]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box183_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-365.576, 926.452, 1037.047]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box184_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-365.576, 2020.515, 856.295]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box185_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-347.349, 2377.019, 520.162]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box186_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-370.585, 2020.465, -179.292]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box187_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-168.28, 2377.019, 656.706]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line058_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[399.594, 717.866, 22.946]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line059_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[399.594, 1076.571, 22.946]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line060_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[399.594, 2166.372, 34.347]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line061_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-631.403, 2166.372, 309.957]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line062_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-631.403, 2166.372, 628.47]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line063_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-894.909, 1073.89, 152.168]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line064_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-894.909, 1073.89, -138.71]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line065_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-894.909, 716.292, -138.71]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line066_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-894.909, 716.292, 150.191]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line067_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-894.909, 387.813, 136.387]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line068_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-894.909, 387.813, -156.452]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line069_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.783, 1073.89, 934.494]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line070_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.783, 718.025, 934.494]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line071_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-636.783, 388.299, 934.494]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line072_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[45.339, 390.65, 1303.161]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line073_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[45.339, 718.304, 1319.646]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line074_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[45.339, 1074.101, 1319.646]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line075_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[45.339, 2168.023, 1097.56]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line076_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[264.87, 2168.023, 900.724]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line077_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[264.87, 2168.023, 601.023]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line078_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[264.87, 1072.334, 610.315]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line079_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[264.87, 1072.334, 902.65]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line080_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[264.87, 1072.334, 1193.465]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line081_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[264.87, 720.112, 1193.465]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line082_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[264.87, 720.112, 899.156]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line083_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[264.87, 720.112, 603.604]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line084_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[264.87, 389.55, 586.239]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line085_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[264.87, 389.55, 886.552]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line086_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[264.87, 389.55, 1174.624]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line087_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[524.331, 1072.334, -543.842]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line088_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[524.331, 1072.334, -274.063]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line089_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[524.331, 717.528, -274.063]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line090_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[524.331, 717.528, -543.089]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line091_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[524.331, 2168.439, -280.656]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line092_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[524.331, 2168.438, -542.299]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line093_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[146.147, 2540.036, 809.564]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line094_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-59.569, 2540.036, 809.564]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line095_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[271.338, 2540.924, 656.726]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line096_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[271.338, 2540.924, -169.054]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line097_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[533.265, 2540.924, 249.149]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line098_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[110.077, 2539.989, -337.954]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line099_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-120.819, 2539.989, -337.954]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line100_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[-228.204, 2169.13, -698.538]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line101_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[73.943, 2169.13, -698.538]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line102_Material_#80_0"].geometry}
          material={materials.Material_80}
          position={[378.091, 2169.13, -698.538]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line103_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[707.964, 554.608, -846.316]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line104_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[707.964, 554.608, -197.983]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line105_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[707.964, 554.608, 450.349]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line106_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[650.792, 554.608, 505.982]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line107_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[383.348, 554.608, 505.982]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line108_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[282.911, 554.608, 588.405]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line109_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[282.911, 554.608, 909.425]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line110_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[282.911, 554.608, 1265.411]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line111_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[198.293, 554.608, 1343.812]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line112_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-213.704, 554.608, 1343.812]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line115_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-652.408, 554.608, 811.97]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line116_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-745.507, 554.608, 718.89]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line117_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-853.282, 554.608, 718.89]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line118_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-917.202, 554.608, 667.152]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line119_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-917.202, 554.608, 111.569]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line120_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-917.202, 554.608, -424.387]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line121_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-858.232, 554.608, -497.52]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line122_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-635.782, 554.608, -497.52]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line123_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-548.386, 554.608, -593.835]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line124_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-548.386, 554.608, -827.069]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line125_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-487.38, 554.608, -903.843]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line126_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[47.012, 554.608, -903.843]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line127_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[664.963, 554.608, -903.843]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line128_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[547.222, 911.619, -605.614]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line129_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[547.222, 911.619, -131.015]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line130_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[547.222, 911.619, 343.585]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line131_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[282.524, 911.619, 625.357]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line132_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[282.524, 911.619, 1241.673]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line133_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[406.091, 911.619, -713.819]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line134_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-299.692, 911.619, -713.819]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line135_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-525.413, 911.619, -355.431]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line136_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-830.22, 911.619, -355.431]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line137_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-918.195, 911.619, -263.618]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line138_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-918.195, 911.619, 644.339]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line139_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-656.202, 911.619, 839.964]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line142_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-156.741, 911.619, 1345.458]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line143_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[191.79, 911.619, 1345.458]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line144_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[282.524, 2006.276, 1241.673]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line145_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[282.524, 2006.276, 600.532]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line146_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[558.224, 2006.276, 398.693]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line147_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[556.058, 2006.276, -167.081]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line148_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[552.825, 2006.276, -647.001]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line149_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[406.091, 2006.929, -713.819]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line150_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-306.721, 2006.929, -713.819]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line151_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-395.643, 2006.929, -636.79]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line152_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-395.643, 2006.929, -455.27]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line153_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-457.454, 2006.929, -357.873]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line154_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-847.437, 2006.929, -357.873]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line155_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-918.313, 2006.418, -275.357]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line156_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-918.313, 2006.418, 111.249]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line157_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-918.313, 2006.418, 652.884]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line158_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-656.202, 2006.517, 839.964]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line161_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-155.347, 2005.733, 1345.458]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line162_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[212.808, 2005.733, 1345.458]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line163_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[212.808, 2361.42, 1119.337]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line164_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-209.562, 2361.42, 1119.337]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line165_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-583.259, 2361.42, 1119.337]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line166_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-657.941, 2361.42, 1061.212]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line167_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-916.672, 2361.42, 628.907]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line168_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-916.672, 2361.42, 247.027]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line169_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-916.672, 2361.42, -268.242]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line170_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-397.288, 2361.42, -539.071]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line171_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[283.939, 2361.42, 1037.054]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line172_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[283.939, 2361.42, 604.746]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line173_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[538.828, 2361.42, 375.923]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line174_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[538.828, 2361.42, -570.541]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line175_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[442.079, 2361.42, -713.397]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line176_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-309.644, 2361.42, -713.397]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box230_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[143.193, 1166.061, 1339.934]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box231_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[-55.085, 1166.061, 1339.934]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box232_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[143.193, 2256.018, 1116.288]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box233_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[-55.085, 2256.018, 1116.288]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box234_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[288.072, 1166.061, 1098.52]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box235_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[288.072, 1166.061, 1281.612]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box236_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[286.674, 1166.061, 806.997]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box237_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[286.674, 1166.061, 991.728]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box238_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[287.166, 1166.061, 692.836]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box239_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[287.166, 1166.061, 512.598]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box240_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[546.415, 1166.061, -184.539]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box241_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[546.415, 1166.061, -367.706]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box242_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[550.96, 1166.061, -450.414]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box243_Material_#14_0"].geometry}
          material={materials.Material_14}
          position={[550.96, 1166.061, -635.025]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box244_Material_#15_0"].geometry}
          material={materials.Material_15}
          position={[358.129, 241.392, 74.296]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line222_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[504.568, 1036.921, 330.245]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line221_Material_#9_0"].geometry}
          material={materials.Material_9}
          position={[497.915, 2130.829, 330.245]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[9.111, 8.151, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Shape016_wall_0.geometry}
          material={materials.wall}
          position={[-280.952, 1074.718, 318.854]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line219_rail_0.geometry}
          material={materials.rail}
          position={[-259.372, 234.803, 203.294]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box189_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[-61.587, 2429.192, 818.558]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line178_window#_0"].geometry}
          material={materials.window}
          position={[-150.505, 2431.948, 828.887]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box190_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[44.664, 2054.875, 1110.725]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line179_window#_0"].geometry}
          material={materials.window}
          position={[-44.254, 2057.631, 1121.053]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box191_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[44.664, 963.576, 1328.814]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line180_window#_0"].geometry}
          material={materials.window}
          position={[-44.254, 966.332, 1339.142]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box192_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[44.664, 605.658, 1328.814]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line181_window#_0"].geometry}
          material={materials.window}
          position={[-44.254, 608.414, 1339.142]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box193_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[44.664, 278.356, 1315.918]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line182_window#_0"].geometry}
          material={materials.window}
          position={[-44.254, 281.112, 1326.247]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box194_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[277.92, 963.063, 1188.404]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line183_window#_0"].geometry}
          material={materials.window}
          position={[288.248, 965.818, 1277.322]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box195_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[277.92, 605.531, 1188.404]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line184_window#_0"].geometry}
          material={materials.window}
          position={[288.248, 608.287, 1277.322]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box196_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[277.92, 278.218, 1175.479]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line185_window#_0"].geometry}
          material={materials.window}
          position={[288.248, 280.974, 1264.398]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box197_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[277.92, 963.063, 899.682]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line186_window#_0"].geometry}
          material={materials.window}
          position={[288.248, 965.818, 988.6]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box198_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[277.92, 605.531, 899.682]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line187_window#_0"].geometry}
          material={materials.window}
          position={[288.248, 608.287, 988.6]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box199_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[280.927, 278.218, 886.757]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line188_window#_0"].geometry}
          material={materials.window}
          position={[291.256, 280.974, 975.676]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box200_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[277.92, 963.063, 604.004]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line189_window#_0"].geometry}
          material={materials.window}
          position={[288.248, 965.818, 692.922]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box201_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[277.92, 605.531, 604.004]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line190_window#_0"].geometry}
          material={materials.window}
          position={[288.248, 608.287, 692.922]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box202_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[277.92, 278.218, 591.079]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line191_window#_0"].geometry}
          material={materials.window}
          position={[288.248, 280.974, 679.998]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box203_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[277.92, 2055.464, 899.682]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line192_window#_0"].geometry}
          material={materials.window}
          position={[288.248, 2058.22, 988.6]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box204_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[277.92, 2055.464, 604.003]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line193_window#_0"].geometry}
          material={materials.window}
          position={[288.248, 2058.22, 692.922]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box205_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[277.92, 2428.423, 660.682]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line194_window#_0"].geometry}
          material={materials.window}
          position={[288.248, 2431.179, 749.6]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box206_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[539.852, 2429.115, 232.146]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line195_window#_0"].geometry}
          material={materials.window}
          position={[550.181, 2431.871, 321.064]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box207_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[280.757, 2429.115, -181.757]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line196_window#_0"].geometry}
          material={materials.window}
          position={[291.085, 2431.871, -92.838]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box208_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[98.916, 2429.115, -346.853]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line197_window#_0"].geometry}
          material={materials.window}
          position={[187.834, 2431.871, -357.182]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box209_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[-133.131, 2429.115, -346.853]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line198_window#_0"].geometry}
          material={materials.window}
          position={[-44.212, 2431.871, -357.182]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box210_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[536.189, 2055.698, -277.752]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line199_window#_0"].geometry}
          material={materials.window}
          position={[546.518, 2058.454, -188.834]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box211_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[541.888, 2055.698, -543.664]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line200_window#_0"].geometry}
          material={materials.window}
          position={[552.216, 2058.454, -454.745]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box212_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[533.989, 964.298, -543.927]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line201_window#_0"].geometry}
          material={materials.window}
          position={[544.317, 967.054, -455.009]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box213_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[533.989, 964.298, -274.511]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line202_window#_0"].geometry}
          material={materials.window}
          position={[544.317, 967.054, -185.592]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box214_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[533.989, 606.191, -274.511]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line203_window#_0"].geometry}
          material={materials.window}
          position={[544.317, 608.947, -185.592]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box215_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[533.989, 606.191, -539.687]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line204_window#_0"].geometry}
          material={materials.window}
          position={[544.317, 608.947, -450.769]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box216_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[420.094, 606.191, 30.878]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line205_window#_0"].geometry}
          material={materials.window}
          position={[331.176, 608.947, 41.207]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box217_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[420.094, 963.487, 30.878]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line206_window#_0"].geometry}
          material={materials.window}
          position={[331.176, 966.243, 41.207]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box218_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[420.094, 2056.62, 40.426]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line207_window#_0"].geometry}
          material={materials.window}
          position={[331.176, 2059.376, 50.755]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box219_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[-645.961, 2055.166, 627.418]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line208_window#_0"].geometry}
          material={materials.window}
          position={[-656.289, 2057.922, 538.499]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box220_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[-645.961, 2055.166, 304.412]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line209_window#_0"].geometry}
          material={materials.window}
          position={[-656.289, 2057.922, 215.494]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box221_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[-908.742, 963.302, 155.002]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line210_window#_0"].geometry}
          material={materials.window}
          position={[-919.07, 966.058, 66.084]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box222_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[-908.742, 963.302, -137.492]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line211_window#_0"].geometry}
          material={materials.window}
          position={[-919.07, 966.058, -226.41]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box223_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[-908.742, 605.534, -137.492]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line212_window#_0"].geometry}
          material={materials.window}
          position={[-919.07, 608.29, -226.41]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box224_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[-908.742, 605.534, 151.289]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line213_window#_0"].geometry}
          material={materials.window}
          position={[-919.07, 608.29, 62.37]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box225_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[-908.742, 278.448, 136.548]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line214_window#_0"].geometry}
          material={materials.window}
          position={[-919.07, 281.204, 47.629]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box226_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[-908.742, 278.448, -153.818]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line215_window#_0"].geometry}
          material={materials.window}
          position={[-919.07, 281.204, -242.736]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box227_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[64.613, 2055.283, -711.361]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line216_window#_0"].geometry}
          material={materials.window}
          position={[153.532, 2058.039, -721.689]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box228_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[-238.233, 2055.283, -711.361]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line217_window#_0"].geometry}
          material={materials.window}
          position={[-149.314, 2058.039, -721.689]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box229_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[365.822, 2055.283, -711.361]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line218_window#_0"].geometry}
          material={materials.window}
          position={[454.74, 2058.039, -721.689]}
          rotation={[0, Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box245_Material_#7_0"].geometry}
          material={materials.Material_7}
          position={[147.292, 2429.192, 818.558]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line220_window#_0"].geometry}
          material={materials.window}
          position={[58.374, 2431.948, 828.887]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle083_Material_#13_0"].geometry}
          material={materials.Material_13}
          position={[508.051, 269.957, 245.517]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Shape017_wall_0.geometry}
          material={materials.wall}
          position={[-281.315, 1261.082, 313.924]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Rectangle120_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-873.336, 1641.265, 583.053]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Shape019_wall_0.geometry}
          material={materials.wall}
          position={[-281.315, 1626.159, 313.924]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[19.865, 17.155, 9.939]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box326_Material_#5_0"].geometry}
          material={materials.Material_5}
          position={[-9.187, 0, 151.7]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Object_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-259.372, 234.803, 203.294]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Line223_Material_#19_0"].geometry}
          material={materials.Material_19}
          position={[997.542, 227.74, -802.43]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </a.group>
  );
}

useGLTF.preload(residentialComplex);

export default Building;
