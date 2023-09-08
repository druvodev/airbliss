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
    <div className="grid gap-7 mt-10">
      <div className="grid grid-rows-2 gap-7">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-7">
          <TotalBooking />
          <TotalCancel />
          <PendingRefundAmount />
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-7">
          <TotalRefundAmount />
          <TotalRefund />
          <TotalAmount />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-7">
        <div className="col-span-1">
          <BookingCalendar />
        </div>
        <div className="col-span-2">
          <BookingChart />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
