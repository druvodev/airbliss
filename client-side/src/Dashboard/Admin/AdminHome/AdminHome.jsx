import React from "react";
import {
  FaCertificate,
  FaCreativeCommons,
  FaPlaneDeparture,
  FaUserAlt,
  FaWallet,
} from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
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

const AdminHome = () => {
  const data = [
    {
      month: "January",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      month: "February",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      month: "March",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      month: "April",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      month: "May",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      month: "June",
      uv: 3690,
      pv: 4300,
      amt: 2100,
    },
    {
      month: "July",
      uv: 3390,
      pv: 4300,
      amt: 2100,
    },
    {
      month: "August",
      uv: 3590,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <section>
      <div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex justify-between items-center bg-white shadow-md rounded-xl p-10">
              <div>
                <p className="text-lg font-semibold">Total User</p>
                <h2 className="text-2xl font-bold">536</h2>
              </div>
              {/* <CircularProgressBar /> */}
              <div
                className="radial-progress text-cyan-600"
                style={{ "--value": 70 }}
              >
                <FaUserAlt />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-10">
              <div>
                <p className="text-lg font-semibold">Running Flight</p>
                <h2 className="text-2xl font-bold">200</h2>
              </div>
              <div
                className="radial-progress text-cyan-600"
                style={{ "--value": 60 }}
              >
                <FaPlaneDeparture />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-10">
              <div>
                <p className="text-lg font-semibold">Revenue</p>
                <h2 className="text-2xl font-bold">$200M</h2>
              </div>
              <div
                className="radial-progress text-cyan-600"
                style={{ "--value": 80 }}
              >
                <FaWallet />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-10">
              <div>
                <p className="text-lg font-semibold">Total booking ticket</p>
                <h2 className="text-2xl font-bold">350M</h2>
              </div>
              <div
                className="radial-progress text-cyan-600"
                style={{ "--value": 70 }}
              >
                <FaCertificate />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-10">
              <div>
                <p className="text-lg font-semibold">Cancel Flight</p>
                <h2 className="text-2xl font-bold">175</h2>
              </div>
              <div
                className="radial-progress text-cyan-600"
                style={{ "--value": 30 }}
              >
                <FcCancel />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-10">
              <div>
                <p className="text-lg font-semibold">Refund request</p>
                <h2 className="text-2xl font-bold">85</h2>
              </div>
              <div
                className="radial-progress text-cyan-600"
                style={{ "--value": 40 }}
              >
                <GiReturnArrow />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-white shadow-lg rounded-xl p-2 md:p-5">
          <div className="flex justify-between items-center my-5">
            <div>
              <h2 className="text-2xl font-bold">Monthly Revenue</h2>
              <p className="font-semibold text-gray-500 tracking-wider">
                Total revenue this month
              </p>
            </div>

            <div className="text-right">
              <h2 className="text-2xl font-bold">$450K</h2>
              <p className="font-semibold text-gray-500 ">
                <span className="text-cyan-600">+1.5%</span> than last Month
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
          {/* <ResponsiveContainer width="100%" height="80%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer> */}
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
