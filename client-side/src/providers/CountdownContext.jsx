import { createContext, useContext, useEffect, useState } from "react";

const CountdownContext = createContext();

export const useCountdownContext = () => useContext(CountdownContext);

export const CountdownProvider = ({ children }) => {
  const [remainingTime, setRemainingTime] = useState(20 * 60);
  const [isStart, setIsStart] = useState(true);

  useEffect(() => {
    let timerInterval = null;

    if (isStart === "1") {
      timerInterval = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime((prevTime) => prevTime - 1);
        }
      }, 1000);
    } else {
      setRemainingTime(20 * 60);
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [remainingTime, isStart]);

  return (
    <CountdownContext.Provider value={{ remainingTime, isStart, setIsStart }}>
      {children}
    </CountdownContext.Provider>
  );
};
