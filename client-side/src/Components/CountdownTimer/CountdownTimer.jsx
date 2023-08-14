import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [remainingTime, setRemainingTime] = useState(20 * 60);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="p-5 grid justify-center">
      <p className="text-lg font-semibold mb-4">Session Time Out</p>
      <div className="flex justify-center gap-2">
        <div className="text-center">
          <div className="py-1 w-14 bg-cyan-500 text-white text-2xl font-semibold rounded">
            {minutes < 10 ? `0${minutes}` : minutes}
          </div>
          <p className="mt-1">min</p>
        </div>{" "}
        <div className="text-cyan-600 text-2xl font-semibold">:</div>
        {""}
        <div className="text-center">
          <div className="py-1 w-14 bg-cyan-500 text-white text-2xl font-semibold rounded">
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <p className="mt-1">sec</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
