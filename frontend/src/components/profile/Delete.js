import React from "react";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

class Delete extends React.Component {
  constructor() {
    super();
    this.state = {
      changeView: false
    };
  }

  deleteAccount = () => {
    fetch("http://localhost:8080/users/" + localStorage.getItem("userId"), {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
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
        if (jsonRes.success === true) {
          localStorage.clear();
          this.setState({ changeView: true });
        }
      });
  };

  noDelete = () => {
    this.props.changePage && this.props.changePage(0);
  };

  render() {
    if (this.state.changeView === true) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="deleteContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <p>Are you sure you want to delete your account?</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "20vw"
            }}
          >
            <Button
              variant="secondary"
              type="button"
              onClick={this.deleteAccount}
            >
              Yes
            </Button>
            <Button variant="secondary" type="button" onClick={this.noDelete}>
              No
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default Delete;
