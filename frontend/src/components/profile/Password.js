import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import sha512 from "js-sha512";
import "./Profile.css";

class Password extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      rePassword: ""
    };
  }

  changePass = event => {
    const newPass = sha512(event.target.value);
    this.setState(prevState => {
      return {
        password: newPass,
        rePassword: prevState.rePassword
      };
    });
  };

  changeRPass = event => {
    const newPass = sha512(event.target.value);
    this.setState(prevState => {
      return {
        password: prevState.password,
        rePassword: newPass
      };
    });
  };

  updatePass = () => {
    if (this.state.password === this.state.rePassword) {
      fetch(
        "http://localhost:8080/users/" +
          localStorage.getItem("userId") +
          "/resetPassword",
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            newPassword: this.state.password
          })
        }
      )
        .then(res => res.json())
        .then(jsonRes => {
          console.log(jsonRes);
          if (jsonRes.success === true) {
            this.props.changePage && this.props.changePage(0);
            // localStorage.clear();
            // this.setState({ changeView: true });
          }
        });
    } else {
      alert("Passwords do not match");
    }
  };

  render() {
    return (
      <div className="passwordContainer">
        <Form onSubmit={this.submitForm}>
          <Form.Group controlId="formNewPass" className="formField">
            <div className="formLabel">
              <Form.Label>New Password:</Form.Label>
            </div>
            <div className="formText">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.changePass.bind(this)}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formRepeatPass" className="formField">
            <div className="formLabel">
              <Form.Label>Repeat Password:</Form.Label>
            </div>
            <div className="formText">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.changeRPass.bind(this)}
              />
            </div>
          </Form.Group>
          <Button variant="secondary" type="button" onClick={this.updatePass}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Password;
