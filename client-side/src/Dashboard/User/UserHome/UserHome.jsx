import React, { useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { setIsActive } from "../../../redux/features/searchFilterSlice";
import { useDispatch, useSelector } from "react-redux";

const ITEMS_PER_PAGE = 5;

const UserHome = () => {
  const [booking, setBooking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isActive = useSelector((state) => state?.searchFilter?.isActive);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("/manageBooking.json")
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, []);

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePaginationNext = () => {
    const totalPages = Math.ceil(booking.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  //   console.log(booking);
  return (
    <div>
      <div className="overflow-x-auto mx-7 mt-[50px] px-10 py-5 rounded-xl bg-white">
        <div className="flex gap-1 bg-gray-50  p-1 rounded w-fit font-medium text-gray-600 text-sm">
          <div
            onClick={() => dispatch(setIsActive("flight"))}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
              isActive === "flight"
                ? "border-t-2 shadow bg-white  border-black  "
                : ""
            }`}
          >
            All Flight
          </div>
          <div
            onClick={() => dispatch(setIsActive("hotel"))}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
              isActive === "hotel"
                ? "border-t-2 shadow bg-white  border-black"
                : ""
            }`}
          >
            Cancel Flight
          </div>
          <div
            onClick={() => dispatch(setIsActive("visa"))}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
              isActive === "visa"
                ? "border-t-2 bg-white shadow border-black"
                : ""
            }`}
          >
            Arrive Flight
          </div>
        </div>

        <hr className="mt-3 " />

        <table className="table mt-3">
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
            {booking.slice(startIndex, endIndex).map((flight, index) => (
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
        <section className="mt-12 flex justify-end items-center">
          <button
            className="border-[1px] p-2 rounded-l-md"
            onClick={handlePaginationPrev}
          >
            <GrPrevious size={20} />
          </button>
          {/* Render pagination buttons based on the total number of pages */}
          {Array.from(
            { length: Math.ceil(booking.length / ITEMS_PER_PAGE) },
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

export default UserHome;
