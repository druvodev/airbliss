import React, { useState } from "react";
import { FaCheck, FaInfo } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 15;

const CancelBookingTable = ({
  bookings,
  openModal,
  setFlightRef,
  status,
  action,
  handleCancelApproved,
  setDetails,
  feedbackTitle,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePaginationNext = () => {
    const totalPages = Math.ceil(bookings?.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  console.log("status", status);

  return (
    <div>
      <div className="overflow-x-auto shadow-md md:mx-7 mt-[30px] px-10 py-5 rounded-xl bg-white">
        {bookings.length < 1 ? (
          <div className="w-full flex items-center justify-center my-20">
            <p className="sm:text-sm md:text-base lg:text-xl"> No data found</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Booking Reference</th>
                <th>Flight Name</th>
                <th>Flight Date</th>
                <th>Travel Path</th>
                <th className="capitalize">{status}</th>
                <th className="capitalize">{feedbackTitle}</th>
                {!action && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {bookings?.slice(startIndex, endIndex).map((flight, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{flight?.bookingReference}</td>

                  <td>{flight?.flight.airline}</td>

                  <td>{flight?.flight?.arrivalDate}</td>
                  <td>
                    {flight?.flight?.departureCity} To{" "}
                    {flight?.flight?.arrivalCity}
                  </td>
                  <td className="capitalize">
                    {status === "flight status" && (
                      <span
                        className={`${
                          flight?.requestStatus === "denied" &&
                          "text-red-500 bg-red-50 rounded-full px-2 flex flex-col items-center justify-center py-1"
                        } ${
                          flight?.requestStatus === "success" &&
                          "text-green-600 bg-green-50 rounded-full flex flex-col items-center justify-center px-2 py-1"
                        } ${
                          flight?.requestStatus === "approved" &&
                          "text-orange-500 bg-green-50 rounded-full flex flex-col items-center justify-center px-2 py-1"
                        } ${
                          flight?.requestStatus === "pending" &&
                          "text-orange-500 bg-orange-50 rounded-full flex flex-col items-center justify-center px-2 py-1"
                        } `}
                      >
                        {flight?.bookingStatus}{" "}
                        <span
                          className={`${
                            flight?.requestStatus === "denied" &&
                            "text-red-500 bg-red-50 rounded-full px-2 flex flex-col items-center justify-center py-1"
                          }`}
                        >
                          ({flight?.requestStatus})
                        </span>
                      </span>
                    )}
                    {status === "cancel status" && (
                      <span
                        className={`${
                          flight?.requestStatus === "denied" &&
                          "text-red-500 bg-red-50 rounded-full flex flex-col items-center justify-center px-2 py-1"
                        } ${
                          flight?.requestStatus === "success" &&
                          "text-green-600 bg-green-50 rounded-full flex flex-col items-center justify-center px-2 py-1"
                        } ${
                          flight?.requestStatus === "approved" &&
                          "text-orange-500 bg-green-50 rounded-full flex flex-col items-center justify-center px-2 py-1"
                        } ${
                          flight?.requestStatus === "pending" &&
                          "text-orange-500 bg-orange-50 rounded-full flex flex-col items-center justify-center px-2 py-1"
                        } `}
                      >
                        {flight?.requestStatus}
                      </span>
                    )}
                    {status === "confirm status" && (
                      <span
                        className={`${
                          flight?.requestStatus === "denied" &&
                          "text-red-500 bg-red-50 rounded-full flex flex-col items-center justify-center px-2 py-1"
                        } ${
                          flight?.requestStatus === "success" &&
                          "text-green-600 bg-green-50 rounded-full flex flex-col items-center justify-center px-2 py-1"
                        } ${
                          flight?.requestStatus === "approved" &&
                          "text-orange-500 bg-green-50 rounded-full flex flex-col items-center justify-center px-2 py-1"
                        } ${
                          flight?.requestStatus === "pending" &&
                          "text-orange-500 bg-orange-50 rounded-full flex flex-col items-center justify-center px-2 py-1"
                        } `}
                      >
                        {flight?.requestStatus}
                      </span>
                    )}
                  </td>
                  <td>
                    {feedbackTitle === "admin feedback"
                      ? flight?.deniedFeedback
                      : "I want to cancel for my personal issue"}
                  </td>
                  {!action && (
                    <td className="flex gap-2 mt-2">
                      {flight?.requestStatus === "pending" ? (
                        <button
                          className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-blue-400 hover:bg-blue-500
                  }`}
                          onClick={() => {
                            setFlightRef(flight?.bookingReference);
                            handleCancelApproved(flight);
                          }}
                        >
                          <FaCheck />
                        </button>
                      ) : (
                        <button
                          className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-blue-400 opacity-30
                  }`}
                          onClick={() => {
                            setFlightRef(flight?.bookingReference);
                            handleCancelApproved();
                          }}
                          disabled
                        >
                          <FaCheck />
                        </button>
                      )}

                      {flight?.requestStatus === "pending" ? (
                        <button
                          className={`w-8 h-8 rounded-full text-white flex justify-center items-center  bg-red-400  hover:bg-red-500`}
                          onClick={() => {
                            openModal();
                            setFlightRef(flight?.bookingReference);
                          }}
                        >
                          <MdCancel />
                        </button>
                      ) : (
                        <button
                          className={`w-8 h-8 rounded-full text-white flex justify-center items-center  bg-red-400  opacity-30`}
                          onClick={() => {
                            openModal();
                            setFlightRef(flight?.bookingReference);
                          }}
                          disabled
                        >
                          <MdCancel />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <section className="mt-12 md:pe-7 flex justify-end items-center">
        <button
          className="border-[1px] p-2 rounded-l-md"
          onClick={handlePaginationPrev}
        >
          <GrPrevious size={20} />
        </button>
        {/* Render pagination buttons based on the total number of pages */}
        {Array.from(
          { length: Math.ceil(bookings?.length / ITEMS_PER_PAGE) },
          (_, index) => (
            <h3
              key={index}
              className={`px-3 py-[6px] border-[1px] cursor-pointer ${
                index + 1 === currentPage ? "bg-cyan-600 text-white" : ""
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
  );
};

export default CancelBookingTable;
