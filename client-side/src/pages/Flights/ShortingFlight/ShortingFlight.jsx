import React, { useState, useRef, useEffect } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ShortingFlight = ({ destenation, handelCardComapnyFilter }) => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    const uniqueAirlines = {};

    destenation.forEach((item) => {
      const { airlineName, airlineLogo } = item;
      if (!uniqueAirlines[airlineName]) {
        uniqueAirlines[airlineName] = { airlineName, airlineLogo };
      }
    });

    const uniqueAirlinesArray = Object.values(uniqueAirlines);

    setAirlines(uniqueAirlinesArray);
  }, [destenation]);

  // console.log(airlines);

  return (
    <div className="mb-10 overflow-hidden shadow-md border-[1px] border-gray-100">
      <div className="flex justify-between items-center mb-3 mt-2">
        <div
          className="tooltip tooltip-bottom"
          data-tip="Search for Previous Day Flight"
        >
          <FaCaretLeft className="lg:text-[45px] text-[20px] md:text-[25px] text-cyan-500 cursor-pointer" />
        </div>
        <div className="font-sans font-semibold text-[20] md:text-[25px] lg:text-[32px]">
          Flights {destenation[0]?.departure?.city} to{" "}
          {destenation[0]?.arrival?.city}
        </div>
        <div
          className="tooltip tooltip-bottom"
          data-tip="Search for Next Day Flight"
        >
          <FaCaretRight className="lg:text-[45px] text-[20px] md:text-[25px] text-cyan-500 cursor-pointer" />
        </div>
      </div>

      <div className="mt-8 p-5  mb-6 rounded-md flex justify-center items-center">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="w-[400px] md:w-[700px] lg:w-[100%] overflow-hidden"
        >
          {airlines?.map((singleAirline) => (
            <SwiperSlide key={singleAirline?.airlineName}>
              <div
                onClick={() =>
                  handelCardComapnyFilter(singleAirline?.airlineName)
                }
                className="md:px-5 w-full h-full md:py-5 px-2 py-2 shadow-md border-[1px] mb-1 flex flex-col justify-center items-center cursor-pointer"
              >
                <img
                  className="w-auto rounded-md object-cover h-[40px]"
                  src={singleAirline?.airlineLogo}
                  alt=""
                />
                <h1 className="text-center md:font-bold text-[10px] md:text-[14px] mt-4">
                  {singleAirline?.airlineName}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ShortingFlight;
