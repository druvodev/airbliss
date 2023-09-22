import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { TbCalendarCancel } from "react-icons/tb";
import { useSelector } from "react-redux";

const TotalCancel = () => {
  const bookings = useSelector((state) => state?.userInfo?.userBookings);

  const cancelBookings = bookings?.filter(
    (booking) => booking?.bookingStatus === "cancel"
  );

  return (
    <div className="bg-white shadow-md p-7 rounded-lg flex justify-between items-center dark:bg-white/10 dark:backdrop-blur-md dark:shadow dark:shadow-white/50">
      <div className="flex items-center gap-6">
        <div className="border-[#071952] border-4 bg-[rgba(7,25,82,0.35)] w-16 h-16 rounded-full justify-center items-center flex ">
          <TbCalendarCancel className="text-white text-4xl font-bold " />
        </div>
        <div>
          <h1 className="lg:text-xl font-light text-gray-900 dark:text-white">
            Total Canceling Ticket
          </h1>
          <p className="text-gray-900 lg:text-2xl text-xl font-semibold mt-2 dark:text-gray-200">
            {cancelBookings.length} times
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

export default TotalCancel;
