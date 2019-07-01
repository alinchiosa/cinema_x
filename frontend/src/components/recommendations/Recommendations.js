import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Recommendations.css";
import Recommendation from "./Recommendation";

class Recommendations extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      recommendations: [],
      success: "start"
    };
  }

  changeTitle = event => {
    const newTitle = event.target.value;
    this.setState({ title: newTitle });
  };

  getRecommendations = () => {
    const params = new URLSearchParams();
    params.set("title", this.state.title);
    fetch("http://localhost:3000/recommendations/get?" + params.toString())
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success === true && jsonRes.movieList[0]) {
          this.setState(
            {
              recommendations: jsonRes.movieList,
              success: "true"
            },
            () => {
              console.log(this.state);
            }
          );
        } else {
          this.setState({ success: "false" }, () => {
            console.log(this.state);
          });
        }
      });
  };

  render() {
    let recommendationComponents;
    if (this.state.success === "true") {
      recommendationComponents = this.state.recommendations.map(
        (recommendation, index) => {
          return <Recommendation key={index} recommendation={recommendation} />;
        }
      );
    } else if (this.state.success === "false") {
      recommendationComponents = [];
    }
    return (
      <div className="recommendationsPageContainer">
        <div className="title">
          <h3>Recommendations</h3>
        </div>

        <div className="recommendationsContainer">
          <Form onSubmit={this.getRecommendations}>
            <Form.Group controlId="formBasicEmail" className="formField">
              <div className="formLabel">
                <Form.Label>Enter a movie that you like:</Form.Label>
              </div>
              <div className="formText">
                <Form.Control
                  type="text"
                  placeholder="Movie title"
                  onChange={this.changeTitle.bind(this)}
                />
              </div>
            </Form.Group>
            <Button
              variant="secondary"
              type="button"
              onClick={this.getRecommendations}
            >
              Get recommendations
            </Button>
          </Form>
          {this.state.success === "false" ? (
            <div style={{ marginTop: "3em" }}>
              <h5>
                The system doesn't have any recommendation for this movie.
                Please try
              </h5>
            </div>
          ) : (
            <div
              className="recommendations"
              style={{
                marginTop: "1em",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignContent: "center",
                alignItem: "center",
                width: "30vw"
              }}
            >
              {recommendationComponents}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Recommendations;
