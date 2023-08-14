import React from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

const ShortingFlight = () => {
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
            <div>
                shorting by price
            </div>
            <div>
                shorting by company
            </div>
        </div>
    );
};

export default ShortingFlight;