import React from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector } from "react-redux";

const TotalAmount = () => {
  const bookings = useSelector((state) => state?.userInfo?.userBookings);

  let totalSum = 0;

  for (const item of bookings) {
    const total = parseInt(item.flight.fareSummary.total);
    if (!isNaN(total)) {
      totalSum += total;
    }
  }

  return (
    <div className="bg-white shadow-md p-7 rounded-lg flex justify-between items-center dark:bg-white/10 dark:backdrop-blur-md dark:shadow dark:shadow-white/50">
      <div className="flex items-center gap-6">
        <div className="border-[#FF0060] border-4 bg-[rgba(255,0,98,0.36)] w-16 h-16 rounded-full justify-center items-center flex">
          <FaMoneyBillTrendUp className="text-white text-4xl font-bold" />
        </div>
        <div>
          <h1 className="lg:text-xl font-light text-gray-900 dark:text-white">
            Total Amount Booking
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

export default TotalAmount;
