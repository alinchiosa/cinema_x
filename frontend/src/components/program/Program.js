import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import DatePicker from "react-datepicker";
import Dropdown from "react-bootstrap/Dropdown";
import MovieProgram from "./MovieProgram";

import "react-datepicker/dist/react-datepicker.css";
import "./Program.css";

class Program extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      movies: [],
      isLoaded: false
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const params = new URLSearchParams();
    params.set("date", this.state.startDate.toJSON());
    fetch("http://localhost:3000/movies/screenings?" + params.toString())
      .then(res => res.json())
      .then(jsonRes => {
        this.setState({
          isLoaded: true,
          movies: jsonRes.program
        });
      });
  }

  handleChange(date) {
    this.setState(
      prevState => ({
        startDate: date,
        movies: prevState.movies,
        isLoaded: prevState.isLoaded
      }),
      () => {
        console.log(this.state.startDate);
        const params = new URLSearchParams();
        params.set("date", this.state.startDate.toJSON());
        fetch("http://localhost:3000/movies/screenings?" + params.toString())
          .then(res => res.json())
          .then(jsonRes => {
            console.log("res", jsonRes);

            this.setState({
              isLoaded: true,
              movies: jsonRes.program
            });
          });
      }
    );
  }

  todayDate = () => {
    this.handleChange(new Date());
    console.log(this.state.startDate);
  };

  tomorrowDate = () => {
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.handleChange(tomorrow);
    console.log(this.state.startDate);
  };

  render() {
    const movieComponents = this.state.movies.map(movie => (
      <MovieProgram key={movie.movie.id} movie={movie} />
    ));

    return (
      <div className="programContainer">
        <h2>PROGRAM CINEMA AGC</h2>
        <br />
        <div className="filters">
          <div className="day">
            <ButtonGroup toggle className="mt-1">
              <Button
                variant="secondary"
                type="button"
                onClick={this.todayDate}
              >
                Today
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={this.tomorrowDate}
              >
                Tomorrow
              </Button>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                value={this.state.date}
              />
            </ButtonGroup>
          </div>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Movies
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Another action</Dropdown.Item>
                <Dropdown.Item>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <br />
        <div className="headers">
          <div className="header">
            <p>
              {this.state.startDate.getDate()}/
              {this.state.startDate.getMonth() + 1}/
              {this.state.startDate.getFullYear()}
            </p>
          </div>
          <div className="header">
            <p>Morning</p>
          </div>
          <div className="header">
            <p>Afternoon</p>
          </div>
          <div className="header">
            <p>Evening</p>
          </div>
        </div>
        <hr />
        {movieComponents.length > 0 ? (
          <div>{movieComponents}</div>
        ) : (
          <div
            stule={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <h5>No movies in program for this date</h5>
          </div>
        )}
      </div>
    );
  }
}

export default Program;
