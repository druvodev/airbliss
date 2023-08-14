import React, { useState, useRef } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ShortingFlight = () => {
    // const [selectedButton, setSelectedButton] = useState('cheapest');

    // const handleButtonClick = (buttonType) => {
    //     setSelectedButton(buttonType);
    // };

    return (
        <div className='mb-10'>
            <div className='flex justify-between items-center mb-3'>
                <div className="tooltip tooltip-bottom" data-tip="Search for Previous Day Flight">
                    <FaCaretLeft className='text-[45px] text-cyan-500 cursor-pointer' />
                </div>
                <div className='font-sans font-semibold text-[32px]'>Flights from Dhaka to Chittagong</div>
                <div className="tooltip tooltip-bottom" data-tip="Search for Next Day Flight">
                    <FaCaretRight className='text-[45px] text-cyan-500 cursor-pointer' />
                </div>
            </div>
            {/* <div className='flex w-full p-5 mt-10 rounded-md justify-between shadow-2xl'>
                <button
                    className={`p-4 text-left flex-grow py-2 px-3 pe-5 mb-0 border-0 ${selectedButton === 'cheapest' ? 'bg-gray-100 text-white' : 'text-white'
                        }`}
                    onClick={() => handleButtonClick('cheapest')}
                >
                    <h1 className='text-[18px] font-semibold mb-2 text-gray-900'>Cheapest</h1>
                    <p className='text-[14px] text-[#7c8db0]'>To get the cheapest available flights</p>
                </button>
                <div className='border self-stretch mx-5'></div>
                <button
                    className={`p-4 text-left flex-grow py-2 px-3 pe-5 mb-0 border-0 ${selectedButton === 'shortest' ? 'bg-gray-100 text-white' : 'text-white'
                        }`}
                    onClick={() => handleButtonClick('shortest')}
                >
                    <h1 className='text-[18px] font-semibold mb-2 text-gray-900'>Shortest</h1>
                    <p className='text-[14px] text-[#7c8db0]'>To get the shortest available flights</p>
                </button>
            </div> */}
            <div className='mt-14 p-5 shadow-xl rounded-md'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    // pagination={{
                    //     clickable: true,
                    // }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className='px-8 py-5 shadow-xl flex flex-col justify-center items-center cursor-pointer'>
                            <img className='w-auto object-cover h-[40px]' src="https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png" alt="" />
                            <h1 className='text-center font-bold text-[14px] mt-5'>Qatar Airways</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='px-8 py-5 shadow-xl flex flex-col justify-center items-center cursor-pointer'>
                            <img className='w-auto object-cover h-[40px]' src="https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg?quality=75&strip=all" alt="" />
                            <h1 className='text-center font-bold text-[14px] mt-5'>Lufthansa</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='px-8 py-5 shadow-xl flex flex-col justify-center items-center cursor-pointer'>
                            <img className='w-auto object-cover h-[40px]' src="https://beebom.com/wp-content/uploads/2015/02/airline-logos-egyptair.jpg?quality=75&strip=all" alt="" />
                            <h1 className='text-center font-bold text-[14px] mt-5'>EgyptAir</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='px-8 py-5 shadow-xl flex flex-col justify-center items-center cursor-pointer'>
                            <img className='w-auto object-cover h-[40px]' src="https://beebom.com/wp-content/uploads/2015/02/airline-logos-japan-e1424575148558.png?quality=75&strip=all" alt="" />
                            <h1 className='text-center font-bold text-[14px] mt-5'>Japan Airlines</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='px-8 py-5 shadow-xl flex flex-col justify-center items-center cursor-pointer'>
                            <img className='w-auto object-cover h-[40px]' src="https://beebom.com/wp-content/uploads/2015/02/airline-logos-srilankan.jpg?quality=75&strip=all" alt="" />
                            <h1 className='text-center font-bold text-[14px] mt-5'>Hawaiian Airlines</h1>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default ShortingFlight;
