import { Link } from "react-router-dom";
import logo from "../../../assets/icon/airblissBlack.png";

const ModalDenied = ({ insurance, onClose, onSubmit }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const premiumType = event.target.premiumType.value
        const deniedFeedback = event.target.deniedFeedback.value
        onSubmit(insurance, premiumType, deniedFeedback);
        onClose();
    };

    return (
        <dialog id="my_modal_1" open={true} className="modal" >
            <div className="bg-black/20 w-full h-full flex justify-center items-center">
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
                            <div className="grid gri lg:grid-cols-2 gap-5 mt-2 mb-3">
                                <div className="text-sm">
                                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                                        <h2 className="font-semibold">Premium Type</h2>
                                        <p>{insurance?.insurancePolicy?.requestedClaimInfo?.premiumType}</p>
                                    </div>
                                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                                        <h2 className="font-semibold">Require Amount</h2>
                                        <p>{insurance?.insurancePolicy?.requestedClaimInfo?.requireAmount}BDT</p>
                                    </div>
                                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                                        <h2 className="font-semibold">Explain Reason</h2>
                                        <p>{insurance?.insurancePolicy?.requestedClaimInfo?.summary}</p>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                                        <h2 className="font-semibold">Reference Image</h2>
                                        <Link
                                            to={insurance?.insurancePolicy?.requestedClaimInfo?.media}
                                            target="_blank"
                                        >
                                            <img className="w-[100px] h-[100px]" src={insurance?.insurancePolicy?.requestedClaimInfo?.media} alt="" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            htmlFor="gender"
                                            className="block font-bold mb-2 text-md">
                                            Insurance:
                                            <span className="text-red-600">*</span>
                                        </label>
                                        <select
                                            name="premiumType"
                                            id="premiumType"
                                            className="w-full px-[24px] py-[5px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                            required
                                            value={insurance?.insurancePolicy?.requestedClaimInfo?.premiumType}
                                        >
                                            <option value="">Select a Claim Type</option>
                                            <option value="tripCancellation">Trip Cancellation</option>
                                            <option value="medicalCoverage">Medical Coverage</option>
                                            <option value="lostLuggage">Lost Luggage</option>
                                            <option value="delayedFlight">Delayed Flight</option>
                                        </select>
                                    </div>
                                    {
                                        insurance?.insurancePolicy?.claimedStatus === "denied" ? (
                                            <div className="">
                                                <label
                                                    htmlFor="exampleField"
                                                    className="block font-bold mb-2 text-md"
                                                >
                                                    Write Denied Feedback
                                                    <span className="text-red-600">*</span>
                                                </label>
                                                <textarea
                                                    name="deniedFeedback"
                                                    id="deniedFeedback"
                                                    placeholder="Enter Your reason Here"
                                                    className="w-full px-[24px] py-[5px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                                    cols="5"
                                                    rows="1"
                                                    value={insurance?.insurancePolicy?.deniedFeedback}
                                                    required
                                                ></textarea>
                                            </div>
                                        ) : (
                                            <div className="">
                                                <label
                                                    htmlFor="exampleField"
                                                    className="block font-bold mb-2 text-md"
                                                >
                                                    Write Denied Feedback
                                                    <span className="text-red-600">*</span>
                                                </label>
                                                <textarea
                                                    name="deniedFeedback"
                                                    id="deniedFeedback"
                                                    placeholder="Enter Your reason Here"
                                                    className="w-full px-[24px] py-[5px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                                    cols="5"
                                                    rows="1"
                                                    required
                                                ></textarea>
                                            </div>
                                        )
                                    }
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
                                        type="submit" // Use type="submit" here
                                        disabled={insurance?.insurancePolicy?.claimedStatus === "denied"}
                                        className="bg-cyan-500 btn text-white active:bg-cyan-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    >
                                        Denied
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </dialog >
    );
};

export default ModalDenied;