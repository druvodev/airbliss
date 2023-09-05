import React from "react";
import TotalBooking from "./TotalBooking";
import TotalCancel from "./TotalCancel";
import TotalRefund from "./TotalRefund";
import PendingRefundAmount from "./PendingRefundAmount";
import TotalRefundAmount from "./TotalRefundAmount";
import TotalAmount from "./TotalAmount";
import BookingChart from "./BookingChart";
import BookingCalendar from "./BookingCalendar";

const UserHome = () => {
  return (
    <div className='grid gap-7 mt-10'>
      <div className="grid grid-rows-2 gap-7">
        <div className="grid grid-cols-3 gap-7">
          <TotalBooking />
          <TotalCancel />
          <PendingRefundAmount />
        </div>
        <div className="grid grid-cols-3 gap-7">
          <TotalRefundAmount />
          <TotalRefund />
          <TotalAmount />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-7">
        <BookingChart />
        <BookingCalendar />
      </div>
    </div>
    // <div className='grid grid-cols-4'>
    //   <div className='grid col-span-3 grid-rows-6 gap-5'>
    //     <div className='grid grid-cols-2 row-span-1 gap-5'>
    //       <TotalBooking />
    //       <TotalCancel />
    //     </div>
    //     <div className='grid grid-cols-2 row-span-1 gap-5'>
    //       <PendingRefundAmount />
    //       <TotalRefundAmount />
    //     </div>
    //     <div className='grid grid-cols-2 row-span-1 gap-5'>
    //       <TotalRefund />
    //       <TotalAmount />
    //     </div>
    //     <div className='grid grid-cols-2 gap-5 row-span-3'>
    //       <BookingChart />
    //       <BookingCalendar />
    //     </div>
    //   </div>
    //   <div className="col-span-1">hello</div>
    // </div>
  );
};

export default UserHome;
