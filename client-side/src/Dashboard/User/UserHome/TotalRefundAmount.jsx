import React from 'react';
import { RiRefund2Fill } from 'react-icons/ri';
import { SlOptionsVertical } from 'react-icons/sl';

const TotalRefundAmount = () => {
    return (
        <div className='bg-white shadow-md p-7 rounded-lg flex justify-between items-center'>
            <div className='flex items-center gap-10'>
                <div className='border-[#614BC3] border-4 bg-[rgba(97,75,195,0.36)] w-16 h-16 rounded-full justify-center items-center flex'>
                    <RiRefund2Fill className='text-gray-50 text-4xl font-bold' />
                </div>
                <div>
                    <h1 className='lg:text-2xl font-light text-gray-900'>Total Refund Amount</h1>
                    <p className='text-gray-900 lg:text-3xl text-xl font-semibold mt-4'>50$</p>
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

export default TotalRefundAmount;