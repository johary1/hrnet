import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../components/style/Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo">
        <img src="/favicon.png" alt="Logo HRNET" />
        <span className="logo__title">WEALTH HEALTH</span>
      </Link>

      <div className="navigation">
        <ul>
          <NavLink
            to="/createemployee"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Create employee</li>
          </NavLink>
          <NavLink
            to="/currentemployees"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Current employees</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Header;
