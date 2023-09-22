import React, { useEffect, useState, useRef } from "react";
import SearchFilter from "../../../Components/SearchFilter/SearchFilter";
import cover from "../../../assets/banner/skybg.jpg";
import plain from "../../../assets/banner/plain.png";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const imgRef = useRef(null); // Create a ref to hold the img element
  const handleScroll = () => {
    setScrollOffset(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const updateAnimation = () => {
    if (imgRef.current) {
      // Check if the ref is not null
      const plainOffset = scrollOffset * 0.5;
      imgRef.current.style.transform = `translateX(${plainOffset}px)`;
    }
    requestAnimationFrame(updateAnimation);
  };

  useEffect(() => {
    requestAnimationFrame(updateAnimation);
  }, [scrollOffset]);

  return (
    <>
      <div
        className="h-96 sm:h-[500px] w-full overflow-hidden relative z-30"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          ref={imgRef} // Attach the ref to the img element
          src={plain}
          alt=""
          className="mx-auto pt-20"
          style={{ transition: "none" }} // Disable CSS transition
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-full h-full bg-black/20 z-10">
          <div className="max-w-7xl mx-auto px-5 sm:px-10">
            <div className="absolute top-1/2 -translate-y-2/4 text-white">
              <p className="text-3xl sm:text-5xl font-semibold tracking-wide">
                <TypeAnimation
                  sequence={[
                    "Special Hotel Perks with Visa!",
                    1000,
                    "Special Flight Deals for Visa Holders!",
                    1000,
                    "Special Easy Visa Processing & Perks!",
                    1000,
                  ]}
                  cursor={false} // omit the default css typing animation class
                  className="type"
                  deletionSpeed={60}
                  speed={{ type: "keyStrokeDelayInMs", value: 150 }}
                  repeat={Infinity}
                />
              </p>
              <p className="mt-3 sm:mt-6 sm:text-lg">
                Save up to <span className="font-semibold">10%</span> on fares
              </p>
              <button className="hidden sm:text-lg px-6 sm:px-10 py-1 sm:py-2 rounded-full border mt-4 sm:mt-8">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="search-flights" className="z-30 relative -mt-16">
        <SearchFilter bookingType="all" filterName="Search" />
      </div>
    </>
  );
};

export default Hero;
