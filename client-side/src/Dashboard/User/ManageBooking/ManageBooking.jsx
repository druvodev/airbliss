import React, { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import logo from "../../../assets/icon/airblissBlack.png";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const ITEMS_PER_PAGE = 5;

const ManageBooking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flightRef, setFlightRef] = useState("");

  const bookings = useSelector((state) => state?.userInfo?.userBookings);

  const [formData, setFormData] = useState({});
  // Initialize your form data state here

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const myFlight = bookings?.find(
    (flight) => flight.bookingReference === flightRef
  );

  // console.log(myFlight);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const handleCancelFlight = (data) => {
    // console.log(data);
    const cancelFlightInfo = {
      cancelReason: data?.cancelReason,
      bookingReference: myFlight?.bookingReference,
      refundAmount,
    };
    console.log(cancelFlightInfo);
    reset();
    closeModal();
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paidAmount = myFlight?.flight?.fareSummary?.total;
  const deductedAmount = Math.round(myFlight?.flight?.fareSummary?.total * 0.3);
  const refundAmount = paidAmount - deductedAmount;

  //   console.log(booking);
  return (
    <div>
      <div className="overflow-x-auto mx-7 mt-[50px] px-10 py-5 rounded-xl bg-white">
        <table className="table">
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
            {bookings?.slice(startIndex, endIndex).map((flight, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle rounded-full w-12 h-12">
                        <img
                          src="https://i.ibb.co/LPcmyN0/O58a-F0wv2kgyx-Ag-TNwnj-Bvlw-C4-In4-Ny-HXH0-K2-Uq-S1ae-AOtdf186x-Xa7-Iq-Hz-Ej-Gx-EGA.png"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{flight?.flight.airline}</td>
                <td>{flight.bookingDateTime}</td>
                <td>BDT {flight?.flight?.fareSummary?.total}</td>
                <td>
                  {flight?.flight?.departureCity} To{" "}
                  {flight?.flight?.arrivalCity}
                </td>
                <td>{flight?.user?.passport_number}</td>
                <td>Approved</td>
                <td className="flex gap-2 mt-2">
                  <button
                    className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-cyan-500
                    }`}
                  >
                    <AiFillSetting />
                  </button>
                  <button
                    className={`w-8 h-8 rounded-full text-white flex justify-center items-center  bg-red-400`}
                    onClick={() => {
                      openModal();
                      setFlightRef(flight?.bookingReference);
                    }}
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
            { length: Math.ceil(bookings.length / ITEMS_PER_PAGE) },
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

      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-40 ${
            isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300 `}
        >
          {/* Modal content */}
          <div className="bg-white w-10/12 max-w-3xl max-h-[95vh] md:max-h-[100vh] overflow-y-scroll md:overflow-auto rounded-lg shadow-lg p-6">
            <div className="flex gap-2 md:gap-5 lg:gap-10 items-center mb-5">
              <img className="w-24" src={logo} alt="Website Logo" />
              <h2 className="text-lg md:text-xl font-semibold">
                Flight Cancelation and Refund Requisition
              </h2>
            </div>
            <hr />
            <div className="flex gap-5 md:gap-10 items-center my-2">
              <div>
                <h2 className="text-lg font-semibold">Booking Date:</h2>
                <p className="text-sm">{myFlight?.bookingDateTime}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Traveler:</h2>
                <p className="text-sm">
                  {myFlight?.user?.title} {myFlight?.user?.first_name}{" "}
                  {myFlight?.user?.last_name}
                </p>
              </div>
            </div>
            <hr />
            <div className="mb-2 mt-5">
              <h2 className="text-lg font-semibold">Flight Details</h2>
              <hr />
              <div className="flex gap-5 items-center">
                <div>
                  <h2 className="font-semibold">Airline</h2>
                  <p>{myFlight?.flight?.airline}</p>
                </div>
                <div>
                  <h2 className="font-semibold">Route</h2>
                  <p>
                    {myFlight?.flight?.departureCity} to{" "}
                    {myFlight?.flight?.arrivalCity}
                  </p>
                </div>
                <div>
                  <h2 className="font-semibold">Departure Date</h2>
                  <p>
                    {myFlight?.flight?.departureDate}{" "}
                    {myFlight?.flight?.departureTime}
                  </p>
                </div>
                <div>
                  <h2 className="font-semibold">Arrival Date</h2>
                  <p>
                    {myFlight?.flight?.arrivalDate}{" "}
                    {myFlight?.flight?.arrivalTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-lg font-semibold">Cancelation and Refund</h2>
              <hr />
              <div className="grid grid-cols-2 mt-2 font-semibold">
                <p>Your paid amount for this flight</p>
                <p>= {paidAmount} BDT</p>
              </div>
              <div className="grid grid-cols-2 font-semibold">
                <p>Deducted 30% cancelation fee</p>
                <p>= {deductedAmount} BDT</p>
              </div>
              <div className="w-3/4">
                <hr />
              </div>
              <div className="grid grid-cols-2 font-semibold">
                <p>Total refund amount</p>
                <p>= {refundAmount} BDT</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(handleCancelFlight)}>
              <div className="mt-4">
                <label htmlFor="exampleField" className="block font-bold mb-2">
                  Why you want to cancel the flight?
                </label>
                <textarea
                  type="text"
                  id="exampleField"
                  {...register("cancelReason", { required: true })}
                  className="block w-full px-2 py-2 mt-1  bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter something"
                />
              </div>
              {/* End of form fields */}
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition duration-150"
                >
                  Submit
                </button>
                <div
                  onClick={closeModal}
                  className="btn ml-2 btn-warning border-none bg-red-400 hover:bg-red-500 text-white"
                >
                  Close
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooking;
