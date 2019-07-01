import React from "react";

function Recommendation(props) {
  let recommendation = props.recommendation;
  recommendation = recommendation.replace('"', "");
  recommendation = recommendation.replace('"', "");
  recommendation = recommendation.replace("}", "");

  return (
    <div>
      <h6>{recommendation}</h6>
    </div>
  );
}

export default Recommendation;
