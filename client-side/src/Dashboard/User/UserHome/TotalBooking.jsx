import React from 'react';
import { BiSolidBookmarkAltPlus } from 'react-icons/bi';

const TotalBooking = () => {
    return (
        <div className='bg-white shadow-md shadow-lg p-6 rounded-lg'>
            <h1 className='text-2xl font-semibold text-gray-900'>Total Ticket Booking</h1>
            <div className='flex justify-between mt-4 gap-2'>
                <p className='text-gray-900 text-3xl font-bold'>30 times</p>
                <BiSolidBookmarkAltPlus className='text-gray-900 text-3xl font-bold mt-1' />
            </div>
        </div>
    );
};

export default TotalBooking;