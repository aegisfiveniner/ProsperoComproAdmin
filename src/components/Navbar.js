import React, { useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import batik from "../assets/BATIK.1.svg";
import logo from "../assets/Prospero Logo.svg";

const navbarStyle = { backgroundImage: `url(${batik})` };

const Navbar = () => {
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
          <a id="training">
            <NavLink style={{ color: `white` }} to="/about-us">
              Training
            </NavLink>
          </a>
          <a id="career">
            <NavLink style={{ color: `white` }} to="/career">
              Career
            </NavLink>
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
