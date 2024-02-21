import React, { Suspense } from "react";
import Canvas from "@react-three/fiber";
import Loader from "./Loader";

function Model() {
  return (
    <div>
      <Canvas camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>durectional</Suspense>
      </Canvas>
    </div>
  );
}

export default Model;
