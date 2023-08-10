import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src="/favicon.png" alt="Logo HRNET" />
      </Link>
      <div className="navigation">
        <ul>
          <NavLink exact to="/createemployee" activeClassName="nav-active">
            <li>Create employee</li>
          </NavLink>
          <NavLink exact to="/currentemployees" activeClassName="nav-active">
            <li>Current employees</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Header;
