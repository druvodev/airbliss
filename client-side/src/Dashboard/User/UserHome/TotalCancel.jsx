import React from 'react';
import { TbCalendarCancel } from 'react-icons/tb';

const TotalCancel = () => {
    return (
        <div className='bg-[#614BC3] p-6 rounded-lg'>
            <h1 className='text-2xl font-semibold text-white'>Total Canceling Ticket</h1>
            <div className='flex justify-between mt-4 gap-2'>
                <p className='text-white text-3xl font-bold'>4 times</p>
                <TbCalendarCancel className='text-white text-3xl font-bold mt-1' />
            </div>
        </div>
    );
};

export default TotalCancel;