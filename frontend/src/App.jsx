import { useState } from "react";
import "./App.css";
import ModelMain from "./components/ModelMain";
import Navbar from "./components/Navbar";
import Body from "./components/Body";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <ModelMain />
      </div>
    </>
  );
}

export default App;
