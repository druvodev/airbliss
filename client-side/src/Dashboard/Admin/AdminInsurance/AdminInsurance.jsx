import React, { useState } from "react";
import { FaEye, FaHandsHolding } from "react-icons/fa6";
import ModalApprove from "./ModalApprove";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { MdDone } from "react-icons/md";
import ModalDenied from "./ModalDenied";
import { useDispatch, useSelector } from "react-redux";
import { setBookingsRefetch } from "../../../redux/features/bookingInfoSlice";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaInfo } from "react-icons/fa";

const ITEMS_PER_PAGE = 15;

const AdminInsurance = () => {
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [isModalApprovedOpen, setIsModalApprovedOpen] = useState(false); // New state variable
  const allBookingData = useSelector(
    (state) => state.userBookingInfo.allBookings
  );
  const insuranceBookings = allBookingData.filter(
    (booking) => booking?.insurancePolicy?.claimedStatus != null
  );
  const dispatch = useDispatch();
  const [isModalDeniedOpen, setIsModalDeniedOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePaginationNext = () => {
    const totalPages = Math.ceil(insuranceBookings?.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handleDenialSubmit = (insurance, premiumType, deniedFeedback) => {
    const insuranceData = {
      premiumType: premiumType,
      deniedFeedback: deniedFeedback,
    };
    fetch(
      `http://localhost:5000/insuranceClaimRequest/denied/${insurance?.flight?.departureDate}/${insurance?.flight?.departureAirport}/${insurance?.bookingReference}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ insuranceData }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.message == "Insurance policy updated") {
          toast.success(data.message);
          dispatch(setBookingsRefetch(new Date().toString()));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setIsModalDeniedOpen(false);
  };

  const closeDeniedModal = () => {
    setIsModalDeniedOpen(false);
  };

  const handleFormSubmit = (insurance, premiumType, payableAmount) => {
    const insuranceData = {
      premiumType: premiumType,
      claimedAmount: payableAmount,
    };
    fetch(
      `http://localhost:5000/insuranceClaimRequest/approved/${insurance?.flight?.departureDate}/${insurance?.flight?.departureAirport}/${insurance?.bookingReference}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ insuranceData }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.message == "Insurance policy updated") {
          toast.success(data.message);
          dispatch(setBookingsRefetch(new Date().toString()));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  };

  const openModal = (insurance) => {
    setSelectedInsurance(insurance);
    setIsModalApprovedOpen(true); // Open the "approved" modal by default
  };

  const closeModal = () => {
    setSelectedInsurance(null);
    setIsModalApprovedOpen(false);
    setIsModalDeniedOpen(false);
  };

  return (
    <div>
      <div className="bg-white p-5 shadow rounded-xl">
        <h1 className="text-[20px] font-light text-gray-900 capitalize">
          <span className="text-[24px] font-semibold text-cyan-500">
            AirBliss insurance
          </span>{" "}
          More Secure Flight
        </h1>
      </div>
      <div className="overflow-x-auto mx-1 mt-[40px] px-10 py-5 shadow-md rounded-xl bg-white">
        <table className="table">
          {/* head */}
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
                  <th className="flex gap-3 mt-2">
                    <button
                      onClick={() => openModal(insurance)}
                      className={`w-8 h-8 rounded-full text-white flex justify-center items-center ${insurance?.insurancePolicy?.claimedStatus ===
                        "approved" ||
                        insurance?.insurancePolicy?.claimedStatus === "denied"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-400"
                        }`}
                      disabled={
                        insurance?.insurancePolicy?.claimedStatus ===
                        "approved" ||
                        insurance?.insurancePolicy?.claimedStatus === "denied"
                      }
                    >
                      <MdDone className="text-xl" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedInsurance(insurance);
                        setIsModalDeniedOpen(true);
                      }}
                      className={`w-8 h-8 rounded-full text-white flex justify-center items-center ${insurance?.insurancePolicy?.claimedStatus ===
                        "approved" ||
                        insurance?.insurancePolicy?.claimedStatus === "denied"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-400"
                        }`}
                      disabled={
                        insurance?.insurancePolicy?.claimedStatus ===
                        "approved" ||
                        insurance?.insurancePolicy?.claimedStatus === "denied"
                      }
                    >
                      <RxCross2 className="text-xl" />
                    </button>
                  </th>
                  <th className="mt-2">
                    <button
                      onClick={() => openModal(insurance)}
                      className={`w-8 h-8 rounded-full text-white flex justify-center items-center ${insurance?.insurancePolicy?.claimedStatus === "pending"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-cyan-400"
                        }`}
                      disabled={
                        insurance?.insurancePolicy?.claimedStatus === "pending"
                      }
                    >
                      <FaInfo />
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {selectedInsurance && isModalApprovedOpen && (
          <ModalApprove
            insurance={selectedInsurance}
            onClose={closeModal}
            onSubmit={handleFormSubmit}
          />
        )}
        {selectedInsurance && isModalDeniedOpen && (
          <ModalDenied
            insurance={selectedInsurance}
            onClose={closeDeniedModal}
            onSubmit={handleDenialSubmit}
          />
        )}
      </div>
      <section className="mt-12 mr-6 mb-8 flex justify-end items-center">
        <button
          className="border-[1px] p-2 rounded-l-md"
          onClick={handlePaginationPrev}
        >
          <GrPrevious size={20} />
        </button>
        {/* Render pagination buttons based on the total number of pages */}
        {Array.from(
          { length: Math.ceil(insuranceBookings?.length / ITEMS_PER_PAGE) },
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
  );
};

export default AdminInsurance;
