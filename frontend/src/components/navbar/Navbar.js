import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("userFirstName")) {
      this.setState({ isLogged: true });
    }
  }

  goToHomePage = () => {
    return <Redirect to="/" />;
  };

  render() {
    return (
      <div>
        <div className="top">
          <Link to="/">
            <img
              src={require("./../../images/logo.png")}
              width={130}
              height={100}
              onClick={this.goToHomePage}
            />
          </Link>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Genres
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Another action</Dropdown.Item>
                <Dropdown.Item>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {this.props.isLoggedin ? (
            <div className="connection">
              <NavLink to="/profile" style={{ color: "orange" }}>
                {localStorage.getItem("userFirstName")}
              </NavLink>
            </div>
          ) : (
            <div className="connection">
              <NavLink to="/login" style={{ color: "orange" }}>
                Log in/
              </NavLink>
              <NavLink to="/signup" style={{ color: "orange" }}>
                Sign up
              </NavLink>
            </div>
          )}
        </div>
        <div className="bottom">
          <div className="linkFirst">
            <NavLink to="/program">Program</NavLink>
          </div>
          <div className="links">
            <NavLink to="/upcomingMovies">Upcoming Movies</NavLink>
          </div>
          <div className="links">
            <NavLink to="/events">Events</NavLink>
          </div>
          <div className="links">
            <NavLink to="/recommendations">Recommendations</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
