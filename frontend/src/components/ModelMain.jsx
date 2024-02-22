import React, { Suspense } from "react";
import Loader from "./Loader";
import Building from "../models/Building";
import { Canvas } from "@react-three/fiber";

function ModelMain() {
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

  const [buildingScale, buildingPosition, buildingRotation] =
    adjustBuildingForScreenSize();

  return (
    <div className="outer-div bg-gradient-to-r from-cyan-500 to-blue-500">
      <Canvas camera={{ near: 0.1, far: 1000 }} className="h-screen">
        <Suspense fallback={<Loader />}>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <spotLight />
          <hemisphereLight color="#b1e1ff" />

          <Building
            position={buildingPosition}
            scale={buildingScale}
            rotation={buildingRotation}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ModelMain;
