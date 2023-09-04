import React from 'react';
import TotalBooking from './TotalBooking';
import TotalCancel from './TotalCancel';
import TotalRefund from './TotalRefund';
import PendingRefundAmount from './PendingRefundAmount';
import TotalRefundAmount from './TotalRefundAmount';
import TotalAmount from './TotalAmount';
import BookingChart from './BookingChart';
import BookingCalendar from './BookingCalendar';

const UserHome = () => {
  return (
    <div className='grid grid-cols-4'>
      <div className='grid col-span-3 grid-rows-6 gap-5'>
        <div className='grid grid-cols-3 row-span-1 gap-5'>
          <TotalBooking />
          <TotalCancel />
          <TotalRefund />
        </div>
        <div className='grid grid-cols-3 row-span-1 gap-5'>
          <PendingRefundAmount />
          <TotalRefundAmount />
          <TotalAmount />
        </div>
        <div className='grid grid-cols-2 gap-5 row-span-4'>
          <BookingChart />
          <BookingCalendar />
        </div>
      </div>
      <div className='col-span-1'>
        hello
      </div>
    </div>
  );
};

export default UserHome;