import React from "react";
import Book from "./Book.js";

class Bookings extends React.Component {
  constructor() {
    super();
    this.state = {
      bookings: []
    };
  }

  componentDidMount() {
    fetch(
      "http://localhost:3000/bookings/get/" + localStorage.getItem("userId"),
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(jsonRes => {
        this.setState({ bookings: jsonRes.bookings }, () => {
          console.log(this.state);
        });
      });
  }

  render() {
    const bookingComponents = this.state.bookings.map(booking => {
      return <Book key={booking.id} booking={booking} />;
    });
    return (
      <div className="bookingsContainer">
        <div className="bookingHeaders">
          <div>
            <h5>Title</h5>
          </div>
          <div>
            <h5>Date</h5>
          </div>
          <div>
            <h5>Time</h5>
          </div>
          <div>
            <h5>Room</h5>
          </div>
          <div>
            <h5>Seat</h5>
          </div>
        </div>
        <hr />
        <div className="bookings">{bookingComponents}</div>
      </div>
    );
  }
}

export default Bookings;
