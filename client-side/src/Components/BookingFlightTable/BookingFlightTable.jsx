import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaInfo } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 15;
const MAX_VISIBLE_PAGES = 3;

const BookingFlightTable = ({
  bookings,
  openModal,
  setFlightRef,
  status,
  action,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(bookings?.length / ITEMS_PER_PAGE);

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePaginationNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageRange = () => {
    const pageRange = [];
    const halfMax = Math.floor(MAX_VISIBLE_PAGES / 2);

    for (let i = 1; i <= Math.min(2, totalPages); i++) {
      pageRange.push(i);
    }

    if (currentPage - halfMax > 3) {
      pageRange.push(null);
    }

    for (
      let i = Math.max(currentPage - halfMax, 3);
      i <= Math.min(currentPage + halfMax, totalPages - 2);
      i++
    ) {
      pageRange.push(i);
    }

    if (totalPages - currentPage - halfMax > 2) {
      pageRange.push(null);
    }

    for (
      let i = Math.max(totalPages - 1, currentPage + halfMax + 1);
      i <= totalPages;
      i++
    ) {
      pageRange.push(i);
    }

    return pageRange;
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

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
      </div>

      <section className="mt-12 md:pe-7 flex justify-end items-center ">
        <button
          className="border-[1px] p-2 rounded-l-md"
          onClick={handlePaginationPrev}
        >
          <GrPrevious size={20} />
        </button>
        {/* Render pagination buttons */}
        {getPageRange().map((pageNumber, index) => (
          <h3
            key={index}
            className={`px-3 py-[6px] border-[1px] cursor-pointer ${
              pageNumber === null
                ? "text-gray-500"
                : pageNumber === currentPage
                ? "bg-cyan-600 text-white"
                : ""
            }`}
            onClick={() => pageNumber !== null && setCurrentPage(pageNumber)}
          >
            {pageNumber === null ? "..." : pageNumber}
          </h3>
        ))}
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

export default BookingFlightTable;
