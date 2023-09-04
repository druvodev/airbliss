import React from 'react';
import TotalBooking from './TotalBooking';
import TotalCancel from './TotalCancel';
import TotalRefund from './TotalRefund';
import PendingRefundAmount from './PendingRefundAmount';
import TotalRefundAmount from './TotalRefundAmount';
import TotalAmount from './TotalAmount';

const UserHome = () => {
  return (
    <>
      <div className='grid grid-rows-2 gap-5'>
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
    </>
  );
};

export default UserHome;