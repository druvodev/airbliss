import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdWifiProtectedSetup } from "react-icons/md";

const ITEMS_PER_PAGE = 15;

const TableReschedule = ({
  AllReschedule,
  status,
  openModal,
  setFlightRef,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handlePaginationNext = () => {
    const totalPages = Math.ceil(
      rescheduleBookingData?.length / ITEMS_PER_PAGE
    );
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return (
    <div>
      <div className="overflow-x-auto shadow-md md:mx-7 mt-[30px] px-10 py-5 rounded-xl ">
        {AllReschedule.length < 1 ? (
          <div className="w-full flex items-center justify-center mt-20">
            <p className="sm:text-sm md:text-base lg:text-xl"> No data found</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Flight image</th>
                <th>Flight name</th>
                <th>Booking Reference</th>
                <th>Flight booking date</th>
                <th>Travel Path</th>
                <th>Ticket Price</th>
                <th className="capitalize">{status}</th>
                <th className="text-center">Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {AllReschedule?.slice(startIndex, endIndex).map(
                (flight, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle rounded-full w-12 h-12">
                            <img
                              src={flight?.airlineLogo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{flight?.flight.airline}</td>
                    <td>{flight?.bookingReference}</td>
                    <td>{flight?.bookingDateTime}</td>

                    <td>
                      {flight?.flight?.departureCity} To{" "}
                      {flight?.flight?.arrivalCity}
                    </td>
                    <td>BDT {flight?.flight?.fareSummary?.total}</td>
                    <td className="capitalize">
                      <span>
                        {flight?.AllRescheduletatus}{" "}
                        <span
                          className={`${(flight?.residualStatus === "denied" &&
                              "text-red-500 bg-red-50 rounded-full px-2 py-1") ||
                            (flight?.residualStatus === "approved" &&
                              "text-green-500 bg-green-50 rounded-full px-2 py-1") ||
                            (flight?.residualStatus === "pending" &&
                              "text-orange-500 bg-orange-50 rounded-full px-2 py-1") ||
                            "text-blue-500 bg-blue-50 rounded-full px-2 py-1"
                            }`}
                        >
                          {flight?.residualStatus ? flight?.residualStatus : "NotYet"}
                        </span>
                      </span>
                    </td>
                    <td className="flex justify-center mt-2">
                      <button
                        onClick={() => {
                          openModal();
                          setFlightRef(flight?.bookingReference);
                        }}
                        className={`btn btn-sm w-[120px] rounded-full  text-white ${flight?.residualStatus === "pending"
                            ? "bg-cyan-400"
                            : "bg-green-400"
                          }`}
                        disabled={
                          flight?.residualStatus === "denied" ||
                          flight?.residualStatus === "approved"
                        }
                      >
                        Process <MdWifiProtectedSetup />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          openModal();
                          setFlightRef(flight?.bookingReference);
                        }}
                        className={`w-8 h-8 rounded-full text-white flex justify-center items-center ${flight?.residualStatus === "pending"
                            ? "bg-cyan-400"
                            : "bg-cyan-400 hover:bg-cyan-500"
                          }}`}
                        disabled={flight?.residualStatus === "pending"}
                      >
                        <FaInfo />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
        <section className="mt-12 mr-6 mb-8 flex justify-end items-center">
          <button
            className="border-[1px] p-2 rounded-l-md"
            onClick={handlePaginationPrev}
          >
            <GrPrevious size={20} />
          </button>
          {/* Render pagination buttons based on the total number of pages */}
          {Array.from(
            { length: Math.ceil(AllReschedule?.length / ITEMS_PER_PAGE) },
            (_, index) => (
              <h3
                key={index}
                className={`px-3 py-[6px] border-[1px] cursor-pointer ${index + 1 === currentPage ? "bg-cyan-600 text-white" : ""
                  }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </h3>
            )
          )}
          <button
            className="border-[1px] p-2 rounded-r-md"
            onClick={handlePaginationNext}
          >
            <GrNext size={20} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default TableReschedule;
