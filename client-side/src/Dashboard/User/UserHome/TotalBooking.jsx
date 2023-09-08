import React from 'react';
import { BiSolidBookmarkAltPlus } from 'react-icons/bi';
import { SlOptionsVertical } from 'react-icons/sl';

const TotalBooking = () => {
    return (
        <div className='bg-white shadow-md p-7 rounded-lg flex justify-between items-center'>
            <div className='flex items-center gap-10'>
                <div className='border-[#FF8551] border-4 bg-[rgba(255,133,81,0.35)] w-16 h-16 rounded-full justify-center items-center flex'>
                    <BiSolidBookmarkAltPlus className='text-white text-4xl font-bold' />
                </div>
                <div>
                    <h1 className='lg:text-2xl font-light text-gray-900'>Total Ticket Booking</h1>
                    <p className='text-gray-900 lg:text-3xl text-xl font-semibold mt-4'>30 times</p>
                </div>
            </div>
            <div>
                <button>
                    <SlOptionsVertical className='text-gray-400 text-xl font-bold mt-1' />
                </button>
            </div>
        </div>
    );
};

export default TotalBooking;