import React from "react";
import "./circularProgressBar.css";

const CircularProgressBar = () => {
  return (
    <div className="circularProgress flex items-center justify-center">
      <div className="outer">
        <div className="inner">
          <div id="number">65%</div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="80px"
        height="80px"
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stop-color="#e91e63" />
            <stop offset="100%" stop-color="#673ab7" />
          </linearGradient>
        </defs>
        <circle cx="42" cy="42" r="32" stroke-linecap="round" />
      </svg>
    </div>
  );
};

export default CircularProgressBar;
