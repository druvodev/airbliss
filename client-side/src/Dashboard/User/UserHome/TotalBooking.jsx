import React from 'react';
import { BiSolidBookmarkAltPlus } from 'react-icons/bi';

const TotalBooking = () => {
    return (
        <div className='bg-[#176B87] p-6 rounded-lg'>
            <h1 className='text-2xl font-semibold text-white'>Total Booking</h1>
            <div className='flex justify-between mt-4 gap-2'>
                <p className='text-white text-3xl font-bold'>200$</p>
                <BiSolidBookmarkAltPlus className='text-white text-3xl font-bold mt-1' />
            </div>
        </div>
    );
};

export default TotalBooking;