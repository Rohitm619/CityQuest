import React from "react";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container-fluid flex justify-items-start">
        <div
          class="navbar-brand text-white flex align-items-center gap-2"
          href="#"
        >
          <img
            src="https://cdn0.iconfinder.com/data/icons/city-elements-9/128/City_skyline-512.png"
            className="w-9"
            alt=""
          />
          <h2 className="text-white text-lg font-bold">City Quest</h2>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
