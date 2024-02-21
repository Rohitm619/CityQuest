import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Model from "./components/Model";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Model />
      </div>
    </>
  );
}

export default App;
