import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="footerContainer">
        <div className="about">
          <p style={{ color: "white" }}>About us</p>
          <NavLink to="/about" style={{ color: "orange" }}>
            Cinema AGC
          </NavLink>
          <NavLink to="/contact" style={{ color: "orange" }}>
            Contact
          </NavLink>
        </div>
        <div className="follow">
          <p style={{ color: "white" }}>Follow us</p>
          <a href="https://facebook.com" style={{ color: "orange" }}>
            Facebook
          </a>
          <a href="https://instagram.com" style={{ color: "orange" }}>
            Instagram
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
