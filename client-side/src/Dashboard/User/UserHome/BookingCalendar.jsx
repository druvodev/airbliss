import React, { useState } from "react";
import { Calendar } from "react-date-range";
import { SlOptionsVertical } from "react-icons/sl";

const BookingCalendar = () => {
  const [bookedDates, setBookedDates] = useState([
    // Add your booked dates here, e.g., "2023-09-10", "2023-09-15"
  ]);

  return (
    <div className="bg-white shadow-md lg:p-6 p-2 rounded-lg h-full dark:bg-white/10 dark:backdrop-blur-md dark:shadow dark:shadow-white/50 ">
      <div className="flex justify-between mb-10">
        <h1 className="lg:text-2xl font-light text-gray-900 dark:text-gray-200">
          Booking Calendar
        </h1>
        <button>
          <SlOptionsVertical className="text-gray-400 text-xl font-bold mt-1" />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <Calendar
          rangeColors={["#262626"]}
          color="#0891B2"
          direction="vertical"
          showDateDisplay={false}
          minDate={new Date()}
          className="w-[320px] lg:w-fit lg:shadow rounded-md mr-1"
          booked={bookedDates.map((date) => new Date(date))}
        />
      </div>
    </div>
  );
};

export default BookingCalendar;
