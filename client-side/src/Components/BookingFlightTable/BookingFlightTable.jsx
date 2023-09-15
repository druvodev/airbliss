import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaInfo } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const BookingFlightTable = ({
  bookings,
  openModal,
  setFlightRef,
  status,
  action,
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

  return (
    <div>
      <div className="overflow-x-auto shadow-md md:mx-7 mt-[30px] px-10 py-5 rounded-xl bg-white">
        {bookings.length < 1 ? (
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
                {!action && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {bookings?.slice(startIndex, endIndex).map((flight, index) => (
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
                    {status === "flight status" && (
                      <span>
                        {flight?.bookingStatus}{" "}
                        <span
                          className={`${
                            flight?.requestStatus === "denied" && "text-red-500"
                          }`}
                        >
                          ({flight?.requestStatus})
                        </span>
                      </span>
                    )}
                    {status === "cancel status" && (
                      <span>{flight?.requestStatus}</span>
                    )}
                    {status === "confirm status" && (
                      <span>{flight?.requestStatus}</span>
                    )}
                  </td>
                  {!action && (
                    <td className="flex gap-2 mt-2">
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

                      {flight?.requestStatus !== "success" ? (
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
                      ) : (
                        <button
                          className={`w-8 h-8 rounded-full text-white flex justify-center items-center  bg-red-400 hover:bg-red-500`}
                          onClick={() => {
                            openModal();
                            setFlightRef(flight?.bookingReference);
                          }}
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
        <section className="mt-12 flex justify-end items-center">
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
    </div>
  );
};

export default BookingFlightTable;
