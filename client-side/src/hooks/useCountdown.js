import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { decrementTime } from "../redux/features/countdownSlice";

const useCountdown = (initialTime) => {
  const dispatch = useDispatch();
  const remainingTimeRef = useRef(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (remainingTimeRef.current > 0) {
        dispatch(decrementTime());
        remainingTimeRef.current -= 1;
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [dispatch]);

  return {
    remainingTime: remainingTimeRef.current,
  };
};

export default useCountdown;
