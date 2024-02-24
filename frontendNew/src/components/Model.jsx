import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Building from "../models/Building";
import Cars from "../models/cars";
import  swimmingPool from "../models/swimmingPool";
import  Grass from "../models/Grass"
import Sky from "../models/Sky";
import Temple from "../models/temple";


function Model() {
  const [isRotating, setIsRotating] = useState(true);
  const [currentStage, setCurrentStage] = useState(1);
  const adjustBuildingForScreenSize = () => {
    let screenScale;
    let screenPosition = [-10, -10, -30];
    let rotation = [-1, 4.715, -1.2];

    if (window.innerWidth < 786) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [0.8, 1, 0.5];
    }

    return [screenScale, screenPosition, rotation];
  };
  const adjustPlaneForScreenSize = () => {
    let screenScale;
    let screenPosition = [-23, -7, -25];
    let rotation = [-1.2, 4.715, -1.3];

    if (window.innerWidth < 786) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [0.15, 0.15, 0.15];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [islandScale, islandPosition, buildingRotation] =
    adjustBuildingForScreenSize();

  const [planeScale, planePosition, planeRotation] = adjustPlaneForScreenSize();
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-[100%]">
      <Canvas camera={{ near: 0.1, far: 1000 }} className="h-[95%]">
        <Suspense>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <spotLight />
          <hemisphereLight color="#b1e1ff" />

          {/* <Cars
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={planePosition}
            rotation={planeRotation}
            scale={planeScale}
          /> */}
          <Grass />
          <Sky/>
          {/* <Temple/> */}

          <Building
            isCars={true}
            isBench={true}
            isTemple={true}
            isRotating={isRotating}
            isDustbin={true}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Model;
