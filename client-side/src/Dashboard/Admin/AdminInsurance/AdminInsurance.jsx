import React, { useState } from 'react';
import { FaHandsHolding } from 'react-icons/fa6';
import ModalApprove from './ModalApprove';
import { RxCross2 } from 'react-icons/rx';
import { toast } from "react-hot-toast";
import { MdDone } from 'react-icons/md';
import ModalDenied from './ModalDenied';

const AdminInsurance = () => {
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const [isModalApprovedOpen, setIsModalApprovedOpen] = useState(false); // New state variable
    const allBookingData = JSON.parse(sessionStorage.getItem("userBookings"));
    const insuranceBookings = allBookingData.filter(booking => booking?.insurancePolicy?.claimedStatus != null)
    const [isModalDeniedOpen, setIsModalDeniedOpen] = useState(false);

    console.log(insuranceBookings);

    const handleDenialSubmit = (insurance, premiumType, deniedFeedback) => {
        console.log('Insurance:', insurance);
        console.log('Premium Type:', premiumType);
        console.log('Require Amount:', deniedFeedback);

        const insuranceData = {
            premiumType: premiumType,
            deniedFeedback: deniedFeedback,
        };

        fetch(`http://localhost:5000/insuranceClaimRequest/denied/${insurance?.flight?.departureDate}/${insurance?.flight?.departureAirport}/${insurance?.bookingReference}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ insuranceData }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.message == "Insurance policy updated") {
                    toast.success(data.message);
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
        fetch(`http://localhost:5000/insuranceClaimRequest/approved/${insurance?.flight?.departureDate}/${insurance?.flight?.departureAirport}/${insurance?.bookingReference}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ insuranceData }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.message == "Insurance policy updated") {
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        return
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
                    <span className="text-[24px] font-semibold text-cyan-500">AirBliss insurance</span> More Secure Flight
                </h1>
            </div>
            <div className="overflow-x-auto mx-1 mt-[40px] px-10 py-5 shadow-md rounded-xl bg-white">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Flight Image</th>
                            <th>Flight name</th>
                            <th>Travel Path</th>
                            <th>Policy Number</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Acton</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            insuranceBookings.map((insurance, index) =>
                                <tr key={index}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle rounded-full w-12 h-12">
                                                    <img src={insurance?.airlineLogo} alt="Avatar Tailwind CSS Component" />
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
                                    <td>{insurance?.insurancePolicy?.claimedStatus}</td>
                                    <th className='flex gap-3 mt-2'>
                                        <button
                                            onClick={() => openModal(insurance)}
                                            className={`w-8 h-8 rounded-full text-white flex justify-center items-center ${insurance?.insurancePolicy?.claimedStatus === "denied" ? "bg-gray-400" : "bg-cyan-400"}`}
                                            disabled={insurance?.insurancePolicy?.claimedStatus === "denied"}
                                        >
                                            <MdDone className='text-xl' />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedInsurance(insurance);
                                                setIsModalDeniedOpen(true);
                                            }}
                                            className={`w-8 h-8 rounded-full text-white flex justify-center items-center ${insurance?.insurancePolicy?.claimedStatus === "approved" ? "bg-gray-400" : "bg-red-400"}`}
                                            disabled={insurance?.insurancePolicy?.claimedStatus === "approved"}
                                        >
                                            <RxCross2 className="text-xl" />
                                        </button>
                                    </th>
                                </tr>
                            )
                        }
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
        </div>
    );
};

export default AdminInsurance;