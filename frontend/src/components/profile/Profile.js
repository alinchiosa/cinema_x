import React from "react";
import Button from "react-bootstrap/Button";
import Conditional from "./Conditional";
import { Redirect } from "react-router-dom";
import "./Profile.css";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      userId: localStorage.getItem("userId"),
      conditionalDisplay: 0,
      redirect: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/users/" + this.state.userId)
      .then(res => res.json())
      .then(jsonRes => {
        // console.log(jsonRes.program);
        this.setState(prevState => {
          return {
            user: jsonRes.user,
            userId: prevState.userId,
            conditionalDisplay: prevState.conditionalDisplay
          };
        });
      });
  }

  setBookings = () => {
    this.setState(prevState => {
      return {
        user: prevState.user,
        userId: prevState.user,
        conditionalDisplay: 1
      };
    });
  };

  setPassword = () => {
    this.setState(prevState => {
      return {
        user: prevState.user,
        userId: prevState.user,
        conditionalDisplay: 2
      };
    });
  };

  setDelete = () => {
    this.setState(prevState => {
      return {
        user: prevState.user,
        userId: prevState.user,
        conditionalDisplay: 3
      };
    });
  };

  changePage = pageNo => {
    this.setState({ conditionalDisplay: pageNo });
  };

  logOut = () => {
    localStorage.clear();
    this.setState({ redirect: true });
    this.changeLogged();
  };

  changeLogged = () => {
    this.props.afterLogout && this.props.afterLogout();
  };

  render() {
    if (this.state.redirect === false) {
      if (this.state.userId) {
        return (
          <div className="profileContainer" style={{ minHeight: "63vh" }}>
            <div className="name">
              <h2>
                Hello {this.state.user.firstName} {this.state.user.lastName}
              </h2>
              <h5>Email: {this.state.user.email}</h5>
              <h5>Phone No: {this.state.user.phoneNo}</h5>
            </div>
            <Button variant="secondary" type="button" onClick={this.logOut}>
              Log Out
            </Button>
            <hr />
            <div className="buttons">
              <Button
                variant="secondary"
                type="button"
                onClick={this.setBookings}
              >
                View bookings
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={this.setPassword}
              >
                Reset password
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={this.setDelete}
              >
                Delete account
              </Button>
            </div>
            <hr />
            <Conditional
              target={this.state.conditionalDisplay}
              changePage={this.changePage}
            />
          </div>
        );
      } else {
        return (
          <div className="profileContainer">
            <h1>You need to be logged in order to access Profile!</h1>
          </div>
        );
      }
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Profile;
