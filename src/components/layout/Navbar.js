import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="nav-wrapper blue darken-2">
          <div className="navigation">
            <Link to="/" className="brand-logo">
              FB Messenger Analytics
            </Link>
            <ul className="right">
              <li>
                <NavLink to="/Dashboard" className="navbar-link">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/About" className="navbar-link">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/Exit" className="navbar-link">
                  Exit
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
