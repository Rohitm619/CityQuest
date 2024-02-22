import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Building from "../models/Building";
import { Sky } from "../models/Sky";
import { Grass } from "../models/Grass";
import { Cars } from "../models/Cars";
import { SwimmingPool } from "../models/SwimmingPool";

function Model() {
  const [isRotating, setIsRotating] = useState(true);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustBuildingForScreenSize = () => {
    let screenScale;
    let screenPosition = [-10, -10, -30];
    let rotation = [-1, 4.715, -1.2];

    if (window.innerWidth < 786) {
      screenPosition = [-12, 5, -30];
      screenScale = [0.6, 0.6, 0.6];
    } else {
      screenScale = [0.3, 0.3, 0.3];
    }

    // return [screenScale, screenPosition, rotation];
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
          <Sky isRotating={isRotating} />
          <Building
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={buildingRotation}
            scale={islandScale}
          />
              <Cars position={[1,-4,-10]} scale={[-0.2,0.2,0.1]}/>
              {/* <SwimmingPool position={[2,-6,-12]} scale={[-0.1,0.3,0.2]}/> */}

           <Grass position={[5, 5, 5]} scale={[8,8,8]}/> 

        </Suspense>
      </Canvas>
    </div>
  );
}

export default Model;
