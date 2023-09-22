import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  FaCertificate,
  FaCreativeCommons,
  FaPlaneDeparture,
  FaTicketAlt,
  FaUserAlt,
  FaWallet,
} from "react-icons/fa";
import { MdAirplaneTicket } from "react-icons/md";
import { TiCancelOutline } from "react-icons/ti";
import { GiReturnArrow } from "react-icons/gi";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CircularProgressBar from "../../../Components/CircularProgressBar/CircularProgressBar";
import FlightProgressBar from "../../../Components/CircularProgressBar/FlightProgressBar";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const newDate = new Date();
  const todayDate = format(newDate, "dd/MM/yyyy");

  const allUserData = useSelector((state) => state?.userInfo?.allUserInfo);
  const allBookingData = useSelector(
    (state) => state?.userBookingInfo?.allBookings
  );

  const todayBookingData = allBookingData?.filter(
    (bookingData) => bookingData?.bookingDateTime.split(" ")[0] == todayDate
  );

  const totalRevenue = todayBookingData?.filter(
    (revenue) => revenue?.bookingStatus == "confirmed"
  );
  const allRevenue = totalRevenue?.map(
    (revenue) => revenue?.flight?.fareSummary?.total
  );
  let totalSum = 0;

  for (let i = 0; i < allRevenue?.length; i++) {
    const revenue = parseFloat(allRevenue[i]);
    if (!isNaN(revenue)) {
      totalSum += revenue;
    }
  }

  let thisMonthReveniew = 0;

  const TodayConfirmBooking = allBookingData?.filter(
    (bookingData) => bookingData?.bookingStatus == "confirmed"
  );

  // console.log(TodayConfirmBooking);

  for (const item of TodayConfirmBooking) {
    const total = parseInt(item?.flight?.fareSummary?.total);
    if (!isNaN(total)) {
      thisMonthReveniew += total;
    }
  }

  const data = TodayConfirmBooking?.map((booking) => {
    const bookingDateTime = booking?.bookingDateTime?.split(" at ")[0];
    const total = booking?.flight?.fareSummary?.total;

    if (total && total?.length > 0) {
      return {
        month: bookingDateTime,
        uv: total,
        pv: 80,
        amt: 70,
      };
    } else {
      return {
        name: "No Booking Found",
      };
    }
  });

  const totalCancel = todayBookingData?.filter(
    (cancel) => cancel?.bookingStatus == "cancel"
  );
  const totalRefund = todayBookingData?.filter(
    (refund) => refund?.requestStatus == "pending"
  );

  return (
    <section>
      <div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex justify-between items-center bg-white shadow-md rounded-xl p-10">
              <div>
                <p className="text-lg font-semibold">Total User</p>
                <h2 className="text-2xl font-bold">
                  {allUserData?.length || 0}
                </h2>
              </div>
              <div className="border-cyan-500 border-4 bg-[rgba(0,213,255,0.31)] w-16 h-16 rounded-full justify-center items-center flex">
                <FaUserAlt className="text-white text-3xl font-bold" />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-10">
              <div>
                <p className="text-lg font-semibold">Total Flight</p>
                <h2 className="text-2xl font-bold">
                  {allBookingData?.length || 0}
                </h2>
              </div>
              <div className="border-cyan-500 border-4 bg-[rgba(0,213,255,0.31)] w-16 h-16 rounded-full justify-center items-center flex">
                <FaPlaneDeparture className="text-white text-3xl font-bold" />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-10">
              <div>
                <p className="text-lg font-semibold">Revenue</p>
                <h2 className="text-2xl font-bold">{totalSum} BDT</h2>
              </div>
              <div className="border-cyan-500 border-4 bg-[rgba(0,213,255,0.31)] w-16 h-16 rounded-full justify-center items-center flex">
                <FaWallet className="text-white text-3xl font-bold" />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-10">
              <div>
                <p className="text-lg font-semibold">Today booking ticket</p>
                <h2 className="text-2xl font-bold">
                  {todayBookingData?.length || 0}
                </h2>
              </div>
              <div className="border-cyan-500 border-4 bg-[rgba(0,213,255,0.31)] w-16 h-16 rounded-full justify-center items-center flex">
                <MdAirplaneTicket className="text-white text-3xl font-bold" />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-10">
              <div>
                <p className="text-lg font-semibold">Today Cancel Flight</p>
                <h2 className="text-2xl font-bold">
                  {totalCancel?.length || 0}
                </h2>
              </div>
              <div className="border-cyan-500 border-4 bg-[rgba(0,213,255,0.31)] w-16 h-16 rounded-full justify-center items-center flex">
                <TiCancelOutline className="text-white text-3xl font-bold" />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-10">
              <div>
                <p className="text-lg font-semibold">Today Refund request</p>
                <h2 className="text-2xl font-bold">
                  {totalRefund?.length || 0}
                </h2>
              </div>
              <div className="border-cyan-500 border-4 bg-[rgba(0,213,255,0.31)] w-16 h-16 rounded-full justify-center items-center flex">
                <GiReturnArrow className="text-white text-3xl font-bold" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-white shadow-lg rounded-xl p-2 md:p-5">
          <div className="flex justify-between items-center my-5">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Pev vs Today Revenue
              </h2>
              <p className="font-semibold text-gray-500 tracking-wider">
                Revenue Without Vat
              </p>
            </div>

            <div className="text-right">
              <h2 className="text-xl md:text-2xl font-bold">
                {thisMonthReveniew} BDT
              </h2>
              <p className="font-semibold text-gray-500 ">
                <span className="text-cyan-600">+1.5%</span> than last Day
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <ReferenceLine x="January" stroke="green" />
              <ReferenceLine
                y={4000}
                label="Max"
                stroke="red"
                strokeDasharray="3 3"
              />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#0097A7"
                fill="#bfffff"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
