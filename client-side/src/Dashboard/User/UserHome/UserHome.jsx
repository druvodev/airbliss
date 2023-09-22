import React, { useEffect } from "react";
import TotalBooking from "./TotalBooking";
import TotalCancel from "./TotalCancel";
import TotalRefund from "./TotalRefund";
import PendingRefundAmount from "./PendingRefundAmount";
import TotalRefundAmount from "./TotalRefundAmount";
import TotalAmount from "./TotalAmount";
import BookingChart from "./BookingChart";
import BookingCalendar from "./BookingCalendar";
import { useSelector } from "react-redux";

const UserHome = () => {
  const userData = useSelector((state) => state?.userInfo.userInfo);
  if (Object.keys(userData).length > 3) {
    sessionStorage.setItem("userInfo", JSON.stringify(userData));
  }

  const data = JSON.parse(sessionStorage.getItem("userInfo"));

  return (
    <div className="grid gap-7 mt-10 max-w-full">
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
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-1 grid-cols-1  md:gap-7">
        <div className="col-span-1">
          <BookingCalendar />
        </div>
        <div className="col-span-2 mt-6 md:mt-0">
          <BookingChart />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
