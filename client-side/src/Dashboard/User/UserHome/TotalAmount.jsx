import React from 'react';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { SlOptionsVertical } from 'react-icons/sl';

const TotalAmount = () => {
    return (
        <div className='bg-white shadow-md p-6 rounded-lg flex justify-between items-center'>
            <div className='flex items-center gap-10'>
                <div className='border-[#FF0060] border-4 bg-[rgba(255,0,98,0.36)] w-16 h-16 rounded-full justify-center items-center flex'>
                    <FaMoneyBillTrendUp className='text-white text-4xl font-bold' />
                </div>
                <div>
                    <h1 className='text-2xl font-light text-gray-600'>Total Ticket Booking</h1>
                    <p className='text-[#96a3c4] text-3xl font-semibold'>30 times</p>
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

export default TotalAmount;