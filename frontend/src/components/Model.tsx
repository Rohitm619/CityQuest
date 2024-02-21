import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader";
import Building from "../models/Building";

function Model() {
  const adjustBuildingForScreenSize = () => {
    let screenScale;
    let screenPosition = [0, -2.5, -10];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 786) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [buildingScale, buildingPosition, buildingRotation] =
    adjustBuildingForScreenSize();

  return (
    <div className="outer-div">
      <Canvas
        camera={{ near: 0.1, far: 1000 }}
        className="w-full h-screen bg-transparent"
      >
        <Suspense fallback={<Loader />}>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <spotLight />
          <hemisphereLight />

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

export default Model;
