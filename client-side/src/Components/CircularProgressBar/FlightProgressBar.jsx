import React, { useEffect, useState } from "react";
import "./circularProgressBar.css";

const FlightProgressBar = ({ val, icon }) => {
  let [flightProgressValue, setFlightProgressValue] = useState(0);
  let progressEndValue = 500;
  let speed = 20;

  useEffect(() => {
    const progress = setInterval(() => {
      if (flightProgressValue < progressEndValue) {
        setFlightProgressValue((prevValue) => prevValue + 1);
        // flightProgressValue++;
      } else {
        clearInterval(progress);
      }
    }, speed);

    return () => {
      clearInterval(progress);
    };
  }, [flightProgressValue, progressEndValue]); // Added FlightProgressValue and progressEndValue as dependencies

  const progressDegrees = flightProgressValue * 3.5;

  return (
    <div className="circularProgress">
      <span className="progress-value">{icon}</span>
      <style>
        {`.circularProgress {
          background: conic-gradient(#08889c ${progressDegrees}deg, #ededed ${progressDegrees}deg);
        }`}
      </style>
    </div>
  );
};

export default FlightProgressBar;
