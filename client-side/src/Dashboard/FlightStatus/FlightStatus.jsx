import { useEffect, useState } from "react";
import { MdOutlineFlightTakeoff, MdOutlineFlight } from "react-icons/md";
import { TbBrandFlightradar24 } from "react-icons/tb";
import { BsAirplaneEngines } from "react-icons/bs";
import { VscKebabVertical } from "react-icons/vsc";
import { Link } from "react-router-dom";

const FlightStatus = () => {
  return (
    <section>
      <section>
        <h1 className="font-semibold text-2xl">Flights</h1>

        <div className="mt-3 flex justify-start items-center gap-6">
          <div className="p-2 shadow-md h-[120px] md:h-auto border-t w-full">
            <h4 className="font-semibold text-sm mt-5 md:mt-0 mb-2 md:mb-0 md:text-lg pl-2">
              All Flights
            </h4>
            <div className="flex justify-center items-center mb-2">
              <BsAirplaneEngines size={35} color="#32a9db" />
            </div>
          </div>

          <div className="p-2 h-[120px] md:h-auto shadow-md border-t w-full">
            <h4 className="font-semiboldtext-sm mb-2 md:mb-0 md:text-lg pl-2">
              Running Flights
            </h4>
            <div className="flex justify-center items-center mb-2">
              <MdOutlineFlightTakeoff size={40} color="#32a9db" />
            </div>
          </div>

          <div className="p-2 h-[120px] md:h-auto shadow-md border-t w-full">
            <h4 className="font-semibold text-sm mb-2 md:mb-0 md:text-lg pl-2">
              Arrival Flight
            </h4>
            <div className="flex justify-center items-center mb-2">
              <TbBrandFlightradar24 size={40} color="#32a9db" />
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <div className="overflow-x-auto mt-6 mb-12">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-50 shadow">
            <tr>
              <th>Airline Company</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Duration</th>
              <th>Price ($)</th>
              <th>Total Bookings</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2">
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="https://4.bp.blogspot.com/-GQ_AFkfZNDM/Tg379bG4OvI/AAAAAAAAZyw/t8MBnw5ZdWs/s1600/air_india_logo_history.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="">#72975</div>
                    <div className="text-md">United States</div>
                  </div>
                </div>
              </td>
              <td>
                <h4>New York</h4>
                <p>5:29 pm</p>
              </td>
              <td>
                <h4>New York</h4>
                <p>5:29 pm</p>
              </td>
              <td>
                <h4>Non-Stop</h4>
                <p>23h 20min</p>
              </td>

              <td>68.00</td>
              <td>
                <div className="flex relative gap-x-3 items-center ">
                  <div>
                    <p>Confirmed(38)</p>
                    <p>Refund(00)</p>
                    <p>Available(08)</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FlightStatus;
