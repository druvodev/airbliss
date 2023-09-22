import React, { useEffect, useState } from "react";
import RescheduleTable from "./RescheduleTable";
import { useDispatch, useSelector } from "react-redux";
import { format, parse } from "date-fns";
import logo from "../../../assets/icon/airblissBlack.png";
import RescheduleModalSeat from "./RescheduleModalSeat";
import toast from "react-hot-toast";
import { setRefetch } from "../../../redux/features/usersSlice";
import { TbFidgetSpinner } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";

const ApplyReschedule = () => {
  const [isActive, setIsActive] = useState("allflight");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flightRef, setFlightRef] = useState("");
  const [isDateSelected, setDateSelected] = useState(false);
  const [isSeats, setSeats] = useState([]);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [newSeat, setNewSeat] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // console.log(newSeat);

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openRescheduleModal = () => {
    setIsRescheduleModalOpen(true);
  };

  // Function to close the modal
  const closeRescheduleModal = () => {
    setIsRescheduleModalOpen(false);
  };

  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setIsActive(tab);
  };

  const newDate = new Date();
  const todayDate = format(newDate, "yyyy-MM-dd");
  // console.log(todayDate);

  const bookings = useSelector((state) => state?.userInfo?.userBookings);
  // console.log(bookings);

  const rescheduleBookingData = bookings.filter(
    (bookingData) => bookingData?.flight?.arrivalDate >= todayDate
  );
  const rescheduleBookingConfirmed = rescheduleBookingData.filter(
    (bookingData) => bookingData?.residualStatus === "approved"
  );
  const rescheduleBookingDenied = rescheduleBookingData.filter(
    (bookingData) => bookingData?.residualStatus === "denied"
  );

  const myFlight = bookings?.find(
    (flight) => flight?.bookingReference === flightRef
  );

  const paidAmount = myFlight?.flight?.fareSummary?.total;
  const deductedAmount = Math.round(myFlight?.flight?.fareSummary?.total * 0.3);
  const refundAmount = paidAmount - deductedAmount;

  const handleDateChange = (event) => {
    if (event.target.value) {
      setIsLoading(true);
      const [year, day, month] = event.target.value.split("-");
      const date = parse(`${year}-${month}-${day}`, "yyyy-dd-MM", new Date());
      const newDate = format(date, "yyyy-MM-dd");
      setFlightDate(newDate);
      // console.log("date", newDate);
      fetch(
        `http://localhost:5000/rescheduleSeat/${myFlight?.flightId}/${myFlight?.totalSeat}/${newDate}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSeats(data?.availableSeat?.seats);
          setDateSelected(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setDateSelected(false);
    }
  };

  // console.log("new date", isSeats);

  const handleReschedule = () => {
    const requestData = {
      flightDate: flightDate,
      flightId: myFlight?.flightId,
      seatNo: newSeat,
    };
    fetch(
      `http://localhost:5000/reschedule/${myFlight?.flight?.departureDate}/${myFlight?.flight?.departureAirport}/${myFlight?.bookingReference}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setIsModalOpen(false);
        dispatch(setRefetch(new Date().toString()));
        console.log(data?.message);
        toast.success("Successfully Sent Request");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="lg:mt-10">
      <section className="bg-white p-4 shadow-md mt-5 flex md:flex-row flex-col  md:items-center md:mx-7 md:space-x-4 dark:bg-white/10 dark:backdrop-blur-md dark:shadow dark:shadow-white/50 dark:text-white">
        <div className="mb-2 md:mb-0">
          <h1 className="font-semibold ">Apply Reschedule: </h1>
        </div>
        <div className="flex gap-1 rounded font-medium text-gray-600 text-sm">
          <div
            onClick={() => handleTabClick("allflight")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 dark:text-gray-300 ${
              isActive === "allflight"
                ? "border-t-2 bg-cyan-50 dark:text-gray-200 dark:bg-gray-700 border-cyan-400"
                : ""
            }`}
          >
            All Flight
          </div>
          <div
            onClick={() => handleTabClick("confirm")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 dark:text-gray-300 ${
              isActive === "confirm"
                ? "border-t-2 bg-cyan-50 border-cyan-400  dark:bg-gray-700"
                : ""
            }`}
          >
            Confirm Reschedule
          </div>
          <div
            onClick={() => handleTabClick("cancel")}
            className={`px-4 py-2 cursor-pointer flex items-center gap-1 dark:text-gray-300 ${
              isActive === "cancel"
                ? "border-t-2 bg-cyan-50 border-cyan-400 0 dark:bg-gray-700"
                : ""
            }`}
          >
            Cancel Reschedule
          </div>
        </div>
      </section>

      {isActive === "allflight" && (
        <RescheduleTable
          rescheduleBookingData={rescheduleBookingData}
          openModal={openModal}
          setFlightRef={setFlightRef}
          status="Reschedule Status"
        />
      )}

      {isActive === "cancel" && (
        <RescheduleTable
          rescheduleBookingData={rescheduleBookingDenied}
          // openModal={openModal}
          setFlightRef={setFlightRef}
          status="cancel status"
        />
      )}

      {isActive === "confirm" && (
        <RescheduleTable
          rescheduleBookingData={rescheduleBookingConfirmed}
          // openModal={openModal}
          setFlightRef={setFlightRef}
          status="confirm status"
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
            <div className="bg-white w-10/12 max-w-2xl max-h-[95vh] md:max-h-[100vh] overflow-y-scroll md:overflow-auto rounded-lg shadow-lg p-6 dark:bg-white/10 dark:backdrop-blur-md dark:shadow dark:shadow-white/50 dark:text-white">
              <div className="flex lg:flex-row flex-col gap-2 md:gap-5 lg:gap-10 items-center mb-5">
                <img className="w-24" src={logo} alt="Website Logo" />
                <h2 className="text-lg text-center md:text-left md:text-xl font-semibold">
                  Flight Reschedule Requisition
                </h2>
              </div>
              <hr />
              <div className="flex gap-5 md:gap-10 items-center my-2">
                <div>
                  <h2 className="text-md font-semibold">Booking Date:</h2>
                  <p className="text-sm">
                    {myFlight?.bookingDateTime.split(" ")[0]}
                  </p>
                </div>
                <div>
                  <h2 className="text-md font-semibold">Traveler:</h2>
                  <p className="text-sm">
                    {myFlight?.user?.title} {myFlight?.user?.first_name}{" "}
                    {myFlight?.user?.last_name}
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
                    <p>{myFlight?.flight?.airline}</p>
                  </div>
                  <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                    <h2 className="font-semibold">Route</h2>
                    <p>
                      {myFlight?.flight?.departureCity} to{" "}
                      {myFlight?.flight?.arrivalCity}
                    </p>
                  </div>
                  <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                    <h2 className="font-semibold">Departure Date</h2>
                    <p>
                      {myFlight?.flight?.departureDate}{" "}
                      {myFlight?.flight?.departureTime}
                    </p>
                  </div>
                  <div className="flex md:flex-col  gap-2 md:gap-0 items-center md:items-start md:justify-start mt-2 md:mt-0">
                    <h2 className=" font-semibold">Arrival Date</h2>
                    <p>
                      {myFlight?.flight?.arrivalDate}{" "}
                      {myFlight?.flight?.arrivalTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="text-md font-semibold">
                  Cancelation and Refund
                </h2>
                <hr />
                <div className="grid grid-cols-2 mt-2 text-sm">
                  <p>Your paid amount for this flight</p>
                  <p>= {paidAmount} BDT</p>
                </div>
                <div className="grid grid-cols-2 mt-2 md:mt-0 text-sm">
                  <p>Deducted 30% cancelation fee</p>
                  <p>= {deductedAmount} BDT</p>
                </div>
                <div className="w-3/4">
                  <hr />
                </div>
                <div className="grid grid-cols-2 mt-2 md:mt-0 text-sm">
                  <p>Total refund amount</p>
                  <p>= {refundAmount} BDT</p>
                </div>
              </div>
              <div className="mt-4">
                <hr />
                <h2 className="text-md font-semibold">
                  Fill the Selected Item
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-5">
                  <div className="">
                    <label
                      htmlFor="exampleField"
                      className="block font-bold mb-2 text-md"
                    >
                      Select new Flight Date
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="requireAmount"
                      id="requireAmount"
                      placeholder="Enter Your From address Here"
                      className="w-full px-[24px] py-[5px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                      required
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className="">
                    <label
                      htmlFor="exampleField"
                      className="block font-bold mb-2 text-md"
                    >
                      Select new Flight Date
                      <span className="text-red-600">*</span>
                    </label>
                    <button
                      onClick={() => setIsRescheduleModalOpen(true)}
                      className={`btn btn-sm text-white ${
                        isDateSelected ? "bg-cyan-500" : "bg-gray-400"
                      }`}
                      disabled={!isDateSelected} // Disable the button if no date is selected
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <TbFidgetSpinner
                            size={24}
                            className="m-auto animate-spin"
                          />
                          Loading...
                        </div>
                      ) : (
                        "Select Seat"
                      )}
                      <IoMdArrowDropdown />
                    </button>
                  </div>
                </div>
                {/* End of form fields */}
                <div className="flex justify-end mt-2 sm:mt-5 tracking-wide">
                  <div
                    onClick={closeModal}
                    className="mr-2 sm:mr-4 py-1 px-4 rounded-md border-none bg-red-500 hover:bg-red-600 cursor-pointer  transition duration-150 text-white"
                  >
                    Close
                  </div>
                  <button
                    onClick={handleReschedule}
                    type="submit"
                    className={`bg-cyan-500 text-white py-1 px-4 rounded-md border-none hover:bg-cyan-600 transition duration-150 ${
                      newSeat === "" ? "bg-gray-400" : "bg-cyan-400"
                    }`}
                    disabled={newSeat === ""}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isRescheduleModalOpen && (
        <div className="fixed top-0 left-0 z-50 w-full md:w-screen  h-full overflow-y-auto">
          <div className="md:w-screen w-full  bg-white/20 backdrop-blur-md backdrop-filter shadow-md sm:p-10">
            <div className="text-center ">
              <h3 className="mb-5 text-3xl sm:text-4xl font-bold bg-slate-500/30 backdrop-blur py-2 px-5 w-fit mx-auto rounded-xl shadow shadow-cyan-100">
                Choose Your Seating Preference
              </h3>
              <RescheduleModalSeat
                setIsRescheduleModalOpen={setIsRescheduleModalOpen}
                isSeats={isSeats}
                setNewSeat={setNewSeat}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyReschedule;
