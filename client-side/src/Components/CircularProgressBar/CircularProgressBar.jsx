import React from "react";
import "./circularProgressBar.css";

const CircularProgressBar = ({ val }) => {
  let progressCircular = document.querySelector(".circularProgress");
  let value = document.querySelector(".value");
  let start = 0;
  const newValue = val;

  //   console.log(val);

  function handleCircularProgress() {
    let progress = setInterval(() => {
      start++;
      console.log(start);
      console.log(newValue);
      if (start == val) {
        clearInterval(progress);
      }
    });
  }

  return (
    <div className="circularProgress">
      <span className="value">{val}%</span>
    </div>
  );
};

export default CircularProgressBar;
