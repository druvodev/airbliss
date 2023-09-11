import React, { useEffect, useState } from "react";
import "./circularProgressBar.css";

const UserProgressBar = ({ val, icon }) => {
  let [progressStartValue, setProgressStartValue] = useState(0);
  let progressEndValue = val;
  let speed = 20;

  useEffect(() => {
    const progress = setInterval(() => {
      if (progressStartValue < progressEndValue) {
        setProgressStartValue((prevValue) => prevValue + 1);
        progressStartValue++;
      } else {
        clearInterval(progress);
      }
    }, speed);

    return () => {
      clearInterval(progress);
    };
  }, [progressStartValue, progressEndValue]); // Added progressStartValue and progressEndValue as dependencies

  const progressDegrees = progressStartValue * 3.5;

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

export default UserProgressBar;
