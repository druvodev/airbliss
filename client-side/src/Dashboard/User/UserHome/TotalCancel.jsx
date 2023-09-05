import React from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import { TbCalendarCancel } from 'react-icons/tb';

const TotalCancel = () => {
    return (
        <div className='bg-white shadow-md p-6 rounded-lg flex justify-between items-center'>
            <div className='flex items-center gap-10'>
                <div className='border-[#071952] border-4 bg-[rgba(7,25,82,0.35)] w-16 h-16 rounded-full justify-center items-center flex'>
                    <TbCalendarCancel className='text-white text-4xl font-bold' />
                </div>
                <div>
                    <h1 className='text-2xl font-light text-gray-600'>Total Canceling Ticket</h1>
                    <p className='text-[#96a3c4] text-3xl font-semibold'>4 times</p>
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

export default TotalCancel;