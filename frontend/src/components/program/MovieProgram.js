import React from "react";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import "./MovieProgram.css";

function MovieProgram(props) {
  // console.log(props);

  let startBooking = screeningId => {
    console.log(screeningId);
    props.history.push("/booking/" + screeningId);
  };

  const createButtons = (screenings, startTime, endTime) => {
    const buttonsArray = screenings.map(screening => {
      let screeningTime = screening.startTime.split(":")[0];
      if (screeningTime > startTime && screeningTime < endTime) {
        return (
          <Button
            variant="secondary"
            key={screening.id}
            style={{ margin: "5%" }}
            onClick={() => startBooking(screening.id)}
          >
            {screening.startTime}
          </Button>
        );
      }
    });
    return buttonsArray;
  };

  return (
    <div className="spacer">
      {createButtons(props.movie.screenings, 12)}
      <div className="movieContainer">
        <div className="section">
          <div className="description">
            <div>
              <p>{props.movie.movie.movieTitle}</p>
            </div>
            <div className="ageDur">
              <p>
                {props.movie.movie.esrb}, {props.movie.movie.runtime}min
              </p>
            </div>
            <p>{props.movie.genre}</p>
          </div>
        </div>
        <div className="section">
          {createButtons(props.movie.screenings, 0, 12)}
        </div>
        <div className="section">
          {createButtons(props.movie.screenings, 11, 16)}
        </div>
        <div className="lastSection">
          {createButtons(props.movie.screenings, 15, 24)}
        </div>
      </div>
    </div>
  );
}

export default withRouter(MovieProgram);
