import React from 'react';
import { HiReceiptRefund } from 'react-icons/hi';

const TotalRefund = () => {
    return (
        <div className='bg-white shadow-md p-6 rounded-lg'>
            <h1 className='text-2xl font-semibold text-gray-900'>Total Refund Ticket</h1>
            <div className='flex justify-between mt-4 gap-2'>
                <p className='text-gray-900 text-3xl font-bold'>10 times</p>
                <HiReceiptRefund className='text-gray-900 text-3xl font-bold mt-1' />
            </div>
        </div>
    );
};

export default TotalRefund;