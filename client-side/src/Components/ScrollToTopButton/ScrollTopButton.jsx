import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    const totalScroll = documentHeight - windowHeight;
    const progress = (scrolled / totalScroll) * 100;

    setScrollProgress(progress);

    if (scrolled > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div
        className={`transition-opacity duration-300 ${
          showButton ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative w-14 h-14">
          <svg
            className="absolute top-0 left-0"
            width="
          100%"
            height="100%"
          >
            <circle
              cx="50%"
              cy="50%"
              r="50%"
              stroke="transparent"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="30%"
              stroke="red"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${scrollProgress}, 100`}
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <span className="text-xs text-gray-600">
              <button
                onClick={scrollToTop}
                className=" rounded-full p-2 text-white  shadow-md hover:bg-blue-600 bg-sky-700 relative"
              >
                <FaArrowUp />
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollTopButton;
