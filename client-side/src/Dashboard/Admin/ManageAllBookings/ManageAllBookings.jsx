import React, { useEffect, useState } from "react";
import logo from "../../../assets/icon/airblissBlack.png";
import { useForm } from "react-hook-form";
import BookingFlightTable from "../../../Components/BookingFlightTable/BookingFlightTable";
import CancelBookingTable from "../../../Components/CancelBookingTable/CancelBookingTable";
import { useDispatch, useSelector } from "react-redux";
import { setBookingsRefetch } from "../../../redux/features/bookingInfoSlice";
import { successToast } from "../../../utils/toast";

const ITEMS_PER_PAGE = 15;

const ManageAllBooking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flightRef, setFlightRef] = useState("");
  const [isActive, setIsActive] = useState("allbookings");
  const [date, setDate] = useState("");
  const [airportCode, setAirportCode] = useState("");
  const [details, setDetails] = useState(false);

  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setIsActive(tab);
  };

  const allBookings = useSelector((state) => state.userBookingInfo.allBookings);

  const cancelBookings = allBookings?.filter(
    (booking) => booking?.requestStatus === "approved"
  );

  const confirmBookings = allBookings?.filter(
    (booking) => booking?.bookingStatus === "confirmed"
  );

  const cancelRequests = allBookings?.filter(
    (booking) => booking?.requestStatus === "pending"
  );

  const cancelDeniedBookings = allBookings?.filter(
    (booking) => booking?.requestStatus === "denied"
  );

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();

  const selectedFlight = allBookings?.find(
    (flight) => flight?.bookingReference === flightRef
  );
  useEffect(() => {
    if (selectedFlight) {
      setDate(selectedFlight?.flight?.departureDate);
      setAirportCode(selectedFlight?.flight?.departureAirport);
    }
  }, [selectedFlight]);

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

  const handleCancelApproved = (flight) => {
    const cancelApprovedInfo = {
      bookingInfo: flight,
    };

    fetch(
      `http://localhost:5000/refund/approved/${flight?.flight?.departureDate}/${flight?.flight?.departureAirport}/${flight?.bookingReference}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cancelApprovedInfo),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data.message);
        dispatch(setBookingsRefetch(new Date().toString()));
        successToast("Refund request accepted");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancelDeny = (data) => {
    const cancelDenyInfo = {
      feedback: data?.feedback,
    };

    fetch(
      `http://localhost:5000/refund/denied/${date}/${airportCode}/${flightRef}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cancelDenyInfo),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data.message);
        dispatch(setBookingsRefetch(new Date().toString()));
        successToast("Refund request denied");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    reset();
    closeModal();
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paidAmount = selectedFlight?.flight?.fareSummary?.total;
  const deductedAmount = Math.round(paidAmount * 0.3);
  const refundAmount = paidAmount - deductedAmount;

  return (
    <div>
      {/* Tab */}
      <section className="bg-white p-4 shadow-md mt-5 flex md:flex-row flex-col  md:items-center md:mx-7 md:space-x-4">
        <div className="mb-2 md:mb-0">
          <h1 className="font-semibold ">Filter Bookings: </h1>
        </div>
        <div className="flex md:flex-row flex-col gap-1 rounded font-medium text-gray-600 text-sm">
          <div
            onClick={() => handleTabClick("allbookings")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
              isActive === "allbookings"
                ? "border-t-2 bg-cyan-50 border-cyan-400"
                : ""
            }`}
          >
            All Bookings
          </div>
          <div
            onClick={() => handleTabClick("confirm")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
              isActive === "confirm"
                ? "border-t-2 bg-cyan-50 border-cyan-400"
                : ""
            }`}
          >
            Confirm Bookings
          </div>

          <div
            onClick={() => handleTabClick("cancel")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
              isActive === "cancel"
                ? "border-t-2 bg-cyan-50 border-cyan-400"
                : ""
            }`}
          >
            Cancel Bookings
          </div>

          <div
            onClick={() => handleTabClick("cancel-request")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
              isActive === "cancel-request"
                ? "border-t-2 bg-cyan-50 border-cyan-400"
                : ""
            }`}
          >
            Refund Requests
          </div>

          <div
            onClick={() => handleTabClick("cancel-denied")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
              isActive === "cancel-denied"
                ? "border-t-2 bg-cyan-50 border-cyan-400"
                : ""
            }`}
          >
            Refund Denied
          </div>
        </div>
      </section>

      {isActive === "allbookings" && (
        <BookingFlightTable
          bookings={allBookings}
          openModal={openModal}
          setFlightRef={setFlightRef}
          status="flight status"
          action={true}
        />
      )}

      {isActive === "confirm" && (
        <BookingFlightTable
          bookings={confirmBookings}
          openModal={openModal}
          setFlightRef={setFlightRef}
          status="confirm status"
          action={true}
        />
      )}

      {isActive === "cancel" && (
        <BookingFlightTable
          bookings={cancelBookings}
          openModal={openModal}
          setFlightRef={setFlightRef}
          status="cancel status"
          action={true}
        />
      )}

      {isActive === "cancel-request" && (
        <CancelBookingTable
          bookings={cancelRequests}
          openModal={openModal}
          setFlightRef={setFlightRef}
          status="cancel status"
          action={false}
          feedbackTitle={"refund reason"}
          handleCancelApproved={handleCancelApproved}
        />
      )}

      {isActive === "cancel-denied" && (
        <CancelBookingTable
          bookings={cancelDeniedBookings}
          openModal={openModal}
          setFlightRef={setFlightRef}
          status="cancel status"
          action={true}
          handleCancelApproved={handleCancelApproved}
          feedbackTitle={"admin feedback"}
          setDetails={setDetails}
        />
      )}

      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-40 ${
            isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300 `}
        >
          <div className=" bg-black/20 min-h-screen w-full flex justify-center items-center">
            {/* Modal content */}
            <div className="bg-white w-10/12 max-w-2xl max-h-[95vh] md:max-h-[100vh] overflow-y-scroll md:overflow-auto rounded-lg shadow-lg p-6">
              <div className="flex lg:flex-row flex-col gap-2 md:gap-5 lg:gap-10 items-center mb-5">
                <img className="w-24" src={logo} alt="Website Logo" />
                <h2 className="text-lg text-center md:text-left md:text-xl font-semibold">
                  Flight Cancelation and Refund Requisition
                </h2>
              </div>
              <hr />
              <div className="flex gap-5 md:gap-10 items-center my-2">
                <div>
                  <h2 className="text-lg font-semibold">Booking Date:</h2>
                  <p className="">{selectedFlight?.bookingDateTime}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Traveler:</h2>
                  <p className="">
                    {selectedFlight?.user?.title}{" "}
                    {selectedFlight?.user?.first_name}{" "}
                    {selectedFlight?.user?.last_name}
                  </p>
                </div>
              </div>
              <hr />

              <div className="mb-2 mt-5">
                <h2 className="text-lg font-semibold">Flight Details</h2>
                <hr />
                <div className="md:flex gap-5 items-center">
                  <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0 ">
                    <h2 className="font-semibold">Airline</h2>
                    <p>{selectedFlight?.flight?.airline}</p>
                  </div>
                  <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                    <h2 className="font-semibold">Route</h2>
                    <p>
                      {selectedFlight?.flight?.departureCity} to{" "}
                      {selectedFlight?.flight?.arrivalCity}
                    </p>
                  </div>
                  <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                    <h2 className="font-semibold">Departure Date</h2>
                    <p>
                      {selectedFlight?.flight?.departureDate}{" "}
                      {selectedFlight?.flight?.departureTime}
                    </p>
                  </div>
                  <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                    <h2 className=" font-semibold">Arrival Date</h2>
                    <p>
                      {selectedFlight?.flight?.arrivalDate}{" "}
                      {selectedFlight?.flight?.arrivalTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="text-lg font-semibold">
                  Cancelation and Refund
                </h2>
                <hr />
                <div className="grid grid-cols-2 mt-2">
                  <p>Paid amount for this flight</p>
                  <p>= {paidAmount} BDT</p>
                </div>
                <div className="grid grid-cols-2 mt-2 md:mt-0">
                  <p>Deducted 30% cancelation fee</p>
                  <p>= {deductedAmount} BDT</p>
                </div>
                <div className="w-3/4">
                  <hr />
                </div>
                <div className="grid grid-cols-2 mt-2 md:mt-0">
                  <p>Total refund amount</p>
                  <p>= {refundAmount} BDT</p>
                </div>
              </div>
              <form onSubmit={handleSubmit(handleCancelDeny)}>
                <div className="mt-4">
                  <label
                    htmlFor="exampleField"
                    className="block font-bold mb-2"
                  >
                    Write your feedback here
                    <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    type="text"
                    id="exampleField"
                    {...register("feedback", { required: true })}
                    className={`block w-full px-2 py-2 mt-1  bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      errors.feedback &&
                      "focus:border-red-500 focus:ring-red-500 "
                    }`}
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
        </div>
      )}
    </div>
  );
};

export default ManageAllBooking;
