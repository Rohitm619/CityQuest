import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Building from "../models/Building";

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
      screenScale = [0.8, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [islandScale, islandPosition, buildingRotation] =
    adjustBuildingForScreenSize();
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-[100%]">
      <Canvas camera={{ near: 0.1, far: 1000 }} className="h-[95%]">
        <Suspense>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <spotLight />
          <hemisphereLight color="#b1e1ff" />

          <Building
            isRotating={isRotating}
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
