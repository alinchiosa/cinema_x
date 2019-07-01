import React from "react";
import "./Events.css";

function Event(props) {
  console.log(props);
  return (
    <div className="eventContainer">
      <div className="imageEvent">
        <img src={props.event.image} width={"100%"} height={300} />
      </div>
      <div className="eventInfo">
        <h5>{props.event.title}</h5>
        <h5>
          {new Date(props.event.date).getDate()}/
          {new Date(props.event.date).getMonth() + 1}/
          {new Date(props.event.date).getFullYear()}, {props.event.time}
        </h5>
        <div style={{ maxHeight: "13em", minHeight: "13em" }}>
          <p>{props.event.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Event;
