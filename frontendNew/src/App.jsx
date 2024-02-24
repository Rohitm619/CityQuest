import "./App.css";
import Model from "./components/Model";
import Home from "./components/Home";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeatureCard from "./components/FeatureCard";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Header from "./components/Header";

import Profile from "./components/Profile";

function App() {
  return (
    <div className="root h-screen w-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/societyProfile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
