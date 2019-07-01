import React from "react";
import ReactPlayer from "react-player";
import "./Booking.css";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Redirect } from "react-router-dom";

class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      screening: {},
      availableSeats: [],
      bookingSuccess: 0
    };
  }

  componentDidMount() {
    fetch(
      "http://localhost:3000/screenings/" + this.props.match.params.screeningId
    )
      .then(res => res.json())
      .then(jsonRes => {
        this.setState(
          { movie: jsonRes.movie, screening: jsonRes.screening },
          () => {
            console.log(this.state);
          }
        );
        const params = new URLSearchParams();
        params.set("roomId", this.state.screening.roomId);
        params.set("screeningId", this.state.screening.id);

        fetch("http://localhost:3000/seats/available?" + params.toString())
          .then(res => res.json())
          .then(jsonRes => {
            this.setState({ availableSeats: jsonRes.seatList }, () => {
              console.log(this.state);
            });
          });
      });
  }

  setRow = row => () => {
    this.setState({ selectedRow: row });
  };

  selectSeat = seat => () => {
    this.setState({ selectedSeat: seat }, () => {
      console.log(this.state);
    });
  };

  createBooking = () => {
    fetch("http://localhost:3000/bookings/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        screeningId: this.state.screening.id,
        seatId: this.state.selectedSeat.id
      })
    })
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes);
        this.setState({ bookingSuccess: 1 });
      });
  };

  homePage = () => {
    this.setState({ bookingSuccess: 2 });
  };

  render() {
    const rowsDropItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(row => {
      console.log(row);
      return (
        <Dropdown.Item key={row} onClick={this.setRow(row)}>
          {row}
        </Dropdown.Item>
      );
    });

    const seatDropItems = this.state.availableSeats.map(seat => {
      if (seat.seatRow === this.state.selectedRow) {
        return (
          <Dropdown.Item key={seat.id} onClick={this.selectSeat(seat)}>
            {seat.seatNo}
          </Dropdown.Item>
        );
      }
    });

    if (this.state.bookingSuccess === 0 || this.state.bookingSuccess === 1) {
      return (
        <div className="bookingContainer">
          <div className="extra">
            <div className="movieInfo">
              <div className="details">
                <div className="photo">
                  <img src={this.state.movie.image} width={185} height={250} />
                </div>
                <div className="infoText" style={{ color: "white" }}>
                  <p>Title: {this.state.movie.movieTitle}</p>
                  <p>ESRB: {this.state.movie.esrb}</p>
                  <p>Runtime: {this.state.movie.runtime} min</p>
                  <p>{this.state.movie.description}</p>
                </div>
              </div>
              <div className="video">
                <ReactPlayer url={this.state.movie.trailer} />
              </div>
            </div>
          </div>
          <div className="booking">
            <h4>Please select a seat</h4>
            <h5>
              The rows are numbered starting from the screen and the seats from
              left to right
            </h5>
            <div className="seatSelect">
              <Dropdown style={{ marginRight: "2em" }}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  Row
                </Dropdown.Toggle>

                <Dropdown.Menu>{rowsDropItems}</Dropdown.Menu>
              </Dropdown>
              {this.state.selectedRow ? (
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Seat No
                  </Dropdown.Toggle>

                  <Dropdown.Menu>{seatDropItems}</Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle disabled variant="dark" id="dropdown-basic">
                    Seat No
                  </Dropdown.Toggle>

                  <Dropdown.Menu show={false}>{seatDropItems}</Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <br />
            <div className="selections">
              {this.state.selectedRow ? (
                <h5 style={{ marginRight: "2em" }}>
                  Row: {this.state.selectedRow}
                </h5>
              ) : (
                <h5 />
              )}
              {this.state.selectedSeat ? (
                <h5 style={{ marginRight: "3em" }}>
                  Seat: {this.state.selectedSeat.seatNo}
                </h5>
              ) : (
                <h5 />
              )}
              {this.state.selectedSeat ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={this.createBooking}
                >
                  Create booking
                </Button>
              ) : (
                <h5 />
              )}
            </div>
            {this.state.bookingSuccess === 1 ? (
              <div
                style={{
                  marginTop: "1em",
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <h5 style={{ marginRight: "10px" }}>
                  Booking created successfully!
                </h5>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={this.homePage}
                >
                  Home page
                </Button>
              </div>
            ) : (
              <h5 />
            )}
          </div>
        </div>
      );
    } else if (this.state.bookingSuccess === 2) {
      return <Redirect to="/" />;
    }
  }
}

export default Booking;
