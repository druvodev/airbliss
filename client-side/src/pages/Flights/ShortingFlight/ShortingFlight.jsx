import React, { useState } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

const ShortingFlight = () => {
    const [selectedButton, setSelectedButton] = useState('cheapest'); // Initialize with the default selected button

    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType);
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-3'>
                <div className="tooltip tooltip-bottom" data-tip="Search for Previous Day Flight">
                    <FaCaretLeft className='text-[45px] text-cyan-500 cursor-pointer' />
                </div>
                <div className='font-sans font-semibold text-[32px]'>Flights from Dhaka to Chittagong</div>
                <div className="tooltip tooltip-bottom" data-tip="Search for Next Day Flight">
                    <FaCaretRight className='text-[45px] text-cyan-500 cursor-pointer' />
                </div>
            </div>
            <div className='flex w-full p-5 mt-10 rounded-md justify-between shadow-2xl'>
                <button
                    className={`p-4 text-left flex-grow py-2 px-3 pe-5 mb-0 border-0 ${
                        selectedButton === 'cheapest' ? 'bg-gray-100 text-white' : 'text-white'
                    }`}
                    onClick={() => handleButtonClick('cheapest')}
                >
                    <h1 className='text-[18px] font-semibold mb-2 text-gray-900'>Cheapest</h1>
                    <p className='text-[14px] text-[#7c8db0]'>To get the cheapest available flights</p>
                </button>  
                <div className='border self-stretch mx-5'></div>
                <button
                    className={`p-4 text-left flex-grow py-2 px-3 pe-5 mb-0 border-0 ${
                        selectedButton === 'shortest' ? 'bg-gray-100 text-white' : 'text-white'
                    }`}
                    onClick={() => handleButtonClick('shortest')}
                >
                    <h1 className='text-[18px] font-semibold mb-2 text-gray-900'>Shortest</h1>
                    <p className='text-[14px] text-[#7c8db0]'>To get the shortest available flights</p>
                </button>
            </div>
            <div>
                shorting by company
            </div>
        </div>
    );
};

export default ShortingFlight;
