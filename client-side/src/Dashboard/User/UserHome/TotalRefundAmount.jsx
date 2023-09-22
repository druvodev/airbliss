import React from "react";
import { RiRefund2Fill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector } from "react-redux";

const TotalRefundAmount = () => {
  const bookings = useSelector((state) => state?.userInfo?.userBookings);

  const cancelBookings = bookings?.filter(
    (booking) => booking?.bookingStatus === "cancel"
  );
  const approveReq = cancelBookings?.filter(
    (pending) => pending.requestStatus === "approved"
  );

  let totalSum = 0;

  // Iterate through the JSON data and sum the "total" values
  for (const item of approveReq) {
    const total = parseInt(item.flight.fareSummary.total);
    if (!isNaN(total)) {
      totalSum += total;
    }
  }

  return (
    <div className="bg-white shadow-md p-7 rounded-lg flex justify-between items-center dark:bg-white/10 dark:backdrop-blur-md dark:shadow dark:shadow-white/50">
      <div className="flex items-center gap-6">
        <div className="border-[#614BC3] border-4 bg-[rgba(97,75,195,0.36)] w-16 h-16 rounded-full justify-center items-center flex">
          <RiRefund2Fill className="text-gray-50 text-4xl font-bold" />
        </div>
        <div>
          <h1 className="lg:text-xl font-light text-gray-900 dark:text-white">
            Total Refund Amount
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

export default TotalRefundAmount;
