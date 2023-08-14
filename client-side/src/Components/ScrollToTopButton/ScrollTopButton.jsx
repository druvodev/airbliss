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
    <div className="fixed  animate-bounce bottom-5 right-5 ">
      <button
        onClick={scrollToTop}
        className={`text-cyan-600 rounded-full p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-cyan-600/30 backdrop-blur relative ${
          showButton ? "block" : "hidden"
        }`}
      >
        <FaArrowUp />
        <div className="absolute  top-0 left-0 w-full h-full">
          <svg
            className="w-full h-full"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="#0891B2"
              strokeWidth="4"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeLinecap="round"
              transform="rotate(-90 16 16)"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ScrollTopButton;
