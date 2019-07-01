import React from "react";

class Book extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    fetch("http://localhost:3000/screenings/" + this.props.booking.screeningId)
      .then(res => res.json())
      .then(jsonRes => {
        this.setState({ movie: jsonRes.movie, screening: jsonRes.screening });
        fetch("http://localhost:3000/seats/" + this.props.booking.seatId)
          .then(resp => resp.json())
          .then(jsonResp => {
            this.setState({ seat: jsonResp.seat, isLoaded: true }, () => {
              console.log("state" + JSON.stringify(this.state));
            });
          });
      });
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <div className="bookingHeaders">
            <div className="infoContainer"> {this.state.movie.movieTitle} </div>
            <div className="infoContainer">
              {" "}
              {new Date(this.state.screening.date).getDay()}/
              {new Date(this.state.screening.date).getMonth() + 1}/
              {new Date(this.state.screening.date).getFullYear()}
            </div>
            <div className="infoContainer">
              {this.state.screening.startTime}
            </div>
            <div className="infoContainer"> {this.state.screening.roomId} </div>
            <div className="seatContainer">
              R: {this.state.seat.seatRow}, S: {this.state.seat.seatNo}{" "}
            </div>
          </div>
          <hr />
        </div>
      );
    } else {
      return <p />;
    }
  }
}

export default Book;
