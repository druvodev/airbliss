import React from "react";
import { RiRefundFill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector } from "react-redux";

const PendingRefundAmount = () => {
  const bookings = useSelector((state) => state?.userInfo?.userBookings);

  const cancelBookings = bookings?.filter(
    (booking) => booking?.bookingStatus === "cancel"
  );
  const pendingReq = cancelBookings?.filter(
    (pending) => pending.requestStatus === "pending"
  );

  let totalSum = 0;

  // Iterate through the JSON data and sum the "total" values
  for (const item of pendingReq) {
    const total = parseInt(item.flight.fareSummary.total);
    if (!isNaN(total)) {
      totalSum += total;
    }
  }

  return (
    <div className="bg-white shadow-md p-7 rounded-lg flex justify-between items-center dark:bg-white/10 dark:backdrop-blur-md dark:shadow dark:shadow-white/50">
      <div className="flex items-center gap-6">
        <div className="border-[#42C2FF] border-4 bg-[rgba(66,195,255,0.37)] w-16 h-16 rounded-full justify-center items-center flex">
          <RiRefundFill className="text-white text-4xl font-bold" />
        </div>
        <div>
          <h1 className="lg:text-xl font-light text-gray-900 dark:text-white  ">
            Pending Refund Amount
          </h1>
          <p className="text-gray-900 lg:text-2xl text-xl font-semibold mt-2 dark:text-gray-200">
            {totalSum} BDT
          </p>
        </div>
      </div>
      <div>
        <button>
          <SlOptionsVertical className="text-gray-400 text-xl font-bold mt-1" />
        </button>
      </div>
    </div>
  );
};

export default PendingRefundAmount;
