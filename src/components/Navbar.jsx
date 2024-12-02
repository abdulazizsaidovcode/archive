// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logoWhite from "../../public/logo-white.png";

const Navbar = () => {
  return (
    <nav className="navbar ">
      <div className="container overflow-hidden">
        <Link to="/" className="brand">
          <img
            style={{
              width: "200px",
              height: "65px",
              objectFit: "cover",
              marginTop: "-10px",
              marginLeft: "-40px",
            }}
            src={logoWhite}
            alt="logo"
          />
        </Link>
        <ul className="nav__list mb-0">
          <li className="nav__list_item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__list_item">
            <Link to="/sections">Sections</Link>
          </li>
          <li className="nav__list_item">
            <Link to="add/All">all Folders</Link>
          </li>
        </ul>
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
