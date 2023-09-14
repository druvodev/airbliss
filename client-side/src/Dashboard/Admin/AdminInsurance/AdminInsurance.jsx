import React, { useState } from 'react';
import { FaHandsHolding } from 'react-icons/fa6';
import ModalApprove from './ModalApprove';
import { RxCross2 } from 'react-icons/rx';

const AdminInsurance = () => {
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const allBookingData = JSON.parse(sessionStorage.getItem("userBookings"));
    const insuranceBookings = allBookingData.filter(booking => booking?.insurancePolicy?.claimedStatus != null)

    const handleFormSubmit = (insurance, premiumType, requireAmount, summary, image) => {
        // Handle the form submission here with the provided data
        // You can access insurance, premiumType, requireAmount, summary, and image here
        console.log('Insurance:', insurance);
        console.log('Premium Type:', premiumType);
        console.log('Require Amount:', requireAmount);
        console.log('Summary:', summary);
        console.log('Image:', image);

        const formData = new FormData();
        formData.append("image", image);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;

        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imageData) => {
                const imageUrl = imageData.data.display_url;
                console.log(imageUrl);

                const insuranceData = {
                    media: imageUrl,
                    summary: summary,
                    requireAmount: requireAmount,
                    premiumType: premiumType,
                };

                fetch(`http://localhost:5000/insuranceClaim/${insurance?.flight?.departureDate}/${insurance?.flight?.departureAirport}/${insurance?.bookingReference}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ insuranceData }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.modifiedCount === 1) {
                            toast.success("User Data submitted successfully");
                        } else {
                            toast.error("Failed to update user data");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err.message);
                toast.error(err.message);
            });

        return

        // Perform any necessary actions, such as making API requests
    };

    const openModal = (insurance) => {
        setSelectedInsurance(insurance);
        document.getElementById('my_modal_1').showModal()
    };

    const closeModal = () => {
        setSelectedInsurance(null);
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
                                            className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-cyan-400`}
                                        >
                                            <FaHandsHolding className='text-xl' />
                                        </button>
                                        <button
                                            className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-red-400`}
                                        >
                                            <RxCross2 className='text-xl' />
                                        </button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {selectedInsurance && (
                    <ModalApprove
                        insurance={selectedInsurance}
                        onClose={closeModal}
                        onSubmit={handleFormSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminInsurance;