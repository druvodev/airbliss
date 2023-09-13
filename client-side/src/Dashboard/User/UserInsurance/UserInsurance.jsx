import React, { useState } from 'react';
import { FaHandsHolding } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import ModalInsurance from './ModalInsurance';

const UserInsurance = () => {
    const bookings = useSelector((state) => state?.userInfo?.userBookings);
    const insuranceBookings = bookings.filter(booking => booking.insurancePolicy != "Without Insurance")

    console.log(insuranceBookings);

    const [selectedInsurance, setSelectedInsurance] = useState(null);

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
                    <span className="text-[24px] font-semibold text-cyan-500">AirBliss insurance</span> More Secure Your Flight
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
                            <th>Details</th>
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
                                    <th>
                                        <button
                                            onClick={() => openModal(insurance)}
                                            className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-cyan-400`}
                                        >
                                            <FaHandsHolding className='text-xl' />
                                        </button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {selectedInsurance && (
                    <ModalInsurance
                        insurance={selectedInsurance}
                        onClose={closeModal}
                    />
                )}
            </div>
        </div>
    );
};

export default UserInsurance;