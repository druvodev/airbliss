import React, { useState, useRef } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ShortingFlight = () => {
  // const [selectedButton, setSelectedButton] = useState('cheapest');

  // const handleButtonClick = (buttonType) => {
  //     setSelectedButton(buttonType);
  // };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <div
          className="tooltip tooltip-bottom"
          data-tip="Search for Previous Day Flight"
        >
          <FaCaretLeft className="lg:text-[45px] text-[20] md:text-[25px] text-cyan-500 cursor-pointer" />
        </div>
        <div className="font-sans font-semibold text-[20] md:text-[25px] lg:text-[32px]">
          Flights from Dhaka to Chittagong
        </div>
        <div
          className="tooltip tooltip-bottom"
          data-tip="Search for Next Day Flight"
        >
          <FaCaretRight className="lg:text-[45px] text-[20] md:text-[25px] text-cyan-500 cursor-pointer" />
        </div>
      </div>
      <div className="mt-14 p-5 shadow-md rounded-md flex justify-center items-center">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          // pagination={{
          //     clickable: true,
          // }}
          modules={[FreeMode, Pagination]}
          className="w-[300px] md:w-[700px] lg:w-[100%] overflow-hidden"
        >
          <SwiperSlide>
            <div className="md:px-5 w-full h-full md:py-5 px-2 py-2 shadow-md flex flex-col justify-center items-center cursor-pointer">
              <img
                className="w-auto object-cover h-[40px]"
                src="https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png"
                alt=""
              />
              <h1 className="text-center md:font-bold text-[10px] md:text-[14px] mt-5">
                Qatar Airways
              </h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="md:px-5 w-full h-full md:py-5 px-2 py-2 shadow-md flex flex-col justify-center items-center cursor-pointer">
              <img
                className="w-auto object-cover h-[40px]"
                src="https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg?quality=75&strip=all"
                alt=""
              />
              <h1 className="text-center md:font-bold text-[10px] md:text-[14px] mt-5">
                Lufthansa
              </h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="md:px-5 w-full h-full md:py-5 px-2 py-2 shadow-md flex flex-col justify-center items-center cursor-pointer">
              <img
                className="w-auto object-cover h-[40px]"
                src="https://beebom.com/wp-content/uploads/2015/02/airline-logos-egyptair.jpg?quality=75&strip=all"
                alt=""
              />
              <h1 className="text-center md:font-bold text-[10px] md:text-[14px] mt-5">
                EgyptAir
              </h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="md:px-5 w-full h-full md:py-5 px-2 py-2 shadow-md flex flex-col justify-center items-center cursor-pointer">
              <img
                className="w-auto object-cover h-[40px]"
                src="https://beebom.com/wp-content/uploads/2015/02/airline-logos-japan-e1424575148558.png?quality=75&strip=all"
                alt=""
              />
              <h1 className="text-center md:font-bold text-[10px] md:text-[14px] mt-5">
                Japan Airlines
              </h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="md:px-5 w-full h-full md:py-5 px-2 py-2 shadow-md flex flex-col justify-center items-center cursor-pointer">
              <img
                className="w-auto object-cover h-[40px]"
                src="https://beebom.com/wp-content/uploads/2015/02/airline-logos-srilankan.jpg?quality=75&strip=all"
                alt=""
              />
              <h1 className="text-center md:font-bold text-[10px] md:text-[14px] mt-5">
                Hawaiian Air
              </h1>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ShortingFlight;
