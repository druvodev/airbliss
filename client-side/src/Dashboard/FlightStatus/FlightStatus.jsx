import { useEffect, useState } from "react";
import { MdOutlineFlightTakeoff, MdOutlineFlight } from "react-icons/md";
import { TbBrandFlightradar24 } from "react-icons/tb";
import { GiWorld } from "react-icons/gi";
import { BiStopCircle } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";

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
              <GiWorld size={35} color="#32a9db" />
            </div>
          </div>

          <div className="p-2 h-[120px] md:h-auto shadow-md border-t w-full">
            <h4 className="font-semibold text-sm mb-2 md:mb-0 md:text-lg pl-2">
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
              <th>Price (BDT)</th>
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
                  <div className="font-[450]">
                    <p className="text-green-600">Confirmed(38)</p>
                    <p className="text-red-500">Refund(00)</p>
                    <p className="text-cyan-700">Available(08)</p>
                  </div>
                </div>
              </td>

              <td>
                <div className="flex items-center gap-1">
                  <p className="text-cyan-500">
                    <RxUpdate size={24} />{" "}
                  </p>
                  <p className="text-cyan-500">
                    <BiStopCircle size={26} />
                  </p>
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
