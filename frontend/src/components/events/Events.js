import React from "react";
import Event from "./Event";
import "./Events.css";

class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(jsonRes => {
        this.setState({ events: jsonRes.events });
      });
  }

  render() {
    const eventComponents = this.state.events.map(event => {
      return <Event key={event.id} event={event} />;
    });
    return (
      <div>
        <div className="title">
          <h3>Events at Cinema AGC</h3>
        </div>
        <div className="eventsContainer">{eventComponents}</div>;
      </div>
    );
  }
}

export default Events;
