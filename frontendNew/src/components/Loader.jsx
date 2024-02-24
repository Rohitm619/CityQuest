import { Html } from "@react-three/drei";
import { quantum } from "ldrs";
import "ldrs/ring";

quantum.register();
const Loader = ({ progress }) => {
  return (
    <Html>
      <div className="flex justify-center items-center">
        <l-quantum size="45" speed="1.75" color="black"></l-quantum>
      </div>
    </Html>
  );
};

export default Loader;
