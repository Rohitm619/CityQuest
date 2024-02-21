// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import Model from "./components/Model";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <Model />
//       </div>
//     </>
//   );
// }

// export default App;
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {Home} from "./Pages";

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;