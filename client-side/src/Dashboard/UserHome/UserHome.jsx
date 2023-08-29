import React, { useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

const UserHome = () => {
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    fetch("/manageBooking.json")
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, []);

  console.log(booking);
  return (
    <div>
      <div className="overflow-x-auto mx-7 mt-[50px] px-10 py-5 rounded-xl bg-white">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Flight image</th>
              <th>Flight name</th>
              <th>Flight booking date</th>
              <th>Ticket Price</th>
              <th>Travel Path</th>
              <th>Passport Number</th>
              <th>Flight Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((flight, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle rounded-full w-12 h-12">
                        <img
                          src={flight.flightImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{flight.flightName}</td>
                <td>{flight.bookingDate}</td>
                <td>$ {flight.ticketPrice}</td>
                <td>
                  {flight.from} To {flight.to}
                </td>
                <td>{flight.passport}</td>
                <td>{flight.flightStatus}</td>
                <td className="flex gap-2 mt-2">
                  <button
                    className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-cyan-500
                    }`}
                  >
                    <AiFillSetting />
                  </button>
                  <button
                    className={`w-8 h-8 rounded-full text-white flex justify-center items-center  bg-red-400`}
                  >
                    <MdCancel />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHome;
