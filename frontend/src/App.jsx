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
        <h1>City Quest</h1>
        <h4>
          City quest is the gammified application which shows residential
          societies ranks based on various factors
        </h4>
      </div>
    </>
  );
}

export default App;
