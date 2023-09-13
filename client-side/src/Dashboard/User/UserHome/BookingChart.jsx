import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatDate } from "../../../utils/formatDate";
import { useSelector } from "react-redux";

const BookingChart = () => {
  const bookings = useSelector((state) => state?.userInfo?.userBookings);

  const confirmBookings = bookings?.filter(
    (booking) => booking?.bookingStatus === "confirmed"
  );

  const data = confirmBookings.map((booking) => {
    const bookingDateTime = booking?.bookingDateTime.split(" at ")[0];

    const total = booking?.flight?.fareSummary?.total;

    return {
      name: bookingDateTime,
      amount: total,
    };
  });

  return (
    <div className="bg-white shadow-md lg:p-6 p-2 rounded-lg">
      <div className="flex justify-between mb-10">
        <h1 className="lg:text-2xl font-light text-gray-900">Prise Summery</h1>
        <button>
          <SlOptionsVertical className="text-gray-400 text-xl font-bold mt-1" />
        </button>
      </div>
      <ResponsiveContainer className="-ml-4" width="100%" height={350}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#70cfc9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingChart;
