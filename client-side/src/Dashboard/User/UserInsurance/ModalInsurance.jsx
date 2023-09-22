import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaInfo } from "react-icons/fa";

const ITEMS_PER_PAGE = 15;

const ModalInsurance = ({ status, setFlightRef, openModal, insuranceBookings, todayDate }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  console.log(insuranceBookings);

  const handlePaginationNext = () => {
    const totalPages = Math.ceil(
      insuranceBookings?.length / ITEMS_PER_PAGE
    );
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;


  return (
    <div>
      <div className="overflow-x-auto shadow-md md:mx-7 mt-[30px] px-10 py-5 rounded-xl bg-white">
        {insuranceBookings?.length < 1 ? (
          <div className="w-full flex items-center justify-center mt-20">
            <p className="sm:text-sm md:text-base lg:text-xl"> No data found</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Flight Image</th>
                <th>Flight name</th>
                <th>Travel Path</th>
                <th>Policy Number</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Acton</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {insuranceBookings
                .slice(startIndex, endIndex)
                .map((insurance, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle rounded-full w-12 h-12">
                            <img
                              src={insurance?.airlineLogo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">
                          {insurance?.flight?.airline}
                        </div>
                      </div>
                    </td>
                    <td>
                      {insurance?.flight?.departureCity} To{" "}
                      {insurance?.flight?.arrivalCity}
                    </td>
                    <td>{insurance?.insurancePolicy?.policyNumber}</td>
                    <td>{insurance?.insurancePolicy?.startDate}</td>
                    <td>{insurance?.insurancePolicy?.endDate}</td>
                    <td>
                      <span
                        className={`capitalize ${(insurance?.insurancePolicy?.claimedStatus ===
                          "denied" &&
                          "text-red-500 bg-red-50 rounded-full px-2 py-1") ||
                          (insurance?.insurancePolicy?.claimedStatus ===
                            "approved" &&
                            "text-green-500 bg-green-50 rounded-full px-2 py-1") ||
                          (insurance?.insurancePolicy?.claimedStatus ===
                            "pending" &&
                            "text-orange-500 bg-orange-50 rounded-full px-2 py-1") ||
                          "text-blue-500 bg-blue-50 rounded-full px-2 py-1"
                          }`}
                      >
                        {insurance?.insurancePolicy?.claimedStatus ? insurance?.insurancePolicy?.claimedStatus : "NotYet"}
                      </span>
                    </td>
                    <th>
                      <button
                        onClick={() => {
                          openModal();
                          setFlightRef(insurance?.bookingReference)
                        }}
                        className="btn btn-sm bg-green-400 px-4 rounded-full text-white hover:btn-outline"
                        disabled={
                          insurance?.insurancePolicy?.claimedStatus ===
                          "pending" ||
                          insurance?.insurancePolicy?.claimedStatus ===
                          "denied" ||
                          insurance?.insurancePolicy?.claimedStatus ===
                          "approved" ||
                          insurance?.insurancePolicy?.endDate < todayDate
                        }
                      >
                        Claim
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => {
                          openModal();
                          setFlightRef(insurance?.bookingReference)
                        }}
                        className={`w-8 h-8 rounded-full text-white flex justify-center items-center ${insurance?.insurancePolicy?.claimedStatus === null
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-cyan-400"
                          }`}
                        disabled={
                          insurance?.insurancePolicy?.claimedStatus === null
                        }
                      >
                        <FaInfo />
                      </button>
                    </th>
                  </tr>
                ))}
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
          {Array.from(
            {
              length: Math.ceil(insuranceBookings?.length / ITEMS_PER_PAGE),
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

export default ModalInsurance;