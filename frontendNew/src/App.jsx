import "./App.css";
import Model from "./components/Model";
import Home from "./components/Home";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeatureCard from "./components/FeatureCard";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="root h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
