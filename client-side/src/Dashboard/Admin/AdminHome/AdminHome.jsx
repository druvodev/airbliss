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

const AdminHome = () => {
  return (
    <section>
      <div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-10">
              <div>
                <p className="text-lg font-semibold">Total User</p>
                <h2 className="text-2xl font-bold">536</h2>
              </div>
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
      </div>
    </section>
  );
};

export default AdminHome;
