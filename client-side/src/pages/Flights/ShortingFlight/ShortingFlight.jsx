import React, { useState, useRef, useEffect } from "react";
import { FaCaretLeft, FaCaretRight, FaRadiationAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  setAirlines,
  setSelectedCard,
} from "../../../redux/features/bookingInfoSlice";

const ShortingFlight = ({ destenation, handelCardComapnyFilter }) => {
  const airlines = useSelector((state) => state?.userBookingInfo?.airlines);
  const selectedCard = useSelector(
    (state) => state?.userBookingInfo?.selectedCard
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const uniqueAirlines = {};

    destenation.forEach((item) => {
      const { airlineName, airlineLogo } = item;
      if (!uniqueAirlines[airlineName]) {
        uniqueAirlines[airlineName] = { airlineName, airlineLogo };
      }
    });

    const uniqueAirlinesArray = Object.values(uniqueAirlines);

    dispatch(setAirlines(uniqueAirlinesArray));
  }, [destenation]);

  return (
    <div className="mb-10 overflow-hidden shadow-md border-[1px] border-gray-100 dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500 dark:border-0">
      {/* <div className="flex justify-between mx-8 items-center mb-3 mt-2">
        <div className="tooltip tooltip-bottom" data-tip="Previous Day Flight">
          <FaCaretLeft className="lg:text-[45px] text-[20px] md:text-[25px] text-cyan-500 cursor-pointer" />
        </div>
        <div className="font-sans font-semibold text-[20] md:text-[25px] lg:text-[32px]">
          Flights {destenation[0]?.departure?.city} to{" "}
          {destenation[0]?.arrival?.city}
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Next Day Flight">
          <FaCaretRight className="lg:text-[45px] text-[20px] md:text-[25px] text-cyan-500 cursor-pointer" />
        </div>
      </div> */}

      <div className="flex justify-between items-center mt-2">
        <div className="px-2 py-2 ">
          {/* <FaCaretLeft className="text-cyan-500 text-[23px]" /> */}
          {/* <p className="p-1 -mt-2 opacity-0 cursor-pointer hover:opacity-100 rounded-md  text-[8px] lg:text-[12px] absolute">
            Previous
          </p> */}
        </div>

        <div className="font-sans mt-3 font-semibold text-[20] md:text-[25px] ">
          Flights {destenation[0]?.departure?.city} to{" "}
          {destenation[0]?.arrival?.city}
        </div>

        <div className="px-2 py-2">
          {/* <FaCaretRight className="text-cyan-500 text-[23px]" /> */}
          {/* <p className="p-1 -ml-4 -mt-2 opacity-0 cursor-pointer hover:opacity-100 rounded-md  text-[8px] lg:text-[12px] absolute">
            Next
          </p> */}
        </div>
      </div>

      <div className="mt-6 p-5 mb-6 rounded-md flex justify-center items-center">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="w-[250px] md:w-[700px] lg:w-[100%] overflow-hidden"
        >
          {airlines?.map((singleAirline) => (
            <SwiperSlide key={singleAirline?.airlineName}>
              <div
                onClick={() =>
                  handelCardComapnyFilter(singleAirline?.airlineName)
                }
                className={`md:px-5 w-full h-full md:py-5 px-2 py-2 shadow-md border-[1px] mb-1 flex flex-col justify-center items-center cursor-pointer dark:border-0 dark:backdrop-blur-md ${
                  selectedCard === singleAirline?.airlineName
                    ? "bg-cyan-50 dark:bg-gray-600"
                    : "" 
                }`}
              >
                <img
                  className="w-auto rounded-md object-cover h-[40px]"
                  src={singleAirline?.airlineLogo}
                  alt=""
                />
                <h1 className="text-center md:font-semibold text-[10px] md:text-[14px] mt-4">
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
