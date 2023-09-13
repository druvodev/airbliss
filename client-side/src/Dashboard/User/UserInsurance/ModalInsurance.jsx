import React, { useState } from 'react';
import logo from "../../../assets/icon/airblissBlack.png";

const ModalInsurance = ({ insurance, onClose }) => {
    const [isTripCancellationClaimed, setIsTripCancellationClaimed] = useState(false);
    const [isMedicalCoverageClaimed, setIsMedicalCoverageClaimed] = useState(false);
    const [isLostLuggageClaimed, setIsLostLuggageClaimed] = useState(false);
    const [isDelayedFlightClaimed, setIsDelayedFlightClaimed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // You can use the state of each checkbox to determine which claims were selected
        console.log('Trip Cancellation Claimed:', isTripCancellationClaimed);
        console.log('Medical Coverage Claimed:', isMedicalCoverageClaimed);
        console.log('Lost Luggage Claimed:', isLostLuggageClaimed);
        console.log('Delayed Flight Claimed:', isDelayedFlightClaimed);

        onClose();
    };

    //* /insuranceClaim/:date/:airportCode/:bookingReference

    // const claimInfo = {
    //     media: "http://",
    //     summary: "This is summary",
    //     requirePremium: 100,
    // };

    // const premiumType = premiumAcceptInfo?.premiumType;

    return (
        <>
            <dialog id="my_modal_1" className="modal" >
                <div className="modal-box w-10/12 max-w-2xl max-h-[95vh] md:max-h-[100vh] overflow-y-scroll md:overflow-auto">
                    <div className="bg-white w-full h-full rounded-lg p-6">
                        <div className="flex lg:flex-row flex-col gap-2 md:gap-5 lg:gap-10 items-center mb-5">
                            <img className="w-24" src={logo} alt="Website Logo" />
                            <h2 className="text-lg text-center md:text-left md:text-xl font-semibold">
                                AirBliss Flight Insurance Claim Policy
                            </h2>
                        </div>
                        <hr />
                        <div className="flex gap-5 md:gap-10 items-center my-2">
                            <div>
                                <h2 className="text-md font-semibold">Booking Date:</h2>
                                <p className="text-sm">
                                    {insurance?.bookingDateTime.split(" ")[0]}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-md font-semibold">Traveler:</h2>
                                <p className="text-sm">
                                    {insurance?.user?.title} {insurance?.user?.first_name}{" "}
                                    {insurance?.user?.last_name}
                                </p>
                            </div>
                        </div>
                        <hr />

                        <div className="mb-2 mt-5">
                            <h2 className="text-md font-semibold">Flight Details</h2>
                            <hr />
                            <div className="md:flex gap-5 items-center text-sm">
                                <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                                    <h2 className="font-semibold">Airline</h2>
                                    <p>{insurance?.flight?.airline}</p>
                                </div>
                                <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                                    <h2 className="font-semibold">Route</h2>
                                    <p>
                                        {insurance?.flight?.departureCity} to{" "}
                                        {insurance?.flight?.arrivalCity}
                                    </p>
                                </div>
                                <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                                    <h2 className="font-semibold">Departure Date</h2>
                                    <p>
                                        {insurance?.flight?.departureDate}{" "}
                                        {insurance?.flight?.departureTime}
                                    </p>
                                </div>
                                <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                                    <h2 className=" font-semibold">Arrival Date</h2>
                                    <p>
                                        {insurance?.flight?.arrivalDate}{" "}
                                        {insurance?.flight?.arrivalTime}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="mb-2 mt-5">
                            <h2 className="text-md font-semibold">Insurance Details</h2>
                            <hr />
                            <div className="md:flex gap-5 items-center text-sm">
                                <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                                    <h2 className="font-semibold">Policy Number</h2>
                                    <p>{insurance?.insurancePolicy?.policyNumber}</p>
                                </div>
                                <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                                    <h2 className="font-semibold">Policy Type</h2>
                                    <p>{insurance?.insurancePolicy?.policyType}</p>
                                </div>
                                <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                                    <h2 className="font-semibold">Policy Start</h2>
                                    <p>{insurance?.insurancePolicy?.startDate}</p>
                                </div>
                                <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                                    <h2 className="font-semibold">Policy end</h2>
                                    <p>{insurance?.insurancePolicy?.endDate}</p>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="mb-2 mt-5">
                            <h2 className="text-md font-semibold">Claimed Insurance</h2>
                            <hr />
                            <form action="">
                                <div>
                                    <label
                                        htmlFor="gender"
                                        className="block font-bold mb-2 text-md">
                                        Insurance:
                                        <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        name="relationship"
                                        id="relationship"
                                        className="w-full px-[24px] py-[5px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                        required
                                    >
                                        <option value="">Select a Claim Type</option>
                                        <option value="tripCancellation">Trip Cancellation</option>
                                        <option value="medicalCoverage">Medical Coverage</option>
                                        <option value="lostLuggage">Lost Luggage</option>
                                        <option value="delayedFlight">Delayed Flight</option>
                                    </select>
                                </div>
                                <div className='grid grid-cols-2 gap-5 pt-2'>
                                    <div>
                                        <label
                                            htmlFor="DateOfBirth"
                                            className="block font-bold mb-2 text-md">
                                            Require Amount:
                                            <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="requireAmount"
                                            id="requireAmount"
                                            placeholder="Enter Your From address Here"
                                            className="w-full px-[24px] py-[5px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="image"
                                            className="block font-bold mb-2 text-md">
                                            Select Image:
                                            <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            required
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label
                                        htmlFor="exampleField"
                                        className="block font-bold mb-2 text-md"
                                    >
                                        Write Your Reason
                                        <span className="text-red-600">*</span>
                                    </label>
                                    <textarea
                                        name="summary"
                                        id="summary"
                                        placeholder="Enter Your Feedback Here"
                                        className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                        cols="5"
                                        rows="2"
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex modal-action justify-end mt-2 sm:mt-5 tracking-wide">
                                    <button
                                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-cyan-500 text-white active:bg-cyan-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </dialog >
        </>
    );
};

export default ModalInsurance;