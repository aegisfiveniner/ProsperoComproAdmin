import React, { useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import batik from "../assets/BATIK.1.svg";
import logo from "../assets/Prospero Logo.svg";

const navbarStyle = { backgroundImage: `url(${batik})` };

const Navbar = () => {
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
  };

  return (
    <div>
      <header style={navbarStyle}>
        <img src={logo} alt="prospero_logo" id="prospero_logo" />

        <nav class="navbar">
          <a id="learning">
            <NavLink style={{ color: `white` }} to="/learning">
              Learning
            </NavLink>
          </a>
          <a id="archive">
            <NavLink style={{ color: `white` }} to="/archive">
              Archive
            </NavLink>
          </a>
          <a id="career">
            <NavLink style={{ color: `white` }} to="/career">
              Career
            </NavLink>
          </a>
          <a id="logout">
            {localStorage.getItem("token") && (
              <NavLink style={{ color: `white` }} to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            )}
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
