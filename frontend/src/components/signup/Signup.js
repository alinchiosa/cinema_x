import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import sha512 from "js-sha512";
import { Redirect } from "react-router-dom";
import "./Signup.css";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      password: "",
      repeatpass: "",
      redirect: false
    };
  }

  changeEmail = event => {
    const newEmail = event.target.value;
    this.setState(prevState => {
      return {
        firstName: prevState.firstName,
        lastName: prevState.lastName,
        email: newEmail,
        phoneNo: prevState.phoneNo,
        password: prevState.password,
        repeatpass: prevState.repeatpass,
        redirect: prevState.redirect
      };
    });
  };

  changeFName = event => {
    const newFName = event.target.value;
    this.setState(prevState => {
      return {
        firstName: newFName,
        lastName: prevState.lastName,
        email: prevState.email,
        phoneNo: prevState.phoneNo,
        password: prevState.password,
        repeatpass: prevState.repeatpass,
        redirect: prevState.redirect
      };
    });
  };

  changeLName = event => {
    const newLName = event.target.value;
    this.setState(prevState => {
      return {
        firstName: prevState.firstName,
        lastName: newLName,
        email: prevState.email,
        phoneNo: prevState.phoneNo,
        password: prevState.password,
        repeatpass: prevState.repeatpass,
        redirect: prevState.redirect
      };
    });
  };

  changePhone = event => {
    const newPhone = event.target.value;
    this.setState(prevState => {
      return {
        firstName: prevState.firstName,
        lastName: prevState.lastName,
        email: prevState.email,
        phoneNo: newPhone,
        password: prevState.password,
        repeatpass: prevState.repeatpass,
        redirect: prevState.redirect
      };
    });
  };

  changePassword = event => {
    const newPassword = sha512(event.target.value);
    this.setState(prevState => {
      return {
        firstName: prevState.firstName,
        lastName: prevState.lastName,
        email: prevState.email,
        phoneNo: prevState.phoneNo,
        password: newPassword,
        repeatpass: prevState.repeatpass,
        redirect: prevState.redirect
      };
    });
  };

  changeRPassword = event => {
    const newRPassword = sha512(event.target.value);
    this.setState(prevState => {
      return {
        firstName: prevState.firstName,
        lastName: prevState.lastName,
        email: prevState.email,
        phoneNo: prevState.phoneNo,
        password: prevState.password,
        repeatpass: newRPassword,
        redirect: prevState.redirect
      };
    });
  };

  submitForm = () => {
    if (this.state.password === this.state.repeatpass) {
      fetch("http://localhost:8080/users/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          phoneNo: this.state.phoneNo,
          password: this.state.password
        })
      })
        .then(res => res.json())
        .then(jsonRes => {
          console.log(jsonRes);
          this.setState(prevState => {
            return {
              firstName: prevState.firstName,
              lastName: prevState.lastName,
              email: prevState.email,
              phoneNo: prevState.phoneNo,
              repeatpass: prevState.repeatpass,
              password: prevState.password,
              redirect: true
            };
          });
        });
    } else {
      alert("Passwords should match!");
    }
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="signupContainer">
          <h3>Sign up</h3>
          <br />
          <Form>
            <Form.Group controlId="formBasicFirstName" className="formField">
              <div className="formLabel">
                <Form.Label>First name:</Form.Label>
              </div>
              <div className="formText">
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  onChange={this.changeFName.bind(this)}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicLastName" className="formField">
              <div className="formLabel">
                <Form.Label>Last name:</Form.Label>
              </div>
              <div className="formText">
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  onChange={this.changeLName.bind(this)}
                />
              </div>
            </Form.Group>

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

            <Form.Group controlId="formBasicDob" className="formField">
              <div className="formLabel">
                <Form.Label>Phone No:</Form.Label>
              </div>
              <div className="formText">
                <Form.Control
                  type="dob"
                  placeholder="Enter phone number"
                  onChange={this.changePhone.bind(this)}
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
                  onChange={this.changePassword.bind(this)}
                />
              </div>
            </Form.Group>

            <Form.Group
              controlId="formBasicRepeatPassword"
              className="formField"
            >
              <div className="formLabel">
                <Form.Label>Repeat password:</Form.Label>
              </div>
              <div className="formText">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={this.changeRPassword.bind(this)}
                />
              </div>
            </Form.Group>

            <Button variant="secondary" type="submit" onClick={this.submitForm}>
              Submit
            </Button>
          </Form>
        </div>
      );
    }
  }
}

export default Signup;
