import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import sha512 from "js-sha512";

import "./Login.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirect: false
    };
  }

  changeEmail = event => {
    const newEmail = event.target.value;
    this.setState(prevState => {
      return {
        email: newEmail,
        password: prevState.password,
        redirect: prevState.redirect
      };
    });
  };

  changePass = event => {
    const newPass = sha512(event.target.value);
    this.setState(prevState => {
      return {
        email: prevState.email,
        password: newPass,
        redirect: prevState.redirect
      };
    });
  };

  submitForm = () => {
    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes);
        localStorage.setItem("token", jsonRes.token);
        localStorage.setItem("userId", jsonRes.user.id);
        localStorage.setItem("userFirstName", jsonRes.user.firstName);
        this.setState(
          prevState => {
            return {
              email: prevState.email,
              password: prevState.password,
              redirect: true
            };
          },
          () => {
            this.props.afterLogin && this.props.afterLogin();
          }
        );
      });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="loginContainer">
          <h3>Log in</h3>
          <br />
          <Form onSubmit={this.submitForm}>
            <Form.Group controlId="formBasicEmail" className="formField">
              <div className="formLabel">
                <Form.Label>Email address:</Form.Label>
              </div>
              <div className="formText">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={this.changeEmail.bind(this)}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="formField">
              <div className="formLabel">
                <Form.Label>Password:</Form.Label>
              </div>
              <div className="formText">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={this.changePass.bind(this)}
                />
              </div>
            </Form.Group>

            <Button variant="secondary" type="button" onClick={this.submitForm}>
              Log in
            </Button>
          </Form>
        </div>
      );
    }
  }
}

export default Login;
