import React from 'react';
import TotalBooking from './TotalBooking';
import TotalCancel from './TotalCancel';
import TotalRefund from './TotalRefund';
import PendingRefundAmount from './PendingRefundAmount';
import TotalRefundAmount from './TotalRefundAmount';
import TotalAmount from './TotalAmount';

const UserHome = () => {
  return (
    <div className='grid grid-cols-4'>
      <div className='grid col-span-3 grid-rows-2 gap-5'>
        <div className='grid grid-cols-3 gap-5'>
          <TotalBooking />
          <TotalCancel />
          <TotalRefund />
        </div>
        <div className='grid grid-cols-3 gap-5'>
          <PendingRefundAmount />
          <TotalRefundAmount />
          <TotalAmount />
        </div>
      </div>
      <div className='col-span-1'>
        hello
      </div>
    </div>
  );
};

export default UserHome;