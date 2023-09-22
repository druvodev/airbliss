import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 15;

const RescheduleTable = ({
  rescheduleBookingData,
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

  // /rescheduleSeat/: flightId /: totalSeats /: departureDate
  // /reschedule/:date/:airportCode/:bookingReference
  // /rescheduleManage/:status/:date/:airportCode/:bookingReference

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
      <div className="overflow-x-auto shadow-md md:mx-7 mt-[30px] px-10 py-5 rounded-xl bg-white dark:bg-white/10 dark:backdrop-blur-md dark:shadow dark:shadow-white/50 dark:text-gray-200">
        {rescheduleBookingData.length < 1 ? (
          <div className="w-full flex items-center justify-center mt-20">
            <p className="sm:text-sm md:text-base lg:text-xl"> No data found</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr className="dark:text-gray-100">
                <th>#</th>
                <th>Flight image</th>
                <th>Flight name</th>
                <th>Booking Reference</th>
                <th>Flight booking date</th>
                <th>Travel Path</th>
                <th>Ticket Price</th>
                <th className="capitalize">{status}</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {rescheduleBookingData
                ?.slice(startIndex, endIndex)
                .map((flight, index) => (
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
                    <td>
                      <button
                        className="btn btn-sm rounded-full px-4 bg-cyan-500 text-white"
                        onClick={() => {
                          openModal();
                          setFlightRef(flight?.bookingReference);
                        }}
                        disabled={
                          flight?.residualStatus === "denied" ||
                          flight?.residualStatus === "approved" ||
                          flight?.residualStatus === "pending"
                        }
                      >
                        Apply
                      </button>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: `/dashboard/ticketHistory/${flight?.bookingReference}`,
                        }}
                      >
                        <button
                          className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-cyan-400 hover:bg-cyan-500
              }`}
                        >
                          <FaInfo />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <section className="mt-12 mr-6 mb-8 flex justify-end items-center">
          <button
            className="border-[1px] p-2 rounded-l-md dark:bg-gray-600"
            onClick={handlePaginationPrev}
          >
            <GrPrevious size={20} />
          </button>
          {/* Render pagination buttons based on the total number of pages */}
          {Array.from(
            {
              length: Math.ceil(rescheduleBookingData?.length / ITEMS_PER_PAGE),
            },
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
            className="border-[1px] p-2 rounded-r-md dark:bg-gray-600"
            onClick={handlePaginationNext}
          >
            <GrNext size={20} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default RescheduleTable;
