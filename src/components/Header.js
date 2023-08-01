import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1>TracktMovie.db</h1>
      <nav>
        <ul>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/favoris"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            Coups de coeur
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
