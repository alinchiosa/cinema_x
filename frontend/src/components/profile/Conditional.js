import React from "react";
import Password from "./Password";
import Delete from "./Delete";
import Bookings from "./Bookings";

function Conditional(props) {
  console.log(props);
  if (props.target === 1) {
    return <Bookings />;
  } else if (props.target === 2) {
    return <Password changePage={props.changePage} />;
  } else if (props.target === 3) {
    return <Delete changePage={props.changePage} />;
  } else {
    return <div />;
  }
}

export default Conditional;
