import { useEffect } from "react";
import { useCountdownContext } from "../../providers/CountdownContext";
import { useLocation } from "react-router";

const CountdownTimer = () => {
  const { remainingTime, setIsStart } = useCountdownContext();
  const location = useLocation();
  useEffect(() => {
    // setIsStart(true);
    // console.log(location);
  }, [location]);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="p-5 grid justify-center dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500 ">
      <p className="text-lg font-semibold mb-4">Session Time Out</p>
      <div className="flex justify-center gap-2">
        <div className="text-center">
          <div className="py-1 w-14 bg-cyan-600 text-white text-2xl font-semibold rounded">
            {minutes < 10 ? `0${minutes}` : minutes}
          </div>
          <p className="mt-1">min</p>
        </div>{" "}
        <div className="text-cyan-600 text-2xl font-semibold">:</div>
        {""}
        <div className="text-center">
          <div className="py-1 w-14 bg-cyan-600 text-white text-2xl font-semibold rounded">
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <p className="mt-1">sec</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
