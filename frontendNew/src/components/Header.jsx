import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="home-header shadow-md	shadow-gray-700">
      <header
        data-thq="thq-navbar"
        className="navbarContainer home-navbar-interactive"
      >
        <a className="home-logo logo">CITYQUEST</a>
        <div data-thq="thq-navbar-nav" className="home-desktop-menu">
          <nav className="home-links">
            <Link className="home-nav12 bodySmall">Home</Link>
            <a className="home-nav32 bodySmall">CityQuest Activities</a>
            <Link to="/leaderboard" className="home-nav42 bodySmall">
              Leaderboard
            </Link>
            <a className="home-nav52 bodySmall">Contact</a>
          </nav>
          <input type="text" placeholder="Search" className="input" />
          <div className="home-buttons">
            <Link to="/login" className="home-login buttonFlat">
              Login
            </Link>
            <Link to="/signup" className="buttonFilled">
              Register
            </Link>
          </div>
        </div>
        <div data-thq="thq-burger-menu" className="home-burger-menu">
          <svg viewBox="0 0 1024 1024" className="home-icon socialIcons">
            <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
      </header>
    </div>
  );
}

export default Header;
